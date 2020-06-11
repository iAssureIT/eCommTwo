import React, {Component}           from 'react';
import {render}                     from 'react-dom';
import $ from "jquery";
import CompanyInformation           from  '../Components/CompanyInformation.js';
import CompanyLocation              from  '../Components/CompanyLocation.js';
import '../css/CompanySetting.css';
import CompanyBankDetails           from  '../Components/CompanyBankDetails.js';
import CompanyTaxDetails            from  '../Components/CompanyTaxDetails.js';
import CompanyPaymentGateway        from  '../Components/CompanyPaymentGateway.js';
import CompanySMSGateway            from  '../Components/CompanySMSGateway.js';


import axios from 'axios';

 class GlobalMasters extends Component{
    constructor(props) {
		super(props)

		this.state = {
			companyinformation				: "Company Information",
      profileCreated            : false
		}
	
	}
  componentDidMount() {
    axios.get('/api/companysettings/')
    .then( (res)=>{   
      this.setState({profileCreated:true, companyInfo: res.data}) 
    })
    .catch((error)=>{
    });
  }
 
  handler(){
    axios.get('/api/companysettings/')
    .then( (res)=>{   
      this.setState({profileCreated:true, companyInfo: res.data}) 
    })
    .catch((error)=>{
    });
  }

  render() {
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="formWrapper">
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent ">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact NOpadding">
                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right ">
                        <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Global Masters</h4>
                    </div>
                  </div>     
                  <div className="boxMinHeight boxMinHeighttab addMarginTop">
                    <div  className="">
                      <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 noPadding"> 
                        
                          <ul className="nav nav-tabs tabs-left sideways">
                            {/*
                            <li className="active  col-lg-12 col-md-12 col-xs-12 col-sm-12" ><a className="tabLeft tablefthr lettersp" href="#companyInformation">Company Information</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12 disabled"><a className="tabLeft lettersp tablefthr">Location Details</a></li>
                            */}
                            <li className=" active col-lg-12 col-md-12 col-xs-12 col-sm-12" ><a className="tabLeft lettersp tablefthr" href="#CompanyBankDetails" data-toggle="tab">Bank Details</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12" ><a className="tabLeft lettersp tablefthr" href="#CompanyTaxDetails" data-toggle="tab">Tax Information</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#CompanyPaymentGateway" data-toggle="tab">Payment Gateway</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#SMSGateway" data-toggle="tab">SMS Gateway</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#AmazonS3" data-toggle="tab">Amazon S3</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="/location-type" >Location Types</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="/department" >Department</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="/designation" >Designation</a></li>
                          
                          </ul>
                        
                        
                      </div>
                      <div className="tab-content col-lg-9 col-md-9 col-xs-12 col-sm-12">
                        {/*
                        <div className="tab-pane " id="companyInformation"> <CompanyInformation companyInfo={this.state.companyInfo} handler={this.handler.bind(this)}/> </div>
                        <div className="tab-pane marginTopM" id="CompanyLocation"> <CompanyLocation companyInfo={this.state.companyInfo}/> </div>
                        */}
                        <div className="tab-pane active" id="CompanyBankDetails"> <CompanyBankDetails companyInfo={this.state.companyInfo}/> </div>                               
                        <div className="tab-pane" id="CompanyTaxDetails"> <CompanyTaxDetails/> </div>
                        <div className="tab-pane" id="CompanyPaymentGateway"> <CompanyPaymentGateway/> </div>                              
                        <div className="tab-pane" id="SMSGateway"> <CompanySMSGateway /> </div>                              
                        <div className="tab-pane" id="AmazonS3">  </div>                              
                        <div className="tab-pane" id="LocationTypes">  </div>                              
                        <div className="tab-pane" id="Department"></div>                              
                        <div className="tab-pane" id="Designation">  </div>                              
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
export default GlobalMasters;