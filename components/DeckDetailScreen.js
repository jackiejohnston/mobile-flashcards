import React from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import { palette, asyncStore, asyncStore2 } from '../utils/constants'
import styled from 'styled-components/native'
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native'

class DeckDetailScreen extends React.Component {

  state = {
    title: "",
    cards: {}
  }

  static navigationOptions = {
    title: 'Deck',
    headerTintColor: palette.primaryColorDark,
    headerLeft: null
  }

  getDeck() {
    AsyncStorage.getItem(asyncStore, (err, result) => {
      const decks = JSON.parse(result)
      const deck = decks[this.state.title]
      this.setState({ cards: deck })
    })
  }

  componentWillMount() {
    this.setState({ title: this.props.navigation.state.params.title })
    this.getDeck()
  }

  checkForRefresh() {
    AsyncStorage.getItem(asyncStore2, (err, result) => {
      err
      ? console.log(err)
      : result === null
        ? console.log("Nothing in asyncStore2")
        : JSON.parse(result).refreshDeck
          ? this.getDeck()
          : console.log("No refresh necessary")
    })
  }

  render() {
    this.checkForRefresh()
    const { title, cards } = this.state
    return (
      <StyledView>
        <StyledMdText>{ title }</StyledMdText>
        <View>
          { cards.questions
            ? <StyledSmText>{ cards.questions.length } cards</StyledSmText>
            : <StyledSmText>0 cards</StyledSmText>
          }
          <StyledTouchableHighlight onPress={() => {
            this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'AddCard', params: { title: title }}))
          }}>
            <StyledBtnText>Add Card</StyledBtnText>
          </StyledTouchableHighlight>
          { cards.questions
            ? <StyledTouchableHighlight2 onPress={() => {
            this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Quiz', params: { title: title }}))
          }}>
               <StyledBtnText>Start Quiz</StyledBtnText>
              </StyledTouchableHighlight2>
            : <Text></Text>
          }
          <StyledTextLink onPress={() => {
            this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Home'}))
          }}>
            Decks
          </StyledTextLink>
        </View>
      </StyledView>
    )
  }

}

const StyledView = styled.View`
  background-color: ${palette.primaryColorText};
  align-items: center;
  justify-content: center;
  flex:1;
`

const StyledMdText = styled.Text`
  color: ${palette.primaryTextColor};
  font-weight: bold;
  font-size: 30px;
`

const StyledSmText = styled.Text`
  color: ${palette.secondaryTextColor};
  font-size: 14px;
  text-align: center;
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

const StyledBtnText = styled.Text`
  font-size: 16px;
  color: ${palette.primaryColorText};
  font-weight: bold;
`

const StyledTextLink = styled.Text`
  color: ${palette.primaryColorDark};
  margin: 20px;
  text-align: center;
`

export default DeckDetailScreen