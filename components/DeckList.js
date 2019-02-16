import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native';
import { fetchData, storeData } from '../utils/api';
import PropTypes from 'prop-types';

const decklist = [
  {
    key: '1',
    id: 'deck-1',
    title: 'Deck 1',
    cards: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      }
    ]
  }
]

class DeckList extends Component {
  constructor(props) {
    super(props);

    this.updateRenderAfterNavigation = this.props.navigation.addListener('willFocus', () => {
      this.fetchData()
    });
  }



  componentWillUnmount() {
    this.updateRenderAfterNavigation
  }

  renderDeckItem = (item) => {
    return (
      <DeckItem id={item.id} title={item.title} cardsCount={item.cards.length} navigation={this.props.navigation} />
    )
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      fetchData(data => {
        if (data) {
          this.setState({ decklist: JSON.parse(data), loading: false });
        } else {
          storeData(decklist, data => {
            this.setState({ decklist: JSON.parse(data), loading: false });
          });
        }
      });
    });
  }

  componentDidMount () {
    this.fetchData();
  }

  render() {

      return (
        <View style={{ marginVertical: 5 }}>
          <FlatList
            data={this.state.decklist}
            renderItem={({item}) => this.renderDeckItem(item)}
            />
        </View>
      )

  }
}

DeckList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DeckList;