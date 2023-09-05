import { View, Text, ScrollView, FlatList,RefreshControl } from 'react-native'
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

const LeaveScreen = ({navigation}) => {
  const { state, dispatch } = useLeaveContext(); // Get leaves from context
  const {profile} = useLogin();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getLeaves();
  }, []);

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
          data={state.leaves}
          renderItem={({item}) => <LeaveListing item={item} navigation={navigation} />}
          //onEndReached={handleEndReached} // Auto-scroll load functionality
          //onEndReachedThreshold={0.1} // Distance from the end of the list to trigger onEndReached
          // ListFooterComponent={() => {
          //   if (state.tasks.length <= visibleItemCount) {
          //     // Don't render the loading indicator if the data array is small
          //     return null;
          //   }
          //   return isLoadingMore ? <ActivityIndicator size="large" color={colors.themeColor} /> : null;
          // }}
          />
        </RefreshControl>
    </View>
    </>
  )
}

export default LeaveScreen