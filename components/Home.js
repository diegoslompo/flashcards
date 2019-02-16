import React, { Component } from 'react';
import { View } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { Button } from '../components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utils/helpers';


class HomeView extends Component {
 componentDidMount() {
 }

 static navigationOptions = {
   title: 'Baralhos',
 };

 render() {
   return (
     <View style={{
         height: '85%',
       }}>
       <View
         style={{
           display: 'flex',
           flexDirection: 'column',
           flexGrow: 1
         }}>
         <DeckList navigation={this.props.navigation} />
       </View>
       <View style={{ marginVertical: 10, flexGrow: 0 }}>
         <Button
           title="Adicionar ao Baralho"
           onPress={ev => this.props.navigation.navigate('AddDeck')}>
           <MaterialIcons name={'library-add'} size={24} color={colors.white} />
         </Button>
       </View>
     </View>
   );
 }
}

export default HomeView;