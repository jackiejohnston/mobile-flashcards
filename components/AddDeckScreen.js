import React from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import { palette, asyncStore, asyncStore2 } from '../utils/constants'
import styled from 'styled-components/native'
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native'

class AddDeckScreen extends React.Component {

  state = { text: "" }

  static navigationOptions = {
    title: 'Add Flashcard Deck',
  }

  submitEntry (key, entry) {
    return AsyncStorage.mergeItem(asyncStore, JSON.stringify({
      [key]: entry
    }))
  }

  submit = () => {
    const key = this.state.text
    const entry = { title: key }
    this.setState({text: ""})
    this.submitEntry(key, entry)
    AsyncStorage.mergeItem(asyncStore2, JSON.stringify({
      refreshHome: true
    }))
    this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Home', params: { refresh: true }}))
  }

  render() {
    return (
      <StyledView>
        <StyledText>What is the title of your new deck?</StyledText>
        <StyledTextInput
          autofocus
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
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
  margin-top: 20px;
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

export default AddDeckScreen