import { View, Text, ScrollView, FlatList,RefreshControl,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComp from '../../Components/HeaderComp'
import imagePath from '../../Constants/imagePath'
import LeaveListing from './LeaveListing'
import styles from './styles'
import navigationStrings from '../../Constants/navigationStrings'
import { useLeaveContext } from '../../Context/LeaveContext'
import { useLogin } from '../../Context/AuthContext'
import { axiosPostApi } from '../../Services/ApiService'
import apiUrl from '../../Constants/apiUrl'
import Loading from '../../Components/Loading'
import colors from '../../Styles/colors'
import { useFocusEffect } from '@react-navigation/native';

const LeaveScreen = ({navigation}) => {
  const { state, dispatch } = useLeaveContext(); // Get leaves from context
  const {profile} = useLogin();
  const [loading, setLoading] = useState(true);

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

  // useEffect(() => {
  //   getLeaves();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getLeaves();

      return () => unsubscribe;
    }, [])
  );

  const getLeaves = async ()=>{
    try {
      await axiosPostApi(apiUrl.getleaves,{user_id: profile.id})
        .then(async res => {
          const apiResponse = res?.data;
          console.log('leaves--', apiResponse);
          if (!apiResponse?.success) {
            Alert.alert('Opps!', 'Something went wrong');
          } else {
            dispatch({ type: 'SET_LEAVES', payload: apiResponse?.data }); // Add leaves in context
            setLoading(false);
          }
        })
        .catch(error => {
          console.log('error---', error);
        });
    } catch (error) {
      console.log(`Error message: ${error}`);
    }
  }
  return (
    <>
    <Loading visible={loading} title={'Fetching Your Leaves'} />
      <HeaderComp title={'My Leaves'} rightIcon={imagePath.leaveAdd} onRightPress={()=>{navigation.navigate(navigationStrings.ADD_LEAVE)}}/>
    <View style={styles.container}>
      <RefreshControl
            refreshing={loading}
            onRefresh={()=>{
              getLeaves();
            }}
      >
      <FlatList
          data={state.leaves.slice(0, visibleItemCount)}
          renderItem={({item}) => <LeaveListing item={item} navigation={navigation} />}
          onEndReached={handleEndReached} // Auto-scroll load functionality
          onEndReachedThreshold={0.1} // Distance from the end of the list to trigger onEndReached
          ListFooterComponent={() => {
            if (state.leaves.length <= visibleItemCount) {
              // Don't render the loading indicator if the data array is small
              return null;
            }
            return isLoadingMore ? <ActivityIndicator size="large" color={colors.themeColor} /> : null;
          }}
          />
        </RefreshControl>
    </View>
    </>
  )
}

export default LeaveScreen