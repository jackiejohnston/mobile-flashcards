import React from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import { palette, asyncStore, asyncStore2 } from '../utils/constants'
import styled from 'styled-components/native'
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native'

class AddQuestionScreen extends React.Component {
  state = {
    title: "",
    question: "",
    answer: ""
  }

  static navigationOptions = {
    title: 'Add Flashcard',
    headerTintColor: palette.primaryColorDark,
  }

  submitEntry (key, entry) {
    return AsyncStorage.mergeItem(asyncStore, JSON.stringify({
      [key]: entry
    }))
  }

  submit = () => {
    const key = this.state.title
    const entry = { questions: [{ question: this.state.question, answer: this.state.answer}] }
    this.setState({title: "", question: "", answer: ""})
    this.submitEntry(key, entry)
    AsyncStorage.mergeItem(asyncStore2, JSON.stringify({
      refreshHome: true
    }))
    this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Home', params: { refresh: true }}))
  }

  componentWillMount() {
    this.setState({title: this.props.navigation.state.params.title})
  }

  render() {
    return (
      <StyledView>
        <StyledText>Add Card to {this.state.title} Flashcards</StyledText>
        <StyledSmText>Question:</StyledSmText>
        <StyledTextInput
          autofocus
          onChangeText={(text) => {this.setState({question: text})}}
          value={this.state.question}
        />
        <StyledSmText>Answer:</StyledSmText>
        <StyledTextInput
          onChangeText={(text) => {this.setState({answer: text})}}
          value={this.state.answer}
        />
        <StyledTouchableHighlight onPress={this.submit}>
          <StyledBtnText>Submit</StyledBtnText>
        </StyledTouchableHighlight>
      </StyledView>
    )
  }

}


const StyledView = styled.View`
  flex: 1;
  background-color: ${palette.primaryColorText};
  padding: 20px;
`

const StyledText = styled.Text`
  font-size: 30px;
  color: ${palette.primaryTextColor};
  text-align: center;
`

const StyledTextInput = styled.TextInput`
  width: 100%;
  border: 1px solid ${palette.dividerColor};
  height: 45px;
  margin-top: 5px;
`

const StyledTouchableHighlight = styled.TouchableHighlight`
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

const StyledSmText = styled.Text`
  color: ${palette.secondaryTextColor};
  font-size: 14px;
  margin-top: 20px;
`

export default AddQuestionScreen