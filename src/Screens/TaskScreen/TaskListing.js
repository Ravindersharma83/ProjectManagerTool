import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styles from './styles'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import colors from '../../Styles/colors'
import { formatDate } from '../../Services/FormatDate'
import { priorityLabels, priorityLabelsBgColor, priorityLabelsColor } from '../../Enums/PriorityEnum'
import { statusLables } from '../../Enums/StatusEnum'
import { taskTypeLabel } from '../../Enums/TaskTypeEnum'


const TaskListing = ({item}) => {
  return (
    <View style={styles.flatStyle}>
    <View style={styles.flexView}>
        <View style={{backgroundColor:item?.task_priority ? priorityLabelsBgColor[item?.task_priority] : colors.white,padding:moderateScale(6),borderRadius:moderateScale(5)}}>
          <Text style={{
              fontSize: scale(12),
                color:item?.task_priority ? priorityLabelsColor[item?.task_priority] : 'black',
                fontWeight: 'bold',
                
            }}>{item?.task_priority ? priorityLabels[item?.task_priority] : ''}
          </Text>
        </View>
        <View>
        <Text style={{
            fontSize: scale(12),
              color: colors.black,
              fontWeight: 'bold',
              textTransform:'uppercase',
              marginTop: moderateVerticalScale(8)
          }}>{item?.pro_name}
        </Text>
      </View>
        <View style={{backgroundColor:'aqua',padding:moderateScale(6),borderRadius:moderateScale(5)}}>
          <Text style={{
              fontSize: scale(12),
                color: 'darkblue',
                fontWeight: 'bold',
            }}>{item?.task_status ? statusLables[item?.task_status] : ''}
          </Text>
        </View>
    </View>


    <View style={{ ...styles.flexView, marginVertical: moderateVerticalScale(8), justifyContent:'flex-start' }}>
      <Text style={{
          fontSize: moderateScale(14),
          color: colors.themeColor,
          textTransform: 'uppercase'

      }}>#{item?.task_number}</Text>
      <Text style={{
          fontSize: scale(16),
          color: colors.themeColor,
          fontWeight: 'bold',
          marginLeft:moderateScale(5),
          textTransform:'capitalize',
      }}>{item?.task_name}</Text>
  </View>

  <View>
    <Text style={{color:colors.black,textTransform:'capitalize'}}>{item?.detail.substr(0,150).replace( /(<([^>]+)>)/ig, '').replace(/&nbsp;/g, ' ')}{item?.detail.length > 150 ? '...' : ''}</Text>
  </View>

  <View style={{ ...styles.flexView, marginVertical: moderateVerticalScale(8) }}>
    <View>
    <Text style={{
          fontSize: moderateScale(14),
          color: colors.blackOpacity50,
          textTransform: 'uppercase'

      }}>Start Date</Text>
      <Text style={{
          fontSize: scale(14),
          color: colors.black,
          fontWeight: '400',
      }}>{formatDate(item?.start_datetime)}</Text>
    </View>

    <View style={{alignItems:'flex-end'}}>
    <Text style={{
          fontSize: moderateScale(14),
          color: colors.blackOpacity50,
          textTransform: 'uppercase'

      }}>End Date</Text>
      <Text style={{
          fontSize: scale(14),
          color: colors.black,
          fontWeight: '400',
      }}>{formatDate(item?.end_datetime)}</Text>
    </View>
  </View>

  <View style={{ ...styles.flexView, marginVertical: moderateVerticalScale(8) }}>
    <View>
    <Text style={{
          fontSize: moderateScale(14),
          color: colors.blackOpacity50,
          textTransform: 'uppercase'

      }}>Dev Hours</Text>
      <Text style={{
          fontSize: scale(14),
          color: colors.black,
          fontWeight: '400',
      }}>{item?.dev_hours ? item?.dev_hours : 'NA'}</Text>
    </View>

    <View>
    <Text style={{
          fontSize: moderateScale(14),
          color: colors.blackOpacity50,
          textTransform: 'uppercase'

      }}>Bill Hours</Text>
      <Text style={{
          fontSize: scale(14),
          color: colors.black,
          fontWeight: '400',
      }}>{item?.bill_hours ? item?.bill_hours : 'NA'}</Text>
    </View>
  </View>

  <View style={{ ...styles.flexView, marginVertical: moderateVerticalScale(8) }}>
    <View>
    <Text style={{
          fontSize: moderateScale(14),
          color: colors.blackOpacity50,
          textTransform: 'uppercase'

      }}>Task Type</Text>
      <Text style={{
          fontSize: scale(14),
          color: colors.black,
          fontWeight: '400',
          textTransform:'capitalize',
      }}>{item?.task_type ? taskTypeLabel[item?.task_type] : ''}</Text>
    </View>

    <View>
    <Text style={{
          fontSize: moderateScale(14),
          color: colors.blackOpacity50,
          textTransform: 'uppercase'

      }}>Assigned By</Text>
      <Text style={{
          fontSize: scale(14),
          color: colors.black,
          fontWeight: '400',
          textTransform:'capitalize',
      }}>{item?.assigned_by_name}</Text>
    </View>
  </View>

  </View>
  )
}

export default TaskListing
