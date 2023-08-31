import { StyleSheet } from "react-native";
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from '../../Styles/colors';

const styles = StyleSheet.create({
container: {
    flex: 1,
  },
flatStyle:{
    backgroundColor: colors.white,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    elevation:8,
    padding:moderateScale(16),
    borderRadius:moderateScale(4),
    margin:moderateScale(8)
  },
flexView: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent:'space-between'
  },
})

export default styles;