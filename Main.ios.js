import React, {Component} from 'react';

import Home from './Home';

export default class MainIos extends Component<{}> {

  render() {
    return (
      <Home navigator={this.props.navigator} />
    )
  }

}