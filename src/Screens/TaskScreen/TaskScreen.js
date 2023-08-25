import {View,Text,FlatList,RefreshControl,Alert,TouchableOpacity,Image,Modal,Button,ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useLogin} from '../../Context/AuthContext';
import {axiosPostApi} from '../../Services/ApiService';
import apiUrl from '../../Constants/apiUrl';
import {moderateScale} from 'react-native-size-matters';
import colors from '../../Styles/colors';
import Loading from '../../Components/Loading';

import imagePath from '../../Constants/imagePath';
import TaskListing from './TaskListing';
import { dateOptions } from '../../Enums/DaysEnum';
import { priorityLabels } from '../../Enums/PriorityEnum';
import { statusLables } from '../../Enums/StatusEnum';
import NotFound from '../../Components/NotFound';

const TaskScreen = () => {
  const {profile} = useLogin();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [visibleItemCount, setVisibleItemCount] = useState(3); // for load more option
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Track whether more data is being loaded
  let isEndReachedDebounced = false; // Track the debounce state

  const loadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true); // Set loading state
      setTimeout(() => {
        setVisibleItemCount(visibleItemCount + 2); // Load 2 more items
        setIsLoadingMore(false); // Reset loading state
      }, 1000); // Simulating a delay for demonstration
    }else{
      return;
    }
  };

  // Callback for reaching the end of the list
  const handleEndReached = () => {
    // loadMore();
    if (!isEndReachedDebounced) {
      isEndReachedDebounced = true;
      setTimeout(() => {
        isEndReachedDebounced = false;
        loadMore();
      }, 500); // Debounce delay
    }
  };

  const [selectedOption, setSelectedOption] = useState('filter_days');
  const [selectedOptionsContent, setSelectedOptionsContent] = useState(dateOptions);

  const [postData,setPostData] = useState({
    id:profile.id,
    role_name:profile.role_name,
    task_status:'',
    filter_days:'',
    task_priority:''
  })

  const [filterObj,setFilterObj] = useState({
    filter_days:'Today',
    task_status:'All',
    task_priority:'All'
  })

  const filterJson = (selectedOpt,index,keyValue,selectedOptionsCont)=>{

    let taskStatus = postData.task_status;
    let filterDays = postData.filter_days;
    let taskPriority = postData.task_priority;

    // console.log(`index----${keyValue} --option--- ${selectedOpt} --- value -- ${selectedOptionsCont}`);

    if(selectedOption == 'task_status' && selectedOptionsCont == selectedOptionsContent[keyValue]){
      taskStatus = keyValue;
      setFilterObj({...filterObj,task_status:selectedOptionsCont});

    }
    if(selectedOption == 'filter_days' && selectedOptionsCont == selectedOptionsContent[keyValue]){
      filterDays = keyValue;
      setFilterObj({...filterObj,filter_days:selectedOptionsCont});
    }
    if(selectedOption == 'task_priority' && selectedOptionsCont == selectedOptionsContent[keyValue]){
      taskPriority = keyValue;
      setFilterObj({...filterObj,task_priority:selectedOptionsCont});
    }
    setPostData({...postData,task_status:taskStatus,filter_days:filterDays,task_priority:taskPriority})
  }

  const handleOptionSelect = (option, content) => {
    // console.log('content---',content);
    setSelectedOption(option);
    setSelectedOptionsContent(content);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async (filter) => {
    console.log('tasks visible-',visibleItemCount);
    if(filter){
      setLoading(true);
      setVisibleItemCount(3);
      console.log('filter visible -',visibleItemCount);
    }
    const data = {
      id: profile.id,
      role_name: profile.role_name,
    };
    try {
      await axiosPostApi(apiUrl.mytask, filter ? postData : data)
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
  };
// console.log('tasks-----',tasks);
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
        {tasks.length > 0 ?
        <View style={{flex:1}}>
          <RefreshControl
            refreshing={loading}
            onRefresh={()=>{
              getTasks();
            }}
          >
          <FlatList
          data={tasks.slice(0, visibleItemCount)}
          renderItem={({item}) => <TaskListing item={item} />}
          onEndReached={handleEndReached} // Auto-scroll load functionality
          onEndReachedThreshold={0.1} // Distance from the end of the list to trigger onEndReached
          ListFooterComponent={() => {
            if (tasks.length <= visibleItemCount) {
              // Don't render the loading indicator if the data array is small
              return null;
            }
            return isLoadingMore ? <ActivityIndicator size="large" color={colors.themeColor} /> : null;
          }}
          />
          </RefreshControl>
          </View>
          : <NotFound/>}
        </View>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
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
              onPress={() => handleOptionSelect('task_priority', priorityLabels)}
              style={[
                styles.sidebarOption,
                selectedOption === 'task_priority' && styles.activeSidebarOption,
              ]}
              >Task Priority</Text>
            </View>
            <View style={styles.columnItem}>
              <Text
                onPress={() => handleOptionSelect('task_status', statusLables)}
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
                  <TouchableOpacity style={{width:moderateScale(150),backgroundColor:selectedOptionsContent[key] == filterObj[selectedOption] ? 'aqua':'lightgray',padding:8,margin:8,borderRadius:10}} onPress={()=>filterJson(selectedOption,index,key,selectedOptionsContent[key])}>
                      <Text>{selectedOptionsContent[key]}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            </View>
                <View>
                  <View style={{marginVertical:moderateScale(10)}}>
                  </View>
                  <View>
                    <Button color={colors.themeColor} onPress={()=>getTasks(true)} title={'Apply Filters'}/>
                  </View>
                </View>
            </View>
        </View>
      }
      </Modal>
    </>
  );
};

export default TaskScreen;
