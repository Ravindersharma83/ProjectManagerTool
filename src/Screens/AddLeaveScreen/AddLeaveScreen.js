import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderComp from '../../Components/HeaderComp';
import imagePath from '../../Constants/imagePath';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../Styles/colors';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ButtonComp from '../../Components/ButtonComp';

const AddLeaveScreen = ({navigation}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState('none');

  const [leaves, setLeaves] = useState(0);
  const [startDay, setStartDay] = useState(0);
  const [endDay, setEndDay] = useState(0);

  const leave_props = [
    { label: 'Planned', value: 'plan' },
    { label: 'Emergency', value: 'emergency' },
    { label: 'Short', value: 'short' },
  ];
  const day_props = [
    { label: 'Full Day', value: 'full day' },
    { label: 'Half Day', value: 'half day' },
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

  return (
    <View style={styles.container}>
      <HeaderComp title={'Apply For Leave'}  leftIcon={imagePath.icBack} onLeftPress={()=> navigation.goBack()}/>
      <View style={{padding:moderateScale(10),margin:moderateScale(8)}}>
        <TextInputWithLabel label={'Leave Reason'} placeholder={'Enter Leave Reason'} multiline={true}
        numberOfLines={2}/>

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
          <TextInputWithLabel inputStyle={{width:moderateScale(150)}} value={endDate.toDateString()} label={'End Date'} placeholder={'Select End Date'} editable={false}/>
        </TouchableOpacity>
        {show==="showEndDatePicker" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
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
                value={startTime.toLocaleTimeString()}
                label={'Start Time'}
                placeholder={'Select Start Time'}
                editable={false}
                inputStyle={{width:moderateScale(150)}}
              />
            </TouchableOpacity>
            {show === 'showStartTimePicker' && (
              <DateTimePicker
                testID="dateTimePicker"
                value={startTime}
                mode={mode}
                // is24Hour={true}
                onChange={onStartTimeChange}
              />
            )}

            <TouchableOpacity onPress={() => showMode('time', 'showEndTimePicker')}>
              <TextInputWithLabel
                value={endTime.toLocaleTimeString()}
                label={'End Time'}
                placeholder={'Select End Time'}
                editable={false}
                inputStyle={{width:moderateScale(150)}}
              />
            </TouchableOpacity>
            {show === 'showEndTimePicker' && (
              <DateTimePicker
                testID="dateTimePicker"
                value={endTime}
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
        <ButtonComp btnText={'Apply Leave'}/>
      </View>
    </View>
  )
}

export default AddLeaveScreen