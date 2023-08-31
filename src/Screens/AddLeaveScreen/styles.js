import { StyleSheet } from "react-native";
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from '../../Styles/colors';

const styles = StyleSheet.create({
container: {
    flex: 1,
  },
  inputView: {
    backgroundColor: "#f7f2f5",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 20,
    flexDirection:"row",
    borderWidth:1,
    // alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: -10,
    color:'grey'
  },
})

export default styles;