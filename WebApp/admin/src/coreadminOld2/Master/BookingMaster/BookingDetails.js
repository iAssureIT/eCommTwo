import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import _                    from 'underscore';
import SingleEmployeeDetails        from './components/SingleEmployeeDetails.js';
import swal                 from 'sweetalert';
import 'bootstrap/js/tab.js';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

class BookingDetils extends Component {
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
        // console.log("nextProps",nextProps)
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
                    stateCode   : "Select State",
                    statesArray : response.data
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
                    district        : "Select District",
                    districtArray   : response.data
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
            var formvalues = { type : "driver"}
        axios.post("/api/personmaster/get/list",formvalues)
            .then((response) => {
                this.setState({
                    personList   : response.data
                })
                document.getElementById(response.data[0]._id).classList.add("selectedEmployee")
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

            this.setState({ selector: selector },()=>{
                this.getFilteredProducts(this.state.selector);
            })
            
        }
    }


    ShowForm(event) {
        var data = $(event.currentTarget).attr('id');
        this.setState({ id: data });

        $('.commonSup').show()
        $('.selected').removeClass('selectedEmployee');
        $(event.currentTarget).addClass('selectedEmployee');

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
            this.setState({ selector: selector },()=>{
                this.getFilteredProducts(this.state.selector);
            })
            
        } else {
            
            
            selector.initial = event.currentTarget.value; 

            this.setState({ selector: selector },()=>{
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
        this.setState({ selector: selector },()=>{
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
    render() {
        const designationfields: object = { text: 'designation', value: 'designation' };
        const departmentfields: object = { text: 'department', value: 'department' };
        console.log("personList",this.state.personList);
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right"><span className="pull-right">Booking Receipt</span></h4>
                                </div>
                              {/*  <div className="contenta col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls nopadding">
                                   
                                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 pull-right" >
                                        <span className="blocking-span" >
                                            <input type="text" name="search" className="col-lg-8 col-md-8 col-sm-8 col-xs-12 Searchusers searchPerson inputTextSearch outlinebox pull-right texttrans"
                                                placeholder="Search..." onInput={this.searchPerson.bind(this)} />
                                        </span>
                                    </div>
                                    {
                                        this.state.type != "guest" ?  
                                        <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                                        <br/>
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
                                            <div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
                                                <label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Department</label>
                                                <MultiSelectComponent id="departmentChange" ref={(scope) => { this.dropDownDepartmentListObject = scope; }}  dataSource={this.state.departmentArray}
                                                    change={this.handleChangeFilter.bind(this)}
                                                    fields={departmentfields} placeholder="Select Department" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                    <Inject services={[CheckBoxSelection]} />
                                                </MultiSelectComponent>
                                            </div>
                                        </div> : null
                                    }
                                    
                                </div>*/}
                                {this.state.personList && this.state.personList.length > 0 ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 scrollbar" id="style-2">
                                        <div className="borderlist12">
                                            {
                                                this.state.personList.map((data, index) => {
                                                    
                                                    return (
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 empContainer selected activeEmployee" key={index} onClick={this.ShowForm.bind(this)} name={index} data-child={data._id + '-' + index} id={data._id}>
                                                            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2 dateContainer">
                                                                <label className="col-lg-12 onlyDay">Mon</label>
                                                                <label className="col-lg-12 firstDate">03</label>
                                                                <label className="col-lg-12 dateWith">Feb 20</label>
                                                            </div>
                                                            <div className="col-lg-9 col-md-10 col-sm-10 col-xs-10 listprofileEmployee nopadding">
                                                                <div className="col-lg-10 col-md-10 tripDetail">
                                                                    <label className="titleTrip col-lg-12">Pune-Mumbai-Pune</label>
                                                                    <label className=" tripType col-lg-12">Out Station &nbsp; | &nbsp;2 Day &nbsp;| &nbsp;Round Trip </label>
                                                                    <span className="statusOfTrip pull-right">Pending</span>
                                                                  
                                                                </div>
                                                                <div className="col-lg-2 nopadding">
                                                                    <div className="addedDivBM col-lg-12 nopadding">
                                                                        <img src="/images/leftArrow.png"/>
                                                                    </div>
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
                                { this.state.id && this.state.personList && this.state.personList.length > 0 ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pdcls commonSup" id={this.state.id}>
                                        <div id={this.state.id} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
                                            <SingleEmployeeDetails name={this.state.index} id={this.state.id} type={this.state.type}/>
                                        
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
}
export default BookingDetils;