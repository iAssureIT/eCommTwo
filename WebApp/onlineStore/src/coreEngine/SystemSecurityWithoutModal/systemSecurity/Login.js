import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Link, location } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery';
import 'jquery-validation';
import swal from 'sweetalert';
import signInBackgroundImg from '../../sites/currentSite/images/signInBackground.png';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      btnLoading: false,
      loggedIn: false,
      auth: {
        email: '',
        pwd: '',
      },
      formerrors: {
				emailIDV: "",
			},
      messageData: {
        "type": "",
      }
    }
  }
  componentDidMount() {
    $.validator.addMethod("regxemail", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter a valid email address.");

    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
    $("#login").validate({
      rules: {
        loginusername: {
          required: true,
          regxemail: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        },
        loginpassword: {
          required: true
        }
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "loginusername") {
          error.insertAfter("#loginusername");
        }
        if (element.attr("name") === "loginpassword") {
          error.insertAfter("#loginpassword");
        }
      }
    });
  }
  componentWillReceiveProps(nextprops) {

  }
  userlogin(event) {
    event.preventDefault();
    var auth = {
      email: this.refs.loginusername.value,
      password: this.refs.loginpassword.value,
      role: "user"
    }
    if ($("#login").valid()) {
      // document.getElementById("logInBtn").value = 'Please Wait...';
      document.getElementById("logInBtn").value =
        this.setState({ btnLoading: true });
      axios.post('/api/auth/post/login', auth)
        .then((response) => {
          if (response.data.ID) {
            this.setState({ btnLoading: false });
            var userDetails = {
              firstName: response.data.userDetails.firstName,
              lastName: response.data.userDetails.lastName,
              email: response.data.userDetails.email,
              phone: response.data.userDetails.phone,
              pincode: response.data.userDetails.pincode,
              user_id: response.data.userDetails.user_id,
              roles: response.data.userDetails.roles,
              token: response.data.userDetails.token,
            }
            document.getElementById("logInBtn").value = 'Sign In';
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_ID", response.data.ID);
            localStorage.setItem("roles", response.data.roles);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));

            this.setState({
              loggedIn: true
            }, () => {
              this.props.history.push('/')
              window.location.reload();
            })
          } else if (response.data.message === "USER_BLOCK") {
            swal({
              text: "You are blocked by admin. Please contact Admin."
            });
            document.getElementById("logInBtn").value = 'Sign In';
          } else if (response.data.message === "NOT_REGISTER") {
            swal({
              text: "This Email ID is not registered. Please try again."
            });
            document.getElementById("logInBtn").value = 'Sign In';
          } else if (response.data.message === "INVALID_PASSWORD") {
            swal({
              text: "You have entered wrong password. Please try again."
            });
            document.getElementById("logInBtn").value = 'Sign In';
          } else if (response.data.message === "USER_UNVERIFIED") {
            swal({
              text: "You have not verified your account. Please verify your account."
            })
              .then((value) => {
                var emailText = {
                  "emailSubject": "Email Verification",
                  "emailContent": "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
                }
                axios.patch('/api/auth/patch/setsendemailotpusingEmail/' + this.refs.loginusername.value, emailText)
                  .then((response) => {
                    swal("We send you a Verification Code to your registered email. Please verify your account.");
                    this.props.history.push("/confirm-otp/" + response.data.userID);
                  })
                  .catch((error) => {
                    swal(" Failed to sent OTP");
                  })
              });
            document.getElementById("logInBtn").value = 'Sign In';

          }
        })
        .catch((error) => {
          console.log("error", error);
          swal({
            text: "Please enter valid Email ID and Password"
          })
          this.setState({ btnLoading: false });
          // document.getElementById("logInBtn").value = 'Sign In';
          // if (localStorage !== null) {
          // }
        });
    }
  }
  showSignPass() {
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('#loginpassword').attr('type', 'text');
  }
  hideSignPass() {
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('#loginpassword').attr('type', 'password');
  }
  Closepagealert(event) {
    event.preventDefault();
    $(".toast-error").html('');
    $(".toast-success").html('');
    $(".toast-info").html('');
    $(".toast-warning").html('');
    $(".toast-error").removeClass('toast');
    $(".toast-success").removeClass('toast');
    $(".toast-info").removeClass('toast');
    $(".toast-warning").removeClass('toast');
  }
  render() {
    //set dynamic background image
    var projectName = process.env.REACT_APP_PROJECT_NAME;

    // if (projectName === "4_UniMandai") {
    //   $(".LoginWrapper").css("background-image", "url(" + "/images/Background_3.png" + ")");
    // } else if (projectName === "2_AnasHandicraft") {
    //   $(".LoginWrapper").css("background-image", "url(" + "/images/background.png" + ")");
    // }

    return (
      <div style={{ 'height': window.innerHeight + 'px', 'width': window.innerWidth + 'px','background' : "url("+signInBackgroundImg +")" }} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LoginWrapper">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
        </div>
        {/* <div className="pull-right loginLeafimg">
        </div> */}
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-12 col-xs-12 formShadow">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xs-12">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
                <h3>Sign In</h3>
              </div>
              <form id="login" onSubmit={this.userlogin.bind(this)}>
                <div className="form-group frmhgt textAlignLeft col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mt25">
                  <label>Email ID</label><label className="astricsign">*</label>
                  <input type="email" className="form-control" ref="loginusername" id="loginusername" name="loginusername" placeholder="Email ID" required />
                  <span className="text-danger">{this.state.formerrors.emailIDV}</span> 
                </div>

                <div className="textAlignLeft frmhgt col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mb25">
                  <label>Password</label><label className="astricsign">*</label>
                  <input type="password" className="form-control" ref="loginpassword" name="loginpassword" id="loginpassword" placeholder="Password" required />
                  <div className="showHideSignDiv">
                    <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
                    <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
                  </div>
                </div>
                {/* {
                  process.env.REACT_APP_PROJECT_NAME === '2_AnasHandicrafts' ?
                
                <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 NOpaddingRight">
                  <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn loginBtn" value="Sign In" />
                </div>
                :
                 <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 NOpaddingRight">
                  <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn loginBtn_uni" value="Sign In" />
                </div>
                } */}

                {
                  this.state.btnLoading
                  ?
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 NOpaddingRight btn loginBtn_uni has-spinner active">
                      Processing...
                      <span className="spinner"><i className="fa fa-refresh fa-spin"></i></span>
                    </div>
                  :
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 NOpaddingRight">
                      <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn loginBtn_uni" value="Sign In" />
                    </div>
                }

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt30 mb25">
                  <div className="row">
                    <div className="textAlignLeft col-lg-6 col-md-6 col-sm-12 col-xs-12 mt10">
                      <div className="row loginforgotpass">
                        <a href='/forgotpassword' className="">Forgot Password?</a>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt10 textAlignRight">
                      <div className="row loginforgotpass">
                        <a href='/signup' className="">Sign Up</a>
                      </div>
                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state)=>{
//   console.log("state = ",state)
//   return {
//     userDetails   : state.userDetails,
//   }
// };


// const mapDispatchToProps = (dispatch)=>{
//   return {
//       setGlobalUser  : (userDetails)=> dispatch({
//                           type      : "SET_GLOBAL_USER",
//                           userDetails : userDetails,
//                         }),
//   }
// };



// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;