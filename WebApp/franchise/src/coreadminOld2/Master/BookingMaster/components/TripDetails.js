import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		  from 'react-router-dom';
import swal                   from 'sweetalert';
import _                      from 'underscore';
import moment                   from 'moment';

import 'bootstrap/js/tab.js';
class TripDetails extends Component {
	
	constructor(props) {
      super(props);
    
      this.state = {
      	id : '',
        tripArray : [],
        loadMore: false,
        loadless: false
      };
      this.camelCase = this.camelCase.bind(this);
      this.isLoaded = false
    }
  componentWillReceiveProps(nextProps){
    	this.setState({
  			id : nextProps.personID,
        tripArray : nextProps.tripData
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
		        <div>
		            <div className="">	
                {
                  this.state.personInfo ?
                                   					  
					        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxshade nopadding">					   
					        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
  										<h5 className="titleprofileTD col-lg-8">Trip Details</h5>
    									<label className="col-lg-12 outStatioon">{this.state.tripArray.bookingType}</label>
                      <label className="col-lg-12 outStatioon">Pickup</label>
  										<ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
  											<li><i className="fa fa-user-o " aria-hidden="true"></i>&nbsp;&nbsp; Address : {this.state.tripArray.from}.</li>
  											<li><i className="fa fa-envelope " aria-hidden="true"></i>&nbsp;&nbsp;Datetime : {moment(this.state.tripArray.pickupDate).format('MMMM Do YYYY')} | {this.state.tripArray.pickupTime ? moment(this.state.tripArray.pickupTime).format('LT') : "--:--"}</li>
  										</ul> 
                      <label className="col-lg-12 outStatioon">Destination</label>
                      <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                        <li><i className="fa fa-user-o " aria-hidden="true"></i>&nbsp;&nbsp; Address :  {this.state.tripArray.to}.</li>
                      </ul>
                      <label className="col-lg-12 outStatioon">Return On</label>
                      <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                        <li><i className="fa fa-envelope " aria-hidden="true"></i>&nbsp;&nbsp; DateTime : {moment(this.state.tripArray.returnDate).format('MMMM Do YYYY')}, {this.state.tripArray.returnTime ? moment(this.state.tripArray.returnTime).format('LT') : "--:--"}</li>
                      </ul>
                      <label className="col-lg-12 outStatioon">Stop Details</label>
                      <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                        <li>
                        {this.state.tripArray.stopArr && 
                          this.state.tripArray.stopArr.length > 0 ?
                            this.state.tripArray.stopArr.map((data,index)=>{
                              return(<div key={index}><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp; {data.address}</div>)
                            })
                            :
                            
                          'NIL'
                        }
                        </li>
                      </ul>
                      {this.state.tripArray.purposeOfTravel ?
                        <div>
                      <label className="col-lg-12 outStatioon">Purpose of Travel</label>
                      <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                        <li><i className="fa fa-comment " aria-hidden="true"></i>&nbsp;&nbsp; {this.state.tripArray.purposeOfTravel ? this.state.tripArray.purposeOfTravel : "-"}</li>
                      </ul>
                      </div>
                      :
                      null
                      }
                      {this.state.tripArray.instructions ?
                      <div>
                      <label className="col-lg-12 outStatioon">Special Instructions</label>
                      <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                        <li><i className="fa fa-comment " aria-hidden="true"></i>&nbsp;&nbsp; {this.state.tripArray.instructions ? this.state.tripArray.instructions : "NIL"}</li>
                      </ul>
                      </div>
                      :null
                      }
									  </div>
					        </div>
                  :
                  null
                }
	             </div>
	         </div>
	       : null
	    );
	} 
}
export default withRouter(TripDetails); 
