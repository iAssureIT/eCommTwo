import React, { Component } from 'react';
import $ 					from 'jquery';
import axios 				from 'axios';
import _ 					from 'underscore';
import PersonDetails 		from './PersonDetails.js';
import swal                 from 'sweetalert';
import 'bootstrap/js/tab.js';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';


class PersonList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			supplierListOne: '',
			supplierarrayS: '',
			id: '',
			country: '-',
			states: '-',
			city: '-',
			designation: '-',
			initial: 'All',
			lenghtCount: '',
			searchByName: '',
			personList: [],
			statesArray: [],
			masterVendor: [],
			selector:{},
			stateCode : "Select State",
			district  : "Select District",
			"pathname": window.location.pathname.split('/')[1],
			type : window.location.pathname.split('/')[1]
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.ShowForm = this.ShowForm.bind(this);
		this.camelCase = this.camelCase.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const name = target.name;

		this.setState({
			[name]: event.target.value
		});
	}

	componentDidMount() {
		this.getpersons();
		this.getStates('IN');
		this.getDesignation();
		this.getDepartment();

	}
	componentWillReceiveProps(nextProps,prevProps) {
	}

	getDesignation() {
		axios.get("/api/designationmaster/get/list")
			.then((response) => {
				var designationArray = [];
	            response.data.map((data, ind) => {
	                designationArray.push({ id: data._id, designation: data.designation })
	            });

	            this.setState({ designationArray: designationArray })
			})
			.catch((error) => {
			})
	}
	getDepartment() {
		axios.get("/api/departmentmaster/get/list")
			.then((response) => {
				var departmentArray = [];
	            response.data.map((data, ind) => {
	                departmentArray.push({ id: data._id, department: data.department })
	            });

	            this.setState({ departmentArray: departmentArray })
			})
			.catch((error) => {
			})
	}
	getStates(StateCode) {
		axios.get("http://locations2.iassureit.com/api/states/get/list/" + StateCode)
			.then((response) => {

				this.setState({
					stateCode 	: "Select State",
					statesArray	: response.data
				})

			})
			.catch((error) => {
			})
	}
	handleChangeState(stateCode) {
		
		this.getDistrict(stateCode, 'IN');
	}
	getDistrict(stateCode, countryCode) {
		axios.get("http://locations2.iassureit.com/api/districts/get/list/" + countryCode + "/" + stateCode)
			.then((response) => {
				this.setState({
					district 		: "Select District",
					districtArray 	: response.data
				})
			})
			.catch((error) => {
			})
	}
	
	camelCase(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	getpersons() {
		axios.get("/api/personmaster/get/count/"+this.state.type)
			.then((response) => {
				this.setState({
					personCount   : response.data.count
				})

			})
			.catch((error) => {
			})
		
		var formvalues = { type : this.state.type}
		axios.post("/api/personmaster/get/list",formvalues)
		.then((response) => {
			this.setState({
				personList   : response.data,
				showDetails	 : true
			})
			document.getElementById(response.data[0]._id).classList.add("selectedSupplier")
				this.setState({ id: response.data[0]._id, showDetails : true });
			
			

		})
		.catch((error) => {
		})
	}

	handleChangeFilter(event){
		if (event.value) {
	        var currentSelection = event.element.getAttribute("id");
	        var selector = this.state.selector;
	        selector.type = this.state.type;

	        if (currentSelection === 'designationChange') {
	            selector.designations = event.value;
	        }
	        if (currentSelection === 'departmentChange') {
	            selector.departments = event.value;
	        }
	        
	        // selector.startRange = this.state.startRange
	        // selector.limitRange = this.state.limitRange

	        this.setState({	selector: selector },()=>{
				this.getFilteredProducts(this.state.selector);
			})
	        
		}
    }


	ShowForm(event) {
		var data = $(event.currentTarget).attr('id');
		this.setState({ id: data });

		$('.commonSup').show()
		$('.selected').removeClass('selectedSupplier');
		$(event.currentTarget).addClass('selectedSupplier');

	}

	shortByAlpha(event) {
		event.preventDefault();

		for (var key in document.querySelectorAll('.alphab')) {
			$($('.alphab')[key]).css('background', '#ddd');
			$($('.alphab')[key]).css('color', '#000');
		}

		event.target.style.background = '#0275ce';
		event.target.style.color = '#fff';

		var selector=this.state.selector;
		if ($(event.target).attr('value') === 'All') {
			delete selector.initial;
			this.setState({	selector: selector},()=>{
				this.getFilteredProducts(this.state.selector);
			})
		} else {
			selector.initial = event.currentTarget.value; 
			this.setState({	selector: selector },()=>{
				this.getFilteredProducts(this.state.selector);
			})
		}
		$('.commonSup').hide();
	}

	searchPerson(event) {
		 
		for (var key in document.querySelectorAll('.alphab')) {
			$($('.alphab')[key]).css('background', '#ddd');
			$($('.alphab')[key]).css('color', '#000');
		}
 
		document.getElementById("filterallalphab").style.background = '#000';
		document.getElementById("filterallalphab").style.color = '#fff';
		
		this.dropDownListObject.value = null;
		this.dropDownDepartmentListObject.value = null;

		this.setState({
			'selector' : {},
			'initial': 'All',
		})

		axios.get("/api/personmaster/search/"+this.state.type+"/"+event.target.value)
			.then((response) => {
				this.setState({
					personList   : response.data
				})
			})
			.catch((error) => {
			})
	}
	resetFilter(event) {
		event.preventDefault();
		$('.designation').prop('selectedIndex', 0);
		$('.Statesdata').prop('selectedIndex', 0);
		$('.districtsdata').prop('selectedIndex', 0);
		$('.searchPerson').val('');
		this.setState({
			'stateCode': 'Select State',
			'district' : 'Select District',
			'selector' : {},
			'initial': 'All',
		})

		for (var key in document.querySelectorAll('.alphab')) {
			$($('.alphab')[key]).css('background', '#ddd');
			$($('.alphab')[key]).css('color', '#000');
		}
		document.getElementById("filterallalphab").style.background = '#000';
		document.getElementById("filterallalphab").style.color = '#fff';

		this.getpersons();
	}
	onSelectedItemsChange(filterType, selecteditems){
		var selector=this.state.selector;
		this.setState({
	      [selecteditems.currentTarget.getAttribute('name')]: selecteditems.currentTarget.value
	    });
		if (filterType === 'state') {
			this.handleChangeState(selecteditems.currentTarget.value);
			delete selector.district
			selector.stateCode = selecteditems.currentTarget.value; 
		}
		if(filterType === 'district'){
			selector.district  = selecteditems.currentTarget.value; 
		}
		this.setState({	selector: selector },()=>{
			this.getFilteredProducts(this.state.selector);
		})
	}
	getFilteredProducts(selector){ 
		
		selector.type = this.state.type;

		axios.post("/api/personmaster/get/filterPersons", selector)
			.then((response) => {
				this.setState({
					personList   : response.data
				})
			})
			.catch((error) => {
			})
	}
	editBasicform(event){
    	this.props.history.push("/"+this.state.type+'/basic-details/'+event.currentTarget.getAttribute('data-id'))
    }
    deleteVendor(event){
    	event.preventDefault();
    	axios.delete("/api/entitymaster/delete/"+event.currentTarget.getAttribute('data-id'))
            .then((response)=>{
              swal({
                    title : response.data.message,
                  });
              window.location.reload();   
            })
            .catch((error)=>{
            })
    }
    hideForm(){
		this.setState({ showDetails : false });
	}
	redirectTo(event)
    {
    	this.props.history.push("/"+this.state.pathname+"/master")
    }
	render() {
		const designationfields: object = { text: 'designation', value: 'designation' };
		const departmentfields: object = { text: 'department', value: 'department' };
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
						<section className="content">
							<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
							
								<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
									<h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11">{this.state.pathname ? this.state.pathname : "Person"} List</h4>
									<div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 pull-right">
										<span className="col-lg-6 col-lg-offset-5 sentanceCase addButtonList" onClick={this.redirectTo.bind(this)}><i  className="fa fa-plus-circle"></i>&nbsp;&nbsp;{"Add "+this.state.pathname} 
										</span>
									</div>
								</div>
								
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12"><i class="fa fa-filter"></i>&nbsp;&nbsp;<b> Select Filter</b></h5>
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12 nopadding">Total Records :&nbsp;&nbsp;<b>{this.state.personCount}</b></h5>
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12 nopadding">Filtered :&nbsp;&nbsp;<b>{this.state.personList.length}</b></h5>
										<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 pull-right inLOE" >
											<span className="blocking-span" >
												<input type="text" name="search" className="col-lg-8 col-md-8 col-sm-8 col-xs-12 Searchusers searchEntity inputTextSearch outlinebox pull-right texttrans"
													placeholder="Search..." onInput={this.searchPerson.bind(this)} />
											</span>
										</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderBottomSO">
	                            </div>

								<div className="contenta col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls nopadding">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 nopadding">
											<button type="button" className="reset" onClick={this.resetFilter.bind(this)}>RESET FILTER</button>
										</div>
										{
										/*<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
											<select className="form-control resetinp selheight Statesdata" ref="states" name="stateCode" value={this.state.stateCode} 
											onChange={this.onSelectedItemsChange.bind(this,'state')}>
												<option selected={true} disabled>Select State</option>
												{this.state.statesArray.length>0 &&
													this.state.statesArray.map((Statedata, index) => {
														return (
															<option key={index} value={Statedata.stateCode}>{this.camelCase(Statedata.stateName)}</option>
														);
													}
													)
												}
											</select>
										</div>
										<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
											<select className="form-control resetinp districtsdata" ref="district" name="district" value={this.state.district}
											onChange={this.onSelectedItemsChange.bind(this,'district')}>
												<option selected={true} disabled>Select District</option>
												{this.state.districtArray && this.state.districtArray.length > 0 &&
													this.state.districtArray.map((districtdata, index) => {
														return (
															<option key={index} value={districtdata.districtName}>{this.camelCase(districtdata.districtName)}</option>
														);
													}
													)
												}
											</select>
										</div> */}
									
									</div>
									{
										this.state.type === "employee" ?  
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<br/>
											
											<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
												<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Department</label>
												<MultiSelectComponent id="departmentChange" ref={(scope) => { this.dropDownDepartmentListObject = scope; }}  dataSource={this.state.departmentArray}
	                                                change={this.handleChangeFilter.bind(this)}
	                                                fields={departmentfields} placeholder="Select Department" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
	                                                <Inject services={[CheckBoxSelection]} />
	                                            </MultiSelectComponent>
											</div>
											<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
												<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Designation</label>
												<MultiSelectComponent id="designationChange" ref={(scope) => { this.dropDownListObject = scope; }} 
													dataSource={this.state.designationArray}
	                                                change={this.handleChangeFilter.bind(this)} mode='mode' 
	                                                fields={designationfields} placeholder="Select Designation" mode="CheckBox" 
	                                                selectAllText="Select All" unSelectAllText="Unselect All" 
	                                                showSelectAll={true}>
	                                                <Inject services={[CheckBoxSelection]} />
	                                            </MultiSelectComponent>
											</div>
										</div> : null
									}
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
									<br/>
											<button type="button" className="btn alphab"  id="filterallalphab" onClick={this.shortByAlpha.bind(this)} name="initial" value={this.state.initial} onChange={this.handleChange}>All</button>
											<button type="button" className="btn alphab" value="A" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>A</button>
											<button type="button" className="btn alphab" value="B" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>B</button>
											<button type="button" className="btn alphab" value="C" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>C</button>
											<button type="button" className="btn alphab" value="D" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>D</button>
											<button type="button" className="btn alphab" value="E" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>E</button>
											<button type="button" className="btn alphab" value="F" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>F</button>
											<button type="button" className="btn alphab" value="G" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>G</button>
											<button type="button" className="btn alphab" value="H" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>H</button>
											<button type="button" className="btn alphab" value="I" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>I</button>
											<button type="button" className="btn alphab" value="J" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>J</button>
											<button type="button" className="btn alphab" value="K" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>K</button>
											<button type="button" className="btn alphab" value="L" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>L</button>
											<button type="button" className="btn alphab" value="M" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>M</button>
											<button type="button" className="btn alphab" value="N" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>N</button>
											<button type="button" className="btn alphab" value="O" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>O</button>
											<button type="button" className="btn alphab" value="P" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>P</button>
											<button type="button" className="btn alphab" value="Q" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>Q</button>
											<button type="button" className="btn alphab" value="R" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>R</button>
											<button type="button" className="btn alphab" value="S" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>S</button>
											<button type="button" className="btn alphab" value="T" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>T</button>
											<button type="button" className="btn alphab" value="U" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>U</button>
											<button type="button" className="btn alphab" value="V" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>V</button>
											<button type="button" className="btn alphab" value="W" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>W</button>
											<button type="button" className="btn alphab" value="X" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>X</button>
											<button type="button" className="btn alphab" value="Y" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>Y</button>
											<button type="button" className="btn alphab" value="Z" onClick={this.shortByAlpha.bind(this)} onChange={this.handleChange}>Z</button>
									</div>
								</div>
								{this.state.personList && this.state.personList.length > 0 ?
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 scrollbar" id="style-2">
										<div className="borderlist12">
											{
												this.state.personList.map((data, index) => {
													
													return (
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderlist selected" key={index} onClick={this.ShowForm.bind(this)} name={index} data-child={data._id + '-' + index} id={data._id}>
															<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 supplierLogoDiv">
																<img src={data.profilePhoto? data.profilePhoto[0]:""} className="supplierLogoImage"></img>
															</div>
															<div className="col-lg-8 col-md-10 col-sm-10 col-xs-10 listprofile">
																<h5 className="titleprofile">{data.firstName +" "+ data.lastName}</h5>
															
																<ul className="col-lg-9 col-md-9 col-sm-9 col-xs-9 listfont">
																	<li><i className="fa fa-user-o " aria-hidden="true"></i>&nbsp;{data.type ? this.camelCase(data.type): ""}</li>
																	<li><i className="fa fa-phone " aria-hidden="true"></i>&nbsp;{data.contactNo}</li>
																	<li><i className="fa fa-envelope " aria-hidden="true"></i>&nbsp;{data.email}</li>
																</ul>
															</div>
															<div className="col-lg-2 noRightPadding">
																<div className="addedDivPM col-lg-10 col-lg-offset-2 ">
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
								{this.state.showDetails ?
									<div>
									{
									 this.state.id && this.state.personList && this.state.personList.length > 0 ?
										<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pdcls suppliersOneProfile commonSup" id={this.state.id}>
											<div id={this.state.id} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
												<PersonDetails name={this.state.index} id={this.state.id} getPersons={this.getpersons.bind(this)} hideForm={this.hideForm.bind(this)} type={this.state.type}/>
											
											</div>
										</div>
										:
										null
									}
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
}
export default PersonList;