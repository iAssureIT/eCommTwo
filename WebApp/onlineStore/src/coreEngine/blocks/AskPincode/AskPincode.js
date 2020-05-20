import React, { Component } from 'react';
// import '../../../sites/currentSite/blocks/AskPincode.css';
import './AskPincode.css';
import $                          from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AskPincode extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	"pincode" : ""
	    };
      }  
      handleChange(event){

      }
      savePincode(event){

      }
      cancel(event){

      }
       handleButtonClicked(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var YesForPincode = document.getElementById("yes");
        console.log("YesForPincode",YesForPincode.id)
        var value = event.target.value;
        var pincodeEntered=YesForPincode.id;
        if ( pincodeEntered == "yes")
         $('.addPincode').show();
      }

  render() {
		return (
				<div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 mb50">
					<div id="myModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content pincodemodal">
                    <div className="modal-header newModalHeader">
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h5 className="modal-title modal_header">Would You Like to Enter Your Pincode ?</h5>
                    </div>
                    <div className="modal-body">
                        {/*<p>What is the Pincode of Order Delivery Address?</p>*/}
                        <form>
                            {/*<div className="form-group">
                                <input type="email" className="form-control" placeholder="Enter Pincode"/>
                            </div>*/}
                            <button type="submit" className="col-lg-2 col-md-2 btn btn-primary newModalHeader" id="yes" onClick={this.handleButtonClicked}>Yes</button>
                            <button type="submit" className="col-lg-2 col-md-2 btn btn-primary newModalHeader pull-right">No</button>

                            <div className="col-lg-12 col-md-12 addPincode"style={{display:"none"}}>
                              <div id="pincode" className="Pincode_div">
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12"style={{padding:"0px"}}>What Is the Pincode of order Deivery Address?</label>
                                <input type="text"  className="pinocodeInput form-control col-lg-6 col-md-6 col-sm-12 col-xs-12" value=""ref="pincode" name="pincode"/>
                                <button type="submit" className="col-lg-4 col-md-4 btn btn-primary newModalHeader pull-right">Check Delivery</button>
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