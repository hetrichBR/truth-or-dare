import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Pressable, Animated, TouchableOpacity } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function CricleButton(props: any) {
  const { onPress, title, onHover } = props;

  return (
    <Pressable
    onHoverIn={() => {
    }}>
      <Animated.View
          style={[ styles.button]} >  
          <MaterialIcons name="settings-suggest" size={24} color="black" /> 
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button:{
    borderRadius: 10,
    height: 20,
    width: 20,
    backgroundColor: '#167CD8',
  }

});