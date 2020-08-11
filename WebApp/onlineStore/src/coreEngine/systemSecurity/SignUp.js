import React, { Component } from 'react';
import $ from "jquery";
import jQuery from 'jquery';
import 'jquery-validation';
import PhoneInput from 'react-phone-input-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import 'font-awesome/css/font-awesome.min.css';
// import './SignUp.css';
import '../../sites/currentSite/common/SignUp.css'
import swal from 'sweetalert';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators }     from 'redux';
import {getForm,updateForm} from '../actions/index';

import signInBackgroundImg from '../../sites/currentSite/images/signInBackground.png';
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
		$.validator.addMethod("regxmobNumber", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid mobile number.");

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
				mobNumber: {
                    regxmobNumber: /^([7-9][0-9]{9})$/,
                    required: true,
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
				if (element.attr("name") === "mobNumber") {
					error.insertAfter("#mobNumber");
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
				// console.log("Before post Auth:==>",auth)
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
												//send notification to user
												var sendData = {
													"event": "1",
													"toUser_id": response.data._id,
													"toUserRole":"user",
													"variables": {
													"Username" : response.data.userDetails.fullName,
													}
												}
													console.log('sendDataToUser==>', sendData)
													axios.post('/api/masternotifications/post/sendNotification', sendData)
													.then((res) => {
													console.log('sendDataToUser in result==>>>', res.data)
													})
													.catch((error) => { console.log('notification error: ',error)})

													
												var userDetails = {
													firstname	: response.data.userDetails.firstname,
													lastname	: response.data.userDetails.lastname,
													email		: response.data.userDetails.email,
													mobNumber   : response.data.userDetails.mobile,
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
													// console.log('pincode:',response.data.userDetails.pincode);												
													// localStorage.setItem("pincode", response.data.userDetails.pincode);
													localStorage.setItem("token", response.data.token);
													localStorage.setItem("user_ID", response.data.ID);
													localStorage.setItem("roles", response.data.roles);
													// localStorage.setItem("pincode", response.data.pincode);
													localStorage.setItem('userDetails', JSON.stringify(userDetails));
													swal('Congratulations! You have been successfully Login, Now you can place your order.');
													window.location.reload();
													
													if (previousUrl === "/") {
														this.props.history.push("/");
													} else {														
														this.props.history.push(previousUrl_split[1]);
													}
												} else {	
													// console.log('pincode:',response.data.userDetails.pincode);												
													// localStorage.setItem("pincode", response.data.userDetails.pincode);
													localStorage.setItem("token", response.data.token);
													localStorage.setItem("user_ID", response.data.ID);													
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
		$(".toast-error").removeClass('toast');
		$(".toast-success").removeClass('toast');
		$(".toast-info").removeClass('toast');
		$(".toast-warning").removeClass('toast');
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
		$('.showPwd').toggleClass('showPwd1');
		$('.hidePwd').toggleClass('hidePwd1');
		return $('#signupPassword').attr('type', 'text');
	}
	hideSignUpPass() {
		$('.showPwd').toggleClass('showPwd1');
		$('.hidePwd').toggleClass('hidePwd1');
		return $('#signupPassword').attr('type', 'password');
	}
	openSignInModal(event){
		event.preventDefault();
		this.props.updateFormValue("login");
		$("#pageOpacity").show();
      	$('#loginFormModal').show();	
	}
	render() {		
		return (
			// <div style={{ 'height': window.innerHeight + 'px', 'width': window.innerWidth + 'px','background' : "url("+signInBackgroundImg +")" }} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LoginWrapper">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
							<h3>Sign Up</h3>
						</div>
						<form id="signUpUser">
							<div className="form-group frmhgt textAlignLeft col-lg-6 col-md-6 col-sm-12 col-xs-12">
								<label>First Name</label><label className="astricsign">*</label>
								<input type="text" maxLength="25" className="form-control" id="firstname" ref="firstname" name="firstname" placeholder="" onChange={this.handleChange} data-text="firstNameV" />
								{this.state.formerrors.firstNameV  && (
				                        <span className="text-danger">{this.state.formerrors.firstNameV}</span> 
				                      )}
							</div>
							<div className="form-group frmhgt textAlignLeft col-lg-6 col-md-6 col-sm-12 col-xs-12">
								<label>Last Name</label><label className="astricsign">*</label>
								<input type="text" maxLength="25" className="form-control" id="lastname" ref="lastname" name="lastname" placeholder="" onChange={this.handleChange} data-text="lastNameV" />
								{this.state.formerrors.lastNameV  && (
									<span className="text-danger">{this.state.formerrors.lastNameV}</span> 
								)}
							</div>
							<div className="form-group frmhgt textAlignLeft col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15">
								<label>Email ID</label><label className="astricsign">*</label>
								<input type="email" className="form-control" id="signupEmail" ref="signupEmail" name="signupEmail" placeholder="" onChange={this.handleChange} data-text="emailIDV" />
								<label className="checkUserExistsError">User already exists!!!</label>
								{this.state.formerrors.emailIDV  && (
									<span className="text-danger">{this.state.formerrors.emailIDV}</span> 
								)}
							</div>
							<div className="form-group frmhgt textAlignLeft col-lg-6 col-md-12 col-sm-12 col-xs-12 mt15">
								<label>Mobile Number</label><label className="astricsign">*</label>                         
                                <input maxLength="10" placeholder="" type="text" ref="mobNumber" name="mobNumber" id="mobNumber" value={this.state.mobNumber} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" />                                     
                    
								{/* <PhoneInput
									country={'in'}
									value={this.state.mobNumber}
									name="mobNumber"
									inputProps={{
										name: 'mobNumber',
										required: true
									}}
									onChange={mobNumber => { this.setState({ mobNumber }) }}
								/> */}
							</div>
							<div className="form-group frmhgt textAlignLeft col-lg-6 col-md-12 col-sm-12 col-xs-12 mt15">
								<label>Pincode</label><label className="astricsign">*</label>
								<input minLength="6" maxLength="6" type="text" className="form-control" id="pincode" ref="pincode" placeholder="" name="pincode" onChange={this.handleChange} />
							</div>


							<div className="form-group frmhgt textAlignLeft col-lg-6 col-md-12 col-sm-12 col-xs-12 mt15">
								<label>Password</label><label className="astricsign">*</label>
								<input minLength="6" type="password" className="form-control" id="signupPassword" ref="signupPassword" placeholder="" name="signupPassword" onChange={this.handleChange} />
								<div className="showHideSignDiv">
									<i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showSignUpPass.bind(this)}></i>
									<i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideSignUpPass.bind(this)}></i>
								</div>
							</div>
							<div className="form-group frmhgt textAlignLeft col-lg-6 col-md-12 col-sm-12 col-xs-12 mt15">
								<label>Confirm Password</label><label className="astricsign">*</label>
								<input minLength="6" type="password" className="form-control" id="signupConfirmPassword" ref="signupConfirmPassword" placeholder="" name="signupConfirmPassword" />
							</div>
							{/* <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 mt15">
								<button id="signUpBtn" onClick={this.usersignup.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  btn loginBtn loginBtn_uni">Sign Up</button>
							</div> */}
							{
								this.state.btnLoading
									?
									<div className="col-lg-3 col-lg-offset-4 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 NOpaddingRight ">
										<div align="center" className="cssload-fond">
											<div className="cssload-container-general">
												<div className="cssload-internal"><div className="cssload-ballcolor cssload-ball_1"> </div></div>
												<div className="cssload-internal"><div className="cssload-ballcolor cssload-ball_2"> </div></div>
												<div className="cssload-internal"><div className="cssload-ballcolor cssload-ball_3"> </div></div>
												<div className="cssload-internal"><div className="cssload-ballcolor cssload-ball_4"> </div></div>
											</div>
										</div>
									</div>
									:
									<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 mt15">
									<button id="signUpBtn" onClick={this.usersignup.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  btn loginBtn loginBtn_uni">Sign Up</button>
								</div>
							}
							<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 text-center loginforgotpass signuplink mt25">
								<label>Already have an account?</label> &nbsp; <a href='' onClick={this.openSignInModal.bind(this)}>Sign In <b>&#8702;</b></a>
								{/* login modal  */}
                                  <div id="loginFormModal" className="modal in">
                                    <div className="modal-dialog">
                                        <div className="modal-content loginModalContent" >                            
                                            <div className="modal-body">   
                                            <button type="button" className="close"  data-dismiss="modal" aria-hidden="true" >&times;</button>                                                            
                                                <div className="col-lg-12 col-md-12 loginForm">
                                                    {/* <Login /> */}
                                                </div>                                                                   
                                            </div>
                                        </div>
                                    </div>
                                </div> 
							</div>
						</form>
						{/* <div className="modal" id="myModal" role="dialog">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<img src="../../../sites/currentSite/images/Icon.png" />
										<button type="button" className="close modalclosebut" data-dismiss="modal">&times;</button>
										<h2 className="modaltext modalheadingcont">TERMS AND CONDITIONS</h2>
									</div>
									<div className="modal-body">
										<ul>
											{
												this.state.termsCondition && this.state.termsCondition.length > 0 ?
													this.state.termsCondition.map((data, index) => {
														return (
															<li>{data}</li>
														);
													})
													:
													null
											}
										</ul>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div> */}
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