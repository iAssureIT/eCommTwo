import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image, TextInput,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native';
import { KeyboardAwareScrollView }  from 'react-native-keyboard-aware-scroll-view';
import axios                      from 'axios';
// import styles                       from './styles.js';
import styles                       from '../../../AppDesigns/currentApp/styles/ScreenStyles/ForgotPasswordStyles.js';
import RootForgotPassword           from './RootForgotPassword.js';
import { colors, sizes }            from '../../../AppDesigns/currentApp/styles/CommonStyles.js';
import ValidationComponent          from "react-native-form-validator";

const window = Dimensions.get('window');

export default class ForgotPasswordOTP1 extends ValidationComponent {
  render() {
    const { navigate, dispatch } = this.props.navigation;
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always" >
         <ImageBackground source={require("../../../AppDesigns/currentApp/images/Background.png")} style={styles.container} resizeMode="cover" >
          <View style={{paddingHorizontal:20}}>
          <View style={styles.fpopacity}>
                   {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop:-63}}>
                        <Image
                        resizeMode="contain"
                        source={require("../../../AppDesigns/currentApp/images/Background_2.png")}
                        style={{ width: '50%' }}
                        />
                   </View> */}
                   <View style={styles.fpimgvw}>
                        <Image
                        resizeMode="contain"
                        source={require("../../../AppDesigns/currentApp/images/Logo.png")}
                        style={styles.fpimglogo}
                        />
                   </View>
             <RootForgotPassword navigation={navigate} />
              </View>
          </View>
          </ImageBackground>
        </ScrollView>
      </React.Fragment>
    );
  }
}