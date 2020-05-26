import React, { Component } from 'react';
import './AskPincode.css';
import jQuery                 from 'jquery';
import $                          from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AllowdeliveryModal extends Component {
    constructor(props){
        super(props);
            this.state = {
                "pincode"  : "",
            }        
          }  

    componentDidMount(){
    } 
    componentWillReceiveProps(){
        
        var pincodeObj  = JSON.parse(localStorage.getItem("pincodData"));
        console.log("pincodeObj:",pincodeObj);
        this.setState({
                    pincode : pincodeObj.pincode,
        });
        console.log("allowdelivery modal======",this.state.pincode);   
    }
  render() {
		return (
			<div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 mb50">
				<div id="myModal" className="modal in">
                    <div className="modal-dialog">
                        <div className="modal-content pincodemodal deliveryAllowModal">                            
                            <div className="modal-body">   
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>                             
                                                                   
                                <div className="col-lg-12 col-md-12 addPincode">
                                <div id="pincode" className="Pincode_div">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">                                            
                                        "Your saved Pincode is {this.state.pincode}. Delivery is possible in this area. Continue Your Shopping!"                        
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

