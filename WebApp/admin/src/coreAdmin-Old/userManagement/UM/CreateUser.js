import React, { Component }      from 'react';
import InputMask                 from 'react-input-mask';
import $ from "jquery";
import axios from 'axios';
import swal                      from 'sweetalert';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import './userManagement.css';

const formValid = formerrors=>{
  // console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }

const nameRegex     = RegExp(/^[A-za-z']+( [A-Za-z']+)*$/);
const mobileRegex   = RegExp(/^[0-9][0-9]{9}$/);
const emailRegex    = RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
class CreateUser extends Component {


  constructor(props) {
    super(props);
    this.state = {
      checkUserExists     : 0, 
      show              : true,
      office            : null,
      allPosts          : null,
      firstname         : "",
      roles              : [],
      lastname          :"",
      signupEmail       : "",
      mobNumber         : "",
      rolesArray        : [],
      formerrors :{
         firstname    : "",
         lastname     :"",
         signupEmail  : "",
         mobNumber    : "",
         role         : "",
      },

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      rolesArray : nextProps.rolesArray
    })
    
  }

  componentDidMount(){
    $(".checkUserExistsError").hide();

    $.validator.addMethod("regxmobileNumber", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid mobile number.");

    $.validator.setDefaults({
      debug: true,
      success: "valid"
    });

    $("#signUpUser").validate({
      rules: {
        firstname: {
          required: true
        },
        lastname: {
          required: true,
        },
        signupEmail: {
          required: true,
        },
        mobNumber: {
          required: true,
          regxmobileNumber: /^([7-9][0-9]{9})$/
        },
        roles: {
          required: true,
        }
      },
        errorPlacement: function(error, element) {
              if (element.attr("name") === "firstname"){
                error.insertAfter("#firstname");
              }
              if (element.attr("name") === "lastname"){
                error.insertAfter("#lastname");
              }
              if (element.attr("name") === "signupEmail"){
                error.insertAfter("#signupEmail");
              }
              if (element.attr("name") === "roles"){
                error.insertAfter("#roles");
              }
              if (element.attr("name") === "mobNumber"){
                error.insertAfter("#mobNumber");
              }
              
            }
      });
    this.setState({
      rolesArray : this.props.rolesArray
    })
  }

 handleChange(event){
    const {name,value} = event.target;
    this.setState({ [name]:value });
  }

  checkUserExists(event){
    axios.get('/api/users/get/checkUserExists/'+event.target.value)
           .then((response)=>{
                if (response.data.length>0) {
                  $(".checkUserExistsError").show();
                  $('.button3').attr('disabled','disabled');
                  this.setState({checkUserExists: 1})
                 
                } else{
                  $(".checkUserExistsError").hide();
                  $('.button3').removeAttr('disabled');
                  this.setState({checkUserExists: 0})
                }                        
            })
           .catch(function(error){
                console.log(error);
           })
  }


    createUser(event){
      event.preventDefault();
      var roleArray = [];
      roleArray.push($('#roles').val());

      console.log('roleArray',roleArray);

      const formValues = {
          "firstName"       : this.state.firstname,
          "lastName"        : this.state.lastname,
          "emailId"         : this.state.signupEmail,
          "countryCode"     : "+91",
          "mobileNumber"    : this.state.mobNumber,
          "pwd"             : "user123",
          "status"          : "Active",
          "roles"           :  roleArray,
          // "officeLocation"  : this.refs.office.value,
        }
       
        if($("#signUpUser").valid() && !this.state.checkUserExists){
           axios.post('/api/users', formValues)
                .then( (res)=>{
                    swal({
                      title: "User added successfully",
                    });
                    this.refs.firstname.value = '';
                    this.refs.lastname.value  = '';
                    this.refs.signupEmail.value  = '';
                    this.refs.mobNumber.value = '';
                    this.refs.roles.value='';
                    // this.setState({show: false})
                                  
                    this.props.getData(this.state.startRange, this.state.limitRange);

                    // $("#CreateUserModal").modal({ backdrop: 'static', keyboard: false })

                    // ========// Because of this we are facing problems 
                    var modal = document.getElementById("CreateUserModal");
                    modal.style.display = "none";
                    $('.modal-backdrop').remove();
                    //==========//


                    // this.props.history.push("/umlistofusers");       
                    window.location.reload();
                })
              .catch((error)=>{
                console.log("error = ",error);
                this.setState({show: false})
              });
        }else{
          
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }


    }
  handleChangeSelect(event){
    var selectVal = this.refs.roles.value;
    this.setState({
      "roles" : selectVal
    });
    console.log(" event.target.value", selectVal);
  }
  closeModal(event){

    $('#CreateUserModal').hide();
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    $('body').css('padding-right','');
    $("#signUpUser").validate().resetForm();
    
  }

    render() {
      const {formerrors} = this.state;
      return (
            <div>
                        <div className="modal" id="CreateUserModal" role="dialog">
                          <div className="modal-dialog modal-lg " role="document">
                            <div className="modal-content modalContent ummodallftmg ummodalmfdrt col-lg-12 NOpadding ">
                              <div className="modal-header userHeader">
                                <button type="button" className="close" onClick={this.closeModal.bind(this)} aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="exampleModalLabel">Add New User</h4>
                              </div>
                             <div className="modal-body">
                              <div className="hideModal">
                               {/* <section className="viewContent">*/}
                                    <div className="">
                                      <div className="">
                                          <div className="">                                        
                                            <section className="">                                          
                                              <div className="box-body">
                                                <div className="">
                                                <form id="signUpUser">
                                                <div className="signuppp col-lg-12 col-md-12 col-sm-12 col-xs-12 createusr ">
                                                <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                                                    <label className="formLable col-lg-12 col-md-12">First Name <label className="requiredsign">*</label></label>
                                                    <span className="blocking-span">
                                                    <div className="input-group inputBox-main  new_inputbx" id="firstname" >
                                                       <div className="input-group-addon remove_brdr inputIcon">
                                                       <i className="fa fa-user-circle fa "></i>
                                                      </div>  
                                                        <input type="text" style={{textTransform:'capitalize'}}
                                                         className="form-control UMname inputText form-control  has-content"
                                                          ref="firstname" name="firstname" data-text="firstname" placeholder="First Name"  onChange={this.handleChange} 
                                                          value={this.state.firstname}/>
                                                    </div>   
                                                    </span>
                                                </div>
                                                <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                                                  <label className="formLable col-lg-12 col-md-12">Last Name <label className="requiredsign">*</label></label>
                                                  <span className="blocking-span ">
                                                  <div className="input-group inputBox-main  new_inputbx" id="lastname" >
                                                    <div className="input-group-addon remove_brdr inputIcon">
                                                      <i className="fa fa-user-circle fa "></i>
                                                    </div>  
                                                     <input type="text"className="form-control UMname inputText form-control  has-content" 
                                                     ref="lastname" name="lastname" data-text="lastname" onChange={this.handleChange} 
                                                     value={this.state.lastname} placeholder="Last Name" />
                                                  </div>   
                                                  </span>
                                                </div>
                                                
                                              </div>
                                              <div className="signuppp col-lg-12 col-md-12 col-sm-12 col-xs-12 createusr">
                                               <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent" >
                                                 <label className="formLable col-lg-12 col-md-12">Email ID <label className="requiredsign">*</label></label>
                                                    <span className="blocking-span col-lg-12 col-md-12 col-xs-12 col-sm-12 emailfixdomain">
                                                    <div className="input-group inputBox-main" id="signupEmail" >
                                                      <div className="input-group-addon remove_brdr inputIcon">
                                                        <i className="fa fa-envelope-square"></i>
                                                      </div> 
                                                      <input type="text" className="formFloatingLabels form-control newinputbox" 
                                                      ref="signupEmail" name="signupEmail" data-text="signupEmail" onChange={this.handleChange}  value={this.state.signupEmail}
                                                       placeholder="Email" onBlur={this.checkUserExists.bind(this)}/>
                                                    </div> 
                                                    <p className="checkUserExistsError">User already exists!!!</p>
                                                    
                                                    </span>
                                                </div>
                                               
                                                <div className=" col-lg-6 col-md-6 col-xs-12 col-sm-6 inputContent">
                                                    <label className="formLable col-lg-12 col-md-12">Mobile Number <label className="requiredsign">*</label></label>
                                                    <span className="blocking-span ">
                                                     <div className="input-group inputBox-main  new_inputbx" id="mobNumber"  >
                                                      <div className="input-group-addon remove_brdr inputIcon">
                                                        <i className="fa fa-mobile mobileIcon"></i>
                                                      </div>  
                                                      <input type="text"
                                                         className= "form-control UMname inputText form-control  has-content"
                                                          ref="mobNumber" name="mobNumber" data-text="mobNumber" placeholder="Mobile No"
                                                           onChange={this.handleChange} value={this.state.mobNumber} required/>
                                                     </div>   
                                                    </span>
                                                </div>
                                              </div>
                                              <div className="signuppp col-lg-12 col-md-12 col-sm-12 col-xs-12 createusr">
                                               <div className=" col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent">
                                                 <label className="formLable col-lg-12 col-md-12">Role<label className="requiredsign">*</label></label>
                                                    <span className="blocking-span col-lg-12 col-md-12 col-xs-12 col-sm-12 emailfixdomain">
                                                    <div className="input-group inputBox-main   " >
                                                     <div className="input-group-addon remove_brdr inputIcon">
                                                      <i className="fa fa-user-circle fa"></i>
                                                    </div> 
                                                    <select type="text" className="formFloatingLabels form-control  newinputbox" 
                                                      ref="roles" name="roles" id="roles" data-text="roles" onChange={this.handleChangeSelect.bind(this)}  value={this.state.roles}
                                                       placeholder="" required>
                                                       <option disabled selected>-- Select --</option>
                                                       {
                                                          this.state.rolesArray.map((data,index)=>{
                                                            if (data.role === 'ba' ||  data.role === 'vendor' ) {
                                                              return null
                                                            }else{
                                                              return (<option key={index} value={data.role}>{data.role}</option>);  
                                                            }
                                                          })
                                                       }
                                                    </select>
                                                   </div>
                                                    </span>
                                                </div>           
                                              </div>
                                              <div className=" col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                                                <button data-toggle="modal" className="col-lg-2 col-md-2 col-xs-12 col-sm-12 col-xs-12 pull-right btn btnSubmit topMargin outlinebox button3" type="submit" onClick={this.createUser.bind(this)} id="CreateUserModal" >Register</button>
                                               </div>    
                                          </form>
                                            </div>  
                                        </div> 
                                          </section>
                                        </div>
                                      </div>
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


export default CreateUser;/*withTracker(props =>{

    return{
        usrcrt : props.usrcrt,  
    } 
})*//*(CreateUser);*/