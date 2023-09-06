import { View, Text, TouchableOpacity, Alert, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import HeaderComp from '../../Components/HeaderComp';
import imagePath from '../../Constants/imagePath';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../Styles/colors';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ButtonComp from '../../Components/ButtonComp';
import { axiosPostApi } from '../../Services/ApiService';
import apiUrl from '../../Constants/apiUrl';
import { useLogin } from '../../Context/AuthContext';
import navigationStrings from '../../Constants/navigationStrings';

const AddLeaveScreen = ({navigation}) => {
  const {profile} = useLogin();
  useEffect(()=>{
    const getReportingHead = async()=>{
      try {
        await axiosPostApi(apiUrl.get_reporting_head,{user_id:profile.id})
        .then((res)=>{
          const apiResponse = res?.data;
          if (!apiResponse?.success) {
            Alert.alert('Opps!', 'Something went wrong');
          } else {
            console.log('api response---',apiResponse?.data);
            setItems(apiResponse?.data)
          }
        })
        .catch((error)=>{
          console.log('error---',error);
        })
      } catch (error) {
        
      }
    }
    getReportingHead();
  },[])

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([]);

  const [leaveReason,setLeaveReason] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState('none');

  const [leaves, setLeaves] = useState(0);
  const [startDay, setStartDay] = useState(0);
  const [endDay, setEndDay] = useState(0);

  const leave_props = [
    { label: 'Planned', value: 'planned' },
    { label: 'Emergency', value: 'emergency' },
    { label: 'Short', value: 'short' },
  ];
  const day_props = [
    { label: 'Full Day', value: 'Full' },
    { label: 'Half Day', value: 'Half' },
  ];

  const onStartDateChange = (event, selectedDate) => {
    const selectedStartDate = selectedDate;
    setShow('none');
    setStartDate(selectedStartDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const selectedEndDate = selectedDate;
    setShow('none');
    setEndDate(selectedEndDate);
  };

  const onStartTimeChange = (event, selectedTime) => {
    const selectedStartTime = selectedTime;
    setShow('none');
    setStartTime(selectedStartTime);
  };

  const onEndTimeChange = (event, selectedTime) => {
    const selectedEndTime = selectedTime;
    setShow('none');
    setEndTime(selectedEndTime);
  };
  const showMode = (currentMode,pickerType) => {
    setShow(pickerType);
    setMode(currentMode);
  };

  // getting form data
  const getFormData = async()=>{
    if(leaveReason == "" || leaveReason.length < 20){
      Alert.alert('Opps!','Leave reason is required and should be more than 20 characters');
      return;
    }
    // console.log('label---',leave_props[leaves].label);
    if(leave_props[leaves].label == 'Short'){
      day_props[startDay].value = '';
      day_props[endDay].value = '';
      setEndDate(null);
      console.log('endtime---',endTime);
      if(endTime == null || startTime == null){
        Alert.alert('Opps!','Start and End time are required');
        return;
      }
    }

    if(leave_props[leaves].label != 'Short'){
      setStartTime(null);
      setEndTime(null);
      if(endDate && startDate > endDate){
        Alert.alert("Opps!","End date should be greater than Start date");
        return;
      }
    }
    if(!value){
      Alert.alert("Opps!","Please select your reporting head");
      return;
    }
    const data = {
      comment : leaveReason,
      start_date : startDate ? startDate.toISOString().split('T')[0] : null,
      end_date : endDate ? endDate.toISOString().split('T')[0] : null,
      start_full_half : day_props[startDay].value,
      end_full_half : day_props[endDay].value,
      start_time : startTime ? startTime.toTimeString().split(' ')[0] : null,
      end_time : endTime ? endTime.toTimeString().split(' ')[0] : null,
      leave_type : leave_props[leaves].value,
      r_head : value,
      user_id : profile.id,
      status : 1

    }
    
    try {
      await axiosPostApi(apiUrl.applyleave,data)
      .then((res)=>{
        const apiResponse = res?.data;
        if(!apiResponse?.success){
          Alert.alert('Opps!','Something went wrong')
        }
        Alert.alert("Success",apiResponse?.message)
        navigation.navigate(navigationStrings.LEAVE);
        console.log('resp---',apiResponse);
      })
      .catch((error)=>{
        console.log('api error---',error);
      })
    } catch (error) {
      console.log('error---',error);
    }
  }

  return (
    <View style={styles.container}>
      <HeaderComp title={'Apply For Leave'}  leftIcon={imagePath.icBack} onLeftPress={()=> navigation.goBack()}/>
      <View style={{padding:moderateScale(10),margin:moderateScale(8)}}>
        <TextInputWithLabel label={'Leave Reason'} placeholder={'Enter Leave Reason'} multiline={true}
        numberOfLines={2} value={leaveReason} onChangeText={(value)=>setLeaveReason(value)}/>
      <Text style={{marginVertical:moderateScale(8)}}>Select Reporting Head</Text>
      <DropDownPicker
        // style={{width:'92%',marginHorizontal:12}}
        style={{backgroundColor:'transparent'}}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        
      />

      <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
        <TouchableOpacity onPress={()=>showMode('date','showStartDatePicker')}>
          <TextInputWithLabel inputStyle={{width:moderateScale(150)}} value={startDate.toDateString()} label={'Start Date'} placeholder={'Select Start Date'} editable={false}/>
        </TouchableOpacity>
        {show==="showStartDatePicker" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode={mode}
            // is24Hour={true}
            onChange={onStartDateChange}
          />
        )}
      {leave_props[leaves].label != 'Short' ? <>
        <TouchableOpacity onPress={()=>showMode('date','showEndDatePicker')}>
          <TextInputWithLabel inputStyle={{width:moderateScale(150)}} value={endDate ? endDate.toDateString() : null} label={'End Date'} placeholder={'Select End Date'} editable={false}/>
        </TouchableOpacity>
        {show==="showEndDatePicker" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate || new Date()}
            mode={mode}
            // is24Hour={true}
            onChange={onEndDateChange}
          />
        )}
        </> : '' 
      }
      </View>

      {leave_props[leaves].label != 'Short' ? 
            <>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
              <RadioForm formHorizontal={true} animation={true}>
                {day_props.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={startDay === i}
                      onPress={() => setStartDay(i)}
                      borderWidth={1}
                      buttonInnerColor={colors.themeColor}
                      buttonOuterColor={startDay === i ? colors.themeColor : '#000'}
                      buttonSize={9}
                      buttonOuterSize={18}
                      buttonStyle={{}}
                      buttonWrapStyle={{ marginLeft: 10 }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={() => setStartDay(i)}
                      labelStyle={{ fontSize:11, fontWeight: 'bold', color: '#000' }}
                    />
                  </RadioButton>
                ))}
              </RadioForm>

              {endDate ?
               <RadioForm formHorizontal={true} animation={true}>
               {day_props.map((obj, i) => (
                 <RadioButton labelHorizontal={true} key={i}>
                   <RadioButtonInput
                     obj={obj}
                     index={i}
                     isSelected={endDay === i}
                     onPress={() => setEndDay(i)}
                     borderWidth={1}
                     buttonInnerColor={colors.themeColor}
                     buttonOuterColor={endDay === i ? colors.themeColor : '#000'}
                     buttonSize={9}
                     buttonOuterSize={18}
                     buttonStyle={{}}
                     buttonWrapStyle={{ marginLeft: 10 }}
                   />
                   <RadioButtonLabel
                     obj={obj}
                     index={i}
                     labelHorizontal={true}
                     onPress={() => setEndDay(i)}
                     labelStyle={{ fontSize:11, fontWeight: 'bold', color: '#000' }}
                   />
                 </RadioButton>
               ))}
             </RadioForm>
              : ''}
             
              </View>
            </> 
            : ''
      }

      {
        leave_props[leaves].label === 'Short' ? (
          <React.Fragment>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
            <TouchableOpacity onPress={() => showMode('time', 'showStartTimePicker')}>
              <TextInputWithLabel
                value={startTime ? startTime.toLocaleTimeString() : null }
                label={'Start Time'}
                placeholder={'Select Start Time'}
                editable={false}
                inputStyle={{width:moderateScale(150)}}
              />
            </TouchableOpacity>
            {show === 'showStartTimePicker' && (
              <DateTimePicker
                testID="dateTimePicker"
                value={startTime || new Date()}
                mode={mode}
                // is24Hour={true}
                onChange={onStartTimeChange}
              />
            )}

            <TouchableOpacity onPress={() => showMode('time', 'showEndTimePicker')}>
              <TextInputWithLabel
                value={endTime ? endTime.toLocaleTimeString() : null}
                label={'End Time'}
                placeholder={'Select End Time'}
                editable={false}
                inputStyle={{width:moderateScale(150)}}
              />
            </TouchableOpacity>
            {show === 'showEndTimePicker' && (
              <DateTimePicker
                testID="dateTimePicker"
                value={endTime || new Date()}
                mode={mode}
                // is24Hour={true}
                onChange={onEndTimeChange}
              />
            )}
            </View>
          </React.Fragment>
        ) : null
      }

      <Text style={{marginVertical:moderateScale(8)}}>Leave Type</Text>
      <RadioForm formHorizontal={true} animation={true}>
        {leave_props.map((obj, i) => (
          <RadioButton labelHorizontal={true} key={i}>
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={leaves === i}
              onPress={() => setLeaves(i)}
              borderWidth={1}
              buttonInnerColor={colors.themeColor}
              buttonOuterColor={leaves === i ? colors.themeColor : '#000'}
              buttonSize={10}
              buttonOuterSize={20}
              buttonStyle={{}}
              buttonWrapStyle={{ marginLeft: 10 }}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              onPress={() => setLeaves(i)}
              labelStyle={{ fontWeight: 'bold', color: '#000' }}
            />
          </RadioButton>
        ))}
      </RadioForm>
      </View>
      <View style={{flex:1,margin:moderateScale(20),justifyContent:'flex-end'}}>
        <ButtonComp btnText={'Apply Leave'} onPress={()=>getFormData()}/>
        {/* <TouchableOpacity
          activeOpacity={0.8}
          style={{...styles.btnStyle,marginTop:10}}
          onPress={()=>clearForm()}
        >
          <Text style={styles.btnTextStyle}>{'Clear Form'}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

export default AddLeaveScreen