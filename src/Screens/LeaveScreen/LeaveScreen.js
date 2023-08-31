import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import HeaderComp from '../../Components/HeaderComp'
import imagePath from '../../Constants/imagePath'
import LeaveListing from './LeaveListing'
import styles from './styles'

const LeaveScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <HeaderComp title={'My Leaves'} rightIcon={imagePath.leaveAdd}/>
      <LeaveListing/>
      <LeaveListing/>
      <LeaveListing/>
      <LeaveListing/>
    </ScrollView>
  )
}

export default LeaveScreen