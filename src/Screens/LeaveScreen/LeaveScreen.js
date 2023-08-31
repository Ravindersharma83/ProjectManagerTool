import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import HeaderComp from '../../Components/HeaderComp'
import imagePath from '../../Constants/imagePath'
import LeaveListing from './LeaveListing'
import styles from './styles'
import navigationStrings from '../../Constants/navigationStrings'

const LeaveScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <HeaderComp title={'My Leaves'} rightIcon={imagePath.leaveAdd} onRightPress={()=>{navigation.navigate(navigationStrings.ADD_LEAVE)}}/>
      <LeaveListing/>
      <LeaveListing/>
      <LeaveListing/>
      <LeaveListing/>
    </ScrollView>
  )
}

export default LeaveScreen