import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		  from 'react-router-dom';
import swal                   from 'sweetalert';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';
class EmployeeDetails extends Component {
	
	constructor(props) {
      super(props);
    
      this.state = {
      	id : '',
        loadMore: false,
        loadless: false
      };
      // this.handleChange = this.handleChange.bind(this);
        this.camelCase = this.camelCase.bind(this);
      this.isLoaded = false
    }
    componentWillReceiveProps(nextProps){
    	this.setState({
  			id : nextProps.personID
  		},()=>{

  			axios.get("/api/personmaster/get/one/"+this.state.id)
            .then((response)=>{
              this.setState({
                  personInfo : response.data,
                  // type : response.data.type
              },()=>{
              });
            })
            .catch((error)=>{
            })
  		})
    }
	componentDidMount(){
		
		this.setState({
  			id : this.props.id
  		},()=>{

  			axios.get("/api/personmaster/get/one/"+this.state.id)
            .then((response)=>{
          	
              this.setState({
                  personInfo : response.data,
                  type : response.data.type
              },()=>{
              	
              
              });
            })
            .catch((error)=>{
            })
  		})
  	}
 
    camelCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
	render() {

       	return (	
       			this.state.personInfo ? 
		        <div>
		            <div className="">	                   					  
					        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxshade nopadding">					   
					        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
									
										<h5 className="titleprofileTD col-lg-8">Employee Details</h5>
										
										<ul className="col-lg-8 col-md-5 col-sm-5 col-xs-5 listfontED ">
											<li><i className="fa fa-user-o " aria-hidden="true"></i>&nbsp;&nbsp; Employee ID :<span className="pull-right">{this.state.personInfo.employeeId}</span></li>
											<li><i className="fa fa-envelope " aria-hidden="true"></i>&nbsp;&nbsp;Name :<span className="pull-right">{this.state.personInfo.firstName} {this.state.personInfo.lastName}</span></li>
											<li><i className="fa fa-phone " aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Mobile :<span className="pull-right">{this.state.personInfo.contactNo}</span></li>
										</ul>
										<div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 profileImage nopadding pull-right">
											<img src={this.state.personInfo.profilePhoto && this.state.personInfo.profilePhoto.length > 0 ? this.state.personInfo.profilePhoto[0] : "/images/passportPhoto.jpg"}/>
										</div>
									</div>
					        	
					        </div>
	                  	  </div>
	            </div>
	            : null
	    );
	} 
}
export default withRouter(EmployeeDetails); 
