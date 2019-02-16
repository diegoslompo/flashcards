import React, { Component } from 'react';


import DeckList from './DeckList'

/**
 * Database
 */
const DECK_LIST = 'DECK_LIST';
const decklist = [
  {
    key: '1',
    id: 'deck-1',
    title: 'Baralho 1',
    cards: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      }
    ]
  },
  {
    key: '2',
    id: 'deck-2',
    title: 'Baralho 2',
    cards: [],
  },
]
const storeData = (key, value, callback = function () {}) => {
  AsyncStorage.setItem(key, JSON.stringify(value)).then(error => {
    AsyncStorage.getItem(key).then(data => callback());
  });
}
const fetchData = (key, callback = function () {}) => {
  AsyncStorage.getItem(key).then(data => callback());
}


  export default class HomeView extends Component {
  
    static navigationOptions = {
      title: 'Home',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="orange"
          />
          <DeckList 
            decklist={decklist}
            navigation={this.props.navigation} />
          <Button 
            color="green"
            style={styles.buttons}
            title="Adicionar Novo Deck"
            onPress={ev => this.props.navigation.navigate('AddDeck')} />
          {/* <Button title="Notify" onPress={ev => setLocalNotification()} /> */}
        </View>
      );
    }
  }

  
const styles = StyleSheet.create({
    container: {
      margin: 15,
      padding: 15,
      borderWidth: 1,
      borderColor: '#d6d7da',
      borderRadius: 5,
    },
    list: {
      marginTop: 4,
      marginBottom: 4,
      padding: 10,
      backgroundColor: '#d6d7da',
      borderRadius: 5,
      flexWrap: 'wrap', 
      alignItems: 'flex-start',
      justifyContent:'space-between',
      flexDirection:'row',
    },
    buttons: {
      marginTop: 10,
    }
  });
  