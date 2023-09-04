import { StyleSheet, Text, View,TextInput,Image,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import { scale,moderateVerticalScale } from 'react-native-size-matters';
import colors from '../Styles/colors';

const TextInputWithLabel = ({
        label,
        placeholder,
        onChangeText,
        onBlur,
        setFieldTouched,
        value,
        inputStyle = {},
        rightIcon,
        onPressRight,
        ...props
    }) => {
  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={{...styles.inputStyle,...inputStyle}}>
        <Text style={styles.labelTextStyle}>{label}</Text>
        <View style={styles.flexView}>
        <TextInput 
            style={styles.inlineStyle} 
            placeholder={placeholder}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            autoCapitalize='none'
            {...props}
        />
        {!!rightIcon ? 
            <TouchableOpacity activeOpacity={0.8} onPress={onPressRight}>
                <Image style={{tintColor:colors.blackOpacity30}} source={rightIcon}/>
            </TouchableOpacity>
             : null}
        </View>
    </ScrollView>
  )
}

export default TextInputWithLabel

const styles = StyleSheet.create({
    inputStyle:{
        borderBottomWidth:1,
        borderBottomColor:colors.borderColor,
        borderRadius:scale(4),
    },
    labelTextStyle:{
        fontSize:scale(14),
        color:colors.blackOpacity50
    },
    flexView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    },
    inlineStyle:{
        paddingVertical:moderateVerticalScale(8),
        fontSize:scale(16),
        color:colors.blackOpacity80,
        flex:1
    },
})
