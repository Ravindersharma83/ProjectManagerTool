import { Button, StyleSheet,Alert, Text, View,Modal, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import colors from '../../Styles/colors'
import { leaveStatus, leaveStatusColor } from '../../Enums/LeaveEnum';
import { formatDateString, formatTimeString } from '../../Services/FormatDate';


const TaskListing = ({navigation,item}) => {
  // let startDateIndex = formatDate(item?.start_date).indexOf(',',formatDate(item?.start_date).indexOf(',')+1);
  // let endDateIndex = formatDate(item?.end_date).indexOf(',',formatDate(item?.end_date).indexOf(',')+1);
  // let startDate = formatDate(item?.start_date).slice(0,startDateIndex);
  // let endDate = formatDate(item?.end_date).slice(0,endDateIndex);
  let startDate = formatDateString(item?.start_date);
  let endDate = formatDateString(item?.end_date);
  let startTime =formatTimeString(item?.start_time);
  let endTime =formatTimeString(item?.end_time);
  return (
    <>
    <View style={styles.flatStyle}>

    <View>
    <Text style={styles.dateHeading}>
      {item?.leave_type === 'short'
        ? `${startDate} ( ${startTime} - ${endTime})`
        : `${startDate} (${item?.start_full_half === 'Full' ? 'full day' : 'half day'}) To ${endDate} (${item?.end_full_half === 'Full' ? 'full day' : 'half day'})`}
    </Text>
        <View style={styles.upperBlock}>
            <View>
                <Text style={styles.sideHeadings}>Reporting Head</Text>
                <Text style={styles.sideHeadings}>Date of Request</Text>
                <Text style={styles.sideHeadings}>Days/Hours</Text>
                <Text style={styles.sideHeadings}>Leave Status</Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
                <Text style={styles.sidePara}>{item?.r_head_by_Leave}</Text>
                <Text style={styles.sidePara}>{item?.req_date}</Text>
                <Text style={styles.sidePara}>{(item?.days && item?.days <= 1) ? `${item?.days} Day ` : (item?.days && item?.days > 1)  ? `${item?.days} Days` : (item?.hours && item?.hours <= 1 ) ? `${item?.hours} Hour` : `${item?.hours} Hours` } </Text>
                <Text style={{...styles.sidePara, fontWeight:'bold', color: item?.status ? leaveStatusColor[item?.status] : 'black'}}>{item?.status ? leaveStatus[item?.status] : ''}</Text>
            </View>
        </View>
    </View>

        <View>
            <Text style={styles.borderLine}></Text>
            <Text style={styles.leaveReason}>{item?.comment}</Text>
        </View>

</View>
  </>
  )
}

export default TaskListing
