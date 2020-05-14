import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		      from 'react-router-dom';
import swal                   from 'sweetalert';
import TripDetails        	  from './TripDetails.js';
import EmployeeDetails        from './EmployeeDetails.js';
import CarDetails             from './CarDetails.js';
import EstimatedCost          from './EstimatedCost.js';
import ManagerApproval        from './ManagerApproval.js';
import DriverDetails          from './DriverDetails.js';
import FeedbackOnTrip         from './FeedbackOnTrip.js';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';
class SingleEmployeeDetails extends Component {
	
	constructor(props) {
      super(props);
    
      this.state = {
      	id : '',
        loadMore: false,
        loadless: false
      };
      // this.handleChange = this.handleChange.bind(this);
      this.isLoaded = false
    }
    componentWillReceiveProps(nextProps){
    	console.log("nextProps",nextProps)
    	this.setState({
  			id : nextProps.id
  		},()=>{

  			axios.get("/api/personmaster/get/one/"+this.state.id)
            .then((response)=>{
            	console.log("response",response);
              this.setState({
                  personInfo : response.data,
                  type : response.data.type
              },()=>{
              	
              	this.getAddress();
              	this.getContacts();
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
              	
              	this.getAddress();
              	this.getContacts();
              });
            })
            .catch((error)=>{
            })
  		})
  	}
  	getAddress(){
  		if(this.state.personInfo && this.state.personInfo.address ){
  			var address = this.state.personInfo.address;
  		}
  	}
  	getContacts(){
  		if(this.state.personInfo ){
  			var contacts = this.state.personInfo.contactPersons;
			
			this.setState({contacts : contacts },()=>{
				
			});
			
		}
  	}
  	LocationEdit(event){
    	this.props.history.push("/"+this.state.type+'/'+event.currentTarget.getAttribute('data-locationID'))
    	
    }
    
    contactEdit(event){
    	this.props.history.push("/"+this.state.type+'/contact-details/'+event.currentTarget.getAttribute('data-entityID')+'/'+event.currentTarget.getAttribute('data-locationID'))
    }

    showMore(event) { 
		$('.listProduct').addClass('showList');
		$('.listProduct').removeClass('hide');
		this.setState({
			'loadless':true,
		})
	}
	showLess(event) {
		$('.listProduct').addClass('hide');
		$('.listProduct').removeClass('showList');
		this.setState({
			'loadless':false,
		})
	}
	editBasicform(event){
    	this.props.history.push("/"+this.props.type+'/master/'+event.currentTarget.getAttribute('data-id'))
    }
    deleteEntity(event){
      event.preventDefault();
      // $('#deleteEntityModal').show();
      axios.delete("/api/personmaster/delete/"+event.currentTarget.getAttribute('data-id'))
            .then((response)=>{
              swal({
                    title : "Record deleted succesfully",
                  });
              window.location.reload();   
            })
            .catch((error)=>{
            })
    }
	render() {

       	return (	
       		this.state.personInfo ? 
		        <div>
		          <div className="row">	                   					  
					      <div id="supplierprofile" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxshade nopadding">					   
					        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleEmployeeDetails" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
									 <EmployeeDetails personID={this.state.id} />										
								  </div>
  								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleEmployeeDetails" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
  									<TripDetails personID={this.state.id} />										
  								</div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleEmployeeDetails" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
                    <CarDetails personID={this.state.id} />                    
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleEmployeeDetails" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
                    <EstimatedCost personID={this.state.id} />                    
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleEmployeeDetails" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
                    <ManagerApproval personID={this.state.id} />                    
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleEmployeeDetails" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
                    <DriverDetails personID={this.state.id} />                    
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleEmployeeDetails" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
                    <FeedbackOnTrip personID={this.state.id} />                    
                  </div>
                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                      <button className="col-lg-4 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" >
                        Book Trip
                      </button>
                    </div>
					      </div>
	            </div>
	         </div>
	        : null
	    );
	} 
}
export default withRouter(SingleEmployeeDetails); 
