import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AddCardComp from './AddCardComp';

class AddCardView extends Component {
  state = {
    id: '',
  }

  static navigationOptions = ({ navigation }) => {
    deckTitle = navigation.getParam('deckTitle');
    return {
      title: `Adicionar um novo cartão ao ${deckTitle}`,
    };
  };

  componentDidMount() {
    const id = this.props.navigation.getParam('deckId');
    this.setState({ id });
  }

  render() {
    return (
      <View>
        <AddCardComp id={this.state.id} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default AddCardView;