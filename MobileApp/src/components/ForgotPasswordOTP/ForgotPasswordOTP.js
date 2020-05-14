import React from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Alert,
  AsyncStorage
} from 'react-native';
// import HeaderDy from "../../layouts/HeaderDy/HeaderDy.js";
import { TextField } from "react-native-material-textfield";
import { Button, Icon } from "react-native-elements";
import ValidationComponent from "react-native-form-validator";
// import axios from "../../config/axios.js";
import Modal from "react-native-modal";

import styles from './styles.js';
import Ripple from 'react-native-material-ripple';
import {colors,sizes} from '../../config/styles.js';
import Loading from '../../layouts/Loading/Loading.js';

const window = Dimensions.get('window');



export default class ForgotPasswordOTP extends ValidationComponent{

  constructor(props){
    super(props);
    this.state={
      inputFocusColor : colors.textLight,
      email : '',
      Password : '',
      resend : false,
      resendMobOtp : '',
      resendEmailOtp : '',
      otpMobInputError : '',
      otpEmailInputError : '',
      otpMobInput : ["","","",""],
      mobInputs : ["m1","m2","m3","m4"],
      otpEmailInput : ["","","","","",""],
      emailInputs : ["e1","e2","e3","e4","e5","e6"],
      btnLoading: false,
      resendLoading: false,
      userId: "",

      otpSentModal: true,
      openModal   : false,
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(['token','user_id'])
      .then((data)=>{
        token = data[0][1]
        user_id = data[1][1]
        this.setState({userId:user_id})
    })

    var formValues =  this.props.navigation.getParam('formValues','No Id');
    console.log('formValues',formValues)
    this.setState({'formValues':formValues})
    // this.otpMobInput[0].focus();
  }

  // focusNext(index, value, otpType, length) {
  //   if(otpType=="mobile"){
  //     var {mobInputs,otpMobInput} = this.state;
  //     otpMobInput[index] = value;
  //     this.setState({otpMobInput});  
  //   }else if(otpType=="email"){
  //     var {emailInputs,otpEmailInput} = this.state;
  //     otpEmailInput[index] = value;
  //     this.setState({otpEmailInput});
  //   }

  //   if(index<length-1 && value){
  //     let next = (otpType=="mobile") ? mobInputs[index+1] : emailInputs[index+1];
  //     this.refs[next].focus();
  //   }
  // }
    focusNext(index, value, otpType, length) {
    
    if(otpType=="mobile"){
      var {mobInputs,otpMobInput} = this.state;
      otpMobInput[index] = value;
      this.setState({otpMobInput});  
    }else if(otpType=="email"){
      var {emailInputs,otpEmailInput} = this.state;
      otpEmailInput[index] = value;
      this.setState({otpEmailInput});
    }

    if(index<length-1 && value){
      let next = (otpType=="mobile") ? mobInputs[index+1] : emailInputs[index+1];
      // console.log("next = ",next);
      this.refs[next].focus();
    }
    if(this.state.otpEmailInput.length==6){
      this.setState({
        otpEmail:this.state.otpEmailInput.map(data=>{
                  return data
                }).join("")
      })
    }
    if(this.state.otpMobInput.length==4){
      var otp = this.state.otpMobInput.map(data=>{
        return data
      }).join("")
      this.setState({otpMob:otp})
    }
  }
  focusPrevious(key, index, otpType) {
    if (key === 'Backspace' && index !== 0){
      if(otpType=="mobile"){
        let {mobInputs} = this.state;
        var prev = mobInputs[index-1];  
      }else{
        let {emailInputs} = this.state;
        var prev = emailInputs[index-1];
      }
      
      this.refs[prev].focus();
    }
  }

  handleKeyPress=()=>{
    console.log("inside handleKeyPress");
  }

  handleError = (error,name) =>{
    console.log("name = ",name, "error = ",error);
    this.setState({
      [name]:error,
    });
  }

  handleSubmit = ()=>{
    // console.log(" inside handleSubmit........");
    this.setState({resendLoading:true})
    let {otpMob} = this.state;
    var mobileotp =  this.props.navigation.getParam('mobileotp','No Id');
    var formValues =  this.props.navigation.getParam('formValues','No Id');
    var user_id =  this.props.navigation.getParam('user_id','');
    if( mobileotp == otpMob){
       this.props.navigation.navigate("ResetPassword",{formValues:formValues.emailId,user_id:user_id})
    }else{
        this.setState({incorrectOTP:true,resendLoading:false})
    }
  }

  handleResend =()=>{  
    this.setState({resendLoading:true,otpEmailInput:['','','','','',''],otpMobInput:['','','',''],otpEmail:'',otpMob:''})
    // let emailOTP    = this.props.navigation.getParam('emailotp','No Id');
    let mobileOTP   = this.props.navigation.getParam('mobileotp','No Id');
    var formValues = {
          mobileNumber: this.state.formValues.mobileNumber,
          emailId: this.state.formValues.emailId,
          // emailOTP,
          mobileOTP,
        }

    axios.post('api/users/post/forgotpwdOTP',formValues)
       .then((response)=>{
        if(response.data.message == "MOBILE-NUMBER-NOT-FOUND"){
          Alert.alert('Invalid  mobile')
          this.setState({incorrectOTP:true,resendLoading:false})
        }else{
          this.props.navigation.navigate('ForgotPasswordOTP',{formValues:formValues,mobileotp:mobileOTP});   
          this.setState({btnLoading: false})      
        //   Alert.alert('OTP Resend')
        this.setState({resendOTP:true,resendLoading:false})
        }
       })
      .catch(error=>{
        console.log('error',error)
        if(error.message === "Request failed with status code 401")
          {
                Alert.alert("Your session is expired! Please login again.","", "error");
               this.props.history.push("/");
          }
      })
  }
  
  render(){
    const messages = {
      en: {
        email: "Please enter a valid Email / Mobile number.",
        numbers: 'Please enter a valid Email / Mobile number.',
        required: '\nThis Field is mandatory.',
        minlength: '\nPassword length must be greater than {1}.',
        maxlength: '\nPassword length must be lower than {1}.'
      }
    };
    const { navigate,dispatch,goBack } = this.props.navigation;

    return (
     <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <ImageBackground source={ require('../../images/Background.png') } style={{width: '100%', height: '100%'}}>
               <View style={{paddingHorizontal:30,}}>
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

                         <View style={{ paddingHorizontal: 35,marginBottom:"10%" }}><Text style={styles.loginTitleTxt}>OTP Verification</Text></View>
                         <View style={{paddingHorizontal:30,}}><Text style={{fontSize:17,fontFamily:'Montserrat-Regular',textAlign:'center'}}>Please Enter Verification Code</Text></View>

                         <View style={styles.formWrapper}>
                              <View style={[styles.formInputView,styles.otpWrap]}>
                                   <Text style={styles.otpText}>Phone Number</Text>
                                   <View style={styles.otpInputWrap}>
                                   {
                                        this.state.mobInputs.map((data,index)=>{
                                        return(
                                             <View key={index} style={styles.otpInput}>
                                                  <TextField
                                                       label                 = ""
                                                       onChangeText          = {(v) => this.focusNext(index, v,"mobile",4)}
                                                       onKeyPress            = {e => this.focusPrevious(e.nativeEvent.key, index, "mobile")}
                                                       lineWidth             = {1}
                                                       tintColor             = {colors.button}
                                                       inputContainerPadding = {0}
                                                       labelHeight           = {15}
                                                       labelFontSize         = {sizes.label}
                                                       titleFontSize         = {15}
                                                       baseColor             = {'#666'}
                                                       textColor             = {'#333'}
                                                       // value                 = {this.state.email}
                                                       containerStyle        = {styles.textContainer}
                                                       inputContainerStyle   = {styles.textInputContainer}
                                                       titleTextStyle        = {styles.textTitle}
                                                       style                 = {styles.textStyle}
                                                       labelTextStyle        = {styles.textLabel}
                                                       keyboardType          = "numeric"
                                                       maxLength             = {1}
                                                       ref                   = {data}
                                                       selectTextOnFocus
                                                       selectionColor        = {colors.primary}
                                                  />
                                             </View>
                                             );
                                        })
                                   }
                                   </View>
                              </View>
                              <View style={[styles.formInputViewpwdOTP,styles.marginBottom30,{flexDirection:'row',paddingHorizontal:20}]}>
                                   <Button
                                        onPress         ={this.handleSubmit.bind(this)}
                                        titleStyle      = {styles.buttonText}
                                        title           = "Verify"
                                        buttonStyle     = {styles.button}
                                        containerStyle  = {styles.button1Container}
                                   />
                                   <Button
                                        onPress         = {this.handleResend.bind(this)}
                                        titleStyle      = {styles.buttonSignInText}
                                        title           = "Resend OTP"
                                        buttonStyle     = {styles.buttonSignUp}
                                        containerStyle  = {styles.button1Container}
                                   />
                              </View>
                              {this.state.resendLoading ?
                                   <Loading/>  
                                   :
                                    null
                              }
                         </View>
                    </View>

                    {/*----Sent OTP modal----*/}

                    <Modal isVisible={this.state.otpSentModal}  
                         onBackdropPress={() => this.setState({ otpSentModal: true })}
                         coverScreen={true}
                         hideModalContentWhileAnimating={true}
                         style={{paddingHorizontal:'5%',zIndex:999}}
                         animationOutTiming={500}>
                         <View style={{backgroundColor:"#fff",alignItems:'center',borderRadius:20,paddingVertical:30,paddingHorizontal:10}}>
                              <View style={{justifyContent:'center',backgroundColor:"#34be34",width:60,height:60,borderRadius:30,overflow:'hidden'}}>
                                   <Icon size={30} name='check' type='fontAwesome5' color='#fff' style={{}}/>
                              </View>
                              <Text style={{fontFamily:'Montserrat-Regular',fontSize:15,textAlign:'center',marginTop:20}}>
                                   OTP has been successfully sent to your Phone Number.
                              </Text>
                              <Text style={{fontFamily:'Montserrat-Regular',fontSize:15,textAlign:'center'}}>
                                   Enter OTP to verify
                              </Text>
                              <View style={{borderBottomRightRadius:500,marginTop:15,flexDirection:'row'}}>
                                   <Button
                                        onPress         = {()=>this.setState({otpSentModal:false})}
                                        titleStyle      = {styles.buttonText}
                                        title           = "OK"
                                        buttonStyle     = {{width:'100%',height:45,alignItems:'center',justifyContent:'center',borderRadius:50}}
                                        containerStyle  = {styles.buttonContainer}/>
                              </View>
                         </View>
                    </Modal>

                    {/*----incorrect otp modal----*/}

                    <Modal isVisible={this.state.incorrectOTP}  
                         onBackdropPress={() => this.setState({ incorrectOTP: false })}
                         coverScreen={true}
                         hideModalContentWhileAnimating={true}
                         style={{paddingHorizontal:'5%',zIndex:999}}
                         animationOutTiming={500}>
                         <View style={{backgroundColor:"#fff",alignItems:'center',borderRadius:20,paddingVertical:30,paddingHorizontal:10}}>
                              <View style={{justifyContent:'center',backgroundColor:"#f00",width:50,height:50,borderRadius:25,overflow:'hidden'}}>
                                   <Icon size={30} name='close' type='fontAwesome' color='#fff' style={{}}/>
                              </View>
                              <Text style={{fontFamily:'Montserrat-Regular',fontSize:15,textAlign:'center',marginTop:20}}>
                                   Please enter correct OTP.
                              </Text>
                              <View style={{borderBottomRightRadius:500,marginTop:15,flexDirection:'row'}}>
                                   <Button
                                        onPress         = {()=>this.setState({incorrectOTP:false})}
                                        titleStyle      = {styles.buttonText}
                                        title           = "OK"
                                        buttonStyle     = {{width:'100%',height:45,alignItems:'center',justifyContent:'center',borderRadius:50}}
                                        containerStyle  = {styles.buttonContainer}
                                   />
                              </View>
                         </View>
                    </Modal>

                    {/*----Resend otp modal----*/}

                    <Modal isVisible={this.state.resendOTP}  
                         onBackdropPress={() => this.setState({ resendOTP: false })}
                         coverScreen={true}
                         hideModalContentWhileAnimating={true}
                         style={{paddingHorizontal:'5%',zIndex:999}}
                         animationOutTiming={500}>
                         <View style={{backgroundColor:"#fff",alignItems:'center',borderRadius:20,paddingVertical:30,paddingHorizontal:10}}>
                              <View style={{justifyContent:'center',backgroundColor:"#34be34",width:50,height:50,borderRadius:25,overflow:'hidden'}}>
                                   <Icon size={30} name='check' type='fontAwesome' color='#fff' style={{}}/>
                              </View>
                              <Text style={{fontFamily:'Montserrat-Regular',fontSize:15,textAlign:'center',marginTop:20}}>
                                   OTP Resent successfully!
                              </Text>
                              <Text style={{fontFamily:'Montserrat-Regular',fontSize:15,textAlign:'center',marginTop:20}}>
                                   Please enter New OTP to verify
                              </Text>
                              <View style={{borderBottomRightRadius:500,marginTop:15,flexDirection:'row'}}>
                                   <Button
                                        onPress         = {()=>this.setState({resendOTP:false})}
                                        titleStyle      = {styles.buttonText}
                                        title           = "OK"
                                        buttonStyle     = {{width:'100%',height:45,alignItems:'center',justifyContent:'center',borderRadius:50}}
                                        containerStyle  = {styles.buttonContainer}
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