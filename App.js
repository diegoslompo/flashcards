import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';


class HomeView extends Component {

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="orange"
        />
        <Button title="Novo Dek"  />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
