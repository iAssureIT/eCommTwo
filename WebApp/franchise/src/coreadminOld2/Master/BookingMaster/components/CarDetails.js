import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		  from 'react-router-dom';
import swal                   from 'sweetalert';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';
class CarDetails extends Component {
	
	constructor(props) {
      super(props);
    
      this.state = {
      	id : '',
        loadMore: false,
        loadless: false
      };
      this.camelCase = this.camelCase.bind(this);
      this.isLoaded = false
    }
  componentWillReceiveProps(nextProps){
    	this.setState({
  			id : nextProps.personID,
        tripArray: nextProps.tripData
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
  										<h5 className="titleprofileTD col-lg-8">Car Details</h5>
  										<ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
  											<li><i className="fa fa-car" aria-hidden="true"></i>&nbsp;&nbsp; {this.state.tripArray.selectedVehicle} | Honda City CIVIC | 4+1 | Ac </li>
  										</ul> 
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
export default withRouter(CarDetails); 
