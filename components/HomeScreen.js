import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'
import * as palette from '../utils/colors'
import { fetchDecks } from '../actions'

class HomeScreen extends React.Component {

  componentDidMount() {
    this.props.fetchDecks()
  }

  static navigationOptions = {
    title: 'Decks',
  }
  render() {
    const { decks } = this.props
    const { navigate } = this.props.navigation;
    return (
      <View>
        {Object.entries(decks).map((deck, i) =>
          <Text key={ i }>
            { deck[0] } - { deck[1].questions.length } cards
          </Text>
        )}

        <Button
          onPress={() => navigate('AddDeck')}
          title="Add Deck"
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  decks: state.decks
})

const mapDispatchToProps = (dispatch) => ({
  fetchDecks: () => dispatch(fetchDecks()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)