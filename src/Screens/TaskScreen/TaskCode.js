import {
    View,
    Text,
    FlatList,
    Alert,
    TouchableOpacity,
    Image,
    Modal,
    Button,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import styles from './styles';
  import {useLogin} from '../../Context/AuthContext';
  import {axiosPostApi} from '../../Services/ApiService';
  import apiUrl from '../../Constants/apiUrl';
  import {
    moderateScale,
    moderateVerticalScale,
    scale,
  } from 'react-native-size-matters';
  import colors from '../../Styles/colors';
  import Loading from '../../Components/Loading';
  import {formatDate} from '../../Services/FormatDate';
  import {
    priorityLabels,
    priorityLabelsBgColor,
    priorityLabelsColor,
  } from '../../Enums/PriorityEnum';
  import {statusLables} from '../../Enums/StatusEnum';
  import imagePath from '../../Constants/imagePath';
  import {taskTypeLabel} from '../../Enums/TaskTypeEnum';
  import TaskListing from './TaskListing';
  
  const TaskCode = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
  
    const dateOptions = {
      1: 'Today',
      week: 'This Week',
      month: 'This Month',
      previous: 'Previous Month',
      2: 'Show All',
    };
  
    // const dateOptionsObj = [
    //   {id :1, val: 'Today'},
    //   {id :'week', val: 'This Week'},
    //   {id :'month', val: 'This Month'},
    //   {id :'previous', val: 'Previous Month'},
    //   {id :-1, val: 'Show All'},
    // ];
  
    const priorityOptions = {
      1: 'High Priority',
      2: 'Moderate Priority',
      3: 'Low Priority'
    };
  
    const statusOptions = {
      1: 'New',
      2: 'In Progress',
      3: 'Completed',
      4: 'Client Feedback',
      5: 'Delivered',
    };
  
    const [selectedOption, setSelectedOption] = useState('filter_days');
    const [selectedOptionsContent, setSelectedOptionsContent] = useState(dateOptions);
  
    const [postData,setPostData] = useState({
      id:2,
      role_name:'Junior',
      task_status:'',
      filter_days:'',
      task_priority:''
    })
  
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedKey, setSelectedKey] = useState(1);
    const [selectedValue, setSelectedValue] = useState('Today');
    const [selectedOption2,setSelectedOption2] = useState({
      filter_days:'filter_days',
      task_status:'',
      task_priority:''
    })
  
    const filterJson = (selectedOpt,index,keyValue,selectedOptionsCont)=>{
      // let statusOption = selectedOption2.task_status;
      // let daysOption = selectedOption2.filter_days;
      // let priorityOption = selectedOption2.task_priority;
  
      let taskStatus = postData.task_status;
      let filterDays = postData.filter_days;
      let taskPriority = postData.task_priority;
  
      console.log(`index----${keyValue} --option--- ${selectedOpt} --- value -- ${selectedOptionsCont}`);
  
      if(selectedOption == 'task_status' && selectedOptionsCont == selectedOptionsContent[keyValue]){
        taskStatus = keyValue;
        setSelectedValue(selectedOptionsCont);
        // statusOption = 'task_status';
        // setSelectedIndex(index);
        // setSelectedOption2({...selectedOption2,task_status:statusOption});
  
      }
      if(selectedOption == 'filter_days' && selectedOptionsCont == selectedOptionsContent[keyValue]){
        filterDays = keyValue;
        setSelectedValue(selectedOptionsCont);
        // daysOption = 'filter_days';
        // setSelectedIndex(index);
        // setSelectedOption2({...selectedOption2, filter_days:daysOption});
      }
      if(selectedOption == 'task_priority' && selectedOptionsCont == selectedOptionsContent[keyValue]){
        taskPriority = keyValue;
        setSelectedValue(selectedOptionsCont);
        // priorityOption = 'task_priority';
        // setSelectedIndex(index);
        // setSelectedOption2({...selectedOption2,task_priority:priorityOption});
      }
      setPostData({...postData,task_status:taskStatus,filter_days:filterDays,task_priority:taskPriority})
      console.log('post---',postData);
    }
  
    const filterApiCall = async()=>{
      setLoading(true);
      console.log('filter_data--',postData);
      try {
        await axiosPostApi(apiUrl.mytask, postData)
          .then(async res => {
            const apiResponse = res?.data;
            // console.log('tasks--', apiResponse);
            if (!apiResponse?.success) {
              Alert.alert('Opps!', 'Something went wrong');
            } else {
              console.log('data fetched...');
              setTasks(apiResponse?.data);
              setLoading(false);
              setModalVisible(false);
            }
          })
          .catch(error => {
            console.log('error---', error);
          });
      } catch (error) {
        console.log(`Error message: ${error}`);
      }
    }
  
    const handleOptionSelect = (option, content) => {
      // console.log('content---',content);
      setSelectedOption(option);
      setSelectedOptionsContent(content);
    };
    const {profile} = useLogin();
  
    useEffect(() => {
      getTasks();
      console.log('userId--', profile);
    }, []);
  
    const getTasks = async () => {
      const data = {
        id: profile.id,
        role_name: profile.role_name,
      };
      try {
        await axiosPostApi(apiUrl.mytask, data)
          .then(async res => {
            const apiResponse = res?.data;
            // console.log('tasks--', apiResponse);
            if (!apiResponse?.success) {
              Alert.alert('Opps!', 'Something went wrong');
            } else {
              console.log('data fetched...');
              setTasks(apiResponse?.data);
              setLoading(false);
            }
          })
          .catch(error => {
            console.log('error---', error);
          });
      } catch (error) {
        console.log(`Error message: ${error}`);
      }
    };
  
    // index == selectedIndex && selectedOption == selectedOption2[selectedOption]
  
    return (
      <>
        <Loading visible={loading} title={'Fetching Your Tasks'} />
        <View style={styles.container}>
          <View style={{...styles.flexView, justifyContent: 'space-between'}}>
            <View></View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 24,
                padding: moderateScale(10),
                color: colors.themeColor,
              }}>
              Task Lists
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                style={{marginRight: moderateScale(5)}}
                tintColor={colors.themeColor}
                source={imagePath.filter}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={tasks}
            renderItem={({item}) => <TaskListing item={item} />}
          />
        </View>
  
        <Modal
          animationType="slide"
          // transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
  
          <View style={{...styles.flexView, justifyContent: 'space-between'}}>
            <View></View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 24,
                padding: moderateScale(10),
                color: colors.themeColor,
              }}>
              Task Filters
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                style={{marginRight: moderateScale(5)}}
                tintColor={colors.themeColor}
                source={imagePath.close}
              />
            </TouchableOpacity>
          </View>
  
  
        {loading ? 
          <Loading visible={true} title={'Filter out your choices.Please wait'}/>
          :
          <View style={styles.container2}>
            <View style={styles.leftSidebar}>
              <View style={styles.columnItem}>
                <Text
                  onPress={() => handleOptionSelect('filter_days', dateOptions)}
                  style={[
                    styles.sidebarOption,
                    selectedOption === 'filter_days' && styles.activeSidebarOption,
                  ]}
                >
                  Date
                </Text>
              </View>
              <View style={styles.columnItem}>
                <Text
                onPress={() => handleOptionSelect('task_priority', priorityOptions)}
                style={[
                  styles.sidebarOption,
                  selectedOption === 'task_priority' && styles.activeSidebarOption,
                ]}
                >Task Priority</Text>
              </View>
              <View style={styles.columnItem}>
                <Text
                  onPress={() => handleOptionSelect('task_status', statusOptions)}
                  style={[
                    styles.sidebarOption,
                    selectedOption === 'task_status' && styles.activeSidebarOption,
                  ]}
                >
                  Task Status
                </Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.rightColumn}>
              <View>
              {Object.keys(selectedOptionsContent).map((key,index) => {
                const item = selectedOptionsContent[key];
                return (
                  <View key={key}>
                    <TouchableOpacity style={{width:moderateScale(150),backgroundColor:selectedOptionsContent[key] == selectedValue ? 'aqua':'lightgray',padding:8,margin:8,borderRadius:10}} onPress={()=>filterJson(selectedOption,index,key,selectedOptionsContent[key])}>
                        <Text>{selectedOptionsContent[key]} -- {index} -- {key} </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
              </View>
                  <View>
                    <View style={{marginVertical:moderateScale(10)}}>
                      {/* <Button color={colors.themeColor} onPress={()=>setPostData({
                            id:2,
                            role_name:'Junior',
                            task_status:'',
                            filter_days:'',
                            task_priority:''
                      })} title={'Clear Filters'}/> */}
                    </View>
                    <View>
                      <Text>{postData.filter_days ? postData.filter_days : ''}</Text>
                      <Text>{postData.task_priority ? postData.task_priority : ''}</Text>
                      <Text>{postData.task_status ? postData.task_status : ''}</Text>
                      <Button color={colors.themeColor} onPress={filterApiCall} title={'Apply Filters'}/>
                    </View>
                  </View>
              </View>
          </View>
        }
        </Modal>
      </>
    );
  };
  
  export default TaskCode;
  