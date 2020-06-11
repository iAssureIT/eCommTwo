import React, { Component } from 'react';
import { render }           from 'react-dom';
import $ from "jquery";
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';

const formValid = formerrors=>{
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }

const taxTypeRegex  = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const taxrateRegex = RegExp(/^[a-zA-Z0-9\s,'/.-]*$/);


class CompanyTaxDetails extends Component{
   constructor(props) {
    super(props);
    this.state = {
      taxRating   : '',
      taxType     : '',
      effectiveFrom   : '',
      submitVal      : true,
      formerrors :{
        companytaxType   : "" ,
        companytaxrate   : "",
      },
      subscription : {
        
      }

    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ companyId : nextProps.companyInfo._id })
    if (nextProps.companyInfo && nextProps.companyInfo.taxSettings.length>0 ) {
      this.setState({
        submitVal             : false,  
        taxId                 : nextProps.companyInfo.taxSettings[0]._id,
        taxType               : nextProps.companyInfo.taxSettings[0].taxType,
        taxRating             : nextProps.companyInfo.taxSettings[0].taxRating,
        effectiveFrom         : moment(nextProps.companyInfo.taxSettings[0].effectiveFrom).format('YYYY-MM-DD')
      });
    }
  }
  componentDidMount() {
    $.validator.addMethod("regxtax", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid tax rate.");

    $("#CompanyTaxDetailsForm").validate({
    rules: {
      taxType: {
        required: true,
      },
      taxRating: {
        required: true,
        regxtax: /^[0-9]*$/
      },
      effectiveFrom: {
        required: true,
      }
    }
    });
  }
  submitCompanyInformation(event){
    event.preventDefault();
   
    var companytaxinfo = {
      companyId             : this.state.companyId,
      taxRating             : this.state.taxRating,
      taxType               : this.state.taxType,
      effectiveFrom         : this.state.effectiveFrom,
    }//close array

    var updatedtaxinfo = {
      companyId             : this.state.companyId,
      taxId                 : this.state.taxId,
      taxRating             : this.state.taxRating,
      taxType               : this.state.taxType,
      effectiveFrom         : this.state.effectiveFrom,
    }//close array

    if($("#CompanyTaxDetailsForm").valid()){
      if (this.state.submitVal) {
        axios.patch('/api/companysettings/taxSettings',companytaxinfo)
        .then(function (response) {
          if(response.status === 200)
          {
          swal({
                  title: "Tax details is added successfully!",
                  text: "Tax details is added successfully!",
          });
          }   
        })
        .catch(function (error) {
          swal({
                  title: "Failed to add tax details!",
                  text: "Failed to add tax details!",
                });
        })
      }else{
        axios.patch('/api/companysettings/updateTaxSettings',updatedtaxinfo)
        .then(function (response) {
         
          swal({
                  title: "Tax details is updated successfully!",
                  text: "Tax details is updated successfully!",
          });
          
        })
        .catch(function (error) {
          swal({
                  title: "Failed to update tax details!",
                  text: "Failed to update tax details!",
                });
        })
      }
    }
}

handleChange(event){
  const {name,value} = event.target;
  this.setState({ 
    [name]:value
  });
}

  render(){
    
    return(
      <div className="">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h4 className="">Tax Information</h4>
          </div>
             <hr className="compySettingHr" />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanyTaxDetailsForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="labelform" >Tax Type</label><span className="astrick">*</span>
                        <input id="taxType" value={this.state.taxType} data-text="companytaxType" onChange={this.handleChange.bind(this)} type="text" name="taxType" ref="taxType" className="form-control areaStaes" />
                    </div>  
                  </div>
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="labelform" >Tax Rating</label><span className="astrick">*</span>
                        <input id="taxRating" value={this.state.taxRating} data-text="companytaxrate" onChange={this.handleChange.bind(this)} type="text" name="taxRating" ref="taxRating" className="form-control areaStaes" maxLength="2" />
                    </div>  
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="labelform" >Effective From</label><span className="astrick">*</span>
                        <input className="form-control areaStaes" data-text="effectiveFrom" id="effectiveFrom" onChange={this.handleChange.bind(this)} type="date" name="effectiveFrom" ref="effectiveFrom" value={this.state.effectiveFrom} required />
                    </div> 
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" onClick={this.submitCompanyInformation.bind(this)} >
                  { this.state.submitVal ? "Submit" : "Update" }  
                </button>
              </div>
            </form>

            
          </div>
        </div>
      </div>

      );
  }

 }

 export default CompanyTaxDetails;