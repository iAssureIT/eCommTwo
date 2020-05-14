import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import {connect}            from 'react-redux';
import { withRouter }       from 'react-router-dom';
import _                    from 'underscore';
import 'bootstrap/js/tab.js';
class SelectCorporate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "startRange": 0,
            "limitRange": 10,
            "selectedCorporate"            : {},
            "selectedCorporateLocation"    : {},
            "editId"    :  '',
        };
    }
    componentDidMount(){
        this.getCorporate();
        window.scrollTo(0, 0);
        $.validator.addMethod("regxvendor", function (value, element, arg) {
            return arg !== value;
        }, "Please select the vendor");
        $.validator.addMethod("regxvendorLocation", function (value, element, arg) {
            return arg !== value;
        }, "Please select the vendor location");

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#SelectVendor").validate({
            rules: {
                vendor: {
                    required: true,
                    regxvendor: "--Select Vendor--"
                },
                vendorLocation: {
                    required: true,
                    regxvendorLocation: "--Select Vendor Location--"
                }
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "vendor") {
                    error.insertAfter("#vendor");
                }
                if (element.attr("name") == "vendorLocation") {
                    error.insertAfter("#vendorLocation");
                }
            }
        });
    }
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var value = event.target.value;
        this.setState({
            [name]: event.target.value
        },()=>{
            if(this.state[name] == this.state.corporate){
                this.getCorporateLocation(value, '');
                this.setState({
                    corporateLocation : ''
                })
            }else if(this.state[name] == this.state.corporateLocation && this.state.corporate){
                this.getCorporateLocation(this.state.corporate, this.state.corporateLocation);
            }
        });
    }
    getCorporate(){
        axios.get('/api/entitymaster/get/corporate')
		.then((response) => {
            console.log('corporateArray', response.data)
			this.setState({
				corporateArray: response.data
			})
		})
		.catch((error) => {
			
		})
    }
    getCorporateLocation(vendorId, vendorLocationId){

        axios.get('/api/entitymaster/get/one/'+vendorId)
        .then((response)=>{
            this.setState({
                selectedCorporate : response.data,
                corporateLocationArray: response.data.locations
            },()=>{
                console.log("corporateLocationArray",this.state.corporateLocationArray);
                if(this.state.corporateLocationArray && this.state.corporateLocationArray.length>0){
                    var selectedCorporateLocation = this.state.corporateLocationArray.filter((a)=> a._id == vendorLocationId);
                    console.log('selectedCorporateLocation', selectedCorporateLocation);
                    this.setState({
                        selectedCorporateLocation : selectedCorporateLocation[0]
                    })
                }else{
                    this.setState({
                        selectedCorporateLocation : []
                    })
                }
            })
        })
        .catch((error)=>{

        })
    }
    submit(event){
        event.preventDefault();
        if($('#SelectVendor').valid()) {
            var vendorID            = this.state.vendor;
            var vendorLocationID    = this.state.vendorLocation;
            this.props.vendor(vendorID, vendorLocationID);
            this.props.history.push("/supplier/basic-details");
        }
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                        <section className="">
                            <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                                
                                <section className="">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                                            <form className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12" id="SelectVendor">
                                                <div className="form-margin col-lg-4 col-md-6 col-sm-12 col-xs-12" >
                                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Corporate <sup className="astrick">*</sup></label>
                                                    <select id="vendor" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.corporate} ref="corporate" name="corporate" onChange={this.handleChange.bind(this)}>
                                                        <option>--Select Corporate--</option>
                                                        {
                                                            this.state.corporateArray && this.state.corporateArray.length > 0 ?
                                                                this.state.corporateArray.map((data, i)=>{
                                                                    return(
                                                                        <option key={i} value={data._id}>{data.companyName}</option>
                                                                    );
                                                                })
                                                            :
                                                            null
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-margin col-lg-4 col-md-6 col-sm-12 col-xs-12 marbtm30" >
                                                   <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Work Location <sup className="astrick">*</sup></label>
                                                    <select id="vendorLocation" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.corporateLocation} ref="corporateLocation" name="corporateLocation" onChange={this.handleChange.bind(this)}>
                                                        <option>--Select Work Location--</option>
                                                        {
                                                            this.state.corporateLocationArray && this.state.corporateLocationArray.length > 0 ?
                                                                this.state.corporateLocationArray.map((data, i)=>{
                                                                    return(
                                                                        <option key={i} value={data._id}>{((data.locationType).match(/\b(\w)/g)).join('')} - {data.area} {data.city}, {data.stateCode} - {data.countryCode}  </option>
                                                                    );
                                                                })
                                                            :
                                                            null
                                                        }
                                                    </select>
                                                </div>
                                                
                                               {/* <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <button onClick={this.submit.bind(this)} className="btn button3 pull-right">Save & Next</button>
                                                </div>*/}
                                            </form>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        vendor : (vendorID, vendorLocationID)=> dispatch({
            type:'VENDOR',
            vendorID : vendorID,
            vendorLocationID : vendorLocationID
        }),
    }
}
const mapStateToProps = (state)=>{
    return {
        vendorID            : state.vendorID,
        vendorLocationID    : state.vendorLocationID
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectCorporate));