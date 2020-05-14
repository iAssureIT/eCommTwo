import React, { Component } from 'react';
import { render }           from 'react-dom';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';

class CompanyPaymentGateway extends Component{
   constructor(props) {
    super(props);
    this.state = {
   
      submitVal      : true,
      subscription : {
        
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    var array = [];
    var allCB = document.querySelectorAll("[class='companyNamechkbx']");
    for(var i=0; i< allCB.length; i++){
      if (allCB[i].checked) {
       array.push(allCB[i].value);
      }
    }
    this.setState({ arrayValues : array });

  }
  submitPaymentInfo(event){
    event.preventDefault();
    if (this.state.arrayValues.length>0) {
      var paymentInfo = [];
      this.state.arrayValues.map((data,index)=>{
        paymentInfo.push({[data]:true})
      })
      
      var formValues = {
        paymentInfo : paymentInfo
      }
      axios.patch('/api/companysettings/addPaymentInfo',formValues)
        .then(function (response) {
            if (response.status === 200) {
              swal({                    
                    text: "Payment Info added successfully!",
              });
            }
        })
        .catch(function (error) {
          swal({                    
                    text: "Failed to add payment info!",
              });
        })
    }
  }

  render(){
    return(
      <div className="">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h4 className="">Payment Gateway</h4>
            </div>
               <hr className="compySettingHr" />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanyPaymentGatewayForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyNamechkbx" value="cashOnDelivery" onChange={this.handleChange.bind(this)}/>
                        <label className="labelform" >Cash on Delivery</label><span className="astrick"></span>
                    </div>  
                  </div>

                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyNamechkbx"  value="paytm" onChange={this.handleChange.bind(this)}/>
                      <label className="labelform" >Paytm</label><span className="astrick"></span>
                    </div>  
                  </div>
               
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyName" value="UPI" onChange={this.handleChange.bind(this)}/>
                      <label className="labelform" >UPI</label><span className="astrick"></span>
                    </div> 
                  </div>
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyName" value="bankTransfer"  onChange={this.handleChange.bind(this)}/>
                      <label className="labelform" >Bank Transfer</label><span className="astrick"></span>
                    </div> 
                  </div>
                  
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                { this.state.arrayValues && this.state.arrayValues.length>0 ? 
                  <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" onClick={this.submitPaymentInfo.bind(this)}>
                    { this.state.submitVal ? "Submit" : "Update" }  
                  </button>
                  : 
                  <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right"  id="disabledbtnCheck" disabled onClick={this.submitPaymentInfo.bind(this)}>
                    { this.state.submitVal ? "Submit" : "Update" }  
                  </button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>

      );
  }

 }

 export default CompanyPaymentGateway;