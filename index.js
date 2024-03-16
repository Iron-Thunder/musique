// /**
//  * @format // this doesn't allows us to format the data anymore and will not suggest any suggestions
//  */

import TrackPlayer from 'react-native-track-player';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { playbackService } from './musicPlayerService';


AppRegistry.registerComponent(appName, () => App);

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
