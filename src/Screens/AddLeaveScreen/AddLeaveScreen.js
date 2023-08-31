import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';

const AddLeaveScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{...styles.container,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={showDatepicker}>
          <View style={styles.inputView}>
            <Text style={styles.textInput}>Select DOB - {date.toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={showTimepicker}>
          <View style={styles.inputView}>
            <Text style={styles.textInput}>Select Time - {date.toLocaleTimeString()}</Text>
          </View>
        </TouchableOpacity>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          // is24Hour={true}
          onChange={onChange}
        />
      )}
      <Text>selected: {date.toLocaleString()}</Text>
    </View>
  )
}

export default AddLeaveScreen