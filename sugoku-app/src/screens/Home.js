import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.div}>
        <Text>Welcome to</Text>
        <Text>Sugoku Game!</Text>
      </View>
      <Text>Gambar</Text>
      <View style={styles.div}>
        <Text>Enter Your Name:</Text>
        <Text>Input Text</Text>
      </View>
      <View style={styles.div}>
        <Text>Select Difficulty:</Text>
        <Text>Easy</Text>
        <Text>Medium</Text>
        <Text>Hard</Text>
        <Text>Random</Text>
      </View>
      <Button 
        title="Play Game"
        onPress={() => navigation.navigate('Game')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFFF',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  div: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
