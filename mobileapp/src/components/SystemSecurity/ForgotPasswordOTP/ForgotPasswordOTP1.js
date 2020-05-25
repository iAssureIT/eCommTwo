import React from 'react';
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
import Modal                        from "react-native-modal";
import ValidationComponent          from "react-native-form-validator";
import { Button, Icon }             from "react-native-elements";
import { TextField }                from "react-native-material-textfield";
import { ifIphoneX }                from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView }  from 'react-native-keyboard-aware-scroll-view';

import styles                       from './styles.js';
import { colors, sizes }            from '../../../config/styles.js';
import RootForgotPasswordOTP        from './RootForgotPasswordOTP.js';

const window = Dimensions.get('window');

export default class ForgotPasswordOTP1 extends ValidationComponent {
  render() {
    const { navigate, dispatch } = this.props.navigation;
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always" >
          <ImageBackground source={require("../../../images/Background.png")} style={styles.container} resizeMode="cover" >
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
                    source={require("../../../images/Background_2.png")}
                    style={{ width: '50%' }}
                    />
               </View>
               <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                    resizeMode="contain"
                    source={require("../../../images/GangaExpress_logo.png")}
                    style={{ width: '50%' }}
                    />
               </View>
            <RootForgotPasswordOTP navigation={navigate} />
          </View>
        </View>
        </ImageBackground>
        </ScrollView>
      </React.Fragment>
    );
  }
}

