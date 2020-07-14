import React, { Component }   from 'react';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import jQuery                 from 'jquery';
import $                      from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../sites/currentSite/blocks/AskPincode.css';
import pincodeModalImg from '../../../sites/currentSite/images/modalBackground.png';

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
        
     }

     componentWillMount(){
        //  console.log("In will mount");
        var pincode = localStorage.getItem('pincode');          
        if(pincode){            
            if(localStorage.getItem('status')){
                axios.get("/api/allowablepincode/checkpincode/"+pincode)
                    .then((response)=>{
                        if(response){          
                            if(response.data.message === "Delivery Available"){                
                                // localStorage.setItem("DeliveryStatus","Allowable");
                                localStorage.setItem("status","Allow");
                                
                                // this.setState({
                                //     DeliveryStatus : "Allowable",
                                // })
                                $('.DeliveryStatusMsg').text("Congratulations!! Your saved Pincode is "+pincode +". Now delivery is possible in your area. Continue Your Shopping!")
                                $('.DeliveryStatusMsg').show();  
                                // $('..pinMessage').show();  
                                // $('.pincodeChild').hide();                         
                                localStorage.setItem("DeliveryStatus","Allowable");
                                localStorage.setItem("pincodeFlag","true");
                                
                                //  console.log("delivery allow", localStorage.getItem('status'));
                            }else{

                                // this.setState({
                                //     DeliveryStatus : "NotAllowable",
                                // });
                                $('.DeliveryStatusMsg').text("Your saved Pincode is " +pincode +". Sorry!! Delivery is still not possible in this area. Please check after some days! When delivery is started in your area, we will notify you on mobile and email.")
                                $('.DeliveryStatusMsg').show();    
                                // $('.pincodeChild').hide();
                                
                                localStorage.setItem("DeliveryStatus","NotAllowable");
                                // console.log("delivery not allow", localStorage.getItem('DeliveryStatus'));
                            
                            }
                        }
                    })
                    .catch((error)=>{
                        console.log('error', error);
                    })
                }
            }//end pincode
        // console.log(" componentWillmountUserPincode:====",this.state.pincode);
     }
 
    //   getPincodeVlue(event){
    //     const target = event.target;
    //     const name = target.name;
    //     this.setState({
    //         [name]: event.target.value
    //     }); 
    //   }
    closeModal(event){
        event.preventDefault();
        localStorage.setItem('pincodeFlag',"false");
    }

      checkDelivery(event){
        event.preventDefault();
        var userPincode =  $('.pinocodeInput').val();
        console.log("Pincode:",userPincode);
        // console.log("userPincode===",userPincode);
        //create object to store userPincode data into localStorage
        localStorage.setItem("pincode",userPincode);
        localStorage.setItem('deliveryStatusMsg',"true");
        axios.get("/api/allowablepincode/checkpincode/"+userPincode)
            .then((response)=>{
                var status = "";
                if(response){  
                    if(response.data.message === "Delivery Available"){ 
                        // this.setState({
                        // 	AllowDeliveryMsg  : "We can deliver in your area of Pincode " +this.state.pincode +" . Continue Your Shopping!",					
                        // }); 
                      
                        $('.AllowDeliveryMsg').text("Great!! We can deliver in your area of Pincode " +userPincode +" . Continue Your Shopping!")
                        $('.AllowDeliveryMsg').show();  
                        $('.DeliveryStatusMsg').hide();   
                        $('.NotAllowDeliveryMsg').hide();  
                        $('.marginTop').hide();  
                        $('.addPincode').css("margin-top","50px");                     
                        localStorage.setItem("status","Allow");
                        // console.log("pincode===",localStorage.getItem('pincode'));
                                          
                    }else{
                        // this.setState({
                        //     NotAllowDeliveryMsg : "Sorry... We can not deliver in your area of Pincode " +this.state.pincode +" . Check again after few days!",
                        // }); 
                        $('.NotAllowDeliveryMsg').text("Sorry... We can not deliver in your area of Pincode " +userPincode +" . Check again after few days!")
                        $('.NotAllowDeliveryMsg').show(); 
                        $('.DeliveryStatusMsg').hide();
                        $('.AllowDeliveryMsg').hide();  
                        $('.marginTop').hide(); 
                        $('.addPincode').css("margin-top","50px");                    
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
    // console.log("inside askpincode");  
    // $(".modal-backdrop").hide();
		return (            
			<div className="col-lg-8 col-md-8 col-sm-10 col-xs-12">
                {/* { (localStorage.getItem('pincode') === null) || (localStorage.getItem('pincode') !== null && localStorage.getItem('status') === "NotAllow") || (localStorage.getItem('DeliveryStatus') === "Allowable" && localStorage.getItem('pincodeFlag')==="true" ) */}
                {/* { (localStorage.getItem('pincode') === null) || (localStorage.getItem('pincode') !== null && localStorage.getItem('status') === "NotAllow") || (localStorage.getItem('DeliveryStatus') === "Allowable" && localStorage.getItem('pincodeFlag')==="true" )
                ?                 */}
                    <div id="pincodeModal" className="modal in">
                        <div className="modal-dialog">
                            <div className="modal-content pincodemodal" style={{'background': 'url(' +pincodeModalImg  +')'}}>                            
                                <div className="modal-body">   
                                <button type="button" className="close"  data-dismiss="modal" aria-hidden="true" onClick={this.closeModal.bind(this)}>&times;</button>                       
                                    <form>                                    
                                        <div className="col-lg-12 col-md-12 addPincode">
                                            <div id="pincode" className=" col-lg-12 col-md-12 col-sm-12 Pincode_div">                                                
                                                <div>
                                                        {(localStorage.getItem('pincode') !== null)?
                                                             <div className="pinMessage">Message</div>
                                                        :
                                                            <div className="marginTop"></div>
                                                        }
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 DeliveryStatusMsg">                                            
                                                            
                                                        </div>
                                                        <div className="pincodeChild">
                                                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 NotAllowDeliveryMsg deliveryMsg">
                                                                <span>{this.state.NotAllowDeliveryMsg}  </span>                                                    
                                                            </div>
                                                            <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 AllowDeliveryMsg deliveryMsg">
                                                                <span>{this.state.AllowDeliveryMsg} </span>                                                                
                                                            </div>
                                                            <div  className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12"style={{padding:"0px"}}>What is the pincode of are where you want delivery? </label>
                                                            </div>
                                                            <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 pincodeBtnwrapper">   
                                                                <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">                                                 
                                                                    <input class="form-control error pull-left pinocodeInput" id="pincode" type="text" id="pincode" className="col-lg-5 col-md-5 col-sm-6 col-xs-6 pull-left pinocodeInput" ref="pincode" name="pincode" placeholder = "Enter Pincode..." aria-invalid="true"></input>
                                                                    <button className="col-lg-5 col-md-6 btn newModalBtn pull-right" onClick={this.checkDelivery.bind(this)}>Check Delivery</button>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                </div>                     
                                                                                    
                                            </div>
                                            </div>
                                    </form>                                
                                </div>
                            </div>
                        </div>
                    </div>                     
                {/* : null
                }        */}
            </div>
          
		);
	}
}