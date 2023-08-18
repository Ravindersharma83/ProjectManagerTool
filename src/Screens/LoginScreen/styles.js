import { StyleSheet } from "react-native";
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from '../../Styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'space-between'
    },
    imgStyle: {
        height: moderateScale(200),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTextStyle: {
        fontSize: scale(32),
        color: 'white',
        fontWeight: 'bold',
        padding:scale(10),
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adding a semi-transparent background
    },
    mainStyle: {
        paddingHorizontal: moderateScale(24),
        paddingTop: moderateVerticalScale(44)
    },
})

export default styles;