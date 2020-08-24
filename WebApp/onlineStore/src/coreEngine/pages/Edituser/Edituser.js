import React, { Component } from 'react';
// import InputMask            from 'react-input-mask';
import axios                from 'axios';
import "../../../sites/currentSite/pages/Edituser.css";
// import _                      from 'underscore';
import S3FileUpload           from 'react-s3';
import Message from '../../blocks/Message/Message.js';
import $                          from 'jquery';

class Edituser extends Component{
  constructor(props) {
    super(props);
    var UserId =  localStorage.getItem("user_ID");
    console.log('UserId', UserId);
    this.state = {
        UserId    : UserId,
        fullname  : "",
        username  : "",
        mobNumber : "",
        userProfile : "",
        firstName : "",
        lastName  : "",
        addressLine1  : "",
        addressLine2  : "",
        city  : "",
        state  : "",
        pincode  : "",
        type  : "",
        profileImage: ""
      }     
       this.handleChange = this.handleChange.bind(this);
    }
  uploadImage(event){
    event.preventDefault();
    var profileImage = "";
    if (event.currentTarget.files && event.currentTarget.files[0]) {
        // for(var i=0; i<event.currentTarget.files.length; i++){
            var file = event.currentTarget.files[0];
            if (file) {
                var fileName  = file.name; 
                var ext = fileName.split('.').pop();  
                if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG"){
                    if (file) {
                        var objTitle = { fileInfo :file }
                        profileImage = objTitle ;
                        
                    }else{  
                         this.setState({
                          messageData : {
                            "type" : "outpage",
                            "icon" : "fa fa-times-circle",
                            "message" : "Images not uploaded, Something went wrong<a className='pagealerturl' href='/login'>Sign In</a>",
                            "class": "danger",
                            "autoDismiss" : true
                          }
                        }) 
                        setTimeout(() => {
                          this.setState({
                              messageData   : {},
                          })
                      }, 3000);
                    }//file
                }else{ 
                     this.setState({
                      messageData : {
                        "type" : "outpage",
                        "icon" : "fa fa-check-circle",
                        "message" : "Please upload Image, Allowed images formats are (jpg,png,jpeg)",
                        "class": "warning",
                        "autoDismiss" : true
                      }
                    })
                    setTimeout(() => {
                      this.setState({
                          messageData   : {},
                      })
                  }, 3000);
                }//file types
            }//file
        // }//for 

        if(event.currentTarget.files){
            this.setState({
              profileImage : profileImage
            });  
            main().then(formValues=>{
                this.setState({
                  profileImage : formValues.profileImage
                })
            });
            async function main(){
                var config = await getConfig();
                
                var s3url = await s3upload(profileImage.fileInfo, config, this);
                const formValues = {
                    "profileImage"      : s3url,
                    "status"            : "New"
                };
  
                return Promise.resolve(formValues);
            }
            function s3upload(image,configuration){
    
                return new Promise(function(resolve,reject){
                    S3FileUpload
                        .uploadFile(image,configuration)
                        .then((Data)=>{
                            resolve(Data.location);
                        })
                        .catch((error)=>{
                            console.log(error);
                        })
                })
            }   
            function getConfig(){
                return new Promise(function(resolve,reject){
                    axios
                        .get('/api/projectSettings/get/one/s3')
                        .then((response)=>{
                            const config = {
                                bucketName      : response.data.bucket,
                                dirName         : 'propertiesImages',
                                region          : response.data.region,
                                accessKeyId     : response.data.key,
                                secretAccessKey : response.data.secret,
                            }
                            resolve(config);                           
                        })
                        .catch(function(error){
                            console.log(error);
                        })
    
                })
            }        
        }
    }
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
  handleSubmit(event) {
    var userid = this.state.UserId;
    var formvalues = {
      "firstName"     : this.refs.firstName.value,
      "lastName"      : this.refs.lastName.value,
      "emailId"       : this.refs.username.value,
      "mobileNumber"  : this.refs.mobNumber.value,
      "addressLine1"  : this.refs.addressLine1.value,
      "addressLine2"  : this.refs.addressLine2.value,
      "block"         : this.refs.block.value,
      "country"       : this.refs.country.value,
      "city"          : this.refs.city.value,
      "state"         : this.refs.state.value,
      "pincode"       : this.refs.pincode.value,
      "type"          : this.refs.addType.value,
      "profileImage"  : this.state.profileImage
    }
    
        axios.patch('/api/ecommusers/useraddress/'+userid, formvalues)
        .then((response)=> {  
          this.setState({
            messageData : {
              "type" : "outpage",
              "icon" : "fa fa-check-circle",
              "message" : "User updated successfully",
              "class": "success",
              "autoDismiss" : true
            }
          })
          setTimeout(() => {
            this.setState({
                messageData   : {},
            })
        }, 3000);
        })
        .catch(function (error) {
          console.log('error============',error);
        });
  }

  handleChange(event){
      event.preventDefault();
          const target = event.target;
          const name   = target.name;
          this.setState({
            [event.target.name] : event.target.value
          })
  }
  
  componentDidMount(){
    var userid = this.state.UserId;
     axios.get('/api/users/'+ userid)
        .then( (res)=>{
          console.log("User response:",res);
          this.setState({
            firstName       : res.data.profile.firstname,
            lastName        : res.data.profile.lastname,
            username        : res.data.profile.emailId,
            mobNumber       : res.data.profile.mobile,
            addressLine1    : res.data.profile.deliveryAdd[0].addressLine1,
            addressLine2    : res.data.profile.deliveryAdd[0].addressLine2,
            block           : res.data.profile.deliveryAdd[0].block,
            city            : res.data.profile.deliveryAdd[0].city,
            pincode         : res.data.profile.deliveryAdd[0].pincode,
            state           : res.data.profile.deliveryAdd[0].state,
            country         : res.data.profile.deliveryAdd[0].country,
            type            : res.data.profile.deliveryAdd[0].type,
            profileImage    : res.data.profile.profileImage
          })
        })
        .catch((error)=>{
          console.log("error = ",error);
          // alert("Something went wrong! Please check Get URL.");
        });
  }
    
  render(){      
    return (       
                          
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">                  
              <Message messageData={this.state.messageData} />
                    <section className="content viewContent">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                          <div className="box">                          
                            <div className="box-header with-border boxMinHeight">
                      <div className="box-body">                        
                        <div className="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 col-md-12  EditUserProfileWrap boxBorder mb20 mt25">
                        <div className="row">
                          <div className="text-center col-lg-12 col-sm-12 col-xs-12 col-md-12 myProfile btn-warning mb25">
                              My Profile
                          </div>
                          <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                           <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
                              <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-xs-6 col-sm-6 profileImage" style={{"backgroundImage":`url(`+(this.state.profileImage && this.state.profileImage !== "" ? this.state.profileImage : "/images/userImage.png")+`)`}}>
                                <div className="row">
                                  {/* <span className="fa fa-camera"> */}
                                    <input type="file" onChange={this.uploadImage.bind(this)} title="Click to Edit Photo" className="imgUp col-lg-12 col-sm-12 col-xs-12 col-md-12" accept=".jpg,.jpeg,.png" />
                                  {/* </span> */}
                                </div>
                              </div>
                              
                            </div> 
                            <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                              <label className="formLable">First Name <label className="requiredsign">*</label></label>
                              <span className="blocking-span row">
                              <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-user-circle fa "></i>
                                </div>  
                                 <input type="text"className="form-control UMname inputText form-control  has-content" 
                                 id="firstName" ref="firstName" name="firstName" value={this.state.firstName}  onChange={this.handleChange}  placeholder="First Name" />
                              </div>   
                              </span>
                          </div>
                          <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                              <label className="formLable">Last Name <label className="requiredsign">*</label></label>
                              <span className="blocking-span row">
                              <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-user-circle fa "></i>
                                </div>  
                                 <input type="text"className="form-control UMname inputText form-control  has-content" 
                                 id="lastName" ref="lastName" name="lastName" value={this.state.lastName} onChange={this.handleChange}  placeholder="Last Name" />
                              </div>   
                              </span>
                          </div>
                              <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 group btmmargin inputContent">
                                <label className="formLable">Username/Email</label>
                                <input type="text" disabled value={this.state.username} onChange={this.handleChange} className="disableInput inputMaterial form-control inputText" ref="username" name="username" required/>
                              </div>
                              <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 group btmmargin inputContent">
                                <label className="formLable">Mobile Number</label>
                                <span className="blocking-span">
                                 <div className="input-group inputBox-main  new_inputbx " >
                                   <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-mobile"></i>
                                  </div>  
                                    <input type="text" disabled style={{textTransform:'capitalize'}}
                                     className="form-control UMname inputText form-control  has-content" value={this.state.mobNumber}
                                      id="mobNumber" ref="mobNumber" name="mobNumber"  onChange={this.handleChange} placeholder="mobile number"/>
                                 </div>   
                                </span>
                            </div> 
                          <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 btmmargin inputContent">
                              <label className="formLable">Address Line 1</label>
                              <span className="blocking-span row">
                              <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-map-marker fa "></i>
                                </div>  
                                 <input type="text"className="form-control UMname inputText form-control  has-content"  value={this.state.addressLine1}
                                 id="addressLine1" minLength="10" ref="addressLine1" name="addressLine1" onChange={this.handleChange}  placeholder="Ex : 4, Olive Apt." />
                              </div>   
                              </span>
                          </div>
                          <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 btmmargin inputContent">
                              <label className="formLable">Address Line 2</label>
                              <span className="blocking-span row">
                              <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-map-marker fa "></i>
                                </div>  
                                 <input type="text"className="form-control UMname inputText form-control  has-content" value={this.state.addressLine2}
                                 id="addressLine2" ref="addressLine2" name="addressLine2" onChange={this.handleChange}  placeholder="Ex : Near Reebok Showroom" />
                              </div>   
                              </span>
                          </div> 
                          <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 btmmargin inputContent">
                              <label className="formLable">Block</label>
                              <span className="blocking-span row">
                              <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-map-marker fa "></i>
                                </div>  
                                 <input type="text"className="form-control UMname inputText form-control  has-content" value={this.state.block}
                                 id="block" ref="block" name="block" onChange={this.handleChange}  placeholder="Ex : Avenue Street" />
                              </div>   
                              </span>
                          </div> 
                          <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 btmmargin inputContent">
                              <label className="formLable">City</label>
                              <span className="blocking-span row">
                              <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-map-marker fa "></i>
                                </div>  
                                 <input type="text"className="form-control UMname inputText form-control  has-content" value={this.state.city}
                                 id="lastName" ref="city" name="city" onChange={this.handleChange}  placeholder="Ex : Pune" />
                              </div>   
                              </span>
                          </div> 
                          <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 btmmargin inputContent">
                              <label className="formLable">State</label>
                              <span className="blocking-span row">
                              <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-map-marker fa "></i>
                                </div>  
                                 <input type="text"className="form-control UMname inputText form-control  has-content" value={this.state.state}
                                 id="state" ref="state" name="state" onChange={this.handleChange}  placeholder="Ex : Maharashtra" />
                              </div>   
                              </span>
                          </div> 
                          <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 btmmargin inputContent">
                              <label className="formLable">Country</label>
                              <span className="blocking-span row">
                              <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-map-marker fa "></i>
                                </div>  
                                 <input type="text"className="form-control UMname inputText form-control  has-content" value={this.state.country}
                                 id="country" ref="country" name="country" onChange={this.handleChange}  placeholder="Ex : India" />
                              </div>   
                              </span>
                          </div> 
                          <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 group btmmargin inputContent">
                                <label className="formLable">Pincode</label>
                                <span className="blocking-span">
                                 <div className="input-group inputBox-main  new_inputbx " >
                                   <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-map-marker  "></i>
                                  </div>  
                                    <input type="text" style={{textTransform:'capitalize'}}
                                     className="form-control UMname inputText form-control  has-content" value={this.state.pincode}
                                      id="pincode" ref="pincode" name="pincode"  onChange={this.handleChange} placeholder="Ex : 412201"/>
                                 </div>   
                                </span>
                          </div> 
                          <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 btmmargin inputContent">
                              <label className="formLable">Type Of Address</label>
                              <span className="blocking-span row">
                              <div className="input-group inputBox-main  new_inputbx " >
                                 <div className="input-group-addon remove_brdr inputIcon">
                                  <i className="fa fa-map-marker fa "></i>
                                </div>  
                                  <select className="form-control" id="addType" name="addType" ref="addType" value={this.state.addType}>
                                    <option>Home (All day delivery) </option>
                                    <option>Office/Commercial (10 AM - 5 PM Delivery)</option>  
                                  </select>                              
                                </div>   
                              </span>
                          </div> 
                          </div>
                          <br/>
                            <div className="col-lg-6 col-sm-12 col-xs-12 col-md-12 pull-right btmmargin userProfileEditBtn">
                                <button onClick={this.handleSubmit.bind(this)} className="btn buttonhover usereditbtn pull-right">&nbsp; &nbsp;Update Profile&nbsp; &nbsp;</button>
                            </div>
                          </div>
                          </div>
                        </div>  
                    </div>
                    </div>
                  </div>
                  </div>
                  </section>
                </div>
              
          );
  } 

}

export default Edituser;


