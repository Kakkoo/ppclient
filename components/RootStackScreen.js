import React from "react";
import { enableScreens } from 'react-native-screens';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import Main from './Main';
import AddRemoveKid from './mainLayout/AddRemoveKid';
import AssignWork from './mainLayout/AssignWork';
import EarnedMoney from './mainLayout/EarnedMoney';
import ViewStatus from './mainLayout/ViewStatus';

enableScreens();

//const RootStack = createNativeStackNavigator();
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator initialRouteName = "SplashScreen">
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <RootStack.Screen name="Main" component={Main} />
        <RootStack.Screen name="AddRemoveKid" component={AddRemoveKid} />
        <RootStack.Screen name="AssignWork" component={AssignWork} />
        <RootStack.Screen name="EarnedMoney" component={EarnedMoney} />
        <RootStack.Screen name="ViewStatus" component={ViewStatus} />

    </RootStack.Navigator>
);

export default RootStackScreen;
