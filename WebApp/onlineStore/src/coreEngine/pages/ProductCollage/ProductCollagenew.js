import React, { Component } from 'react';
import ProductCollageView from '../../blocks/ProductCollage/ProductCollageView.js';
import SearchProductPage from '../../../sites/currentSite/pages/SearchProductPage.css';
import $ from 'jquery';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/collapse.js';

class ProductCollage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResult: [],
			data: [1, 2, 3, 4, 5, 6],
			price: { min: 10, max: 129999 },
			categoryDetails: [],
			masterproducts: [],
			products: [],
			categoryID: '',
			subcategoryID: '',
			activePage: 1,
			selectedbrands: [],
			minPrice: 0,
			maxPrice: 0,
			sizes: [],
			colors: [],
			color: '',
			size: '',
			selector: { categoryID: '', subcategoryID: '', brands: [], size: '', color: '', price: { min: 10, max: 129999 } }
		};
		this.handlePriceChange = this.handlePriceChange.bind(this);
	}

	componentDidMount() {


		$('div[data-toggle="collapse"]').click(function () {

			$(this).find('i').toggleClass('fa fa-minus fa fa-plus');

		});
		this.getCategoryDetails(this.props.match.params.categoryID);
		this.getProductsByCategory(this.props.match.params.categoryID);
		this.getBrands();
		this.getSize();
		this.getColor();
		this.getPriceLimits();
	}
	getCategoryDetails(categoryID) {
		axios.get("/api/category/get/one/" + categoryID)
			.then((response) => {
				this.setState({
					categoryDetails: response.data
				})

			})
			.catch((error) => {
				console.log('error', error);
			})
	}
	getPriceLimits() {
		axios.get("/api/products/get/minmaxprice")
			.then((response) => {


				/*this.setState({
					price: { min : Number(response.data.min),  max : Number(response.data.max)}
				});*/


			})
			.catch((error) => {
				console.log('error', error);
			})
	}
	getProductsByCategory(categoryID) {
		axios.get("/api/products/get/list/" + categoryID)
			.then((response) => {
				this.setState({
					products: response.data,
					masterproducts: response.data
				})


			})
			.catch((error) => {
				console.log('error', error);
			})
	}
	onSelectedItemsChange(filterType, selecteditems) {

		var checkboxes = document.getElementsByName('brands[]');
		var brands = [];
		for (var i = 0, n = checkboxes.length; i < n; i++) {
			if (checkboxes[i].checked) {
				brands.push(checkboxes[i].value);
			}
		}
		if (filterType == 'subcategory') {
			this.setState(
				{
					selector:
					{
						categoryID: this.props.match.params.categoryID,
						subcategoryID: $(selecteditems.target).data().id,
						brands: brands,
						size: this.state.selector.size,
						color: this.state.selector.color,
						price: this.state.selector.price
					}
				}, () => {
					this.getFilteredProducts(this.state.selector);
				}
			);
		}
		if (filterType == 'brands') {
			this.setState(
				{
					selector:
					{
						categoryID: this.props.match.params.categoryID,
						subcategoryID: this.state.selector.subcategoryID,
						brands: brands,
						size: this.state.selector.size,
						color: this.state.selector.color,
						price: this.state.selector.price
					}
				}, () => {
					this.getFilteredProducts(this.state.selector);
				});
		}
		if (filterType == 'price') {
			var minPrice = selecteditems.min;
			var maxPrice = selecteditems.max;
			this.setState({ price: { min: minPrice, max: maxPrice } }, () => { });
			this.setState(
				{
					selector:
					{
						categoryID: this.props.match.params.categoryID,
						subcategoryID: this.state.selector.subcategoryID,
						brands: brands,
						size: this.state.selector.size,
						color: this.state.selector.color,
						price: { min: minPrice, max: maxPrice }
					}
				}, () => {
					this.getFilteredProducts(this.state.selector);
				});
		}
		if (filterType == 'color') {
			this.setState(
				{
					selector:
					{
						categoryID: this.props.match.params.categoryID,
						subcategoryID: this.state.selector.subcategoryID,
						brands: brands,
						size: this.state.selector.size,
						color: $(selecteditems.currentTarget).find('.color-option').data('color'),
						price: this.state.selector.price
					}
				}, () => {
					this.getFilteredProducts(this.state.selector);
				});
		}
		if (filterType == 'size') {
			this.setState(
				{
					selector:
					{
						categoryID: this.props.match.params.categoryID,
						subcategoryID: this.state.selector.subcategoryID,
						brands: brands,
						size: $(selecteditems.currentTarget).val(),
						color: this.state.selector.color,
						price: this.state.selector.price
					}
				}, () => {
					this.getFilteredProducts(this.state.selector);
				});
		}

	}
	getFilteredProducts(selector) {
		// console.log(selector);
	}
	filterProducts(subcategoryID, selectedbrands, price, color, size) {
		if (subcategoryID != '') {

			var products = this.state.masterproducts.filter((array_el) => {
				return subcategoryID == array_el.subCategory_ID
					&& Number(array_el.discountedPrice) > Number(this.state.price.min)
					&& Number(array_el.discountedPrice) < Number(this.state.price.max);
			});
			this.setState({ products: products });
		}
		if (selectedbrands.length > 0 && subcategoryID != '') {
			var products = this.state.masterproducts.filter((array_el) => {
				return selectedbrands.filter((selectedItems_el) => {
					return selectedItems_el == array_el.brand
						&& subcategoryID == array_el.subCategory_ID
						&& Number(array_el.discountedPrice) > Number(this.state.price.min)
						&& Number(array_el.discountedPrice) < Number(this.state.price.max);
				}).length != 0
			});
			this.setState({ products: products })
		}
		if (subcategoryID == '') {

			var products = this.state.masterproducts.filter((array_el) => {
				return Number(array_el.discountedPrice) > Number(this.state.price.min)
					&& Number(array_el.discountedPrice) < Number(this.state.price.max);
			});
			this.setState({ products: products });
		}
		if (subcategoryID == '' && selectedbrands.length > 0) {
			var products = this.state.masterproducts.filter((array_el) => {
				return selectedbrands.filter((selectedItems_el) => {
					return selectedItems_el == array_el.brand
						&& Number(array_el.discountedPrice) > Number(this.state.price.min)
						&& Number(array_el.discountedPrice) < Number(this.state.price.max);
				}).length != 0
			});
			this.setState({ products: products });
		}
		else {

		}
	}
	getBrands() {
		axios.get("/api/products/get/listBrand/" + this.props.match.params.categoryID)

			.then((response) => {

				this.setState({
					brands: response.data
				})
			})
			.catch((error) => {
				console.log('error', error);
			})
	}
	getSize() {
		axios.get("/api/products/get/listSize/" + this.props.match.params.categoryID)

			.then((response) => {

				this.setState({
					sizes: response.data
				})
			})
			.catch((error) => {
				console.log('error', error);
			})
	}
	getColor() {
		axios.get("/api/products/get/listColor/" + this.props.match.params.categoryID)

			.then((response) => {
				this.setState({
					colors: response.data
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

		if (name == 'slider_min') {
			this.setState({
				price: { min: Number(target.value), max: Number(this.state.price.max) }
			}, () => {
				this.filterProducts(this.state.subcategoryID, this.state.selectedbrands, this.state.price);
			});
		}
		if (name == 'slider_max') {
			this.setState({
				price: { min: Number(this.state.price.min), max: Number(target.value) }
			}, () => {
				this.filterProducts(this.state.subcategoryID, this.state.selectedbrands, this.state.price);
			});
		}
	}

	render() {
		//console.log('pricemin,',this.state.price.min);
		//console.log('pricemax,',this.state.price.max);
		let minPrice = this.state.price.min;
		let maxPrice = this.state.price.max;
		return (
			<div className="container col-lg-12 col-md-12 col-sm-12 col-xs-12" id="containerDiv">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<ul className="links">
							<li><a href="/">Home /</a></li>
							<li><a href={"/product-collage/" + this.state.categoryDetails._id}>{this.state.categoryDetails && this.state.categoryDetails.category}</a></li>
						</ul>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">

						<div className="nb-brand">
							<div className="accordion" id="accordionExample">
								<div className="card-header" id="headingOne">
									<div className="pagefilter" data-toggle="collapse" data-target="#collapseOne" >
										<button className="btn btn-link" type="button" >
											CATEGORY
						        </button>
										<span className="expand"><i className="fa fa-plus"></i></span>
									</div>
								</div>

								<div id="collapseOne" className="collapse">
									<div className="card-body">
										{
											this.state.categoryDetails && this.state.categoryDetails.subCategory !== undefined ?
												this.state.categoryDetails.subCategory.map((data, index) => {

													return (
														<div>
															{
																data.subCategoryTitle >= 1 ?
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 categoriesContainerEcommerce" key={index} >
																		<div className="row">
																			<a href="#productDiv" className="subcategory" data-id={data._id} onClick={this.onSelectedItemsChange.bind(this, 'subcategory')} style={{ fontWeight: "100!important" }}>{data.subCategoryTitle}</a>

																		</div>
																		</div>
																		:
																		null
							
															}
													</div>
										);
					
														})
														:
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
																<h5>No data Found</h5>
															</div>
															}
						      </div>
						    </div>
						{
											this.state.categoryDetails && this.state.categoryDetails.webCategory == 'Main-Site' ?
												<div>
													<div className="card-header" id="headingTwo">
														<div className="pagefilter" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
															<button className="btn btn-link collapsed" type="button" >
																COLOR
						        </button>
															<span className="expand"><i className="fa fa-plus"></i></span>
														</div>
													</div>
													<div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
														<div className="card-body">
															{this.state.colors ?
																this.state.colors.map((data, index) => {
																	return (
																		index > 0 ?
																			<a href="" className="swatch-option-link-layered" onClick={this.onSelectedItemsChange.bind(this, "color")}>
																				<div className="color-option" data-color={data} style={{ backgroundColor: data }} option-tooltip-value={data} ></div>
																			</a>
																			:
																			null
																	);
																})

																: ''}


														</div>
													</div>
												</div> : ''
										}
										{
											this.state.categoryDetails && this.state.categoryDetails.webCategory == 'Main-Site' ?
												<div>
													<div className="card-header" id="headingTwo">
														<div className="pagefilter" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
															<button className="btn btn-link collapsed" type="button" >
																SIZE
						        </button>
															<span className="expand"><i className="fa fa-plus"></i></span>
														</div>
													</div>
													<div id="collapseFour" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
														<br />
														<div className="card-body">
															<select className="sortProducts" onChange={this.onSelectedItemsChange.bind(this, "size")}>
																{this.state.sizes ?
																	this.state.sizes.map((data, index) => {
																		return (<option value={data}>{data}</option>);
																	})

																	: ''}

															</select>
														</div>
													</div>
												</div> : ''
										}
										<div className="card-header" id="headingTwo">
											<div className="pagefilter" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
												<button className="btn btn-link collapsed" type="button">
													PRICE
						        </button>
												<span className="expand"><i className="fa fa-plus"></i></span>
											</div>
										</div>
										<div id="collapseThree" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
											<div className="card-body">
												<InputRange
													maxValue={129999}
													minValue={10}
													value={this.state.price}
													onChange={this.onSelectedItemsChange.bind(this, "price")} />
												<input className="input-field min-value" type="text" id="slider_min" name="slider_min" placeholder="From" value={this.state.price.min} onChange={this.handlePriceChange} /> &nbsp;
							        <input className="input-field max-value" type="text" id="slider_max" name="slider_max" placeholder="To" value={this.state.price.max} onChange={this.handlePriceChange} />
											</div>
										</div>
									</div>


								</div>
								<br />
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nb-brand">
									<div className="Featured-Brands-tittle">Featured Brands</div>

									{/*<ul className="Featured-Brands">
																
							<li className="Featured-Brands-li">
								<div className="Featured-Brands-li-div">
									<div className="Featured-Brands-li-div-div">
									<a className="imgs" href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/shopbybrand/index/view/id/1/">
									<img className="img_logo_brand" src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media///Shopbybrand//techservice.png" />
									</a>

									<a href="http://demo8.cmsmart.net/mag2_amazon_themeforest/france/shopbybrand/index/view/id/1/" className="name_brand"> iPhone</a>	
									</div>
								</div>	
							</li>
						</ul>*/}
									<br />
									{this.state.brands && this.state.brands.length > 0 ?
										this.state.brands.map((data, index) => {

											return (
												<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 " key={index}>
													<div>
														<div className="centreDetailContainerEcommerce col-lg-1 row">
															<input type="checkbox" name="brands[]" onChange={this.onSelectedItemsChange.bind(this, "brands")} value={data} />
															<span className="centreDetailCheckEcommerce"></span>
														</div>
														<span className="centreDetaillistItemEcommerce">{data}</span>
													</div>
												</div>
											);
										})
										: ''

									}

								</div>
							</div>
							<div className="col-lg-9 col-md-9 col-sm-9 col-xs-9" id="productDiv">

								<br />
								<div className="tab-content">
									<div id="products" className="tab-pane fade in active">

										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
											<ProductCollageView products={this.state.products} categoryDetails={this.state.categoryDetails} />
										</div>
									</div>
									<div id="categories" className="tab-pane fade">
										Categories
				    </div>

								</div>

							</div>
						</div>
					</div>
					)
			}
		}  	
export default ProductCollage;