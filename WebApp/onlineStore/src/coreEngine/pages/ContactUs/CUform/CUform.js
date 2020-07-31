import React from 'react';
import './CUform.css';
import axios from 'axios';
import $                           from 'jquery';
import jQuery                      from 'jquery';
import validate               from 'jquery-validation';
import Swal from 'sweetalert';

import Phone_Img from '../../../../sites/currentSite/images/Phone.png';
import Email_Img from '../../../../sites/currentSite/images/Email.png';
import Map_Img   from '../../../../sites/currentSite/images/Map.png';

export default class CUform extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
    	"name"      	: "",
        "email"   		: "",
        "Subject"   	: "",
        "message"     	: "",
        "formerrors"  	:{
              clientName  : " ",
              clientEmail : " ",
          	},
	    blocks: {
	        "blockComponentName"  : "Typecomponent1",
	        "blockType"       	  : "simple",
	        blockTitle  		  : "This is Block Title",
	        blockDescription  	  : "This is a Description. Some text goes here. You can replace the text as per your choice.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	        fgImage          	  : "/images/bgimage1.jpg",
	        bgImage 			  : "/images/header3.jpg",
	        repeatedBlocks 		  : [
		        						
		        						{
								        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
								        	Image :"/images/carloader.gif"
								        }
								       
							    	],
	      },
	      blockID:"",
	      block_id:""
	    }; 
        this.handleChange = this.handleChange.bind(this);

    
  }
componentDidMount(){
/*console.log("==>",this.props.block_id);*/
    $.validator.addMethod("emailRegex", function(value, element, regexpr) {        
      return regexpr.test(value);
    }, "Please enter valid Email Id");

    $("#ContactUsForm").validate({
      rules: {
        formname: {
          required: true,
        }, 
        formemail: {
          required: true,
          emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

        },
        subject: {
          required: true,
        }, 
        message: {
          required: true,
        }, 
      },
      errorPlacement: function(error, element) {
        if (element.attr("name") == "formname"){
          error.insertAfter("#formname");
        }
        if (element.attr("name") == "formemail"){
          error.insertAfter("#formemail");
        }
      }
    });
          {
             axios
                .get('/api/blocks/get/'+this.props.block_id)
                .then((response)=>{
                	console.log("res=-0-0",response.data);
                    if(response.data){

                      this.setState({
                          blocks:response.data
                      });
                    }                  
                  })           
                .catch(function(error){
                  console.log(error);
                    if(error.message === "Request failed with status code 401")
                      {
                          // swal("Your session is expired! Please login again.","", "error");
                      }
              })
            }
      this.setState({
                block_id:this.props.block_id
              });

	}

	handleChange(event){
      event.preventDefault();
      const datatype = event.target.getAttribute('data-text');
      const {name,value} = event.target;
      const formerrors = this.state.formerrors;
      this.setState({ 
      	formerrors,
        [name]:value,
/*        "name"          : this.refs.name.value,
        "email"         : this.refs.email.value,
        "Subject"       : this.refs.Subject.value,
        "message"       : this.refs.message.value,*/
      } );
    }
	Submit(event){
	    event.preventDefault();
/*	    if($('#ContactUsForm').valid()){*/

	    // var adminEmail = this.getAdminEmail();  //Get email id from company settings. Write API for that.
	    var adminEmail = "admin@unimandai.com";

	    // const formValues1 = {
	    //     "email"         : this.state.email ,
	    //     "subject"       : "Your Query/Feedback is sent successfully to www.iassureit.com!",
	    //     "text"          : "", 
	    //     "mail"          : 'Dear ' + this.state.name + ', <br/><br/>'+
	                          
	    //                       "<b>Your Email: </b>"  + this.state.email + '<br/><br/>'+
	    //                       "Your following message has been successfully delivered to the admin! We will get back to you shortly. <br/> <br/> " + 
	    //                       "===============================  <br/> <br/> " + 
	    //                       "<pre> " + this.state.message+ "</pre>" + 
	    //                       " <br/> <br/> =============================== " + 
	    //                       "<br/><br/> Thank You, <br/> Support Team, <br/> www.iassureit.com " ,

	    //   };
	    
	             
	       const formValues2 = {
	        "email"         : adminEmail ,
	        "subject"       : "New query/feedback arrived from Website!",
	        "text"          : "",
	        "mail"          : 'Dear Admin, <br/>'+
	                          "Following new query/feedback came from website! <br/> <br/> " + 
	                          "============================  <br/> <br/> " + 
	                          "<b>Client Name: </b>"   + this.state.name + '<br/>'+
	                          
	                          "<b>Client Email: </b>"  + this.state.email + '<br/><br/>'+

	                          "<pre> " + this.state.message + "</pre>" + 
	                          "<br/><br/> ============================ " + 
	                          "<br/><br/> This is a system generated email! " ,

		  };
		  //   console.log("notification",formValues1); 
	      
	        axios
	        .post('/send-email',formValues2)
	        .then((res)=>{
	        //   console.log("re==",res);
				if(res.status === 200){
				Swal("Thank you for contacting us. We will get back to you shortly.")
				}
			})
			.catch((error)=>{
				console.log("error = ", error);
				
			});
	    //   console.log("notification",formValues2); 
	      
	        // axios
	        // .post('/send-email',formValues2)
	        // .then((res)=>{ 
	        // //   console.log("re==",res);
	            
	        //           if(res.status === 200){
			// 			console.log("Mail Sent TO ADMIN successfully!")
			// 			Swal("Mail sent successfuly");
	        //           }
	        //         })
	        //         .catch((error)=>{
	        //           console.log("error = ", error);
	                  
	        //         });	           
	               
	                this.setState({
                          		name    : "",
	                			email   : "",
	                			Subject : "",
	                			message : ""
                      });
		} 

	render() {
			return (
				<div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 containerCon">
						
						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right">
							<div className="col-lg-10  col-md-12 col-sm-12 col-xs-12">

							<form className="conatctform" id="ContactUsForm">
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12  bt30">
									<h3 className="text-center"> Drop Us a Line</h3>
								</div>
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 bt30">
									
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
										{/*<label class="col-md-4 col-lg-4 col-xs-4 col-sm-4 nopadding">Your Name</label>*/}
										{/*<input className="form-control" name="from" type="text" placeholder="Your name"/>*/}
										<input className="form-control formControl" name="name" type="text" ref="name" placeholder="Your name" value={this.state.name} onChange={this.handleChange.bind(this)}/>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12  bt30">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
										{/*<label class="col-md-12 col-lg-12 col-xs-12 col-sm-12 nopadding">Your Email address</label>*/}
										{/*<input className="form-control" name="from" type="email" placeholder="Your@email.com"/>*/}
										<input className="form-control formControl" name="email" type="email" data-text="clientEmail" placeholder="Your@email.com" ref="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12  bt30">
									
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
										{/*<label class="col-md-12 col-lg-12 col-xs-12 col-sm-12 nopadding">Subject</label>*/}
										{/*<input className="form-control" name="from" type="text" placeholder="Subject" />*/}
										  <input className="form-control formControl" name="Subject" type="text" placeholder="Subject" ref="Subject" value={this.state.Subject} onChange={this.handleChange.bind(this)} />

									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12  bt30">
									
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
										{/*<label class="col-md-12 col-lg-12 col-xs-12 col-sm-12 nopadding">Message</label>*/}
								          <textarea className="form-control formControl" name="message" placeholder="How can we help?" rows="4"  value={this.state.message} onChange={this.handleChange.bind(this)}></textarea>
								        
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12  bt30">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
										<button type="button" className="btn btn-info col-lg-7 col-md-7 col-xs-12 col-sm-12 sbtn" onClick={this.Submit.bind(this)}>Send A Message</button>
									</div>
								</div>
							</form>
							</div>
						</div>{/* 1 st half*/}
						
						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-10 pull-left">
							<div className="xsheight col-lg-10 col-lg-offset-1 col-md-12 col-xs-12 col-sm-12">
								<div className="gettopLine mtop30cf"><span  className="gettopLine1"></span><span className="gettopLine2"></span></div>
								<div className=" col-lg-10 col-lg-offset-1 col-md-12 col-xs-12 col-sm-12">
									<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
										<h1 className="headone"> Get in Touch</h1>
										{/* <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
											</p> */}
									</div>
									{/*<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 bt20">
										<div className="col-lg-2 col-md-2 col-xs-2 col-sm-2">
											
											<img src={Map_Img} height="40px"/>
										</div>
										 <div className="col-lg-10 col-md-10 col-xs-10 col-sm-10">
											<label className=""><b>Visit Us:</b> </label><br/>
											<p>27 Division St, New York,NY 10002,USA
											</p>

										</div> 
									</div>*/}
								
									<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 bt20">
										<div className="col-lg-2 col-md-2 col-xs-2 col-sm-2">
											<img src={Email_Img} height="40px"/>

										</div>
										<div className="col-lg-10 col-md-10 col-xs-10 col-sm-10">
											<label className=""><b>Mail Us:</b> </label><br/>
											<p>admin@unimandai.com
											</p>

										</div>
									</div>
									<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 bt20">
										<div className="col-lg-2 col-md-2 col-xs-2 col-sm-2">
											<img src={Phone_Img} height="40px"/>

										</div>
										<div className="col-lg-10 col-md-10 col-xs-10 col-sm-10">
											<label className=""><b>Phone Us:</b> </label><br/>
											<p>8686 34 2020 / 8686 64 2020</p>

										</div>
									</div>
									
									</div>
								</div>
						</div>
						
					</div>
				</div>
			);
		}
	}
