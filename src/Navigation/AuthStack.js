import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import navigationStrings from '../Constants/navigationStrings';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
const Stack = createNativeStackNavigator();

export default function AuthStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name={navigationStrings.LOGIN} component={LoginScreen}/>
        </Stack.Navigator>
    )
}