import React from 'react'
import { ScrollView, View, Text, TouchableHighlight } from 'react-native'
import { palette, asyncStore, asyncStore2 } from '../utils/constants'
import styled from 'styled-components/native'
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native'
import { setLocalNotification, clearLocalNotification, getDailyReminderValue } from '../utils/notification'


class QuizScreen extends React.Component {

  state = {
    cards: [],
    correct: 0,
    index: 0,
    showQuestion: true,
    question: "",
    answer: "",
  }

  static navigationOptions = {
    title: 'Quiz',
    headerTintColor: palette.primaryColorDark,
  }


  showAnswer = () => this.setState({ showQuestion: false })
  showQuestion = () => this.setState({ showQuestion: true })


  markCorrect = () => {
    const newIndex = this.state.index + 1
    this.setState({ correct: this.state.correct + 1 })
    this.setState({ index: this.state.index + 1 })
    if (newIndex != this.state.cards.length) {
      this.setState({ question: cards[newIndex].question })
      this.setState({ answer: cards[newIndex].answer })
      this.setState({ showQuestion: true })
    }
  }

  markIncorrect = () => {
    const newIndex = this.state.index + 1
    this.setState({ index: this.state.index + 1 })
    if (newIndex != this.state.cards.length) {
      this.setState({ question: cards[newIndex].question })
      this.setState({ answer: cards[newIndex].answer })
      this.setState({ showQuestion: true })
    }
  }

  getDeck() {
    const deckTitle = this.props.navigation.state.params.title
    this.setState({title: deckTitle})
    AsyncStorage.getItem(asyncStore, (err, result) => {
      const allCards = JSON.parse(result)
      cards = allCards[deckTitle].questions
      this.setState({cards: cards, question: cards[this.state.index].question, answer: cards[this.state.index].answer})
    })
  }

  componentWillMount() {
    this.getDeck()
  }

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    const { title, cards, index, showQuestion, question, answer, correct } = this.state
    return (
      <StyledView>
        <View>
          { index === cards.length
            ? <Text></Text>
            : (
                <StyledSmText>
                  { title }: { index + 1 }/{ cards.length }
                </StyledSmText>
               )
          }
        </View>
        <View>
          { index === cards.length
            ? (
                <StyledMdText>
                  Score: { Math.round((correct/cards.length)*100) }%
                </StyledMdText>
              )
            : showQuestion
              ? (
                  <View>
                    <StyledMdText>
                      { question }
                    </StyledMdText>
                    <StyledTextLink onPress={this.showAnswer}>
                      Answer
                    </StyledTextLink>
                    <StyledTouchableHighlight onPress={this.markCorrect}>
                      <StyledBtnText>Correct</StyledBtnText>
                    </StyledTouchableHighlight>
                    <StyledTouchableHighlight2 onPress={this.markIncorrect}>
                      <StyledBtnText>Incorrect</StyledBtnText>
                    </StyledTouchableHighlight2>
                  </View>

                )
              : (
                  <View>
                    <StyledMdText>
                      { answer }
                    </StyledMdText>
                    <StyledTextLink onPress={this.showQuestion}>
                      Question
                    </StyledTextLink>
                    <StyledTouchableHighlight onPress={this.markCorrect}>
                      <StyledBtnText>Correct</StyledBtnText>
                    </StyledTouchableHighlight>
                    <StyledTouchableHighlight2 onPress={this.markIncorrect}>
                      <StyledBtnText>Incorrect</StyledBtnText>
                    </StyledTouchableHighlight2>
                  </View>
                )

          }
        </View>
      </StyledView>
    )
  }
}

const StyledView = styled.ScrollView`
  flex: 1;
  background-color: ${palette.primaryColorText};
  padding: 20px;
`

const StyledSmText = styled.Text`
  color: ${palette.secondaryTextColor};
  font-size: 14px;
  margin-bottom: 30px;
`

const StyledMdText = styled.Text`
  color: ${palette.primaryTextColor};
  font-weight: bold;
  font-size: 30px;
  text-align: center;
`

const StyledLinkText = styled.Text`
  color: ${palette.primaryColorDark};
  text-decoration: underline;
  text-align: center;
  margin: 20px;
`

const StyledTouchableHighlight = styled.TouchableHighlight`
  background-color: ${palette.primaryColor};
  border: 1px solid ${palette.dividerColor};
  margin-top: 20px;
  padding: 15px;
  align-items: center;
  border-radius: 5px;
`

const StyledTouchableHighlight2 = styled.TouchableHighlight`
  background-color: ${palette.accentColor};
  border: 1px solid ${palette.dividerColor};
  margin-top: 20px;
  padding: 15px;
  align-items: center;
  border-radius: 5px;
`

const StyledTextLink = styled.Text`
  color: ${palette.primaryColorDark};
  margin: 20px;
  text-align: center;
`

const StyledBtnText = styled.Text`
  font-size: 16px;
  color: ${palette.primaryColorText};
  font-weight: bold;
`

export default QuizScreen