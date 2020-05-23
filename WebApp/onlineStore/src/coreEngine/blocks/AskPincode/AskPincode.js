import React, { Component } from 'react';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import './AskPincode.css';
import jQuery                 from 'jquery';
import $                          from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../sites/currentSite/blocks/AskPincode.css';


export default class AskPincode extends Component {
    
	constructor(props){
    super(props);
        this.state = {
            "pincode"             : "",
            "pincodeModal2"       : "false",
            "AllowDeliveryMsg"    : "",
            "NotAllowDeliveryMsg" : "",
        }        
      }  
     componentDidMount(){
       
     }
 
      getPincodeVlue(event){
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        }); 
      }

      checkDelivery(event){
        event.preventDefault();
        var userPincode =  this.state.pincode;
        //create object to store userPincode data into cookie
        var pincodData = {
                        "pincode" : userPincode,
                        "status"  : "notAllow"
                        };
        localStorage.setItem("pincodData", JSON.stringify(pincodData));

        axios.get("/api/allowablepincode/checkpincode/"+userPincode)
            .then((response)=>{
                var status = "";
                if(response){  
                    if(response.data.message === "Delivery Available"){ 
                        this.setState({
                        	AllowDeliveryMsg  : "We can deliver in your area of Pincode " +this.state.pincode +" . Continue Your Shopping!",					
                        }); 
                        $('.AllowDeliveryMsg').show();                                           
                        var pincodeObj = JSON.parse(localStorage.getItem("pincodData"));
                        pincodeObj.status = "Allow";
                        localStorage.setItem("pincodData", JSON.stringify(pincodeObj));
                               
                    }else{
                        this.setState({
                            NotAllowDeliveryMsg : "Sorry... We can not deliver in your area of Pincode " +this.state.pincode +" . Check again after few days!",
                        }); 
                        $('.NotAllowDeliveryMsg').show();                       
                        var pincodeObj = JSON.parse(localStorage.getItem("pincodData"));
                        pincodeObj.status = "NotAllow";
                        localStorage.setItem("pincodData", JSON.stringify(pincodeObj));
                        
                    }           
                }
            })
            .catch((error)=>{
                console.log('error', error);
            })
        
      }
      
  render() {
		return (
			<div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 mb50">
				<div id="myModal" className="modal in">
                    <div className="modal-dialog">
                        <div className="modal-content pincodemodal">                            
                            <div className="modal-body">   
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>                             
                                <form>                                    
                                    <div className="col-lg-12 col-md-12 addPincode">
                                    <div id="pincode" className="Pincode_div">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NotAllowDeliveryMsg">
                                            {this.state.NotAllowDeliveryMsg}                                    
                                        </div>
                                        <div  className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12"style={{padding:"0px"}}>What is the pincode of are where you want delivery? </label>
                                        </div>
                                        <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 pincodeBtnwrapper">
                                            <input type="text" id="pincode" className="col-lg-4 col-md-4 col-sm-6 col-xs-6 pinocodeInput form-control" 
                                                ref="pincode" name="pincode" placeholder = "Enter Pincode..."onChange={this.getPincodeVlue.bind(this)}/>
                                            <button className="col-lg-3 col-md-3 btn newModalBtn pull-right" onClick={this.checkDelivery.bind(this)}>Check Delivery</button>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AllowDeliveryMsg">
                                            {this.state.AllowDeliveryMsg}                                            
                                        </div>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>           
		    </div>
		);
	}
}