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
            "DeliveryStatus"      : "",
            "pincode"             : "",
            "tempUserPincode"     : "",
            "userPincodeFlag"     : "false",
        }        
      }  
     componentDidMount(){
        var pincode = localStorage.getItem('pincode');
      //when user visit the site second time, check again delivery is possible or not
     if(pincode){
        this.setState({
                pincode : pincode,
         })
        //  console.log("UserPincode:====",this.state.pincode);
        if(localStorage.getItem('status') === "NotAllow"){
            axios.get("/api/allowablepincode/checkpincode/"+pincode)
                .then((response)=>{
                    var status = "";
                    if(response){          
                        // console.log("Askpincode Checking second time delivery========");
                        if(response.data.message === "Delivery Available"){                              
            
                            localStorage.setItem("DeliveryStatus","Allowable");
                            localStorage.setItem("status","Allow");
                            this.setState({
                                DeliveryStatus : "Allowable",
                            })
                            localStorage.setItem('deliverymsgStatus',"false");
                            // console.log("Delivery Status======",this.state.DeliveryStatus);
                            // console.log("delivery allow", localStorage.getItem('status'));
                        }else{  
                            localStorage.setItem('deliverymsgStatus',"false");                          
                            this.setState({
                                DeliveryStatus : "NotAllowable",
                            })
                        }
                    }
                })
                .catch((error)=>{
                    console.log('error', error);
                })
            }
        }//end pincode
     }

     componentWillMount(){
        // console.log(" componentWillmountUserPincode:====",this.state.pincode);
     }
 
      getPincodeVlue(event){
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        }); 
      }

      //Check delivery possible or not
      checkDelivery(event){
        event.preventDefault();
        var userPincode =  this.state.pincode;
        //create object to store userPincode data into cookie
        // var pincodData = {
        //                     "pincode" : userPincode,
        //                     "status"  : "notAllow"
        //                 };
        // localStorage.setItem("pincodData", JSON.stringify(pincodData));

        localStorage.setItem("pincode",userPincode);
        axios.get("/api/allowablepincode/checkpincode/"+userPincode)
            .then((response)=>{
                var status = "";
                if(response){  
                    if(response.data.message === "Delivery Available"){ 
                        this.setState({
                        	AllowDeliveryMsg  : "We can deliver in your area of Pincode " +this.state.pincode +" . Continue Your Shopping!",					
                        }); 
                        localStorage.setItem('AllowDeliveryMsg',"We can deliver in your area of Pincode " +this.state.pincode +" . Continue Your Shopping!");
                        $('.AllowDeliveryMsg').show();    
                        $('.NotAllowDeliveryMsg').hide();  
                        localStorage.setItem("status","Allow");   
                        localStorage.setItem('deliverymsgStatus',"true");                                   
                        // var pincodeObj = JSON.parse(localStorage.getItem("pincodData"));
                        // pincodeObj.status = "Allow";
                        // localStorage.setItem("pincodData", JSON.stringify(pincodeObj));
                        // console.log("pincode===",localStorage.getItem('pincode'));                                              
                               
                    }else{
                        this.setState({
                            NotAllowDeliveryMsg : "Sorry... We can not deliver in your area of Pincode " +this.state.pincode +" . Check again after few days!",
                        }); 
                        localStorage.setItem('NotAllowDeliveryMsg',"Sorry... We can not deliver in your area of Pincode " +this.state.pincode +" . Check again after few days!");
                        localStorage.setItem('deliverymsgStatus',"true");
                        $('.NotAllowDeliveryMsg').show(); 
                        $('.AllowDeliveryMsg').hide();                      
                        localStorage.setItem("status", "NotAllow");                                          
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
                {localStorage.getItem('pincode') === null || localStorage.getItem("deliverymsgStatus") === "true"
                ?
				<div id="myModal" className="modal in">
                    <div className="modal-dialog">
                        <div className="modal-content pincodemodal">                            
                            <div className="modal-body">   
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>                       
                                <form>                                    
                                    <div className="col-lg-12 col-md-12 addPincode">
                                        <div id="pincode" className="Pincode_div">                                        
                                            
                                              <div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NotAllowDeliveryMsg">
                                                        {/* {this.state.NotAllowDeliveryMsg}   */}
                                                        {localStorage.getItem('NotAllowDeliveryMsg')}                                  
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 AllowDeliveryMsg">
                                                        {/* {this.state.AllowDeliveryMsg} */}
                                                        {localStorage.getItem('AllowDeliveryMsg')}                                             */}
                                                    </div>
                                                    <div  className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <label className="labelform col-lg-12 col-md-1'NotAllowDeliveryMsg',2 col-sm-12 col-xs-12"style={{padding:"0px"}}>What is the pincode of are where you want delivery? </label>
                                                    </div>
                                                    <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 pincodeBtnwrapper">
                                                        <input type="text" id="pincode" className="col-lg-4 col-md-4 col-sm-6 col-xs-6 pinocodeInput form-control" 
                                                            ref="pincode" name="pincode" placeholder = "Enter Pincode..."onChange={this.getPincodeVlue.bind(this)}/>
                                                        <button className="col-lg-3 col-md-3 btn newModalBtn pull-right" onClick={this.checkDelivery.bind(this)}>Check Delivery</button>
                                                    </div> 
                                                </div>                                                                                                                 
                                        </div>
                                    </div>
                                </form>                                
                            </div>
                        </div>
                    </div>
                </div> 
                :
                    localStorage.getItem('DeliveryStatus') === "Allowable"
                    ?
                    <div id="myModal" className="modal in">
                        <div className="modal-dialog">
                            <div className="modal-content pincodemodal">                            
                                <div className="modal-body">   
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>                       
                                    <form>                                    
                                        <div className="col-lg-12 col-md-12 addPincode">
                                            <div id="pincode" className="Pincode_div">                                      
                                                    
                                                    {localStorage.getItem('DeliveryStatus') === "Allowable"
                                                    ?
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">                                            
                                                            "Your saved Pincode is {this.state.pincode}. Delivery is possible in this area. Continue Your Shopping!"                        
                                                        </div>
                                                    :
                                                        localStorage.getItem('DeliveryStatus') === "NotAllowable"
                                                        ?
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">                                            
                                                                "Your saved Pincode is {this.state.pincode}. Sorry!! Delivery is still not possible in this area. Please check after some days! When delivery is started in your area, we will notify you on mobile and email."                        
                                                            </div>                                           
                                                        :
                                                            null
                                                    }                                
                                            </div>
                                        </div>
                                    </form>                                
                                </div>
                            </div>
                        </div>
                    </div> 
                    :
                        null
                   
                } 

		    </div>
		);
	}
}