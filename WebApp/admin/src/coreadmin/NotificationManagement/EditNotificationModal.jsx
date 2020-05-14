import React, { Component }       from 'react';
import {browserHistory} 		  from 'react-router';
import swal                       from 'sweetalert';
import $ 						  from 'jquery';
import axios 					  from 'axios';
import CKEditor 				  from "react-ckeditor-component";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';


class EditNotificationModal extends Component{

	constructor(props){
		super(props);
		this.state = {
	    'templateType' 		: props.data ? props.data.templateType : '',
		'templateName'		: props.data ? props.data.templateName : '',
		'subject'			: props.data ? props.data.subject : '',
		'content'			: props.data ? props.data.content : '',
	   	'optionA'			: '',
	   	'messageError' 		: '',
	   	shown 				: true,
	   	emailTemplatesList 			: "",
		notificationTemplatesList 	: "",
		smsTemplatesList 			: "",
	  };

	    this.handleChange = this.handleChange.bind(this);
	    this.onChange 		= this.onChange.bind(this);
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			'templateType' 		: nextProps.data.templateType,
			'templateName'		: nextProps.data.templateName,
			'subject'			: nextProps.data.subject,
			'content'			: nextProps.data.content,
		});
	}

	handleChange(event){
	  const target = event.target;
	  const name   = target.name;
	  this.setState({
	  	[name]: event.target.value,
	  });
	}


	deleteEmailTemplate(event){
	
	}

	updateNotificationEmail(event){
		event.preventDefault();

	    if(this.state.content){
	    	var editId 		 = this.props.emailNot;
			var templateType     = this.state.templateType;
			var templateName     = this.state.templateName;
			var subject          = this.state.subject;
			var cketext          = this.state.content;
			if(templateType === '-- Select --' || templateName === '--Select Template Name--'){
				swal({
					title: 'This field is required.',
					// text:"This field is required.",
					type: 'success',
					showCancelButton: false,
					confirmButtonColor: '#666',
					confirmButtonText: 'Ok'
				});
			}else{	
				var formValues = {
					"notificationmasterID":this.props.emailNot,
					"templateType": this.state.templateType,
					"templateName": this.state.templateName,
					"content": this.state.content,
					"subject":this.state.subject
				}
				axios.put('/api/masternotifications/put/'+editId, formValues)
				.then((response)=> {		
					 swal({
						title: "Template updated successfully",
						// text: "Template updated successfully",
					});		
					this.setState({
						shown : false,
					});
					if (templateType  === "Email") {
						this.props.emailGetData(editId)

					}
					if (templateType  === "Notification") {
						this.props.notiGetData(editId)

					}

					if (templateType  === "SMS") {
						this.props.smsGetData(editId)

					}

					
					$('#editNotifyModal-'+this.props.emailNot).hide();
				    $('.modal-backdrop').remove();
                   
						window.location.reload();
				})
				.catch((error)=> {
					 swal({
						title: "Sorry! Template can't update successfully",
						// text: "Sorry! Template can't update successfully",
					});
					this.setState({
						shown : false,
					});
				})
			}
		}else{
			this.setState({
				contentError: 'This field is required.',
			});
		}
    	// }
	}
	selectType(event){
		event.preventDefault();
		const target = event.target;
	  const name   = target.name;
	  this.setState({
	  	[name]: event.target.value,
	  });
	
	}
	
	updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }
    onChange(evt){
      var newContent = evt.editor.getData();
      this.setState({
        content: newContent
      },()=>{
      	if(this.state.content){
      		this.setState({
      			messageError : ''
      		});
      	}else{
      		this.setState({
      			messageError : 'This field is required'
      		});
      	}
      });
    }


	render() {
		if(this.props.emailNot){
	        return (
	        	<div>
	        		{this.state.shown === true ? 
					<div className="modal modalHide" id={"editNotifyModal-"+this.props.emailNot} role="dialog">
					  	<div className="modal-dialog modal-lg" role="document">
					    	<div className="modal-content modalContent col-lg-12 NOpadding">
					      		<div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
					        		<h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel">Edit Template</h4>
					        		<div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
								        <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
								          <span aria-hidden="true">&times;</span>
								        </button>
							        </div>
					      		</div>

					     		<div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
							        <form className="newTemplateForm" id="editModal" >
							         	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 forgtTextInp">
											<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpadding-left">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
													<div className="form-group">
													 	<label className="labelform">Template Type <span className="astrick">*</span></label>     						
												        	<select className="form-control templateType" disabled="disabled" name="templateType" id="templateType" onChange={this.selectType.bind(this)} value={this.state.templateType}>
													      	<option> -- Select --	</option>
															<option> Email 			</option>
															<option> Notification 	</option>
															<option> SMS 			</option>
												      	</select> 
													</div>	
												</div>
											</div>
											<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 rowPadding">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div className="form-group">
													 	<label className="labelform">Template Name <span className="astrick">*</span></label>     						
												       	<select name="templateName" disabled="disabled" value={this.state.templateName} onChange={this.handleChange} className="templateName form-control inputValid " required>
														  <option>--Select Template Name--</option>
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
										{this.state.templateType!='Notification' && this.state.templateType!='SMS' ?
											<div className="row rowPadding subjectRow col-lg-12 col-md-12 col-xs-12 col-sm-12">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div className="form-group">
													 <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 labelform">Subject <span className="astrick">*</span></label>     						
												        <input type="text" name="subject" value={this.state.subject} onChange={this.handleChange} className="subject col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" required/>
													</div>	
												</div>
											</div>
											:
											null
										}
										
										<div className="row rowPadding col-lg-12 col-md-12 col-xs-12 col-sm-12">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div className="form-group">
												 <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 labelform">Message <span className="astrick">*</span></label> 
												 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">  
												 	<CKEditor activeClass="p15" id="editor"  className="templateName" content={this.state.content} events={{"change": this.onChange}}/>
												 </div> 
												 			
												</div>	
												<label className="redFont">{this.state.messageError}</label>			
											</div>
										</div>
									</form>
							    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div>
										<button type="submit"  className="btn pull-right col-lg-2 col-md-3 col-sm-6 col-xs-12 submit" id={this.props.emailNot} onClick={this.updateNotificationEmail.bind(this)}>Update Template</button>
							   		</div>
							   	</div>
					      		</div>
					   		</div>
					  	</div>
					</div>
					:
					null
				}
				</div>
		    );
		}else{
			return (<div></div>);
		}
	} 

}
export default EditNotificationModal;