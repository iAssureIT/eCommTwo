import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';

export default class FranchiseOrderSummary extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			date : "",
			franchiselist : "",
			status : "",
			prodStockOrder : "",
			viewDataID : "",
			user_ID : localStorage.getItem("user_ID")
		}
	}

	componentDidMount(){
		this.getViewData(this.props.match.params.orderId);
		var orderid = this.props.match.params.orderId;
		console.log("ORder ID==>",orderid);

	}
	getViewData(purchaseorder_id){
		axios
			.get('/api/franchisepo/get/one/purchaseorder/'+purchaseorder_id)
            .then((editdatalist) => {
				console.log("prodlist prodlist==>",editdatalist.data);
				var franchiseName = editdatalist.data.franchiseName[0].companyName
				var companyID = editdatalist.data.franchiseName[0].companyID
				var companyPhone = editdatalist.data.franchiseName[0].companyPhone
				var orderItems = editdatalist.data.orderItems
				var orderItemsqty = editdatalist.data.orderItemsqty
				var orderNo = editdatalist.data.orderNo
				var orderDate = editdatalist.data.orderDate
                this.setState({
                    "franchiseName": franchiseName,
                    "franchiseID": companyID,
                    "companyPhone": companyPhone,
                    "orderItems": orderItems,
                    "orderItemsqty": orderItemsqty,
                    "orderNo": orderNo,
                    "orderDate": orderDate,
                })
            })
            .catch((error) => {})
	}

	render() {
		return (
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
					<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
						<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent nopadding'>
							 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 fstdiv">
								<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mgtb20px">
									<h3 className="text-center ordertitleclr">Franchise Purchase Order View</h3>
								</div>
								<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mgtb20px">
									<div  className="col-lg-6 col-md-6 col-xs-6 col-sm-6 ">
										<h5 className="ordertitleclr">Franchise Name : {this.state.franchiseName}</h5>
										<h5 className="ordertitleclr">Franchise Contact : {this.state.companyPhone}</h5>
									</div>
									<div  className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
										<h5 className="text-right ordertitleclr">PO Number : {this.state.orderNo} </h5>
										<h5 className="text-right ordertitleclr">Franchise ID : {this.state.franchiseID} </h5>
										<h5 className="text-right ordertitleclr">Order Date  : {moment(this.state.orderDate).format("DD-MMM-YY")} </h5>
									</div>
								</div>
							</div>	 
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mg20px">
								<div className="table-responsive">       
							    	<table className="table table-bordered table-striped table-hover">
									    <thead className="theadcolor text-center">
									      	<tr>
										        <th className="text-center">Product Code</th>
										        <th className="text-center">Product Name</th>
										        <th className="text-center">Product Section</th>
										        <th className="text-center">Product Qty</th>
										        <th className="text-center">Product Unit</th>
										        <th className="text-center">Current Stock</th>
									      	</tr>
									    </thead>
											{
												this.state.orderItems &&
												this.state.orderItems.map((order, index) => {
													return (
														<tbody key={index}>
															<tr>
																<td className="text-center">{order.productCode}</td>
																<td className="text-center">{order.productName}</td>
																<td className="text-center">{order.section}</td>
																<td className="text-center">{order.orderQty}</td>
																<td className="text-center">{order.unit}</td>
																<td className="text-center">{order.currentStock}</td>
															</tr>
														</tbody>
													);
												})
											}
									</table>
							    </div>
							</div>	 
							<div className="col-lg-12 col-md-2 col-sm-12 col-xs-12 ">
								<div className="col-lg-10 col-md-2 col-sm-12 col-xs-12"></div>
								<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 lstdiv">
									<div  className="col-lg-12 col-md-12 col-xs-6 col-sm-6">
										<h5 className="text-center ordertotlaqty">Total Qty : {this.state.orderItemsqty} </h5>
									</div>
								</div>
							</div>	
						</div>
					</div>
				</div>
		);
	}
}
