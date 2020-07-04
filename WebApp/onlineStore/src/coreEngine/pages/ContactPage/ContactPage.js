import React, { Component } from 'react';
import jQuery from "jquery";
import axios                    from 'axios';
import Message from '../../blocks/Message/Message.js';
import $ from "jquery";
import Loader from "../../common/loader/Loader.js";
import "../../../sites/currentSite/pages/ContactPage.css";

class ContactPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            message:"",
            companyInfo : []
        }
    } 

  submitQuery(){
    var formValues = {
      "customerName" : this.refs.firstName.value,
      "customerMobile" : this.refs.mobNumber.value,
      "query"        : this.refs.message.value
    }
    
    if ($(".contactpageform").valid()) {
      $('.fullpageloader').show();
      axios.post("/api/customerQuery/post",formValues)
      .then((response)=>{ 
        $('.fullpageloader').hide();
        this.setState({
          messageData : {
            "type" : "outpage",
            "icon" : "fa fa-check-circle",
            "message" : "&nbsp; "+response.data.message,
            "class": "success",
            "autoDismiss" : true
          }
        })
        setTimeout(() => {
          this.setState({
              messageData   : {},
          })
      }, 3000);
        //jQuery("#customercareModal").modal("hide");
         this.setState({message:''})
        })
      .catch((error)=>{
            console.log('error', error);
      })
    }
  }
  componentDidMount(){
    this.getUserData(); 
    this.getCompanyDetails(); 
    this.formValidation();
  }
  formValidation() {
        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });

        $(".contactpageform").validate({
            rules: {
                firstName: {
                    required: true
                },
                mobNumber: {
                    required: true,
                },
                message: {
                    required: true,
                }
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") === "name") {
                    error.insertAfter("#name");
                }
                if (element.attr("name") === "mobileno") {
                    error.insertAfter("#mobileno");
                }
                if (element.attr("name") === "message") {
                    error.insertAfter("#message");
                }
            }
        });
    }
  getUserData(){
    const userid = localStorage.getItem('user_ID');
     // console.log("contactuserid-----------------------------------------",userid);
     axios.get('/api/users/'+ userid)
        .then( (res)=>{
          var FName = res.data.profile.fullName;
          var Mnob  = res.data.mobileNumber;

        this.refs.firstName.value = FName 
        this.refs.mobNumber.value = Mnob

     
        })
        .catch((error)=>{
          console.log("error = ",error);
          // alert("Something went wrong! Please check Get URL.");
        });
  }
  getCompanyDetails(){
    axios.get("/api/companysettings/list")
      .then((response)=>{ 
          this.setState({
            companyInfo   : response.data[0]
          },
            ()=>{
          })
      })
      .catch((error)=>{
            console.log('error', error);
      })
    }
  handleChange(event) {
      event.preventDefault();
      const target = event.target;
      const name = target.name;
      this.setState({
          [name]: event.target.value
      });  
  }


    Closepagealert(event){
    event.preventDefault();
    $(".toast-error").html('');
    $(".toast-success").html('');
    $(".toast-info").html('');
    $(".toast-warning").html('');
    $(".toast-error").removeClass('toast');
    $(".toast-success").removeClass('toast');
    $(".toast-info").removeClass('toast');
    $(".toast-warning").removeClass('toast');

  }

    render(){
        return(
          <div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contactcontent1-wrap">
              <Message messageData={this.state.messageData} />
                <div className="row">
                    <div className="contactcontent text-center">
                        <h6>CONTACT INFO</h6>
                        <h3>GET IN TOUCH</h3>
                    </div>
                </div>
            </div>
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contactcontent2-wrap">
               <Loader type="fullpageloader" /> 
               <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="row">
                            <div className="contactcontbackimg">
                            <div className=" contacttextmargin col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2">
                                    <h4><strong></strong></h4>
                            </div>    
                                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2">
                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                              <div className="row">
                                              </div>
                                            </div>
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                              <div className="row">
                                                <p></p>
                                              </div>
                                            </div>
                                        </div>
                                    </div>                                    
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2">
                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                              <div className="row">
                                                  <i className="fa fa-circle contacticon1"><i className="fa fa-phone contacticon21"></i></i>
                                              </div>
                                            </div>
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                              <div className="row">
                                                <h5><strong>PHONE</strong></h5>
                                                <span>{this.state.companyInfo? this.state.companyInfo.companyContactNumber:null}</span>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                              <div className="row">
                                              </div>
                                            </div>
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                              <div className="row">
                                                <p></p>
                                              </div>
                                            </div>
                                        </div>
                                    </div>                                    
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2">
                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                              <div className="row">
                                                  <i className="fa fa-circle contacticon1"><i className="fa fa-envelope contacticon22"></i></i>
                                              </div>
                                            </div>
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                              <div className="row">
                                                <h5><strong>EMAIL</strong></h5>
                                                <span>{this.state.companyInfo ? this.state.companyInfo.companyEmail:null}</span>                                                
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                              <div className="row">
                                              </div>
                                            </div>
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                              <div className="row">
                                                <p></p>
                                              </div>
                                            </div>
                                        </div>
                                    </div>                                    
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2">
                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                              <div className="row">
                                                  <i className="fa fa-circle contacticon1"><span className="glyphicon glyphicon-time contacticon23"></span></i>
                                                  <i className=""></i>
                                              </div>
                                            </div>
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                              <div className="row">
                                                <h5><strong>SHOWROOM HOURS</strong></h5>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                        <div className="row">
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                              <div className="row">
                                              </div>
                                            </div>
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                              <div className="row">
                                                <p>Monday-Friday: 10AM - 5PM</p>
                                              </div>
                                            </div>
                                        </div>
                                    </div>                                    
                              </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="row">
                          <form className="contactpageform">
                          <div className=" contacttextmargin2 col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2">
                              <div className="formcontent col-lg-12">
                                <label htmlFor="name">Name<span className="redFont">*</span></label>
                                <input disabled  className="form-control" id="name" type="text" name="name" ref="firstName"/>
                              </div>
                              <div className="formcontent col-lg-12">
                                <label htmlFor="email">Mobile No<span className="redFont">*</span></label>
                                <input disabled className="form-control" id="mobileno" type="number" name="mobileno" ref="mobNumber"/>
                              </div>
                              <div className="formcontent1 col-lg-12">
                                <label htmlFor="message">Message<span className="redFont">*</span></label>
                                <textarea className="form-control" id="message" ref="message" name="message" value={this.state.message} onChange={this.handleChange.bind(this)}></textarea>
                              </div>
                              <div onClick={this.submitQuery.bind(this)} className="btn btn-warning pull-right"> Submit</div>
                          </div>    
                        </form>
                      </div>
                    </div>

              </div>
          </div>
        </div>    
        )
    }
}
export default ContactPage;