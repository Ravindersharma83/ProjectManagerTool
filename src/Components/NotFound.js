import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../Styles/colors'
import { moderateScale, scale } from 'react-native-size-matters'

const NotFound = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.white}}>
      <Image style={{height:'50%',width:'100%'}} source={{uri:'https://as2.ftcdn.net/v2/jpg/05/94/00/93/1000_F_594009309_ZbvSkkZW97bVL1IwqZJ5up8UvDcQ3cNY.jpg'}}/>
      <Text style={{color:colors.themeColor,fontWeight:'400',fontSize:scale(28)}}>No Task Found</Text>
    </View>
  )
}

export default NotFound

const styles = StyleSheet.create({})