import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native';
import DeckItem from './DeckItem';
import Loading from './Loading';
import { fetchData, storeData } from '../utils/api';
import PropTypes from 'prop-types';

const decklist = [
  {
    key: '14',
    id: 'deck-14',
    title: 'Baralho 1',
    cards: [
      {
        question: 'Sua Pergunta...?',
        answer: 'RESPOSTA!',
      },
      {
        question: 'Sua Pergunta...?',
        answer: 'RESPOSTA!',
      }
    ]
  },
  {
    key: '12',
    id: 'deck-12',
    title: 'Baralho 2',
    cards: [
      {
        question: 'Sua Pergunta...?',
        answer: 'RESPOSTA!',
      },
      {
        question: 'Sua Pergunta...?',
        answer: 'RESPOSTA!',
      }
    ]
  },
  {
    key: '18',
    id: 'deck-18',
    title: 'Baralho 3',
    cards: [
      {
        question: 'Sua Pergunta...?',
        answer: 'RESPOSTA!',
      },
      {
        question: 'Sua Pergunta...?',
        answer: 'RESPOSTA!',
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

  state = {
    decklist: {},
    loading: false,
  }

  componentWillMount() {
    this.updateRenderAfterNavigation
  }

  renderDeckItem = (item) => {
    return (
      <DeckItem id={item.id} key={item.id} title={item.title} cardsCount={item.cards.length} navigation={this.props.navigation} />
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
    if (this.state.loading) {
      return (
        <Loading />
      )
    } else {
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
}

DeckList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DeckList;