import React, { Component } from 'react';
// import { render } from 'react-dom';
// import { browserHistory } from 'react-router';
import $ from 'jquery';
// import {Link} from 'react-router';
import moment from 'moment';
import "../../../sites/currentSite/common/StepWizard.css";

export default class StepWizard extends Component{
	constructor(props){
		super(props);
		this.state = {
			
		}
	}
	componentWillReceiveProps(nextProps){
		console.log('nextProps',nextProps);
	}
	componentDidMount(){
		// var pathname = window.location.pathname;
		//console.log('deliveryStatus',this.props.data.deliveryStatus[this.props.data.deliveryStatus.length-1].status)
		this.props.data.deliveryStatus.map((data,ind)=>{
				
				if (data.status === 'New Order') {
					$('#orderplaceddate'+this.props.data._id).html(moment(data.Date).format('DD/MM/YYYY hh:mm a'))
				}
				if (data.status === 'Dispatch') {
					$('#dispatchdate'+this.props.data._id).html(moment(data.Date).format('DD/MM/YYYY hh:mm a'))
				}
				if (data.status === 'Delivery Initiated') {
					$('#deliveryinitdate'+this.props.data._id).html(moment(data.Date).format('DD/MM/YYYY hh:mm a'))
				}
				if (data.status === 'Delivered & Paid') {
					$('#delivereddate'+this.props.data._id).html(moment(data.Date).format('DD/MM/YYYY hh:mm a'))
				}
			})
		if(this.props.data.deliveryStatus[this.props.data.deliveryStatus.length-1].status ==='New Order' ||
			this.props.data.deliveryStatus[this.props.data.deliveryStatus.length-1].status ==='Verified' || 
			this.props.data.deliveryStatus[this.props.data.deliveryStatus.length-1].status === 'Packed' || 
			this.props.data.deliveryStatus[this.props.data.deliveryStatus.length-1].status === 'Inspection' ||
			this.props.data.deliveryStatus[this.props.data.deliveryStatus.length-1].status === 'Dispatch Approved' ){
			$('#cartbg'+this.props.data._id).addClass('neworderstatus');
		}
		if(this.props.data.deliveryStatus[this.props.data.deliveryStatus.length-1].status ==='Dispatch'){
			$('#cartbg'+this.props.data._id).addClass('neworderstatus');
			$('#outfrdelivery'+this.props.data._id).addClass('neworderstatus');
		}
		if(this.props.data.deliveryStatus[this.props.data.deliveryStatus.length-1].status ==='Delivery Initiated'){
			$('#cartbg'+this.props.data._id).addClass('neworderstatus');
			$('#outfrdelivery'+this.props.data._id).addClass('neworderstatus');
			$('#intransit'+this.props.data._id).addClass('neworderstatus');
		}	
		if(this.props.data.deliveryStatus[this.props.data.deliveryStatus.length-1].status ==='Delivered & Paid'){
			$('#cartbg'+this.props.data._id).addClass('neworderstatus');
			$('#outfrdelivery'+this.props.data._id).addClass('neworderstatus');
			$('#intransit'+this.props.data._id).addClass('neworderstatus');
			$('#paid'+this.props.data._id).addClass('neworderstatus');
		}
	}

	render(){
		return(

			<div className="garmentTWizard col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray">
	            <div className="wizard-inner col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite boxBorder">
	                <div className="connecting-line"></div>
	                <ul className="nav nav-tabs custmTabs" role="tablist">

	                    <li role="presentation" className=''>
	                        <a>
	                            <span title="Cart" className="round-tab selectcart stepwizardclass" id= {"cartbg"+this.props.data._id}>
	                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
	                            </span>
	                        </a>
	                        <div className="wiztextcontainer"><div className="wiztext">Order Placed</div>
	                        <div className="wiztext" id={"orderplaceddate"+this.props.data._id}></div>
	                        </div>
	                    </li>
	                    <li role="presentation" className="">
	                        <a>
	                            <span title="Delivery Address" className="round-tab selectAddr stepwizardclass" id= {"outfrdelivery"+this.props.data._id}>
	                                <i className="fa fa-map-marker" aria-hidden="true"></i>
	                            </span>
	                        </a>
	                        <div className="wiztextcontainer"><div className="wiztext">Out for delivery</div>
	                       	<div className="wiztext" id={"dispatchdate"+this.props.data._id}></div>
	                        </div>
	                    </li>

	                    <li role="presentation" className="">
	                        <a>
	                            <span  title="Order Summary" className="round-tab selectPayment stepwizardclass" id= {"intransit"+this.props.data._id}>
	                                <i className="fa fa-credit-card" aria-hidden="true"></i>
	                            </span>
	                        </a>
	                        <div className="wiztextcontainer">
	                        <div className="wiztext">In transition</div>
	                        <div className="wiztext" id={"deliveryinitdate"+this.props.data._id}></div>
							</div>
	                    </li>

	                    <li role="presentation" className="">
	                        <a>
	                            <span  title="Order Summary" className="round-tab selectPayment stepwizardclass" id= {"paid"+this.props.data._id}>
	                                <i className="fa fa-check-circle" aria-hidden="true"></i>
	                            </span>
	                        </a>
	                        <div className="wiztextcontainer"><div className="wiztext">Delivered</div>
	                        <div className="wiztext" id={"delivereddate"+this.props.data._id}></div>
	                        </div>
	                    </li>
	                </ul>
	            </div>
	        </div>
		);
	}
}