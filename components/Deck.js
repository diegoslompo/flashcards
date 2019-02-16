import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DeckFeat from './DeckFeat';

class DeckView extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('deckTitle'),
    };
  };

  render() {
    return (
      <View>
        <DeckFeat navigation={this.props.navigation} />
      </View>
    );
  }
}

export default DeckView;