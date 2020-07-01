import React, { Component }   from 'react';
import axios                  from 'axios';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import SignUp from '../../systemSecurity/SignUp.js';
// import {ModalImg} from '../../../sites/currentSite/images/background.jpg';

export default class SignUpModal extends Component {
    
	// constructor(props){
    // super(props);
    //     this.state = {
    //         
    //     }        
    //   }  
     componentDidMount(){
        var pincode = localStorage.getItem('pincode');
        
     }

     componentWillMount(){
     
    }
     
  render() {
    $(".modal-backdrop").hide();
    console.log("Inside login modal render");       
		return (                                 
        <div id="signUpFormModal" className="modal in">
            <div className="modal-dialog">
                <div className="modal-content loginModalContent">                            
                    <div className="modal-body">   
                    <button type="button" className="close"  data-dismiss="modal" aria-hidden="true" onClick={this.closeModal.bind(this)}>&times;</button>                                                            
                        <div className="col-lg-12 col-md-12 loginForm">
                            <SignUp />
                        </div>                                                                   
                    </div>
                </div>
            </div>
        </div>                     
                        
		);
	}
}