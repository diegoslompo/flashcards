import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AddDeckComp from './AddDeckComp';

class AddDeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const id = navigation.getParam('deckId');
    return {
      title: (id) ? 'Editar' : 'Adicionar',
    };
  };
  static navigationOptions = {
    title: 'Adicionar ao Baralho',
  };

  render() {
    return (
      <View>
        <AddDeckComp navigation={this.props.navigation} />
      </View>
    );
  }
}

export default AddDeckView;