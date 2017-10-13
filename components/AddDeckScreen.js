import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { StackNavigator } from 'react-navigation'
import * as palette from '../utils/colors'

class AddDeckScreen extends React.Component {

  state = { text: "" }

  static navigationOptions = {
    title: 'Add New Deck',
  }

  render() {
    return (
      <View>
        <Text>Name of new deck:</Text>
        <TextInput
          autofocus
          style={{height: 40, borderColor: palette.dividerColor, borderWidth: 1, margin:10}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.deckName}
        />
      </View>
    )
  }
}

export default AddDeckScreen