import React, { Component } from 'react';
// import '../../../sites/currentSite/blocks/AskPincode.css';
import './AskPincode.css';
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
  render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb50">
					<div className="row">
						<div className="col-lg-4 col-lg-offset-2 col-md-4 col-sm-4 col-xs-12 pincodeWrapper">
							<div className="row">           

                                <div id="pincodeModal" className="modal pinModal col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 NOpadding" role="dialog">                
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <div className="modal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <div className="modal-header pincodeModalheader col-lg-12 col-md-12 col-sm-12 col-xs-12">                                            
                                            <button type="button" className="close modalclosebut" onClick={this.cancel.bind(this)} data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title modalheadingcont">Pincode</h4>
                                        </div>
                                        <div className="modal-body pincodeBody col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <form id="modalPincodeForm">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pincodeInput">
                                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Pincode <span className="required">*</span></label>
                                                    <input type="text" maxlength="40" ref="pincode" name="pincode" id="pincode" value={this.state.pincode} onChange={this.handleChange.bind(this)} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" />
                                                </div>                 
                                                
                                            </form>
                                        </div>
                                        <div className="modal-footer modalfooter col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <button type="button" className="btn modalBtn " data-dismiss="modal" onClick={this.cancel.bind(this)}>Cancel</button>
                                            <button type="button" className="btn modalBtn" onClick={this.savePincode.bind(this)}>{this.props.addressId ? 'Update' :'Save'}</button>
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