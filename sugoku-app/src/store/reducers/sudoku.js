const initialState = {
  username: 'Rofi',
  board: [],
  difficulty: 'easy',
  isLoading: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'SUDOKU/CHANGEUSERNAME':
      return { ...state, username: payload}
    case 'SUDOKU/CHANGEBOARD':
      return { ...state, board: payload}
    case 'SUDOKU/CHANGEDIFFICULTY':
      return { ...state, difficulty: payload}
    case 'LOADING/ISLOADING':
      return { ...state, isLoading: payload}
    default:
      return state
  }
}

export default reducer