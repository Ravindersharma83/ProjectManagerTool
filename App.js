import {View } from 'react-native'
import React from 'react'
import Routes from './src/Navigation/Routes'
import LoginProvider from './src/Context/AuthContext'
import { TaskProvider } from './src/Context/TaskContext'
import { LeaveProvider } from './src/Context/LeaveContext'

const App = () => {
  return (
    <LoginProvider>
    <TaskProvider>
    <LeaveProvider>
      <View style={{flex:1}}>
        <Routes/>
      </View>
    </LeaveProvider>
    </TaskProvider>
    </LoginProvider>

  )
}

export default App
