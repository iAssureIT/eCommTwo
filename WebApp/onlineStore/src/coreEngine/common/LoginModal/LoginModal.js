import React, { Component }   from 'react';
import axios                  from 'axios';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import Login                  from '../../systemSecurity/Login.js';
import SignUp                 from '../../systemSecurity/SignUp.js';
import ForgotPassword         from '../../systemSecurity/ForgotPassword.js';
// import {ModalImg} from '../../../sites/currentSite/images/background.jpg';

export default class LoginModal extends Component {
    
	constructor(props){
    super(props);
        this.state = {
           "loginForm"      : "false",
           "signUpForm"     : "false",
           "forgotPassForm" : "false",
                
        }        
    }  

     componentDidMount(){
        var pincode = localStorage.getItem('pincode');
        console.log("componentdidmount LoginModal Render");

        this.setState({
            loginForm      : "true",
          })
        
     }
     componentWillMount(){
     
    }

  render() {
    $(".modal-backdrop").hide();   
        console.log("LoginModal Render");
		return (  
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb50">                  
            <div id="loginFormModal" className="modal in">
                <div className="modal-dialog">
                    {/* <div className="modal-content loginModalContent" style={{'background': 'url(' +ModalImg  +')'}}>    */}
                    <div className="modal-content loginModalContent">                            
                        <div className="modal-body">   
                        <button type="button" className="close"  data-dismiss="modal" aria-hidden="true">&times;</button>                                                            
                            {this.state.loginForm === "true" ?
                                <div className="col-lg-12 col-md-12 loginForm">
                                    <Login />
                                </div>  
                            : null
                            }  
                            {this.state.signUpForm === "true" ?
                                <div className="col-lg-12 col-md-12 loginForm">
                                    <SignUp />
                                </div>  
                            : null
                            } 
                            {this.state.forgotPassForm === "true" ?
                                <div className="col-lg-12 col-md-12 loginForm">
                                    <ForgotPassword />
                                </div>  
                            : null
                            }                                                                
                        </div>
                    </div>
                </div>
            </div>                     
        </div>
		);
	}
}