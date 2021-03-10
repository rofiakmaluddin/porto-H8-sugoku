import React from 'react'
import Home from './src/screens/Home'
import Game from './src/screens/Game'
import Finish from './src/screens/Finish'
// import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from "react-redux";
import store from "./src/store/index";
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreProvider store={ store }>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <SafeAreaView> */}
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
              <Stack.Screen name="Game" component={Game} options={{ headerShown: false }}/>
              <Stack.Screen name="Finish" component={Finish} options={{ headerShown: false }}/>
            {/* </SafeAreaView> */}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}