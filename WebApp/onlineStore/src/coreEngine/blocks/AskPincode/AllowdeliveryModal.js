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
    componentWillMount(){
        
        // var pincodeObj  = JSON.parse(localStorage.getItem("pincodData"));
        // console.log("pincodeObj:",pincodeObj);
        var pincode = localStorage.getItem('pincode');
        var DeliveryStatus = localStorage.getItem("DeliveryStatus");
        if(pincode && DeliveryStatus){
            this.setState({
                pincode : pincode,
                DeliveryStatus : DeliveryStatus,
            });
            console.log("allowdelivery modal======",this.state.pincode); 
            console.log("allowdelivery modal deliveryStatus======",this.state.DeliveryStatus);   
        }        
        
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
                                    {this.state.DeliveryStatus === "Allowable"
                                        ?
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">                                            
                                            "Your saved Pincode is {this.state.pincode}. Delivery is possible in this area. Continue Your Shopping!"                        
                                        </div>
                                        :
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">                                            
                                            "Your saved Pincode is {this.state.pincode}. Sorry!! Delivery is still not possible in this area. Please check after some days! When delivery is started in your area, we will notify you on mobile and email."                        
                                        </div>
                                    }                                       
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

