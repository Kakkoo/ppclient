import React from "react";
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import Main from './Main';
import AddRemoveKid from './mainLayout/AddRemoveKid';
import AssignWork from './mainLayout/AssignWork';
import History from './mainLayout/History';
import ViewStatus from './mainLayout/ViewStatus';
import ForgotPassword from './mainLayout/ForgotPassword';
import ChangePassword from './mainLayout/ChangePassword';
import AddMoreGuardian from './mainLayout/AddMoreGuardian';

enableScreens();

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator initialRouteName = "SplashScreen">
        <RootStack.Screen name="Parent Children Portal" component={SplashScreen} />
        <RootStack.Screen name="Sign In" component={SignInScreen} />
        <RootStack.Screen name="Sign Up" component={SignUpScreen} />
        <RootStack.Screen name="Main" component={Main} />
        <RootStack.Screen name="Add or Remove a Kid name" component={AddRemoveKid} />
        <RootStack.Screen name="Assign work to a kid" component={AssignWork} />
        <RootStack.Screen name="History of completed works" component={History} />
        <RootStack.Screen name="View Status of earned money and assigned work" component={ViewStatus} />
        <RootStack.Screen name="Forgot password" component={ForgotPassword} />
        <RootStack.Screen name="Change Password" component={ChangePassword} />
        <RootStack.Screen name="Add Guardian" component={AddMoreGuardian} />

    </RootStack.Navigator>
);

export default RootStackScreen;
