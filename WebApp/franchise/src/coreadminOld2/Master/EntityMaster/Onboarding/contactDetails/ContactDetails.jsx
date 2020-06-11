import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import PhoneInput from 'react-phone-input-2';
import { withRouter } from 'react-router-dom';
class ContactDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'branchCode'        		: '',
			'firstName'         		: '',
			'lastName'          		: '',
			'phone'             		: '',
			'altPhone'         	 		: '',
			'email'             		: '',
			'department'        		: '',
			'designation'       		: '',
			'employeeID'        		: '',
			'openForm'					: false,
			'bookingApprovalRequired' 	: false,
			'createUser' 				: false,
			"pathname"					: this.props.entity,
			'entityID'					: this.props.match.params ? this.props.match.params.entityID : '',
			'contactID'					: this.props.match.params ? this.props.match.params.contactID : '',
		};
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.edit();
	}
	openForm() {
		this.setState({
			openForm: this.state.openForm === false ? true : false
		},()=>{
			if(this.state.openForm === true){
				this.validation();
			}
		})
		
	}
	componentDidMount() {
		window.scrollTo(0, 0);
		this.getDesignation();
		this.getDepartment();
		this.getBranchCode();
		this.contactDetails();
		this.edit();
	}
	getDesignation() {
		axios.get("/api/designationmaster/get/list")
		  .then((response) => {
			this.setState({
			  designationArray: response.data
			})
		  })
		  .catch((error) => {
		  })
	}
	getDepartment() {
	axios.get("/api/departmentmaster/get/list")
		.then((response) => {
		this.setState({
			departmentArray: response.data
		})
		})
		.catch((error) => {
		})
	}
	validation(){
		$.validator.addMethod("depRegx", function (value, element, arg) {
			return arg !== value;
		}, "Please enter valid department name");
		$.validator.addMethod("desRegx", function (value, element, arg) {
			return arg !== value;
		}, "Please enter valid designation");
		$.validator.addMethod("firstRegx", function (value, element, regexpr) {
			return regexpr.test(value);
		}, "Please enter valid first name");
		$.validator.addMethod("lastRegx", function (value, element, regexpr) {
			return regexpr.test(value);
		}, "Please enter valid last name");
		$.validator.addMethod("approvingRegx", function (value, element, regexpr) {
			return regexpr.test(value);
		}, "Please enter valid approving authority ID");
		$.validator.addMethod("regxEmail", function (value, element, regexpr) {
			return regexpr.test(value);
	  }   , "Please enter a valid email address.");
		$.validator.addMethod("regxBranchCode", function (value, element, arg) {
			return arg !== value;
		}, "Please select the branch code");
		jQuery.validator.setDefaults({
			debug: true,
			success: "valid"
		});
		$("#ContactDetail").validate({
			rules: {
				branchCode: {
					required: true,
					regxBranchCode: "--Select Branch Code--"
				},
				department: {
					required: true,
					depRegx: "--Select Department--"
				},
				designation: {
					required: true,
					desRegx: "--Select Designation--"
				},
				email: {
					required: true,
					regxEmail: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
				},
				firstName: {
					required: true,
					firstRegx: /^[a-zA-Z\s]+$/,
				},
				lastName: {
					required: true,
					lastRegx: /^[a-zA-Z\s]+$/,
				},
				approvingAuthorityId: {
					required: true,
					approvingRegx: /^[A-Za-z0-9][A-Za-z0-9\-\s]/,
				},
				preApprovedAmount: {
					required: true,
				},
			},
			errorPlacement: function (error, element) {
				if (element.attr("name") === "branchCode") {
					error.insertAfter("#branchCode");
				}
				if (element.attr("name") === "department") {
					error.insertAfter("#department");
				}
				if (element.attr("name") === "designation") {
					error.insertAfter("#designation");
				}
				if (element.attr("name") === "email") {
					error.insertAfter("#email");
				}
				if (element.attr("name") === "firstName") {
					error.insertAfter("#firstName");
				}
				if (element.attr("name") === "lastName") {
					error.insertAfter("#lastName");
				}
				if (element.attr("name") === "approvingAuthorityId") {
					error.insertAfter("#approvingAuthorityId");
				}
				if (element.attr("name") === "preApprovedAmount") {
					error.insertAfter("#preApprovedAmount");
				}
			}
		});
	}
	keyPress = (e) => {
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			(e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
			(e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if (((e.keyCode < 65 || e.keyCode > 91)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode === 190 || e.keyCode === 46)) {
			e.preventDefault();
		}
	}
	keyPressNumber = (e) => {
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 189]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			(e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
			(e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 58)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode === 190 || e.keyCode === 46)) {
			e.preventDefault();
		}
	}
	handleChange(event) {
		const target = event.target;
		const name = target.name;

		this.setState({
			[name]: event.target.value
		});
	}
	locationdetailBack(event) {
		event.preventDefault();
		var entityID = this.props.match.params.entityID;
		if (this.state.openForm === true) {
			swal({
				// title: "abc",
				text: "It seem that you are trying to enter a contact details. Click 'Cancel' to continue entering contact details. Click 'Ok' to go to next page. But you may lose values already entered in the contact detail form",
				// type: "warning",
				buttons: {
					cancel: {
						text: "Cancel",
						value: false,
						visible: true,
						className: "CancelButtonSwal"
					},
					confirm: {
						text: "OK",
						value: true,
						visible: true,
						className: "OkButtonSwal",
						closeModal: true
					}
				},
			})
			.then((value) => {
				if(value){
					this.props.history.push("/"+this.state.pathname+"/location-details/" + entityID);
				}else{
					this.props.history.push("/"+this.state.pathname+"/contact-details/" + entityID);
				}
			})
			$(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
			$(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');
		} else {
			this.props.history.push("/"+this.state.pathname+"/location-details/" + entityID);
		}
	}
	contactdetailBtn(event) {
		event.preventDefault();
		var entityID = this.props.match.params.entityID;
		if (this.state.openForm === true) {
			swal({
				// title: "abc",
				text: "It seem that you are trying to enter a contact details. Click 'Cancel' to continue entering contact details. Click 'Ok' to go to next page. But you may lose values already entered in the contact detail form",
				// type: "warning",
				buttons: {
					cancel: {
						text: "Cancel",
						value: false,
						visible: true,
						className: "CancelButtonSwal"
					},
					confirm: {
						text: "OK",
						value: true,
						visible: true,
						className: "OkButtonSwal",
						closeModal: true
					}
				},
			})
				.then((value) => {
					if(value){
						this.props.history.push("/"+this.state.pathname+"/list");
					}else{
						this.props.history.push("/"+this.state.pathname+"/contact-details/" + entityID);
					}
				})
			$(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
			$(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');
		} else {
			this.props.history.push("/"+this.state.pathname+"/list");
		}
	}
	contactdetailAddBtn(event) {
		event.preventDefault();
		
		var entityID = this.props.match.params.entityID;
			var formValues = {
				'entityID' 						: entityID,
				'contactDetails' 				: {
					'branchCode'        		: this.state.branchCode,
					'firstName'               	: this.state.firstName,
					'lastName'                	: this.state.lastName,
					'phone'             		: this.state.phone,
					'altPhone'          		: this.state.altPhone,
					'email'             		: this.state.email,
					'department'        		: this.state.department,
					'designation'       		: this.state.designation,
					'employeeID'        		: this.state.employeeID,
					'bookingApprovalRequired' 	: this.state.bookingApprovalRequired,
					'approvingAuthorityId' 		: this.state.bookingApprovalRequired ? this.state.approvingAuthorityId : "",
					'preApprovedAmount' 		: this.state.bookingApprovalRequired ? this.state.preApprovedAmount : "",
					'createUser'        		: this.state.createUser,
                    'addEmployee'       		: this.state.addEmployee,
				}
			}
			const main = async()=>{
				if ($('#ContactDetail').valid()) {
					if(this.state.createUser === true){
						formValues.contactDetails.userID = await this.createUser();
						formValues.contactDetails.personID = await this.savePerson(formValues.contactDetails.userID);
					}
					this.saveContact(formValues);
				} else {
					$(event.target).parent().parent().find('.inputText.error:first').focus();
				}
			}
			
			main();
	}
	createUser = ()=>{
		var userDetails = {
			firstname			: this.state.firstName,
			lastname			: this.state.lastName,
			mobile				: this.state.phone,
			email				: this.state.email,
			pwd					: "fivebees123",
			role				: this.state.pathname,
			status				: 'active',
			"emailSubject"		: "Email Verification",
			"emailContent"		: "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
		}
		return new Promise(function(resolve, reject){
			axios.post('/api/auth/post/signup/user', userDetails)
			.then((response)=>{
				if(response.data.message =='USER_CREATED'){
					resolve(response.data.ID);
					// formValues.contactDetails.userID = ID;
					// this.saveContact(formValues);
				}else{
					swal(response.data.message);
				}
				
			})
			.catch((error)=>{})
		})
	}

	savePerson = (userID)=>{
		var userDetails = {
			type                    : 'employee',
			firstName               : this.state.firstName,
			middleName              : "",
			lastName                : this.state.lastName,
			DOB                     : "",
			gender                  : "",
			contactNo               : this.state.phone,
			altContactNo            : this.state.altPhone,
			email                   : this.state.email,
			whatsappNo              : "",
			departmentId            : this.state.department,
			designationId           : this.state.designation,
			profilePhoto            : this.state.profilePhoto,
			employeeId              : this.state.employeeID,
			userId 					: userID,
			bookingApprovalRequired : this.state.bookingApprovalRequired,
			approvingAuthorityId    : this.state.bookingApprovalRequired ? this.state.approvingAuthorityId : "",
		  }
		  return new Promise(function(resolve, reject){
			axios.post('/api/personmaster/post' ,userDetails)
			.then((response) => {
				resolve(response.data.PersonId);
			})
			.catch((error) => {})
		  })
	}

	saveContact = (formValues)=>{
		axios.patch('/api/entitymaster/patch/addContact' ,formValues)
		.then((response) => {
				this.contactDetails();
				swal({
					title : "Contact added successfully.",
					text : this.state.createUser ? "Login credentials created and emailed to user. \n LoginID : "+this.state.email+" \n Password : fivebees123 \n Contact also added in employee list." : ""
				});

				this.setState({
					'branchCode'        		: '',
					'firstName'               	: '',
					'lastName'                	: '',
					'phone'            		 	: '',
					'altPhone'          		: '',
					'email'             		: '',
					'department'        		: '',
					'designation'       		: '',
					'employeeID'        		: '',
					'bookingApprovalRequired' 	: false,
					'createUser' 				: false,
					'addEmployee'				: false,
					'approvingAuthorityId' 		: '',
					'preApprovedAmount' 		: '',
					'openForm'					: false,
				})
				
			})
			.catch((error) => {
			
			})
	}
	
	
	getBranchCode() {
		var entityID = this.state.entityID;
		axios.get('/api/entitymaster/get/one/' + entityID)
			.then((response) => {
				this.setState({
					branchCodeArry: response.data.locations
				})
			})
			.catch((error) => {
				
			})
	}
	updatecontactdetailAddBtn(event) {
		event.preventDefault();
		var entityID = this.state.entityID;
		var contactID = this.state.contactID;

		
			var formValues = {
				'entityID' 			: entityID,
				'contactID' 		: contactID,
				'contactDetails' 				: {
					'branchCode'        		: this.state.branchCode,
					'firstName'               	: this.state.firstName,
					'lastName'                	: this.state.lastName,
					'phone'             		: this.state.phone,
					'altPhone'          		: this.state.altPhone,
					'email'             		: this.state.email,
					'department'        		: this.state.department,
					'designation'       		: this.state.designation,
					'employeeID'        		: this.state.employeeID,
					'bookingApprovalRequired' 	: this.state.bookingApprovalRequired,
					'approvingAuthorityId' 		: this.state.bookingApprovalRequired ? this.state.approvingAuthorityId : "",
					'preApprovedAmount' 		: this.state.bookingApprovalRequired ? this.state.preApprovedAmount : "",
					'createUser'        		: this.state.createUser,
                    'addEmployee'       		: this.state.addEmployee,
				}
			}
			const main = async()=>{
				if ($('#ContactDetail').valid()) {
					if(this.state.alreadyHasUser === true){
						this.updateUser();
						this.updatePerson();
					}else if(this.state.createUser === true){
						formValues.contactDetails.userID = await this.createUser();
						formValues.contactDetails.personID = await this.savePerson();
					}
					this. updateContact(formValues);
				}
			}
			main();
		
	}
	updateUser = ()=>{
		var userDetails = {
			firstname			: this.state.firstName,
			lastname			: this.state.lastName,
			mobile				: this.state.phone,
			email				: this.state.email,
			pwd					: "fivebees123",
			role				: this.state.pathname,
			status				: 'active',
			"emailSubject"		: "Email Verification",
			"emailContent"		: "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
		}
		var userid = this.state.userID;
		axios.patch('/api/users/patch/' + userid, userDetails)
		.then((response)=>{
			if(response.data.message =='USER_CREATED'){
			}else{
				swal(response.data.message);
			}
			
		})
		.catch((error)=>{})
	}
	updatePerson = ()=>{
		var userDetails = {
			personID        		: this.state.personID,
			type                    : 'employee',
			firstName               : this.state.firstName,
			middleName              : "",
			lastName                : this.state.lastName,
			DOB                     : "",
			gender                  : "",
			contactNo               : this.state.phone,
			altContactNo            : this.state.altPhone,
			email                   : this.state.email,
			whatsappNo              : "",
			departmentId            : this.state.department,
			designationId           : this.state.designation,
			profilePhoto            : this.state.profilePhoto,
			employeeId              : this.state.employeeID,
			bookingApprovalRequired : this.state.bookingApprovalRequired,
			approvingAuthorityId    : this.state.bookingApprovalRequired ? this.state.approvingAuthorityId : "",
		  }
			axios.patch('/api/personmaster/patch' ,userDetails)
			.then((response) => {
				
			})
			.catch((error) => {})
		  
	}
	updateContact = (formValues)=>{
		axios.patch('/api/entitymaster/patch/updateSingleContact', formValues)
		.then((response) => {
			this.setState({
				'branchCode'        		: '',
				'firstName'               	: '',
				'lastName'                	: '',
				'phone'            		 	: '',
				'altPhone'          		: '',
				'email'             		: '',
				'department'        		: '',
				'designation'       		: '',
				'employeeID'        		: '',
				'bookingApprovalRequired' 	: false,
				'createUser' 				: false,
				'addEmployee'				: false,
				'approvingAuthorityId' 		: '',
				'preApprovedAmount' 		: '',
				'openForm'					: false,
			})
			this.contactDetails();
			this.props.history.push('/corporate/contact-details/'+this.props.match.params.entityID);
			swal("Contact updated successfully.");
		})
		.catch((error) => {
			
		})
	}
	edit() {
		var entityID = this.state.entityID;
		var contactID = this.state.contactID;
		var formValues = {
			entityID : entityID,
			contactID :  contactID
		}
		if (entityID && contactID) {
			
			axios.post('/api/entitymaster/post/singleContact', formValues)
				.then((response) => {
					var x = response.data.contactPersons;
					var contactDetails = x.filter(a => a._id === contactID);
					this.setState({
						'openForm'					: true,
						'branchCode'        		: contactDetails[0].branchCode,
						'firstName'               	: contactDetails[0].firstName,
						'lastName'                	: contactDetails[0].lastName,
						'phone'             		: contactDetails[0].phone,
						'altPhone'          		: contactDetails[0].altPhone,
						'email'             		: contactDetails[0].email,
						'department'        		: contactDetails[0].department,
						'designation'       		: contactDetails[0].designation,
						'employeeID'        		: contactDetails[0].employeeID,
						'bookingApprovalRequired' 	: contactDetails[0].bookingApprovalRequired,
						'approvingAuthorityId'    	: contactDetails[0].approvingAuthorityId,
						'preApprovedAmount' 		: contactDetails[0].preApprovedAmount,
						'createUser'        		: contactDetails[0].createUser,
						'addEmployee'       		: contactDetails[0].addEmployee,
						'userID' 					: contactDetails[0].userID,
						'personID' 					: contactDetails[0].personID,

						'alreadyHasUser' 			: contactDetails[0].createUser,
						'alreadyHasEmployee' 		: contactDetails[0].addEmployee,
					},()=>{
						if(this.state.openForm === true){
							this.validation();
							$('#email').attr('disabled','true');
						}
						if(this.state.createUser === true){
							$('#createUser').attr('disabled','true');
						}
						if(this.state.addEmployee === true){
							$('#addEmployee').attr('disabled','true');
						}
					})
				})
				.catch((error) => {
					
				})
		}
	}
	contactDelete(event) {
		event.preventDefault();
		var entityID = this.state.entityID;
		var locationID = event.target.id;

		var formValues = {
			entityID: entityID,
			location_ID: locationID
		}
		axios.delete('/api/entitymaster/deleteContact/' + entityID + "/" + locationID, formValues)
			.then((response) => {
				this.setState({
					'openForm'			: false,
					'contactID' 		: '',
					'branchCode'        : '',
					'firstName'         : '',
					'lastName'          : '',
					'phone'             : '',
					'altPhone'          : '',
					'email'             : '',
					'department'        : '',
					'designation'       : '',
					'employeeID'        : '',
				})
				this.contactDetails();
				this.props.history.push('/'+this.state.pathname+'/contact-details/' + entityID);
				swal("Contact deleted successfully.");
			})
			.catch((error) => {
				
			})
	}
	contactDetails() {
		axios.get('/api/entitymaster/get/one/' + this.props.match.params.entityID)
			.then((response) => {

				this.setState({
					contactarray: response.data.contactPersons
				})
			})
			.catch((error) => {
				
			})
	}
	toggle(event){
		this.setState({
		  [event.target.name] : event.target.checked
		})
	}
	bookingApproval(val,event) {
		this.setState({
			bookingApprovalRequired : val
		})
	}
	loginCredentials(val,event) {
		event.preventDefault();
		this.setState({
			createUser : val
		})
	}
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
						<section className="content">
							<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
									<h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">{this.state.pathname ? this.state.pathname : "Entity"} Master</h4>
									<div title="Go to Admin" className="col-lg-1 col-md-1 col-xs-1 col-sm-1 NOpadding-right">
										{this.props.vendorData ? <div onClick={this.admin.bind(this)} className="redirectToAdmin col-lg-5 col-lg-offset-7 col-md-10 col-xs-10 col-sm-10 fa fa-arrow-right"></div> : null}
									</div>
								</div>
								<div className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<ul className="nav nav-pills vendorpills col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-3 col-sm-12 col-xs-12">
										<li className=" col-lg-4 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne NOpadding-left btn1 disabled">
											<a href={this.props.match.params.entityID ? "/"+this.props.entity+"/basic-details/"+this.props.match.params.entityID : "/"+this.props.entity+"/basic-details"} className="basic-info-pillss pills backcolor">
												<i className="fa fa-info-circle" aria-hidden="true"></i> &nbsp;
												Basic Info
											</a>
											<div className="triangleone " id="triangle-right"></div>
										</li>
										<li className=" col-lg-4 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn2 disabled">
											<div className="triangletwo" id="triangle-right1"></div>
											<a href={this.props.match.params.entityID ? "/"+this.props.entity+"/location-details/"+this.props.match.params.entityID : "/"+this.props.entity+"/location-details" } className="basic-info-pillss backcolor">
												<i className="fa fa-map-marker iconMarginLeft" aria-hidden="true"></i> &nbsp;
												Location
											</a>
											<div className="trianglethree forActive" id="triangle-right"></div>
										</li>
										<li className="active col-lg-4 col-md-3 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 ">
											<div className="trianglesix" id="triangle-right2"></div>
											<a href={this.props.match.params.entityID ? "/"+this.props.entity+"/contact-details/"+this.props.match.params.entityID : "/"+this.props.entity+"/contact-details"} className="basic-info-pillss backcolor">
												<i className="fa fa-phone phoneIcon" aria-hidden="true"></i> &nbsp;
												Contact
											</a>
										</li>
									</ul>
								</div>
								<section className="Content">
									<div className="row">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 NOpadding">
												<div className="col-lg-12 col-md-12 col-sm-12 col-sm-12">
													<div className="col-lg-3 col-md-6 col-sm-6 col-sm-6 contactDetailTitle">
														<h4 className="MasterBudgetTitle"><i className="fa fa-phone" aria-hidden="true"></i> Contact Details</h4>
													</div>
													<div className="col-lg-6 col-md-6 col-sm-6 col-sm-6 ">
														{/* <h4 className="noteSupplier">Note: Please start adding contacts from 1st point of contact to higher authority.</h4> */}
													</div>
													<div className="col-lg-3 col-md-6 col-sm-6 col-sm-6 contactDetailTitle">
														<div className="button4  pull-right" onClick={this.openForm.bind(this)}>
															<i className="fa fa-plus" aria-hidden="true"></i>&nbsp;Add Contact
														</div>
													</div>
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 formHrTag"></div>
												</div>
												{
													this.state.openForm === true ?
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
															<form id="ContactDetail">
																<div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Branch Code <sup className="astrick">*</sup></label>
																		<select id="branchCode" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.branchCode} ref="branchCode" name="branchCode" onChange={this.handleChange} required>
																			<option defaultValue>--Select Branch Code--</option>
																			{
																				this.state.branchCodeArry && this.state.branchCodeArry.length > 0 ?
																					this.state.branchCodeArry.map((data, index) => {
																						if(data.branchCode){
																							return (
																								<option key={index} value={data.branchCode}>{data.area ? data.area : ""} {data.city === data.district ? "" : data.city} {data.district} {data.stateCode} - {data.countryCode}</option>
																							);
																						}
																					}
																					)
																					:
																					null
																			}
																		</select>
																	</div>
																	<div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
																		<div id="department">
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Department <i className="astrick">*</i></label>
																		<select className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
																			ref="department" value={this.state.department} name="department" onChange={this.handleChange} >
																			<option >--Select Department--</option>
																			{
																			this.state.departmentArray && this.state.departmentArray.length > 0 ?
																				this.state.departmentArray.map((deptData, index) => {
																				return (
																					<option key={index} value={deptData._id}>{(deptData.department)}</option>
																				);
																				}
																				) : ''
																			}
																		</select>
																		</div>
																	</div>
																	<div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
																		<div id="designation">
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Designation <i className="astrick">*</i></label>
																		<select  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="designation" value={this.state.designation} name="designation" onChange={this.handleChange}>
																			<option >--Select Designation--</option>
																			{
																			this.state.designationArray && this.state.designationArray.length > 0 ?
																				this.state.designationArray.map((desData, index) => {
																				return (
																					<option key={index} value={desData._id}>{(desData.designation)}</option>
																				);
																				}) : ''
																			}
																		</select>
																		</div>
																	</div>
																</div>
																<div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 " >
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Employee ID</label>
																		<input id="employeeID" name="employeeID" type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.employeeID} ref="employeeID" name="employeeID" onChange={this.handleChange} />
																	</div>
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 " >
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">First Name <sup className="astrick">*</sup></label>
																		<input id="firstName" type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.firstName} ref="firstName" name="firstName" onChange={this.handleChange} required />
																	</div>
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 " >
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Last Name <sup className="astrick">*</sup></label>
																		<input id="lastName" type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.lastName} ref="lastName" name="lastName" onChange={this.handleChange} required />
																	</div>
																	
																</div>
																<div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Email <sup className="astrick">*</sup></label>
																		<input id="email" type="email" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.email} ref="email" name="email" onChange={this.handleChange} required />
																	</div>
																    <div className="form-group valid_box col-lg-4 col-md-4 col-sm-12 col-xs-12">
														                <div className="form-group">
														                  <label className="labelform" >Contact Number</label>
														                    <PhoneInput
														                      country={'in'}
														                      value={this.state.phone} 
														                      name="phone"
														                      inputProps={{
														                        name: 'phone',
														                        required: true
														                      }}
																			  onChange={phone=>{this.setState({phone})}}
														                  />
														                </div> 
													              	</div>
													              	 <div className="form-group valid_box col-lg-4 col-md-4 col-sm-12 col-xs-12">
														                <div className="form-group">
														                  <label className="labelform" >Alternate Contact Number</label>
														                    <PhoneInput
														                      country={'in'}
														                      value={this.state.altPhone} 
														                      name="altPhone"
														                      inputProps={{
														                        name: 'altPhone',
														                        required: true
														                      }}
																			  onChange={altPhone=>{this.setState({altPhone})}}
														                  />
														                </div> 
													              	</div>
																	
																</div>
																<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Booking Approval Required</label>
																		
																		<div className="btn-group btn-group-toggle" data-toggle="buttons">
																			<label className={this.state.bookingApprovalRequired === true ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value={true} onClick={this.bookingApproval.bind(this,true)}>
																			<input type="radio"
																				name="options" 
																				id="yes"
																				value={true}
																				autocomplete="off"
																				checked
																				/>Yes
																			</label>
																			<label className={this.state.bookingApprovalRequired === false ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value={false} onClick={this.bookingApproval.bind(this,false)} >
																			<input type="radio" name="options" id="no"  value="no" autocomplete="off" /> No
																			</label>
																		</div>
																	</div>
																	<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 NOpadding">
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Create Login Credential</label>
																		
																		<div className="btn-group btn-group-toggle" data-toggle="buttons">
																			<label className={this.state.createUser === true ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value={true} onClick={this.loginCredentials.bind(this,true)}>
																			<input type="radio"
																				name="options" 
																				id="yes"
																				value={true}
																				autocomplete="off"
																				checked
																				/>Yes
																			</label>
																			<label className={this.state.createUser === false ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value={false} onClick={this.loginCredentials.bind(this,false)} >
																			<input type="radio" name="options" id="no"  value="no" autocomplete="off" /> No
																			</label>
																		</div>
																	</div>
																	
																{
																	this.state.bookingApprovalRequired ? 
																		<div>
																			<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
																				<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Approving Authority Employee ID <sup className="astrick">*</sup></label>
																				<input id="approvingAuthorityId" type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.approvingAuthorityId} ref="approvingAuthorityId" name="approvingAuthorityId" onChange={this.handleChange} required />
																			</div>
																			<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
																				<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Pre Approved Amount <sup className="astrick">*</sup></label>
																				<input id="preApprovedAmount" type="number" max="100000" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.preApprovedAmount} ref="preApprovedAmount" name="preApprovedAmount" onChange={this.handleChange} required />
																			</div>
																		</div>
																		
																	:
																	null
																}
																</div>
																<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 contactSubmit pull-right">
																	{this.props.match.params.entityID ?
																		this.state.contactID ?
																			<button className="button3 pull-right" onClick={this.updatecontactdetailAddBtn.bind(this)} data-id={this.state.contactValue}>Update Contact</button>
																			:
																			<button className="button3 pull-right" onClick={this.contactdetailAddBtn.bind(this)}>Submit</button>
																		:
																		null
																		}
																</div>
															</form>
														</div>
														:
														null
												}
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<button className="button2" onClick={this.locationdetailBack.bind(this)}><i className="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Location Details</button>
													<button className="button1 pull-right" onClick={this.contactdetailBtn.bind(this)}>Finish&nbsp;</button>
												</div>
											</div>
										</div>
										{this.state.contactarray && this.state.contactarray.length > 0 ?
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 foothd">
													<h4 className="MasterBudgetTitle">Contact Details</h4>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
													{this.state.contactarray && this.state.contactarray.length > 0 ?
														this.state.contactarray.map((data, index) => {

															return (
																<div className="col-lg-6  col-md-6  col-sm-6 col-xs-12 " key={index}>
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxul1">
																		<div className="contractIcon col-lg-1 col-md-1 col-sm-1 col-xs-1">
																			<i className="fa fa-phone" aria-hidden="true"></i>
																		</div>
																		<ul className="col-lg-10 col-md-10 col-sm-10 col-xs-10 palfclr addrbox">
																			
																			<li>{data.firstName} {data.lastName}</li>
																			<li>{data.email}, {data.phone}, {data.altPhone}</li>
																			<li>Branch Code: {data.branchCode} Employee ID: {data.employeeID}</li>
																			{/* <li>Department: {data.department}</li>
																			<li>Designation: {data.designation}</li> */}
																			<li>Booking Approval Required: {data.bookingApprovalRequired ? 'Yes' : 'No'}</li>
																			<li>Approving Authority Employee ID: {data.approvingAuthorityId}</li>
																			<li>Pre Approved Amount: {data.preApprovedAmount}</li>
																			<li>Created Login Credential: {data.createUser ? 'Yes' : 'No'}</li>
																		</ul>
																		<div className="liheader1 dropdown col-lg-1 col-md-1 col-sm-1 col-xs-1">
																			<i className="fa fa-ellipsis-h dropbtn" aria-hidden="true"></i>
																			<div className="dropdown-content dropdown-contentLocation">
																				<ul className="pdcls ulbtm">
																					<li name={index}>
																						<a href={"/"+this.state.pathname+"/contact-details/" + this.props.match.params.entityID + "/" + data._id}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</a>
																					</li>
																					<li name={index}>
																						<span onClick={this.contactDelete.bind(this)} id={data._id}><i className="fa fa-trash-o" aria-hidden="true"></i> &nbsp; Delete</span>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															);
														})
														:
														<div className="textAlign">Contacts will be shown here.</div>
													}
												</div>
											</div>
										</div>
										:
										null
												}
									</div>
								</section>
							</div>
						</section>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ContactDetails);
