import React, { Component } from 'react';
import SearchProductCollage from '../../blocks/ProductCollage/SearchProductCollage.js';
// import SearchProductPage  			from  './SearchProductPage.css';
import $ from 'jquery';
// import InputRange 					from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from "../../common/loader/Loader.js";
import _ from "underscore";

class SearchProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResult: [],
			data: [1, 2, 3, 4, 5, 6],
			masterproducts: [],
			products: [],
			categoryID: '',
			subcategoryID: '',
			activePage: 1,
			selectedbrands: [],
			searchCriteria: [],
			categoryDetails: []
		};
		this.handlePriceChange = this.handlePriceChange.bind(this);
	}

	componentDidMount() {		
		$('div[data-toggle="collapse"]').click(function () {
			$(this).find('i').toggleClass('fa fa-minus fa fa-plus');
		});
		this.setState({
			products: this.props.searchResult,
			masterproducts: this.props.searchResult,
			searchCriteria: this.props.searchCriteria,
			categoryDetails: this.props.categoryDetails
		}, () => { });
		this.getWishData();
		this.getCategories();
	}
	componentWillReceiveProps(nextProps) {

		this.setState({
			products: nextProps.searchResult,
			masterproducts: nextProps.searchResult,
			searchCriteria: nextProps.searchCriteria,
			categoryDetails: nextProps.categoryDetails

		}, () => {
			var catArray = [];

			if (nextProps.searchCriteria.catArray) {

				nextProps.searchCriteria.catArray.map((data, index) => {

					catArray.push(data.id)
				})
				this.getBrands(catArray);
			} else {
				nextProps.searchResult.map((data, index) => {
					console.log('data', data);
					catArray.push(data.category_ID)
				})
				this.getBrands(catArray);
			}



		})
	}
	getCategories(){
		axios.get("/api/category/get/list")
		.then((response)=>{
		  console.log("All Category response:",response.data);
		  this.setState({
			allCategoryDetails : response.data
		  })
		})
		.catch((error)=>{
		  // console.log('error', error);
		})
	  }
	  handleToggle(event) {
		var currentIcon = $('.' + event.target.getAttribute('data-key') + "Icon").attr('class');
		if (currentIcon === "fa fa-plus-circle " + event.target.getAttribute('data-key') + "Icon") {
			this.setState({ ['toggleIcon' + event.target.getAttribute('data-key')]: "fa fa-minus-circle " + event.target.getAttribute('data-key') + "Icon" }, () => { })
		} else {
			this.setState({ ['toggleIcon' + event.target.getAttribute('data-key')]: "fa fa-plus-circle " + event.target.getAttribute('data-key') + "Icon" }, () => { })
		}
	}
	getWishData() {
		var user_ID = localStorage.getItem('user_ID');
		axios.get('/api/wishlist/get/userwishlist/' + user_ID)
			.then((response) => {
				this.setState({
					wishList: response.data
				}, () => {
				})
			})
			.catch((error) => {
				console.log('error', error);
			})
	}
	onSelectedItemsChange(filterType, selecteditems) {

		if (filterType === 'brands') {
			var checkboxes = document.getElementsByName('brands[]');
			var brands = [];
			for (var i = 0, n = checkboxes.length; i < n; i++) {
				if (checkboxes[i].checked) {
					brands.push(checkboxes[i].value);
				}
			}
			this.setState({ selectedbrands: brands }, () => {
				this.filterProducts(this.state.subcategoryID, this.state.selectedbrands, this.state.price);
			});
		}

	}
	filterProducts(subcategoryID, selectedbrands, price) {

		if (selectedbrands.length > 0) {
			var products = this.state.masterproducts.filter((array_el) => {
				return selectedbrands.filter((selectedItems_el) => {
					return selectedItems_el === array_el.brand
				}).length !== 0
			});
			this.setState({ products: products })
		}

		else {
			this.setState({ products: this.state.masterproducts })
		}
	}
	getBrands(categories) {
		var formValues = {
			categories: categories
		}

		axios.post("/api/products/get/listBrandByCategories", formValues)

			.then((response) => {
				this.setState({
					brands: response.data
				})
			})
			.catch((error) => {
				console.log('error', error);
			})
	}

	handlePriceChange(event) {
		event.preventDefault();
		const target = event.target;
		const name = target.name;

		if (name === 'slider_min') {
			this.setState({
				price: { min: Number(target.value), max: Number(this.state.price.max) }
			});
		}
		if (name === 'slider_max') {
			this.setState({
				price: { min: Number(this.state.price.min), max: Number(target.value) }
			});
		}
	}

	clearAll(event) {
		this.props.clearAllinput(
			{
				"searchstr": "",
				"catArray": []
			}, []);
	}
	render() {
		var breadcrumb = _.unique(this.props.searchResult, "category_ID");

		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb25" id="containerDiv">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<ul className="links">
							<li><a href="/">Home /</a></li>
							{
								this.props.searchCriteria && this.props.searchCriteria.catArray
									?
									this.props.searchCriteria.catArray.map((data, index) => {
										return (<li><a href={"/category/" + data.category + "/" + data.section_ID + "/" + data.id}>{data.category} / </a></li>);
									})
									:
									breadcrumb.map((data, index) => {
										return (<li><a href={"/category/" + data.category + "/" + data.section_ID + "/" + data.category_ID}>{data.category} / </a></li>);
									})
							}


						</ul>
					</div>
					{/* for lg and md */}
					{Array.isArray(this.state.allCategoryDetails) && this.state.allCategoryDetails.length > 0 ?
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 filterWrapper">	
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">								
							<div className="nb-brand filterInner col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
								<div className="accordion" id="accordionExample">
									<div className="card-header" id="headingOne">
										<div className="pagefilter collapsed" data-toggle="collapse" data-target="#collapseOne" data-key="category" onClick={this.handleToggle.bind(this)}>
										{/* <div className="pagefilter" data-toggle="collapse" data-target="#collapseOne" data-key="category" > */}
											<button className="btn btn-link" type="button" data-key="category"   >
												CATEGORY
											</button>
											<span className="expand"><i className={this.state["toggleIconcategory"] ? this.state["toggleIconcategory"] : "fa fa-plus-circle categoryIcon"} data-key="category"></i></span>
										</div> 
									</div>
									<div id="collapseOne" className="collapse in">
										<div className="card-body">
											{
												this.state.allCategoryDetails.length ?
													this.state.allCategoryDetails.map((data, index) => {
														// console.log("data in collapse==>",data)
														return (
															<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce" key={index} >
																<li>
																	<a href={"/category"+"/"+data.categoryUrl+"/"+data.section_ID+"/"+data._id} className="subcategory" data-id={data._id} onClick={this.onSelectedItemsChange.bind(this, 'category')} style={{ fontWeight: "600!important" }}>{data.category.toUpperCase()}</a>
																	{/* <a href="" className="subcategory" data-id={data._id} onClick={this.onSelectedItemsChange.bind(this, 'category')} style={{ fontWeight: "100!important" }}>{data.category}</a> */}
																	<ul>
																		{
																			data.subCategory && data.subCategory.map((subcat, subind) => {
																				return (
																					<li>
																						<a href={"/category"+"/"+subcat.subCategoryTitle+"/"+data.section_ID+"/"+data._id} className="subcategory" data-id={subcat._id} onClick={this.onSelectedItemsChange.bind(this, 'subcategory')} style={{ fontWeight: "100!important" }}>{subcat.subCategoryTitle}</a>
																					</li>
																				);
																			})
																		}

																	</ul>
																</li> 
															</div>
														);
													})
													:
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
														<li>No data Found</li>
													</div>
											}
										</div>
									</div>
								</div>
								</div>
								</div>
							</div>
						:
						null
					}

					 <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 hidden-xs">
						
					</div> 
					<div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
						<div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
							<div id="products" className="col-lg-12 col-md-12 col-sm-12 tab-pane fade in active">

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">

									{
										this.props.searchCriteria.loading === undefined || this.props.searchCriteria.loading ?
											// <Loader type="collageloader" productLoaderNo={3} />
											
											<div className="alert alert-warning textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
												<i className="fa fa-exclamation-triangle"></i>&nbsp;   There is no items found.
											</div>
											:
											<SearchProductCollage products={this.state.products}
												loading={this.props.searchCriteria.loading}
												getWishData={this.getWishData.bind(this)}
												wishList={this.state.wishList}
											/>
									}
								</div>
							</div>
							<div id="categories" className="tab-pane fade">
								<ul>
									{
										this.state.categoryDetails && this.state.categoryDetails[0] && this.state.categoryDetails.map((data, index) => {
											return (
												<li key={index}><a href={"/product-collage/" + data._id}>{data.category}</a>
												</li>
											);
										})
									}
								</ul>
							</div>

						</div>

					</div>
				</div>
			</div>
		)
	}
}
const mapDispachToProps = (dispach) => {
	return {
		clearAllinput: (searchCriteria, searchResult) => dispach({
			type: 'SEARCH_PRODUCT',
			searchCriteria: searchCriteria,
			searchResult: searchResult
		}),
	}
}
const mapStateToProps = (state) => {
	return {
		cartCount: state.cartCount,
		wishlistCount: state.wishlistCount,
		searchResult: state.searchResult,
		searchCriteria: state.searchCriteria,
		categoryDetails: state.categoryDetails
	}
}
export default connect(mapStateToProps)(withRouter(SearchProduct));