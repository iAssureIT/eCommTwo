import * as React                                           from 'react';
import * as ReactDOM                                        from 'react-dom';
import $ 													from 'jquery';
import axios 												from 'axios';
import _ 													from 'underscore';
import VehicleDetails 										from './VehicleDetails.jsx';
import swal                   								from 'sweetalert';
import { CheckBoxSelection, Inject, MultiSelectComponent } 	from '@syncfusion/ej2-react-dropdowns';

import 'bootstrap/js/tab.js';
import '../css/ListOfVehicles.css';
import '../css/ListOfEntityFilter.css';
import '../css/ListOfAllEntity.css';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";


export default class ListOfVehicles extends React.Component <{}, {}>{
	
	constructor(props) {
		super(props);

		this.state = {
			initial: 'All',
			lenghtCount: '',
			vehicleList: [],
			masterVendor: [],
			selector:{},
			"Dummyimg1":"/images/Dummyimg1.jpg",
			"pathname": window.location.pathname.split('/')[1],
			selectAll : true
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.ShowForm     = this.ShowForm.bind(this);
		this.camelCase    = this.camelCase.bind(this);
		

	}

	handleChange(event) {
		const target = event.target;
		const name = target.name;

		this.setState({
			[name]: event.target.value
		});
	}

	componentDidMount() {
		var Dummyimg=this.state.Dummyimg1;
		console.log("Dummyimg",Dummyimg);
		this.getVehicles();
		this.getCategories();
		this.getBrands();
		this.getModels();
		this.getFuelTypes();

	}
	
	camelCase(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	getVehicles() {
		axios.get("/api/vehiclemaster/get/count")
			.then((response) => {
				this.setState({
					vehicleCount   : response.data.count
				})
			})
			.catch((error) => {
			})
		axios.get("/api/vehiclemaster/get/list")
			.then((response) => {
				this.setState({
					vehicleList   : response.data
				})
				$('.selected').removeClass('selectedSupplier');
				document.getElementById(response.data[0]._id).classList.add("selectedSupplier")
				this.setState({ id: response.data[0]._id, showDetails : true });
			})
			.catch((error) => {
			})
	}
	getCategories() {
    axios.get('/api/categorymaster/get/list')
        .then((response) => {

            var categoriesArray = [];
            response.data.map((data, ind) => {
                categoriesArray.push({ id: data._id, category: data.category })
            });

            this.setState({ categoriesArray: categoriesArray })

        })
        .catch((error) => {
            console.log('error', error);
        })
    }
	getBrands() {
        axios.get('/api/brandmaster/get/list')
            .then((response) => {

                var brandsArray = [];
                response.data.map((data, ind) => {
                    brandsArray.push({ id: data._id, brand: data.brand })
                });
                this.setState({ brandsArray: brandsArray })

            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    
    getModels() {
        axios.get('/api/modelmaster/get/list')
            .then((response) => {

                var modelsArray = [];
                response.data.map((data, ind) => {
                    modelsArray.push({ id: data._id, model: data.model })
                });
                this.setState({ modelsArray: modelsArray })

            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    
    getFuelTypes() {
    axios.get('/api/fueltypemaster/get/list')
        .then((response) => {

            var fuelTypesArray = [];
            response.data.map((data, ind) => {
                fuelTypesArray.push({ id: data._id, fuelType: data.fuelType })
            });
            this.setState({ fuelTypesArray: fuelTypesArray })
        })
        .catch((error) => {
            console.log('error', error);
        })
    }
	ShowForm(event) {
		var data = $(event.currentTarget).attr('id');
		this.setState({ id: data , showDetails : true });

		$('.selected').removeClass('selectedSupplier');
		$(event.currentTarget).addClass('selectedSupplier');
	}

	hideForm(){
		this.setState({ showDetails : false });
	}
	
	searchVehicle(event) {
		

		this.dropDownListObject.value = null;
		this.dropDownBrandListObject.value = null;
		this.dropDownModelListObject.value = null;
		this.dropDownFuelTypeListObject.value = null;
		
		this.setState({
			'selector' : {},
			'initial': 'All',
			 showDetails : false 
		})

		axios.get("/api/vehiclemaster/search/"+event.target.value+"/All")
			.then((response) => {
				this.setState({
					vehicleList   : response.data
				})
			})
			.catch((error) => {
			})
		// this.setState({ 'searchByName': event.target.value });
		// var pattern = new RegExp('^' + event.target.value, 'i');
		// var searchedData = this.state.masterVendor.filter((vendor) => {

		// 	return pattern.test(vendor.companyName);
		// });

		// this.setState({ vehicleList: searchedData });
	}
	resetFilter(event) {
		event.preventDefault();
		this.dropDownListObject.value = null;
		this.dropDownBrandListObject.value = null;
		this.dropDownModelListObject.value = null;
		this.dropDownFuelTypeListObject.value = null;

		$('.searchVehicle').val('');
		
		this.setState({
			'selector' : {},
			'initial': 'All',
			showDetails : false
		})
		this.getVehicles()
		
	}
	handleChangeFilter(event){
		if (event.value) {
	        var currentSelection = event.element.getAttribute("id");
	        var selector = this.state.selector;

	        // if (event.itemData.category) {
	        // 	var categoryIds = []
	        //     selector.categoryIds = event.value;
	        // }
	        if (currentSelection === 'categoryChange') {
	            selector.categoryIds = event.value;
	        }
	        if (currentSelection === 'brandChange') {
	            selector.brandIds = event.value;
	        }
	        if (currentSelection === 'modelChange') {
	            selector.modelIds = event.value;
	        }
	        if (currentSelection === 'fueltypeChange') {
	            selector.fueltypeIds = event.value;
	        }
	        // selector.startRange = this.state.startRange
	        // selector.limitRange = this.state.limitRange

	        this.setState({ selector: selector, showDetails : false },()=>{
	        	this.getFilteredProducts(this.state.selector)
	        })
		}
    }
	getFilteredProducts(selector){
		
		axios.post("/api/vehiclemaster/post/list/filterVehicles", selector)
			.then((response) => {
				this.setState({
					vehicleList   : response.data
				})
			})
			.catch((error) => {
			})
	}
	editBasicform(event){
    	this.props.history.push('/vehicle-master/'+event.currentTarget.getAttribute('data-id'))
    }
    redirectTo(event)
    {
    	this.props.history.push("/vehicle-master")
    }
    
	render() {
		
		const categoriesfields: object = { text: 'category', value: 'id' };
		const brandsfields: object = { text: 'brand', value: 'id' };
		const modelsfields: object = { text: 'model', value: 'id' };
		const fueltypesfields: object = { text: 'fuelType', value: 'id' };
		
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
						<section className="content">
							<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
								

								<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
									<h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11">Vehicle List</h4>
									<div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 pull-right">
										<span className="col-lg-6 col-lg-offset-5 sentanceCase addButtonList" onClick={this.redirectTo.bind(this)}><i  className="fa fa-plus-circle"></i>&nbsp;&nbsp;Add Vehicle 
										</span>
									</div>
								</div>
							
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12"><i class="fa fa-filter"></i>&nbsp;&nbsp;<b> Select Filter</b></h5>
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12 nopadding">Total Records :&nbsp;&nbsp;<b>{this.state.vehicleCount}</b></h5>
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12 nopadding">Filtered :&nbsp;&nbsp;<b>{this.state.vehicleList.length}</b></h5>
										<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 pull-right inLOE" >
											<span className="blocking-span" >
												<input type="text" name="search" className="col-lg-8 col-md-8 col-sm-8 col-xs-12 Searchusers searchEntity inputTextSearch outlinebox pull-right texttrans"
													placeholder="Search..." onInput={this.searchVehicle.bind(this)} />
											</span>
										</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderBottomSO">
	                            </div>

								<div className="contenta col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls nopadding">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
											<button type="button" className="reset" onClick={this.resetFilter.bind(this)}>RESET FILTER</button>
										</div>										
									
									</div>

									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<br/>
										<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Category</label>
											<MultiSelectComponent id="categoryChange" ref={(scope) => { this.dropDownListObject = scope; }} 
												dataSource={this.state.categoriesArray}
                                                change={this.handleChangeFilter.bind(this)} mode='mode' 
                                                fields={categoriesfields} placeholder="Select Category" mode="CheckBox" 
                                                selectAllText="Select All" unSelectAllText="Unselect All" 
                                                showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
										<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Brand</label>
											<MultiSelectComponent id="brandChange" ref={(scope) => { this.dropDownBrandListObject = scope; }}  dataSource={this.state.brandsArray}
                                                change={this.handleChangeFilter.bind(this)}
                                                fields={brandsfields} placeholder="Select Brand" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
										<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Model</label>
											<MultiSelectComponent id="modelChange" ref={(scope) => { this.dropDownModelListObject = scope; }} dataSource={this.state.modelsArray}
                                                change={this.handleChangeFilter.bind(this)}
                                                fields={modelsfields} placeholder="Select Model" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
										<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Fuel Type</label>
											<MultiSelectComponent id="fueltypeChange" ref={(scope) => { this.dropDownFuelTypeListObject = scope; }} dataSource={this.state.fuelTypesArray}
                                                change={this.handleChangeFilter.bind(this)}
                                                fields={fueltypesfields} placeholder="Select Fuel Type" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
									</div>

									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
									<br/></div>
								</div>
								{this.state.vehicleList && this.state.vehicleList.length > 0 ?
									<div className="col-lg-6 col-md-12 col-sm-6 col-xs-6" id="style-2">
										<div className="borderlist12">
											{

												this.state.vehicleList.map((data, index) => {
													return (
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  borderlist selected" key={index} onClick={this.ShowForm.bind(this)} name={index} data-child={data._id + '-' + index} id={data._id}>
															<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 supplierLogoDiv">
															  {this.state.vehicleList.length>0 ?
																<img src={data.vehicleImage[0]} className="supplierLogoImage1"></img>
																 :
																 <img src="/images/Dummyimg1.jpg" className="supplierLogoImage11"></img> 
																}
															</div>
															<div className="col-lg-8 col-md-8 col-sm-10 col-xs-10 listprofile1">
																<h5 className="titleprofile">{data.vehicleNumber}</h5>
															
																<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9">
																	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																		<label>Brand</label> <br/>
																		{data.brand}
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																		<label>Model</label> <br/>
																		{data.model}
																	</div>
																	
																</div>
															</div>
															<div className="col-lg-2 noRightPadding">
																<div className="addedDiv1 col-lg-10 col-lg-offset-2 ">
																	<img src="/images/leftArrow.png"/>
																</div>
															</div>
													</div>
													);
												})
											}
										</div>
									</div>
									:
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
										<h5>No Data Found</h5>
									</div>
								}
								{ this.state.showDetails ?
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pdcls suppliersOneProfile commonSup nopadding" id={this.state.id}>
										<div id={this.state.id} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
											<VehicleDetails name={this.state.index} id={this.state.id} 
											getVehicles={this.getVehicles.bind(this)}
											hideForm={this.hideForm.bind(this)}/>
										</div>
									</div>
									:
									null
								}
							</div>
						</section>
					</div>
				</div>
			</div>
		);
	}

};