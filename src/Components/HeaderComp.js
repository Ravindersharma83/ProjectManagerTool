import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import colors from '../Styles/colors'
import { moderateScale,moderateVerticalScale } from 'react-native-size-matters'
import imagePath from '../Constants/imagePath'

const HeaderComp = ({title,leftIcon,rightIcon,onLeftPress,onRightPress}) => {
  return (
    <View style={{...styles.flexView, justifyContent: 'space-between'}}>
    <View style={styles.leftSide}>
    {leftIcon ?     
    <TouchableOpacity onPress={onLeftPress}>
      <Image
        style={{marginRight: moderateScale(5)}}
        tintColor={colors.themeColor}
        source={leftIcon}
        />
    </TouchableOpacity> : ''}

    </View>

    <View style={styles.center}>
        <Text
        style={{
            fontWeight: 'bold',
            fontSize: 24,
            padding: moderateVerticalScale(10),
            color: colors.themeColor,
        }}>
        {title}
        </Text>
    </View>

    <View style={styles.rightSide}>
    {rightIcon ?     
    <TouchableOpacity onPress={onRightPress}>
      <Image
        style={{marginRight: moderateScale(5)}}
        tintColor={colors.themeColor}
        source={rightIcon}
        />
    </TouchableOpacity> : ''}

    </View>
  </View>
  )
}

export default HeaderComp

const styles = StyleSheet.create({
    leftSide:{

    },
    flexView: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent:'space-between'
    },
})