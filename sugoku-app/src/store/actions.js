const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export function changeBoard(payload) {
  return { type: 'SUDOKU/CHANGEBOARD', payload }
}

export function changeDuplicatedBoard(payload) {
  return { type: 'SUDOKU/CHANGEDUPLICATEDBOARD', payload }
}

export function fetchBoard(payload) {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const res = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${ payload }`)
      const data = await res.json()
      dispatch(changeBoard(data.board))
      dispatch(changeDuplicatedBoard(data.board))
      dispatch(isLoading(false))
    } catch (err) {
      console.log(err, 'err fetch board <<<');
      alert(err)
      dispatch(isLoading(false))
    }
  }
}

export function solve(payload) {
  return (dispatch) => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(payload),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => dispatch(changeBoard(response.solution)))
      .catch(err => {
        alert(err)
      })
  }
}

export function validate(payload) {
  console.log(payload, 'board validate <<<');
  return (dispatch) => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(payload),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.status === 'unsolved') {
          alert(response.status)
        }
      })
      .catch(err => {
        alert(err)
      })
  }
}

export function changeUsername(payload) {
  return { type: 'SUDOKU/CHANGEUSERNAME', payload }
}

export function changeDifficulty(payload) {
  return { type: 'SUDOKU/CHANGEDIFFICULTY', payload }
}

export function changeGiveUp(payload) {
  return { type: 'SUDOKU/GIVEUP', payload }
}

export function isLoading(payload) {
  return { type: 'LOADING/ISLOADING', payload }
}