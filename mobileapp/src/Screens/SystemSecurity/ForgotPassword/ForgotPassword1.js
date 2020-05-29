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

// import styles                       from './styles.js';
import styles                       from '../../AppDesigns/currentApp/styles/ScreenStyles/ForgotPasswordStyles.js';
import RootForgotPassword           from './RootForgotPassword.js';
import { colors, sizes }            from '../../../AppDesigns/currentApp/styles/CommonStyles.js.js';
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
          <View style={{ 
                   width: '100%', backgroundColor:'#fff',marginTop:80,borderColor:"#ccc",shadowColor: '#000',
                   shadowOffset: { width: 0, height: 2 },
                   shadowOpacity: 0.8,
                   shadowRadius: 2,
                   elevation: 8,}}>
                   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop:-63}}>
                        <Image
                        resizeMode="contain"
                        source={require("../../../AppDesigns/currentApp/images/Background_2.png")}
                        style={{ width: '50%' }}
                        />
                   </View>
                   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                        resizeMode="contain"
                        source={require("../../../AppDesigns/currentApp/images/GangaExpress_logo.png")}
                        style={{ width: '50%' }}
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