import React from 'react'
import { Text, View, StatusBar, Platform } from 'react-native'
import styled from 'styled-components/native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import * as palette from './utils/colors'
import { TabNavigator, StackNavigator } from 'react-navigation'
import HomeScreen from './components/HomeScreen'
import AddDeckScreen from './components/AddDeckScreen'

const Tabs = TabNavigator({
  Home: {
    screen: HomeScreen
  },
  AddDeck: {
    screen: AddDeckScreen
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  AddDeck: {
    screen: AddDeckScreen
  },
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ createStore(reducer) }>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: palette.primaryColorDark, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={ palette.primaryColorDark } barStyle="light-content" networkActivityIndicatorVisible />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}