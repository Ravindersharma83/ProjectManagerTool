import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text,Image } from 'react-native';
import {Home, Task } from '../Screens';
import colors from '../Styles/colors';
import navigationStrings from '../Constants/navigationStrings';
import imagePath from '../Constants/imagePath';

const BottomTab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
    <BottomTab.Navigator
        screenOptions={{
            headerShown:false,
            tabBarInactiveTintColor:colors.blackOpacity50,
            tabBarActiveTintColor:colors.themeColor
        }}
    >
        <BottomTab.Screen 
            name={navigationStrings.HOME} 
            component={Home}
            options={{
                tabBarIcon:({focused}) => {
                    return(
                        <Image
                            source={imagePath.home}
                            style={{tintColor: focused ? colors.themeColor : colors.blackOpacity50}}
                        />
                    )
                },
            }}
        />
        <BottomTab.Screen 
            name={navigationStrings.TASK} 
            component={Task}
            options={{
                tabBarIcon:({focused}) => {
                    return(
                        <Image
                            source={imagePath.task}
                            style={{tintColor: focused ? colors.themeColor : colors.blackOpacity50}}
                        />
                    )
                },
            }}
        />
    </BottomTab.Navigator>
    )
}