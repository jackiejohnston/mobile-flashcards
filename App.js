import React from 'react'
import { Text, View, StatusBar, Platform } from 'react-native'
import styled from 'styled-components/native'
import { Constants } from 'expo'
import { palette } from './utils/constants'
import { TabNavigator, StackNavigator } from 'react-navigation'
import HomeScreen from './components/HomeScreen'
import AddDeckScreen from './components/AddDeckScreen'
import DeckDetailScreen from './components/DeckDetailScreen'
import AddQuestionScreen from './components/AddQuestionScreen'
import QuizScreen from './components/QuizScreen'
import { Ionicons } from '@expo/vector-icons'

const Tabs = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'} size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeckScreen,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} size={30} color={tintColor} />
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? palette.primaryColorDark : palette.primaryColorText,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? palette.primaryColorText : palette.primaryColorDark,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  AddDeck: {
    screen: AddDeckScreen
  },
  DeckDetail: {
    screen: DeckDetailScreen
  },
  AddCard: {
    screen: AddQuestionScreen
  },
  Quiz: {
    screen: QuizScreen
  },
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: palette.primaryColorDark, height: Constants.statusBarHeight }}>
          <StatusBar translucent backgroundColor={ palette.primaryColorDark } barStyle="light-content" networkActivityIndicatorVisible />
        </View>
        <MainNavigator something="true" />
      </View>
    )
  }
}