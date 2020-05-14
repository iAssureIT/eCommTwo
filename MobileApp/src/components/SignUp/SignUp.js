import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  Linking
} from 'react-native';
import { TextField } from "react-native-material-textfield";
import { Button, Icon } from "react-native-elements";
import CheckBox from 'react-native-check-box'
import ValidationComponent from "react-native-form-validator";
// import axios from "../../config/axios.js";
import styles from './styles.js';
import Ripple from 'react-native-material-ripple';
import {colors, sizes} from '../../config/styles.js';
import Modal from "react-native-modal";

const window = Dimensions.get('window');

export default class SignUp extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      inputFocusColor       : colors.textLight,
      isChecked             : false,
      firstName             : '',
      lastName              : '',
      mobileNumber          : '',
      email                 : '',
      password              : '',
      confirmPassword       : '',
      firstNameError        : [],
      lastNameError         : [],
      mobileNumberError     : [],
      emailError            : [],
      passwordError         : [],
      confirmPasswordError  : [],
      isCheckedError        : [],
      passwordMatch         : '',
      showPassword          : false,
      showConfirmPassword   : false,
      btnLoading            : false,
      
    };
  }

  handleOnChange = () =>{
    let isChecked = !this.state.isChecked;
    this.setState({ isChecked }, ()=>{
      if(isChecked){
        this.setState({isCheckedError: []});
      }else{
        this.setState({
          isCheckedError: ["Please accept the terms & conditions."]
        });
      }
    });
  }

  validInput = () => {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      confirmPassword,
    } = this.state;
    let valid = true;

    this.validate({
      firstName: {
        required: true,
        letters : true,
      },
      lastName: {
        required: true,
        letters : true,
      },
      email: { 
        required: true,
        email: true,
      },
      mobileNumber: { 
        required: true, 
        mobileNo: true,
        // numbers: true, 
        minlength: 9, 
        maxlength: 10 
      },
      password: { 
        required: true, 
        minlength: 5 
      },
      confirmPassword: { 
        required: true 
      }
    });

    if (this.isFieldInError("firstName")) {
      let firstNameError = this.getErrorsInField("firstName");
      this.setState({ firstNameError });
      valid = false;
    } else {
      this.setState({ firstNameError: "" });
      valid = true;
    }
    if (this.isFieldInError("lastName")) {
      this.setState({ lastNameError: this.getErrorsInField("lastName") });
      valid = false;
    } else {
      this.setState({ lastNameError: "" });
      valid = true;
    }
    if (this.isFieldInError("mobileNumber")) {
      this.setState({ mobileNumberError: this.getErrorsInField("mobileNumber") });
      valid = false;
    } else {
      this.setState({ mobileNumberError: "" });
      valid = true;
    }
    if (this.isFieldInError("email")) {
      this.setState({ emailError: this.getErrorsInField("email") });
      valid = false;
    } else {
      this.setState({ emailError: "" });
      valid = true;
    }
    if (this.isFieldInError("password")) {
      this.setState({ passwordError: this.getErrorsInField("password") });
      valid = false;
    } else {
      this.setState({ passwordError: "" });
      valid = true;
    }
    if (this.isFieldInError("confirmPassword")) {
      this.setState({
        confirmPasswordError: this.getErrorsInField("confirmPassword")
      });
      valid = false;
    } else {
      this.setState({ confirmPasswordError: "" });
      valid = true;
    }

    if (!this.state.isChecked) {
      this.setState({
        isCheckedError: ["Please accept the terms & conditions."]
      });
      valid = false;
    } else {
      this.setState({ isCheckedError: "" });
      valid = true;
    }

    if(this.state.passwordMatch!='matched'){
      valid = false;
    }
    // console.log((!this.isFieldInError("password")), (!this.isFieldInError("confirmPassword")),(!this.isFieldInError("email")), (!this.isFieldInError("mobileNumber") ) , (!this.isFieldInError("firstName")) , (!this.isFieldInError("lastName")) , (this.state.isChecked) , (this.state.passwordMatch=='matched') );
    
    // return valid;
    return ((!this.isFieldInError("password"))&& (!this.isFieldInError("confirmPassword"))&&(!this.isFieldInError("email"))&& (!this.isFieldInError("mobileNumber") ) && (!this.isFieldInError("firstName")) && (!this.isFieldInError("lastName")) && (this.state.isChecked) && (this.state.passwordMatch=='matched') );
    // return !this.isFieldInError("email");
  };



  validInputField = (stateName, stateErr) => {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      confirmPassword,
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

  handleSubmit = () =>{
    // console.log("this.isFormValid()===>",this.validInput());
    if(this.validInput()){ 
      
    // if(this.isFieldInError(this.state.email)|| this.isFieldInError(this.state.mobileNumber) || this.isFieldInError(this.state.firstName) || this.isFieldInError(this.state.lastName) ){ 
      let {
        firstName,
        lastName,
        mobileNumber,
        email,
        password
      } = this.state;
        var emailId = email.toLowerCase();
        // console.log(mobileNumber)
        var mobileNo = '+91'+mobileNumber.split(' ')[1].split('-').join('')
        // console.log(mobileNo)
        var roles = 'user';
        // let emailOTP    = Math.floor(100000 + Math.random() * 900000);
        let mobileOTP   = Math.floor(1000 + Math.random() * 9000);
        // console.log("roles = ",roles);
        
        var formValues = {
          firstName,
          lastName,
          mobileNumber: mobileNo,
          emailId,
          pwd: password,
          // emailOTP,
          mobileOTP,
          roles,
          status: 'Active'
        }
  
      this.setState({btnLoading: true})

      axios.post('api/users/post/checkuser',formValues)
         .then((response)=>{
          if(response.data.message == "Email Id already exists"){
          console.log('response',response)
         
          // Alert.alert('','Email Id already exists');
          this.setState({btnLoading: false,invalid:true})
         
          }else if(this.state.isChecked){
            axios.post('api/users/post/otpverificationsend',formValues)
            .then((response)=>{

              this.props.navigation.navigate('SignUpOTP',{formValues:formValues,mobileotp:mobileOTP});   
              this.setState({btnLoading: false})      
            })
          }else{
            this.setState({
                isCheckedError: ["Please accept the terms & conditions."]
              });
      }
    })
    }
  }

  checkboxClick = () =>{
    let isChecked = !this.state.isChecked;

    this.setState({ isChecked }, ()=>{
      if(isChecked){
        this.setState({
          isCheckedError: []
        });
      }else{
        this.setState({
          isCheckedError: ["Please accept the terms & conditions."]
        });
      }
    });
  }
  
  displayValidationError = (errorField) =>{
    let error = null;
    if(this.state[errorField]){
      error = <View style={styles.errorWrapper}>
                <Text style={styles.errorText}>{this.state[errorField][0]}</Text>
              </View> ;
    }
    return error;
  }

  displayTermsError = (errorField) =>{
    let error = null;
    if(this.state[errorField].length>0){
      error = <View style={{marginTop:-8,marginBottom:5}}>
                <Text style={styles.errorText}>{this.state[errorField][0]}</Text>
              </View> ;
    }
    return error;
  }  

  passwordChange = (value,key)=>{
    this.setState({
      [key] : value,
    },()=>{
      if(this.state.password && this.state.confirmPassword){
        if(this.state.password === this.state.confirmPassword)
          this.setState({passwordMatch: 'matched'});
        else
          this.setState({passwordMatch: 'not matched'});
      }

    });
  }

  handleMobileChange(value){
    // console.log("value = ",value);
    if(value.startsWith && value.startsWith('+')){
      value = value.substr(3);
    }
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    // let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    console.log("x value = ",x);
    // let y = !x[2] ? x[1] : x[1]+'-'+x[2];
    let y = x.input ? (!x[2]&&!x[3]) ? '+91 '+x[1] : (!x[3]?'+91 '+x[1]+'-'+x[2]:'+91 '+x[1]+'-'+x[2]+'-'+x[3]) : '';
    // let y = '+1 '+x[1]+'-'+x[2]+'-'+x[3];
    // console.log("y value = ",y)
    this.setState({
      mobileNumber : y,
    });
  }

  handleShowPassword = ()=>{
    this.setState({showPassword:!this.state.showPassword});
  }

  handleShowConfirmPassword = ()=>{
    this.setState({showConfirmPassword:!this.state.showConfirmPassword});
  }

  handleTerms = ()=>{
    this.props.navigation.navigate('TermsOfUse');
  }
  render(){
    // console.log("isCheckedError = ",this.state.isCheckedError);

    const { navigate,dispatch } = this.props.navigation;
    return (
      
     <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
         <ImageBackground source={ require('../../images/Background.png') } style={{width: '100%', height: '100%'}}>
               <View style={{paddingHorizontal:20,marginBottom:30}}>
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
                         <View style={{ paddingHorizontal: 35,marginBottom:"15%" }}><Text style={styles.loginTitleTxt}>Sign Up</Text></View>
                         <View style={styles.formWrapper}>
                              <View style={[styles.formInputView,styles.marginBottom20]}>
                                   <View style={[styles.inputWrapper]}>
                                        <View style={styles.inputImgWrapper}></View>
                                        <View style={styles.inputTextWrapper}>
                                             <TextField
                                             label                 = "First Name"
                                             onChangeText          = {(firstName) => {this.setState({ firstName },()=>{this.validInputField('firstName', 'firstNameError');})}}
                                             lineWidth             = {1}
                                             tintColor             = {colors.button}
                                             inputContainerPadding = {0}
                                             labelHeight           = {15}
                                             labelFontSize         = {sizes.label}
                                             titleFontSize         = {sizes.title}
                                             baseColor             = {'#666'}
                                             textColor             = {'#333'}
                                             value                 = {this.state.firstName}
                                             containerStyle        = {styles.textContainer}
                                             inputContainerStyle   = {styles.textInputContainer}
                                             titleTextStyle        = {styles.textTitle}
                                             style                 = {styles.textStyle}
                                             labelTextStyle        = {styles.textLabel}
                                             keyboardType          = "default"
                                             />
                                        </View>
                                   </View> 
                                   {this.displayValidationError('firstNameError')}
                              </View>

                              <View style={[styles.formInputView,styles.marginBottom20]}>
                                   <View style={[styles.inputWrapper]}>
                                        <View style={styles.inputImgWrapper}></View>
                                        <View style={styles.inputTextWrapper}>
                                             <TextField
                                             label                 = "Last Name"
                                             onChangeText          = {(lastName) => {this.setState({ lastName },()=>{this.validInputField('lastName', 'lastNameError');})}}
                                             lineWidth             = {1}
                                             tintColor             = {colors.button}
                                             inputContainerPadding = {0}
                                             labelHeight           = {15}
                                             labelFontSize         = {sizes.label}
                                             titleFontSize         = {sizes.title}
                                             baseColor             = {'#666'}
                                             textColor             = {'#333'}
                                             value                 = {this.state.lastName}
                                             containerStyle        = {styles.textContainer}
                                             inputContainerStyle   = {styles.textInputContainer}
                                             titleTextStyle        = {styles.textTitle}
                                             style                 = {styles.textStyle}
                                             labelTextStyle        = {styles.textLabel}
                                             keyboardType          = "default"
                                             />
                                        </View>
                                   </View> 
                                   {this.displayValidationError('lastNameError')}
                              </View>

                              <View style={[styles.formInputView,styles.marginBottom20]}>
                                   <View style={[styles.inputWrapper]}>
                                        <View style={styles.inputImgWrapper}></View>
                                        <View style={styles.inputTextWrapper}>
                                             <TextField
                                             label                 = "Phone Number"
                                             onChangeText          = {(mobileNumber) => {this.setState({ mobileNumber },()=>{this.validInputField('mobileNumber', 'mobileNumberError');}),this.handleMobileChange(mobileNumber)}}
                                                           // {mobileNumber => this.handleMobileChange(mobileNumber)}
                                             lineWidth             = {1}
                                             tintColor             = {colors.button}
                                             inputContainerPadding = {0}
                                             labelHeight           = {15}
                                             labelFontSize         = {sizes.label}
                                             titleFontSize         = {sizes.title}
                                             baseColor             = {'#666'}
                                             textColor             = {'#333'}
                                             value                 = {this.state.mobileNumber}
                                             containerStyle        = {styles.textContainer}
                                             inputContainerStyle   = {styles.textInputContainer}
                                             titleTextStyle        = {styles.textTitle}
                                             style                 = {styles.textStyle}
                                             labelTextStyle        = {styles.textLabel}
                                             keyboardType          = "numeric"
                                             />
                                        </View>
                                   </View> 
                                   {this.displayValidationError('mobileNumberError')}
                              </View>

                              <View style={[styles.formInputView,styles.marginBottom20]}>
                                   <View style={[styles.inputWrapper]}>
                                        <View style={styles.inputImgWrapper}></View>
                                        <View style={styles.inputTextWrapper}>
                                             <TextField
                                             label                 = "Email"
                                             onChangeText          = {(email) => {this.setState({ email },()=>{this.validInputField('email', 'emailError');})}}
                                             lineWidth             = {1}
                                             tintColor             = {colors.button}
                                             inputContainerPadding = {0}
                                             labelHeight           = {15}
                                             labelFontSize         = {sizes.label}
                                             titleFontSize         = {sizes.title}
                                             baseColor             = {'#666'}
                                             textColor             = {'#333'}
                                             value                 = {this.state.email}
                                             containerStyle        = {styles.textContainer}
                                             inputContainerStyle   = {styles.textInputContainer}
                                             titleTextStyle        = {styles.textTitle}
                                             style                 = {styles.textStyle}
                                             labelTextStyle        = {styles.textLabel}
                                             keyboardType          = "email-address"
                                             autoCapitalize        = 'none'
                                             />
                                        </View>
                                   </View>
                                   {this.displayValidationError('emailError')}
                              </View>  

                              <View style={[styles.formInputView,styles.marginBottom20]}>
                                   <View style={[styles.inputWrapper]}>
                                        <View style={styles.inputImgWrapper}></View>
                                        <View style={styles.inputText2Wrapper}>
                                             <TextField
                                             label                 = "Password"
                                             onChangeText          = {(password) => {this.setState({ password },()=>{this.validInputField('password', 'passwordError');}),this.passwordChange(password,"password")}}
                                             lineWidth             = {1}
                                             tintColor             = {colors.button}
                                             inputContainerPadding = {0}
                                             labelHeight           = {15}
                                             labelFontSize         = {sizes.label}
                                             titleFontSize         = {sizes.title}
                                             baseColor             = {'#666'}
                                             textColor             = {'#333'}
                                             value                 = {this.state.password}
                                             containerStyle        = {styles.textContainer}
                                             inputContainerStyle   = {styles.textInputContainer}
                                             titleTextStyle        = {styles.textTitle}
                                             style                 = {styles.textStyle}
                                             labelTextStyle        = {styles.textLabel}
                                             keyboardType          = "default"
                                             secureTextEntry       = {this.state.showPassword?false:true}
                                             autoCapitalize        = 'none'
                                             />
                                        </View>
                                        <View style={[styles.eyeWrapper,{}]}>
                                             <TouchableOpacity onPress={this.handleShowPassword}>
                                                  <Icon name={this.state.showPassword?"eye-with-line":"eye"} type="entypo" size={22}  color="#aaa" style={{}}/>
                                             </TouchableOpacity>
                                        </View>
                                   </View>
                                   {this.displayValidationError('passwordError')}
                              </View>

                              <View style={[styles.formInputView]}>
                                   <View style={[styles.inputWrapper]}>
                                        <View style={styles.inputImgWrapper}></View>
                                        <View style={styles.inputText2Wrapper}>
                                             <TextField
                                             label                 = "Confirm Password"
                                             onChangeText          = {(confirmPassword) => {this.setState({ confirmPassword },()=>{this.validInputField('confirmPassword', 'confirmPasswordError');}),this.passwordChange(confirmPassword,"confirmPassword")}}
                                             lineWidth             = {1}
                                             tintColor             = {colors.button}
                                             inputContainerPadding = {0}
                                             labelHeight           = {15}
                                             labelFontSize         = {sizes.label}
                                             titleFontSize         = {sizes.title}
                                             baseColor             = {'#666'}
                                             textColor             = {'#333'}
                                             value                 = {this.state.confirmPassword}
                                             containerStyle        = {styles.textContainer}
                                             inputContainerStyle   = {styles.textInputContainer}
                                             titleTextStyle        = {styles.textTitle}
                                             style                 = {styles.textStyle}
                                             labelTextStyle        = {styles.textLabel}
                                             keyboardType          = "default"
                                             secureTextEntry       = {this.state.showConfirmPassword?false:true}
                                             autoCapitalize        = 'none'
                                             />
                                        </View>
                                        <View style={[styles.eyeWrapper,{}]}>
                                             <TouchableOpacity onPress={this.handleShowConfirmPassword}>
                                                  <Icon name={this.state.showConfirmPassword?"eye-with-line":"eye"} type="entypo" size={22}  color="#aaa" style={{}}/>
                                             </TouchableOpacity>
                                        </View>
                                   </View>
                                   {this.displayValidationError('confirmPasswordError')}
                                   {this.state.passwordMatch == '' 
                                   ?
                                   null

                                   :
                                   this.state.passwordMatch=='matched'
                                   ?
                                     <View style={{width:'100%',marginTop:5}}>
                                       <Text style={styles.successText}>Passwords matched</Text>
                                     </View> 
                                   :
                                     <View style={{width:'100%',marginTop:5}}>
                                       <Text style={styles.errorText}>Passwords not matching</Text>
                                     </View>
                                   }
                              </View>             
                     
                              <View style={[styles.formInputView,{flexDirection:'row',marginVertical:15}]}>
                                   <View style={[{paddingVertical:8,paddingLeft:5,paddingRight:15}]}>
                                        <CheckBox
                                             style           = {{flex: 1, padding: 0}}
                                             checkBoxColor   = {colors.textLight}
                                             onClick         = {this.checkboxClick}
                                             isChecked       = {this.state.isChecked}
                                             // rightText       = {"I agree to the terms & conditions"}
                                             rightTextStyle  = {{fontFamily:"Montserrat-Regular"}}
                                        />
                                   </View>
                                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                                        <Text style={{fontFamily:"Montserrat-Regular"}}>I agree to the </Text>
                                        <TouchableOpacity onPress={()=> Linking.openURL('https://coffic.com/terms/')}>
                                             <Text style={{fontFamily:"Montserrat-Regular",textDecorationLine:'underline'}}>
                                                  terms & conditions
                                             </Text>
                                        </TouchableOpacity>
                                   </View>
                              </View>
                              <View style={styles.formInputView}>
                                   {this.displayTermsError('isCheckedError')}
                              </View>

                              {this.state.btnLoading ?
                                   <Button
                                        titleStyle      = {styles.buttonText}
                                        title           = "Processing"
                                        loading
                                        buttonStyle     = {styles.button}
                                        containerStyle  = {styles.buttonContainer}
                                        />
                              :
                                   <Button
                                        onPress         ={this.handleSubmit.bind(this)}
                                        titleStyle      = {styles.buttonText}
                                        title           = "Sign Up"
                                        buttonStyle     = {styles.button}
                                        containerStyle  = {styles.buttonContainer}
                                        />
                              }

                              <TouchableOpacity onPress={() => this.props.navigation.navigate("LogIn")}>
                                   <View style={[{alignItems:'center',justifyContent:'center',marginTop:'5%',flexDirection:'row',}]}>
                                        <Icon name="angle-double-left" type="font-awesome" size={22} color="#666" style={{}} />
                                        <Text style={{fontFamily:"Montserrat-Bold",color:'#666666',marginTop:'2%',marginLeft:5}}>
                                             Sign In
                                        </Text>
                                   </View>
                              </TouchableOpacity>
                         </View>
                    </View>
                    <Modal isVisible={this.state.invalid} 
                         onBackdropPress={() => this.setState({ invalid: false })}
                         coverScreen={true}
                         hideModalContentWhileAnimating={true}
                         style={{paddingHorizontal:'5%',zIndex:999}}
                         animationOutTiming={500}>
                         <View style={{backgroundColor:"#fff",alignItems:'center',borderRadius:20,paddingVertical:30,paddingHorizontal:10}}>
                              <View style={{justifyContent:'center',backgroundColor:"#ec971f",width:50,height:50,borderRadius:25,overflow:'hidden'}}>
                                   <Icon size={28} name='exclamation' type='font-awesome' color='#fff' style={{}}/>
                              </View>
                              <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,textAlign:'center',justifyContent:'center',marginTop:20}}>
                                   Email Id Already exists.
                              </Text>
                              <View style={{width:'100%',marginTop:15,paddingHorizontal:'10%'}}>
                                   <Button
                                   onPress         = {()=>this.setState({invalid:false})}
                                   titleStyle      = {styles.buttonText1}
                                   title           = "OK"
                                   buttonStyle     = {styles.buttonSignUp1}
                                   containerStyle  = {styles.buttonContainer1}
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

SignUp.defaultProps = {
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
    // mobileNo: /^\d{5}([- ]*)\d{6}$|^(\+91?)?[0]?(91)?[789]\d{9}$|^$/,
    mobileNo: /^(\+91\s)?[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/,
    minlength(length, value) {
      if (length === void(0)) {
        throw 'ERROR: It is not a valid length, checkout your minlength settings.';
      } else if(value.length > length) {
        return true;
      }
      return false;
    },
  },
}