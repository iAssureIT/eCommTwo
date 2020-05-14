
import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import S3FileUpload             from 'react-s3';
import moment                   from 'moment';
import PhoneInput               from 'react-phone-input-2';
import _                        from 'underscore';
import { withRouter }           from 'react-router-dom';
import BulkUpload from "../BulkUpload/BulkUpload.js";
import SelectCorporate from "../SelectCorporate/SelectCorporate.js";
import "bootstrap-toggle/css/bootstrap2-toggle.min.css";
import "bootstrap-toggle/js/bootstrap2-toggle.min.js";
import "./PersonMaster.css";
import ImageLoader from 'react-load-image';


class PersonMaster extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      "pathname"         : this.props.entity,
      "personID"         : this.props.match.params ? this.props.match.params.fieldID : '',
      "companyLogo"      : [],
      "districtArray"    : [],
      "designationArray" : [],
      "departmentArray"  : [],
      'toggleButtonValue': "Male",
      'getSelectedTrip'  : "Yes",
      'loginCredential'  : "Yes",
      'country'          : "",
      'workLocation'     : "",
      'userId'           : "",
      'pincodeExists'    : true,
      "stateArray"       : [],
      "licenseProof"     : [],
      "panProof"         : [],
      "aadharProof"      : [],
      "voterIDProof"     : [],
      "profilePhoto"     : "",
      "companyId"        : "",
      "passportProof"    : [],
      "company_id"       : "",
      "addressProof"     : [],
      "identityProof"    : [],
      "verificationProof": [],
      "COI"              : [],
      "loading"          : false,
      fileDetailUrl      : "/api/personmaster/get/filedetails/",
      goodRecordsHeading :{
        firstName             : "First Name",
        middleName            : "Middle Name",
        lastName              : "Last Name",
        DOB                   : "DOB",
        gender                : "Gender",
        contactNo             : "Contact No",        
        altContactNo          : "Alt Contact No",        
        email                 : "Email",        
        whatsappNo            : "Whats App No",
        department            : "Department",
        designation           : "Designation",
        employeeId            : "Employee Id",
        bookingApprovalRequired           : "Booking Approval Required",
        approvingAuthorityId              : "Approving Authority Id"
    },
    failedtableHeading   :{
        firstName             : "First Name",
        middleName            : "Middle Name",
        lastName              : "Last Name",
        DOB                   : "DOB",
        gender                : "Gender",
        contactNo             : "Contact No",        
        altContactNo          : "Alt Contact No",        
        email                 : "Email",        
        whatsappNo            : "Whats App No",
        department            : "Department",
        designation           : "Designation",
        employeeId            : "Employee Id",
        bookingApprovalRequired           : "Booking Approval Required",
        approvingAuthorityId              : "Approving Authority Id",
        failedRemark          :  "Failed Data Remark"
    }
    };

    this.handleChange             = this.handleChange.bind(this);
    this.keyPress                 = this.keyPress.bind(this);
    this.handleOptionChange       = this.handleOptionChange.bind(this);
    this.submitPerson             = this.submitPerson.bind(this);
    this.camelCase                = this.camelCase.bind(this)
    this.handleChangeCountry      = this.handleChangeCountry.bind(this);
    this.handleChangeState        = this.handleChangeState.bind(this);
    this.handleChangeDesignation  = this.handleChangeDesignation.bind(this);
    this.handleChangeDepartment   = this.handleChangeDepartment.bind(this);
    this.handleworklocationChange = this.handleworklocationChange.bind(this);

  }

 Preloader(props) {
  return <img src="spinner.gif" />;
}


  componentDidMount() {
    this.getCorporate();
    this.getDesignation();
    this.getDepartment();
    this.getCompany();
    var corporateID = localStorage.getItem("corporateID");
    var workLocationId=this.props.vendorLocationID;
    console.log("workLocationId",workLocationId)
    this.setState({
      personID       :  this.props.match.params.fieldID,
      corporateID    : corporateID,
      workLocationId : workLocationId,
      // loading     : false,
    }, () => {
      console.log("this.state.companyID",this.state.companyID);
      this.edit();
    })
    if(this.state.pathname === "driver")
    {
      $(".person").hide();
      $(".driver").show();
    $.validator.addMethod("regxEmail", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid Email Id");
    $.validator.addMethod("regxLicenseNumber", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid License Number");
    $.validator.addMethod("regxAadharNumber", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid Aadhar Number");

    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
    $("#BasicInfo").validate({
      rules: {
     
        firstName: {
          required: true
        },
        middleName: {
          required: true
        },
        lastName: {
          required: true
        },
        DOB: {
          required: true
        },
        contactNumber: {
          required: true,
        },
        email: {
          required: true,
          regxEmail :/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$|^$)/,
        },
        addressLine1: {
          required: true,
        },
        country: {
          required: true,
        },
        states: {
          required: true,
        },
        district: {
          required: true,
        },
        area: {
          required: true,
        },
        city: {
          required: true,
        },
        pincode: {
          required: true,
        },
        licenseNumber: {
          required: true,
          regxLicenseNumber :/^[a-zA-Z]{2}[0-9]{13}$/,
        },
      
        effectiveUpto: {
          required: true,
        },
      
      /*  badgeNumber: {
          required: true,
        },*/
        verificationNumber: {
          required: true,
        },
        aadharNumber: {
          required: true,
          regxAadharNumber :/^[0-9]{12}$/,
        },
       
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "firstName") {
          error.insertAfter("#firstName");
        }
        if (element.attr("name") === "lastName") {
          error.insertAfter("#lastName");
        }
        if (element.attr("name") === "middleName") {
          error.insertAfter("#middleName");
        }
        if (element.attr("name") === "DOB") {
          error.insertAfter("#DOB");
        }
        if (element.attr("name") === "contactNumber") {
          error.insertAfter("#contactNumber");
        }
        if (element.attr("name") === "alternateNumber") {
          error.insertAfter("#alternateNumber");
        }
        if (element.attr("name") === "email") {
          error.insertAfter("#email");
        }
        if (element.attr("name") === "addressLine1") {
          error.insertAfter("#addressLine1");
        }
        if (element.attr("name") === "country") {
          error.insertAfter("#country");
        }
        if (element.attr("name") === "states") {
          error.insertAfter("#states");
        }
        if (element.attr("name") === "district") {
          error.insertAfter("#district");
        }
        if (element.attr("name") === "area") {
          error.insertAfter("#area");
        }
        if (element.attr("name") === "city") {
          error.insertAfter("#city");
        }
        if (element.attr("name") === "pincode") {
          error.insertAfter("#pincode");
        }
        if (element.attr("name") === "effectiveUpto") {
          error.insertAfter("#effectiveUpto");
        }
        if (element.attr("name") === "licenseNumber") {
          error.insertAfter("#licenseNumber");
        }
        if (element.attr("name") === "aadharNumber") {
          error.insertAfter("#aadharNumber");
        }
       {/* if (element.attr("name") === "badgeNumber") {
          error.insertAfter("#badgeNumber");
        }*/}
        if (element.attr("name") === "verificationNumber") {
          error.insertAfter("#verificationNumber");
        }

      }
    });
    }else if(this.state.pathname === "employee"){
      $(".person").hide();
      $(".employee").show();
    $.validator.addMethod("regxEmail", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid Email Id");
   
    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
    $("#BasicInfo").validate({
      rules: {
     
        firstName: {
          required: true
        },
        middleName: {
          required: true
        },
        lastName: {
          required: true
        },
        DOB: {
          required: true
        },
        workLocation: {
          required: true,
        },
        contactNumber: {
          required: true,
        },
        alternateNumber: {
          required: true,
        },

        email: {
          required: true,
          regxEmail :/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$|^$)/,
        },
        department: {
          required: true,
        },
        designation: {
          required: true,
        }, 
        addressLine1: {
          required: true,
        },
        country: {
          required: true,
        },
        states: {
          required: true,
        },
        district: {
          required: true,
        },
        area: {
          required: true,
        },
        city: {
          required: true,
        },
        pincode: {
          required: true,
        },
        employeeID: {
          required: true,
        },
        preApprovedParameter: {
          required: true,
        },
        preApprovedParameterValue: {
          required: true,
        },
        approvingAuthorityId1: {
          required: true,
        },
        approvingAuthorityId2: {
          required: true,
        },
        approvingAuthorityId3: {
          required: true,
        },
        
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "firstName") {
          error.insertAfter("#firstName");
        }
        if (element.attr("name") === "lastName") {
          error.insertAfter("#lastName");
        }
        if (element.attr("name") === "middleName") {
          error.insertAfter("#middleName");
        }
        if (element.attr("name") === "DOB") {
          error.insertAfter("#DOB");
        }
        if (element.attr("name") === "contactNumber") {
          error.insertAfter("#contactNumber");
        }
        if (element.attr("name") === "email") {
          error.insertAfter("#email");
        }
        if (element.attr("name") === "department") {
          error.insertAfter("#department");
        }
        if (element.attr("name") === "designation") {
          error.insertAfter("#designation");
        }
        if (element.attr("name") === "workLocation") {
          error.insertAfter("#workLocation");
        }
           if (element.attr("name") === "addressLine1") {
          error.insertAfter("#addressLine1");
        }
        if (element.attr("name") === "country") {
          error.insertAfter("#country");
        }
        if (element.attr("name") === "states") {
          error.insertAfter("#states");
        }
        if (element.attr("name") === "district") {
          error.insertAfter("#district");
        }
        if (element.attr("name") === "area") {
          error.insertAfter("#area");
        }
        if (element.attr("name") === "city") {
          error.insertAfter("#city");
        }
        if (element.attr("name") === "pincode") {
          error.insertAfter("#pincode");
        }
        if (element.attr("name") === "employeeID") {
          error.insertAfter("#employeeID");
        }
        if (element.attr("name") === "preApprovedParameter") {
          error.insertAfter("#preApprovedParameter");
        }
        if (element.attr("name") === "preApprovedParameterValue") {
          error.insertAfter("#preApprovedParameterValue");
        }
        if (element.attr("name") === "approvingAuthorityId1") {
          error.insertAfter("#approvingAuthorityId1");
        }
        if (element.attr("name") === "approvingAuthorityId2") {
          error.insertAfter("#approvingAuthorityId2");
        }
        if (element.attr("name") === "approvingAuthorityId3") {
          error.insertAfter("#approvingAuthorityId3");
        }
   
      }
    });
    }else if(this.state.pathname === "guest"){
      $(".person").hide();
      $(".guest").show();
    $.validator.addMethod("regxEmail", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid Email Id");
    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
    $("#BasicInfo").validate({
      rules: {
     
        firstName: {
          required: true
        },
        middleName: {
          required: true
        },
        lastName: {
          required: true
        },
       
        contactNumber: {
          required: true,
        },
        email: {
          required: true,
          regxEmail :/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$|^$)/,
        },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "firstName") {
          error.insertAfter("#firstName");
        }
        if (element.attr("name") === "lastName") {
          error.insertAfter("#lastName");
        }
        if (element.attr("name") === "middleName") {
          error.insertAfter("#middleName");
        }
        if (element.attr("name") === "contactNumber") {
          error.insertAfter("#contactNumber");
        }
        if (element.attr("name") === "email") {
          error.insertAfter("#email");
        }
      }
    });
    }
    
  }
  componentWillUnmount() {
    $("script[src='/js/adminLte.js']").remove();
    $("link[href='/css/dashboard.css']").remove();
  }
  camelCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
   getCompany() {
        axios.get('/api/companysettings')
            .then((response) => {
                console.log('company', response.data)
                this.setState({
                    companyId : response.data._id,
                    companyDetails: response.data,
                    company: response.data.companyName,
                    companyLocationArray: response.data.companyLocationsInfo
                })
            })
            .catch((error) => {

            })
    }
  getUploadFileAttachPercentage() {
    var uploadProgressPercent = localStorage.getItem("uploadUserImageProgressPercent");
    if (uploadProgressPercent) {
      var percentVal = parseInt(uploadProgressPercent);
      if (percentVal) {
        var styleC = {
          width: percentVal + "%",
          display: "block",
          height: "8px",
        }
        var styleCBar = {
          display: "block",
          marginTop: 10,
          height: "8px",
        }
      }
      if (!percentVal) {
        var percentVal = 0;

        var styleC = {
          width: 0 + "%",
          display: "none",
          height: "8px",
        }
        var styleCBar = {
          display: "none",
          marginTop: 10,
          height: "8px",
        }
      }
      if (percentVal === 100) {
        var percentVal = 0;

        var styleC = {
          width: 0 + "%",
          display: "none",
          height: "8px",
        }
        var styleCBar = {
          display: "none",
          marginTop: 10,
          height: "8px",
        }

      }
      return (
        <div>
          <div className="progress col-lg-12" style={styleCBar}>
            <div className="progress-bar progress-bar-striped active" role="progressbar"
              aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={styleC}>
            </div>
          </div>
        </div>
      );
    }
  }
  getUploadLogoPercentage() {
    var uploadProgressPercent = localStorage.getItem("imageprogress");
    if (uploadProgressPercent) {
      var percentVal = parseInt(uploadProgressPercent);
      if (percentVal) {
        var styleC = {
          width: percentVal + "%",
          display: "block",
          height: "8px",
        }
        var styleCBar = {
          display: "block",
          marginTop: 10,
          height: "8px",
          padding: "0px",
        }
      }
      if (!percentVal) {
        var percentVal = 0;

        var styleC = {
          width: 0 + "%",
          display: "none",
          height: "8px",
        }
        var styleCBar = {
          display: "none",
          marginTop: 10,
          height: "8px",
          padding: "0px",
        }

      }
      if (percentVal === 100) {
        var percentVal = 0;

        var styleC = {
          width: 0 + "%",
          display: "none",
          height: "8px",
        }
        var styleCBar = {
          display: "none",
          marginTop: 10,
          height: "8px",
          padding: "0px",
        }
      }
      return (
        <div>
          <div className="progress col-lg-12" style={styleCBar}>
            <div className="progress-bar progress-bar-striped active" role="progressbar"
              aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={styleC}>
            </div>
          </div>
        </div>
      );
    }
  }
  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    },()=>{
    });
  }
  handleOptionChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });

  }
  submitPerson(event) {
    event.preventDefault();

    if ($('#BasicInfo').valid()  && this.state.pincodeExists) {
      if (this.state.pathname === 'employee' ) {
        var userDetails = {
          // vendorId                 : this.state.corporateID,
          type                     : this.state.pathname,
          firstName                : this.state.firstName,
          middleName               : this.state.middleName,
          lastName                 : this.state.lastName,
          DOB                      : this.state.DOB,
          gender                   : this.state.toggleButtonValue,
          contactNo                : this.state.contactNumber,
          altContactNo             : this.state.alternateNumber,
          email                    : this.state.email,
          whatsappNo               : this.state.whatsappNumber ? this.state.whatsappNumber:'-',
          departmentId             : this.state.department,
          designationId            : this.state.designation,
          profilePhoto             : this.state.profilePhoto,
          employeeId               : this.state.employeeID,
          bookingApprovalRequired  : this.state.getSelectedTrip,
          approvingAuthorityId1    : this.state.approvingAuthorityId1,
          approvingAuthorityId2    : this.state.approvingAuthorityId2,
          approvingAuthorityId3    : this.state.approvingAuthorityId3,
          preApprovedParameter     : this.state.preApprovedParameter,
          preApprovedParameterValue: this.state.preApprovedParameterValue,
          loginCredential          : this.state.loginCredential,
          company_Id               : this.state.corporate,
          workLocation             : this.state.workLocation,

          address                 : {
                                      addressLine1    : this.state.addressLine1,
                                      addressLine2    : this.state.addressLine2,
                                      landmark        : this.state.landmark ? this.state.landmark : "",
                                      area            : this.state.area,
                                      city            : this.state.city,
                                      district        : this.state.district,
                                      state           : this.state.states.split('|')[1],
                                      stateCode       : this.state.states.split('|')[0],
                                      country         : this.state.country.split('|')[1],
                                      countryCode     : this.state.country.split('|')[0],
                                      pincode         : this.state.pincode,
                                      latitude        :"",
                                      longitude       :"",
                                      addressProof    : this.state.addressProof,
                                    },


        }
        console.log("userDetails",userDetails);

        if(this.state.loginCredential === "Yes")


            {
              this.createLogin(this.state.loginCredential);
              userDetails.userId = this.state.userId; 
         }
      }else if(this.state.pathname === 'driver' ){

        var userDetails = {
          type            : this.state.pathname,
          firstName       : this.state.firstName,

          middleName      : this.state.middleName,
          lastName        : this.state.lastName,
          DOB             : this.state.DOB,
          email           : this.state.email,
          gender          : this.state.toggleButtonValue,
          contactNo       : this.state.contactNumber,
          altContactNo    : this.state.alternateNumber,
          whatsappNo      : this.state.whatsappNumber   ? this.state.whatsappNumber        : 'Not Specified',
          profilePhoto    : this.state.profilePhoto,
          identityProof   : this.state.identityProof, 
          badgeNumber     : this.state.badgeNumber, 
          address         : {
                              addressLine1    : this.state.addressLine1,
                              addressLine2    : this.state.addressLine2,
                              landmark        : this.state.landmark ? this.state.landmark : "",
                              area            : this.state.area,
                              city            : this.state.city,
                              district        : this.state.district,
                              state           : this.state.states.split('|')[1],
                              stateCode       : this.state.states.split('|')[0],
                              country         : this.state.country.split('|')[1],
                              countryCode     : this.state.country.split('|')[0],
                              pincode         : this.state.pincode,
                              addressProof    : this.state.addressProof,
                            },
          drivingLicense  : {
                              licenseNo       : this.state.licenseNumber,
                              effectiveTo     : this.state.effectiveUpto,
                              licenseProof    : this.state.licenseProof
                            },
          aadhar          : {
                              aadharNo        : this.state.aadharNumber,
                              aadharProof     : this.state.aadharProof
                            },
          verification          : {
                              verificationNumber    : this.state.verificationNumber,
                              verificationProof     : this.state.verificationProof
                            },
         }
          this.createLogin("Yes");
          userDetails.userId = this.state.userId;
      }else{
        var userDetails = {
            vendorId        : this.state.vendorId,
            firstName       : this.state.firstName,
            middleName      : this.state.middleName,
            lastName        : this.state.lastName,
            gender          : this.state.toggleButtonValue,
            contactNo       : this.state.contactNumber,
            altContactNo    : this.state.alternateNumber,
            // whatsappNo      : this.state.contactNumber,
            type            : this.state.pathname,
            email           : this.state.email,
            profilePhoto    : this.state.profilePhoto,

          }
        }  
        
         axios.post('/api/personmaster/post', userDetails)
          .then((response) => {

            swal(this.Capitalize(this.state.pathname) + " Added Sucessfully");

              this.setState({
                firstName       : "",
                middleName      : "",
                lastName        : "",
                DOB             : "",
                gender          : "",
                contactNumber   : "",
                alternateNumber : "",
                whatsappNumber  : "",
                department      : "-- Select --",
                designation     : "-- Select --",
               
                addressLine1    : "",
                addressLine2    : "",
                landmark        : "",
                area            : "",
                city            : "",
                district        : "-- Select --",
                states          : "-- Select --",
                country         : "-- Select --",
                pincode         : "",
                email           : "",
                licenseNumber   : "",
                effectiveUpto   : "",
                panNumber       : "",
                aadharNumber    : "",
                voterId         : "",
                preApprovedAmount : "",
                passportNumber  : "",
                licenseProof    : [],
                panProof        : [],
                profilePhoto    : "",
                aadharProof     : [],
                voterIDProof    : [],
                passportProof   : [],

            },()=>{
              this.props.history.push("/"+this.state.pathname+"/lists")
            })
             
          })
          .catch((error) => {

          })
      } 
  }
  createLogin(loginCredential){

    if(loginCredential === "Yes")
    {
      var userDetails = {
        firstname     : this.state.firstName,
        lastname      : this.state.lastName,
        mobNumber     : this.state.contactNumber,
        email         : this.state.email,
        pwd           : "fivebees123",
        role          : this.state.pathname,
        status        : 'active',
        "emailSubject"    : "Email Verification",
        "emailContent"    : "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
     }
    axios.post('/api/auth/post/signup/user', userDetails)
    .then((response)=>{
       this.setState({
          userId : response.data.ID
        },()=>{
        })
        if(response.data.message =='USER_CREATED'){
       
        }else{
        swal(response.data.message);
      }
    })
    }
    
  }
  updatePerson(event){
  event.preventDefault();
  if($('#BasicInfo').valid()  && this.state.pincodeExists){
    if(this.state.personID)
    {
       if (this.state.pathname === 'employee' ) {
          var userDetails = {
            // vendorId        : this.state.companyId,
            personID        : this.state.personID,
            firstName       : this.state.firstName,
            middleName      : this.state.middleName,
            lastName        : this.state.lastName,
            DOB             : this.state.DOB,
            gender          : this.state.toggleButtonValue,
            contactNo       : this.state.contactNumber,
            altContactNo    : this.state.alternateNumber ? this.state.alternateNumber:"",
            whatsappNo      : this.state.whatsappNumber ? this.state.whatsappNumber :"",
            email           : this.state.email,
            departmentId    : this.state.department,
            designationId   : this.state.designation,
            preApprovedParameter: this.state.preApprovedParameter,
            preApprovedParameterValue: this.state.preApprovedParameterValue,
            profilePhoto    : this.state.profilePhoto,
            employeeId              : this.state.employeeID,
            bookingApprovalRequired : this.state.getSelectedTrip,
            approvingAuthorityId1    : this.state.approvingAuthorityId1,
            approvingAuthorityId2    : this.state.approvingAuthorityId2,
            approvingAuthorityId3    : this.state.approvingAuthorityId3,
            loginCredential         : this.state.loginCredential,
            workLocation            : this.state.workLocation,
            company_Id            : this.state.corporate,
            address         : [{
                                addressLine1    : this.state.addressLine1,
                                addressLine2    : this.state.addressLine2,
                                landmark        : this.state.landmark,
                                area            : this.state.area,
                                city            : this.state.city,
                                district        : this.state.district,
                                state           : this.state.states.split('|')[1],
                                stateCode       : this.state.states.split('|')[0],
                                country         : this.state.country.split('|')[1],
                                countryCode     : this.state.country.split('|')[0],
                                pincode         : this.state.pincode,
                                addressProof    : this.state.addressProof,

                              }],
           
            updatedBy        : localStorage.getItem("user_ID")
          }
          console.log("userDetails update",userDetails);
       }else if(this.state.pathname === 'driver' ){
          var userDetails = {
            personID        : this.state.personID,
            firstName       : this.state.firstName,
            middleName      : this.state.middleName,
            lastName        : this.state.lastName,
            DOB             : this.state.DOB,
            gender          : this.state.toggleButtonValue,
            contactNo       : this.state.contactNumber,
            altContactNo    : this.state.alternateNumber ? this.state.alternateNumber:"",
            whatsappNo      : this.state.whatsappNumber ? this.state.whatsappNumber :"",
            profilePhoto    : this.state.profilePhoto,
            identityProof   : this.state.identityProof,
            badgeNumber     : this.state.badgeNumber,

            address         : {
                                addressLine1    : this.state.addressLine1,
                                addressLine2    : this.state.addressLine2,
                                landmark        : this.state.landmark,
                                area            : this.state.area,
                                city            : this.state.city,
                                district        : this.state.district,
                                state           : this.state.states.split('|')[1],
                                stateCode       : this.state.states.split('|')[0],
                                country         : this.state.country.split('|')[1],
                                countryCode     : this.state.country.split('|')[0],
                                pincode         : this.state.pincode,
                                addressProof    : this.state.addressProof,
                              },
            drivingLicense  : {
                                licenseNo       : this.state.licenseNumber,
                                effectiveTo     : this.state.effectiveUpto,
                                licenseProof    : this.state.licenseProof
                              },
            aadhar          : {
                                aadharNo        : this.state.aadharNumber,
                                aadharProof     : this.state.aadharProof
                              },
            verification          : {
                              verificationNumber    : this.state.verificationNumber,
                              verificationProof     : this.state.verificationProof
                            },

            updatedBy       : localStorage.getItem("user_ID")
          }
          console.log("userDetails",userDetails);
       }else{
          var userDetails = {
            vendorId        : this.state.companyId,
            personID        : this.state.personID,
            firstName       : this.state.firstName,
            middleName      : this.state.middleName,
            lastName        : this.state.lastName,
            gender          : this.state.toggleButtonValue,
            contactNo       : this.state.contactNumber,
            altContactNo    : this.state.alternateNumber ? this.state.alternateNumber:"",
            whatsappNo      : this.state.whatsappNumber ? this.state.whatsappNumber :"",
            email           : this.state.email,
            profilePhoto    : this.state.profilePhoto,
            updatedBy       : localStorage.getItem("user_ID")
          }
        console.log("userDetails==>",userDetails);
      }
       axios.patch('/api/personmaster/patch', userDetails)
        .then((response) => {
          this.setState({
              personID        : "",
              firstName       : "",
              middleName      : "",
              lastName        : "",
              DOB             : "",
              gender          : "",
              contactNumber   : "",
              alternateNumber : "",
              whatsappNumber  : "",
              department      : "-- Select --",
              designation     : "-- Select --",
              preApprovedParameterValue     : "-- Select --",
              preApprovedParameterValue    :"",
              profilePhoto    :"",
              approvingAuthorityId3    :"",
              approvingAuthorityId2    :"",
              approvingAuthorityId1    :"",
             
              addressLine1    : "",
              addressLine2    : "",
              landmark        : "",
              area            : "",
              city            : "",
              district        : "-- Select --",
              states          : "-- Select --",
              country         : "-- Select --",
              pincode         : "",
              email           : "",
              licenseNumber   : "",
              preApprovedAmount : "",
              approvingAuthorityId : "",
              effectiveUpto   : "",
              panNumber       : "",
              aadharNumber    : "",
              voterId         : "",
              passportNumber  : "",
              licenseProof    : [],
              panProof        : [],
              aadharProof     : [],
              identityProof   : [],
              verificationProof: [],
              addressProof    : [],

          },()=>{
            this.props.history.push("/"+this.state.pathname+"/lists")
          })
           swal(this.Capitalize(this.state.pathname) +" Details Updated Sucessfully");
        })
        .catch((error) => {
          console.log("error",error)
        })
      }
    }else{
       window.scrollTo(0, 0);
     }
  }
  imgBrowse(event) {
    event.preventDefault();
    var companyLogo = [];
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      for(var i=0; i<event.currentTarget.files.length; i++){
      var file = event.currentTarget.files[i];

      if (file) {
        var fileName = file.name;
        var ext = fileName.split('.').pop();
        if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "JPG" || ext === "PNG" || ext === "JPEG") {
          if (file) {
            var objTitle = { fileInfo: file }
            companyLogo.push(objTitle);

          } else {
            swal("Images not uploaded");
          }//file
        } else {
          swal("Allowed images formats are (jpg,png,jpeg)");
        }//file types
      }//file
      }//for 

      if (event.currentTarget.files) {
        main().then(formValues => {
          var companyLogo = this.state.companyLogo;
          for(var k = 0; k < formValues.length; k++){
            companyLogo.push(formValues[k].companyLogo)
          }
          
          this.setState({
            companyLogo: companyLogo
          })
        });
        
          async function main() {
            var formValues = [];
            for(var j = 0; j < companyLogo.length; j++){
              var config = await getConfig();
              var s3url = await s3upload(companyLogo[j].fileInfo, config, this);
              const formValue = {
                "companyLogo": s3url,
                "status": "New"
              };
              formValues.push(formValue);
            }
            return Promise.resolve(formValues);
          }
        
        
        function s3upload(image, configuration) {

          return new Promise(function (resolve, reject) {
            S3FileUpload
              .uploadFile(image, configuration)
              .then((Data) => {
                resolve(Data.location);
              })
              .catch((error) => {
              })
          })
        }
        function getConfig() {
          return new Promise(function (resolve, reject) {
            axios
              .get('/api/projectsettings/get/S3')
              .then((response) => {
                const config = {
                  bucketName: response.data.bucket,
                  dirName: 'propertiesImages',
                  region: response.data.region,
                  accessKeyId: response.data.key,
                  secretAccessKey: response.data.secret,
                }
                resolve(config);
              })
              .catch(function (error) {
              })

          })
        }
      }
    }
  }
  docBrowse(event) {
        event.preventDefault();
         $('#loader_img').show();
         // $('.fullpageloader').show();
        var name = event.target.name
        var docBrowse = [];
        console.log("event.currentTarget.files", event.target.name,event.currentTarget.files);
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            for (var i = 0; i < event.currentTarget.files.length; i++) {
                var file = event.currentTarget.files[i];
                if (file) {
                    var fileName = file.name;
                    var ext = fileName.split('.').pop();
                    if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "pdf" || ext === "JPG" || ext === "PNG" || ext === "JPEG" || ext === "PDF") {
                        if (file) {
                          
                            var objTitle = { fileInfo: file }
                            docBrowse.push(objTitle);
                        } else {
                            swal("Files not uploaded");
                        }//file
                    } else {    
                        swal("Allowed images formats are (jpg,png,jpeg, pdf)");
                    }//file types
                }//file
            }//for 

            if (event.currentTarget.files) {
                main().then(formValues => {
                  console.log("name->",name)
                    var docBrowse = this.state[name];
                    console.log("docBrowse",docBrowse);
                   for (var k = 0; k < formValues.length; k++) {
                        docBrowse.push(formValues[k].docBrowse)
                        console.log("formValues[k]",formValues[k])
                        console.log("formValues[k].docBrowse",formValues[k].docBrowse)
                    }

                    this.setState({
                        [name]: docBrowse
                    },()=>{
                    })
                });

                async function main() {
                    var formValues = [];
                    for (var j = 0; j < docBrowse.length; j++) {
                        var config = await getConfig();
                        var s3url = await s3upload(docBrowse[j].fileInfo, config, this);
                        const formValue = {
                            "docBrowse": s3url,
                            "status": "New"
                        };
                        formValues.push(formValue);
                    }
                    return Promise.resolve(formValues);
                }


                function s3upload(image, configuration) {

                    return new Promise(function (resolve, reject) {
                        S3FileUpload
                            .uploadFile(image, configuration)
                            .then((Data) => {
                                resolve(Data.location);
                            })
                            .catch((error) => {
                            })
                    })
                }
                function getConfig() {
                  return new Promise(function (resolve, reject) {
                      axios
                        .get('/api/projectsettings/get/S3')
                        .then((response) => {
                           $('#loader_img').hide();

                            const config = {
                                bucketName: response.data.bucket,
                                dirName: 'propertiesImages',
                                region: response.data.region,
                                accessKeyId: response.data.key,
                                secretAccessKey: response.data.secret,
                            }
                            resolve(config);
                        })
                        .catch(function (error) {
                        })
                    })
                }
            }
        }
  }
  
  keyPressWeb = (e) => {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190, 110,48,49,50,51,52,53,54,55,56,57]) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 190 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 110 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 90)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }
  /*======== alphanumeric  =========*/
  keyPress = (e) => {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (((e.keyCode < 48 || e.keyCode > 90)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode === 190 || e.keyCode === 46)) {
      e.preventDefault();
    }
  }
  keyPressNumber = (e) => {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 189]) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 58)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode === 190 || e.keyCode === 46)) {
      e.preventDefault();
    }
  }
  isTextKey(evt)  {
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode!=189 && charCode > 32 && (charCode < 65 || charCode > 90) )
   {
    evt.preventDefault();
      return false;
    }
    else{
      return true;
    }
  }
  componentWillReceiveProps(nextProps,prevProps) {
    console.log("this.this.props.",this.props);
   
    if(this.props.entity === "driver")
    {
      $(".person").hide();
      $(".driver").show();
    }else if(this.props.entity === "employee"){
      $(".person").hide();
      $(".employee").show();
    }else if(this.props.entity === "guest"){
      $(".person").hide();
      $(".guest").show();
       
    }
    this.edit();
    this.handleChange = this.handleChange.bind(this);
  }
  admin(event) {
    event.preventDefault();
    this.props.history.push('/adminDashboard');
  }
  edit() {
    var personID = this.state.personID;
    if (personID) {
      axios.get('/api/personmaster/get/one/' + personID)
        .then((response) => {
          console.log("response:=>",response)

        if(this.state.pathname === 'driver' || this.state.pathname === 'employee' )
        {
            this.setState({
            companyId     : response.data.vendorId ? response.data.vendorId : this.state.companyId,
            firstName       : response.data.firstName,
            middleName      : response.data.middleName,
            lastName        : response.data.lastName,
            DOB             : moment(response.data.DOB).format("YYYY-MM-DD"),
            toggleButtonValue: response.data.gender ? response.data.gender : "Male",
            contactNumber   : response.data.contactNo,
            alternateNumber : response.data.altContactNo,
            bookingApprovalRequired  : response.data.bookingApprovalRequired && response.data.bookingApprovalRequired === true ? "Yes" : "No",
            getSelectedTrip :   response.data.bookingApprovalRequired && response.data.bookingApprovalRequired === "true" ? "Yes" : "No",
            loginCredential :   response.data.loginCredential ? response.data.loginCredential : "Yes",
            approvingAuthorityId1  : response.data.bookingApprovalRequired == "Yes" ? response.data.approvingAuthorityId1 : "",
            approvingAuthorityId2  :  response.data.bookingApprovalRequired == "Yes" ? response.data.approvingAuthorityId2 : "",
            approvingAuthorityId3  :  response.data.bookingApprovalRequired == "Yes" ? response.data.approvingAuthorityId3 : "",
            whatsappNumber  : response.data.whatsappNo,
            department      : response.data.departmentId,
            designation     : response.data.designationId,
            employeeID      : response.data.employeeId,
            workLocation    : response.data.workLocation,
            corporateId    : response.data.corporateId,
            badgeNumber     : response.data.badgeNumber,
            verificationNumber     :response.data.verification? response.data.verification.verificationNumber: "",
            type            : response.data.pathname,
            addressLine1    : response.data.address[0] ? response.data.address[0].addressLine1 : "",
            addressLine2    : response.data.address[0] ? response.data.address[0].addressLine2 : "",
            landmark        : response.data.address[0] ? response.data.address[0].landmark : "",
            area            : response.data.address[0] ? response.data.address[0].area : "",
            city            : response.data.address[0] ? response.data.address[0].city : "",
            district        : response.data.address[0] ? response.data.address[0].district : "",
            states          : response.data.address[0] ? response.data.address[0].stateCode+"|"+response.data.address[0].state : "",
            country         : response.data.address[0] ? response.data.address[0].countryCode+"|"+ response.data.address[0].country : "",
            pincode         : response.data.address[0] ? response.data.address[0].pincode : "",
            email           : response.data.email,
            preApprovedParameter:  response.data.bookingApprovalRequired == "Yes" ? response.data.preApprovedParameter : "" ,
            preApprovedParameterValue: response.data.bookingApprovalRequired == "Yes" ? response.data.preApprovedParameterValue: "",

            licenseNumber   : response.data.drivingLicense ? response.data.drivingLicense.licenseNo : "",
            effectiveUpto   : moment(response.data.effectiveTo).format("YYYY-MM-DD"),
            //panNumber       : response.data.pan[0] ? response.data.pan[0].PAN : "",
            aadharNumber    : response.data.aadhar ? response.data.aadhar.aadharNo : "",
            //voterId         : response.data.voterID[0] ? response.data.voterID[0].voterID : "", 
            //passportNumber  : response.data.passport[0] ? response.data.passport[0].passportNo : [],
            licenseProof    : response.data.drivingLicense ? response.data.drivingLicense.licenseProof : [],
            addressProof    : response.data.address[0] ? response.data.address[0].addressProof : [],
            //panProof        : response.data.pan[0] ? response.data.pan[0].PANProof : [],
            aadharProof     : response.data.aadhar ? response.data.aadhar.aadharProof : [],
            verificationProof: response.data.verification? response.data.verification.verificationProof : [],
            //voterIDProof    : response.data.voterID[0] ? response.data.voterID[0].voterIDProof : [],
            identityProof   : response.data.identityProof ? response.data.identityProof : [],
            profilePhoto    : response.data.profilePhoto,
            createdBy       : localStorage.getItem("user_ID")
          },()=>{
            if(response.data.address.length > 0)
            {
             this.getStates(response.data.address[0].countryCode);
             this.getDistrict(response.data.address[0].stateCode, response.data.address[0].countryCode);
            }
           
            
          })
        }else{
          console.log("response.data",response.data);

          this.setState({
            firstName       : response.data.firstName,
            middleName      : response.data.middleName,
            lastName        : response.data.lastName,
            DOB             : moment(response.data.DOB).format("YYYY-MM-DD"),
            toggleButtonValue: response.data.gender,
            contactNumber   : response.data.contactNo?response.data.contactNo:"",
            alternateNumber : response.data.altContactNo?response.data.altContactNo:"",
            bookingApprovalRequired : response.data.bookingApprovalRequired,
            getSelectedTrip :   response.data.bookingApprovalRequired,
            approvingAuthorityId  : response.data.approvingAuthorityId,
            whatsappNumber  : response.data.whatsappNo?response.data.whatsappNo:"",
            department      : response.data.departmentId,
            designation     : response.data.designationId,
            employeeID      : response.data.employeeId,
            type            : response.data.pathname,
            addressLine1    : response.data.address[0] ? response.data.address[0].addressLine1 : "",
            addressLine2    : response.data.address[0] ? response.data.address[0].addressLine2 : "",
            landmark        : response.data.address[0] ? response.data.address[0].landmark : "",
            area            : response.data.address[0] ? response.data.address[0].area : "",
            city            : response.data.address[0] ? response.data.address[0].city : "",
            district        : response.data.address[0] ? response.data.address[0].district : "",
            states          : response.data.address[0] ? response.data.address[0].stateCode+"|"+response.data.address[0].state : "",
            country         : response.data.address[0] ? response.data.address[0].countryCode+"|"+ response.data.address[0].country : "",
            pincode         : response.data.address[0] ? response.data.address[0].pincode : "",
            email           : response.data.email,
            preApprovedAmount: response.data.preApprovedAmount,

            licenseNumber   : response.data.drivingLicense.length>0 ? response.data.drivingLicense[0].licenseNo : "",
            effectiveUpto   : moment(response.data.effectiveTo).format("YYYY-MM-DD"),
            //panNumber       : response.data.pan[0] ? response.data.pan[0].PAN : "",
            aadharNumber    : response.data.aadhar[0] ? response.data.aadhar[0].aadharNo : "",
            //voterId         : response.data.voterID[0] ? response.data.voterID[0].voterID : "",
            //passportNumber  : response.data.passport[0] ? response.data.passport[0].passportNo : [],
            licenseProof    : response.data.drivingLicense[0] ? response.data.drivingLicense[0].licenseProof : [],
            //panProof        : response.data.pan[0] ? response.data.pan[0].PANProof : [],
            aadharProof     : response.data.aadhar[0] ? response.data.aadhar[0].aadharProof : [],
            //voterIDProof    : response.data.voterID[0] ? response.data.voterID[0].voterIDProof : [],
            //passportProof   : response.data.passport[0] ? response.data.passport[0].passportProof : [],
            profilePhoto    : response.data.profilePhoto,
            createdBy       : localStorage.getItem("user_ID")
          },()=>{
            
          })

        }


          // this.getBlocks(response.data.address[0].district, response.data.address[0].stateCode, response.data.address[0].countryCode);

      
        })
        .catch((error) => {
        })
    }
  }
  changeMobile(event){ 
    this.setState({
      companyPhone : event
    },()=>{ 
      if(this.state.companyPhone){
        this.setState({
          companyPhoneError : this.state.companyPhone === "+" ? 'Please enter valid mobile number.' : ""
        })
      } 
    })
  }
  deleteLogo(event){
    event.preventDefault();
    var companyLogo = this.state.companyLogo;
    const index = companyLogo.indexOf(event.target.id);
    if (index > -1) {
      companyLogo.splice(index, 1);
    }
    this.setState({
      companyLogo : companyLogo
    })
  }
  deleteDoc(event){
    event.preventDefault();
        var name = event.target.getAttribute("name");
        var deleteDoc = this.state[name];
        console.log(deleteDoc)
        const index = deleteDoc.indexOf(event.target.getAttribute("id"));
        if (index > -1) {
            deleteDoc.splice(index, 1);
        }
        this.setState({
            [name]: deleteDoc
        })
  }
  deleteDocSingle(event){
    event.preventDefault();
        var name = event.target.getAttribute("name");
        var deleteDoc = this.state[name];
        console.log(deleteDoc)
        const index = deleteDoc.indexOf(event.target.getAttribute("id"));
        if (index > -1) {
            deleteDoc.splice(index, 1);
        }
        this.setState({
            [name]: deleteDoc
        })
  }
  changeMobile(event){
    this.setState({
      contactNumber : event
    })
  }
  changeMobileAlternate(event){
    this.setState({
      alternateNumber : event
    })
  }
  changeMobileWhatsapp(event){
    this.setState({
      whatsappNumber : event
    })
  }
  handleChangeCountry(event) {
    const target = event.target;
    this.setState({
      [event.target.name]: event.target.value
    });
    this.getStates(event.target.value.split('|')[0])
  }
  handleChangeDesignation(event) {
    const target = event.target;
    this.setState({
      [event.target.name]: event.target.value
    },()=>{
    });
  }
  handleChangeDepartment(event) {
    const target = event.target;
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleChangeState(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    const target = event.target;
    const stateCode = $(target).val();
    const countryCode = $("#countryVal").val();
    this.getDistrict(stateCode, countryCode);

  }
  getStates(StateCode) {
    axios.get("http://locations2.iassureit.com/api/states/get/list/" + StateCode)
      .then((response) => {
        this.setState({
          stateArray: response.data
        })
        $('#state').val(this.state.states);
      })
      .catch((error) => {
      })
  }
  getDistrict(stateCode, countryCode) {
    axios.get("http://locations2.iassureit.com/api/districts/get/list/" + countryCode + "/" + stateCode)
      .then((response) => {
        this.setState({
          districtArray: response.data
        },()=>{
        })

        $('#Citydata').val(this.state.city);
      })
      .catch((error) => {
      })
  }
  getDesignation() {
    axios.get("/api/designationmaster/get/list")
      .then((response) => {
        this.setState({
          designationArray: response.data
        })
      })
      .catch((error) => {
      })
  }
  getDepartment() {
    axios.get("/api/departmentmaster/get/list")
      .then((response) => {
        this.setState({
          departmentArray: response.data
        })
      })
      .catch((error) => {
      })
  }
  Capitalize(str){
    console.log("str",str)
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  getSelectedGender(val,event) {
    this.setState({
      toggleButtonValue : val
    })
  }
  getSelectedTrip(val,event) {

      this.setState({
        getSelectedTrip : val
      })
      
  }
  getSelectedLoginValue(val,event) {

      this.setState({
        loginCredential : val
      })
      
  }
  getFileDetails(fileName){
      
      axios
      .get(this.state.fileDetailUrl+this.state.pathname+"/"+fileName)
      .then((response)=> {
      $('.fullpageloader').hide();  
      if (response) {
        this.setState({
            fileDetails         : response.data,
            failedRecordsCount  : response.data.failedRecords.length,
            goodDataCount       : response.data.goodrecords.length
        });
        if (this.state.pathname === "employee") {
          var tableData = response.data.goodrecords.map((a, i)=>{
            return{
                "firstName"     : a.firstName        ? a.firstName        : '-',
                "middleName"    : a.middleName       ? a.middleName        : '-',
                "lastName"      : a.lastName         ? a.lastName       : '-',
                "DOB"           : a.DOB              ? a.DOB   : '-',
                "gender"        : a.gender           ? a.gender           : '-',
                "contactNo"     : a.contactNo        ? a.contactNo    : '-',
                "altContactNo"  : a.altContactNo     ? a.altContactNo  : '-',
                "email"         : a.email            ? a.email : '-',
                "whatsappNo"    : a.whatsappNo       ? a.whatsappNo            : '-',
                "department"    : a.block            ? a.block           : '-', 
                "designation"   : a.village          ? a.village         : '-',
                "employeeId"    : a.employeeId       ? a.employeeId : "-",
                "bookingApprovalRequired" : a.bookingApprovalRequired ? a.bookingApprovalRequired : "-",
                "approvingAuthorityId"    : a.approvingAuthorityId    ? a.approvingAuthorityId    : "-"  
            }
          })

          var failedRecordsTable = response.data.failedRecords.map((a, i)=>{
          return{
                "firstName"     : a.firstName        ? a.firstName        : '-',
                "middleName"    : a.middleName       ? a.middleName        : '-',
                "lastName"      : a.lastName         ? a.lastName       : '-',
                "DOB"           : a.DOB              ? a.DOB   : '-',
                "gender"        : a.gender           ? a.gender           : '-',
                "contactNo"     : a.contactNo        ? a.contactNo    : '-',
                "altContactNo"  : a.altContactNo     ? a.altContactNo  : '-',
                "email"         : a.email            ? a.email : '-',
                "whatsappNo"    : a.whatsappNo       ? a.whatsappNo            : '-',
                "department"    : a.block            ? a.block           : '-', 
                "designation"   : a.village          ? a.village         : '-',
                "employeeId"    : a.employeeId       ? a.employeeId : "-",
                "bookingApprovalRequired" : a.bookingApprovalRequired ? a.bookingApprovalRequired : "-",
                "approvingAuthorityId"    : a.approvingAuthorityId    ? a.approvingAuthorityId    : "-",
                "failedRemark"  : a.failedRemark     ? a.failedRemark : '-' 
          }
          })
        }
          
        this.setState({
            goodRecordsTable    : tableData,
            failedRecordsTable  : failedRecordsTable
        })
      }
      })
      .catch((error)=> { 
        console.log('error', error);
      }) 
  }
  docBrowseSingle(event) {
        event.preventDefault();
        var name = event.target.name
        var docBrowse = [];
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            for (var i = 0; i < event.currentTarget.files.length; i++) {
                var file = event.currentTarget.files[i];
                if (file) {
                    var fileName = file.name;
                    var ext = fileName.split('.').pop();
                    if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "pdf" || ext === "JPG" || ext === "PNG" || ext === "JPEG" || ext === "PDF") {
                        if (file) {
                            var objTitle = { fileInfo: file }
                            docBrowse.push(objTitle);
                          console.log("docBrowse",docBrowse)

                        } else {
                            swal("Files not uploaded");
                        }//file
                    } else {
                        swal("Allowed images formats are (jpg,png,jpeg, pdf)");
                    }//file types
                }//file
            }//for 

            if (event.currentTarget.files) {
                main().then(formValues => {
                    console.log("formValues",formValues);
                    var docBrowse = this.state[name];
                    this.setState({
                        [name]: formValues[0].docBrowse
                    },()=>{
                        console.log("profilePhoto0",this.state.profilePhoto)
                    })
                });

                async function main() {
                    var formValues = [];
                    for (var j = 0; j < docBrowse.length; j++) {
                        var config = await getConfig();
                        var s3url = await s3upload(docBrowse[j].fileInfo, config, this);
                        const formValue = {
                            "docBrowse": s3url,
                            "status": "New"
                        };
                        formValues.push(formValue);
                    }
                    return Promise.resolve(formValues);
                }


                function s3upload(image, configuration) {

                    return new Promise(function (resolve, reject) {
                        S3FileUpload
                            .uploadFile(image, configuration)
                            .then((Data) => {
                                resolve(Data.location);
                            })
                            .catch((error) => {
                            })
                    })
                }
                function getConfig() {
                  return new Promise(function (resolve, reject) {
                      axios
                        .get('/api/projectsettings/get/S3')
                        .then((response) => {
                            const config = {
                                bucketName: response.data.bucket,
                                dirName: 'propertiesImages',
                                region: response.data.region,
                                accessKeyId: response.data.key,
                                secretAccessKey: response.data.secret,
                            }
                            resolve(config);
                        })
                        .catch(function (error) {
                        })
                    })
                }
            }
        }
    }
    deleteDocSingle(event){
    event.preventDefault();
        var name = event.target.getAttribute("name");
      
        this.setState({
            [name]: ""
        })
  }
  handlePincode(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
    if (event.target.value !== '') {
      axios.get("https://api.postalpincode.in/pincode/" + event.target.value)
        .then((response) => {
          if ($("[name='pincode']").valid()) {

            if (response.data[0].Status === 'Success') {
              this.setState({ pincodeExists: true })
            } else {
              this.setState({ pincodeExists: false })
            }
          } else {
            this.setState({ pincodeExists: true })
          }

        })
        .catch((error) => {
        })
    } else {
      this.setState({ pincodeExists: true })
    }
  }
  handleworklocationChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var value = event.target.value;
        this.setState({
            [name]: event.target.value,
             // [name]: $(event.target.getattribute(id)
        },()=>{
            if(this.state[name] == this.state.corporate){
                this.getCorporateLocation(value, '');
                this.setState({
                    corporateLocation : ''
                })
                // console.log("this.state.corporateLocation",this.state.corporateLocation);
            }else if(this.state[name] == this.state.corporateLocation && this.state.corporate){
                this.getCorporateLocation(this.state.corporate, this.state.corporateLocation);
            }
        });
    }
 /*   handlecorporateChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var id = event.target.value;

        this.setState({
            [name]:event.target.id,
        },()=>{
            if(this.state[name] == this.state.corporateID){
                this.getCorporateLocation(id, '');
                this.setState({
                    corporateLocation : ''
                })
                // console.log("this.state.corporateLocation",this.state.corporateLocation);
            }else if(this.state[name] == this.state.corporateLocation && this.state.corporateID){
                this.getCorporateLocation(this.state.corporateID, this.state.corporateLocation);
            }
        });
    }*/
    getCorporate(entityCode){
        axios.get('/api/entitymaster/get/corporate')
    .then((response) => {
      this.setState({
        corporateArray: response.data
      },()=>{
        console.log("corporateArray.....",this.state.corporateArray);
        if(this.state.corporateArray && this.state.corporateArray.lenght>0){
          var EntityCode=this.state.corporateArray.filter((a)=>a.entityCode== entityCode);
           console.log('EntityCode', EntityCode);
        }
      })

    })
    .catch((error) => {
      
    })
    }
    getCorporateLocation(vendorId, vendorLocationId){

        axios.get('/api/entitymaster/get/one/'+vendorId)
        .then((response)=>{
            this.setState({
                selectedCorporate : response.data,
                corporateLocationArray: response.data.locations
            },()=>{
                console.log("corporateLocationArray",this.state.corporateLocationArray);
                if(this.state.corporateLocationArray && this.state.corporateLocationArray.length>0){
                    var selectedCorporateLocation = this.state.corporateLocationArray.filter((a)=> a._id == vendorLocationId);
                    console.log('selectedCorporateLocation', selectedCorporateLocation);
                    this.setState({
                        selectedCorporateLocation : selectedCorporateLocation[0]
                    })
                }else{
                    this.setState({
                        selectedCorporateLocation : []
                    })
                }
            })
        })
        .catch((error)=>{

        })
    }

  render() {
    console.log("this.props",this.props)
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
            <section className="content">
              <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                  <h4 className="weighttitle col-lg-9 col-md-6 col-xs-6 col-sm-6 NOpadding-right">{"Add  "+this.Capitalize(this.state.pathname)}</h4>
                  <ul className="nav tabNav nav-pills col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <li className="active col-lg-5 col-md-5 col-xs-5 col-sm-5 NOpadding text-center"><a data-toggle="pill"  href="#manual">Manual</a></li>
                    <li className="col-lg-6 col-md-6 col-xs-6 col-sm-6 NOpadding  text-center"><a data-toggle="pill"  href="#bulk">Bulk Upload</a></li>
                  </ul>
                </div>
               {/* { this.state.pathname=="employee" ?
                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                  <SelectCorporate />
                </div>
                : 
                null
              }*/}
              {this.state.pathname=="employee" ?

                <form className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12" id="SelectVendor">
                    <div className="form-margin col-lg-4 col-md-6 col-sm-12 col-xs-12" >
                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Corporate <sup className="astrick">*</sup></label>
                        <select id="vendor" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.corporate} ref="corporate" name="corporate" onChange={this.handleworklocationChange.bind(this)}>
                            <option>--Select Corporate--</option>
                            {
                                this.state.corporateArray && this.state.corporateArray.length > 0 ?
                                    this.state.corporateArray.map((data, i)=>{
                                        return(
                                            <option key={i} value={data._id}>{data.companyName}</option>
                                            // <option key={i} id={data.entityCode}>{data.entityCode}</option>
                                        );
                                    })
                                :
                                null
                            }
                        </select>
                    </div>
                    <div className="form-margin col-lg-4 col-md-6 col-sm-12 col-xs-12 marbtm30" >
                       <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Work Location <sup className="astrick">*</sup></label>
                        <select id="vendorLocation" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.workLocation} ref="workLocation" name="workLocation" onChange={this.handleworklocationChange.bind(this)}>
                            <option>--Select Work Location--</option>
                            {
                                this.state.corporateLocationArray && this.state.corporateLocationArray.length > 0 ?
                                    this.state.corporateLocationArray.map((data, i)=>{
                                        return(
                                            <option key={i} value={data._id}>{((data.locationType).match(/\b(\w)/g)).join('')} - {data.area} {data.city}, {data.stateCode} - {data.countryCode}  </option>
                                        );
                                    })
                                :
                                null
                            }
                        </select>
                    </div>
                    
                   {/* <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <button onClick={this.submit.bind(this)} className="btn button3 pull-right">Save & Next</button>
                    </div>*/}
                </form>
                :
                null
               } 
                <section className="Content" >
                  <div className="row tab-content">
                    <div id="manual" className="tab-pane fade in active col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                      <form id="BasicInfo">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding ">
                          <div className="col-lg-12 col-md-12 col-sm-12 supplierForm">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                              <br />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls NOpadding-left driver guest employee person NOpadding-right">
                                <label className="subHead col-lg-12 col-md-12 col-sm-12 col-xs-12 person "> Basic Details</label>
                               
                                <div className="form-margin col-lg-9 col-md-12 col-sm-12 col-xs-12 NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12  driver employee guest person" >
                                    <div id="firstName">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">First Name <i className="astrick">*</i></label>
                                      <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.firstName} ref="firstName" name="firstName" onChange={this.handleChange} onKeyDown={this.isTextKey.bind(this)}/>
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12  driver employee guest person" >
                                    <div id="middleName">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Middle Name <i className="astrick">*</i></label>
                                      <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.middleName} ref="middleName" name="middleName" onChange={this.handleChange} onKeyDown={this.isTextKey.bind(this)}  />
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver employee guest person">
                                    <div id="lastName">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Last Name <i className="astrick">*</i></label>
                                      <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.lastName} ref="lastName" name="lastName" onChange={this.handleChange} onKeyDown={this.isTextKey.bind(this)} />
                                    </div>
                                  </div>
                                </div>

                                <div className="form-margin col-lg-9 col-md-12 col-sm-12 col-xs-12 driver guest employee person NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver employee person">
                                    <div id="DOB">    
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">DOB <i className="astrick">*</i></label>
                                      <input type="date" id="DOB" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.DOB} max={moment(new Date).format("YYYY-MM-DD")} ref="DOB" name="DOB" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver employee guest person">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Gender</label>
                                      <div className="btn-group btn-group-toggle col-lg-12 nopadding" data-toggle="buttons">
                                       <label className={this.state.toggleButtonValue === "Male" ? "btn toggleButton customToggleButton col-lg-3 btn-secondary active" : "btn toggleButton customToggleButton col-lg-3 btn-secondary "} value="Male" onClick={this.getSelectedGender.bind(this,"Male")}  >
                                          <input type="radio"
                                           name="options" 
                                           id="Male"
                                           value="male"
                                           autoComplete="off"
                                           checked={this.state.toggleButtonValue === "Male" ? "checked" : "unchecked" }
                                           /> Male
                                        </label>
                                        <label className={this.state.toggleButtonValue === "Female" ? "btn toggleButton customToggleButton col-lg-3 btn-secondary active" : "btn toggleButton customToggleButton col-lg-3 btn-secondary "} value="Female" onClick={this.getSelectedGender.bind(this,"Female")}>
                                          <input type="radio" name="options" id="Female"  value="Female" autoComplete="off" checked={this.state.toggleButtonValue === "Female" ? "checked" : "unchecked" }  /> Female
                                        </label>
                                        <label className={this.state.toggleButtonValue === "Transgender" ? "btn toggleButton customToggleButton col-lg-5 noRightMargin btn-secondary active" : "btn toggleButton customToggleButton noRightMargin col-lg-5 btn-secondary "} value="Transgender" onClick={this.getSelectedGender.bind(this,"Transgender")}>
                                          <input type="radio" name="options" id="Transgender" autoComplete="off" checked={this.state.toggleButtonValue === "Transgender" ? "checked" : "unchecked" }  /> Transgender
                                        </label>
                                      </div>
                                    
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 driver guest employee person" >
                                    <div id="email"> 
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Email <i className="astrick">*</i>
                                        <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="testemail@gmail.com" className="fa fa-question-circle"></i> </a>

                                      </label>
                                      <input type="email"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" value={this.state.email} ref="email" name="email" onChange={this.handleChange} placeholder="testemail@gmail.com" />
                                    </div>
                                  </div>
                                  
                                </div>
                                 <div className=" col-lg-3 col-md-12 col-sm-12 col-xs-12 ">
                                  <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadImage nopadding ">
                                    <div className="col-lg-12 col-md-2 col-sm-12 col-xs-12 driver employee guest person nopadding ">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profileImageDiv" id="LogoImageUpOne">
                                            <div><i className="fa fa-camera"></i> <br /><p>UPLOAD PHOTO</p></div>
                                            <input onChange={this.docBrowseSingle.bind(this)}  id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="profilePhoto" />
                                        </div>
                                      
                                      {
                                          this.state.profilePhoto ?
                                            <div className="col-lg-12 col-md-2 col-sm-12 col-xs-12 nopadding CustomImageUpload">
                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                      <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={this.state.profilePhoto} name="profilePhoto" onClick={this.deleteDocSingle.bind(this)}>x</label>
                                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogosPM" id="profilePhoto">
                                                         
                                                         {
                                                          this.state.profilePhoto?
                                                            <img src={this.state.profilePhoto} className="img-responsive profileImageDivlogoStyle2" />
                                                            :
                                                            <img src="/images/login.png" className="img-responsive profileImageDivlogoStyle2" />
                                                         } 
                                                          
                                                      </div>
                                                  </div>
                                            </div>
                                            :
                                            null
                                            
                                        }
                                      </div>
                                    </div>
                                    </div>
                                    
                                </div>
                                <div className="form-margin col-lg-9 col-md-12 col-sm-12 col-xs-12 driver guest employee person NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver guest employee person">
                                    <div id="contactNumber">
                                      <label className="labelform  NOpadding-left">Contact Number <i className="astrick">*</i></label>
                                      <PhoneInput
                                        country={'in'}
                                        value={this.state.contactNumber}
                                        name="contactNumber"
                                        inputProps={{
                                          name: 'contactNumber',
                                          required: true
                                        }}
                                        onChange={this.changeMobile.bind(this)}
                                      />
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver employee person">
                                    <label className="labelform  NOpadding-left">Alternate Number </label>
                                    <PhoneInput
                                      country={'in'}
                                      value={this.state.alternateNumber}
                                      name="alternateNumber"
                                      inputProps={{
                                        name: 'alternateNumber',
                                        required: true
                                      }}
                                       onChange={this.changeMobileAlternate.bind(this)}
                                    />
                                  </div>
                                  
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver employee person">
                                   
                                    <label className="labelform  NOpadding-left">Whatsapp Number</label>
                                    <PhoneInput
                                      country={'in'}
                                      value={this.state.whatsappNumber}
                                      name="whatsappNumber"
                                      inputProps={{
                                        name: 'whatsappNumber',
                                        required: true
                                      }}
                                      onChange={this.changeMobileWhatsapp.bind(this)}
                                    />
                                  </div>
                                </div>
                                <div className="form-margin col-lg-9 col-md-12 col-sm-12 col-xs-12  employee person NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver employee person">
                                    <div id="department">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Department <i className="astrick">*</i></label>
                                      <select className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                        ref="department" value={this.state.department} name="department" onChange={this.handleChangeDepartment} >
                                        <option selected={true} disabled={true} >-- Select --</option>
                                        {
                                          this.state.departmentArray && this.state.departmentArray.length > 0 ?
                                            this.state.departmentArray.map((deptData, index) => {
                                              return (
                                                <option key={index} value={deptData._id}>{(deptData.department)}</option>
                                              );
                                            }
                                            ) : ''
                                        }
                                      </select>
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee person">
                                    <div id="designation">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Designation <i className="astrick">*</i></label>
                                      <select  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="designation" value={this.state.designation} name="designation" onChange={this.handleChangeDesignation}>
                                        <option selected={true} disabled={true} >-- Select --</option>
                                        {
                                          this.state.designationArray && this.state.designationArray.length > 0 ?
                                            this.state.designationArray.map((desData, index) => {
                                              return (
                                                <option key={index} value={desData._id}>{(desData.designation)}</option>
                                              );
                                            }) : ''
                                        }
                                      </select>
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee person">
                                    <div id="employeeID">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Employee ID <i className="astrick">*</i></label>
                                      <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.employeeID} ref="employeeID" name="employeeID" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                </div>
                                <div className="form-margin col-lg-9 col-md-12 col-sm-12 col-xs-12  employee person NOpadding-left NOpadding-right">
                                    <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
                                      <label className="subHeadingPM col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Create Login Credential</label>
                                      <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label className={this.state.loginCredential === "Yes" ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value="Yes" onClick={this.getSelectedLoginValue.bind(this,"Yes")}>
                                          <input type="radio"
                                            name="options" 
                                            id="yes"
                                            value="yes"
                                            autocomplete="off"
                                            checked
                                            />Yes
                                        </label>
                                        <label className={this.state.loginCredential === "No" ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value="One Way" onClick={this.getSelectedLoginValue.bind(this,"No")} >
                                          <input type="radio" name="options" id="no"  value="no" autocomplete="off" /> No
                                        </label>
                                      </div>
                                    </div>
                                   {/* <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
                                       <div id="workLocation">
                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Work Location <i className="astrick">*</i></label>
                                        
                                        <select  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.workLocation} ref="workLocation" name="workLocation" onChange={this.handleChange.bind(this)}>
                                            <option hidden="hidden">--Select Location--</option>
                                            {
                                                this.state.companyLocationArray && this.state.companyLocationArray.length > 0 ?
                                                    this.state.companyLocationArray.map((data, i) => {
                                                        return (
                                                            <option key={i} value={((data.locationType).match(/\b(\w)/g)).join('')+"-"+data.area+"-" +data.city+"-"+data.stateCode+"-"+data.countryCode}>{((data.locationType).match(/\b(\w)/g)).join('')} - {data.area} {data.city}, {data.stateCode} - {(data.countryCode)}  </option>
                                                        );
                                                    })
                                                    :
                                                    null
                                            }
                                        </select>
                                      </div>
                                    </div>*/}
                                </div>
                                <div className="form-margin col-lg-9 col-md-12 col-sm-12 col-xs-12  employee person NOpadding-left NOpadding-right">
                                    <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
                                      <label className="subHeadingPM col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Booking Approval Required</label>
                                      <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label className={this.state.getSelectedTrip === "Yes" ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value="Yes" onClick={this.getSelectedTrip.bind(this,"Yes")}>
                                          <input type="radio"
                                            name="options" 
                                            id="yes"
                                            value="yes"
                                            autocomplete="off"
                                            checked
                                            />Yes
                                        </label>
                                        <label className={this.state.getSelectedTrip === "No" ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value="One Way" onClick={this.getSelectedTrip.bind(this,"No")} >
                                          <input type="radio" name="options" id="no"  value="no" autocomplete="off" /> No
                                        </label>
                                      </div>
                                    </div>
                                     {
                                      this.state.getSelectedTrip === "Yes"?
                                          <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
                                           <div id="approvingAuthorityId1"> 
                                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Approving Authority Id1<i className="astrick">*</i></label>
                                              <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.approvingAuthorityId1} ref="approvingAuthorityId1" name="approvingAuthorityId1" onChange={this.handleChange} />
                                            </div>
                                          </div>

                                      :
                                      null
                                      }
                                      {
                                      this.state.getSelectedTrip === "Yes"?
                                          <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
                                           <div id="approvingAuthorityId2"> 
                                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Approving Authority Id2<i className="astrick">*</i></label>
                                              <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.approvingAuthorityId2} ref="approvingAuthorityId2" name="approvingAuthorityId2"   onChange={this.handleChange} />
                                            </div>
                                          </div>
                                      :
                                      null
                                  }
                                </div>
                                <div className="form-margin col-lg-9 col-md-12 col-sm-12 col-xs-12  employee person NOpadding-left NOpadding-right">
                                  {
                                      this.state.getSelectedTrip === "Yes"?
                                          <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
                                           <div id="approvingAuthorityId3"> 
                                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Approving Authority Id3<i className="astrick">*</i></label>
                                              <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.approvingAuthorityId3} ref="approvingAuthorityId3" name="approvingAuthorityId3"   onChange={this.handleChange} />
                                            </div>
                                          </div>
                                      :
                                      null
                                  }
                                  {
                                      this.state.getSelectedTrip === "Yes"?
                                          <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
                                           <div id="preApprovedParameter"> 
                                            <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Pre Approved Parameter <i className="astrick">*</i></label>
                                            <select className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                              ref="preApprovedParameter" name="preApprovedParameter" value={this.state.preApprovedParameter} onChange={this.handleChange}>
                                              <option selected={true} disabled={true}>-- Select --</option>
                                              <option>Amount</option>
                                              <option>Number Of Ride</option>
                                              <option>Kilometer</option>
                                            </select>
                                           </div>
                                          </div>
                                      :
                                      null
                                  }
                                  {
                                      this.state.getSelectedTrip === "Yes"?
                                          <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 employee  person">
                                           <div id="preApprovedParameterValue"> 
                                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Pre Approved {this.state.preApprovedParameter}<i className="astrick">*</i></label>
                                              <input type="number" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.preApprovedParameterValue} ref="preApprovedParameterValue" name="preApprovedParameterValue"  onKeyDown={this.keyPressNumber.bind(this)}  onChange={this.handleChange} />
                                            </div>
                                          </div>
                                      :
                                      null
                                  }
                                </div>
                                
                               
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 driver employee  person borderBottom">
                                </div>
                                <label className="subHead col-lg-12 col-md-12 col-sm-12 col-xs-12 driver person employee">Home Address Details</label>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person employee">
                                    <div id="addressLine1"> 
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Address Line 1 <i className="astrick">*</i></label>
                                      <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.addressLine1} ref="addressLine1" name="addressLine1" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person employee">
                                    <div id="addressLine2"> 
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Address Line 2 </label>
                                      <input type="text" id="addressLine2" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.addressLine2} ref="addressLine2" name="addressLine2" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person employee">
                                    <div id="landmark"> 
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Landmark </label>
                                      <input type="text" id="landmark" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.landmark} ref="landmark" name="landmark" onChange={this.handleChange}  />
                                    </div>
                                  </div>
                                </div>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12  driver employee person NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person employee">
                                    <div id="country"> 
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Country <i className="astrick">*</i></label>
                                      <select className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                        ref="country" name="country" id="countryVal" value={this.state.country} onChange={this.handleChangeCountry} >
                                        <option selected={true}>-- Select --</option>
                                        <option value="IN|India">India</option>
                                      </select>
                                   </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person employee">
                                    <div id="states"> 
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">State <i className="astrick">*</i></label>
                                      <select className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                        ref="states" value={this.state.states} name="states" onChange={this.handleChangeState} >
                                        <option selected={true} disabled={true}>-- Select --</option>
                                        {
                                          this.state.stateArray && this.state.stateArray.length > 0 ?
                                            this.state.stateArray.map((stateData, index) => {
                                              return (
                                                <option key={index} value={stateData.stateCode+"|"+stateData.stateName}>{this.camelCase(stateData.stateName)}</option>
                                              );
                                            }) : ''
                                        }
                                      </select>
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person employee">
                                    <div id="district">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">District <i className="astrick">*</i></label>
                                      <select id="district" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                        ref="district" name="district" value={this.state.district} onChange={this.handleChange} >
                                        <option selected={true} disabled={true}>-- Select --</option>
                                        {
                                          this.state.districtArray && this.state.districtArray.length > 0 ?
                                            this.state.districtArray.map((districtdata, index) => {
                                              return (
                                                <option key={index} value={districtdata.districtName}>{this.camelCase(districtdata.districtName)}</option>
                                              );
                                            }
                                          ) : ''
                                        }
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12   driver employee person NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12  driver person employee">
                                    <div id="area">  
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Area <i className="astrick">*</i></label>
                                      <input type="text" id="area" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.area} ref="area" name="area" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12  driver person employee">
                                    <div id="city">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">City <i className="astrick">*</i></label>
                                      <input type="text" id="city" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.city} ref="city" name="city" onChange={this.handleChange} required />
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver employee person">
                                    <div id="pincode">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Pincode <i className="astrick">*</i></label>
                                      <input maxLength="6" onChange={this.handlePincode.bind(this)}  type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.pincode} ref="pincode" name="pincode" onKeyDown={this.keyPressNumber.bind(this)} />
                                      {this.state.pincodeExists ? null : <label style={{ color: "red", fontWeight: "100" }}>This pincode does not exists!</label>}

                                    </div>
                                  </div>
                                </div>
                                {/*<div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12  employee person NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12  driver person employee">
                                    <div id="workLocation">  
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Work Location <i className="astrick">*</i></label>
                                      <input type="text" id="workLocation" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.workLocation} ref="workLocation" name="workLocation" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                </div>*/}
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 person driver borderBottom">
                                </div>
                                <label className="subHead col-lg-12 col-md-12 col-sm-12 col-xs-12 driver  person">License Details</label>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver  person">
                                    <div id="licenseNumber">  

                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">License Number <i className="astrick">*</i>
                                        <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="GJ1220190000001" className="fa fa-question-circle"></i> </a>
                                      </label>
                                      <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.licenseNumber} ref="licenseNumber" name="licenseNumber" placeholder="MH2220675583563" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver  person">
                                    <div id="badgeNumber">  
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Badge Number
                                        {/*<a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="" className="fa fa-question-circle"></i> </a>*/}
                                      </label>
                                      <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.badgeNumber} ref="badgeNumber" name="badgeNumber" placeholder="" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver  person">
                                    <div id="effectiveUpto">  
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Valid Upto <i className="astrick">*</i>
                                      </label>
                                      <input type="date" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.effectiveUpto} ref="effectiveUpto" name="effectiveUpto" min={moment(new Date).format("YYYY-MM-DD")} onChange={this.handleChange} />
                                    </div>
                                  </div>
                                
                                </div>
                                <div className="form-margin col-lg-8 col-md-12 col-sm-12 col-xs-12  driver person NOpadding-left NOpadding-right">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  driver person ">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">License Proof (jpg, jpeg, png, pdf)  <i className="astrick">*</i></label>
                                  <div className="col-lg-1 col-md-2 col-sm-12 col-xs-12 driver person nopadding">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                          <div><i className="fa fa-upload"></i></div>
                                          <input multiple onChange={this.docBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="licenseProof" />
                                      </div>
                                    </div>
                                  </div>
                                  {
                                    this.state.licenseProof && this.state.licenseProof.length > 0 ?
                                        this.state.licenseProof.map((logo, i) => {
                                            return (
                                                <div key={i} className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                        <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={logo} name="licenseProof" onClick={this.deleteDoc.bind(this)}>x</label>
                                                        {
                                                          (logo ? logo.split('.').pop() : "") === "pdf" || (logo ? logo.split('.').pop() : "") === "PDF" ?
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdfContainerPM" id="LogoImageUpOne">
                                                              <img src="/images/pdfImg.png"/>
                                                              <span>{(logo ? logo.split('.').pop() : "")}</span>
                                                          </div>
                                                          :
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos2" id="licenseProof">
                                                            <img src={logo} className="img-responsive logoStyle2" />
                                                          </div>
                                                        }

                                                    </div>
                                                </div>
                                            );
                                        })
                                        :
                                        null
                                  }
                                  </div>

                                </div>
                             
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 person driver borderBottom">
                                </div>
                                <label className="subHead col-lg-12 col-md-12 col-sm-12 col-xs-12 driver person">Aadhar Details</label>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12  driver person NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person">
                                    <div id="aadharNumber">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Aadhar Number <i className="astrick">*</i>
                                        <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="628758647321" className="fa fa-question-circle"></i> </a>
                                      </label>
                                      <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.aadharNumber} placeholder="620876674532" ref="aadharNumber" name="aadharNumber" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                  <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12  driver person">
                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding driver person">Aadhar Proof (jpg, jpeg, png, pdf)  <i className="astrick">*</i></label>
                                    <div className="col-lg-1 col-md-2 col-sm-12 col-xs-12 driver NOpadding person">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                            <div><i className="fa fa-upload"></i></div>
                                            <input multiple onChange={this.docBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="aadharProof" />
                                        </div>
                                      </div>
                                    </div>

                                    {
                                      this.state.aadharProof && this.state.aadharProof.length > 0 ?
                                          this.state.aadharProof.map((logo, i) => {
                                              return (
                                                  <div key={i} className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                          <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={logo} name="aadharProof" onClick={this.deleteDoc.bind(this)}>x</label>
                                                          {
                                                          (logo ? logo.split('.').pop() : "") === "pdf" || (logo ? logo.split('.').pop() : "") === "PDF" ?
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdfContainerPM" id="LogoImageUpOne">
                                                              <img src="/images/pdfImg.png"/>
                                                              <span>{(logo ? logo.split('.').pop() : "")}</span>
                                                          </div>
                                                          :
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos2" id="aadharProof">
                                                              <img src={logo} className="img-responsive logoStyle2" />
                                                          </div>
                                                         }
                                                          
                                                      </div>
                                                  </div>
                                              );
                                          })
                                          :
                                          null
                                  }
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 person driver borderBottom">
                                </div>
                                <label className="subHead col-lg-12 col-md-12 col-sm-12 col-xs-12 driver person">Background Verification Details</label>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12  driver person NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person">
                                    <div id="verificationNumber">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Verification Number <i className="astrick">*</i>
                                        <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="" className="fa fa-question-circle"></i> </a>
                                      </label>
                                      <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.verificationNumber} placeholder="" ref="verificationNumber" name="verificationNumber" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                  <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12  driver person">
                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding driver person">Background Verification Proof (jpg, jpeg, png, pdf)  <i className="astrick">*</i></label>
                                    <div className="col-lg-1 col-md-2 col-sm-12 col-xs-12 driver NOpadding person">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                           <div id="loader_img">
                                             <img scr="/images/loading.gif"/>
                                           </div>
                                            <div><i className="fa fa-upload"></i></div>
                                            <input multiple onChange={this.docBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="verificationProof" alt={"/images/loading.gif"} />
                                        </div>
                                      </div>
                                    </div>

                                    {
                                      this.state.verificationProof && this.state.verificationProof.length > 0 ?
                                          this.state.verificationProof.map((logo, i) => {
                                              return (
                                                  <div key={i} className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                          <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={logo} name="verificationProof" title="delete" onClick={this.deleteDoc.bind(this)}>x</label>
                                                          {
                                                          (logo ? logo.split('.').pop() : "") === "pdf" || (logo ? logo.split('.').pop() : "") === "PDF" ?
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdfContainerPM" id="LogoImageUpOne">
                                                              <img src="/images/pdfImg.png"/>
                                                              <span>{(logo ? logo.split('.').pop() : "")}</span>
                                                          </div>
                                                          :
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos2" id="aadharProof">

                                                              <img src={logo} className="img-responsive logoStyle2" />
                                                          </div>
                                                         }

                                                      </div>
                                                  </div>
                                              );
                                          })
                                          :
                                         null
                                  }
                                  </div>
                                </div>
                                <label className="subHead col-lg-12 col-md-12 col-sm-12 col-xs-12 driver person">Address Proof</label>
                                {/*
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person">
                                     <div id="panNumber">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">PAN Number <i className="astrick">*</i>
                                        <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="AYBOL0998L" className="fa fa-question-circle"></i> </a>
                                      </label>
                                      <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.panNumber} ref="panNumber" placeholder="AYBOL0998L" name="panNumber" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                </div>*/}
                                <div className="form-margin col-lg-6 col-md-12 col-sm-12 col-xs-12  driver person NOpadding-left NOpadding-right">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding driver person">Upload (jpg, jpeg, png, pdf)  <i className="astrick">*</i></label>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 person driver">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                          <div><i className="fa fa-upload"></i></div>
                                          <input multiple onChange={this.docBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="addressProof" />
                                      </div>
                                    </div>
                                  </div>
                                  {
                                    this.state.addressProof && this.state.addressProof.length > 0 ?
                                        this.state.addressProof.map((logo, i) => {
                                            return (
                                                <div key={i} className="col-lg-2 col-md-2 col-sm-12 col-xs-12 NOpadding-left">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                        <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={logo} name="panProof" onClick={this.deleteDoc.bind(this)}>x</label>
                                                       {
                                                          (logo ? logo.split('.').pop() : "") === "pdf" || (logo ? logo.split('.').pop() : "") === "PDF" ?
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdfContainerPM" id="LogoImageUpOne">
                                                              <img src="/images/pdfImg.png"/>
                                                              <span>{(logo ? logo.split('.').pop() : "")}</span>
                                                          </div>
                                                          :
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos2" id="aadharProof">
                                                              <img src={logo} className="img-responsive logoStyle2" />
                                                          </div>
                                                         }
                                                    </div>
                                                </div>
                                            );
                                        })
                                        :
                                        null
                                }
                                </div>
                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 person driver borderBottom">
                                </div>
                               
                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 person borderBottom">
                                </div>
                                {/*<label className="subHead col-lg-12 col-md-12 col-sm-12 col-xs-12 driver person">Voting Details</label>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 driver person NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person">
                                    <div id="voterId">    
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Voter ID <i className="astrick">*</i>
                                        <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="YUC1234567" className="fa fa-question-circle"></i> </a>
                                      </label>
                                      <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.voterId} ref="voterId" name="voterId" placeholder="YUC1234567" onChange={this.handleChange} />
                                    </div> 
                                  </div>
                                </div>*/}
                                <label className="subHead col-lg-12 col-md-12 col-sm-12 col-xs-12 driver person">Identity Proof</label>
                                <div className="form-margin col-lg-6 col-md-12 col-sm-12 col-xs-12 driver person NOpadding-left NOpadding-right">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding driver person">Upload (jpg, jpeg, png, pdf)  <i className="astrick">*</i></label>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 driver person ">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                          <div><i className="fa fa-upload"></i></div>
                                          <input multiple onChange={this.docBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="identityProof" />
                                      </div>
                                    </div>
                                  </div>
                                  {
                                    this.state.identityProof && this.state.identityProof.length > 0 ?
                                        this.state.identityProof.map((logo, i) => {
                                            return (
                                                <div key={i} className="col-lg-2 col-md-2 col-sm-12 col-xs-12 NOpadding-left">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                        <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={logo} name="identityProof" onClick={this.deleteDoc.bind(this)}>x</label>
                                                        {
                                                          (logo ? logo.split('.').pop() : "") === "pdf" || (logo ? logo.split('.').pop() : "") === "PDF" ?
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdfContainerPM" id="LogoImageUpOne">
                                                              <img src="/images/pdfImg.png"/>
                                                              <span>{(logo ? logo.split('.').pop() : "")}</span>
                                                          </div>
                                                          :
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos2" id="aadharProof">
                                                              <img src={logo} className="img-responsive logoStyle2" />
                                                          </div>
                                                         }
                                                    </div>
                                                </div>
                                            );
                                        })
                                        :
                                        null
                                }
                                </div>
                               {/*  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 person borderBottom">
                                </div>
                                <label className="subHead col-lg-12 col-md-12 col-sm-12 col-xs-12 driver person">Passport Details</label>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 driver person NOpadding-left NOpadding-right">
                                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person">
                                    <div id="passportNumber">  
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Passport Number <i className="astrick">*</i>
                                        <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="UC1234567" className="fa fa-question-circle"></i> </a>
                                      </label>
                                      <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.passportNumber} ref="passportNumber" placeholder="UC1234567" name="passportNumber" onChange={this.handleChange} />
                                    </div>
                                  </div>
                                </div>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 driver person NOpadding-left NOpadding-right">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding driver person">Passport Proof (jpg, jpeg, png, pdf)  <i className="astrick">*</i></label>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 driver person">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                          <div><i className="fa fa-camera"></i> <br /><p>ADD DOCUMENT</p></div>
                                          <input multiple onChange={this.docBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="passportProof" />
                                      </div>
                                    </div>
                                  </div>
                                  {
                                    this.state.passportProof && this.state.passportProof.length > 0 ?
                                        this.state.passportProof.map((logo, i) => {
                                            return (
                                                <div key={i} className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                        <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={logo} name="passportProof" onClick={this.deleteDoc.bind(this)}>x</label>
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos2" id="passportProof">
                                                            <img src={logo} className="img-responsive logoStyle2" />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                        :
                                        null
                                }
                                </div>
                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 person borderBottom">
                                </div>
                              */}

                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                            {
                              this.state.personID?
                              <button className="btn button3 pull-right" onClick={this.updatePerson.bind(this)} >Update&nbsp;</button>
                                :
                              <button className="btn button3 pull-right" onClick={this.submitPerson.bind(this)} >Submit&nbsp;</button>
                            }
                            </div>
                        </div>
                        </div>
                      </form>
                    </div>

                     <div id="bulk" className="tab-pane fade in col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerForm">
                        <BulkUpload url="/api/personMaster/bulkUploadEmployee" 
                        data={{"type" : "employee", "createdBy" : localStorage.getItem("user_ID"), "corporateId": localStorage.getItem("corporate_ID") }} 
                        uploadedData={this.uploadedData} 
                        fileurl="https://iassureitlupin.s3.ap-south-1.amazonaws.com/bulkupload/Create+Family.xlsx"
                        getFileDetails={this.getFileDetails.bind(this)}
                        fileDetails={this.state.fileDetails}
                        goodRecordsHeading ={this.state.goodRecordsHeading}
                        failedtableHeading={this.state.failedtableHeading}
                        failedRecordsTable ={this.state.failedRecordsTable}
                        failedRecordsCount={this.state.failedRecordsCount}
                        goodRecordsTable={this.state.goodRecordsTable}
                        goodDataCount={this.state.goodDataCount}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(PersonMaster);