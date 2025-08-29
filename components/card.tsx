import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = () => {
  return (
    <View style={styles.card}>
      <Text>This is a card</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Card;
