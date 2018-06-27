import React, {Component} from 'react';
import {TabBarIOS} from "react-native";

import Home from './Home';
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
      <TabBarIOS unselectedTintColor="gray"
                 tintColor="white"
                 barTintColor="orange">
        <TabBarIOS.Item title="首頁"
                        icon={require('./images/icon-home.png')}
                        selected={this.state.selectedTab === 'home'}
                        onPress={() => {
                          this.setState({selectedTab: 'home'})
                        }}>
          <Home navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item systemIcon="more"
                        badge={2}
                        selected={this.state.selectedTab === 'more'}
                        onPress={() => {
                          this.setState({selectedTab: 'more'})
                        }}>
          <More navigator={this.props.navigator}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }

}