import React, { Component } 		 	 from 'react';
import CreateUser 					     from './CreateUser.js';
import axios                       		 from 'axios';
import _                       			 from 'underscore';
import swal                     		 from 'sweetalert';
import $ 								 from 'jquery';
import moment               			 from 'moment';
import IAssureTableUM 					 from '../../IAssureTableUM/IAssureTable.jsx';
import  UMDelRolRow 					 from './UMDelRolRow.jsx';
import  UMAddRolRow 					 from './UMAddRolRow.jsx';
import  UMSelectRoleUsers 				 from './UMSelectRoleUsers.jsx';
import './userManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
class UMListOfUsers extends Component {
	constructor(props){
		super(props);
		this.state = {
		 	allPosts : [],
		 	"twoLevelHeader"    : {
                apply           : false,
            },
             "tableHeading"     : {
                fullName        : 'User Details',
                status        	: 'Status',
				roles        	: 'Role',
				createdAt 		: 'Registered Since',
				actions        	: 'Action',
			},
			"tableObjects" 		: {
				paginationArray : true
			},
            "startRange"        : 0,
            "limitRange"        : 10, 
            blockActive			: "all",
            "listofRoles"	    : "",
            adminRolesListData  : [],
            checkedUser  : [],
            activeswal : false,
            blockswal : false,
            confirmDel : false,
            unCheckedUser:false
		}
    	this.handleChange  = this.handleChange.bind(this);
			
	}
	handleChange(event){
	  	event.preventDefault();
        const target = event.target;
        const name   = target.name;  
    }
	componentDidMount(){
		this.getRole();
		var data = {
			"startRange"        : this.state.startRange,
            "limitRange"        : this.state.limitRange, 
		}
		this.getData(this.state.startRange, this.state.limitRange)
	}
	getData(startRange, limitRange){    
		var data = {
			"startRange"        : parseInt(startRange),
            "limitRange"        : parseInt(limitRange), 
		}    
       axios.post('/api/users/get/list', data)
        .then( (res)=>{  
        	console.log("Rea=>",res);
        	var tableData = res.data.map((a, i)=>{
				return {
					_id 			: a._id,
					fullName        : '<p>'+a.fullName+'</p>'+'<p>'+a.email+'</p>'+'<p>'+a.mobNumber+'</p>',
	                status        	: a.status,	
					roles 			: a.role.map((b,j)=> '  <span>'+b+' </span>').toString(),
					createdAt 		: moment(a.createdAt).format("DD-MMM-YYYY")
				}
			})
        	
          	this.setState({
              completeDataCount : res.data.length,
              tableData 		: tableData,          
            })
        })
	    .catch((error)=>{
	    }); 
    }
    getSearchText(searchText, startRange, limitRange){
		console.log('jkhk')
        var data = {
			searchText: searchText,
			startRange: startRange,
			limitRange: limitRange
		}
		axios.post('/api/users/get/searchlist',data)
		.then((res)=>{
			console.log('res', res.data);
			var tableData = res.data.map((a, i)=>{
				return {
					_id 			: a._id,
					fullName        : '<p>'+a.fullName+'</p>'+'<p>'+a.email+'</p>'+'<p>'+a.mobNumber+'</p>',
	                status        	: a.status,	
					roles 			: a.role.map((b,j)=> '  <span>'+b+' </span>').toString(),
					createdAt 		: moment(a.createdAt).format("DD-MMM-YYYY")
				}
			})
			console.log('tableData', tableData);
          	this.setState({
              completeDataCount : res.data.length,
              tableData 		: tableData,          
            })
		})
		.catch((error)=>{
		})
        this.setState({
            tableData : []
        });
    }
	activeSelected(checkedUsersList){
		function updateStatus(formValues){
		  return new Promise(function(resolve,reject){
		    axios
		    .patch('/api/users/patch/status/'+formValues.selectedUser,formValues)
		    .then((response)=> {
		        resolve(response);
		    })
		    .catch(function (error) {
		    })
		  })
		}
		function getUserDetails(selectedId){
          return new Promise(function(resolve,reject){
            axios
    	 	.get('/api/users/get/'+selectedId)
            .then((response)=> {
            	resolve(response);
        	})
            .catch(function (error) {
            })
          })
        }
        function sendMail(inputObj){
		  return new Promise(function(resolve,reject){
		    axios
		    .post('/api/masternotification/send-mail',inputObj)
		    .then((response)=> {
		        resolve(response);
		    })
		    .catch(function (error) {
		    })
		  })
		}
		mainActive().then(response => {
		    if(response){
		        this.setState({
		            activeswal : true,
		            checkedUser : [],
		            unCheckedUser : true
		        },()=>{
					$('#userListDropdownId').removeAttr('disabled');
		            this.refs.userListDropdown.value = '-'
		            this.getData(this.state.startRange,this.state.limitRange)
		            checkedUsersList = [];
		            if(this.state.activeswal === true)
		            {
		             swal("abc","Account activated successfully");
		            }
		        }); 
		    }
		});
		async function mainActive(){
		    var count = 0
		    for(var i=0;i<checkedUsersList.length;i++){
		        var selectedId = checkedUsersList[i];
		        var formValues ={
		            selectedUser : selectedId,
		            status : 'active',
		        }

		      var response = await updateStatus(formValues)
		      if(response){
		        var user = await getUserDetails(selectedId)
		        if(user){
		            var currentUrl = window.location.hostname
		            var url = currentUrl==='localhost'?'http://localhost:3001/':currentUrl==='qalmiscentre.iassureit.com'?'http://qalmiscentre.iassureit.com/':'http://uatlmiscenter.iassureit.com/'
		            var msgvariable = {
		                '[User]'    : user.data.firstname + ' ' +user.data.lastname,
		                '[user_email_id]' : user.data.email,
		                '[center_application_URL]' : url
		            }
		            var inputObj = {  
		                to           : user.data.email,
		                templateName : 'User - Login Account Activation',
		                variables    : msgvariable,
					}
					while((checkedUsersList.length - 1) === i){
						return Promise.resolve(true);
						}
		        
		        }
		      }
		    }
		}
	}
	blockSelected(checkedUsersList){
		console.log('checkedUsersList', checkedUsersList);
		function updateStatus(formValues){
			console.log('formValues', formValues);
		  return new Promise(function(resolve,reject){
		    axios
		    .patch('/api/users/patch/status/'+formValues.selectedUser,formValues)
		    .then((response)=> {
		        resolve(response);
		    })
		    .catch(function (error) {
		    })
		  })
		}
		function getUserDetails(selectedId){
          return new Promise(function(resolve,reject){
            axios
    	 	.get('/api/users/get/'+selectedId)
            .then((response)=> {
            	resolve(response);
        	})
            .catch(function (error) {
            })
          })
        }
        function sendMail(inputObj){
		  return new Promise(function(resolve,reject){
		    axios
		    .post('/api/masternotification/send-mail',inputObj)
		    .then((response)=> {
		        resolve(response);
		    })
		    .catch(function (error) {
		    })
		  })
		}
		mainBlock().then(response => {
			console.log('res', response);
			if(response){
            	this.setState({
				  	blockswal : true,
				  	checkedUser : [],
				  	unCheckedUser : true
				},()=>{
					$('#userListDropdownId').removeAttr('disabled');
					this.refs.userListDropdown.value = '-'
					this.getData(this.state.startRange,this.state.limitRange)
					checkedUsersList = []	
					if(this.state.blockswal === true)
				   	{
				   		swal("Account blocked successfully");
				   	}	
				})
			}
          //here you can update your collection with axios call
        });
		async function mainBlock(){
			var count = 0
		    for(var i=0;i<checkedUsersList.length;i++){
		        var selectedId = checkedUsersList[i];
		        var formValues ={
		            selectedUser : selectedId,
		            status : 'blocked',
		        }
		      var response = await updateStatus(formValues);
		      if(response){
				var user = await getUserDetails(selectedId);
		        if(user){
		            var msgvariable = {
		                '[User]'    : user.data.firstname + ' ' +user.data.lastname,
		                '[user_email_id]' : user.data.email
		            }
		            var inputObj = {  
		                to           : user.data.email,
		                templateName : 'User - Login Account Blocked',
		                variables    : msgvariable,
					}
					while((checkedUsersList.length - 1) === i){
					return Promise.resolve(true);
					}
						// var mail = await sendMail(inputObj)
						// if(mail){
						// 	count++
						//     if(count===checkedUsersList.length){
						//         return Promise.resolve(true);
						//     }
						// }
		        }
		      }
		    }
		}	
	}
	adminUserActions(event){
		event.preventDefault();
		$('#userListDropdownId').attr('disabled','true')
		var checkedUsersList = this.state.checkedUser;
			
		if( checkedUsersList.length > 0 ){
			var selectedValue        = this.refs.userListDropdown.value;
			var keywordSelectedValue = selectedValue.split('$')[0];
			var role                 = selectedValue.split('$')[1];

			switch(keywordSelectedValue){
				case '-':
				$('#userListDropdownId').removeAttr('disabled')
			    break;

				case 'block_selected':
				    this.blockSelected(checkedUsersList);
				break;

				case 'active_selected':
				    this.activeSelected(checkedUsersList)  
				break;

				case 'cancel_selected':
				    for(var i=0;i< checkedUsersList.length;i++){
					  	var selectedId = checkedUsersList[i];
					  	const token = '';
					  	const url = '/api/users/delete/'+selectedId ;
						const headers = {
						    "Authorization" : token,
						    "Content-Type" 	: "application/json",
						};
						axios({
							method: "DELETE",
							url : url,
							headers: headers,
							timeout: 3000,
							data: null,
						})
						.then((response)=> {
					    	this.setState({
							  	checkedUser : [],
							  	unCheckedUser : true
							},()=>{
								$('#userListDropdownId').removeAttr('disabled');
								this.refs.userListDropdown.value = '-'
								this.getData(this.state.startRange,this.state.limitRange)
								checkedUsersList = []
				          		swal("User(s) Deleted Successfully");
							})
						}).catch((error)=> {
						});
				    }  
				break;

				case 'add':
					var changed = 0
				    for(var i=0;i< checkedUsersList.length;i++){
					  	var selectedId = checkedUsersList[i];
					  	var formValues ={
					  	 	userID : selectedId,
					  	 	role   : role,
					  	}

					  	axios
				       .patch('/api/users/patch/role/assign/'+selectedId,formValues)
				       .then(
				        (res)=>{
					        this.setState({
							  	checkedUser : [],
							  	unCheckedUser : true
							},()=>{
								if(res.data&&res.data==='USER_ROLE_ASSIGNED'){
						          	changed++
						        }
								$('#userListDropdownId').removeAttr('disabled')
								this.refs.userListDropdown.value = '-'
								this.getData(this.state.startRange,this.state.limitRange)
								checkedUsersList = []	
				          		swal("abc",changed + " Records(s) Updated Successfully");
							})
				        }).catch((error)=>{ 
				        });
				    }  
				break;

				case 'remove':
					var changed = 0
					for(var i=0;i< checkedUsersList.length;i++){
					  	var selectedId = checkedUsersList[i];
					  	var formValues ={
					  	 	userID : selectedId,
					  	 	role   : role,
					  	}
			
				  	 	axios.patch('/api/users/patch/role/remove/'+selectedId,formValues)
				      	.then(
				        (res)=>{
				          	this.setState({
							  	checkedUser : [],
							  	unCheckedUser : true
							},()=>{
					          	if(res.data && res.data==='USER_ROLE_REMOVED'){
						          	changed++
						        }
								$('#userListDropdownId').removeAttr('disabled');
								this.refs.userListDropdown.value = '-'
								this.getData(this.state.startRange,this.state.limitRange)
								checkedUsersList = []	
				          		swal("abc",changed + " Records(s) Updated Successfully");
							})			
				        }).catch((error)=>{ 
				        });
				    }  
				break;
			}
		}else{
			this.refs.userListDropdown.value = '-'
			$('#userListDropdownId').removeAttr('disabled');
			swal({
    			title:'abc',
    			text:"Please select atleast one user."
    		});
		}
	}
	selectedRole(event){
				event.preventDefault();
				var selectedValue        = this.refs.roleListDropdown.value;
				var keywordSelectedValue = selectedValue.split('$')[0];
					var formValues ={
						searchText : selectedValue,
					}

					if(selectedValue === "all"){
						this.getData(this.state.startRange, this.state.limitRange)
					}else{
						var data = {
							"startRange"        : this.state.startRange,
							"limitRange"        : this.state.limitRange, 
						}
						axios.post('/api/users/get/list/role/'+keywordSelectedValue, data)
					      .then(
					        (res)=>{
					          
								var tableData = res.data.map((a, i)=>{
									return {
										_id 			: a._id,
										fullName        : a.fullName,
										emailId    		: a.email,
										mobNumber    	: a.mobNumber, 
										status        	: a.status,	
										roles 			: a.role.map((b,j)=> '  <span>'+b+' </span>').toString(),
										createdAt 		: moment(a.createdAt).format("DD-MMM-YYYY")
									}
								})
					          	this.setState({
					              tableData 		: tableData,          
					            }) 
					        }).catch((error)=>{ 
					            swal("abc", "Sorry there is no data of "+selectedValue,"");
					      });

					}

				    
	}
	selectedStatus(event){
			event.preventDefault();

			var selectedValue        = this.refs.blockActive.value;
				var keywordSelectedValue = selectedValue.split('$')[0];
					var formValues ={
						searchText : selectedValue,
					}

					if(selectedValue === "all"){
							this.getData(this.state.startRange, this.state.limitRange)

					}else{
						var data = {
							"startRange"        : this.state.startRange,
							"limitRange"        : this.state.limitRange, 
						}
						 axios.post('/api/users/get/list/status/'+selectedValue,data)
				      	.then(
				        (res)=>{
							var tableData = res.data.map((a, i)=>{
								return {
									_id 			: a._id,
									fullName        : a.fullName,
									emailId    		: a.email,
									mobNumber    	: a.mobNumber, 
									status        	: a.status,	
									roles 			: a.role.map((b,j)=> '  <span>'+b+' </span>').toString(),
									createdAt 		: moment(a.createdAt).format("DD-MMM-YYYY")
								}
							})
				          	this.setState({
				              tableData 		: tableData,          
				            })
				        }).catch((error)=>{ 
				        	swal("abc", "Sorry there is no data of "+selectedValue, );
				      });
					}

				    

	}
	confirmDel(event){
		this.setState({
			confirmDel : true,
		})
		window.location.reload(); 
	}
	setunCheckedUser(value){
		this.setState({
			unCheckedUser : value,
		})
	}
	selectedUser(checkedUsersList){
		this.setState({
			checkedUser : checkedUsersList,
		})
	}
	getRole(){
		axios({
		  method: 'get',
		  url: '/api/roles/get/list',
		}).then((response)=> {
		    this.setState({
		      adminRolesListData : response.data
		    },()=>{
		    })
		}).catch(function (error) {
		});
	}
	camelCase(str){
	return str
	.toLowerCase()
	.split(' ')
	.map(word => word.charAt(0).toUpperCase() + word.slice(1))
	.join(' ');
	}
	close(event){
		// event.preventDefault();
		var modal = document.getElementById("deleteModal");
		modal.style.display = "none";
		$('.modal-backdrop').remove();
		console.log('gjhgjjh');
	  }
render(){
	var adminRolesListDataList = this.state.adminRolesListData;
     return(
     	<div className="container-fluid">
	        <div className="row">
		        <div className="formWrapper">
		            <section className="content">
		                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent ">
			                <div className="row">
					            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
					                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageHeader">
					                  User Management
					                </div>
					                <hr className="hr-head container-fluid row"/>
					            </div>   	
								<div className="modal-bodyuser">
							        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 "  id="createmodalcl">
											<button type="button" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 addexamform userbtn clickforhideshow" data-toggle="modal" data-target="#CreateUserModal"><i className="fa fa-plus" aria-hidden="true"></i><b>&nbsp;&nbsp;&nbsp; Add User</b></button>
										    <CreateUser getData={this.getData.bind(this)}/>
										</div>
									</div>
							        <form className="newTemplateForm">
										<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 usrmgnhead">
											<div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
												<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12  NOpadding-left text-left labelform">Select Action</label>
												<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" id="userListDropdownId" ref="userListDropdown" name="userListDropdown" onChange={this.adminUserActions.bind(this)}>
													<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="-" name="userListDDOption" disabled="disabled" selected="true">-- Select --</option>	
													<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="block_selected" name="userListDDOption">Block Selected</option>	
													<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="active_selected" name="userListDDOption">Active Selected</option>
													<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="cancel_selected" name="userListDDOption">Delete Selected Acccounts</option>	
													{ 	adminRolesListDataList.map( (rolesData,index)=>{
															if(rolesData.role !== 'corporate' && rolesData.role !== 'vendor' && rolesData.role !== 'employee' && rolesData.role !== 'driver' && rolesData.role !== 'guest'){
																return (<UMAddRolRow key={index} roleDataVales={rolesData.role}/>);
															}
													  	})
													}
													{ adminRolesListDataList.map( (rolesData,index)=>{
															if(rolesData.role !== 'corporate' && rolesData.role !== 'vendor' && rolesData.role !== 'employee' && rolesData.role !== 'driver' && rolesData.role !== 'guest'){
																return ( <UMDelRolRow key={index} roleDataVales={rolesData.role}/>);
															}
														})
													}
												</select>
											</div> 	
											<div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
												<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left text-left labelform">Select Role</label>
												<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" ref="roleListDropdown" name="roleListDropdown" onChange={this.selectedRole.bind(this)} >
													<option name="roleListDDOption" disabled="disabled" selected="true">-- Select --</option>
													<option value="all" name="roleListDDOption">Show All</option>		
													
													{ adminRolesListDataList.map( (rolesData,index)=>{
														return <UMSelectRoleUsers  key={index} roleDataVales={rolesData.role}/>
													  }) 
													}
												</select>
											</div>
											<div className="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6">
												<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left text-left labelform">Select Status</label>
												<select className=" col-col-lg-12  col-md-12 col-sm-12 col-xs-12 noPadding  form-control " ref="blockActive"  name="blockActive" onChange={this.selectedStatus.bind(this)}>
													<option disabled="disabled" selected="true">-- Select --</option>	
													<option value="all"	>Show All</option>	
													<option value="blocked">Blocked</option>	
													<option value="active">Active </option>	
												</select>
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<IAssureTableUM
	  										  completeDataCount={this.state.completeDataCount}
						                      twoLevelHeader={this.state.twoLevelHeader} 
						                      getData={this.getData.bind(this)} 
						                      tableHeading={this.state.tableHeading} 
											  tableData={this.state.tableData} 
											  tableObjects={this.state.tableObjects}
						                      getSearchText={this.getSearchText.bind(this)}
						                      selectedUser={this.selectedUser.bind(this)} 
						                      setunCheckedUser={this.setunCheckedUser.bind(this)} 
						                      unCheckedUser={this.state.unCheckedUser}
											/>			
										</div>
										<div className="modal col-lg-12 col-md-12 col-sm-12 col-xs-12" id="deleteModal"  role="dialog">
						                    <div className=" modal-dialog adminModal adminModal-dialog">
						                         <div className="modal-content adminModal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
						                                <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
											        		<h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel"></h4>
											        		<div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
														        <button type="button" className="adminCloseButton close" onClick={this.close.bind(this)} data-dismiss="modal" aria-label="Close">
														          <span aria-hidden="true">&times;</span>
														        </button>
													        </div>
											      		</div>
						                              <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">

						                                 <h4 className="blackFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 examDeleteFont">Are you sure you want to delete this User?</h4>
						                              </div>
						                              
						                              <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
						                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
						                                        <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
						                                   </div>
						                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
						                                        <button  onClick={this.confirmDel.bind(this)} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
						                                   </div>
						                              </div>
						                         </div>
						                    </div>
						               </div>
									</form>
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


export default UMListOfUsers;