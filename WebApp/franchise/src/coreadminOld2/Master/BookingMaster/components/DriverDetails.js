import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		  from 'react-router-dom';
import swal                   from 'sweetalert';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';
class DriverDetails extends Component {
	
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
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
                        <h5 className="titleprofileTD col-lg-8">Driver Details</h5>
                        <ul className="col-lg-8 col-md-5 col-sm-5 col-xs-5 listfontED ">
                          <li><i className="fa fa-user-o " aria-hidden="true"></i>&nbsp;&nbsp; Car Number :<span className="pull-right">3182312793</span></li>
                          <li><i className="fa fa-envelope " aria-hidden="true"></i>&nbsp;&nbsp;Driver Name  :<span className="pull-right">Mrs.Sagarika Jagtap</span></li>
                          <li><i className="fa fa-phone " aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Mobile :<span className="pull-right">989381311</span></li>
                        </ul>
                        <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 profileImage nopadding pull-right">
                          <img src="/images/passportPhoto.jpg"/>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <button className="col-lg-8 col-md-2 col-sm-12 col-xs-12 btn button3 trackCar" id="btnCheck" >
                            Track Car location on travel date.
                          </button>
                      </div>
                    </div>
                    
	             </div>
               :
               null
             }
	         </div>
        </div>
	    );
	} 
}
export default withRouter(DriverDetails); 
