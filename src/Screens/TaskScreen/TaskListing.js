import { Button, StyleSheet,Alert, Text, View,Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from './styles'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import colors from '../../Styles/colors'
import { formatDate } from '../../Services/FormatDate'
import { priorityLabels, priorityLabelsBgColor, priorityLabelsColor } from '../../Enums/PriorityEnum'
import { statusLables } from '../../Enums/StatusEnum'
import { taskTypeLabel } from '../../Enums/TaskTypeEnum'
import DropDownPicker from 'react-native-dropdown-picker';
import { axiosPostApi } from '../../Services/ApiService';
import apiUrl from '../../Constants/apiUrl';

import { useTaskContext } from '../../Context/TaskContext';


const TaskListing = ({item}) => {
  const { state,dispatch } = useTaskContext(); // Get tasks from context
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    task_status: '',
    dev_hours: '',
    updated_by: ''
  });
  const openModal = (item)=>{
    setUserData({
      id: item?.id,
      task_status: item?.task_status,
      dev_hours: item?.dev_hours,
      updated_by: item?.user_id
    });
    setModalVisible(true)
  }

  const updateStatus = async()=>{
    const data = {...userData,task_status:value}
    try {
      await axiosPostApi(apiUrl.update_task,data)
        .then(async res => {
          const apiResponse = res?.data;
          // console.log('tasks--', apiResponse);
          if (!apiResponse?.success) {
            Alert.alert('Opps!', 'Something went wrong');
          } else {
            Alert.alert(apiResponse?.message);
            setModalVisible(false);

          // Update tasks in context
          const updatedTasks = state.tasks.map((task) =>
            task.id === userData.id ? { ...task, task_status: value, dev_hours:userData?.dev_hours } : task
          );
          dispatch({ type: 'SET_TASKS', payload: updatedTasks });

          }
        })
        .catch(error => {
          console.log('error---', error);
        });
    } catch (error) {
      console.log(`Error message: ${error}`);
    }
    // console.log('updated data---',data);
    // console.log('updated data---',userData);
    // console.log('selected option---',value);
  }
  const [open, setOpen] = useState(false);
  // console.log(userData.task_status.toString());
  // console.log(typeof(userData.task_status.toString()));
  const [value, setValue] = useState(item.task_status.toString());
  const [items, setItems] = useState([
    {label: 'New', value: '1'},
    {label: 'In Progress', value: '2'},
    {label: 'Completed', value: '3'},
    {label: 'Client Feedback', value: '4'},
    {label: 'Delivered', value: '5'},
  ]);
  return (
    <>
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
              marginTop: moderateVerticalScale(8),
              padding:moderateScale(6),
              borderRadius:moderateScale(5),
              backgroundColor:colors.themeColor
          }}>{item?.pro_name}
        </Text>
      </View>
        <View style={{backgroundColor:'lightgreen',padding:moderateScale(6),borderRadius:moderateScale(5)}}>
          <Text style={{
              fontSize: scale(12),
                color: 'darkblue',
                fontWeight: 'bold',
            }}>{item?.task_status ? statusLables[item?.task_status] : ''}
          </Text>
        </View>
    </View>


    <View style={{ ...styles.flexView, marginVertical: moderateVerticalScale(8), justifyContent:'flex-start',backgroundColor:'#f2f2f2',padding:10 }}>
      <Text style={{
          fontSize: moderateScale(14),
          color: colors.black,
          textTransform: 'uppercase'

      }}>#{item?.task_number}</Text>
      <Text style={{
          fontSize: scale(16),
          color: colors.black,
          fontWeight: 'bold',
          marginLeft:moderateScale(5),
          textTransform:'capitalize',
      }}>{item?.task_name}</Text>
  </View>

  <View>
    <Text style={{color:'gray',textTransform:'capitalize'}}>{item?.detail.substr(0,150).replace( /(<([^>]+)>)/ig, '').replace(/&nbsp;/g, ' ')}{item?.detail.length > 150 ? '...' : ''}</Text>
  </View>

  <View style={{ ...styles.flexView, marginVertical: moderateVerticalScale(8), backgroundColor:'#f2f2f2',padding:10 }}>
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

  <View style={{ ...styles.flexView, marginVertical: moderateVerticalScale(8),backgroundColor:'#f2f2f2',padding:10 }}>
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
  <View>
      <Button onPress={()=>openModal(item)} title='Update Status' color={'red'} />
    </View>

  </View>

  <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={{flex:1,backgroundColor: 'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}}>
            <View style={{backgroundColor:'white',height:moderateScale(300),width:moderateScale(300),borderRadius:20,elevation:40}}>
              <View>
                <Text style={{marginHorizontal:12,marginVertical:8,fontSize:18}}>Dev Hours</Text>
                <TextInput
                  style={{ borderWidth: 1, padding: 10, height: 40, marginHorizontal: 12 }}
                  keyboardType='numeric'
                  value={userData?.dev_hours.toString()}
                  onChangeText={(text) => setUserData({ ...userData, dev_hours: text })}
                />
              </View>
              <View style={{marginVertical:8}}>
                <Text style={{marginHorizontal:12,marginVertical:8,fontSize:18}}>Status {userData.task_status.toString()}</Text>
                {/* <TextInput
                  style={{ borderWidth: 1, padding: 10, height: 40, marginHorizontal: 12 }}
                  value={userData?.task_status.toString()}
                  onChangeText={(text) => setUserData({ ...userData, task_status: text })}
                /> */}
                <DropDownPicker
                  style={{width:'92%',marginHorizontal:12}}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
              <View style={{margin:12}}>
                <Button onPress={()=>updateStatus()} title='Save' />
              </View>
              <View style={{margin:12}}>
                <Button onPress={()=>setModalVisible(false)} title='Close' color={'red'} />
              </View>
            </View>
            <View>
            </View>
          </View>
        </Modal>
  </>
  )
}

export default TaskListing
