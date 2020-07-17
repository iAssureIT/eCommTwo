import React from 'react';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
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
                pos                   : ''
          };
	}
	
	componentDidMount() {
        this.getFranchiseDetails();
        console.log("this.props.match.params",this.props.match.params);
        axios.get("/api/orders/get/one/" + this.props.match.params.orderId)
          .then((response) => {
            console.log('orderData', response.data)
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
        console.log("companyID",userDetails.companyID);
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
                console.log("state",this.state)
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
        // var mywindow = window.open('', 'new div', 'height=400,width=600');
        // mywindow.document.write('<html><head><title></title>');
        // mywindow.document.write('<link rel="stylesheet" href="./bill.css" type="text/css" />');
        // mywindow.document.write('</head><body >');
        // mywindow.document.write($('.viewBillDiv').html());
        // mywindow.document.write('</body></html>');
        // mywindow.document.close();
        // mywindow.focus();
        // setTimeout(function(){mywindow.print();},1000);
        // mywindow.close();
    }
   
	render() {
		const cartItems = this.props.recentCartData;
		let total    = 0
		 if(this.props.recentCartData.length > 0){
			total = this.props.recentCartData[0].cartItems.reduce((prev,next) => prev + next.subTotal,0);
			console.log("totalAmt",total);
		 }else{
			total = 0;
		 }
		
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-6 col-lg-offset-3 col-md-6 col-sm-12 col-xs-12 viewBillDiv">
							    <div className="row billLogoDiv">
									<img className="logoImg" src="../../images/logoUnimandai.png"/>
									<div className="address">{this.state.franchiseLocation}</div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 billNumber">Bill No: <span class="barcode">{this.state.billNumber}</span></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 billNumber pullright"><span class="barcode">{this.state.billNumber}</span></div>
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
												<th scope="col">UNIT RATE</th>
												<th scope="col">DISCOUNT</th>
												<th scope="col">DIS PRICE</th>
												<th scope="col">AMOUNT</th>
												</tr>
											</thead>
											<tbody>
											{
                                                this.state.orderData.products && this.state.orderData.products.length > 0 ?
                                                    this.state.orderData.products.map((data, index) => {
													console.log("recentCartData",data,index);
													data.subTotal = data.discountedPrice * data.quantity;
													return(
														<tr>
															<td>{data.productName}</td>
															<td> 
													              <small>{data.quantity} {data.unit}</small>
															</td>
															<td><i className="fa fa-inr"></i>{data.originalPrice}</td>
															<td><i class="fa fa-percent"></i>{data.discountPercent}</td>
															<td><i className="fa fa-inr"></i>{data.discountedPrice}</td>
															<td><i className="fa fa-inr"></i>{data.subTotal}</td>
															
													</tr>
													)
												})
												:
												null
											} 
											</tbody>
											<tfoot>
												<tr>
													{this.props.recentCartData.length > 0 ?
														<td colspan="4">Items/Qty {this.state.orderData.cartQuantity}</td>
														:
														<td colspan="4">Items/Qty 0</td>
													}

													<td colspan="2">Total: <i className="fa fa-inr"></i> {this.state.orderData.cartTotal}</td>
												</tr>
												<tr>
												<td colspan="4"></td>
												<td className="totalNetAmount" colspan="2">Net: <i className="fa fa-inr"></i> {this.state.orderData.cartTotal}</td>
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
                            <div className="col-lg-2 col-md-3 col-sm-4 col-xs-4">
                                <i class="col-md-12 col-lg-12 col-xs-12 col-sm-12 btn printbtn  fa fa-print" style={{fontSize:"larger"}} onClick={this.printTable.bind(this)}></i>
                                
                            </div>
							</div>
						 {/* </div> */}
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