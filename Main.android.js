import React, {Component} from 'react';

import Home from './Home';
import {StyleSheet, View, ViewPagerAndroid} from "react-native";
import More from "./More";

export default class Main extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    }
  }

  render() {
    return (
      <ViewPagerAndroid style={styles.viewPager} initialPage={0}>
        <View style={styles.pageStyle}>
          <Home navigator={this.props.navigator} />
        </View>
        <View style={styles.pageStyle}>
          <More navigator={this.props.navigator}/>
        </View>
      </ViewPagerAndroid>
    )
  }

}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1
  }
})