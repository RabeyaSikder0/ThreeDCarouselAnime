/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

enableReactTracking({
    auto: true,
});

AppRegistry.registerComponent(appName, () => App);
