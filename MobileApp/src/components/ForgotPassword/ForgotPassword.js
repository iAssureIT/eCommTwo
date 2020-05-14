import React from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TextInput,
  Alert,
  Keyboard

} from 'react-native';
import { TextField } from "react-native-material-textfield";
import { Divider, Button, Icon } from 'react-native-elements';
import ValidationComponent from "react-native-form-validator";
// import axios from "../../config/axios.js";
import styles from './styles.js';
import Ripple from 'react-native-material-ripple';
import { colors, sizes } from '../../config/styles.js';
import Modal from "react-native-modal";

const window = Dimensions.get('window');

export default class ForgotPassword extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      email: '',
      mobileNumber: '',
      btnLoading: false,
    };
  }
  validInputField = (stateName, stateErr) => {
    const {
      email,
      mobileNumber,
    } = this.state;
    let valid = true;

    this.validate({
      [stateName]: {
        required: true,
      },
    });

    if (this.isFieldInError(stateName)) {
      let validinptError = this.getErrorsInField(stateName);
      this.setState({ validinptError });
      valid = false;
    } else {
      this.setState({ [stateErr]: "" });
    }

    return valid;
  };
  validInput = () => {
    const {
      email,
    } = this.state;
    let valid = true;

    this.validate({
      email: {
        required: true,
        email: true,
      },
    });
    this.validate({
      mobileNumber: {
        required: true,
        email: true,
      },
    });

    if (this.isFieldInError("email")) {
      this.setState({ emailError: this.getErrorsInField("email") });
      valid = false;
    } else {
      this.setState({ emailError: "" });
    }
    return valid;
  };

  displayValidationError = (errorField) => {
    let error = null;
    if (this.state[errorField]) {
      error = <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{this.state[errorField][0]}</Text>
      </View>;
    }
    return error;
  }


  handleSendOtp = () => {
    this.setState({ btnLoading: true })
    Keyboard.dismiss();

    let { email, mobileNumber } = this.state;
    email = email.toLowerCase();
    if (mobileNumber) {

      var mobileNo = '+91' + mobileNumber.split(' ')[1].split('-').join('')

    } else {
      var mobileNo = '';
    }
    // let emailOTP    = Math.floor(100000 + Math.random() * 900000);
    let mobileOTP = Math.floor(1000 + Math.random() * 9000);
    var formValues = {
      mobileNumber: mobileNo,
      emailId: email,
      // emailOTP,
      mobileOTP,
    }
    // this.props.navigation('ForgotPasswordOTP',{formValues:formValues});   

    var forgotpasswordOTP = 'api/users/post/forgotpwdOTP'

    axios.post(forgotpasswordOTP, formValues)
      .then((response) => {
        if (response.data.message == "MOBILE-NUMBER-NOT-FOUND") {
          // Alert.alert('Invalid email or mobile')
          this.setState({ btnLoading: false, invalid: true })
        } else {
          this.props.navigation.navigate('ForgotPasswordOTP', { formValues: formValues, mobileotp: mobileOTP, user_id: response.data.user_id });
          this.setState({ btnLoading: false })
        }
      })
      .catch(error => {
        console.log('error', error)
        this.setState({ btnLoading: false })
        Alert.alert("", "Sorry! Something went wrong. Please try again.")
        if (error.message === "Request failed with status code 401") {
          Alert.alert("Your session is expired! Please login again.", "", "error");
          this.props.history.push("/");
        }
      })

  }
  handleMobileChange(value) {
    if (value.startsWith && value.startsWith('+')) {
      value = value.substr(3);
    }
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    // let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    console.log("x value = ", x);
    // let y = !x[2] ? x[1] : x[1]+'-'+x[2];
    let y = x.input ? (!x[2] && !x[3]) ? '+91 ' + x[1] : (!x[3] ? '+91 ' + x[1] + '-' + x[2] : '+91 ' + x[1] + '-' + x[2] + '-' + x[3]) : '';
    // let y = '+1 '+x[1]+'-'+x[2]+'-'+x[3];
    this.setState({
      mobileNumber: y,
    });
  }

  render() {
    const messages = {
      en: {
        email: "Please enter a valid Email / Mobile number.",
        numbers: 'Please enter a valid Email / Mobile number.',
        required: '\nThis Field is mandatory.',
        minlength: '\nPassword length must be greater than {1}.',
        maxlength: '\nPassword length must be lower than {1}.'
      }
    };
    const { navigate, dispatch, goBack } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >

        <ImageBackground source={ require('../../images/Background.png') } style={{width: '100%', height: '100%'}}>
               <View style={{paddingHorizontal:30,marginBottom:30}}>
                    <View style={{ 
                         width: '100%', backgroundColor:'#fff',marginTop:80,borderColor:"#ccc",shadowColor: '#000',
                         shadowOffset: { width: 0, height: 2 },
                         shadowOpacity: 0.8,
                         shadowRadius: 2,
                         elevation: 8,}}>
                         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop:-63}}>
                              <Image
                              resizeMode="contain"
                              source={require("../../images/Background_2.png")}
                              style={{ width: '50%' }}
                              />
                         </View>
                         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                              <Image
                              resizeMode="contain"
                              source={require("../../images/GangaExpress_logo.png")}
                              style={{ width: '50%' }}
                              />
                         </View>
         <View style={{ paddingHorizontal: 35,marginBottom:"10%" }}><Text style={styles.loginTitleTxt}>Forgot Password</Text></View>
          
          <View style={styles.formWrapper}>

            <View style={[styles.formInputView, styles.marginBottom30]}>
              <View style={[styles.inputWrapper]}>
                <View style={styles.inputImgWrapper}></View>
                <View style={styles.inputTextWrapper}>
                  <TextField
                    label="Phone Number"
                    onChangeText={(mobileNumber) => { this.setState({ mobileNumber }, () => { this.validInputField('mobileNumber', 'mobileNumberError'); }), this.handleMobileChange(mobileNumber) }}
                    lineWidth={1}
                    tintColor={colors.button}
                    inputContainerPadding={0}
                    labelHeight={15}
                    labelFontSize={sizes.label}
                    titleFontSize={sizes.title}
                    baseColor={'#666'}
                    textColor={'#333'}
                    value={this.state.mobileNumber}
                    containerStyle={styles.textContainer}
                    inputContainerStyle={styles.textInputContainer}
                    titleTextStyle={styles.textTitle}
                    style={styles.textStyle}
                    labelTextStyle={styles.textLabel}
                    keyboardType="numeric"
                  />

                </View>
              </View>
              {this.displayValidationError('mobileNumberError')}
            </View>
            <View style={[styles.formInputView, styles.marginBottom30]}>
              <View style={[styles.inputWrapper]}>
               <View style={styles.inputImgWrapper}></View>
                <View style={styles.inputTextWrapper}>
                  <TextField
                    label="Email"
                    onChangeText={email => this.setState({ email })}
                    lineWidth={1}
                    tintColor={colors.button}
                    inputContainerPadding={0}
                    labelHeight={15}
                    labelFontSize={sizes.label}
                    titleFontSize={15}
                    baseColor={'#666'}
                    textColor={'#333'}
                    value={this.state.email}
                    containerStyle={styles.textContainer}
                    inputContainerStyle={styles.textInputContainer}
                    titleTextStyle={styles.textTitle}
                    style={styles.textStyle}
                    labelTextStyle={styles.textLabel}
                    keyboardType="email-address"
                    autoCapitalize='none'
                  />
                </View>
              </View>
              {this.displayValidationError('emailError')}
            </View>

            <View style={[styles.formInputView, styles.marginBottom30, { flexDirection: 'row' }]}>
              {
                this.state.btnLoading ?
                  <Button
                    titleStyle={styles.buttonText}
                    title="Loading"
                    loading
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonFrgContainer}
                  />
                  :
                  <Button
                    onPress={this.handleSendOtp}
                    titleStyle={styles.buttonText}
                    title="Send OTP"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonFrgContainer}
                  />
              }
              <Button
                onPress={() => this.props.navigation.navigate("LogIn")}
                titleStyle={styles.buttonSignInText}
                title="Sign In"
                buttonStyle={styles.buttonSignUp}
                containerStyle={styles.buttonFrg1Container}
              />
            </View>
          </View>
        </View>
        <Modal isVisible={this.state.invalid}
          onBackdropPress={() => this.setState({ invalid: false })}
          coverScreen={true}
          hideModalContentWhileAnimating={true}
          style={{ paddingHorizontal: '5%', zIndex: 999 }}
          animationOutTiming={500}>
          <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
            <View style={{ justifyContent: 'center', backgroundColor: "#ec971f", width: 50, height: 50, borderRadius: 25, overflow: 'hidden' }}>
              <Icon size={28} name='exclamation' type='font-awesome' color='#fff' style={{}} />
            </View>
            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
              Invalid  Phone Number
                </Text>
            <View style={{ width: '100%', marginTop: 15, paddingHorizontal: '10%' }}>
              <Button
                onPress={() => this.setState({ invalid: false })}
                titleStyle={styles.buttonText1}
                title="OK"
                buttonStyle={styles.buttonSignUp1}
                containerStyle={styles.buttonContainer}
              />

            </View>
          </View>
        </Modal>
        </View>
        </ImageBackground>
      </ScrollView>
    );

  }
}

ForgotPassword.defaultProps = {
  messages: {
    en: {
      email: 'Enter a valid email address',
      required: 'This field is required.',
      mobileNo: 'Enter a valid mobile number.',
    }
  },

  rules: {
    email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$|^$/,
    required: /\S+/,
    mobileNo: /^(\+91\s)?[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/,
  },
}