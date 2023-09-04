import { Button, StyleSheet,Alert, Text, View,Modal, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import colors from '../../Styles/colors'


const TaskListing = ({navigation,item,title}) => {
  return (
    <>
    <View style={styles.flatStyle}>

    <View>
      <Text style={styles.dateHeading}>Aug 31,2023 (Full Day) To Sep 02,2023 (Full Day)</Text>
        <View style={styles.upperBlock}>
            <View>
                <Text style={styles.sideHeadings}>Reporting Head</Text>
                <Text style={styles.sideHeadings}>Date of Request</Text>
                <Text style={styles.sideHeadings}>Days/Hours</Text>
                <Text style={styles.sideHeadings}>Leave Status</Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
                <Text style={styles.sidePara}>Ravinder</Text>
                <Text style={styles.sidePara}>Aug 31,2023</Text>
                <Text style={styles.sidePara}>3 Days</Text>
                <Text style={styles.sidePara}>Approved</Text>
            </View>
        </View>
    </View>

        <View>
            <Text style={styles.borderLine}></Text>
            <Text style={styles.leaveReason}>{title}</Text>
        </View>

</View>
  </>
  )
}

export default TaskListing
