import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import $ from 'jquery';
import TemplateRow from './emails/TemplateRow.jsx';
import EmailTemplateRow from './emails/EmailTemplateRow.jsx';
import NotificationTemplateRow from './notifications/NotificationTemplateRow.jsx';
import AllNotificationTemplateRow from './notifications/AllNotificationTemplateRow.jsx';
import AllSMSTemplateRow from './sms/AllSMSTemplateRow.jsx';
import SMSTemplateRow from './sms/SMSTemplateRow.jsx';
import CKEditor from "react-ckeditor-component";
import validator from 'validator';
import './notification.css';


const formValid = formerrors => {
	let valid = true;
	Object.values(formerrors).forEach(val => {
		val.length > 0 && (valid = false);
	})
	return valid;
}

const emptydataRegex = RegExp(/^\s*$/);
const companyAddressRegex = RegExp(/^[a-zA-Z0-9\s,'/.-]*$/);
class ViewTemplates extends Component {


	handleChange(event) {

		const datatype = event.target.getAttribute('data-text');
		const { name, value } = event.target;
		let formerrors = this.state.formerrors;

		switch (datatype) {

			case 'message':
				formerrors.message = emptydataRegex.test(value) ? "Please Enter Data" : '';
				break;

			case 'subject':
				formerrors.subject = emptydataRegex.test(value) ? "Please Enter Data" : '';
				break;

			default:
				break;
		}
		this.setState({
			formerrors,
			[name]: value
		});
	}


	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
		$("html,body").scrollTop(0);
		this.getData();
	
	}
	constructor(props) {

		super(props);
		this.state = {
			templateType: props.templateType ? props.templateType : "-- Select --",
			templateName: props.templateName ? props.templateName : "--Select Template Name--",
			subject: props.subject ? props.subject : null,
			content: null,
			contentError: '',
			subjecterror: '',
			templateNameerror: '',
			templateTypeerror: '',
			emailTemplates: {},
			notificationTemplates: {},
			smsTemplates: {},
			formerrors: {
				message: '',
				subject: '',

			},
		};
		this.updateContent = this.updateContent.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getEmailData = this.getEmailData.bind(this);
		this.deleteData = this.deleteData.bind(this);
		this.getNotiData = this.getNotiData.bind(this);
		this.getSmsData = this.getSmsData.bind(this);

	}

	componentWillReceiveProps(nextProps) {
		this.getData();
	}
	AllNotificationTemplates() {
		const id = this.state.currentNotificationId;
		var notificationTemplates = this.state.notificationTemplates;
		if (notificationTemplates && notificationTemplates.length > 0) {
			for (var i = 0; i < notificationTemplates.length; i++) {
				if (notificationTemplates[i]._id === id) {
					$('.defaultNotification').css({ 'display': 'none' });
					return [notificationTemplates[i]];
				}
			}
		} else {
			return [];
		}
		return [];
	}
	getData() {
		axios({
			method: 'get',
			url: '/api/masternotifications/get/list',
		}).then((response) => {
			var emailTemplatesList = response.data.filter((a) => { return a.templateType === "Email" });
			var notificationTemplatesList = response.data.filter((a) => { return a.templateType === "Notification" });
			var smsTemplatesList = response.data.filter((a) => { return a.templateType === "SMS" });
			this.setState({
				emailTemplatesList: emailTemplatesList,
				notificationTemplatesList: notificationTemplatesList,
				smsTemplatesList: smsTemplatesList
			});

		}).catch(function (error) {

		});
	}
	AllsmsTemplates() {
		const id = this.state.currentSMSId;
		var smsTemplates = this.state.smsTemplates;
		if (smsTemplates && smsTemplates.length > 0) {
			for (var i = 0; i < smsTemplates.length; i++) {
				if (smsTemplates[i]._id === id) {
					$('.defaultSMS').css({ 'display': 'none' });
					return [smsTemplates[i]];
				}
			}
		} else {
			return [];
		}
		return [];
	}

	getId(id) {
		axios({
			method: 'get',
			url: '/api/masternotifications/get/' + id,
		}).then((response) => {
			this.setState({
				emailTemplates: response.data
			})
		});
	}
	getEmailData(id) {
		if (id) {
			axios({
				method: 'get',
				// url: 'http://localhost:3048/api/masternotifications/'+id,
				url: '/api/masternotifications/get/' + id,
			}).then((response) => {
				this.setState({
					emailTemplates: response.data
				})
			});
		}
	}

	getNotiData(id) {
		if (id) {
			axios({
				method: 'get',
				// url: 'http://localhost:3048/api/masternotifications/'+id,
				url: '/api/masternotifications/get/' + id,
			}).then((response) => {
				this.setState({
					notificationTemplates: response.data
				})
			});
		}
	}

	getSmsData(id) {
		if (id) {
			axios({
				method: 'get',
				// url: 'http://localhost:3048/api/masternotifications/'+id,
				url: '/api/masternotifications/get/' + id,
			}).then((response) => {
				this.setState({
					smsTemplates: response.data
				})
			});
		}
	}


	getNotificationId(id) {
		axios({
			method: 'get',
			url: '/api/masternotifications/get/' + id,
		}).then((response) => {
			this.setState({
				notificationTemplates: response.data
			})
		});
	}
	getSmsId(id) {
		axios({
			method: 'get',
			url: '/api/masternotifications/get/' + id,
		}).then((response) => {
			this.setState({
				smsTemplates: response.data
			})
		});
	}

	deleteData(type, id) {
		if (type && id) {
			if (type === "Email") {
				var emailarray = [...this.state.emailTemplatesList]; // make a separate copy of the array
				var index = emailarray.findIndex((obj) => { return obj._id === id });
				if (index !== -1) {
					emailarray.splice(index, 1);
					this.setState({ emailTemplatesList: emailarray, emailTemplates: {} }, () =>
						this.getData());
				}
			} else if (type === "Notification") {
				var notificationarray = [...this.state.notificationTemplatesList]; // make a separate copy of the array
				var notificationindex = notificationarray.findIndex((obj) => { return obj._id === id });
				if (notificationindex !== -1) {
					notificationarray.splice(notificationindex, 1);
					this.setState({ notificationTemplatesList: notificationarray, notificationTemplates: {} });
				}
			} else if (type === "SMS") {
				var smsarray = [...this.state.smsTemplatesList]; // make a separate copy of the array
				var smsindex = smsarray.findIndex((obj) => { return obj._id === id });
				if (smsindex !== -1) {
					smsarray.splice(smsindex, 1);
					this.setState({ smsTemplatesList: smsarray, smsTemplates: {} });
				}
			}
		}
	}

	submitTemplate(event) {
		event.preventDefault();
		var templateType = this.state.templateType;
		var templateName = this.state.templateName;
		var subject = this.state.subject;
		var cketext = this.state.content;
		if (cketext === null || cketext === "" || templateType === '-- Select --' || templateName === '--Select Template Name--') {
			swal({
				title: "Please enter mandatory fields",
				text: "Please enter mandatory fields",
			});
		} else {
			if (templateType === 'Email' && (subject === null || subject === "")) {
				swal({
					title: "Please enter mandatory fields",
					text: "Please enter mandatory fields",
				});
			} else {
				var formValues = {
					"templateType": templateType,
					"templateName": templateName,
					"subject": subject,
					"content": cketext,
				}
				if (formValid(this.state.formerrors)) {
					axios.post('/api/masternotifications/post', formValues)
						.then((response) => {
							if (response.data.message === "Master Notification Template Name already exists") {

								swal({
									title: "This template already exists",
									text: "This template already exists",
								});
								this.setState({
									templateType: '-- Select --',
									templateName: '--Select Template Name--',
									subject: "",
									content: null
								});
							} else {
								swal({
									title: "Template added successfully",
									text: "Template added successfully",
								});
							}
							axios({
								method: 'get',
								url: '/api/masternotifications/get/list',
							}).then((response) => {
								var emailTemplatesList = response.data.filter((a) => { return a.templateType === "Email" });
								var notificationTemplatesList = response.data.filter((a) => { return a.templateType === "Notification" });
								var smsTemplatesList = response.data.filter((a) => { return a.templateType === "SMS" });
								this.setState({
									emailTemplatesList: emailTemplatesList,
									notificationTemplatesList: notificationTemplatesList,
									smsTemplatesList: smsTemplatesList
								});

								this.setState({
									templateType: '-- Select --',
									templateName: '--Select Template Name--',
									subject: "",
									content: null
								});
							}).catch(function (error) {
							});

							$('#createNotifyModal').hide();
							$('.modal-backdrop').remove();
						})
						.catch(function (error) {
						})
				} else {
					swal({
						title: "Please enter mandatory fields",
						text: "Please enter mandatory fields",
					});
				}

			}

		}
	}


	selectType(event) {
		event.preventDefault();
		const target = event.target;
		const name = target.name;
		this.setState({
			[name]: event.target.value,
		}, () => {
			if (this.state.templateType === 'Notification' || this.state.templateType === 'SMS') {
				$('.subjectRow').css({ 'display': 'none' });
			} else if (this.state.templateType === 'Email') {
				$('.subjectRow').css({ 'display': 'block' });
			}
		});

	}
	updateContent(newContent) {
		this.setState({
			content: newContent
		})
	}
	onChange(evt) {
		var newContent = evt.editor.getData();
		this.setState({
			content: newContent
		}, () => {
			if (this.state.content) {
				this.setState({
					contentError: ''
				});
			} else {
				this.setState({
					contentError: ''
				})
			}
		})
	}


	render() {
		const { formerrors } = this.state;
		const required = (value) => {
			if (!value.toString().trim().length) {
				return <span className="error"></span>;
			}
		};

		const email = (value) => {
			if (!validator.isEmail(value)) {
				return <span className="error">T{`${value} is not a valid email.`}</span>
			}
		};

		const lt = (value, props) => {
			// get the maxLength from component's props
			if (!value.toString().trim().length > props.maxLength) {
				// Return jsx
				return <span className="error">The value exceeded {props.maxLength} symbols.</span>
			}
		};
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="formWrapper">
						<section className="content">
							<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent ">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
										<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageHeader">
											Notification Templates
										</div>
										<hr className="hr-head container-fluid row" />
									</div>
									<div className="">
										<section className="">
											<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12">
												<div className="col-lg-3 col-md-3  col-sm-6 col-xs-12" id="createmodalcl">
													<button className="addexamform addForm clickforhideshow col-lg-12 col-md-12 col-sm-12 col-xs-12 " data-toggle="modal" data-target="#createNotifyModal" data-whatever="@mdo"><i class="fa fa-plus" aria-hidden="true"></i><b> &nbsp;&nbsp;&nbsp;Add Template</b></button>
												</div>
											</div>
											<div className="modal modalHide col-lg-12 col-md-12 col-sm-12 col-xs-12" id="createNotifyModal" tabIndex="-1" role="dialog" aria-labelledby="createNotifyModal" aria-hidden="true">
												<div className="modal-dialog modal-lg" role="document">
													<div className="modal-content modalContent col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
														<div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
															<h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel">Create Template</h4>
															<div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
																<button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
																	<span aria-hidden="true">&times;</span>
																</button>
															</div>
														</div>
														<div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
															<form className="newTemplateForm col-lg-12 col-md-12 col-sm-12 col-xs-12" id="newTemplateForm">
																<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 forgtTextInp NOpadding-left">
																	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpadding-left">

																		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																			<div className="form-group ">
																				<label className="col-lg-6 col-md-6 col-sm-12 col-xs-12  label-category labelform">Template Type <span className="astrick">*</span></label>
																				<select className="form-control inputBox-main templateType" name="templateType" id="templateType" onChange={this.selectType.bind(this)} value={this.state.templateType}>
																					<option value="Not Selected"> --Select-- </option>
																					<option> Email </option>
																					<option> Notification </option>
																					<option> SMS </option>
																				</select>
																			</div>
																		</div>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
																		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																			<div className="form-group">
																				<label className=" label-category labelform">Template Name <span className="astrick">*</span></label>
																				<select name="templateName" id="templateName" value={this.state.templateName} onChange={this.handleChange} className="form-control inputBox-main templateType " required>
																					<option value="Not Selected">--Select Template Name--</option>
																					<option value="Vendor Registration">Vendor New Registration</option>
																					<option value="BA New Registration">BA New Registration</option>
																					<option value="User - Signup Notification">User - Signup Notification</option>
																					<option value="Admin - Signup Notification">Admin - Signup Notification</option>
																					<option value="User - Forgot Password OTP">User - Forgot Password OTP</option>
																					<option value="User - Annual Plan Submitted">User - Annual Plan Submitted</option>
																					<option value="Admin - Annual Plan Submitted">Admin - Annual Plan Submitted</option>
																					<option value="User - Monthly Plan Submitted">User - Monthly Plan Submitted</option>
																					<option value="Admin - Monthly Plan Submitted">Admin - Monthly Plan Submitted</option>
																					<option value="User - Activity Details Submitted">User - Activity Details Submitted</option>
																					<option value="Admin - Activity Details Submitted">Admin - Activity Details Submitted</option>
																					<option value="User - Login Account Activation">User - Login Account Activation</option>
																					<option value="Admin - Login Account Activation">Admin - Login Account Activation</option>
																					<option value="User - Login Account Blocked">User - Login Account Blocked</option>
																					<option value="Admin - Login Account Blocked">Admin - Login Account Blocked</option>
																				</select>
																			</div>
																		</div>
																	</div>
																</div>

																<div className="row rowPadding subjectRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<div className="form-group">
																			<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 labelform">Subject <span className="astrick">*</span></label>
																			<input type="text" name="subject" data-text="subject" validations={[required]} id="subject" value={this.state.subject} onChange={this.handleChange} className="subject form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" required />
																			{this.state.formerrors.subject && (
																				<span className="text-danger">{formerrors.subject}</span>
																			)}
																		</div>
																	</div>
																</div>
																<div className="row rowPadding col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<div className="form-group">
																			<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 labelform">Message <span className="astrick">*</span></label>
																			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																				<CKEditor activeClass="p15" id="editor" data-text="message" className="templateName" content={this.state.content} events={{ "change": this.onChange }} />
																				<label className="error">{this.state.contentError}</label>
																				{this.state.formerrors.message && (
																					<span className="text-danger">{formerrors.message}</span>
																				)}

																			</div>
																		</div>
																	</div>
																</div>
															</form>
														</div>
														<div className="modal-footer adminModal-footer paddingtop-down col-lg-12 col-md-12 col-sm-12 col-xs-12">
															<button type="submit" onClick={this.submitTemplate.bind(this)} className="col-lg-3 col-md-3 col-sm-6 col-xs-12 btn pull-right button3 outlinebox">Save Template</button>
															{/*<button type="submit" onClick={this.updateTemplate.bind(this)} className="btn pull-right col-lg-3 col-md-3 col-sm-6 col-xs-12 btnUpdate">Update Template</button>*/}
														</div>
													</div>
												</div>
											</div>
											<div className="box-body">
												<div className="notifTabs col-lg-9 col-lg-offset-3 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
													<ul className="nav nav-pills nav-pillss notifTab col-lg-12 col-md-12 col-sm-12 col-xs-12">
														<li className="active  col-lg-3 col-md-3 col-sm-4 col-xs-12">
															<a data-toggle="pill" href="#emailTemplates" > Email
															</a>
														</li>
														<li className="col-lg-3 col-md-3 col-sm-4 col-xs-12 ">
															<a data-toggle="pill" href="#smsTemplates">
																SMS
															</a>
														</li>
														<li className="col-lg-3 col-md-3 col-sm-4 col-xs-12 ">
															<a data-toggle="pill" href="#notificationTemplates">
																In-App Notification
															</a>
														</li>
													</ul>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<h4 className=""><i className="fa fa-envelope" aria-hidden="true"></i> Template Library </h4>
												</div>
												<div className="">
													<div className="tab-content">
														<div id="emailTemplates" className="tab-pane fade in active table-wrapper-scroll-y">
															<div className="">
																<div className="sidertemplatebar col-lg-3 col-md-3 col-xs-12 col-sm-12 my-custom-scrollbar">
																	<div className="row">
																		{/*{ this.AllTemplates().map( (templateData, index)=>{*/}
																		<TemplateRow getId={this.getId.bind(this)} emailTemplatesList={this.state.emailTemplatesList} />
																		{/*}) 
																		}*/}
																	</div>
																</div>
																<div className="saveTemplateWrapper col-lg-9 col-md-9 col-xs-12 col-sm-12">
																	<div className="defaultMsg">
																		<h1>Please Select The Template</h1>
																		<i className="fa fa-hand-o-left" aria-hidden="true"></i>
																	</div>
																	{this.state.emailTemplates ? <EmailTemplateRow deleteData={this.deleteData.bind(this)} getData={this.getData.bind(this)} getEmailData={this.getEmailData.bind(this)} emailtemplateValues={this.state.emailTemplates} /> : null}
																</div>
															</div>
														</div>
														<div id="notificationTemplates" className="tab-pane fade">
															<div className="">
																<div className="sidertemplatebar col-lg-3 col-md-3 col-xs-12 col-sm-12">
																	<div className="row">
																		<NotificationTemplateRow getNotificationId={this.getNotificationId.bind(this)} notificationTemplatesList={this.state.notificationTemplatesList} />
																	</div>
																</div>
																<div className="saveTemplateWrapper col-lg-9 col-md-9 col-xs-12 col-sm-12">
																	<div className="defaultNotification">
																		<h1>Please Select The Template</h1>
																		<i className="fa fa-hand-o-left" aria-hidden="true"></i>
																	</div>
																	{this.state.notificationTemplates ? <AllNotificationTemplateRow deleteData={this.deleteData.bind(this)} getNotiData={this.getNotiData.bind(this)} notificationtemplateValues={this.state.notificationTemplates} /> : null}
																</div>
															</div>
														</div>
														<div id="smsTemplates" className="tab-pane fade">
															<div className="">
																<div className="sidertemplatebar col-lg-3 col-md-3 col-xs-12 col-sm-12">
																	<div className="row">
																		<SMSTemplateRow getSmsId={this.getSmsId.bind(this)} smsTemplatesList={this.state.smsTemplatesList} />
																	</div>
																</div>
																<div className="saveTemplateWrapper col-lg-9 col-md-9 col-xs-12 col-sm-12">
																	<div className="defaultSMS">
																		<h1>Please Select The Template</h1>
																		<i className="fa fa-hand-o-left" aria-hidden="true"></i>
																	</div>
																	{this.state.smsTemplates ? <AllSMSTemplateRow deleteData={this.deleteData.bind(this)} getSmsData={this.getSmsData.bind(this)} smstemplateValues={this.state.smsTemplates} /> : null}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</section>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>

		);
	}
}
export default ViewTemplates;