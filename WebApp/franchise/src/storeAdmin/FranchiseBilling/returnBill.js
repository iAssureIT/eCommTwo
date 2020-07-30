import React from 'react';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import Barcode from 'react-barcode' ;
import './bill.css';
import './print.css';
import swal from 'sweetalert';
import axios from 'axios';
import moment from 'moment';
import jQuery, { isNumeric, data } from 'jquery';
import $ from 'jquery';
import { countBy } from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCartData } from '../../redux/actions/index';


export class returnBill extends React.Component {
	constructor(props) {
		super(props);
		  this.state = {
				serchByDate:moment(new Date()).format("YYYY-MM-DD"), 
				categoriesData        : [], 
				SectionsData          : [],
				SectionCategoriesData : [],
				ProductList           : [],
				section_ID            : 0,
				searchText            : '',
				completeProductName   : '',
				franchiseLocation     : '',
				cartItems             : [],
				cartData              : [],
				totalAmt              : 0,
				billNumber            : 0,
                orderData             : {},
				pos                   : '',
				showFullScreen        : false,
				showReturnProductDiv  : true,
				getBillNumbers        :'',
				billDate              : '',
				paymentMethod         : 'cash'
          };
	}
	
	componentDidMount() {
		$('.leftsidebarbackgroundcolor').hide();
		$('#headerid').hide();
		$('#dashbordid').css('top',0);
		// $('#headerid').css('width',"100% !important");
		// $('#headerid').attr('style',"width : 100% !important");
		$('#dashbordid').removeClass('col-lg-10 col-lg-offset-2').addClass('col-lg-12');
		$('#dashbordid').removeClass('dashboardeffect');
		this.getFranchiseDetails();
		 // this.getBillNumbers();
		// this.getOrder(this.props.match.params.orderId);

		$.validator.addMethod("noSpace", function(value, element) { 
			return value == '' || value.trim().length != 0;
		}, "No space please and don't leave it empty");

		jQuery.validator.setDefaults({
			debug: true,
			success: "valid"
		});
	  
		  $("#returnForm").validate({
			rules: {
			  quantity: {
				required: true,
				noSpace: true
			  },
			  rate: {
				required: true,
				noSpace: true
			  },
			  discountPercent: {
				required: true,	
				noSpace: true,
			  },
			  discountedPrice:{
				required: true,
				noSpace: true
			  },
			},
			errorPlacement: function (error, element) {
			  if (element.attr("name") === "quantity") {
				error.insertAfter("#quantityDiv");
			  }
			  if (element.attr("name") === "rate") {
				error.insertAfter("#originalPriceDiv");
			  }
			  if (element.attr("name") === "discountPercent") {
				error.insertAfter("#disPercentDiv");
			  }
			  
			  if (element.attr("name") === "discountedPrice") {
				error.insertAfter("#disRateDiv");
			  }
			  if(element.attr("name") === "reasonForReturn"){
				error.insertAfter("#reasonForReturnDiv");
			  }
			}
		  });
    }

    getFranchiseDetails(){
        console.log("getBillNumbers");
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
		axios.get('/api/entitymaster/getCompany/'+userDetails.companyID)
        .then((response) => {
			var franchiseLocation = '';
			var gstNo = '';
			var city = '';
			var state = '';
            var country = '';
            var addressLine2 = '';
		
			if(response.data.locations){
				response.data.locations[0].pincode = 412207;
				franchiseLocation = response.data.locations;
				gstNo = franchiseLocation[0].GSTIN;
				city = franchiseLocation[0].city;
				state = franchiseLocation[0].state;
                country = franchiseLocation[0].country;
                addressLine2 = franchiseLocation[0].addressLine2;
			}
			this.setState({
				"franchise_id": response.data._id,
				"gstNo"       : gstNo,
				"deliveryLocation" : franchiseLocation,
                "franchiseLocation" : city +','+state+','+country,
                "pos"       : addressLine2
				
			},()=>{
               
				this.getBillNumbers();
		   })
          
	      })
	      .catch((error) => {
			console.log("Error in franchiseDetail = ", error);
	      })
    }
    
    printTable(){
        const w=window.open();
        w.document.write($('.viewBillDiv').html());
        w.print();
        w.close();
	}
	
	editOrder(id,editorderInput){
		var showDiscount = false;
		var editorderInputv = editorderInput ? editorderInput : false; 

		this.state.orderData.products.map((data,index)=>{
			if(data._id == id){
				if(data.rate == 0){
					showDiscount = true;
				}
				this.setState({
					product_ID        : data.product_ID,
					// itemCode : data.productDetail.itemCode,
					quantity           : data.quantity,
					discountPercent    :data.discountPercent,
					discountedPrice    : data.discountedPrice,	
					rate               : data.originalPrice,
					showDiscount       : showDiscount,
					showEditorderInput : editorderInput,
					productToReturn    : data
				},()=>{
					
				})
			}
		});
	}

	
	openFullscreen() {
		this.setState({
			showFullScreen :true
		});
		$('#headerid').hide();
		$('#dashbordid').css('top',0);
		var elem = document.documentElement;
		console.log("elem",document.documentElement);
		if (elem.requestFullscreen) {
		  elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) { /* Firefox */
		  elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
		  elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { /* IE/Edge */
		  elem.msRequestFullscreen();
		}
	}

	closeFullscreen() {
		$('#headerid').show();
		$('#dashbordid').css('top','');
		this.setState({
			showFullScreen :false
		})
		if (document.exitFullscreen) {
		  document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
		  document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
		  document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
		  document.msExitFullscreen();
		}
	}

	onClickReturnProducts(event){
		event.preventDefault();
		this.setState({
			showReturnProductDiv : true
		})
	}

	getBillNumbers(){
        axios.get('/api/billingmaster/get/billnumberlist/'+this.state.franchise_id)
		.then((response) => {
			this.setState({
				billNumbersArray: response.data
			})
		})
		.catch((error) => {
			
		})
	}

	onSearchBillNumber(event){
		event.preventDefault();
		var id = 0
		this.state.billNumbersArray.map((data, i)=>{
			if(event.target.value == data.billNumber){
				console.log("match",data.billNumber);
				id = data._id
			}
		});

		this.getOrder(id);
	}

	getOrder(id){
		let returnedOrderTotal = 0;
		axios.get("/api/orders/get/one/" + id)
		.then((response) => {
			response.data.returnedProduct.map((data, index) => {
				returnedOrderTotal = returnedOrderTotal + (data.discountedPrice * data.quantity);
			})

			this.setState({
				orderData: response.data,
				billNumber :response.data.billNumber,
				billDate : response.data.createdAt,
				orderID  : id,
                returnedOrderTotal : returnedOrderTotal,
                customerDetail : response.data.franchiseCustId
			},()=>{
				// console.log("returnedOrderTotal",returnedOrderTotal);
			})
		 
		})
		.catch((error) => {
		  console.log('error', error);
		})
	}

	discountedPrice(event) {
		event.preventDefault();
		this.setState({
		  [event.target.name]: event.target.value
		})

		if (event.target.value > 100) {
		  this.setState({
			discountPercentError: "Discount Percent should be less than 100."
		  })
		} else if (event.target.value < 0) {
		  this.setState({
			discountPercentError: "Discount Percent should be greater than 0.",
			discountedPrice: 0
		  })
		} else {
		  this.setState({
			discountPercentError: ""
		  })
		}
		var originalPrice = parseFloat(this.refs.originalPrice.value).toFixed(2);
	
		if (originalPrice !== "NaN") {
		  var discountedPrice = parseFloat(originalPrice) - parseFloat((originalPrice * event.target.value) / 100).toFixed(2);
		  this.setState({
			discountedPrice: discountedPrice < 0 ? 0 : parseFloat(discountedPrice).toFixed(2)
		  })
		}
	  }
	  discountPercent(event) {
		event.preventDefault();
		this.setState({
		  [event.target.name]: event.target.value
		})
	
		var originalPrice = parseFloat(this.refs.originalPrice.value).toFixed(2);
		if (originalPrice !== "NaN") {
		  var discountPercent = parseFloat(((originalPrice - event.target.value) / originalPrice) * 100).toFixed(2);
		  this.setState({
			discountPercent: parseFloat(discountPercent).toFixed(2)
		  })
		}
	  }

	  percentAndPrice(event) {
		event.preventDefault();
		this.setState({
		  [event.target.name]: event.target.value,
	
		});
		if (event.target.value !== 0) {
		  this.setState({
			showDiscount: false,
			discountedPrice : event.target.value,
			discountPercent : 0
		  })
		} else {
		  this.setState({
			showDiscount: true,
			discountPercent: "",
			discountedPrice: "",
		  })
		}
	  }

	returnProductAction(event) {
		event.preventDefault();
		var id = $(event.target).data('id');
		var altorderid = $(event.target).data('altorderid');
		this.setState({
			orderID : id
		});


		var formValues = {
		  "orderID": id,
		  "altorderid"         : altorderid,
		  "productID"          : this.state.product_ID,
		  "reasonForReturn"    : this.state.reasonForReturn,
		  "returnProductArray" : this.state.productToReturn,
		  "franchise_id"       : this.state.franchise_id,
		  "paymentMethod"      : this.state.paymentMethod
		}
		
	
		if ($('#returnForm').valid()) {
		  axios.patch('/api/billingmaster/returnProducts', formValues)
			.then((response) => {
			  swal("Product Returned Successfully..!");
			  $('.close').click();
			  $('.fullpageloader').hide();
			  this.getOrder(id);
			  var modal = document.getElementById('returnProductModal');
			  $('#returnProductModal').css('display','none');	
			  $('.modal-backdrop').remove();
			})
	
			.catch((error) => {
				swal("Failed to return product.");
			     console.log('error', error);
			})
		}
	  }


	onChangeEditVal(event){
		event.preventDefault();
		const {name,value} = event.target;
		this.setState({
			[name] : value 
		})
	}

	onChangeReturnReason(event){
		event.preventDefault();
		const {name,value} = event.target;
		this.setState({
			[name] : value 
		})
	}
 
	onChangePaymentMethod(paymentMethod){
		this.setState({
			"paymentMethod" : paymentMethod
		},()=>{
			console.log("paymentMethod",this.state.paymentMethod);
		})
	}

   


	render() {
        console.log("this.state.customerDetail",this.state.customerDetail);
		const cartItems = this.props.recentCartData;
		let total    = 0
		 if(this.props.recentCartData.length > 0){
			total = this.props.recentCartData[0].cartItems.reduce((prev,next) => prev + next.subTotal,0);
		 }else{
			total = 0;
		 }
		
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding pmpageContent'>
					{/* {this.state.showReturnProductDiv === true  ?  */}
						<div className="row">
						<div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12 NOpadding paddingTop">
							    <input list="selectBillNumber" type="search" refs="selectBillNumber" className="form-control" placeholder="Search by Bill Number..." onChange={this.onSearchBillNumber.bind(this)} name="selectBillNumber" autoComplete="off"/> 
								<datalist id="selectBillNumber" name="selectBillNumber" className="billDatalist">
										{
											this.state.billNumbersArray && this.state.billNumbersArray.length > 0 ?
												this.state.billNumbersArray.map((data, i)=>{
													return(
														<option key={i} value={data.billNumber} data-id={data._id} data-orderid={data.orderId}>{data.billNumber}</option>
													);
												})
											:
											<option>No Bills available</option>
										}
								</datalist>
                                <button className="input-group button_add button button top30" type="button"><i className="fa fa-plus"></i></button>
						</div>
						
						</div>
						{/* : null} */}
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding paddingTop billPage">
							<div className="col-lg-2 col-md-2 col-sm-6 col-xs-6">
								<a className="btn btn-info printbtn viewBillBtns fa fa-home" href="/dashboard" title="Go to Homepage"></a>
								{this.state.showFullScreen === false ? 
								<button className="btn btn-info printbtn viewBillBtns fa fa-arrows-alt" title="Open Fullscreen" onClick={this.openFullscreen.bind(this)}></button>
								: <button className="btn btn-info printbtn viewBillBtns fa fa-window-close" title="Close Fullscreen"  onClick={this.closeFullscreen.bind(this)}></button>
								}
								<a className="btn btn-info viewBillBtns" href="/franchise-billing" title="Create New Bill">New Bill</a>
								<button className="btn btn-info printbtn viewBillBtns fa fa-print" title="Print Bill" onClick={this.printTable.bind(this)}></button>
							</div>
							{/* /* Return product div start */ }
							{Object.keys(this.state.orderData).length > 0 ? 
							<div className="col-lg-4 col-lg-offset-2 col-md-6 col-sm-12 col-xs-12  viewBillDiv">
							    <div className="row billLogoDiv">
									<img className="logoImg" src="../../images/logoUnimandai.png"/>
									<div className="address">{this.state.franchiseLocation}</div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 billNumber">Bill No: <span className="barcode">{this.state.billNumber}</span></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 billNumber pullright"><Barcode value={this.state.billNumber}/></div>
								</div>
                                {
                                this.state.customerDetail ?
                                Object.keys(this.state.customerDetail).length > 0 ?
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullleft"><small class="">Customer Name: {this.state.customerDetail.customerName}</small></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullright"><small class="">Mobile: {this.state.customerDetail.mobile}</small></div>
								</div>
                                : null
                                :null}
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullleft"><small className="">Date: {moment(this.state.billDate).format("DD MMM YYYY")}</small></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullright"><small className="">Time: {moment(this.state.billDate).format(" hh:mm a")}</small></div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullleft"><small className="">POS: {this.state.pos}</small></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullright"><small className="">GSTIN: {this.state.gstNo}</small></div>
								</div>
								<div className="row" style={{"padding": "15px"}}> 
									<form className="productsViewForm" id="productsViewForm">
									<div className="table-responsive">
										<table className="table table-borderless viewBillTable">
											<thead>
												<tr>
												<th scope="col">ITEM</th>
												<th scope="col">QTY</th>
												<th scope="col">RATE</th>
												<th scope="col">DISCOUNT</th>
												<th scope="col">AMOUNT</th>
												<th scope="col"></th>
												</tr>
											</thead>
											<tbody>
											{
                                                this.state.orderData.products && this.state.orderData.products.length > 0 ?
                                                    this.state.orderData.products.map((data, index) => {
													data.subTotal = data.discountedPrice * data.quantity;
													console.log("product status",data);
													var status = data.status ? data.status : '';
													return(
														<tr>
															<td>{data.productName}</td>
															<td> 
													              <small>{data.quantity} {data.unit}</small>
															</td>
															<td>{data.originalPrice}</td>
															<td>{data.discountPercent}<i className="fa fa-percent"></i>&nbsp;&nbsp;&nbsp;&nbsp;{data.discountedPrice}</td>
															<td>{data.subTotal}</td>
															{data.status !== 'Returned' ?
															<td>
																<span className="fa fa-pencil" data-toggle="modal" title="Partial Return" onClick={this.editOrder.bind(this,data._id)} data-target={"#editorder"+ data._id} id={data._id}></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																{/* onClick={this.openproductApproval.bind(this)} */}
																<span className="fa fa-undo" data-toggle="modal" title="Partial Return" onClick={this.editOrder.bind(this,data._id,false)} data-target={"#editorder"+ data._id} id={data._id}></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

																{/* <span className="fa fa-undo" title="Return Product"  data-toggle="modal"  onClick={this.editOrder.bind(this,data._id,false)}  data-target={"#editorder"+ data._id} id={data._id} aria-hidden="true"></span> */}
																<div className="modal fade" id={"editorder"+ data._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
																<div className="modal-dialog modal-dialog-centered" role="document">
																	<div className="modal-content">
																	<div className="modal-header">
																	    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
																			<span aria-hidden="true">&times;</span>
																		</button>
																		<h3 className="modal-title" id="exampleModalLongTitle">Return Purchase Item</h3>
																	</div>
																	<div className="modal-body">
																		<form id="returnForm">
																		<h4>{data.productName}</h4>
																		{this.state.showEditorderInput ?
																		<div>
																		<div className="row textAlignCenter">
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
																				<label className="control-label statelabel locationlabel" >Quantity <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx quantityDiv" >
																					<div className="input-group-addon inputIcon">
																					    <small>{data.unit}</small>
																					</div> 
																					<input type="number" placeholder="" className="form-control new_inputbx1" value={this.state.quantity} prevvalue={data.quantity} name="quantity" refs="quantity" onChange={this.onChangeEditVal.bind(this)} id="quantity" min="1" size={data.size} unit={data.unit} productid={data.product_ID} id={data._id} dataquntity={this.state.quantityAdded !== 0 ? this.state.quantityAdded : data.quantity} availablequantity={data.availableQuantity} required/>
																				</div>     
																			</div>  
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
																				<label className="control-label statelabel locationlabel" >Rate <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx originalPriceDiv" >
																					<div className="input-group-addon inputIcon">
																					<i className="fa fa-rupee"></i>
																					</div> 
																					<input type="number" placeholder="" className="form-control new_inputbx1" value={this.state.rate} name="rate" refs="rate" onChange={this.percentAndPrice.bind(this)} productid={data.product_ID} id="rate" min="1" ref="originalPrice" discountpercent={data.discountPercent} discountedprice={data.discountedPrice} required/>
																				</div>     
																			</div>  
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 disPercentDiv">
																				<label className="control-label statelabel locationlabel" >Discount <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx" >
																					<input max={100} disabled={this.state.showDiscount} value={this.state.discountPercent} onChange={this.discountedPrice.bind(this)} placeholder="Discount Percent" id="discountPercent" name="discountPercent" type="number" className="form-control  availableQuantityNew" aria-describedby="basic-addon1" ref="discountPercent" />
																					<div className="input-group-addon inputIcon discountInput">
																						<i className="fa fa-percent"></i>
																					</div> 
																				</div>     
																			</div>  
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 disRateDiv">
																				<label className="control-label statelabel locationlabel" >Discount Rate <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx" >
																					<div className="input-group-addon inputIcon">
																					<i className="fa fa-rupee"></i>
																					</div> 
																					<input max={this.state.rate} disabled={this.state.showDiscount} onChange={this.discountPercent.bind(this)} value={this.state.discountedPrice} id="discountedPrice" name="discountedPrice" type="number" className="form-control  selectdropdown" placeholder="Discounted Price" aria-describedby="basic-addon1" ref="discountedPrice"  max={this.state.rate} min="1"/>

																				</div>     
																			</div>  
																		</div>
																		<br/>
																		
																		<div className="row textAlignCenter">
																		   <h4 className="retrunBillSubtotal">Subtotal : <i className="fa fa-rupee"></i> {(this.state.discountedPrice) * (this.state.quantity)}</h4>
																		</div>
																		<br/>
																		</div>
																		: null }
																		
																		<div className="row" id="reasonForReturnDiv">
																		    <label className="reasonForReturnlabel">Reason for Return <i className="redFont">*</i></label>
																			<textarea rows="3" cols="110" className="reasonForReturn" name="reasonForReturn" value={this.state.reasonForReturn} onChange={this.onChangeReturnReason.bind(this)} required></textarea>
																		</div>
																		<div className="row textAlignLeft" style={{"padding": "15px"}}>
																				<b>Payment Method :</b> <div class="btn-group btn-group-toggle" data-toggle="buttons">
																						<label class="btn btn-secondary active" onClick={this.onChangePaymentMethod.bind(this,"cash")}>
																							<input type="radio" name="paymentmethod" id="option1" autocomplete="off" value={this.state.paymentMethod}  checked={this.state.paymentMethod == 'cash'}/> Cash
																						</label>
																						<label class="btn btn-secondary" onClick={this.onChangePaymentMethod.bind(this,"UPI")}>
																							<input type="radio" name="paymentmethod" id="option2" autocomplete="off" value={this.state.paymentMethod} checked={this.state.paymentMethod == 'UPI'}/> UPI
																						</label>
																				</div>
																		</div>
																		</form>
																	</div>
																	<div className="modal-footer">
																		<button type="button" className="btn btn-primary" data-id={this.state.orderData._id} data-altorderid={this.state.orderData.orderID}  onClick={this.returnProductAction.bind(this)}>Return</button>
																	</div>
																	</div>
																</div>
																</div>
						 									</td>
														: <td></td>}
													</tr>
													)
												})
												:
												null
											} 
											</tbody>
											<tfoot>
												<tr>
													{this.state.orderData ?
														<td colSpan="4">Items/Qty {this.state.orderData.cartQuantity}</td>
														:
														<td colSpan="4">Items/Qty 0</td>
													}

													<td colSpan="2">Total: <i className="fa fa-inr"></i> {this.state.orderData.cartTotal}</td>
												</tr>
												<tr>
												<td colSpan="4"></td>
												<td className="totalNetAmount" colSpan="2">Net: <i className="fa fa-inr"></i> {this.state.orderData.cartTotal} ({this.state.orderData.status})</td>
												</tr>
											</tfoot>
											</table>
										</div>
										<div className="row" style={{"padding": "15px"}}>
												<span><b>Payment Method</b> : {this.state.orderData.paymentMethod}</span>
										</div>
                                        {this.state.orderData ? 
										<div>
										<div className="table-responsive returnItemsTable">
											<h5><b>Returned Items</b></h5>
											<table className="table table-borderless viewBillTable">
											<thead>
												<tr>
												<th scope="col">ITEM</th>
												<th scope="col">QTY</th>
												<th scope="col">RATE</th>
												<th scope="col">DISCOUNT</th>
												<th scope="col">AMOUNT</th>
												<th scope="col">PAYMENT</th>
												<th scope="col">RETURNED DATE</th>
												</tr>
											</thead>
											<tbody>
											{
                                                this.state.orderData.returnedProduct && this.state.orderData.returnedProduct.length > 0 ?
                                                    this.state.orderData.returnedProduct.map((data, index) => {
													data.subTotal = data.discountedPrice * data.quantity;
													return(
														<tr>
															<td>{data.productName}</td>
															<td> 
													              <small>{data.quantity} {data.unit}</small>
															</td>
															<td>{data.originalPrice}</td>
															<td>{data.discountPercent}<i class="fa fa-percent"></i>&nbsp;&nbsp;&nbsp;&nbsp;{data.discountedPrice}</td>
															<td>{data.subTotal}</td>
															<td>{data.paymentMethod}</td>
															<td>{moment(data.returnedDate).format("DD MMM YYYY")}</td>
													    </tr>
													)
												   
												})
												: null
                                             
											} 
											</tbody>
											<tfoot>
												<tr>
													{this.state.orderData.returnedProduct ?
														<td colSpan="5">Items/Qty {this.state.orderData.returnedProduct.length}</td>
														:
														<td colSpan="5">Items/Qty 0</td>
													}
														
													<td colSpan="2">Total: <i className="fa fa-inr"></i> {this.state.returnedOrderTotal}</td>
												</tr>
												<tr>
												<td colSpan="5"></td>
												<td className="totalNetAmount" colSpan="2">Net: <i className="fa fa-inr"></i> {this.state.returnedOrderTotal}</td>
												</tr>
											</tfoot>
											</table>
										</div>
											<div className="row" style={{"padding": "15px"}}>
												<span><b>Payment Method</b> : {this.state.orderData.paymentMethod}</span>
											</div>
										</div>
										: null }
										<div className="row Slogan" style={{"padding": "13px"}}>
											{/* <ul className="declaration"><b>Declaration</b>
												<li>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
											</ul> */}
											<h5 style={{textAlign:'center',fontSize:"medium",fontWeight: 600}}>!!! Thank You !!! Visit Again !!!</h5>
										</div>
										
									</form>
								</div>
							</div> 
                            : <div className="col-lg-4 col-lg-offset-2 col-md-6 col-sm-12 col-xs-12">
                                <h3 style={{color:'darkgray'}}>Please search bill number to return products</h3>
                            </div> }
							{/* return bill div end */}
							</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log("mapStateToProps",state);
	return {
	  recentCartData :  state.recentCartData
	}
  }
  const mapDispachToProps = (dispatch) => {
	return  bindActionCreators({ fetchCartData: getCartData }, dispatch)
  }
  export default connect(mapStateToProps, mapDispachToProps)(returnBill);