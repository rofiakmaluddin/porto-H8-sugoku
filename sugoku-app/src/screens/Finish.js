import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'react-native-paper';
import { changeGiveUp } from "../store/actions";

export default function Finish({ navigation }) {
  const dispatch = useDispatch()
  const { username, giveUp } = useSelector(state => state.sudoku)

  return (
    <View style={ styles.container }>
      {
        giveUp ?
        <View style={ styles.itemContainer }>
          <Text style={ styles.item }>You Lose!</Text>
          <Text style={ styles.item }>Please Try Again</Text>
          <Text style={ styles.item }>{ username }</Text>
        </View>
        :
        <View style={ styles.itemContainer }>
          <Text style={ styles.item }>You Win!</Text>
          <Text style={ styles.item }>Congratulation { username }</Text>
        </View>
      }
      <Button 
          mode="contained"
          color="#4B250F"
          onPress={() => {
            dispatch(changeGiveUp(false))
            navigation.navigate('Home')
          }}
        >Play Again</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEB0A7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    backgroundColor: '#BEB0A7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  item: {
    fontSize: 30
  }
});
