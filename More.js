import React, {Component} from 'react';
import {StyleSheet, View, Switch, WebView} from 'react-native';

export default class MyComponent extends Component<{}> {

  render() {
    return (
      <View style={styles.container}>
        <WebView source={{uri: 'https://sina.cn'}}
                 style={styles.web}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  web: {
    width: 200,
    height: 200
  }
});