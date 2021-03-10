const initialState = {
  username: '',
  board: [],
  duplicatedBoard: [],
  difficulty: 'easy',
  giveUp: false,
  isLoading: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'SUDOKU/CHANGEUSERNAME':
      return { ...state, username: payload}
    case 'SUDOKU/CHANGEBOARD':
      return { ...state, board: payload}
    case 'SUDOKU/CHANGEDUPLICATEDBOARD':
      return { ...state, duplicatedBoard: payload}
    case 'SUDOKU/CHANGEDIFFICULTY':
      return { ...state, difficulty: payload}
    case 'SUDOKU/GIVEUP':
      return { ...state, giveUp: payload}
    case 'LOADING/ISLOADING':
      return { ...state, isLoading: payload}
    default:
      return state
  }
}

export default reducer