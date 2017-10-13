import { combineReducers } from 'redux'
import { FETCH_DECKS } from '../actions'

const initialState = {
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
  }
}

export function decks(state = initialState, action) {
  switch(action.type) {
    case FETCH_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  decks
})

export default rootReducer