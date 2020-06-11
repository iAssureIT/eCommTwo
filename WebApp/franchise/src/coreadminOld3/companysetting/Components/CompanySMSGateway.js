import React, { Component } from 'react';
import { render }           from 'react-dom';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';

class CompanySMSGateway extends Component{
   constructor(props) {
    super(props);
    this.state = {
      authID : '',
      authToken : ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    const {name,value} = event.target;
    this.setState({ 
      [name]:value
    });
  }

  submitSMSInfo(event){
    event.preventDefault();
    if (this.state.authID && this.state.authToken) {
      
      var formValues = {
        authID : this.state.authID,
        authToken : this.state.authToken,
        updatedBy : localStorage.getItem("user_ID")
      }
      axios.patch('/api/globalmaster/SMS',formValues)
        .then((response) =>{
              swal({
                    title: "SMS Info is added successfully!",
                    text: "SMS Info is added successfully!",
              });
            this.setState({
              authID:'',
              authToken:''
            })
        })
        .catch((error)=> {
          swal({
                    title: "Failed to add SMS info!",
                    text: "Failed to add SMS info!",
              });
        })
    }else{
      swal("All fields are required")
    }
  }

  render(){
    return(
      <div className="">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h4 className="">SMS Gateway</h4>
            </div>
               <hr className="compySettingHr" />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanySMSGatewayForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 nopadding">
                    <div className="form-group formht pdcls">
                        <div className="form-group margin15">
                            <label className="labelform" >Auth ID</label><span className="astrick">*</span>
                            <input value={this.state.authID} onChange={this.handleChange} data-text="AuthID" type="text" id="authID" title="Please enter valid AuthID" name="authID" className="form-control CLcompanyAddress inputValid " required/>
                        </div>
                    </div> 
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 nopadding">
                    <div className="form-group formht pdcls">
                        <div className="form-group margin15">
                            <label className="labelform" >Auth Token</label><span className="astrick">*</span>
                            <input value={this.state.authToken} onChange={this.handleChange} data-text="blockName" type="text" id="authToken" title="Please enter valid Auth Token" name="authToken" className="form-control CLcompanyAddress inputValid " required/>
                        </div>
                    </div> 
                  </div>
               
                </div>
                
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                  <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" onClick={this.submitSMSInfo.bind(this)}>
                    Submit
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      );
  }

 }

 export default CompanySMSGateway;