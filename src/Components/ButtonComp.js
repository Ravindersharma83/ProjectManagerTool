import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import colors from '../Styles/colors.js';

const ButtonComp = ({
    btnText,
    btnStyle={},
    btnTextStyle={},
    onPress,
    transparent,
    img
}) => {
  return (
    <TouchableOpacity
        activeOpacity={0.8}
        style={{...styles.btnStyle,...btnStyle,backgroundColor:transparent ? '#fff' : colors.themeColor}}
        onPress={onPress}
    >
      {!!img ? <Image tintColor={colors.white} source={img}/> : <Text style={{...styles.btnTextStyle,...btnTextStyle}}>{btnText}</Text>}
      
    </TouchableOpacity>
  )
}

export default ButtonComp

const styles = StyleSheet.create({
    btnStyle:{
        height:moderateScale(48),
        // backgroundColor:colors.themeColor,
        borderRadius:moderateScale(4),
        justifyContent:'center',
        alignItems:'center'
    },
    btnTextStyle:{
        fontSize:scale(12),
        color:colors.white,
        fontWeight:'bold',
        textTransform:'uppercase'
    }
})