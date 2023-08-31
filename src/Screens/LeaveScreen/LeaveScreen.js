import { View, Text } from 'react-native'
import React from 'react'
import HeaderComp from '../../Components/HeaderComp'
import imagePath from '../../Constants/imagePath'

const LeaveScreen = () => {
  return (
    <View style={{flex:1}}>
      <HeaderComp title={'My Leaves'} rightIcon={imagePath.leaveAdd}/>
    </View>
  )
}

export default LeaveScreen