import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import { changeUsername, changeDifficulty } from "../store/actions";
import { useDispatch } from "react-redux";

export default function Home({ navigation }) {
  const dispatch = useDispatch()
  const [newUsername, setNewUsername] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  function onChangeText(text) {
      setNewUsername(text)
  }
  return (
    <View style={styles.container}>
      <View style={styles.div2}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.welcome}>Sugoku Game!</Text>
      </View>
      <Image
        style={styles.tinyLogo}
        source={require('../images/joystick.png')}
      />
      <View style={styles.div}>
        <Text style={styles.name}>Enter Your Name:</Text>
        <TextInput
          style={{ 
            height: 40, 
            width: 275,
            borderWidth: 4,
            borderColor: "#4B250F",
            borderRadius: 6,
            paddingHorizontal: 11,
            fontSize: 20,
            backgroundColor: '#FC7E4C',
            color: "#4B250F"
          }}
          onChangeText={text => onChangeText(text)}
        />
      </View>
      <View style={styles.div}>
        <Text style={styles.difficulty}>Select Difficulty:</Text>
         <View style={{flexDirection:"row",alignItems:'center', width: 130}}>
            <View style={{flex:1}}>
              <RadioButton
                value="easy"
                status={ selectedDifficulty === 'easy' ? 'checked' : 'unchecked' }
                onPress={() => setSelectedDifficulty('easy')}
              />
              <RadioButton
                value="medium"
                status={ selectedDifficulty === 'medium' ? 'checked' : 'unchecked' }
                onPress={() => setSelectedDifficulty('medium')}
              />
              <RadioButton
                value="hard"
                status={ selectedDifficulty === 'hard' ? 'checked' : 'unchecked' }
                onPress={() => setSelectedDifficulty('hard')}
              />
              <RadioButton
                value="random"
                status={ selectedDifficulty === 'random' ? 'checked' : 'unchecked' }
                onPress={() => setSelectedDifficulty('random')}
              />
            </View>
            <View style={{flex:2}}>
              <Text style={styles.option}>Easy</Text>
              <Text style={styles.option}>Medium</Text>
              <Text style={styles.option}>Hard</Text>
              <Text style={styles.option}>Random</Text>
            </View>
          </View>
        
      </View>
      <Button 
        onPress={() => {
          if (newUsername) {
            dispatch(changeUsername(newUsername))
            dispatch(changeDifficulty(selectedDifficulty))
            navigation.navigate('Game')
          } else if (newUsername === "" || !newUsername) {
            alert('You must insert your name')
          }
        }}
        mode="contained"
        color="#4B250F"
      >
        Play Game
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEB0A7',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  div2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  div2: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  welcome: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 30,
  },
  difficulty: {
    fontSize: 30,
  },
  option: {
    fontSize: 23,
    margin: 3
  }
});
