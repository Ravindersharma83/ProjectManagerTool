import { StyleSheet } from "react-native";
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from '../../Styles/colors';

const styles = StyleSheet.create({
container: {
    flex: 1,
  },
  flatStyle:{
    backgroundColor: colors.white,
    elevation:4,
    padding:moderateScale(16),
    borderRadius:moderateScale(4),
    margin:moderateScale(8)
  },
  flexView: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent:'space-between'
  },
  dateHeading:{
    fontSize: moderateScale(14),
    color: colors.themeColor,
    textTransform: 'uppercase',
    marginVertical:5,
    fontWeight:'bold'
  },
  upperBlock:{
    marginTop:moderateScale(10),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  sideHeadings:{
    fontWeight:'bold',
    color:colors.black,
    padding:2
  },
  sidePara:{
    color:'gray',
    padding:2
  },
  borderLine:{ 
    borderBottomColor:'lightgray',
    borderBottomWidth:0.5
  },
  leaveReason:{
    marginTop:10,
    fontSize:scale(14)
  }

})

export default styles;