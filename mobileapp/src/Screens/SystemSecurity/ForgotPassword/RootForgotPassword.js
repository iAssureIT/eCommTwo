import React from 'react';
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import ValidationComponent from "react-native-form-validator";
import axios from "axios";
import styles from '../../../AppDesigns/currentApp/styles/ScreenStyles/ForgotPasswordStyles.js';
import { colors, sizes } from '../../../AppDesigns/currentApp/styles/CommonStyles.js';
import Modal from "../../Modal/OpenModal.js";
import { Fumi } from 'react-native-textinput-effects';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

class RootForgotPassword extends ValidationComponent {
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
    // var formValues = {
    //   "emailSubject" : "Forgot Password",
    //   "emailContent"  : "Use code to reset your password",
    // }
    axios.patch('/api/auth/patch/setsendemailotpusingEmail/' + this.state.email)
      .then(response => {
        this.setState({ btnLoading: false })
        if (response.data.message == 'OTP_UPDATED') {
          // var messageHead = "OTP Resend successfully!";
          // var messagesSubHead = "Please enter New OTP to verify";
          
          // this.props.openModal(true,messageHead, messagesSubHead,"success");
          // =================== Notification OTP ==================
          axios.get('/api/ecommusers/' + response.data.userID)
            .then((res) => {
              // console.log("res.data.image==>", res.data);
              this.setState({
                fullName: res.data.profile.fullName,
                userid:response.data._id
              }, () => {
                var sendData = {
                  "event": "5",
                  "toUser_id": response.data.userID,
                  "toUserRole": "user",
                  "variables": {
                    "Username": this.state.fullName,
                    "OTP": response.data.optEmail,
                  }
                }
                console.log('sendDataToUser==>', sendData)
                axios.post('/api/masternotifications/post/sendNotification', sendData)
                  .then((res) => {
                    
                    console.log('sendDataToUser in result==>>>', res.data)
                  })
                  .catch((error) => { console.log('notification error: ', error) })
              })
              this.props.setUserID(response.data.userID);
              this.props.navigation('ForgotPasswordOTP');

            })
            .catch((error) => {
              console.log('error', error)
            });

          // =================== Notification ==================

        } else {
          this.setState({ email: "" })
          var messageHead = response.data.message;
          var messagesSubHead = "";
          this.props.openModal(true, messageHead, messagesSubHead, "warning");
        }
      })
      .catch(error => {
        if (error.response.status == 401) {
          this.setState({ btnLoading: false })
        }
      })

  }

  handleMobileChange(value) {
    if (value.startsWith && value.startsWith('+')) {
      value = value.substr(3);
    }
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    console.log("x value = ", x);
    let y = x.input ? (!x[2] && !x[3]) ? '+91 ' + x[1] : (!x[3] ? '+91 ' + x[1] + '-' + x[2] : '+91 ' + x[1] + '-' + x[2] + '-' + x[3]) : '';
    this.setState({
      mobileNumber: y,
    });
  }

  render() {
    const { navigate, dispatch, goBack } = this.props.navigation;
    const { navigation } = this.props;

    return (
      <View>
        <View style={{ width: '100%' }}>
          <View style={styles.textTitleWrapper}><Text style={styles.fptitle}>Forgot Password</Text></View>
          <View style={{ paddingHorizontal: 30 }}><Text style={styles.fpsubtitle}>Please enter email id</Text></View>
          <View style={styles.formWrapper}>
            <View style={[styles.formInputView, styles.marginBottom30]}>
              <Fumi
                label={'Email'}
                onChangeText={(email) => { this.setState({ email }, () => { this.validInputField('email', 'emailError'); }) }}
                value={this.state.email}
                keyboardType="email-address"
                autoCapitalize='none'
                iconClass={MaterialCommunityIcons}
                iconName={'lock'}
                iconColor={colors.inputText}
                iconSize={22}
                iconWidth={40}
                inputPadding={16}
                style={styles.fpemail}
              />
              {this.displayValidationError('emailError')}
            </View>


            <View style={{ paddingHorizontal: 15 }}>
              {this.state.btnLoading
                ?
                <ActivityIndicator size="large" color="#80c21c" />
                :
                <Button
                  onPress={this.handleSendOtp}
                  titleStyle={styles.buttonText}
                  title="Send OTP"
                  buttonStyle={styles.button}
                  containerStyle={styles.buttonContainer}
                />

              }
            </View>
            <Button
              onPress={() => this.props.navigation("Login")}
              titleStyle={styles.buttonText1}
              title="Sign In"
              buttonStyle={styles.button1}
              containerStyle={styles.buttonContainer1}
              icon={
                <Icon name="chevron-double-left" type="material-community" size={22} color="#666" style={{}} />
              }
            />

          </View>
        </View>
        {this.props.openModal ?
          <Modal navigation={navigation} />
          :
          null
        }
      </View>
    );

  }
}

RootForgotPassword.defaultProps = {
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

const mapStateToProps = (state) => {
  return {
    user_id: state.user_id,
  }

};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserID: (user_id) => dispatch({
      type: "SET_USER_ID",
      user_id: user_id,
    }),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(RootForgotPassword);