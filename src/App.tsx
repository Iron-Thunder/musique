import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {PropsWithChildren} from 'react';
import React, {useState, useEffect} from 'react';

import {playbackService, addTrack, setupPlayer} from '../musicPlayerService';
import MusicPlayer from './screens/MusicPlayer';

const {width, height} = Dimensions.get('window');


const App = (): JSX.Element => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setUp() {
    let isSetup = await setupPlayer();
    console.log("setup :", isSetup)
    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setUp();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <MusicPlayer />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width
  },
});
