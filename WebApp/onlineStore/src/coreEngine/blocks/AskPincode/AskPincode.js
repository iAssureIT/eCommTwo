import React, { Component } from 'react';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import './AskPincode.css';
import $                          from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../sites/currentSite/blocks/AskPincode.css';


export default class AskPincode extends Component {
    
	constructor(props){
    super(props);
        this.state = {
            "pincode" : "",
            "pincodeModal2": "false"
        }
        
      }  
     componentDidMount(){
        // $('#pincodeModal2').hide();
        this.state = {
            "pincodeModal2": "true",
        }
     }
       handleButtonClicked(event) {
        event.preventDefault();
        // this.setState({"pincodeModal2":"true"});
        // $('#myModal').hide(); 
        // $('#pincodeModal2').show();

        $('.addPincode').show();
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
        var pincode =  this.state.pincode;
        console.log("Pincode========",pincode);

        //store pincode into cookie        
        console.log("before cookie set======",document.cookie);
        document.cookie = this.state.pincode;
        console.log("cookie======",document.cookie);

        axios.get("/api/allowablepincode/checkpincode/"+pincode)
            .then((response)=>{
              //show swal
            })
            .catch((error)=>{
                // console.log('error', error);
            })

        $('#myModal').hide();
      }

      handleButtonClose(event){
          event.preventDefault();
          $('#myModal').hide();
      }

  render() {
		return (
			<div className="col-lg-8 col-md-8 col-sm-10 col-xs-12 mb50">
				<div id="myModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content pincodemodal">
                            <div className="modal-header newModalHeader pinmodalHeader">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h5 className="modal-title modal_header pincodeModalHeader">Would You Like to Enter Your Pincode ?</h5>
                            </div>
                            <div className="modal-body">
                                {/*<p>What is the Pincode of Order Delivery Address?</p>*/}
                                <form>               
                                    <div className=" col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 ModalBtnWrapper">           
                                        <button id="YesBtn" className="col-lg-3 col-md-3 btn btn-primary newModalHeader modalBtn" onClick={this.handleButtonClicked}>Yes</button>
                                        <button className="col-lg-3 col-md-3 btn btn-primary newModalHeader pull-right" onClick={this.handleButtonClose}>No</button>
                                    </div>
                                    <div className="col-lg-12 col-md-12 addPincode"style={{display:"none"}}>
                                    <div id="pincode" className="Pincode_div">
                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12"style={{padding:"0px"}}>What is the pincode of are where you want delivery? </label>
                                        <input type="text" id="pincode"  className="pinocodeInput form-control col-lg-6 col-md-6 col-sm-12 col-xs-12" 
                                            ref="pincode" name="pincode" onChange={this.getPincodeVlue.bind(this)}/>
                                        <button className="col-lg-3 col-md-3 btn btn-primary newModalHeader pull-right" onClick={this.checkDelivery.bind(this)}>Check Delivery</button>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            {/* { this.state.pincodeModal2 === "true"
                ?
                <div id="pincodeModal2" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content pincodemodal">
                            <div className="modal-header newModalHeader pinmodalHeader">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h5 className="modal-title modal_header pincodeModalHeader">What is the pincode of are where you want delivery? </h5>
                            </div>
                            <div className="modal-body">                                
                                <form>  
                                    <div className="col-lg-12 col-md-12 addPincode"style={{display:"none"}}>
                                        <div id="pincode" className="Pincode_div">
                                            <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12"style={{padding:"0px"}}>What Is the Pincode of order Deivery Address?</label>
                                            <input type="text"  className="pinocodeInput form-control col-lg-6 col-md-6 col-sm-12 col-xs-12" ref="pincode" name="pincode"/>
                                            <button type="submit" className="col-lg-4 col-md-4 btn btn-primary newModalHeader pull-right">Check Delivery</button>
                                        </div>
                                    </div>             
                                    <div className=" col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 ModalBtnWrapper">           
                                        <button type="submit" id="submitBtn" className="col-lg-3 col-md-3 btn btn-primary pull-right newModalHeader modalBtn" onClick={this.savePincode}>Submit</button>                                       
                                    </div>                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                :null
            } */}

		    </div>
		);
	}
}