/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Button,
  Platform, ScrollView,
  StyleSheet,
  Text, TextInput,
  View,
  Dimensions,
  ListView,
  Alert, TouchableHighlight, StatusBar, Image, RefreshControl
} from 'react-native';

const ds = new ListView.DataSource({ // 創建 ListView.DataSource 數據源
  rowHasChanged: (r1, r2) => r1 !== r2
});

const circleSize = 8;
const circleMargin = 5;

export default class Home extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      dataSource: ds.cloneWithRows([ // 為數據源傳遞一個數組
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
      ]),
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
    const advertisementCount = this.state.advertisements.length;
    const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount * 2;
    const left = (Dimensions.get('window').width - indicatorWidth) / 2;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'blue'} barStyle={'default'} networkActivityIndicatorVisible={true}>
        </StatusBar>
        <View style={styles.searchbar}>
          <TextInput style={styles.input} placeholder="搜索商品" onChangeText={(text) => {
            this.setState({searchText: text});
            console.log('輸入的內容是 ' + this.state.searchText);
          }}/>
          <Button style={styles.button} title="搜索"
                  onPress={() => Alert.alert('搜索內容 ' + this.state.searchText, null, null)}/>
        </View>
        <View style={styles.advertisement}>
          <ScrollView ref="scrollView"
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled={true}>
            {this.state.advertisements.map((advertisement, index) => {
              return (
                <TouchableHighlight key={index} onPress={() => Alert.alert('你單擊了輪播圖', null, null)}>
                  <Image style={styles.advertisementContent} source={advertisement.image}/>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
          <View style={[styles.indicator, {left}]}>
            {this.state.advertisements.map((advertisement, index) => {
              return (<View key={index}
                            style={(index === this.state.currentPage)
                              ? styles.circleSelected
                              : styles.circle}></View>)
            })}
          </View>
        </View>
        <View style={styles.products}>
          <ListView dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    refreshControl={this._renderRefreshControl()}/>
        </View>
      </View>
    );
  }

  _renderRow = (rowData, sectionID, rowID) => {
    return (
      <TouchableHighlight onPress={() => Alert.alert('你單擊了商品列表', null, null)}>
        <View style={styles.row}>
          <Image source={rowData.image} style={styles.productImage}/>
          <View style={styles.productText}>{/* flexDirection 默認為 "column" */}
            <Text style={styles.productTitle}>{rowData.title}</Text>
            <Text style={styles.productSubTitle}>{rowData.subTitle}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  };

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={`${sectionID}-${rowID}`} style={styles.divider}/>
    )
  }

  _renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh}
        tintColor={'#FF0000'}
        title={'正在刷新數據，請稍候...'}
        titleColor={'#0000FF'}>
      </RefreshControl>
    )
  }

  _onRefresh = () => {
    this.setState({isRefreshing: true});

    setTimeout(() => {
      const products = Array.from(new Array(10)).map((value, index) => ({
        image: require('./images/advertisement-image-01.jpg'),
        title: '新商品' + index,
        subTitle: '新商品描述' + index
      }));
      this.setState({isRefreshing: false, dataSource: ds.cloneWithRows(products)});
    }, 2000);
  };

  componentDidMount() {
    this._startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _startTimer() {
    this.interval = setInterval(() => {
      let nextPage = this.state.currentPage + 1;
      if (nextPage >= 3) {
        nextPage = 0;
      }
      this.setState({currentPage: nextPage});
      const offsetX = nextPage * Dimensions.get('window').width; // 計算 ScrollView 滾動的 X 軸偏移量 (因為是橫向滾動)
      this.refs.scrollView.scrollResponderScrollTo({x: offsetX, y: 0, animated: true});
    }, 2000);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchbar: {
    marginTop: Platform.OS === 'ios'
      ? 20
      : 0,
    height: 40,
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10
  },
  button: {
    flex: 1
  },
  advertisement: {
    height: 180
  },
  advertisementContent: {
    width: Dimensions.get('window').width,
    height: 180
  },
  indicator: {
    position: 'absolute',
    top: 160,
    flexDirection: 'row'
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'gray',
    marginHorizontal: circleMargin
  },
  circleSelected: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'white',
    marginHorizontal: circleMargin
  },
  products: {
    flex: 1,
  },
  row: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  productImage: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center'
  },
  productText: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  productTitle: {
    flex: 3,
    fontSize: 16
  },
  productSubTitle: {
    flex: 2,
    fontSize: 14,
    color: 'gray'
  },
  divider: {
    height: 1,
    width: Dimensions.get('window').width - 5,
    marginLeft: 5,
    backgroundColor: 'lightgray'
  }
});
