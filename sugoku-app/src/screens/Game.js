import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard, solve, validate, changeBoard } from "../store/actions";

export default function Game({ navigation }) {
  const dispatch = useDispatch()
  const { username, board, difficulty, isLoading } = useSelector(state => state.sudoku)
  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, [])

  function validateSudoku() {
    dispatch(validate(board))
  }
  function autoSolve() {
    dispatch(solve(board))
  }
  function newGame() {
    dispatch(fetchBoard(difficulty))
  }
  function update(text, rowIndex, colIndex) {
    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard[rowIndex,colIndex] = text === "" ? 0 : Number(text)
    dispatch(changeBoard(newBoard))
  }

  return (
    <View>
      <View><Text>Good luck { username } !</Text></View>
      <View><Text>{ difficulty }</Text></View>
      <View style={styles.container}>
        {
          isLoading ? <ActivityIndicator size="large" color="#00ff00" /> :
          board.map((row, rowIndex) => {
            return(
              <View key={rowIndex} style={styles.square}>
                {
                  row.map((col, colIndex) => {
                    return(
                      <TextInput 
                        value={ col ? "" : String(col)}
                        key={colIndex}
                        onChangeText={(text) => update(text, rowIndex, colIndex)}
                        textAlign= "center"
                        keyboardType={'number-pad'}
                        maxLength={1}
                        style={styles.square}
                      />
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
      <View style={styles.buttonGroup}>
        <Button 
          title="Validate"
          onPress={() => validateSudoku()}
        />
        <Button 
          title="Auto Solve"
          onPress={() => autoSolve()}
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button 
          title="Give Up"
          onPress={() => navigation.navigate('Finish')}
        />
        <Button 
          title="New Game"
          onPress={() => newGame(difficulty)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  square: {
    backgroundColor: 'rgb(194, 255, 216)',
    margin: 1,
    height: 37,
    width: 37,
    borderWidth: 4,
    borderColor: "#EED6D3",
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
