import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'

const TaskScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={{fontWeight:'bold',fontSize:24}}>Task Screen</Text>
    </View>
  )
}

export default TaskScreen