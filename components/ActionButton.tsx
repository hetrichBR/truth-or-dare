import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Pressable, Animated, TouchableOpacity } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function ActionButton(props: any) {
  const { onPress, title, onHover } = props;
  const [disable, setDisable] = useState(false);

  const animatedScale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animatedScale.setValue(1)
  }, [])

  const onPressButton = () => {
     animatedScale.setValue(0.8);
     Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 24,
      speed: 25,
      useNativeDriver: true
     }).start();
     onPress()
     setDisable(true)
     setTimeout(() => setDisable(false), 2000);
  }

  return (
    <Pressable
    onPress={onPressButton} 
    disabled={disable}
    onHoverIn={() => {
      console.log('HOVER')
    }}>
      <Animated.View
      style={[title.includes("TRUTH") ? styles.buttonTruth : styles.buttonDare, {transform:[{scale: animatedScale}]}]} >
         <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonTruth: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#167CD8',
    marginBottom: 5,
    //width: 750,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonDare: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#990FB3',
    marginBottom: 5,
    //width: 750,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    fontSize: 20,
    lineHeight: 29,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'futura' // futura
  },
  
});