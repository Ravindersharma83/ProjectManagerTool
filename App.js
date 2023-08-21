import {View } from 'react-native'
import React from 'react'
import Routes from './src/Navigation/Routes'
import LoginProvider from './src/Context/AuthContext'

const App = () => {
  return (
    <LoginProvider>
      <View style={{flex:1}}>
        <Routes/>
      </View>
      </LoginProvider>

  )
}

export default App
