import React from 'react'
import Home from './src/screens/Home'
import Game from './src/screens/Game'
import Finish from './src/screens/Finish'
// import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import store from "./src/store/index";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <SafeAreaView> */}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Finish" component={Finish} />
          {/* </SafeAreaView> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}