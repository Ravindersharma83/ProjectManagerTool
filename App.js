import {View } from 'react-native'
import React from 'react'
import Routes from './src/Navigation/Routes'
import LoginProvider from './src/Context/AuthContext'
import { TaskProvider } from './src/Context/TaskContext'

const App = () => {
  return (
    <LoginProvider>
      <TaskProvider>
      <View style={{flex:1}}>
        <Routes/>
      </View>
      </TaskProvider>
      </LoginProvider>

  )
}

export default App
