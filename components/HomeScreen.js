import React from 'react'
import { ScrollView, TouchableHighlight, View, Text, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { palette, asyncStore, asyncStore2 } from '../utils/constants'
import styled from 'styled-components/native'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Flashcards',
  }

  state = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
  }

  getDecks() {
    AsyncStorage.getItem(asyncStore, (err, result) => {
      err
      ? console.log (err)
      : result === null
        ? AsyncStorage.setItem(asyncStore, JSON.stringify(this.state), () => {
          // console.log("added state to async", JSON.stringify(this.state))
        })
        : this.setState(JSON.parse(result))
          // console.log("set state", JSON.parse(result))
    })
  }

  checkForRefresh() {
    AsyncStorage.getItem(asyncStore2, (err, result) => {
      err
      ? console.log(err)
      : result === null
        ? console.log("Nothing in asyncStore2")
        : JSON.parse(result).refreshHome
          ? this.getDecks()
          : console.log("No refresh necessary")
    })
  }

  componentWillMount() {
    this.getDecks()
  }

  render() {
    this.checkForRefresh()
    const { navigate } = this.props.navigation
    return (
      <StyledScrollView>
        {Object.entries(this.state).map((deck, i) =>
          <StyledTouchableHighlight key={ i } onPress={() => {
            this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'DeckDetail', params: { title: deck[0], cards: deck[1] }}))
          }}>

            <StyledView>
              <StyledMdText>{ deck[0] }</StyledMdText>
              { deck[1].questions
              ? <StyledSmText>{ deck[1].questions.length } cards</StyledSmText>
              : <StyledSmText>0 cards</StyledSmText>
              }
            </StyledView>
          </StyledTouchableHighlight>
        )}
      </StyledScrollView>
    )
  }
}

const StyledScrollView = styled.ScrollView`
  background-color: ${palette.primaryColorText};
`

const StyledTouchableHighlight = styled.TouchableHighlight`
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: ${palette.primaryColor};
  border: 1px solid ${palette.dividerColor};
  margin: 10px 10px 0 10px;
`

const StyledView = styled.View`
  align-items: center;
`

const StyledMdText = styled.Text`
  color: ${palette.primaryColorText};
  font-weight: bold;
  font-size: 30px;
`

const StyledSmText = styled.Text`
  color: ${palette.primaryColorLight};
  font-size: 14px;
`

export default HomeScreen