import { Image, StyleSheet, Platform, Button, Alert, ImageBackground } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Game } from '@/components/game';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/neon-title.png')}
          style={styles.reactLogo}
        />
      }
      >

      <ThemedView style={styles.titleContainer} >

        {/* <HelloWave /> */}
        <Game></Game>

      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    backgroundColor: 'purple'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    // bottom: 0,
    // left: 0,
    // position: 'absolute',
  },
  Button:{
    width: 30,
    borderEndStartRadius: 10
  },
});
