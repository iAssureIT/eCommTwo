import React, { Component } from 'react';
import { render } from 'react-dom';
import swal                       from 'sweetalert';
import axios from 'axios';

export default class UMaddRoles extends Component {

    createRole(event){
    event.preventDefault();
    const formValues = {
      "role"     : this.refs.role.value,
      }

    axios.post('/api/roles/post', formValues)
      .then( (res)=>{
          swal("success", "Role added successfully" );
          this.refs.role.value = '';    
          this.props.getRoles()    
      })
      .catch((error)=>{
      });
  

    }

	render(){
       return(
       	<div>
					<form id="addroles" className="paddingLeftz noLRPad " onSubmit={this.createRole.bind(this)} >
						<div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-lg-offset-3 col-xs-12 col-sm-8">
							<label className="labelform">Enter Role </label><span className="astrick">*</span>
							<span className="blocking-span leftmar">
								<input type="text" id= "" className="rolesField form-control UMname inputText tmsUserAccForm" ref="role"  name="roleName" id="roleName"/>
							</span>
						</div>
					
					</form>
				</div>
								

	    );
	} 

}