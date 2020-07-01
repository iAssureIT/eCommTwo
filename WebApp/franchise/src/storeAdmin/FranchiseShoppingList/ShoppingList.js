import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import $ from 'jquery';
import jQuery from 'jquery';
import 'jquery-validation';
// import './IAssureTable.css';
import './FranchiseShoppingList.css';
import moment from 'moment';
import { Route, withRouter } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

var sum = 0;
class IAssureTableUM extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"tableData": props && props.tableData ? props.tableData : [],
			"tableName": props && props.tableName ? props.tableName : [],
			"tableHeading": props && props.tableHeading ? props.tableHeading : {},
			"twoLevelHeader": props && props.twoLevelHeader ? props.twoLevelHeader : {},
			"reA": /[^a-zA-Z]/g,
			"reN": /[^0-9]/g,
			"sort": true,
			"examMasterData2": '',
			"activeClass": 'activeQueDataCircle',
			"paginationArray": [],
			"startRange": 0,
			"limitRange": 10,
			"activeClass": 'activeQueDataCircle',
			"completeDataCount": props && props.completeDataCount ? props.completeDataCount : 0,
			"normalData": true,
			"resetPassword": "",
			"resetPasswordConfirm": "",
			
			show: true,
			selectedUser: [],
			allid: null,
		}
	}
	componentDidMount() {
		$("html,body").scrollTop(0);
		this.setState({
			tableHeading: this.props.tableHeading,
			tableData: this.props.tableData,
			completeDataCount: this.props.completeDataCount
		})
		const user_ID = localStorage.getItem("user_ID");
		
		this.setState({
			user_ID: user_ID,
		}, () => {
			var user_ID = this.state.user_ID
			axios.get('/api/users/get/' + user_ID)
				.then((res) => {
					this.setState({
						username: res.data.firstname + " " + res.data.lastname
					})
				})
				.catch((error) => {
				});
		})
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps) {
			this.setState({
				tableData: nextProps.tableData,
				completeDataCount: nextProps.completeDataCount,
			})
		}
	}

	componentWillUnmount() {
		window.showUserDetails = null;
		window.doubleclickonname = null;
		window.doubleclickonCompany = null;
		$("script[src='/js/adminSide.js']").remove();
		$("link[href='/css/dashboard.css']").remove();
	}
	sort(event) {
		event.preventDefault();
		var key = event.target.getAttribute('id');
		var nameA = '';
		var nameB = '';
		var tableData = this.state.tableData;
		if (this.state.sort === true) {
			if (key === 'number') {
				var reA = /[^a-zA-Z]/g;
				var reN = /[^0-9]/g;
				var aN = 0;
				var bN = 0;
				var sortedData = tableData.sort((a, b) => {
					Object.entries(a).map(
						([key1, value1], i) => {
							if (key === key1) {
								nameA = value1.replace(reA, "");
							}
						}
					);
					Object.entries(b).map(
						([key2, value2], i) => {
							if (key === key2) {
								nameB = value2.replace(reA, "");
							}
						}
					);

					if (nameA === nameB) {
						Object.entries(a).map(
							([key1, value1], i) => {
								if (key === key1) {
									aN = parseInt(value1.replace(reN, ""), 10);
								}
							}
						);

						Object.entries(b).map(
							([key1, value1], i) => {
								if (key === key1) {
									bN = parseInt(value1.replace(reN, ""), 10);
								}
							}
						);

						if (aN < bN) {
							return -1;
						}
						if (aN > bN) {
							return 1;
						}
						return 0;

					} else {

						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}
						return 0;
					}
				});
			} else {
				var sortedData = tableData.sort((a, b) => {
					Object.entries(a).map(
						([key1, value1], i) => {
							if (key === key1) {
								if (jQuery.type(value1) === 'string') {
									nameA = value1.toUpperCase();
								} else {
									nameA = value1;
								}
							}
						}
					);
					Object.entries(b).map(
						([key2, value2], i) => {
							if (key === key2) {
								if (jQuery.type(value2) === 'string') {
									nameB = value2.toUpperCase();
								} else {
									nameB = value2;
								}
							}
						}
					);

					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				});
			}
			this.setState({
				tableData: sortedData,
				sort: false
			});
		} else if (this.state.sort === false) {
			if (key === 'number') {
				var reA = /[^a-zA-Z]/g;
				var reN = /[^0-9]/g;
				var aN = 0;
				var bN = 0;
				var sortedData = tableData.sort((a, b) => {
					Object.entries(a).map(
						([key1, value1], i) => {
							if (key === key1) {
								nameA = value1.replace(reA, "");
							}
						}
					);
					Object.entries(b).map(
						([key2, value2], i) => {
							if (key === key2) {
								nameB = value2.replace(reA, "");
							}
						}
					);

					if (nameA === nameB) {
						Object.entries(a).map(
							([key1, value1], i) => {
								if (key === key1) {
									aN = parseInt(value1.replace(reN, ""), 10);
								}
							}
						);

						Object.entries(b).map(
							([key1, value1], i) => {
								if (key === key1) {
									bN = parseInt(value1.replace(reN, ""), 10);
								}
							}
						);

						if (aN > bN) {
							return -1;
						}
						if (aN < bN) {
							return 1;
						}
						return 0;

					} else {

						if (nameA > nameB) {
							return -1;
						}
						if (nameA < nameB) {
							return 1;
						}
						return 0;
					}
				});
			} else {
				var sortedData = tableData.sort((a, b) => {
					Object.entries(a).map(
						([key1, value1], i) => {
							if (key === key1) {
								if (jQuery.type(value1) === 'string') {
									nameA = value1.toUpperCase();
								} else {
									nameA = value1;
								}
							}
						}
					);
					Object.entries(b).map(
						([key2, value2], i) => {
							if (key === key2) {
								if (jQuery.type(value2) === 'string') {
									nameB = value2.toUpperCase();
								} else {
									nameB = value2;
								}
							}
						}
					);

					if (nameA > nameB) {
						return -1;
					}
					if (nameA < nameB) {
						return 1;
					}
					return 0;
				});
			}
			this.setState({
				tableData: sortedData,
				sort: true
			});
		}
	}
	
	setLimit(event) {
		event.preventDefault();
		if (this.refs.limitRange.value === 'All') {
			var limitRange = '';
		} else {
			var limitRange = parseInt(this.refs.limitRange.value);
		}
		console.log("this.limitRange==>",limitRange)
		var startRange = 0;
		this.setState({
			"limitRange": limitRange,
		}, () => {
			// console.log("this.props.limitRange==>",this.state.limitRange)
			if (this.state.normalData === true) {
				var data = {
					"startRange": this.state.startRange,
					"limitRange": this.state.limitRange,
					"companyID": this.props.companyID
				}
				this.props.getData(data)
			}
			if (this.state.searchData === true) {
				this.tableSearch();
			}
		});
	}
	tableSearch() {
		var searchText = this.refs.tableSearch.value.trim().toString();
		console.log("this.props.searchText==>",searchText)
		if (searchText && searchText.length !== 0) {
			var data = {
				searchText: searchText.toString(),
				startRange: this.state.startRange,
				limitRange: this.state.limitRange,
			}
			axios.post('/api/franchisepo/post/searchlist', data)
				.then((res) => {
					console.log("Res in searchtext==>", res)
					var tableData = res.data.map((a, i) => {
						return {
							_id: a._id,
							orderNo: a.orderNo.toString(),
							orderDate: moment(a.orderDate).format("llll"),
							franchisename: 'Franchise Name',
							ordereditems: 'Ordered Items',
							orderedqty: a.orderItems.length.toString(),
							profileStatus: "Status",
						}
					})
					this.setState({
						tableData: tableData,
					})
				})
				.catch((error) => {
				})

			this.setState({
				tableData: []
			});
		} else {
			this.setState({
				tableHeading: this.props.tableHeading,
				tableData: this.props.tableData,
				completeDataCount: this.props.completeDataCount
			})
		}
	}
	
	edit(id){
		console.log("edit id",id);
		this.props.history.push("/franchise-shopping-list/"+id);
	}
	getViewData(id){
		this.props.history.push("/franchise-order-view/"+id);
	}
	deletePO(id){
	 	swal({
          title: "Are you sure you want to delete this Order ?",
          text: "Once deleted, you will not be able to recover this Order!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
            if (success) {
            	axios
			    .delete("/api/franchisepo/delete/purchaseorder/"+id)
			    .then((response)=>{
			     	this.getFranchiseShoppingList();
			       swal("Your Order is deleted!");
			    })
			    .catch((error)=>{
			       console.log("error = ", error);              
			    });   
            } else {
            swal("Your Order is safe!");
          }
        }); 
    }	
	render() {
		return (
			<div id="tableComponent" className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
				<div className="col-lg-2 col-md-4 col-sm-12 col-xs-12 NOpadding-left">
					<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop17 NOpadding labelform text-left">Orders Per Page</label>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
						<select onChange={this.setLimit.bind(this)} value={this.props.limitRange} id="limitRange" ref="limitRange" name="limitRange" className="col-lg-12 col-md-12 col-sm-6 col-xs-12  noPadding form-control">
							<option value="Not Selected" disabled>Select Limit</option>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={25}>25</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
							<option value={500}>500</option>
							<option value={1000}>1000</option>
							<option value={1500}>1500</option>
							<option value={2000}>2000</option>
						</select>
					</div>
				</div>
				<div className="col-lg-4 col-md-4 col-md-offset-6 col-xs-12 col-sm-12 marginTop17 NOpadding-right">
					<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding labelform text-left">Search</label>
					<div className="">
						<input type="text" placeholder="Search By Franchise Name, PO Number..." onChange={this.tableSearch.bind(this)} className="NOpadding-right zzero form-control fa fa-search" ref="tableSearch" id="tableSearch" name="tableSearch" />
						<span className="input-group-addon input_status">
						</span>
					</div>
				</div>
					<div className="col-lg-1 col-md-1 col-xs-12 col-sm-12 NOpadding  pull-right" data-toggle="tooltip" data-placement="top" title="Download Table Data!">
						<ReactHTMLTableToExcel
							id="test-table-xls-button"
							className="download-table-xls-button fa fa-download tbmgtp tableicons pull-right"
							table="table-to-xls"
							filename={this.state.tableName}
							sheet="Users_Table_Data"
							
							buttonText=""/>
					</div>
				<div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 NOpadding marginTop17">
					<div className="table-responsive  ">
						<div className="scrolltbl">
							<table className="table iAssureITtable-bordered table-striped table-hover  ">
								<thead className="tempTableHeader">
									<tr className="">
										{this.state.twoLevelHeader.apply === true ?
											this.state.twoLevelHeader.firstHeaderData.map((data, index) => {
												return (
													<th key={index} colSpan={data.mergedColoums} className="umDynamicHeader srpadd textAlignCenter">{data.heading}</th>
												);
											})
											:
											null
										}
									</tr>
									<tr className="">
										{this.state.tableHeading ?
											Object.entries(this.state.tableHeading).map(
												([key, value], i) => {
													if (key === 'actions') {
														return (
															<th key={i} className="umDynamicHeader srpadd text-center">{value}</th>
														);
													} else {
														return (
															<th key={i} className="umDynamicHeader srpadd text-center">{value} <span onClick={this.sort.bind(this)} id={key} className="fa fa-sort tableSort"></span></th>
														);
													}

												}
											)
											:
											<th className="umDynamicHeader srpadd text-center"></th>
										}
									</tr>
								</thead>
								<tbody className="scrollContent">
									{this.state.tableData && this.state.tableData.length > 0 ?
										this.state.tableData.map(
											(value, i) => {
												// console.log('log.value=====>', value.roles);

												return (
													<tr key={i} className="">
														{
															Object.entries(value).map(
																([key, value1], i) => {
																	if (value1) {
																		if ($.type(value1) === 'string') {
																			var regex = new RegExp(/(<([^>]+)>)/ig);
																			var value2 = value1 ? value1.replace(regex, '') : '';
																			var aN = value2.replace(this.state.reA, "");
																			if (aN && $.type(aN) === 'string') {
																				// var textAlign = 'textAlignLeft';
																				var textAlign = 'text-center';
																			} else {
																				var bN = value1 ? parseInt(value1.replace(this.state.reN, ""), 10) : '';
																				if (bN) {
																					var textAlign = 'text-center';
																				} else {
																					var textAlign = 'text-center';
																				}
																			}
																			var found = Object.keys(this.state.tableHeading).filter((k) => {
																				return k === key;
																			});
																			if (found.length > 0) {
																				if (key !== 'id') {
																					return (<td className={textAlign} key={i}><div className={textAlign} dangerouslySetInnerHTML={{ __html: value1 }}></div></td>);
																				} else {

																				}
																			}
																		}
																	} else {
																		return (<td key={i}></td>);
																	}
																}
															)
														}
														{
															this.props.Actioncol ?
																""
																:
																<td className="textAlignCenter">
																	<span className="pointer pointerCls">
																			<i className="fa fa-pencil " title="Edit" id={value._id} onClick={this.edit.bind(this,value._id)} ></i>&nbsp; &nbsp;
																			<i className="fa fa-trash redFont " id={value._id} onClick={this.deletePO.bind(this,value._id)}></i>&nbsp; &nbsp; 
																			<i className="fa fa-eye" title="View" id={value._id} onClick={this.getViewData.bind(this,value._id)}></i>
																			{/* <i className="fa fa-pencil " title="Edit" id={value._id} onClick={this.edit.bind(this,value._id)} ></i>&nbsp; &nbsp;
																			<i className="fa fa-trash redFont " id={value._id} onClick={this.deletePO.bind(this,value._id)}></i>&nbsp; &nbsp; */}
																			
																	</span>
																</td>
														}
													</tr>
												);
											}
										)
										:
										<tr className="trAdmin"><td colSpan={Object.keys(this.state.tableHeading).length + 2} className="noTempData textAlignCenter">No Record Found!</td></tr>
									}
								</tbody>
							</table>
							
						</div>
					</div>
						{/*Export To Excel*/}
						<div className="table-responsive" id="HideTable">
						<table id="table-to-xls" className="table iAssureITtable-bordered table-striped table-hover  ">
								<thead className="tempTableHeader">
									<tr className="">
										{this.state.twoLevelHeader.apply === true ?
											this.state.twoLevelHeader.firstHeaderData.map((data, index) => {
												return (
													<th key={index} colSpan={data.mergedColoums} className="umDynamicHeader srpadd textAlignCenter">{data.heading}</th>
												);
											})
											:
											null
										}
									</tr>
									<tr className="">
										{this.state.tableHeading ?
											Object.entries(this.state.tableHeading).map(
												([key, value], i) => {
													if (key === 'actions') {
														return (
															<th key={i} className="umDynamicHeader srpadd textAlignLeft">{value != "actions"}</th>
														);
													} else {
														return (
															<th key={i} className="umDynamicHeader srpadd textAlignLeft">{value} <span onClick={this.sort.bind(this)} id={key} className="fa fa-sort tableSort"></span></th>
														);
													}

												}
											)
											:
											<th className="umDynamicHeader srpadd textAlignLeft"></th>
										}
									</tr>
								</thead>
								<tbody className="scrollContent">
									{this.state.tableData && this.state.tableData.length > 0 ?
										this.state.tableData.map(
											(value, i) => {
												return (
													<tr key={i} className="">
														{
															Object.entries(value).map(
																([key, value1], i) => {
																	if (value1) {
																		if ($.type(value1) === 'string') {
																			var regex = new RegExp(/(<([^>]+)>)/ig);
																			var value2 = value1 ? value1.replace(regex, '') : '';
																			var aN = value2.replace(this.state.reA, "");
																			if (aN && $.type(aN) === 'string') {
																				var textAlign = 'textAlignLeft';
																			} else {
																				var bN = value1 ? parseInt(value1.replace(this.state.reN, ""), 10) : '';
																				if (bN) {
																					var textAlign = 'textAlignLeft';
																				} else {
																					var textAlign = 'textAlignLeft';
																				}
																			}
																			var found = Object.keys(this.state.tableHeading).filter((k) => {
																				return k === key;
																			});
																			if (found.length > 0) {
																				if (key !== 'id') {
																					return (<td className={textAlign} key={i}><div className={textAlign} dangerouslySetInnerHTML={{ __html: value1 }}></div></td>);
																				} else {

																				}
																			}
																		}
																	} else {
																		return (<td key={i}></td>);
																	}
																}
															)
														}
													</tr>
												);
											}
										)
										:
										<tr className="trAdmin"><td colSpan={Object.keys(this.state.tableHeading).length + 2} className="noTempData textAlignCenter">No Record Found!</td></tr>
									}
								</tbody>
							</table>
						</div>
				</div>
			</div>
		);
	}
}

export default withRouter(IAssureTableUM);
