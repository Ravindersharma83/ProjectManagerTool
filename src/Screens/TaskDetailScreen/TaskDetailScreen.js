import { View, Text, TouchableOpacity, Image,ScrollView, DrawerLayoutAndroidComponent } from 'react-native'
import React from 'react'
import styles from './styles'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import colors from '../../Styles/colors'
import { formatDate } from '../../Services/FormatDate'
import { taskTypeLabel } from '../../Enums/TaskTypeEnum'
import { priorityLabels, priorityLabelsBgColor, priorityLabelsColor } from '../../Enums/PriorityEnum'
import { statusLables } from '../../Enums/StatusEnum'

const TaskDetailScreen = ({route}) => {
    const{item} = route.params;
  return (
    <ScrollView style={styles.container}>
        <View style={{...styles.flexView, justifyContent: 'space-between'}}>
            <View></View>
            <Text
                style={{
                fontWeight: 'bold',
                fontSize: 24,
                padding: moderateScale(10),
                // color: colors.themeColor,
                }}>
                Task Detail
            </Text>
            <View></View>
        </View>
        <View style={{padding:moderateScale(10),margin:moderateScale(8),backgroundColor:colors.themeColor,borderRadius:moderateScale(10)}}>
            <Text style={{color:'#fff',fontSize:scale(16),fontWeight:'bold',textTransform:'capitalize',marginTop:moderateScale(10),marginLeft:moderateScale(10)}}>{item?.pro_name}</Text>
            <Text style={{color:'#fff',fontSize:scale(20),fontWeight:'bold', textTransform:'capitalize',marginHorizontal:moderateScale(10)}}><Text style={{fontWeight:'100'}}>{'#'+ item.task_number}</Text> - {item?.task_name}</Text>
        </View>
        <View style={{paddingHorizontal:moderateScale(10),margin:moderateScale(5)}}>
            <Text style={{ borderBottomColor:'lightgray',borderBottomWidth:0.5,marginBottom:5,paddingVertical:5,color:colors.themeColor,fontWeight:'bold'}}>Task Description</Text>
            <View style={{marginHorizontal:moderateScale(10)}}>      
                <Text>{item?.detail.replace( /(<([^>]+)>)/ig, '').replace(/&nbsp;/g, ' ')}</Text>
            </View>
            {/* <Text style={{ borderBottomColor:'lightgray',borderBottomWidth:0.5,color:colors.themeColor,fontWeight:'bold'}}></Text> */}
        </View>
        <View style={{paddingHorizontal:moderateScale(10),margin:moderateScale(5)}}>
            <Text style={{ borderBottomColor:'lightgray',borderBottomWidth:0.5,marginBottom:5,paddingVertical:5,color:colors.themeColor,fontWeight:'bold'}}>Task Hours</Text>
            <View style={{marginHorizontal:moderateScale(10),flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontWeight:'bold',color:colors.black}}>Dev Hours</Text>
                    <Text style={{fontWeight:'bold',color:colors.black}}>Bill Hours</Text>
                </View>
                <View>
                    <Text>{item?.dev_hours ? item?.dev_hours : 'NA'}</Text>
                    <Text>{item?.bill_hours ? item?.bill_hours : 'NA'}</Text>
                </View>
            </View>
        </View>
        <View style={{paddingHorizontal:moderateScale(10),margin:moderateScale(5)}}>
            <Text style={{ borderBottomColor:'lightgray',borderBottomWidth:0.5,marginBottom:5,paddingVertical:5,color:colors.themeColor,fontWeight:'bold'}}>Timestamp</Text>
            <View style={{marginHorizontal:moderateScale(10),flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontWeight:'bold',color:colors.black}}>Start Date-Time</Text>
                    <Text style={{fontWeight:'bold',color:colors.black}}>End Date-Time</Text>
                </View>
                <View>
                    <Text>{formatDate(item?.start_datetime)}</Text>
                    <Text>{formatDate(item?.end_datetime)}</Text>
                </View>
            </View>
        </View>
        <View style={{paddingHorizontal:moderateScale(10),margin:moderateScale(5)}}>
            <Text style={{ borderBottomColor:'lightgray',borderBottomWidth:0.5,marginBottom:5,paddingVertical:5,color:colors.themeColor,fontWeight:'bold'}}>Other Details</Text>
            <View style={{marginHorizontal:moderateScale(10),flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontWeight:'bold',color:colors.black,padding:2}}>Task Status</Text>
                    <Text style={{fontWeight:'bold',color:colors.black,padding:2}}>Task Priority</Text>
                    <Text style={{fontWeight:'bold',color:colors.black,padding:2}}>Task Type</Text>
                    <Text style={{fontWeight:'bold',color:colors.black,padding:2}}>Assigned By</Text>
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <Text style={{color:colors.themeColor,padding:2,fontWeight:'bold'}}>{item?.task_status ? statusLables[item?.task_status]:''}</Text>
                    <Text style={{padding:2,fontWeight:'bold',color:item?.task_priority ? priorityLabelsColor[item?.task_priority] : 'black'}}>{item?.task_priority ? priorityLabels[item?.task_priority] : ''}</Text>
                    <Text style={{color:colors.themeColor,padding:2,fontWeight:'bold'}}>{item?.task_type ? taskTypeLabel[item?.task_type] : ''}</Text>
                    <Text style={{color:colors.themeColor,padding:2,fontWeight:'bold'}}>{item?.assigned_by_name}</Text>
                </View>
            </View>
        </View>
    </ScrollView>
  )
}

export default TaskDetailScreen