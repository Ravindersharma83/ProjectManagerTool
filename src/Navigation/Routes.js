import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import TabRoutes from './TabRoutes';

export default function Routes(){
    React.useEffect(()=>{
        console.log('hello');
    },[])
    return(
        <NavigationContainer>
            {true ? TabRoutes() : AuthStack()}
        </NavigationContainer>
    )
}