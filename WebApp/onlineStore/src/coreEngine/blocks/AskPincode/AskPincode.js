import React, { Component }   from 'react';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import jQuery                 from 'jquery';
import $                      from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../sites/currentSite/blocks/AskPincode.css';


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
        }        
      }  
     componentDidMount(){
        var pincode = localStorage.getItem('pincode');
        if(localStorage.getItem('flag')=== null){
            localStorage.setItem('flag','false');
        }        
        // localStorage.setItem('deliveryStatusMsg',"false");
        //when user visit the site second time, check again delivery is possible or not
        if(pincode){
            this.setState({
                    pincode : pincode,
            })
            // console.log("UserPincode:====",this.state.pincode);
            if(localStorage.getItem('status') === "NotAllow"){
                axios.get("/api/allowablepincode/checkpincode/"+pincode)
                    .then((response)=>{
                        if(response){          
                            if(response.data.message === "Delivery Available"){                
                                localStorage.setItem("DeliveryStatus","Allowable");
                                localStorage.setItem("status","Allow");
                                localStorage.setItem('flag','true');
                                this.setState({
                                    DeliveryStatus : "Allowable",
                                })
                                localStorage.setItem('flag','true');
                                // console.log("delivery allow", localStorage.getItem('status'));
                            }else{

                                this.setState({
                                    DeliveryStatus : "NotAllowable",
                                });
                                
                            }
                        }
                    })
                    .catch((error)=>{
                        console.log('error', error);
                    })
                }else{
                    $('.AllowDeliveryMsg').show();
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

      checkDelivery(event){
        event.preventDefault();
        var userPincode =  this.state.pincode;
        //create object to store userPincode data into cookie
        localStorage.setItem("pincode",userPincode);
        localStorage.setItem('deliveryStatusMsg',"true");
        axios.get("/api/allowablepincode/checkpincode/"+userPincode)
            .then((response)=>{
                var status = "";
                if(response){  
                    if(response.data.message === "Delivery Available"){ 
                        this.setState({
                        	AllowDeliveryMsg  : "We can deliver in your area of Pincode " +this.state.pincode +" . Continue Your Shopping!",					
                        }); 
                        // localStorage.setItem('DeliveryStatus',"Allowable");
                        localStorage.setItem('pincodeAllowMsg','true');
                        localStorage.setItem('pincodeAllowMsg',"We can deliver in your area of Pincode " +this.state.pincode +" . Continue Your Shopping!")
                        localStorage.setItem('flag','true');
                        $('.AllowDeliveryMsg').show();    
                        $('.NotAllowDeliveryMsg').hide();                         
                        localStorage.setItem("status","Allow");
                        // console.log("pincode===",localStorage.getItem('pincode'));
                                          
                    }else{
                        this.setState({
                            NotAllowDeliveryMsg : "Sorry... We can not deliver in your area of Pincode " +this.state.pincode +" . Check again after few days!",
                        }); 
                        localStorage.setItem('pincodeNotAllow','true');
                        localStorage.setItem('pincodeNotAllowMsg',"Sorry... We can not deliver in your area of Pincode " +this.state.pincode +" . Check again after few days!")
                        $('.NotAllowDeliveryMsg').show(); 
                        $('.AllowDeliveryMsg').hide();                       
                        // var pincodeObj = JSON.parse(localStorage.getItem("pincodData"));
                        // pincodeObj.status = "NotAllow";
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
                {/* {localStorage.getItem('pincode') === null || localStorage.getItem('flag') === false  */}
                {localStorage.getItem('flag') === 'false' 
				?<div id="myModal" className="modal in">
                    <div className="modal-dialog">
                        <div className="modal-content pincodemodal">                            
                            <div className="modal-body">   
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>                       
                                <form>                                    
                                    <div className="col-lg-12 col-md-12 addPincode">
                                        <div id="pincode" className="Pincode_div">
                                            {localStorage.getItem('pincode')  
                                            
                                            ?   <div>
                                                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 NotAllowDeliveryMsg">
                                                        {this.state.NotAllowDeliveryMsg}                                    
                                                    </div>
                                                    <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 AllowDeliveryMsg">
                                                        {this.state.AllowDeliveryMsg}                                            
                                                    </div>
                                                        {localStorage.getItem('status') === "Allow"
                                                        ?
                                                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 AllowDeliveryMsg">
                                                                {localStorage.getItem('pincodeAllowMsg')}                                            
                                                            </div>
                                                        :
                                                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 NotAllowDeliveryMsg">
                                                                {localStorage.getItem('pincodeNotAllowMsg')}                                            
                                                            </div>  
                                                        }       
                                                    <div  className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12"style={{padding:"0px"}}>What is the pincode of are where you want delivery? </label>
                                                    </div>
                                                    <div className=" col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 pincodeBtnwrapper">
                                                        <input type="text" id="pincode" className="col-lg-5 col-md-5 col-sm-6 col-xs-6 pull-left pinocodeInput" 
                                                            ref="pincode" name="pincode" placeholder = "Enter Pincode..."onChange={this.getPincodeVlue.bind(this)}/>
                                                        <button className="col-lg-5 col-md-6 btn newModalBtn pull-right" onClick={this.checkDelivery.bind(this)}>Check Delivery</button>
                                                    </div> 
                                                </div>
                                            :
                                                this.state.DeliveryStatus === "Allowable"
                                                ?
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">                                            
                                                        "Your saved Pincode is {this.state.pincode}. Delivery is possible in this area. Continue Your Shopping!"                        
                                                    </div>
                                                :
                                                    this.state.DeliveryStatus === "NotAllowable"
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
                    localStorage.getItem('pincode')
                    ?
                    <div id="myModal" className="modal in">
                        <div className="modal-dialog">
                            <div className="modal-content pincodemodal">                            
                                <div className="modal-body">   
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>                       
                                    <form>                                    
                                        <div className="col-lg-12 col-md-12 addPincode">
                                            <div id="pincode" className="Pincode_div">          

                                                    {localStorage.getItem('status') === "NotAllow"
                                                    ?
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">                                            
                                                            "Your saved Pincode is {this.state.pincode}. Sorry!! Delivery is still not possible in this area. Please check after some days! When delivery is started in your area, we will notify you on mobile and email."                        
                                                        </div> 
                                                    :                                                    
                                                    
                                                        localStorage.getItem('DeliveryStatus') === "Allowable"
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