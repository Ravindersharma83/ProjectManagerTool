import { ActivityIndicator, StyleSheet, Text, View,useWindowDimensions } from 'react-native'
import React from 'react'
import colors from '../Styles/colors';

const Loading = ({visible=false,title}) => {
  const {width, height} = useWindowDimensions();
  return (
    visible && (
        <View style={[styles.container, {height, width}]}>
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.themeColor} />
            <Text style={{marginLeft: 10, fontSize: 16}}>{title} ...</Text>
          </View>
        </View>
      )
  )
}

export default Loading

const styles = StyleSheet.create({
  loader: {
    height: 70,
    // backgroundColor: colors.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    flex:1,
    backgroundColor: colors.white,
  },
});