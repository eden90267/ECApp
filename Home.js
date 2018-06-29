/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  ListView,
  Alert, Image, RefreshControl, TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper'
import Detail from "./Detail";
import {
  Container,
  Content,
  Header,
  Icon,
  Input,
  Button,
  Item,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left, Body
} from "native-base";

export default class Home extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      products: [
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 1',
          subTitle: '描述 1'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 2',
          subTitle: '描述 2'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 3',
          subTitle: '描述 3'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 3',
          subTitle: '描述 3'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 4',
          subTitle: '描述 4'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 5',
          subTitle: '描述 5'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 6',
          subTitle: '描述 6'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 7',
          subTitle: '描述 7'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 8',
          subTitle: '描述 8'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 9',
          subTitle: '描述 9'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品 10',
          subTitle: '描述 10'
        }
      ],
      showSwiper: false,
      advertisements: [ // 輪播廣告陣列
        {
          image: require('./images/advertisement-image-01.jpg')
        },
        {
          image: require('./images/advertisement-image-02.jpg')
        },
        {
          image: require('./images/advertisement-image-03.jpg')
        }
      ],
      searchText: '',
      isRefreshing: false
    };
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search-outline"/>
            <Input
              placeholder="搜索商品"
              onChangeText={(text) => {
                this.setState({searchText: text});
                console.log('輸入的內容是 ' + this.state.searchText);
              }}/>
          </Item>
          <Button transparent onPress={() => {
            Alert.alert('搜索內容' + this.state.searchText, null, null);
          }}>
            <Text>搜索</Text>
          </Button>
        </Header>
        <Content>
          <View style={styles.advertisement}>
            {
              this.state.showSwiper ?
                <Swiper loop={true} height={190} autoplay={true}>
                  {this.state.advertisements.map((advertisement, index) => {
                    return (
                      <TouchableHighlight key={index} onPress={() => Alert.alert('你單擊了輪播圖', null, null)}>
                        <Image style={styles.advertisementContent} source={advertisement.image}/>
                      </TouchableHighlight>
                    )
                  })}
                </Swiper> :
                null
            }
          </View>
          <List dataArray={this.state.products} renderRow={this._renderRow}>
          </List>
        </Content>
      </Container>
    );
  }

  _renderRow = (product) => {
    return (
      <ListItem
        button
        onPress={() => {
          const {navigator} = this.props;
          if (navigator) {
            navigator.push({
              name: 'detail',
              component: Detail,
              params: {
                productTitle: product.title
              }
            })
          }
        }}
        avatar
      >
        <Left>
          <Thumbnail square size={40} source={product.image}/>
        </Left>
        <Body>
        <Text>{product.title}</Text>
        <Text note>{product.subTitle}</Text>
        </Body>
      </ListItem>
    )
  };

  componentDidMount() {
    setTimeout(() =>
        this.setState({showSwiper: true}),
      0
    );
  }

}

const styles = StyleSheet.create({
  advertisementContent: {
    width: Dimensions.get('window').width,
    height: 180
  }
});
