import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./components/RootStackScreen";
import { enableScreens } from "react-native-screens";

enableScreens();

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
export default App;

// import React, {useEffect} from 'react';
// import {View, ActivityIndicator} from 'react-native';
// import Main from './components/Main';
// import {NavigationContainer} from '@react-navigation/native';
// import RootStackScreen from './components/RootStackScreen';
// import {enableScreens} from 'react-native-screens';
// import AsyncStorage from '@react-native-community/async-storage';

// enableScreens();

// const App = () => {

//   const initialLoginState = {
//     setIsLoading: false,
//     userToken: null
//   };
//   useEffect(() => {
//     setTimeout(async() => {
//       setIsLoading(false);
//       let userToken;
//       userToken = null;
//       try {
//         userToken = await AsyncStorage.getItem('userToken');
//       } catch(e) {
//         console.log(e);
//       }
//       console.log('user token', userToken);
//       token = userToken;
//      // dispatch({ type: 'REGISTER', token: userToken });
//     }, 1000)
//   }, []);

//   if( initialLoginState.setIsLoading ) {
//     return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <ActivityIndicator size="large" />
//     </View>
//     );
//   }
//   return (
//     <NavigationContainer>
//       { initialLoginState.userToken !== null ? (
//         <Main /> ):
// <RootStackScreen />
//       }
//     </NavigationContainer>

//   );
// };
// export default App;
