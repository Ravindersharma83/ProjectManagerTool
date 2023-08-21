import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import ButtonComp from '../../Components/ButtonComp';
import imagePath from '../../Constants/imagePath';
import styles from './styles';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import { Formik } from 'formik';
import * as Yup from 'yup';
import colors from '../../Styles/colors';
import apiUrl from '../../Constants/apiUrl';
import { axiosPostApi } from '../../Services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../Context/AuthContext';
import Loading from '../../Components/Loading';

const LoginScreen = () => {
  const [isVisible, setVisible] = useState(true);
  const {setIsLoggedIn,setProfile,isLoggedIn} = useLogin();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email address'),
    password: Yup.string()
      .required('Please enter a password'),
  });

  const loginUser = async (values) =>{
    const data = {
      email:values.email,
      password:values.password
    }
    try {
     await axiosPostApi(apiUrl.login,data)
     .then(async(res)=>{
      const data = res?.data;
      if(!data?.success){
        Alert.alert('Opps!',data?.message)
      }else{
        const jsonValue = JSON.stringify(data?.data);
        console.log('jsonValue',jsonValue);
        AsyncStorage.setItem('user', jsonValue);
        AsyncStorage.setItem('loggedIn', JSON.stringify(true))
        await AsyncStorage.getItem('loggedIn',(err, value) => {
          if (err) {
              Alert.alert("No data found");
          } else {
              setIsLoggedIn(JSON.parse(value)) 
          }
        })
        // setIsLoggedIn(true);
        setProfile(data?.data);
        Alert.alert(`Welcome ${data?.data?.name} . You are logged in as ${data?.data?.role_name}`)
      }
     })
     .catch((error)=>{
      console.log('error---',error);
     })
    } catch (error) {
        console.log(`Error message: ${error}`);
    }
  }

  return (
    <>
    <ScrollView>
        <ImageBackground
          source={imagePath.login}
          style={styles.imgStyle}>
        </ImageBackground>

        <View style={styles.mainStyle}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              // Handle form submission here
              // console.log('Form values:', values);
              loginUser(values);
            }}
          >
          {({ values, errors, touched, handleChange, handleBlur, setFieldTouched, handleSubmit, isValid }) => (

          <View>
          <TextInputWithLabel
            label={'Email'}
            placeholder={'Enter Email'}
            keyboardType='email-address'
            // inputStyle={{ marginBottom: moderateVerticalScale(28) }}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
          />
          {touched.email && errors.email && (
              <Text style={{color:colors.errorColor,marginBottom:moderateVerticalScale(28)}}>{errors.email}</Text>
          )}
          <TextInputWithLabel
            label={'Password'}
            placeholder={'Enter Password'}
            secureTextEntry={isVisible}
            rightIcon={isVisible ? imagePath.hideEye : imagePath.showEye}
            onPressRight={() => setVisible(!isVisible)}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          {touched.password && errors.password && (
            <Text style={{color:colors.errorColor,marginBottom:moderateVerticalScale(28)}}>{errors.password}</Text>
          )}
          <View style={{marginTop:moderateScale(14)}}>
            <ButtonComp btnText={'Login'} onPress={handleSubmit}  />
          </View>
        </View>
        )}
      </Formik>
      </View>
    </ScrollView>
    </>
  );
};

export default LoginScreen;
