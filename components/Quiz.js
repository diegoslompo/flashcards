import React, { Component } from 'react';
import { View } from 'react-native';
import QuizComp from './QuizComp';

class QuizView extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  render() {
    const id = this.props.navigation.getParam('deckId');

    return (
      <View>
        <QuizComp id={id} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default QuizView;