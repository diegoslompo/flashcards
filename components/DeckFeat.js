import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DeckItem from './DeckItem';
import { Button } from './Button';
import { fetchData, storeData } from '../utils/api';
import { colors } from '../utils/helpers';
import PropTypes from 'prop-types';

 class DeckFeat extends Component {
   constructor(props) {
     super(props);

     this.updateRenderAfterNavigation = this.props.navigation.addListener('willFocus', () => {
       this.fetchCardsCount()
     });
   }

   componentWillMount() {
     this.updateRenderAfterNavigation;
   }

   state = {
     id: '',
     title: '',
     cardsCount: 0,
   }

   startQuiz = (ev) => {
     this.props.navigation.navigate('Quiz', {
       deckId: this.state.id,
     });
   }

   addCard = (ev) => {
     this.props.navigation.navigate('AddCard', {
       deckId: this.state.id,
       deckTitle: this.state.title,
     });
   }

   editDeck = (ev) => {
     this.props.navigation.navigate('AddDeck', {
       deckId: this.state.id,
       deckTitle: this.state.title,
     });
   }

   deleteDeck = () => {
     const removeItem = () => {
       const id = this.props.navigation.getParam('deckId');

       fetchData(data => {
         if (data && id) {
           const prevData = JSON.parse(data);
           const newData = prevData.filter(item => item.id !== id);

           storeData(newData, data => {
             this.props.navigation.navigate('Home');
           });
         }
       });
     }

     Alert.alert(
      'Remover Baralho',
      'Tem certeza que deseja remover?',
      [
        {
          text: 'cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => removeItem()},
      ],
    );
   }

   fetchCardsCount = () => {
     fetchData(data => {
       const id = this.props.navigation.getParam('deckId');
       const cardsCount = JSON.parse(data).filter(item => item.id === id)[0].cards.length;
       this.setState({ cardsCount });
     });
   }

   componentDidMount () {
     const id = this.props.navigation.getParam('deckId');
     const title = this.props.navigation.getParam('deckTitle');
     this.fetchCardsCount();
     this.setState({
       id,
       title,
     });
   }

   render() {
     const { id, title, cardsCount } = this.state;
     const hasCards = cardsCount ? true : false;
     return (
       <View key={id}>
         <View>
           <DeckItem
             id={id}
             title={title}
             cardsCount={cardsCount}
             navigation={this.props.navigation} />
         </View>
         <View>
           <Button disabled={!hasCards} title={'Iniciar Quiz'}  styleType='success' onPress={this.startQuiz} />
           <Button title={'Adicionar Cartão'} onPress={this.addCard}/>
           <Button title={'Editar Baralho'} onPress={this.editDeck}/>
           <Button title={'Remover Baralho'} styleType='danger' onPress={this.deleteDeck} />
         </View>
       </View>
     )
   }
 }

 DeckFeat.propTypes = {
   navigation: PropTypes.object.isRequired,
 };

export default DeckFeat;