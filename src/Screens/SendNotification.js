import { StyleSheet, Text, View,Alert } from 'react-native'
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging'

const SendNotification = () => {
    useEffect(()=>{
        getDeviceToken();
    },[])

    const getDeviceToken = async () =>{
        let token = await messaging().getToken();
        console.log('token---',token);
    }

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert('A new FCM message arrived in foreground mode!', JSON.stringify(remoteMessage));
        });
    
        return unsubscribe;
      }, []);

  return (
    <View>
      <Text>SendNotification</Text>
    </View>
  )
}

export default SendNotification

const styles = StyleSheet.create({})



/* 
Sending Notification using Firebase and fcmtest.com

- Create a new firebase app , generate SHA-1 key, download googleservices.json , add SHA-256 in project setting, than foloow the steps in rn.firebase.com to complete the setup on connecting with firebase in react native.

-Install the following packages : -
    - npm install @react-native-firebase/app
    - npm install @react-native-firebase/messaging

- For sending push notification we need to send device token 
    - Go to rn.firebase.com/cloud messaging/notification then follow the code line for getting device token

- Getting cloud messaging Server Key
    - Got to project settings / cloud messaging / Enable cloud Messaging Api legacy

- Then follow the tuts available on fnfirebase.com/messaging/usage to send notification .
    - use Foreground state messages
    - use Background & Quit state messages (index.js)


- In this tutorial part , we use testfcm.com website to send notification in our app using firebase.
- We also send notification using firebase.console/project/messaging/send notification.
    - add device token while sending message.

*/