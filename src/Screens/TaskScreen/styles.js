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
    elevation:4,
    padding:moderateScale(16),
    borderRadius:moderateScale(4),
    margin:moderateScale(5)
  },
  flexView: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent:'space-between'
},



container2: {
  flex: 1,
  flexDirection: 'row',
},
leftSidebar: {
  flex: 1,
  padding: 16,
  borderRightWidth: 1,
  borderColor: 'gray',
},
separator: {
  width: 1,
  backgroundColor: 'lightgray',
  
},
rightColumn: {
  flex: 2,
  padding: 16,
  justifyContent:'space-between',
},
columnItem: {
  marginBottom: 16,
},
optionsContainer: {
  marginTop: 8,
},
optionButton: {
  paddingVertical: 8,
},
optionText: {
  fontSize: 16,
},
sidebarOption: {
  fontSize: 18,
},
activeSidebarOption: {
  backgroundColor: 'lightgray',
  fontWeight: 'bold',
},
selectedOption: {
  backgroundColor: 'lightgray',
},
})

export default styles;