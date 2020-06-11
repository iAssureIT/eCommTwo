import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		  from 'react-router-dom';
import swal                   from 'sweetalert';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';
class ManagerApproval extends Component {
	
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
                        <h5 className="titleprofileTD col-lg-8">Manager Approval</h5>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                          <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 approvedImg">
                              <img src="/images/approved.png"/>
                          </div>
                          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 approvedImg">
                            <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                              <li>Approved On</li>
                              <li>1/1/2020 3:30 PM</li>
                              <li>John Doe</li>
                              <li>+91 99223 45678</li>
                            </ul> 
                          </div>
                        </div>
                      </div>
                      :
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
                        <h5 className="titleprofileTD col-lg-8">Manager Approval</h5>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <button className="col-lg-4 col-md-2 col-sm-12 col-xs-12 btn button3 acceptTrip" id="btnCheck" >
                            Reject This Trip
                          </button>
                          <button className="col-lg-4 col-lg-offset-1 col-md-2 col-sm-12 col-xs-12 btn button3 rejectTrip" id="btnCheck" >
                            Accept This Trip
                          </button>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <textarea rows="4" cols="60" className="customTextArea" placeholder="Add your remark here"></textarea> 
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
export default withRouter(ManagerApproval); 
