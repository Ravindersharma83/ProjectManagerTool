import {Text, View } from 'react-native'
import React from 'react'
import styles from './styles'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:24}}>Dashboard Screen</Text>
    </View>
  )
}

export default HomeScreen
