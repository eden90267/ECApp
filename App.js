/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  View
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Main from "./Main";

export default class App extends Component<{}> {

  render() {
    return (
      <Navigator
        initialRoute={{
          name: 'main',
          component: Main
        }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          const Component = route.component;
          return <Component {...route.params} navigator={navigator}/>
        }}
      />
    )
  }

}