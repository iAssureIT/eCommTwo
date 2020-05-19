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
			'firstName'         		: '',
			'lastName'          		: '',
			'phone'             		: '',
			'altPhone'         	 		: '',
			'email'             		: '',
			'employeeID'        		: '',
			'preApprovedParameter'      : '-- Select --',
			'preApprovedParameterValue' : '',
			'approvingAuthorityId1'     : '',
			'approvingAuthorityId2'     : '',
			'approvingAuthorityId3'     : '',
			'openForm'					: false,
			'openFormIcon'              : false,
			'bookingApprovalRequired' 	: "No",
			'createUser' 				: false,
			"pathname"					: this.props.entity,
			'entityID'					: this.props.match.params ? this.props.match.params.entityID : '',
			'contactID'					: this.props.match.params ? this.props.match.params.contactID : '',
 			'listOfEmpID' 			: [],
		};
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.edit();
	}
	openForm() {
		this.setState({
			openForm     : this.state.openForm     === false ? true : false,
			openFormIcon : this.state.openFormIcon === false ? true : false
		},()=>{
			if(this.state.openForm === true){
				this.validation();
			}
		})
		
	}
	componentDidMount() {
		window.scrollTo(0, 0);
		var role = localStorage.getItem("roles");
		this.setState({
			getCurrentRole : role
		},()=>{
			console.log("getCurrentRole",this.state.getCurrentRole);
		})
		this.getAllEntites();
		this.getDesignation();
		this.getDepartment();
		this.getBranchCode();
		this.contactDetails();
		this.edit();
		this.getRoles();
	}
	getAllEntites() {
		if(this.state.pathname == "corporate")
		{
		var formvalues = { type : "employee"}
		}
		else{
		var formvalues = { type : "driver"}
		}
		var listOfEmpID = [];
		axios.get('/api/entitymaster/get/one/' + this.props.match.params.entityID)
		.then((response) => {

			this.setState({
				contactarray: response.data.contactPersons
			},()=>{
				for(let j=0;j<this.state.contactarray.length;j++)
				{
					listOfEmpID.push(this.state.contactarray[j].employeeID)
				}
			})
		})
		.catch((error) => {				
		})

		axios.post("/api/personmaster/get/list",formvalues)
		.then((response) => {	        
			this.setState({
				personList   : response.data,
			})
			console.log("Hi",this.state.personList);
			for(let i=0;i<this.state.personList.length;i++)
			{
				listOfEmpID.push(this.state.personList[i].employeeId)
			}
			this.setState({
				listOfEmpID:listOfEmpID
			})
			console.log("listOfEmpID",this.state.listOfEmpID);
		})
		.catch((error) => {
		})
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
	getRoles() {
		var data = {
		"startRange"        : this.state.startRange,
		"limitRange"        : this.state.limitRange, 
	  }
	
		axios.post("/api/roles/get/list",data)
		  .then((response) => {
			this.setState({
			  rolesArray: response.data
			},()=>{
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
		}, "Role is mandatory");
		/*$.validator.addMethod("desRegx", function (value, element, arg) {
			return arg !== value;
		}, "Please enter valid designation");
		*/$.validator.addMethod("firstRegx", function (value, element, regexpr) {
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
		}, "Please select the company branch ");
		
		jQuery.validator.setDefaults({
			debug: true,
			success: "valid"
		});
		$("#ContactDetail").validate({
			rules: {
				branchCode: {
					required: true,
					regxBranchCode: "--Select Company Branch --"
				},
				role: {
					required: true,
					depRegx: "--Select Role--"
				},/*
				designation: {
					required: true,
					desRegx: "--Select Designation--"
				},*/
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
				approvingAuthorityId1: {
					required: true,
				},
				approvingAuthorityId2: {
					required: true,
				},
				approvingAuthorityId3: {
					required: true,
				},
				preApprovedParameter: {
					required: true,
				},
				preApprovedParameterValue: {
					required: true,
				},
				employeeID: {
					required: true,
					//regexpremployeeID :/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/,

				},
			},
			errorPlacement: function (error, element) {
				if (element.attr("name") === "branchCode") {
					error.insertAfter("#branchCode");
				}
				if (element.attr("name") == "role") {
					error.insertAfter("#role");
				}
				if (element.attr("name") == "department") {
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
				if (element.attr("name") === "approvingAuthorityId1") {
					error.insertAfter("#approvingAuthorityId1");
				}
				if (element.attr("name") === "approvingAuthorityId2") {
					error.insertAfter("#approvingAuthorityId2");
				}
				if (element.attr("name") === "approvingAuthorityId3") {
					error.insertAfter("#approvingAuthorityId3");
				}
				if (element.attr("name") === "preApprovedParameter") {
					error.insertAfter("#preApprovedParameter");
				}
				if (element.attr("name") === "preApprovedParameterValue") {
					error.insertAfter("#preApprovedParameterValue");
				}
				if (element.attr("name") === "employeeID") {
					error.insertAfter("#employeeID");
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

	numberWithCommas(value) {
    	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	handleComma(event){
		console.log("inside handlecomma");
		var value = event.target.value;
		var valuewithComa = this.numberWithCommas(value);
		console.log("With comma:",valuewithComa);
	}
	
	handleChange(event) {
		const target = event.target;
		const name = target.name;
		var value = event.target.value;	
		 var vendorLocation = document.getElementById("branchCode");
		 var department = document.getElementById("deptName");
		 var designation = document.getElementById("desgName");
   		 var departmentName = department.options[department.selectedIndex].getAttribute("deptName");
   		 var designationName = designation.options[designation.selectedIndex].getAttribute("desgName");
   		 var locationname = vendorLocation.options[vendorLocation.selectedIndex].getAttribute("branch_location");
   		 var locationId = vendorLocation.options[vendorLocation.selectedIndex].getAttribute("branch_location_id");
   
		console.log("value")
		if(name === "roless"){
			if(value === "manager" || value === "corporateadmin" ){
				this.setState({
					[name]: ["employee", event.target.value]
				});	
			}else{
				this.setState({
					[name]: [event.target.value]
				});
			}
			this.setState({
				[name]: [event.target.value]
			});
		}else{
			this.setState({
				[name]: event.target.value,
				"workLocation" : locationname,
				"workLocationId" :locationId,
				"departmentName" :departmentName,
				"designationName" :designationName
			},()=>{
			});
		}		
					
	}
	locationdetailBack(event) {
		event.preventDefault();
		var entityID = this.props.match.params.entityID;
		if (this.state.branchCode || this.state.firstName || this.state.lastName || this.state.email || this.state.department || this.state.designation || this.state.employeeID) {
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
					this.props.history.push("/"+(this.state.pathname === "appCompany" ? "org-settings" :this.state.pathname)+"/location-details/" + entityID);
				}else{
					this.props.history.push("/"+(this.state.pathname === "appCompany" ? "org-settings" :this.state.pathname)+"/contact-details/" + entityID);
				}
			})
			$(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
			$(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');
		} else {
			this.props.history.push("/"+(this.state.pathname === "appCompany" ? "org-settings" :this.state.pathname)+"/location-details/" + entityID);
		}
	}
	contactdetailBtn(event) {
		event.preventDefault();
		var entityID = this.props.match.params.entityID;
		if (this.state.branchCode || this.state.firstName || this.state.lastName || this.state.email || this.state.department || this.state.designation || this.state.employeeID) {
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
						this.props.history.push("/"+(this.state.pathname === "appCompany" ? "org-settings/basic-details/"+entityID :this.state.pathname+"/list"));
					}else{
						this.props.history.push("/"+(this.state.pathname === "appCompany" ? "org-settings" :this.state.pathname)+"/contact-details/" + entityID);
					}
				})
			$(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
			$(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');
		} else {
			this.props.history.push("/"+(this.state.pathname === "appCompany" ? "org-settings/basic-details/"+entityID :this.state.pathname+"/list"));
		}
	}
	contactdetailAddBtn(event) {
		event.preventDefault();
		
		var entityID = this.props.match.params.entityID;
		//var entityID = this.props.match.params.companyID;
			var formValues = {
				'entityID' 						: entityID,
				'contactDetails' 				: {
					'branchCode'        		: this.state.branchCode,
					'branchName'        		: this.state.workLocation,
					'firstName'               	: this.state.firstName,
					'lastName'                	: this.state.lastName,
					'phone'             		: this.state.phone,
					'altPhone'          		: this.state.altPhone,
					'email'             		: this.state.email,
					'department'        		: this.state.department,
					'departmentName'        		: this.state.departmentName,
					'designationName'       		: this.state.designationName,
					'designation'       				: this.state.designation,
					'employeeID'        				: this.state.employeeID,
					'bookingApprovalRequired' 	: this.state.bookingApprovalRequired,
					'approvingAuthorityId1' 		: this.state.bookingApprovalRequired ? this.state.approvingAuthorityId1 : "",
					'approvingAuthorityId2' 		: this.state.bookingApprovalRequired ? this.state.approvingAuthorityId2 : "",
					'approvingAuthorityId3' 		: this.state.bookingApprovalRequired ? this.state.approvingAuthorityId3 : "",
					'preApprovedParameter' 			: this.state.bookingApprovalRequired ? this.state.preApprovedParameter : "",
					'preApprovedParameterValue' : this.state.bookingApprovalRequired ? this.state.preApprovedParameterValue : "",
					'createUser'        		: this.state.createUser,
					'role' 									: this.state.createUser ? this.state.role : "-- Select Role --",
          'addEmployee'       		: this.state.addEmployee,
				}
			}
			console.log("formValues",formValues);
			const main = async()=>{
				if ($('#ContactDetail').valid()) {
					// console.log("this.state.listOfEmpID.indexOf(this.state.employeeID)",this.state.listOfEmpID.indexOf(this.state.employeeID))

					if(this.state.createUser === true && this.state.listOfEmpID.indexOf(this.state.employeeID) === -1){
						formValues.contactDetails.userID = await this.createUser();
						formValues.contactDetails.personID = await this.savePerson(formValues.contactDetails.userID);
						var formValues1 = {
							userID: formValues.contactDetails.userID,
							role: "employee",
						}
						console.log("formValues",formValues.contactDetails.userID,formValues1,formValues1.role);
						if(this.state.pathname == "corporate" && (this.state.role == "manager" || this.state.role == "corporateadmin" ))
						{
							axios
							.patch('/api/users/patch/role/assign/' + formValues1.userID, formValues1)
							.then(
								(res) => {
								console.log(res);
								}).catch((error) => {
								console.log("error",error);

							});
						}
					}
					this.saveContact(formValues);
				} else {
					$(event.target).parent().parent().find('.inputText.error:first').focus();
				}
			}
			
			main();
	}
	createUser = ()=>{
		console.log("In here")
		var userDetails = {
			"firstname"				: this.state.firstName,
			"lastname"				: this.state.lastName,
			"mobNumber"				: this.state.phone,
			"email"						: this.state.email,
			"companyID"				: this.state.companyID,
			"companyName"			: this.state.companyName,
			"pwd"							: "welcome123",
			"role"						: this.state.pathname =="appCompany"  ? "admin" : this.state.role,
			"status"					: 'active',
			"emailSubject"		: "Email Verification",
			"emailContent"		: "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
		}
		console.log("userDetails",userDetails);
		return new Promise(function(resolve, reject){
			axios.post('/api/auth/post/signup/user', userDetails)
			.then((response)=>{
				console.log("response.data.ID",response.data.ID)
				resolve(response.data.ID);
				if(response.data.message =='USER_CREATED'){
					
				}else{
					swal(response.data.message);
				}
				
			})
			.catch((error)=>{})
		})
	}

	savePerson = (userID)=>{
		console.log("userID",userID);
		if(userID){
		var userDetails = {
			type                    : this.state.pathname == "vendor"?"driver":"employee",
			companyID				: this.state.companyID,
			company_Id				: this.state.entityID,
			companyName 		    : this.state.companyName,
			workLocation            : this.state.workLocation,
			workLocationId            : this.state.workLocationId,
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
			status					: "Active",
			bookingApprovalRequired : this.state.bookingApprovalRequired,
			approvingAuthorityId1    : this.state.bookingApprovalRequired == "Yes" ? this.state.approvingAuthorityId1 : "",
			approvingAuthorityId2    : this.state.bookingApprovalRequired == "Yes" ? this.state.approvingAuthorityId2 : "",
			approvingAuthorityId3     : this.state.bookingApprovalRequired == "Yes" ? this.state.approvingAuthorityId3 : "",
			preApprovedParameterValue : this.state.bookingApprovalRequired == "Yes" ? this.state.preApprovedParameterValue : "",
			preApprovedParameter      : this.state.bookingApprovalRequired == "Yes" ? this.state.preApprovedParameter : "",
		  }
		  console.log("userDetails",userDetails);
		  return new Promise(function(resolve, reject){
			axios.post('/api/personmaster/post' ,userDetails)
			.then((response) => {
				resolve(response.data.PersonId);
			})
			.catch((error) => {})
		  })
		}
	}

	saveContact = (formValues)=>{
		if(this.state.listOfEmpID.indexOf(this.state.employeeID)>-1)
		{
			swal("Employee ID already exists..!")
		}else{
		axios.patch('/api/entitymaster/patch/addContact' ,formValues)
		.then((response) => {
				console.log("response",response)
				if(response.data.duplicated)
				{
					swal({
						title : "Contact already exists.",
					});

				}else{
					this.contactDetails();
					this.getAllEntites()

					swal({
						title : "Contact added successfully.",
						text : this.state.createUser ? "Login credentials created and emailed to user. \n LoginID : "+this.state.email+" \n Default Password : fivebees123 \n Contact also added in employee list." : ""
					});

					this.setState({
						'firstName'               	: '',
						'lastName'                	: '',
						'phone'            		 	: '',
						'altPhone'          		: '',
						'email'             		: '',
						'branchCode'        		: '--Select Company Branch--',
						'department'        		: '--Select Department--',
						'designation'       		: '--Select Designation--',
						'employeeID'        		: '',
						'bookingApprovalRequired' 	: "No",
						'createUser' 				: false,
						'addEmployee'				: false,
						'approvingAuthorityId1' 		: '',
						'approvingAuthorityId2' 		: '',
						'approvingAuthorityId3' 		: '',
						'preApprovedParameter' 		: '',
						'role' 		 				: '-- Select Role --',
						'preApprovedParameterValue' : '',
						'openForm'					: false,
					})
				}
				
			})
			.catch((error) => {
			
			})
		}
	}
	getBranchCode() {
		var entityID = this.state.entityID;
		axios.get('/api/entitymaster/get/one/' + entityID)
			.then((response) => {
				console.log("response",response);
				this.setState({
					companyID: response.data.companyID,
					companyName: response.data.companyName,
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
					'branchName'        		: this.state.workLocation,
					'firstName'               	: this.state.firstName,
					'lastName'                	: this.state.lastName,
					'phone'             		: this.state.phone,
					'altPhone'          		: this.state.altPhone,
					'email'             		: this.state.email,
					'department'        		: this.state.department,
					'designation'       		: this.state.designation,
					'departmentName'        	: this.state.departmentName,
					'designationName'       	: this.state.designationName,
				
					'employeeID'        		: this.state.employeeID,
					'bookingApprovalRequired' 	: this.state.bookingApprovalRequired,
					'approvingAuthorityId1' 	: this.state.bookingApprovalRequired == "Yes" ? this.state.approvingAuthorityId1 : "",
					'approvingAuthorityId2' 	: this.state.bookingApprovalRequired == "Yes" ? this.state.approvingAuthorityId2 : "",
					'approvingAuthorityId3' 	: this.state.bookingApprovalRequired == "Yes"  ? this.state.approvingAuthorityId3 : "",
					'preApprovedParameter' 		: this.state.bookingApprovalRequired == "Yes"  ? this.state.preApprovedParameter : "",
					'preApprovedParameterValue' : this.state.bookingApprovalRequired == "Yes"  ? this.state.preApprovedParameterValue : "",
					'createUser'        		: this.state.createUser,
				    'role' 						: this.state.createUser ? this.state.role : "-- Select Role --", 
                    'addEmployee'       		: this.state.addEmployee,
				}
			}
			console.log("formValues",formValues)
			const main = async()=>{
				if ($('#ContactDetail').valid()) {
					if(this.state.alreadyHasUser === true){
						this.updateUser();
						this.updatePerson();
					}else if(this.state.createUser === true){
						formValues.contactDetails.userID = await this.createUser();
						formValues.contactDetails.personID = await this.savePerson(formValues.contactDetails.userID);
					}
					
					this. updateContact(formValues);
				}
			}
			main();
		
	}
	updateUser = ()=>{
		if(this.state.alreadyHasUser && this.state.createUser == false)
		{
			
			var id = this.state.userID;
			const token = '';
			console.log('id', id);
			const url = '/api/users/delete/' + id;
			const headers = {
				"Authorization": token,
				"Content-Type": "application/json",
			};
			axios({
				method: "DELETE",
				url: url,
				headers: headers,
				timeout: 3000,
				data: null,
			})
				.then((response) => {
					console.log("Deleted permented")
				}).catch((error) => {
				});
			
		}else{
		var userDetails = {
			firstname			: this.state.firstName,
			lastname			: this.state.lastName,
			mobNumber			: this.state.phone,
			companyID			: this.state.companyID,
			email				: this.state.email,
			companyID			: this.state.companyID,
			companyName			: this.state.companyName,
			pwd					: "fivebees123",
			role				: this.state.pathname =="appCompany"  ? "admin" : this.state.role,
			status				: 'active',
			"emailSubject"		: "Email Verification",
			"emailContent"		: "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
		}
		var userid = this.state.userID;
		axios.patch('/api/users/patch/' + userid, userDetails)
		.then((response)=>{
			if(response.data.message =='USER_CREATED'){
			}else{
				swal("hi" +response.data.message);
			}
			
		})
		.catch((error)=>{})
    	}
	}
	updatePerson = ()=>{
		if(this.state.alreadyHasUser && this.state.createUser == false)
		{
		   axios.delete("/api/personmaster/delete/"+this.state.personID)
			.then((response) => {
				console.log("response",response)
				
			})
			.catch((error) => {})
		}
		else{
		var userDetails = {
			personID        		: this.state.personID,
			companyID				: this.state.companyID,
			company_Id				: this.state.entityID,
			companyName 		    : this.state.companyName,
			workLocation            : this.state.workLocation,
			workLocationId          : this.state.workLocationId,
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
			approvingAuthorityId1    : this.state.bookingApprovalRequired ? this.state.approvingAuthorityId1 : "",
			approvingAuthorityId2    : this.state.bookingApprovalRequired ? this.state.approvingAuthorityId2 : "",
			approvingAuthorityId3    : this.state.bookingApprovalRequired ? this.state.approvingAuthorityId3 : "",
			preApprovedParameter     : this.state.bookingApprovalRequired ? this.state.preApprovedParameter: "",
            preApprovedParameterValue: this.state.bookingApprovalRequired ? this.state.preApprovedParameterValue:"",
       
		  }
			axios.patch('/api/personmaster/patch' ,userDetails)
			.then((response) => {
				
			})
			.catch((error) => {})
		}
		  
	}
	updateContact = (formValues)=>{
		axios.patch('/api/entitymaster/patch/updateSingleContact', formValues)
		.then((response) => {
			this.contactDetails();
			this.setState({
				'contactID' 				: '',
				'firstName'               	: '',
				'lastName'                	: '',
				'phone'            		 	: '',
				'altPhone'          		: '',
				'email'             		: '',
				'branchCode'        		: '--Select Company Branch--',
				'department'        		: '--Select Department--',
				'designation'       		: '--Select Designation--',
				
				'employeeID'        		: '',
				'role'        				: '-- Select Role --',
				'bookingApprovalRequired' 	: "No",
				'createUser' 				: false,
				'addEmployee'				: false,
				'approvingAuthorityId1' 		: '',
				'approvingAuthorityId2' 		: '',
				'approvingAuthorityId3' 		: '',
				'preApprovedParameter' 		: '',
				'preApprovedParameterValue' : '',
				'openForm'					: false,
			})
			this.props.history.push("/"+(this.state.pathname === "appCompany" ? "org-settings" :this.state.pathname)+'/contact-details/'+this.props.match.params.entityID);
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
					console.log("response=>",response);
					var x = response.data.contactPersons;
					var contactDetails = x.filter(a => a._id === contactID);
					this.setState({
						'openForm'					: true,
						'branchCode'        		: contactDetails[0].branchCode,
						'branchName'        		: contactDetails[0].branchName,
						'firstName'               	: contactDetails[0].firstName,
						'lastName'                	: contactDetails[0].lastName,
						'phone'             		: contactDetails[0].phone,
						'altPhone'          		: contactDetails[0].altPhone,
						'email'             		: contactDetails[0].email,
						'department'        		: contactDetails[0].department,
						'departmentName'        	: contactDetails[0].departmentName,
						'designationName'       	: contactDetails[0].designationName,
						'designation'       		: contactDetails[0].designation,
						'employeeID'        		: contactDetails[0].employeeID,

						'role'        				: contactDetails[0].role,
						'bookingApprovalRequired' 	: contactDetails[0].bookingApprovalRequired,
						'approvingAuthorityId1'    	: contactDetails[0].approvingAuthorityId1,
						'approvingAuthorityId2'    	: contactDetails[0].approvingAuthorityId2,
						'approvingAuthorityId3'    	: contactDetails[0].approvingAuthorityId3,
						'preApprovedParameter' 		: contactDetails[0].preApprovedParameter,
						'preApprovedParameterValue' : contactDetails[0].preApprovedParameterValue,
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
							$('#employeeID').attr('disabled','true');
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
		var email = event.currentTarget.getAttribute("email_ID");
		console.log("email",email);
		var formValues = {
			entityID: entityID,
			location_ID: locationID
		}
		axios.delete('/api/entitymaster/deleteContact/' + entityID + "/" + locationID, formValues)
			.then((response) => {

				this.setState({
					'openForm'			: false,
					'contactID' 		: '',
					'firstName'         : '',
					'lastName'          : '',
					'phone'             : '',
					'altPhone'          : '',
					'email'             : '',
					'createUser' 		: false,
					'employeeID'        : '',
					'role'				: '-- Select Role --',
					'branchCode'        		: '--Select Company Branch--',
					'department'        		: '--Select Department--',
					'designation'       		: '--Select Designation--',
					'approvingAuthorityId1' 		: '',
					'approvingAuthorityId2' 		: '',
					'approvingAuthorityId3' 		: '',
					'preApprovedParameter' 			: '',
					'preApprovedParameterValue' 	: ''
				})
				axios.get('/api/personmaster/get/emailID/' + email)
					.then((response) => {
						console.log("response=>>",response.data.data[0]);
						this.setState({
							personID: response.data.data[0]._id,
							userId: response.data.data[0].userId,
							username: response.data.data[0].firstName + " " + response.data.data[0].lastName

						},()=>{
							axios.delete("/api/personmaster/delete/"+this.state.personID)
					            .then((response)=>{
					            	/*var formValues = {
										selectedUser: this.state.userId,
										status: 'deleted',
										username: this.state.username,
									}*/
									var id = this.state.userId;
									const token = '';
									console.log('id', id);
									const url = '/api/users/delete/' + id;
									const headers = {
										"Authorization": token,
										"Content-Type": "application/json",
									};
									axios({
										method: "DELETE",
										url: url,
										headers: headers,
										timeout: 3000,
										data: null,
									})
										.then((response) => {
											console.log("Deleted permented")
											
										}).catch((error) => {
										});
											           		
				            })

						})
					})
					.catch((error) => {
						
					})
	            .catch((error)=>{
	            })
				this.contactDetails();
				this.props.history.push('/'+(this.state.pathname === "appCompany" ? "org-settings" :this.state.pathname)+'/contact-details/' + entityID);
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

				},()=>{
					console.log("contactarray",this.state.contactarray)
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
			// console.log("all props : ",this.props)

		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
						<section className="content OrgSettingFormWrapper">
							<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
									 {
										 this.state.pathname !="appCompany" ?
						                  <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">{this.state.pathname ? this.state.pathname : "Entity"} Master</h4>
						                  :
						                  <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Organizational Settings</h4>
					  
					                }
									<div title="Go to Admin" className="col-lg-1 col-md-1 col-xs-1 col-sm-1 NOpadding-right">
										{this.props.vendorData ? <div onClick={this.admin.bind(this)} className="redirectToAdmin col-lg-5 col-lg-offset-7 col-md-10 col-xs-10 col-sm-10 fa fa-arrow-right"></div> : null}
									</div>
								</div>
								<div className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<ul className="nav nav-pills vendorpills col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-3 col-sm-12 col-xs-12">
										<li className=" col-lg-4 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne NOpadding-left btn1 disabled">
											<a href={this.props.match.params.entityID ? "/"+(this.props.entity === "appCompany" ? "org-settings":this.props.entity)+"/basic-details/"+this.props.match.params.entityID : "/"+(this.props.entity === "appCompany" ? "org-settings":this.props.entity)+"/basic-details"} className="basic-info-pillss pills backcolor">
												<i className="fa fa-info-circle" aria-hidden="true"></i> &nbsp;
												Basic Info
											</a>
											<div className="triangleone " id="triangle-right"></div>
										</li>
										<li className=" col-lg-4 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn2 disabled">
											<div className="triangletwo" id="triangle-right1"></div>
											<a href={this.props.match.params.entityID ? "/"+(this.props.entity === "appCompany" ? "org-settings":this.props.entity)+"/location-details/"+this.props.match.params.entityID : "/"+(this.props.entity === "appCompany" ? "org-settings":this.props.entity)+"/location-details" } className="basic-info-pillss backcolor">
												<i className="fa fa-map-marker iconMarginLeft" aria-hidden="true"></i> &nbsp;
												Location
											</a>
											<div className="trianglethree forActive" id="triangle-right"></div>
										</li>
										<li className="active col-lg-4 col-md-3 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 ">
											<div className="trianglesix" id="triangle-right2"></div>
											<a href={this.props.match.params.entityID ? "/"+(this.props.entity === "appCompany" ? "org-settings":this.props.entity)+"/contact-details/"+this.props.match.params.entityID : "/"+(this.props.entity === "appCompany" ? "org-settings":this.props.entity)+"/contact-details"} className="basic-info-pillss backcolor">
												<i className="fa fa-phone phoneIcon" aria-hidden="true"></i> &nbsp;
												Contact
											</a>
										</li>
									</ul>
								</div>
								<section className="Content contactSection">
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
														{
															this.state.openForm === true ?
															<i className="fa fa-minus-circle" aria-hidden="true"></i>
															:
															<i className="fa fa-plus-circle" aria-hidden="true"></i>
														}   &nbsp;Add Contact
															
														</div>
													</div>
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 formHrTag"></div>
												</div>
												{
													this.state.openForm === true ?
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
															<form id="ContactDetail" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																<div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
																		{
																			this.state.branchCodeArry && this.state.branchCodeArry.length > 0
																			?
																			<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Company Branch <sup className="astrick">*</sup></label>																		
																			:
																			<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Company Branch <sup className="astrick">*</sup><span className="anyQuestion" title="In Location form, if you add Office location, then only it will show up here.">Any ?</span></label>
																		}
																		
																		<select id="branchCode" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.branchCode} ref="branchCode" name="branchCode" onChange={this.handleChange} required>
																			<option selected={true} disabled={true}>--Select Company Branch--</option>
																			{
																				this.state.branchCodeArry && this.state.branchCodeArry.length > 0 ?
																					this.state.branchCodeArry.map((data, index) => {
																						if(data.branchCode){
																							return (
																								<option key={index} branch_location_id={data._id} branch_location={(data.area ? data.area : "") +" "+(data.city === data.district ? "" : data.city)+(data.district)+" "+(data.stateCode)+ "-" +(data.countryCode)} value={data.branchCode}>{((data.locationType).match(/\b(\w)/g)).join('')} - {data.area} {data.city}, {data.stateCode} - {data.countryCode}</option>
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
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Department </label>
																		<select className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
																			ref="department" value={this.state.department} name="department" onChange={this.handleChange} id="deptName">
																			<option selected={true} disabled={true}>--Select Department--</option>
																			{
																			this.state.departmentArray && this.state.departmentArray.length > 0 ?
																				this.state.departmentArray.map((deptData, index) => {
																				return (
																					<option key={index} value={deptData._id} deptName={deptData.department}>{(deptData.department)}</option>
																				);
																				}
																				) : ''
																			}
																		</select>
																		</div>
																	</div>
																	<div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
																		<div id="designation">
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Designation</label>
																		<select  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="designation" value={this.state.designation} name="designation" onChange={this.handleChange} id="desgName">
																			<option selected={true} disabled={true}>--Select Designation--</option>
																			{
																			this.state.designationArray && this.state.designationArray.length > 0 ?
																				this.state.designationArray.map((desData, index) => {
																				return (
																					<option key={index} value={desData._id} desgName={desData.designation}>{(desData.designation)}</option>
																				);
																				}) : ''
																			}
																		</select>
																		</div>
																	</div>
																</div>
																<div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 "  >
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Employee ID <i className="astrick">*</i></label>
																		<input type="number" id="employeeID" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.employeeID} ref="employeeID" name="employeeID" onChange={this.handleChange} />
																	</div>
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 " >
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">First Name <sup className="astrick">*</sup></label>
																		<input id="firstName" maxLength="25" type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.firstName} ref="firstName" name="firstName" onChange={this.handleChange} required />
																	</div>
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 " >
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Last Name <sup className="astrick">*</sup></label>
																		<input id="lastName" maxLength="25" type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.lastName} ref="lastName" name="lastName" onChange={this.handleChange} required />
																	</div>
																	
																</div>
																<div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Email <sup className="astrick">*</sup></label>
																		<input id="email" type="email" maxLength="30" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.email} ref="email" name="email" onChange={this.handleChange} required />
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
																<div className="height40 col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
																			<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Create Login Credentials</label>
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
																	this.state.createUser  && this.state.pathname !=="appCompany"? 

																	<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" > 
																		<div id="role">
							                                            <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Role <i className="astrick">*</i></label>
							                                            <select className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
							                                              ref="role" name="role" value={this.state.role} onChange={this.handleChange}>
							                                              <option selected={true} disabled={true}>-- Select Role --</option>
							                                              {this.state.rolesArray && this.state.rolesArray.length > 0 ?
																				this.state.rolesArray.map((desData, index) => {
																				return (
																					<option key={index} value={desData.role}>{(desData.role)}</option>
																				);
																				}) : ''
																			}
							                                            </select>
							                                       		</div>
							                                        </div>
							                                        :
							                                        null
							                                    }
																		
																	
																</div>
																<div className="marginTop10 col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																	
																	{ this.state.pathname != "appCompany" ?
																		<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
																			<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Booking Approval Required</label>
																			
																			<div className="btn-group btn-group-toggle" data-toggle="buttons">
																				<label className={this.state.bookingApprovalRequired === "Yes" ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value="Yes" onClick={this.bookingApproval.bind(this,"Yes")}>
																				<input type="radio"
																					name="options" 
																					id="yes"
																					value= "Yes"
																					autocomplete="off"
																					checked
																					/>Yes
																				</label>
																				<label className={this.state.bookingApprovalRequired === "No" ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value="No" onClick={this.bookingApproval.bind(this,"No")} >
																				<input type="radio" name="options" id="no"  value="no" autocomplete="off" /> No
																				</label>
																			</div>
																		</div> 
																		:
																		<div>
																		</div>
																	}
																		
																	
																</div>
																<div className="form-margin bookingApproval col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																		
																	{
																		this.state.bookingApprovalRequired === "Yes" ? 
																			<div>
																				<div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
										                                           <div id="approvingAuthorityId1"> 
										                                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Approving Authority Id1<i className="astrick">*</i></label>
										                                              <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.approvingAuthorityId1} ref="approvingAuthorityId1" name="approvingAuthorityId1" onChange={this.handleChange} required/>
										                                            </div>
										                                        </div>

																				<div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
										                                           <div id="approvingAuthorityId2"> 
										                                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Approving Authority Id2<i className="astrick">*</i></label>
										                                              <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.approvingAuthorityId2} ref="approvingAuthorityId2" name="approvingAuthorityId2"   onChange={this.handleChange} />
										                                            </div>
										                                        </div>
																				<div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
										                                           <div id="approvingAuthorityId3"> 
										                                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Approving Authority Id3<i className="astrick">*</i></label>
										                                              <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.approvingAuthorityId3} ref="approvingAuthorityId3" name="approvingAuthorityId3"   onChange={this.handleChange} />
										                                            </div>
										                                          </div>
																			</div>
																			
																		:
																		null
																	
																	}
																</div>
																<div className="form-margin bookingApproval col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																		
																	{
																		this.state.bookingApprovalRequired === "Yes" ? 
																			<div>
																				<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" id="preApprovedParameter"> 
										                                            <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Pre Approved Parameter <i className="astrick">*</i></label>
										                                            <select className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
										                                              ref="preApprovedParameter" name="preApprovedParameter" onChange={this.handleChange} value={this.state.preApprovedParameter} >
										                                              <option selected={true} disabled={true}>-- Select --</option>
										                                              <option>Amount</option>
										                                              <option>Number Of Ride</option>
										                                              <option>Kilometer</option>
										                                            </select>
										                                        </div>
										                                        <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
										                                           <div id="preApprovedParameterValue"> 
										                                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Pre Approved {this.state.preApprovedParameter !== "-- Select --" ? this.state.preApprovedParameter : ""}<i className="astrick">*</i></label>
										                                              <input type="number" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.preApprovedParameterValue} ref="preApprovedParameterValue" name="preApprovedParameterValue"  onKeyDown={this.keyPressNumber.bind(this)}  onChange={this.handleChange} />
										                                            </div>
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
															var branchCode = '';
															return (
																<div className="col-lg-6  col-md-6  col-sm-6 col-xs-12 " key={index}>
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxul1">
																		<div className="contractIcon col-lg-1 col-md-1 col-sm-1 col-xs-1">
																			<i className="fa fa-phone" aria-hidden="true"></i>
																		</div>
																		<ul className="col-lg-10 col-md-10 col-sm-10 col-xs-10 palfclr addrbox">
																			
																			<li>{data.firstName} {data.lastName}</li>
																			<li>{data.email}, {data.phone}, {data.altPhone}</li>
																			<li>Branch Code: {data.branchCode}</li>
																			<li>Company Branch: {data.branchName?data.branchName:" - "}</li>
																			<li>Employee ID: {data.employeeID}</li>
																			 <li>Department: {data.departmentName ? data.departmentName : " - "}</li>
																			<li>Designation: {data.designationName ? data.designationName : " - "}</li>

																			{data.bookingApprovalRequired === 'Yes'?
																				<li>Booking Approval Required: Yes</li>	
																			:
																				<li>Booking Approval Required: No</li>	
																			}		

																			{data.approvingAuthorityId1 ?
																				<li>Approving Authority Employee ID 1: {data.approvingAuthorityId1}</li>	
																			:
																			null
																			}
																			{data.approvingAuthorityId2 ?
																				<li>Approving Authority Employee ID 2: {data.approvingAuthorityId2}</li>	
																			:
																			null
																			}																	
																			{data.approvingAuthorityId3 ?
																				<li>Approving Authority Employee ID 3: {data.approvingAuthorityId3}</li>	
																			:
																			null
																			}																	

																			{data.preApprovedParameter === 'Amount'?
																				<li>Pre Approved {data.preApprovedParameter} :  &#8377; {data.preApprovedParameterValue}</li>	
																				:
																				null
																			}

																			{data.preApprovedParameter === 'Number Of Ride'?
																				<li>Pre Approved {data.preApprovedParameter} : {data.preApprovedParameterValue}</li>	
																				:
																				null
																			}
																			{data.preApprovedParameter === 'Kilometer'?
																				<li>Pre Approved {data.preApprovedParameter} : {data.preApprovedParameterValue}</li>	
																				:
																				null
																			}					
																											
																																				
																			{data.createUser?
																				<li>Created Login Credential: Yes</li>	
																			:
																			null
																			}																			
																			
																		</ul>
																		<div className="liheader1 dropdown col-lg-1 col-md-1 col-sm-1 col-xs-1">
																			<i className="fa fa-ellipsis-h dropbtn" aria-hidden="true"></i>
																			<div className="dropdown-content dropdown-contentLocation">
																				<ul className="pdcls ulbtm">
																					<li name={index}>
																						<a href={"/"+(this.state.pathname === "appCompany" ? "org-settings" :this.state.pathname)+"/contact-details/" + this.props.match.params.entityID + "/" + data._id}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</a>
																					</li>
																					<li name={index}>
																						<span onClick={this.contactDelete.bind(this)} email_ID={data.email} id={data._id}><i className="fa fa-trash-o" aria-hidden="true"></i> &nbsp; Delete</span>
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
