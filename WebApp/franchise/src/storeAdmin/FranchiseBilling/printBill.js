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
				getBillNumbers        :''
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
              billNumber :response.data.billNumber
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
	
	editCart(id){
		var showDiscount = false;
		this.props.recentCartData[0].cartItems.map((data,index)=>{
			if(data._id == id){
				if(data.rate == 0){
					showDiscount = true;
				}
				this.setState({
					product_ID : data.productDetail._id,
					itemCode : data.productDetail.itemCode,
					quantity : data.quantity,
					discountPercent :data.discountPercent,
					discountedPrice : data.discountedPrice,	
					rate   : data.rate,
					showDiscount : showDiscount
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
		axios.get("/api/orders/get/one/" + event.target.value)
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
					{this.state.showReturnProductDiv === true  ? 
						<div className="row">
						<div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12 NOpadding mtop20">
							    <input list="selectBillNumber" type="text" refs="selectBillNumber" className="form-control" placeholder="Search by Bill Number..." onChange={this.onSearchBillNumber.bind(this)} name="selectBillNumber" autocomplete="off"/> 
								<datalist id="selectBillNumber" name="selectBillNumber" className="billDatalist">
										{
											this.state.billNumbersArray && this.state.billNumbersArray.length > 0 ?
												this.state.billNumbersArray.map((data, i)=>{
													return(
														<option key={i} value={data.orderID} billnumber={data.billnumber} data-id={data._id} data-orderid={data.orderId}>{data.billNumber}</option>
													);
												})
											:
											<option>No Bills available</option>
										}
								</datalist>
                                <button className="input-group button_add button button" type="button"><i className="fa fa-plus"></i></button>
						</div>
						
						</div>
						: null}
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
															{/* <td>
																{/* <span className="fa fa-pencil" data-toggle="modal" onClick={this.editCart.bind(this,data._id)} data-target={"#editPoItem"+ data._id} id={data._id}></span>
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
																<span className="fa fa-pencil" data-toggle="modal" onClick={this.editCart.bind(this,data._id)} data-target={"#editPoItem"+ data._id} id={data._id}></span>
																<i class="fa fa-undo" aria-hidden="true"></i>
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