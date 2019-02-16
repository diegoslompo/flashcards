import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AddCard from './AddCard';

class AddCardView extends Component {
  state = {
    id: '',
  }

  static navigationOptions = ({ navigation }) => {
    deckTitle = navigation.getParam('deckTitle');
    return {
      title: `Novo Baralho ${deckTitle}`,
    };
  };

  componentDidMount() {
    const id = this.props.navigation.getParam('deckId');
    this.setState({ id });
  }

  render() {
    return (
      <View>
        <AddCard id={this.state.id} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default AddCardView;