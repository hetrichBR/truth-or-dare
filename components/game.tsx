import { Alert, Button, Dimensions, ImageBackground, StyleSheet, View, Pressable, Modal } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from './ThemedView';
import ActionButton from './ActionButton';
import React, { useContext, useState } from 'react';
import CricleButton from './CircleButton';
import { GlobalStateContext } from '@/app/globalcontext';
import { DotIndicator } from 'react-native-indicators';
import { Entypo } from '@expo/vector-icons';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Card from './card';
import { TRUTHS, DARES } from '@/constants/gameData';



export function Game() {
  const rotationAnimation = useSharedValue(0);
  const fadeAnimation = useSharedValue(0);
  const headerColorAnimation = useSharedValue(0);
  const [text, setText] = useState('');
  const screenHeight = Dimensions.get('window').height;
  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const [loadSize, setLoadSize] = useState(0);
  const [select, setSelect] = useState('truth');
  const [lastDare, setLastDare] = useState('');
  const [lastTruth, setLastTruth] = useState('');
  const [lastResult, setLastResult] = useState('');
  const [showHostSelector, setShowHostSelector] = useState(false);
  const [selectionCount, setSelectionCount] = useState(0);
  

  const hostOptions = [
    'The Host',
    // 'Just a Chill Guy', 
     'Influencer',
    // 'Crypto Bro',
    // 'The President'
  ];

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnimation.value,
      transform: [{ scale: fadeAnimation.value }],
    };
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const isTruth = select === 'truth';
    const borderColor = isTruth ? '#167CD8' : '#990FB3';
    const backgroundColor = isTruth ? 'rgba(22, 124, 216, 0.15)' : 'rgba(153, 15, 179, 0.15)';
    const shadowColor = isTruth ? '#167CD8' : '#990FB3';
    
    return {
      borderColor,
      backgroundColor,
      shadowColor,
    };
  });

  const showHostOptions = () => {
    setShowHostSelector(true);
  };

  const handleHostSelection = (host: string) => {
    setGlobalState({ ...globalState, host });
    setShowHostSelector(false);
  };

  // Ads removed: keeping selection counter for potential future integrations.

  async function getTruthorDare(selection:string){
   // get the selection from the host and display the truth or dare
   setLoadSize(10)
   setSelect(selection)
   fadeAnimation.value = 0; // Reset animation
   headerColorAnimation.value = withTiming(selection === 'truth' ? 0 : 1, { duration: 500 });
   await new Promise(resolve => setTimeout(resolve, 1000));
   const host = globalState.host;
   if (selection.toLowerCase() == "dare"){
        const dare = DARES[host as keyof typeof DARES][Math.floor(Math.random() * DARES[host as keyof typeof DARES].length)];
        setLastResult(dare)
        setText(dare)
        setLoadSize(0)
        // Animate text appearance
        fadeAnimation.value = withTiming(1, { duration: 800 });
    }
     else{
      const truth = TRUTHS[host as keyof typeof TRUTHS][Math.floor(Math.random() * TRUTHS[host as keyof typeof TRUTHS].length)];
      setLastResult(truth)
      setText(truth)
      setLoadSize(0)
      // Animate text appearance
      fadeAnimation.value = withTiming(1, { duration: 800 });
    }

    // Count selections and show an ad placeholder every 5th selection
    const newCount = selectionCount + 1;
    setSelectionCount(newCount);
    // Ad display removed
//     setLoadSize(0)
  }

//TODO feature is in Beta
//   async function generateText(selection:string){
//     setLoadSize(10)
//     setSelect(selection)

//     if (selection.toLowerCase() == "dare"){
//       setLastResult(lastDare)
//     }
//     else{
//       setLastResult(lastTruth)
//     }
//     console.log("last result: ", lastResult)

//     const token = ""
//     const host = globalState.host;
//     const response = await fetch(`https://us-central1-truth-or-dare-434917.cloudfunctions.net/model-inference?selection=${selection}&host=${host}&lastPrompt=${lastResult}`, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         //'Authorization': `bearer ${token}`,
//         //'Access-Control-Allow-Origin': '*',
//         //'Access-Control-Allow-Credentials':'true'
//       },
//     });
//     let prediction = await response.json();
//     //console.log(prediction.output)

//     if (response.status !== 200) {
//       return;
//     }
//     setText(`${prediction.output}`)
//     setLoadSize(0)

//     if (selection.toLowerCase() == "dare"){
//       setLastDare(`${prediction.output}`)
//     }
//     else{
//       setLastTruth(`${prediction.output}`)
//     }

//     console.log("Last Dare: ",lastDare)
//     console.log("Last Truth: ",lastTruth)
// }

  return (
    <ThemedView style={[styles.container, { height: screenHeight - 170}]} >
      {/* <ImageBackground style={styles.container} source={require('@/assets/images/nothing.png')}> */}
         <Pressable onPress={showHostOptions}>
           <Animated.View style={[styles.hostText, animatedHeaderStyle]}>         
                <ThemedText style={styles.hostName}>{globalState.host}</ThemedText>
           </Animated.View>
         </Pressable>
        
        <View style={styles.gameContent}>
          <ActionButton
            title="TRUTH 😇"
            // onPress={() => generateText("truth")}
            onPress={() => getTruthorDare("truth")}
          />
          <ThemedText style={styles.bigtext}></ThemedText>
          <ActionButton
            title="  DARE 😈"
            // onPress={() => generateText("dare")}
            onPress={() => getTruthorDare("dare")}
          />
          <Animated.Text style={[styles.text, animatedTextStyle]}>{text}</Animated.Text>
          <DotIndicator hidesWhenStopped color={ select === 'truth' ? '#167CD8': '#990FB3'} size={loadSize}  />
        </View>

        {/* Custom Host Selection Modal */}
        <Modal
          visible={showHostSelector}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowHostSelector(false)}
        >
          <View style={styles.modalOverlay}>
            <Animated.View style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>Choose Your Host 🎤</ThemedText>
              <ThemedText style={styles.modalSubtitle}>Select a host for your game:</ThemedText>
              
              {hostOptions.map((host, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.hostOption,
                    host === globalState.host && styles.selectedHostOption
                  ]}
                  onPress={() => handleHostSelection(host)}
                >
                  <ThemedText style={[
                    styles.hostOptionText,
                    host === globalState.host && styles.selectedHostOptionText
                  ]}>
                    {host}
                  </ThemedText>
                </Pressable>
              ))}
              
              <Pressable
                style={styles.cancelButton}
                onPress={() => setShowHostSelector(false)}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </Pressable>
            </Animated.View>
          </View>
        </Modal>

    </ThemedView>

    
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    lineHeight: 32,
    marginTop: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'gill sans', // futura, gill sans
    width: 300,
    color: 'white',
    fontWeight: '600'
  },
  icon: {
    borderColor: "#FFFF00"
  },
  hostText: {
    fontSize: 23,
    lineHeight: 32,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'gill sans', // futura, gill sans
    width: 350,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  bigtext: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 4,
    lineHeight: 4,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop:5
  },
  container:{
    paddingTop: 5,
    width: 500,
    backgroundColor: '#1a1a2e',
    flex: 1,
    justifyContent: 'space-between',
  },
  test:{
    backgroundColor: 'red'
  },
  menu:{
    borderRadius: 20
  },
  micIcon: {
    marginRight: 5,
  },
  hostName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(255, 215, 0, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 40,
    includeFontPadding: false,
  },
  tapIndicator: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
    paddingTop: 10
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  hostOption: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  selectedHostOption: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  hostOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  selectedHostOptionText: {
    color: '#FFD700',
  },
  cancelButton: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  gameContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
});
