import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import TabRoutes from './TabRoutes';
import { Alert, Text } from 'react-native';
import Loading from '../Components/Loading';

import { useLogin } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStack from './HomeStack';
import messaging from '@react-native-firebase/messaging'



export default function Routes(){
    const {isLoggedIn,setIsLoggedIn} = useLogin();
    // const {token,setToken} = useLogin(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(()=>{
        let data;
        let token;
        const getDeviceToken = async () =>{
            token = await messaging().getToken();
        }
        getDeviceToken();
        console.log('app is open');
        const fetchLoginUser = async () => {
            try {
                const value = await AsyncStorage.getItem('loggedIn');
                if (value !== null) {
                    setIsLoggedIn(JSON.parse(value));
                }
                await AsyncStorage.getItem('user',(err, value) => {
                    if (err) {
                        Alert.alert("No data found");
                    } else {
                        if(JSON.parse(value)){
                            data = {user_id:JSON.parse(value)?.id,device_token:token}
                            console.log('data---',data);
                            console.log('profile---',JSON.parse(value));
                        }
                    }
                  })
            } catch (error) {
                console.error('Error reading login status:', error);
            } finally {
                // This ensures that the loading state is turned off after attempting to fetch the login status, regardless of whether it succeeded or an error occurred.
                setIsLoading(false); // Update loading state when login status is fetched
            }
        };

        fetchLoginUser();
    }, [setIsLoggedIn]); 

    if (isLoading) {
        return <Loading visible={true} title={'Welcome To Baltech'}/>; // Display loading screen while fetching login status
    }


    return(
        <NavigationContainer>
            {isLoggedIn ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
    );
}
