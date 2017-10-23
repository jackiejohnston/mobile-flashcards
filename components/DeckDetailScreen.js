import React from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import { palette } from '../utils/constants'
import styled from 'styled-components/native'
import { NavigationActions } from 'react-navigation'

class DeckDetailScreen extends React.Component {

  static navigationOptions = {
    title: 'Deck',
    headerTintColor: palette.primaryColorDark,
  }

  render() {
    const { title, cards } = this.props.navigation.state.params
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

export default DeckDetailScreen