import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from './Button';
import { fetchData, storeData } from '../utils/api';
import {clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { colors } from '../utils/helpers';
import PropTypes from 'prop-types';

class QuizComp extends PureComponent {
  state = {
    hits: 0,
    cards: [],
    cardActiveIndex: 0,
    isShowingQuestion: true,
    isResult: false,
  }

  userAnswer = (isAnswerCorrect) => {
    this.setState(prevState => {
      const isResult = (prevState.cards.length === (prevState.cardActiveIndex + 1)) ? true : false;
      return {
        ...prevState,
        hits: prevState.hits + isAnswerCorrect,
        cardActiveIndex: prevState.cardActiveIndex + 1,
        isResult,
        isShowingQuestion: true,
      }
    })
  }

  toggleQA = (ev) => {
    this.setState(prevState => {
      return {
        ...prevState,
        isShowingQuestion: !prevState.isShowingQuestion,
      }
    })
  }

  fecthCards = () => {
    fetchData(data => {
      const { id } = this.props;
      const cards = JSON.parse(data).filter(item => item.id === id)[0].cards;
      this.setState({ cards });
    });
  }

  restartQuiz = () => {
    this.setState({
      hits: 0,
      cardActiveIndex: 0,
      isShowingQuestion: true,
      isResult: false,
    });
  }

  componentDidMount() {
    this.fecthCards()

    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    const { cardActiveIndex, hits, isShowingQuestion, isResult, cards } = this.state;
    const { id } = this.props;
    const currentQuestion = cards[cardActiveIndex];
    const title = currentQuestion ? ((isShowingQuestion) ? currentQuestion.question : currentQuestion.answer) : '';

    return (
      <View style={styles.quiz}>
        {isResult ? (
          <View>
            <View style={styles.quizBox}>
              <Text>
                Resultado
              </Text>
              <View style={styles.quizResult}>
                <Text style={styles.quizResultHits}>Acertos</Text>
                <Text style={styles.quizResultBox}>
                  <Text style={[styles.quizResultHighlight, styles.quizResultHits]}>{hits}</Text>
                  <Text>{` / ${cards.length}`}</Text>
                </Text>
              </View>
              <View style={styles.quizResult}>
                <Text style={styles.quizResultMisses}>Erros</Text>
                <Text style={styles.quizResultBox}>
                  <Text style={[styles.quizResultHighlight, styles.quizResultMisses]}>{cards.length - hits}</Text>
                  <Text>{` / ${cards.length}`}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.quizButtons}>
              <Button title={'Reiniciar o Quiz'} onPress={ev => this.restartQuiz()}>
                <MaterialCommunityIcons name={'restart'} size={24} color={colors.white} />
              </Button>
              <Button title={'Voltar ao Baralho'} onPress={ev => this.props.navigation.goBack()}>
                <MaterialIcons name={'keyboard-return'} size={24} color={colors.white} />
              </Button>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.quizBox}>
              <View style={styles.quizCount}>
                <Text>{`${cardActiveIndex + 1}/${cards.length}`}</Text>
              </View>
              <View>
                <Text style={styles.quizTitle}>{title}</Text>
                <TouchableHighlight
                  style={styles.quizLinkContainer}
                  underlayColor="transparent"
                  onPress={this.toggleQA}>
                  <Text style={styles.quizLink}>Mostrar {isShowingQuestion ? 'RESPOSTA' : 'PERGUNTA'}</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.quizButtons}>
              <Button styleType='success' title={'Correct'} onPress={ev => this.userAnswer(1)}>
                <MaterialIcons name={'check'} size={24} color={colors.white} />
              </Button>
              <Button styleType='danger' title={'Incorrect'} onPress={ev => this.userAnswer(0)}>
                <MaterialIcons name={'close'} size={24} color={colors.white} />
              </Button>
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quiz: {
    marginHorizontal: 10,
  },
  quizBox: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  quizButtons: {
    marginVertical: 20,
  },
  quizTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  quizLinkContainer: {
    alignItems: 'center',
  },
  quizLink: {
    color: colors.blue,
    textDecorationLine: "underline",
    fontSize: 16,
    marginVertical: 10,
  },
  quizCount: {
    marginVertical: 10,
  },
  quizResult: {
    marginVertical: 15,
  },
  quizResultBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  quizResultHighlight: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  quizResultHits: {
    color: colors.green,
    fontWeight: 'bold',
  },
  quizResultMisses: {
    color: colors.red,
    fontWeight: 'bold',
  },
});

QuizComp.propTypes = {
  id: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default QuizComp;