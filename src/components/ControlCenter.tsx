import {Pressable, StyleSheet, Text, View} from 'react-native';
// import {View} from 'react-native/types';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {playbackService} from '../../musicPlayerService';

const ControlCenter = () => {
  const playBackState = usePlaybackState();
  // next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  // previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getActiveTrack();
    // if track m song h mtlb it is not empty i.e it is either paused or next song is ready to be played
    if (currentTrack !== null) {
      // if current player is either paused or next song is ready to be played then only play
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      }
      // else in every case just stop the music player
      else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>

      <Pressable
        onPress={() =>
          playBackState.state && togglePlayback(playBackState.state)
        }>
        <Icon
          style={styles.icon}
          name={playBackState.state === State.Playing ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>

      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
