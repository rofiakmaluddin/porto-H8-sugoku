export function changeBoard(payload) {
  return { type: 'SUDOKU/CHANGEBOARD', payload }
}

export function fetchBoard(payload) {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const res = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${ payload }`)
      const data = await res.json()
      dispatch(changeBoard(data.board))
      dispatch(isLoading(false))
    } catch (err) {
      console.log(err, 'err fetch board <<<');
      alert(err)
      dispatch(isLoading(false))
    }
  }
}

export function solve(payload) {
  fetch('https://sugoku.herokuapp.com/solve', {
    method: 'POST',
    body: encodeParams(payload),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .then(response => response.json())
    .then(response => changeBoard(response.solution))
    .catch(err => {
      alert(err)
    })
}

export function validate(payload) {
  fetch('https://sugoku.herokuapp.com/validate', {
    method: 'POST',
    body: encodeParams(payload),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .then(response => response.json())
    .then(response => alert(response))
    .catch(err => {
      alert(err)
    })
}

export function changeUsername(payload) {
  return { type: 'SUDOKU/CHANGEUSERNAME', payload }
}

export function changeDifficulty(payload) {
  return { type: 'SUDOKU/CHANGEDIFFICULTY', payload }
}
export function isLoading(payload) {
  return { type: 'LOADING/ISLOADING', payload }
}