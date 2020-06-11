import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		  from 'react-router-dom';
import swal                   from 'sweetalert';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';
class FeedbackOnTrip extends Component {
	
	constructor(props) {
      super(props);
    
      this.state = {
      	id : '',
        loadMore: false,
        loadless: false,
        hasApproved : true,
      };
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
		            <div className="row">	
                {
                  this.state.personInfo ?

					        <div id="supplierprofile" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxshade nopadding">					   
					        	{
                      this.state.hasApproved ?
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
                        <h5 className="titleprofileTD col-lg-8">Feedback on this Trip</h5>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                            <textarea rows="4" cols="60" className="customTextArea" placeholder="Your feedback here"></textarea> 
                        </div>
                      </div>
                      :
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
                        <h5 className="titleprofileTD col-lg-8">Feedback on this Trip</h5>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <label className="">Excellent service by Driver Sagarika Jagtap.</label> 
                        </div>
                      </div>
                    }
					        </div>
                  :
                  null
                }
	             </div>
	         </div>
	    );
	} 
}
export default withRouter(FeedbackOnTrip); 
