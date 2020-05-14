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
import ValidationComponent from "react-native-form-validator";
import { Button, Icon } from "react-native-elements";
import { TextField } from "react-native-material-textfield";
// import axios from "../../config/axios.js";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles.js';
import { colors, sizes } from '../../config/styles.js';
import Ripple from 'react-native-material-ripple';



const window = Dimensions.get('window');

export default class LogIn extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      email: '',
      password: '',
      emailError: [],
      showPassword: false,
      btnLoading: false,
      incorrectPwModal: false,
      test: ''
    };
  }

  validInput = () => {
    const {
      email,
      password,
    } = this.state;
    let valid = true;

    this.validate({

      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 5
      },

    });

    if (this.isFieldInError("email")) {
      this.setState({ emailError: this.getErrorsInField("email") });
      valid = false;
    } else {
      this.setState({ emailError: "" });
    }
    if (this.isFieldInError("password")) {
      this.setState({ passwordError: this.getErrorsInField("password") });
      valid = false;
    } else {
      this.setState({ passwordError: "" });
    }

    return valid;
  };

  login = () => {
    let { email, password } = this.state;
    email = email.toLowerCase();
    // console.log('email',email,password)
    var loginValues = { email: email, password: password }
    // console.log('this.validInput',this.validInput())
    if (this.validInput()) {
      this.setState({ btnLoading: true })
      axios.post('/api/users/post/loginwithuser', loginValues)
        .then(response => {
          // console.log('response Login',response)
          if (response.data.message == 'User not found') {
            Alert.alert("", "User Not found")
            this.setState({ btnLoading: false })
          } else {
            this.setState({ btnLoading: false })
            AsyncStorage.multiSet([
              ['user_id', response.data.user_ID],
              ['token', response.data.token],
              ['userName', response.data.userFullName]
            ])
            this.props.navigation.navigate('WorkspaceMap', { userId: response.data.user_ID, token: response.data.token })
          }
        })
        .catch(error => {
          console.log('error', error)
          if (error.response.status == 401) {
            this.setState({ incorrectPwModal: true, btnLoading: false })
          }

        })
    } else {
      console.log('error')
      this.setState({ btnLoading: false })
    }
  }


  validInputField = (stateName, stateErr) => {
    const {
      email,
      password,
    } = this.state;
    let valid = true;

    this.validate({
      [stateName]: {
        required: true,
      }
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


  displayValidationError = (errorField) => {
    let error = null;
    if (this.state[errorField]) {
      error = <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{this.state[errorField][0]}</Text>
      </View>;
    }
    return error;
  }

  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
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

    const { navigate, dispatch } = this.props.navigation;
    return (

      <View contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <ImageBackground source={ require('../../images/Background.png') } style={{width: '100%', height: '100%'}}>
               <View style={{paddingHorizontal:20,}}>
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
                         <View style={{ paddingHorizontal: 35,marginBottom:"15%" }}><Text style={styles.loginTitleTxt}>Sign In</Text></View>
                         <View style={styles.formWrapper}>
                              <View style={[styles.formInputView, styles.marginBottom20]}>
                              <View style={[styles.inputWrapper]}>
                               <View style={styles.inputImgWrapper}>
                                        </View>
                              <View style={styles.inputTextWrapper}>
                                <TextField
                                  label="Email"
                                  onChangeText={(email) => { this.setState({ email }, () => { this.validInputField('email', 'emailError'); }) }}
                                  lineWidth={1}
                                  tintColor={colors.tintColor}
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

                              <View style={[styles.formInputView, styles.marginBottom20]}>
                                   <View style={[styles.inputWrapper]}>
                                    <View style={styles.inputImgWrapper}>
                                        </View>
                                   <View style={styles.inputText2Wrapper}>
                                     <TextField
                                       label="Password"
                                       onChangeText={(password) => { this.setState({ password }, () => { this.validInputField('password', 'passwordError'); }) }}
                                       lineWidth={1}
                                       tintColor={colors.tintColor}
                                       inputContainerPadding={0}
                                       labelHeight={15}
                                       labelFontSize={sizes.label}
                                       titleFontSize={15}
                                       baseColor={'#666'}
                                       textColor={'#333'}
                                       value={this.state.password}
                                       containerStyle={styles.textContainer}
                                       inputContainerStyle={styles.textInputContainer}
                                       titleTextStyle={styles.textTitle}
                                       style={styles.textStyle}
                                       labelTextStyle={styles.textLabel}
                                       keyboardType="default"
                                       autoCapitalize='none'
                                       secureTextEntry={this.state.showPassword ? false : true}
                                     />
                                   </View>
                                   <View style={[styles.eyeWrapper, {}]}>
                                     <TouchableOpacity onPress={this.handleShowPassword}>
                                       <Icon name={this.state.showPassword ? "eye-with-line" : "eye"} type="entypo" size={22} color="#aaa" style={{}} />
                                     </TouchableOpacity>
                                   </View>
                                   </View>
                                   {this.displayValidationError('passwordError')}
                              </View>
                              {this.state.btnLoading
                              ?

                               <Button
                                 titleStyle={styles.buttonText}
                                 title="Processing"
                                 loading
                                 buttonStyle={styles.button}
                                 containerStyle={styles.buttonContainer}
                               />

                              :

                               <Button
                                 onPress={this.login.bind(this)}
                                 titleStyle={styles.buttonText}
                                 title="Sign In"
                                 buttonStyle={styles.button}
                                 containerStyle={styles.buttonContainer}
                               />

                              }

                              <View style={[{ flexDirection: 'row',marginTop: '10%',marginBottom: '5%',paddingHorizontal:20 }]}>
                                   <View style={{flex:0.3,flexDirection:'row',alignItems:'flex-start'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")}>
                                             <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                                                  <Text style={[styles.linkText,{marginRight:5,}]}>
                                                       Sign Up
                                                  </Text>
                                                  <Icon name="angle-double-right" type="font-awesome" size={22} color="#666" style={{}} />
                                             </View>
                                        </TouchableOpacity>
                                   </View>
                                   <View style={{flex:0.8,alignItems:'flex-end'}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgotPassword")}>
                                             <Text style={[styles.linkText, { color: colors.textLight }]}>
                                             Forgot Password?
                                             </Text>
                                        </TouchableOpacity>
                                   </View>
                              </View>
                             {/* <Modal isVisible={this.state.incorrectPwModal}
                                   onBackdropPress={() => this.setState({ incorrectPwModal: false })}
                                   coverScreen={true}
                                   hideModalContentWhileAnimating={true}
                                   style={{ paddingHorizontal: '5%', zIndex: 999 }}
                                   animationOutTiming={500}>
                                   <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                                        <View style={{ justifyContent: 'center', backgroundColor: "#dc3545", width: 50, height: 50, borderRadius: 25, overflow: 'hidden' }}>
                                             <Icon size={30} name='x' type='feather' color='#fff' style={{}} />
                                        </View>
                                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 15, textAlign: 'center', marginTop: 20 }}>
                                             Oops!
                                        </Text>
                                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 15, textAlign: 'center' }}>
                                             You've entered wrong Email or Password
                                        </Text>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginVertical: 15 }}>
                                             Please check and try again
                                        </Text>
                                        <View style={{ borderBottomRightRadius: 500, marginTop: 15, flexDirection: 'row' }}>
                                             <Button
                                                  onPress={() => this.setState({ incorrectPwModal: false })}
                                                  titleStyle={styles.buttonText}
                                                  title="OK"
                                                  buttonStyle={{ width: '100%', height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
                                                  containerStyle={styles.buttonContainer}
                                                  />
                                        </View>
                                   </View>
                              </Modal>*/}
                         </View>
                    </View>
          </View>

          
        </ImageBackground>
      </View>


    );

  }
}

LogIn.defaultProps = {
  messages: {
    en: {
      numbers: 'This field must be a number.',
      email: 'Enter a valid email address',
      required: 'This field is required.',
      letters: 'It should only contain letters.',
      mobileNo: 'Enter a valid mobile number.',
      lettersOrEmpty: 'It should only contain letters.',
      minlength: 'Length should be greater than {1}',
    }
  },

  rules: {
    numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
    email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$|^$/,
    required: /\S+/,
    letters: /^[a-zA-Z ]+$/,
    lettersOrEmpty: /^[a-zA-Z ]+$|^$/,
    mobileNo: /^\d{5}([- ]*)\d{6}$|^(\+91?)?[0]?(91)?[789]\d{9}$|^$/,
    minlength(length, value) {
      if (length === void (0)) {
        throw 'ERROR: It is not a valid length, checkout your minlength settings.';
      } else if (value.length > length) {
        return true;
      }
      return false;
    },
  },
}