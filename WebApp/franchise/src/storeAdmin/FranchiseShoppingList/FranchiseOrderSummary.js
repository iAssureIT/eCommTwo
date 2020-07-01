import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';
import swal from 'sweetalert';
import $ from 'jquery';
import moment from 'moment';
import './FranchiseList.css';
// import 'import '../../coreadmin/userManagement/UM/userManagement.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import ShoppingList from './ShoppingList.js';
class FranchiseOrderSummary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allPosts: [],
			"twoLevelHeader": {
				apply: false,
			},
			"tableHeading": {
				orderNo: 'PO Number',
				orderDate: 'PO Date',
				orderedqty: 'Ordered Qty',
				profileStatus: "Status",
				actions: 'Actions',
			},
			"startRange": 0,
			"limitRange": 10,	
		}
	}

	componentDidMount() {
		const user_ID = localStorage.getItem("user_ID");
		var userDetails = (localStorage.getItem('userDetails'));
		var userData = JSON.parse(userDetails);
		const companyID = parseInt(userData.companyID);
		this.setState({
			user_ID: user_ID,
			companyID: companyID
		}, () => {
			axios.get('/api/entitymaster/get/one/companyName/'+this.state.companyID)
			.then((res) => {
				// console.log("res.data in companyName==>", res.data._id);
				var franchiseid = res.data._id;
					this.setState({
						franchiseid: franchiseid,
					},()=>{
						var data = {
							"startRange": this.state.startRange,
							"limitRange": this.state.limitRange,
						}
						this.getData(data);
					})
			})
			.catch((error) => {});		
		})
	}
	componentWillReceiveProps(nextprops){
		var data = {
			"startRange": this.state.startRange,
			"limitRange": this.state.limitRange,
		}
		this.getData(data);
	}
	redirecttoadd(){
		this.props.history.push("/franchise-shopping-list");
	}
	getData(data) {
		axios.get('/api/franchisepo/get/franchiseorderlist/'+this.state.franchiseid, data)
			.then((res) => {
				// console.log("res.data in getdata==>", res.data);
					var tableData = res.data.map((a, i) => {
						// console.log('tableData A==>>>', a.franchiseName !== null || a.franchiseName.length > 0 ? a.franchiseName[0].companyName : null );
						return {
							_id						: a._id,
							orderNo				: a.orderNo.toString(),
							orderDate			: moment(a.orderDate).format("ddd, DD-MMM-YYYY"),
							orderedqty		: a.orderItems.length.toString(),
							profileStatus	: a.franchiseName !== null || a.franchiseName.length > 0 ? a.franchiseName[0].profileStatus : null,
						}

					})
					this.setState({
						tableData: tableData,
					})
			})
			.catch((error) => {
			});
	}
	render() {
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
 					<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">

					<div className="formWrapper">
						<section className="content">
							<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent ">
								<div className="row">
									<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20">
										<h3 className="text-center">Franchise Order Summary</h3>
									</div>
									<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
										<button className="btn btn-primary col-lg-2 col-md-3 col-xs-4 col-sm-4 mglft15" onClick={this.redirecttoadd.bind(this)}>Add Franchise Order</button>
									</div>
									<form className="newTemplateForm">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<ShoppingList
												getData={this.getData.bind(this)}
												tableHeading={this.state.tableHeading}
												tableData={this.state.tableData}
												tableObjects={this.state.tableObjects}
											/>
										</div>
									</form>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>

		);
	}
}
export default FranchiseOrderSummary;