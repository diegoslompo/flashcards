import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from './Button';
import { colors } from '../utils/helpers';
import PropTypes from 'prop-types';

class AddDeckComp extends Component {
  state = {
    title: '',
    titleError: false,
  }

  render() {
    const { titleError } = this.state;
    const id = this.props.navigation.getParam('deckId');
    return (
      <View style={styles.formControl}>
        <Text style={styles.formLabel}>Titulo Baralho</Text>
        <TextInput
           style={styles.formInput}
           autoFocus={true}
           onChangeText={(title) => this.setState({title, titleError: false })}
           value={this.state.title}
         />
       {titleError && (
           <Text style={styles.formError}>Campos necessários</Text>
         )}
       <Button title={`${(id) ? 'Editar' : 'Adicionar'}`} onPress={this.onPress}>
         <MaterialIcons name={'library-add'} size={24} color={colors.white} />
       </Button>
      </View>
    )
  }
}



AddDeckComp.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddDeckComp;