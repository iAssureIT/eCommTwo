import React from 'react';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import Barcode from 'react-barcode' ;
import './bill.css';
import swal from 'sweetalert';
import axios from 'axios';
import moment from 'moment';
import jQuery, { isNumeric, data } from 'jquery';
import $ from 'jquery';
import { countBy } from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCartData } from '../../redux/actions/index';

export class printBill extends React.Component {
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
                orderData             : [],
				pos                   : '',
				showFullScreen        : false,
				showReturnProductDiv  : false,
				getBillNumbers        :'',
				billDate              : ''
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
        axios.get("/api/orders/get/one/" + this.props.match.params.orderId)
          .then((response) => {
            this.setState({
              orderData: response.data,
			  billNumber :response.data.billNumber,
			  billDate   : response.data.createdAt
            })
          })
          .catch((error) => {
            console.log('error', error);
          })
    }

    getFranchiseDetails(){
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
	
	editOrder(id){
		var showDiscount = false;
		this.state.orderData.products.map((data,index)=>{
			console.log("data",data);
			if(data.product_ID == id){
				if(data.rate == 0){
					showDiscount = true;
				}
			}
				this.setState({
					product_ID : data.product_ID,
					// itemCode : data.productDetail.itemCode,
					quantity : data.quantity,
					discountPercent :data.discountPercent,
					discountedPrice : data.discountedPrice,	
					rate   : data.originalPrice,
					showDiscount : showDiscount
				},()=>{
					
				})
			
			
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

		axios.get("/api/orders/get/one/" + id)
		.then((response) => {
		  this.setState({
			orderData: response.data,
			billNumber :response.data.billNumber
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
		// console.log('discountPercent', event.target.value);
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
		// var discountPercent = parseFloat(this.refs.discountPercent.value);
		// var discountedPrice = parseFloat(this.refs.discountedPrice.value);
		// console.log("discountPercent",discountPercent);
		// console.log("discountedPrice",discountedPrice);
		// if (discountPercent) {
		//   this.setState({
		// 	discountedPrice: parseFloat(event.target.value) - parseFloat((event.target.value * discountPercent) / 100).toFixed(2)
		//   });
		// }
		// if (discountedPrice) {
		//   this.setState({
		// 	discountPercent: parseFloat((event.target.value - discountedPrice / event.target.value) * 100).toFixed(2)
		//   });
		// }
	  }

	

	
	// Removefromcart(event){
    //     event.preventDefault();
    //     const userid = localStorage.getItem('user_ID');
    //     const cartitemid = event.target.getAttribute('id');
    //     const formValues = { 
    //         "user_ID"    : userid,
    //         "cartItem_ID" : cartitemid,
    //     }
    //     axios.patch("/api/carts/remove" ,formValues)
    //     .then((response)=>{
    //         this.setState({
    //             messageData : {
    //               "type" : "outpage",
    //               "icon" : "fa fa-check-circle",
    //               "message" : response.data.message,
    //               "class": "success",
    //               "autoDismiss" : true
    //             }
    //         })
    //         setTimeout(() => {
    //             this.setState({
    //                 messageData   : {},
    //             })
    //         }, 3000);
    //         this.props.fetchCartData();
    //     })
    //     .catch((error)=>{
    //     console.log('error', error);
    //     })
	// }
	
	

    // proceedToCheckout(event){
	// 	event.preventDefault();
	// 	this.setState({
	// 		"checkoutClicked" : true
	// 	})
	// 	const userid = localStorage.getItem('user_ID');
    //     var soldProducts = this.props.recentCartData[0].cartItems.filter((a, i)=>{
    //         return a.productDetail.availableQuantity <= 0;
	// 	})
	// 	let total    = 0
	// 	 if(this.props.recentCartData.length > 0){
	// 		total = this.props.recentCartData[0].cartItems.reduce((prev,next) => prev + next.subTotal,0);
	// 	 }else{
	// 		total = 0;
	// 	 }
	// 		var cartItems = this.props.recentCartData[0].cartItems.map((a, i) => {
	// 			return {
	// 				"product_ID": a.productDetail._id,
	// 				"productName": a.productDetail.productName,
	// 				"discountPercent": a.discountPercent,
	// 				"discountedPrice": a.discountedPrice,
	// 				"originalPrice": a.rate,
	// 				"color": a.productDetail.color,
	// 				"size": a.productDetail.size,
	// 				"unit" : a.productDetail.unit,
	// 				"currency": a.productDetail.currency,
	// 				"quantity": a.quantity,
	// 				"subTotal": a.subTotal,
	// 				"saving": a.saving,
	// 				"productImage": a.productDetail.productImage,
	// 				"section_ID": a.productDetail.section_ID,
	// 				"section": a.productDetail.section,
	// 				"category_ID": a.productDetail.category_ID,
	// 				"category": a.productDetail.category,
	// 				"subCategory_ID": a.productDetail.subCategory_ID,
	// 				"subCategory": a.productDetail.subCategory,
	// 				"vendor_ID": a.productDetail.vendor_ID
	// 			}
	// 		})
			
	// 		var orderData = {
	// 		    billNumber : this.state.billNumber,
	// 			franchise_id : this.state.franchise_id,
	// 			user_ID: localStorage.getItem('user_ID'),
	// 			cartItems: cartItems,
	// 			shippingtime: this.state.shippingtiming,
	// 			total: this.props.recentCartData[0].total,
	// 			cartTotal: total,
	// 			discount: this.props.recentCartData[0].discount,
	// 			cartQuantity: this.props.recentCartData[0].cartQuantity,
	// 			deliveryAddress: this.state.deliveryLocation[0],
	// 			paymentMethod: "Cash On Delivery",
	// 			status       : "Paid",
	// 			deliveryStatus : "Delivered & Paid"
	// 		}
	// 		// console.log("Order Data:--->",orderData);
	// 		axios.post('/api/orders/post', orderData)
	// 			.then((result) => {
	// 				this.props.fetchCartData();
	// 				swal("Bill Created Successfully.")
	// 				this.setState({
	// 					messageData: {
	// 						"type": "outpage",
	// 						"icon": "fa fa-check-circle",
	// 						"message": "Order Placed Successfully ",
	// 						"class": "success",
	// 						"autoDismiss": true
	// 					}
	// 				})
	// 				setTimeout(() => {
	// 					this.setState({
	// 						messageData: {},
	// 					})
	// 				}, 3000);
	// 				this.props.history.push('/view-bill/'+ result.data.order_ID);
	// 			})
	// 			.catch((error) => {
	// 				console.log("return to checkout");
	// 				console.log(error);
	// 			})
		
    //     //  }
	// }


	UpdateCartData(event){
		event.preventDefault();
		// this.checkProductSoldOut(this.state.itemCode,'update');
		const userid = localStorage.getItem('user_ID');
		const formValues = {
			"user_ID"     	  : userid,
			"product_ID" 	  : this.state.product_ID,
			"quantity"        : this.state.quantity,
			"discountedPrice" : this.state.discountedPrice,
			"discountPercent" : this.state.discountPercent,
			"rate"            : this.state.rate

		}

		var reportFilterData = {};

		reportFilterData.franchiseId = this.state.franchise_id;
		reportFilterData.itemcode = this.state.itemCode;
		axios.post('/api/finishedGoodsEntry/post/getProductCurrentStockReport/',reportFilterData)
		.then((response)=>{
			if(response.data.length > 0){
				if(this.props.recentCartData.length > 0){
						   if(response.data[0].totalStock < this.state.quantity){
							   this.setState({
								   "soldOutProductError" : "Product Sold Out"
							   })
							   swal(this.state.soldOutProductError);
						   }else{
								this.setState({
									"soldOutProductError" : ''
								});
								axios.patch("/api/carts/updateCart" ,formValues)
								.then((response)=>{
									swal("Product updated successfully.")
										this.props.fetchCartData();
								})
								.catch((error)=>{
										console.log('error', error);
								})
						    }
				}
			}
		})
		$('.close').click();
		
	}

	onChangeEditVal(event){
		event.preventDefault();
		const {name,value} = event.target;
		this.setState({
			[name] : value 
		})
	}
   


	render() {
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
					{/* {this.state.showReturnProductDiv === true  ? 
						<div className="row">
						<div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12 NOpadding mtop20">
							    <input list="selectBillNumber" type="text" refs="selectBillNumber" className="form-control" placeholder="Search by Bill Number..." onChange={this.onSearchBillNumber.bind(this)} name="selectBillNumber" autocomplete="off"/> 
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
                                <button className="input-group button_add button button" type="button"><i className="fa fa-plus"></i></button>
						</div>
						
						</div>
						: null} */}
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding billPage">
                        <div className="col-lg-2 col-md-2 col-sm-6 col-xs-6">
						    <a className="btn btn-info printbtn viewBillBtns fa fa-home" href="/dashboard" title="Go to Homepage"></a>
						    {this.state.showFullScreen === false ? 
							<button className="btn btn-info printbtn viewBillBtns fa fa-arrows-alt" title="Open Fullscreen" onClick={this.openFullscreen.bind(this)}></button>
							: <button className="btn btn-info printbtn viewBillBtns fa fa-window-close" title="Close Fullscreen"  onClick={this.closeFullscreen.bind(this)}></button>
						    }
                            <a class="btn btn-info viewBillBtns" href="/franchise-billing" title="Create New Bill">New Bill</a>
                            <button class="btn btn-info printbtn viewBillBtns fa fa-print" title="Print Bill" onClick={this.printTable.bind(this)}></button>
						
							{/* <a class="btn btn-info reTurnBill viewBillBtns" onClick={this.onClickReturnProducts.bind(this)} title="return Products">Return Bill</a>  */}
							
							{/* href="/return-products" */}
                        </div>
						    {/* View bill div start */}
							{this.state.showReturnProductDiv === false ? 
							<div className="col-lg-4 col-lg-offset-2 col-md-6 col-sm-12 col-xs-12 viewBillDiv">
							    <div className="row billLogoDiv">
									<img className="logoImg" src="../../images/logoUnimandai.png"/>
									<div className="address">{this.state.franchiseLocation}</div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 billNumber">Bill No: <span class="barcode">{this.state.billNumber}</span></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 billNumber pullright"><Barcode value={this.state.billNumber}/></div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullleft"><small class="">Date: {moment(this.state.billDate).format("DD MMM YYYY")}</small></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullright"><small class="">Time: {moment(this.state.billDate).format(" hh:mm a")}</small></div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullleft"><small class="">POS: {this.state.pos}</small></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullright"><small class="">GSTIN: {this.state.gstNo}</small></div>
								</div>
								<div className="row" style={{"padding": "15px"}}> 
									<form className="productsEditForm" id="productsEditForm">
									<div className="table-responsive">
										<table class="table table-borderless">
											<thead>
												<tr>
												<th scope="col">ITEM</th>
												<th scope="col">QTY</th>
												<th scope="col">RATE</th>
												<th scope="col">DISCOUNT</th>
												<th scope="col">AMOUNT</th>
												{/* <th scope="col"></th> */}
												</tr>
											</thead>
											<tbody>
											{
                                                this.state.orderData.products && this.state.orderData.products.length > 0 ?
                                                    this.state.orderData.products.map((data, index) => {
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
															{/* <td>
																{/* <span className="fa fa-pencil" data-toggle="modal" onClick={this.editOrder.bind(this,data._id)} data-target={"#editPoItem"+ data._id} id={data._id}></span>
																<i class="fa fa-undo" aria-hidden="true"></i> 
						 									</td> */}
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
														<td colspan="4">Items/Qty {this.state.orderData.cartQuantity}</td>
														:
														<td colspan="4">Items/Qty 0</td>
													}

													<td colspan="2">Total: <i className="fa fa-inr"></i> {this.state.orderData.cartTotal}</td>
												</tr>
												<tr>
												<td colspan="4"></td>
												<td className="totalNetAmount" colspan="2">Net: <i className="fa fa-inr"></i> {this.state.orderData.cartTotal} ({this.state.orderData.status})</td>
												</tr>
											</tfoot>
											</table>
										</div>
										<div className="row" style={{"padding": "13px"}}>
											<ul className="declaration"><b>Declaration</b>
												<li>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
											</ul>
											<h5 style={{textAlign:'center',fontSize:"medium",fontWeight: 600}}>!!! Thank You !!! Visit Again !!!</h5>
										</div>
										
									</form>
								</div>
							</div> 
							: 
							/* View Bill div end */
							/* Return product div start */
							
							<div className="col-lg-4 col-lg-offset-2 col-md-6 col-sm-12 col-xs-12 viewBillDiv">
							    <div className="row billLogoDiv">
									<img className="logoImg" src="../../images/logoUnimandai.png"/>
									<div className="address">{this.state.franchiseLocation}</div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 billNumber">Bill No: <span class="barcode">{this.state.billNumber}</span></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 billNumber pullright"><Barcode value={this.state.billNumber}/></div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullleft"><small class="">Date: {moment(new Date()).format("DD MMM YYYY")}</small></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullright"><small class="">Time: {moment(new Date()).format(" hh:mm a")}</small></div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullleft"><small class="">POS: {this.state.pos}</small></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullright"><small class="">GSTIN: {this.state.gstNo}</small></div>
								</div>
								<div className="row" style={{"padding": "15px"}}> 
									<form className="productsEditForm" id="productsEditForm">
									<div className="table-responsive">
										<table class="table table-borderless">
											<thead>
												<tr>
												<th scope="col">ITEM</th>
												<th scope="col">QTY</th>
												<th scope="col">RATE</th>
												<th scope="col">DISCOUNT</th>
												<th scope="col">AMOUNT</th>
												{/* <th scope="col"></th> */}
												</tr>
											</thead>
											<tbody>
											{
                                                this.state.orderData.products && this.state.orderData.products.length > 0 ?
                                                    this.state.orderData.products.map((data, index) => {
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
															<td>
																<span className="fa fa-pencil" data-toggle="modal" onClick={this.editOrder.bind(this,data.product_ID)} data-target={"#editPoItem"+ data._id} id={data._id}></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																<i class="fa fa-undo" aria-hidden="true"></i>
																<div class="modal fade" id={"editPoItem"+ data._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
																<div class="modal-dialog modal-dialog-centered" role="document">
																	<div class="modal-content">
																	<div class="modal-header">
																	    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
																			<span aria-hidden="true">&times;</span>
																		</button>
																		<h3 class="modal-title" id="exampleModalLongTitle">Edit Purchase Item</h3>
																	</div>
																	<div class="modal-body">
																		<h4>{data.productName} <small>(Product Code :{data.productCode} , Item Code :{data.itemCode})</small></h4>
																		<div class="row">
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
																				<label className="control-label statelabel locationlabel" >Quantity <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx quantityDiv" >
																					<div className="input-group-addon inputIcon">
																					    <small>{data.unit}</small>
																					</div> 
																					<input type="number" placeholder="" className="form-control new_inputbx1" value={this.state.quantity} prevValue={data.quantity} name="quantity" refs="quantity" onChange={this.onChangeEditVal.bind(this)} id="quantity" min="1" size={data.size} unit={data.unit} productid={data.product_ID} id={data._id} dataquntity={this.state.quantityAdded !== 0 ? this.state.quantityAdded : data.quantity} availableQuantity={data.availableQuantity} required/>
																				</div>     
																			</div>  
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
																				<label className="control-label statelabel locationlabel" >Rate <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx originalPriceDiv" >
																					<div className="input-group-addon inputIcon">
																					<i className="fa fa-rupee"></i>
																					</div> 
																					<input type="number" placeholder="" className="form-control new_inputbx1" value={this.state.rate} name="rate" refs="rate" onChange={this.percentAndPrice.bind(this)} productid={data.product_ID} id="rate" min="1" ref="originalPrice" discountPercent={data.discountPercent} discountedPrice={data.discountedPrice} required/>
																				</div>     
																			</div>  
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
																				<label className="control-label statelabel locationlabel" >Discount <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx amountDiv" >
																					<input max={100} disabled={this.state.showDiscount} value={this.state.discountPercent} onChange={this.discountedPrice.bind(this)} placeholder="Discount Percent" id="discountPercent" name="discountPercent" type="number" className="form-control  availableQuantityNew" aria-describedby="basic-addon1" ref="discountPercent" />
																					<div className="input-group-addon inputIcon discountInput">
																						<i className="fa fa-percent"></i>
																					</div> 
																				</div>     
																			</div>  
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
																				<label className="control-label statelabel locationlabel" >Discount Rate <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx amountDiv" >
																					<div className="input-group-addon inputIcon">
																					<i className="fa fa-rupee"></i>
																					</div> 
																					<input max={this.state.rate} disabled={this.state.showDiscount} onChange={this.discountPercent.bind(this)} value={this.state.discountedPrice} id="discountedPrice" name="discountedPrice" type="number" className="form-control  selectdropdown" placeholder="Discounted Price" aria-describedby="basic-addon1" ref="discountedPrice"  max={this.state.rate} min="1"/>

																				</div>     
																			</div>  
																		</div>
																		<div class="row">
																			<br/>
																			<h4>Subtotal : <i className="fa fa-rupee"></i> {(this.state.discountedPrice) * (this.state.quantity)}</h4>
																		</div>
																	</div>
																	<div class="modal-footer">
																		<button type="button" class="btn btn-primary" onClick={this.UpdateCartData.bind(this)}>Submit</button>
																	</div>
																	</div>
																</div>
																</div>
						 									</td>
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
														<td colspan="4">Items/Qty {this.state.orderData.cartQuantity}</td>
														:
														<td colspan="4">Items/Qty 0</td>
													}

													<td colspan="2">Total: <i className="fa fa-inr"></i> {this.state.orderData.cartTotal}</td>
												</tr>
												<tr>
												<td colspan="4"></td>
												<td className="totalNetAmount" colspan="2">Net: <i className="fa fa-inr"></i> {this.state.orderData.cartTotal} ({this.state.orderData.status})</td>
												</tr>
											</tfoot>
											</table>
										</div>
										<div className="row" style={{"padding": "13px"}}>
											<ul className="declaration"><b>Declaration</b>
												<li>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
											</ul>
											<h5 style={{textAlign:'center',fontSize:"medium",fontWeight: 600}}>!!! Thank You !!! Visit Again !!!</h5>
										</div>
										
									</form>
								</div>
							</div> 
							}
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
  export default connect(mapStateToProps, mapDispachToProps)(printBill);