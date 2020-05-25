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
import RootOTPVerification from './RootOTPVerification.js';
import styles              from './styles.js';
import { colors, sizes }   from '../../../config/styles.js';

const window = Dimensions.get('window');

export default class OTPVerification extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;

    return (
      <React.Fragment>
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
           <RootOTPVerification navigation={navigate} />
          </View>
        </View>
        </ImageBackground>
      </React.Fragment>
    );
  }
}

