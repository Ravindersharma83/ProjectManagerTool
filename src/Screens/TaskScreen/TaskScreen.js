import { View, Text, FlatList, Alert, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useLogin } from '../../Context/AuthContext'
import { axiosPostApi } from '../../Services/ApiService'
import apiUrl from '../../Constants/apiUrl'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import colors from '../../Styles/colors'
import Loading from '../../Components/Loading'
import { formatDate } from '../../Services/FormatDate'
import { priorityLabels, priorityLabelsBgColor, priorityLabelsColor } from '../../Enums/PriorityEnum'
import { statusLables } from '../../Enums/StatusEnum'
import imagePath from '../../Constants/imagePath'
import { taskTypeLabel } from '../../Enums/TaskTypeEnum'
import TaskListing from './TaskListing'

const TaskScreen = () => {
  const [tasks,setTasks] = useState([]);
  const [loading,setLoading] = useState(true);
  const {profile} = useLogin();

  useEffect(()=>{
    getTasks();
    console.log('userId--',profile);
  },[])

  const getTasks = async ()=>{
    const data = {
      id:profile.id,
      role_name:profile.role_name
    }
    try {
      await axiosPostApi(apiUrl.mytask,data)
      .then(async(res)=>{
       const apiResponse = res?.data;
       console.log('tasks--',apiResponse);
       if(!apiResponse?.success){
        Alert.alert('Opps!','Something went wrong')
       }else{
        console.log('data fetched...');
        setTasks(apiResponse?.data);
        setLoading(false);
       }
      })
      .catch((error)=>{
       console.log('error---',error);
      })
     } catch (error) {
       console.log(`Error message: ${error}`);
     }
  }

  return (
    <>
      <Loading visible={loading}/>
      <View style={styles.container}>
        <View style={{...styles.flexView,justifyContent:'space-between'}}>
          <View></View>
          <Text style={{fontWeight:'bold',fontSize:24,padding:moderateScale(10),color:colors.themeColor}}>Task Lists</Text>
          <TouchableOpacity>
            <Image style={{marginRight:moderateScale(5)}} tintColor={colors.themeColor} source={imagePath.filter}/>
          </TouchableOpacity>
        </View>
          <FlatList
            data={tasks}
            renderItem={({item})=><TaskListing item={item}/>}
          />
      </View>


    </>
  )
}

export default TaskScreen