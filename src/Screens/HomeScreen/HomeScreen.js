import {Alert, Button, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import colors from '../../Styles/colors'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLogin } from '../../Context/AuthContext'
import Loading from '../../Components/Loading'

const HomeScreen = () => {
  const { isLoggedIn,setIsLoggedIn, profile , setProfile} = useLogin();
    const logout = async()=>{
        try {
          setIsLoggedIn(false)
          AsyncStorage.setItem('loggedIn', JSON.stringify(false))
          await AsyncStorage.removeItem('user')
          } catch(e) {
            // remove error
          }
        
          Alert.alert('Logout','Logging out successfully')
    }

    const [loginUser, setLoginUser] = React.useState(null); // State to hold the user data
    React.useEffect(()=>{
        const fetchLoginUser = async () => {
          const userInfo = await AsyncStorage.getItem('user',(err, value) => {
            if (err) {
                Alert.alert("No data found");
            } else {
              setLoginUser(JSON.parse(value)) 
              setProfile(JSON.parse(value));
            }
          })
        };

        fetchLoginUser();
    }, []);
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:24}}>Dashboard Screen</Text>
      <Text style={{fontWeight:'400',fontSize:18,marginVertical:moderateVerticalScale(10)}}>Welcome {profile?.name}</Text>
      <Button onPress={()=>logout()} title='Logout' color={colors.themeColor}/>
    </View>
  )
}

export default HomeScreen
