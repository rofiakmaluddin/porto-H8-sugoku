import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector } from "react-redux";

export default function Finish({ navigation }) {
  const { username } = useSelector(state => state.sudoku)

  return (
    <View>
      <Text>You win! Congratulation { username }</Text>
      <Button 
          title="Play Again"
          onPress={() => navigation.navigate('Home')}
        />
    </View>
  )
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
  }
});
