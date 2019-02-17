import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeView from './components/Home';
import DeckView from './components/Deck';
import QuizView from './components/Quiz';
import AddDeckView from './components/AddDeck';
import AddCardView from './components/AddCard';

const Stack = {
  Home: {screen: HomeView},
  Deck: {screen: DeckView},
  Quiz: {screen: QuizView},
  AddDeck: {screen: AddDeckView},
  AddCard: {screen: AddCardView},
};

const HeaderNavigator = createStackNavigator(Stack);

/**
 * Navigator
 * @link https://review.udacity.com/#!/rubrics/1215/view
 */
const App = createAppContainer(HeaderNavigator);

export default App;