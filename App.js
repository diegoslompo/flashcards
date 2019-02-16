import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeView from './views/Home';

const Stack = {
  Home: {screen: HomeView},
};

const HeaderNavigator = createStackNavigator(Stack);

/**
 * Navigator
 * @link https://review.udacity.com/#!/rubrics/1215/view
 */
const App = createAppContainer(HeaderNavigator);

export default App;