import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderComp from '../../Components/HeaderComp';
import imagePath from '../../Constants/imagePath';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../Styles/colors';
import TextInputWithLabel from '../../Components/TextInputWithLabel';

const AddLeaveScreen = ({navigation}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(null);

  const onDateChange = (event, selectedDate, type) => {
    setShow(null);
    if (type === 'start') {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime, type) => {
    setShow(null);
    if (type === 'start') {
      setStartTime(selectedTime);
    } else {
      setEndTime(selectedTime);
    }
  };

  const showPicker = (currentMode, pickerType) => {
    setShow(pickerType);
    setMode(currentMode);
  };

  const renderDateTimePicker = (value, onChange) => {
    return show === value && (
      <DateTimePicker
        testID="dateTimePicker"
        value={value === 'start' ? startDate : endDate}
        mode={mode}
        onChange={(event, selectedDate) => onChange(event, selectedDate, value)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComp title={'Apply For Leave'}  leftIcon={imagePath.icBack} onLeftPress={()=> navigation.goBack()}/>
      <View style={{padding:moderateScale(10),margin:moderateScale(8)}}>
        <TextInputWithLabel label={'Leave Reason'} placeholder={'Enter Leave Reason'} multiline={true}
        numberOfLines={2}/>

        <TouchableOpacity onPress={() => showPicker('date', 'start')}>
          <TextInputWithLabel
            value={startDate.toDateString()}
            label={'Start Date'}
            placeholder={'Select Start Date'}
            editable={false}
          />
        </TouchableOpacity>
        {renderDateTimePicker('start', onDateChange)}

        <TouchableOpacity onPress={() => showPicker('date', 'end')}>
          <TextInputWithLabel
            value={endDate.toDateString()}
            label={'End Date'}
            placeholder={'Select End Date'}
            editable={false}
          />
        </TouchableOpacity>
        {renderDateTimePicker('end', onDateChange)}

        <TouchableOpacity onPress={() => showPicker('time', 'start')}>
          <TextInputWithLabel
            value={startTime.toTimeString()}
            label={'Start Time'}
            placeholder={'Select Start Time'}
            editable={false}
          />
        </TouchableOpacity>
        {renderDateTimePicker('start', onTimeChange)}

        <TouchableOpacity onPress={() => showPicker('time', 'end')}>
          <TextInputWithLabel
            value={endTime.toTimeString()}
            label={'End Time'}
            placeholder={'Select End Time'}
            editable={false}
          />
        </TouchableOpacity>
        {renderDateTimePicker('end', onTimeChange)}
        
      </View>
    </View>
  )
}

export default AddLeaveScreen