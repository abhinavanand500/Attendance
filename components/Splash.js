import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/splash.png')}
          style={styles.backgroundImage}></Image>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(32, 53, 70)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'yellow',
  },
  backgroundImage: {
    flex: 1,
    // height:"100%",
    // width:"100%",
    flex: 1,
    width: '100%',
    resizeMode: 'cover', // or 'stretch'
  },
});
