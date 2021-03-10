import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard, solve, validate, changeBoard, changeGiveUp } from "../store/actions";
import { Button } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

export default function Game({ navigation }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, [])
  const { username, board, duplicatedBoard, difficulty, isLoading, giveUp } = useSelector(state => state.sudoku)

  function validateSudoku() {
    const tempBoard = {
      board
    }
    dispatch(validate(tempBoard))
    navigation.navigate('Finish')
  }
  function autoSolve() {
    const tempBoard = {
      board: duplicatedBoard
    }
    dispatch(solve(tempBoard))
  }
  function newGame() {
    dispatch(fetchBoard(difficulty))
  }
  function updateBoard(text, rowIndex, colIndex) {
    const newBoard = JSON.parse(JSON.stringify(board))
    console.log(text, rowIndex, colIndex, '<<<');
    newBoard[rowIndex][colIndex] = text === "" ? 0 : Number(text)
    dispatch(changeBoard(newBoard))
  }

  return (
    <View style={styles.container}>
      <View style={{
        alignItems: 'center'
      }}>
        <View><Text style={{fontSize: 35, fontWeight: 'bold'}}>Good Luck { username } !</Text></View>
        <View><Text style={{fontSize: 25}}>{ difficulty.toUpperCase() }</Text></View>
      </View>
      <View>
        {
          isLoading ? <ActivityIndicator size="large" color="#00ff00" /> :
          board.map((row, rowIndex) => {
            return(
              <View key={rowIndex} style={styles.containerBoard}>
                {
                  row.map((col, colIndex) => {
                    return(
                      <TextInput 
                        value={ col === 0 ? "" : String(col)}
                        key={colIndex}
                        onChangeText={(text) => updateBoard(text, rowIndex, colIndex)}
                        textAlign= "center"
                        keyboardType={'number-pad'}
                        maxLength={1}
                        style={
                          (colIndex < 3 && rowIndex < 3) 
                          || (colIndex > 5 && rowIndex < 3)
                          || (colIndex >= 3 && colIndex <= 5 && rowIndex >= 3 && rowIndex <= 5)
                          || (colIndex < 3 && rowIndex > 5)
                          || (colIndex > 5 && rowIndex > 5)
                            ? styles.darkSquare 
                            : styles.lightSquare
                        }
                        editable= { duplicatedBoard[rowIndex][colIndex] === 0 ? true : false }
                      />
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
      <View style={{
        width: 210
      }}>
        <View style={styles.buttonGroup}>
          <Button 
            mode="contained"
            color="#4B250F"
            onPress={() => validateSudoku()}
          >Validate</Button>
          <Button 
            mode="contained"
            color="#4B250F"
            onPress={() => autoSolve()}
          >Auto Solve</Button>
        </View>
        <View style={styles.buttonGroup}>
          <Button 
            mode="contained"
            color="#4B250F"
            onPress={() => {
              dispatch(changeGiveUp(true))
              navigation.navigate('Finish')
            }}
          >Give Up</Button>
          <Button 
            mode="contained"
            color="#4B250F"
            onPress={() => newGame(difficulty)}
          >New Game</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEB0A7',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  containerBoard: {
    // backgroundColor: '#8B9D83',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  lightSquare: {
    backgroundColor: 'white',
    margin: 1,
    height: (windowWidth - 25) / 9,
    width: (windowWidth - 25) / 9,
    borderWidth: 4,
    borderColor: "#4B250F",
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25
  },
  darkSquare: {
    backgroundColor: '#FC7E4C',
    margin: 1,
    height: (windowWidth - 25) / 9,
    width: (windowWidth - 25) / 9,
    borderWidth: 4,
    borderColor: "#4B200F",
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 9,
    marginHorizontal: 5
  },
  button: {
    marginHorizontal: 5
  }
});
