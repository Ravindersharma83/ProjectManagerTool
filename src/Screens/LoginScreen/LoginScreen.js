import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import ButtonComp from '../../Components/ButtonComp';
import imagePath from '../../Constants/imagePath';
import styles from './styles';
import TextInputWithLabel from '../../Components/TextInputWithLabel';

const LoginScreen = () => {
  const [isVisible, setVisible] = useState(true);
  return (
    <ScrollView style={styles.container}>
        <ImageBackground
          source={imagePath.login}
          style={styles.imgStyle}>
        </ImageBackground>

        <View style={styles.mainStyle}>
          <View>
          <TextInputWithLabel
            label={'Email'}
            placeholder={'Enter Email'}
            keyboardType='email-address'
            inputStyle={{ marginBottom: moderateVerticalScale(28) }}
          />

          <TextInputWithLabel
            label={'Password'}
            placeholder={'Enter Password'}
            secureTextEntry={isVisible}
            rightIcon={isVisible ? imagePath.hideEye : imagePath.showEye}
            onPressRight={() => setVisible(!isVisible)}
          />
          <View style={{marginTop:moderateScale(14)}}>
            <ButtonComp btnText={'Login'} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
