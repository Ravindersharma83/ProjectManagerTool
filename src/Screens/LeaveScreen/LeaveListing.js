import { Button, StyleSheet,Alert, Text, View,Modal, TextInput, TouchableOpacity } from 'react-native';
import React, { Profiler, useEffect, useState } from 'react';
import styles from './styles'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import colors from '../../Styles/colors'
import { leaveStatus, leaveStatusColor } from '../../Enums/LeaveEnum';
import { formatDateString, formatTimeString } from '../../Services/FormatDate';
import { useLogin } from '../../Context/AuthContext';
import { axiosPostApi } from '../../Services/ApiService';
import apiUrl from '../../Constants/apiUrl';
import { useLeaveContext } from '../../Context/LeaveContext';


const TaskListing = ({navigation,item}) => {
  const {profile} = useLogin();
  const { state, dispatch } = useLeaveContext();
  let startDate = formatDateString(item?.start_date);
  let endDate = formatDateString(item?.end_date);
  let startTime =formatTimeString(item?.start_time);
  let endTime =formatTimeString(item?.end_time);

  const cancelLeave = async (id) => {
    const data = {
      leave_id: id,
      leave_status: 4,
      updated_by: profile?.id,
    };

    Alert.alert(
      'Cancel Leave',
      'Are you sure ?',
      [
          {
          text:'Cancel',
          onPress: ()=> console.log('Cancel Pressed'),
          style:'cancel'
          },
          {
          text:'Yes',
          // onPress: ()=> deletePost(postId),
          onPress: async() => {
            try {
              await axiosPostApi(apiUrl.updateleaves, data)
                .then(async (res) => {
                  const apiResponse = res?.data;
                  if (!apiResponse?.success) {
                    Alert.alert('Opps!', 'Something went wrong');
                  } else {
                    Alert.alert(apiResponse?.message);
                    // Update leaves in context
                    const updatedLeaves = state.leaves.map((leave) => {
                      return leave.id === id ? { ...leave, status: 4 } : leave;
                    });
                    dispatch({ type: 'SET_LEAVES', payload: updatedLeaves });
                  }
                })
                .catch((error) => {
                  console.log('error---', error);
                });
            } catch (error) {
              console.log(`Error message: ${error}`);
            }
          },
          style:'cancel'
          }
      ],
      {cancelable:false}
      )
  };
  
  return (
    <>
    <View style={styles.flatStyle}>

    <View>
    <View style={{alignItems:'flex-end'}}>
      {item?.status === 1 ? <TouchableOpacity style={{backgroundColor:'red',padding:5,elevation:4,borderRadius:10}} onPress={()=> cancelLeave(item?.id)}>
        <Text style={{color:colors.white}}>Cancel</Text>
      </TouchableOpacity> : ''}
    </View>
    <Text style={styles.dateHeading}>
      {item?.leave_type === 'short' ? `${startDate} ( ${startTime} - ${endTime})`
        : item?.days === 0.5 ? `${startDate} (${item?.start_full_half === 'Full' ? 'full day' : 'half day'})` 
        : `${startDate} (${item?.start_full_half === 'Full' ? 'full day' : 'half day'}) To ${endDate} (${item?.end_full_half === 'Full' ? 'full day' 
        : 'half day'})`}
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
                <Text style={styles.sidePara}>
                  {(item?.days && item?.days <= 1) ? `${item?.days} Day ` 
                  : (item?.days && item?.days > 1) ? `${item?.days} Days` 
                  : (item?.hours === 0 ) ? `${item?.minutes} minutes` 
                  : (item?.minutes === 0 ) ? item?.hours === 1  ? `${item.hours} hour` :`${item?.hours} hours` 
                  : (item?.hours && item?.hours <= 1 ) ? `${item?.hours} Hour ${item?.minutes} minutes` 
                  : `${item?.hours} Hours ${item?.minutes} minutes` } 
                </Text>
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
