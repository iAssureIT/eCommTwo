import React, { Component } from 'react';
import $ from "jquery";
import jQuery from 'jquery';
import 'jquery-validation';
import PhoneInput from 'react-phone-input-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import 'font-awesome/css/font-awesome.min.css';
import './SignUp.css';
import swal from 'sweetalert';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators }     from 'redux';
import {getForm,updateForm} from '../actions/index';

import signInBackgroundImg from '../../sites/currentSite/images/background.png';
import Login from './Login.js';

class SignUp extends Component {

	constructor() {
		super();
		this.state = {
			checkUserExists: 0,
			btnLoading: false,
			loggedIn: false,
			auth: {
				firstname: '',
				lastname: '',
				mobNumber: '',
				email: '',
				pwd: '',
				signupPassword: '',
				role: ''
			},
			formerrors: {
				firstNameV: "",
				lastNameV: "",
				mobileV: "",
				emailIDV: "",
			},
			termsCondition: ["The price of products  is as quoted on the site from time to time.",
				"Price and delivery costs are liable to change at any time, but changes will not affect orders in respect of which we have already sent you a Despatch Confirmation.",
				"Products marked as 'non-returnable' on the product detail page cannot be returned.",
				"Products may not be eligible for return in some cases, including cases of buyer's remorse such as incorrect model or color of product ordered or incorrect product ordered."]
		}
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		var projectName = process.env.REACT_APP_PROJECT_NAME;


	}
	componentWillMount() {

	}
	validation() {
		$.validator.addMethod("regxfirstname", function (value, element, regexpr) {
			return regexpr.test(value);
		}, "Name should only contain letters.");
		$.validator.addMethod("regxEmail", function (value, element, regexpr) {
			return regexpr.test(value);
		}, "Please enter a valid email address.");
		$.validator.addMethod("regxpincode", function (value, element, regexpr) {
			return regexpr.test(value);
		}, "Please enter valid pincode.");

		jQuery.validator.setDefaults({
			debug: true,
			success: "valid"
		});

		$("#signUpUser").validate({
			rules: {
				firstname: {
					required: true,
					regxfirstname: /^[A-Za-z]*$/,
				},
				lastname: {
					required: true,
					regxfirstname: /^[A-Za-z]*$/,
				},
				signupEmail: {
					required: true,
					regxEmail: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
				},
				signupPassword: {
					required: true,
				},
				signupConfirmPassword: {
					required: true,
					equalTo: "#signupPassword"
				},
				idacceptcondition: {
					required: true,
				},
				pincode: {
					required: true,
					regxpincode: /^[1-9][0-9]{5}$/,
				}


			},
			messages: {
				signupConfirmPassword: "Password do not match"
			},
			errorPlacement: function (error, element) {
				if (element.attr("name") === "firstname") {
					error.insertAfter("#firstname");
				}
				if (element.attr("name") === "lastname") {
					error.insertAfter("#lastname");
				}
				if (element.attr("name") === "signupEmail") {
					error.insertAfter("#signupEmail");
				}
				if (element.attr("name") === "pincode") {
					error.insertAfter("#pincode");
				}
				if (element.attr("name") === "signupPassword") {
					error.insertAfter("#signupPassword");
				}
				if (element.attr("name") === "signupConfirmPassword") {
					error.insertAfter("#signupConfirmPassword");
				}
				if (element.attr("name") === "idacceptcondition") {
					error.insertAfter("#idacceptcondition");
				}

			}
		});
	}

	usersignup(event) {
		event.preventDefault();
		if ($("#signUpUser").valid()) {
			var auth = {
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				mobNumber: (this.state.mobNumber).replace("-", ""),
				pincode: this.state.pincode,
				email: this.state.signupEmail,
				username: this.state.signupEmail,
				pwd: this.state.signupPassword,
				role: 'user',
				status: 'active',
				"emailSubject": "Email Verification",
				"emailContent": "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
			}
			
			// document.getElementById("signUpBtn").innerHTML = 'Please Wait...';
			document.getElementById("signUpBtn").innerHTML = 
			this.setState({ btnLoading: true });
			var passwordVar = this.refs.signupPassword.value;
			var signupConfirmPasswordVar = this.refs.signupConfirmPassword.value;
			if (passwordVar === signupConfirmPasswordVar) {
				console.log("Before post Auth:==>",auth)
				return (passwordVar.length >= 6) ?
				
					(true,
						// document.getElementById("signUpBtn").innerHTML = 'Sign Up',
						
						axios.post('/api/auth/post/signup/user', auth)
							.then((response) => {
								
								if (response.data.message === 'USER_CREATED') {
									// console.log("user created:", response.data);
									var auth = {
										email: this.state.signupEmail,
										password: this.state.signupPassword,
										role: "user"
									}
									// console.log("Auth:", auth);
									axios.post('/api/auth/post/login', auth)
										.then((response) => {
											this.setState({ btnLoading: false });
											if (response) {
												var userDetails = {
													firstname	: response.data.userDetails.firstname,
													lastname	: response.data.userDetails.lastname,
													email		: response.data.userDetails.email,
													mobNumber		: response.data.userDetails.mobile,
													pincode		: response.data.userDetails.pincode,
													user_id		: response.data.userDetails.user_id,
													roles		: response.data.userDetails.roles,
													token		: response.data.userDetails.token,
												}
												var previousUrl = localStorage.getItem('previousUrl');
												if (previousUrl !== null) {
													// console.log("previousUrl=====", previousUrl);
													if (previousUrl.includes('com')) {
														var previousUrl_split = previousUrl.split('com');

													} else {
														var port = window.location.port;
														// console.log("Port======", port);
														var previousUrl_split = previousUrl.split(port);
													}
													console.log('pincode:',response.data.userDetails.pincode);												
													// localStorage.setItem("pincode", response.data.userDetails.pincode);
													localStorage.setItem("token", response.data.token);
													localStorage.setItem("user_ID", response.data.ID);
													localStorage.setItem("roles", response.data.roles);
													localStorage.setItem("pincode", response.data.pincode);
													localStorage.setItem('userDetails', JSON.stringify(userDetails));
													swal('Congratulations! You have been successfully Login, Now you can place your order.');
													window.location.reload();
													
													if (previousUrl === "/") {
														this.props.history.push("/");
													} else {														
														this.props.history.push(previousUrl_split[1]);
													}
												} else {	
													console.log('pincode:',response.data.userDetails.pincode);												
													localStorage.setItem("pincode", response.data.userDetails.pincode);
													localStorage.setItem("token", response.data.token);
													localStorage.setItem("user_ID", response.data.ID);
													localStorage.setItem("pincode", response.data.pincode);
													localStorage.setItem("roles", response.data.roles);
													localStorage.setItem('userDetails', JSON.stringify(userDetails));
													// this.props.history.push("/");
													swal('Congratulations! You have been successfully Login, Now you can place your order.')
													.then((success)=>{
														window.location.reload();
													});
													
												}
											}

										})
										.catch((error) => {
											console.log("Error:", error);
										})
									this.setState({
										loggedIn: true
									})

								} else {
									this.setState({ btnLoading: false });
									swal(response.data.message);
								}
							})
							.catch((error) => {
								console.log("Signup Error :", error);
							})
					)
					:
					(
						document.getElementById("signUpBtn").innerHTML = 'Sign Up',

						swal("Password should be at least 6 Characters Long, Please try again or create an Account.")

					)


			} else {
				// document.getElementById("signUpBtn").innerHTML = 'Sign Up';
				this.setState({ btnLoading: false });
				swal("Passwords does not match, Please Try Again.");
			}
		}

	} Closepagealert(event) {
		event.preventDefault();
		$(".toast-error").html('');
		$(".toast-success").html('');
		$(".toast-info").html('');
		$(".toast-warning").html('');
		$(".toast-error").removeclassName('toast');
		$(".toast-success").removeclassName('toast');
		$(".toast-info").removeclassName('toast');
		$(".toast-warning").removeclassName('toast');
	}

	checkUserExists(event) {
		if (event.target.value !== '') {
			axios.get('/get/checkUserExists/' + event.target.value)
				.then((response) => {

					if (response.data.length > 0) {
						$(".checkUserExistsError").show();
						$('.button3').attr('disabled', 'disabled');
						this.setState({ checkUserExists: 1 })

					} else {
						$(".checkUserExistsError").hide();
						$('.button3').removeAttr('disabled');
						this.setState({ checkUserExists: 0 })
					}
				})
				.catch(function (error) {
				})
		} else {
			$(".checkUserExistsError").hide();
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	acceptcondition(event) {
		var conditionaccept = event.target.value;
		if (conditionaccept === "acceptedconditions") {
			$(".acceptinput").removeAttr('disabled');
		} else {
			$(".acceptinput").addAttr('disabled');
		}
	}

	showModal() {
		$(".modalbg").css("display", "block");
	}
	hideModal() {
		$(".modalbg").css("display", "none");
	}
	componentDidMount() {
		this.validation();
		$(".checkUserExistsError").hide();
	}
	//working
	showSignUpPass() {
		$('.showPwd').toggleclassName('showPwd1');
		$('.hidePwd').toggleclassName('hidePwd1');
		return $('#signupPassword').attr('type', 'text');
	}
	hideSignUpPass() {
		$('.showPwd').toggleclassName('showPwd1');
		$('.hidePwd').toggleclassName('hidePwd1');
		return $('#signupPassword').attr('type', 'password');
	}
	openSignInModal(event){
		event.preventDefault();
		this.props.updateFormValue("login");	
	}
	render() {		
		return (
			    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
			    <img src={signInBackgroundImg}style={{height: "338px"}, {width: "1335px"}}/>
			     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			      <div className="col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-12 col-xs-12 formShadow1">
			       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xs-12">
			        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
			         <h3>Sign In</h3>
			          </div>
			          <form id="login" novalidate="novalidate">
			           <div className="form-group textAlignLeft col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mt25"><label>Email ID</label>
			            <label className="astricsign">*</label>
			             <input type="email" className="form-control" id="loginusername" name="loginusername" placeholder="Email ID" required=""/>
			            </div>
			            <div className="textAlignLeft col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mb25"><label>Password</label>
			             <label className="astricsign">*</label>
			              <input type="password" className="form-control" name="loginpassword" id="loginpassword" placeholder="Password" required=""/>
			              <div className="showHideSignDiv">
			               <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true"></i>
			               <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true"></i>
			              </div>
			              </div>
			             <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 NOpaddingRight">
			              <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn loginBtn" value="Sign In"/>
			             </div>
			             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt30 mb25">
			              <div className="row">
			             <div className="textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10">
			              <div className="row loginforgotpass">
			               <a href="/forgotpassword" className="">Forgot Password?</a>
			              </div>
			             </div>
			             <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mt10 textAlignRight">
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

const mapStateToProps = (state) => {
	return {
	  formToShow     : state.formToShow,
  
	}
  }
  
  const mapDispachToProps = (dispatch) => {
	return  bindActionCreators({formToShow :getForm, updateFormValue: updateForm}, dispatch)
  }

  export default connect(mapStateToProps, mapDispachToProps)(SignUp);
// export default SignUp;