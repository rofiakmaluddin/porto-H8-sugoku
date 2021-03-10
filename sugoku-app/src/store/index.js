import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import sudokuReducer from './reducers/sudoku'

const rootReducer = combineReducers({
  sudoku: sudokuReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store