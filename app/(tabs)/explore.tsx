import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import * as MailComposer from 'expo-mail-composer';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DropdownComponent from '@/components/DropDown';
import DropdownModesComponent from '@/components/DropDownModes';

export default function TabTwoScreen() {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = async () => {
    if (!email.trim() || !feedback.trim()) {
      Alert.alert('Error', 'Please fill in both email and feedback fields.');
      return;
    }
    
    try {
      // Check if device can send emails
      const isAvailable = await MailComposer.isAvailableAsync();
      
      if (!isAvailable) {
        Alert.alert(
          'Email Not Available', 
          'Your device cannot send emails. Please check your email app configuration.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Prepare email content
      const emailContent = {
        to: ['bkblaboratory@gmail.com'],
        from: {email},
        subject: 'Truth or Dare App Feedback',
        body: `
Feedback from: ${email}

Message:
${feedback}

---
Sent from Truth or Dare App
        `.trim(),
        isHtml: false,
      };
      
      // Open email composer
      const result = await MailComposer.composeAsync(emailContent);
      
      if (result.status === 'sent') {
        Alert.alert(
          'Thank You!', 
          'Your feedback has been sent successfully!',
          [{ text: 'OK', onPress: () => {
            setEmail('');
            setFeedback('');
          }}]
        );
      } else if (result.status === 'cancelled') {
        Alert.alert(
          'Email Cancelled', 
          'Your feedback was not sent. You can try again anytime.',
          [{ text: 'OK' }]
        );
      }
      
    } catch (error) {
      Alert.alert(
        'Error', 
        'There was an error sending your feedback. Please try again.',
        [{ text: 'OK' }]
      );
      console.error('Email error:', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FF6B9D', dark: '#8B2E5A' }}
      headerImage={<Ionicons size={310} name="game-controller" style={styles.headerImage} />}>
     
      <ThemedView style={[styles.settingContainer, { height: screenHeight - 170, width: screenWidth}]}>
        <ThemedText style={styles.settingTitle}>🗣️ Game Host</ThemedText>
        <DropdownComponent></DropdownComponent>
        {/* <ThemedText style={styles.settingTitle}>🎲 Game Mode</ThemedText>
        <DropdownModesComponent></DropdownModesComponent>
        <ThemedText style={styles.settingDescription}>Play using community favorite Truth and Dares</ThemedText> */}

        <ThemedText style={styles.settingTitle}>🎲 Feedback</ThemedText>
        
        <ThemedView style={styles.feedbackContainer}>
          <ThemedText style={styles.inputLabel}>Your Email:</ThemedText>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email address"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <ThemedText style={styles.inputLabel}>Your Feedback:</ThemedText>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Tell us what you think or suggest improvements..."
            placeholderTextColor="#888"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
            <ThemedText style={styles.submitButtonText}>Send Feedback</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
      </ThemedView>
  
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#FFD700',
    bottom: -90,
    left: -35,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  settingTitle:{
    fontSize: 20,
    fontWeight: '600'
  },
  settingContainer:{
    justifyContent: 'flex-start',
  },
  settingDescription:{
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 50
  },
  feedbackContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 20,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000',
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});
