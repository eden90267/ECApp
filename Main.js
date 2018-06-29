import React, {Component} from 'react';

import Home from './Home';
import More from "./More";
import {Badge, Button, Container, Content, Footer, FooterTab, Icon, Text} from "native-base";


export default class Main extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    }
  }

  render() {
    return (
      <Container>
        {this._renderContent()}

        <Footer>
          <FooterTab>
            <Button active={this.state.selectedTab === 'home'}
                    onPress={() => this.setState({selectedTab: 'home'})}>
              <Icon name="ios-apps-outline"/>
              <Text>首頁</Text>
            </Button>
            <Button badge
                    active={this.state.selectedTab === 'more'}
                    onPress={() => this.setState({selectedTab: 'more'})}>
              <Badge><Text>2</Text></Badge>
              <Icon name="ios-compass-outline"/>
              <Text>更多</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }

  _renderContent() {
    if (this.state.selectedTab === 'home') {
      return (
        <Content>
          <Home navigator={this.props.navigator}/>
        </Content>
      );
    } else {
      return (
        <Content>
          <More navigator={this.props.navigator}/>
        </Content>
      )
    }

  }

}