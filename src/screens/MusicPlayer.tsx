import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrackPlayer, {
  Event,
  State,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playListData} from '../constants';
import SongInfo from '../components/SongInfo.tsx';
import ControlCenter from '../components/ControlCenter.tsx';
import SongSlider from '../components/SongSlider.tsx';

const {width, height} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    console.log('mounted track');
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        //   consol e.log(event);
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack);
        break;
    }
  });

  const renderArtWork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork ? (
            <Image
              style={styles.albumArtImg}
              source={{uri: track?.artwork?.toString()}}
              // agar track present h then uska artwork lo(from constant.ts) phir if artwork h then usko to string m karo
            />
          ) : (
            <Text
              style={{
                color: 'white',
              }}>
              No Image
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      /> */}
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork ? (
            <Image
              style={styles.albumArtImg}
              source={{uri: track?.artwork?.toString()}}
              // agar track present h then uska artwork lo(from constant.ts) phir if artwork h then usko to string m karo
            />
          ) : (
            <Text
              style={{
                color: 'white',
              }}>
              No Image
            </Text>
          )}
        </View>
      </View>
      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: width - 40,
    marginHorizontal: 10,
    marginTop:50,
    height: height*0.65,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});
