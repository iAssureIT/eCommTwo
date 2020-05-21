import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment';
class DesignationMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "pathname"                  : this.props.match.params.entity,
            "openForm"                  : false,
            "selectedCorporate"         : {},
            "selectedCorporateLocation" : {},
            "selectedVendor"            : {},
            "selectedVendorLocation"    : {},
            "packageArray"              : [],
            "selectedPackages"          : [],
            "packageList"               : [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        this.getPackages();
        this.getCategory();
        this.getPackageDetails();
        this.getDesignationData();
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }
    handleChange(event) {
        // event.preventDefault();
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        },()=>{
            console.log([name])
        });
    }
    componentWillReceiveProps(nextProps) {
        var contractID = nextProps.match.params.contractID;
        var packageID  = nextProps.match.params.packageID;
        if (contractID && packageID) {
            this.edit();
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    getDesignationData()
    {
        axios.get("/api/designationmaster/get/list")
        .then((response)=>{
            this.setState({
                "designationArray" : response.data
            },()=>{
                console.log("designationArray",this.state.designationArray);
            })
        })
        .catch((error)=>{

        })

    }
    getPackages(){
        axios.get("/api/packagemaster/get/list")
        .then((response)=>{
            this.setState({
                "packageArray" : response.data
            })
        })
        .catch((error)=>{

        })
    }
    getCategory(){
        axios.get("/api/categorymaster/get/list")
        .then((res)=>{
            this.setState({
                "categoryArray" : res.data
            })
        })
        .catch((error)=>{

        })
    }
    submit(event) {
        event.preventDefault();
       
        var formValues = {
            contractID : this.props.match.params.contractID,
            packageID  : this.props.match.params.packageID,
           // packages   : packages
        }
        axios.post("/api/contract/post/updatepackage", formValues)
        .then((response)=>{
            swal("Mapping added successfully.");
            this.getPackageDetails();
        })
        .catch((error)=>{

        })
        
    }
    
    getPackageDetails(){
        axios.get("/api/contract/get/one/"+this.props.match.params.contractID)
        .then((response)=>{
            var packageIds = [];
            for(var i=0; i<response.data.packages.length; i++){
                packageIds.push(response.data.packages[i].packageId);
            }
            this.setState({
                packageIds  : packageIds,
                packageList : response.data.packages
            })
        })
        .catch((error)=>{

        })
    }
    delete(event){
        var contractID = this.props.match.params.contractID;
        var packageID = event.target.id;
        axios.delete("/api/contract/deletepackageincontract/"+contractID+"/"+packageID)
        .then((response)=>{
            swal("Package deleted successfully.")
            this.getPackageDetails();
        })
        .catch((error)=>{

        })
    }
    back(event) {
		event.preventDefault();
		var contractID = this.props.match.params.contractID;
		
		if (this.state.openForm === true) {
			swal({
				// title: 'abc',
				text: "It seem that you are trying to add a package. Click 'Cancel' to continue adding package. Click 'Ok' to go to next page. But you may lose values if already entered in the package form.",
				buttons: {
					cancel: {
						text: "Cancel",
						value: false,
						visible: true,
						className: "CancelButtonSwal"
					},
					confirm: {
						text: "OK",
						value: true,
						visible: true,
						className: "OkButtonSwal",
						closeModal: true
					}
				},
			})
			.then((value) => {
				if(value){
					if(contractID){
                        this.props.history.push("/contract-management/"+contractID);
                    }else{
                        this.props.history.push("/contract-management");
                    }
				}else{
					this.props.history.push("/package-details/" + contractID);
				}
			})
			$(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
			$(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');

		} else {
			if(contractID){
				this.props.history.push("/contract-management/"+contractID);
			}else{
				this.props.history.push("/contract-management");
			}
		}
    }
    next(event) {
		event.preventDefault();
		var contractID = this.props.match.params.contractID;
		if (this.state.openForm === true) {
			swal({
				// title: 'abc',
				text: "It seem that you are trying to add a package. Click 'Cancel' to continue adding package. Click 'Ok' to go to next page. But you may lose values if already entered in the package form.",
				buttons: {
					cancel: {
						text: "Cancel",
						value: false,
						visible: true,
						className: "CancelButtonSwal"
					},
					confirm: {
						text: "OK",
						value: true,
						visible: true,
						className: "OkButtonSwal",
						closeModal: true
					}
				},
			})
				.then((value) => {
					if(value){
						this.props.history.push("/condition/" + contractID);
					}else{
						this.props.history.push("/package-details/" + contractID);
					}
				})
			$(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
			$(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');

		} else {
			this.props.history.push("/condition/" + contractID);
		}
    }
    
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Category Designation Mapping</h4>
                                </div>
                                <div className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                    
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <form id="ContractManagement">
                                                    <div cassName="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 submitForm">
                                                            
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  NOpadding">
                                                                    <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <table className="table textAlignLeft">
                                                                        <thead>
                                                                            <tr>
                                                                                <th></th>
                                                                                {
                                                                                    this.state.categoryArray && this.state.categoryArray.length > 0 ?
                                                                                        this.state.categoryArray.map((data, i)=>{
                                                                                            return(
                                                                                                <th key={i}>{data.category}</th>
                                                                                            );
                                                                                        })
                                                                                    :
                                                                                    null
                                                                                }
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {   this.state.designationArray && this.state.designationArray.length > 0 ?
                                                                                this.state.designationArray.map((updata, index)=>{
                                                                                    return(
                                                                                        <tr key={index}>
                                                                                            <td>{updata.designation}</td>
                                                                                            {
                                                                                                this.state.categoryArray && this.state.categoryArray.length > 0 ?
                                                                                                    this.state.categoryArray.map((data, i)=>{
                                                                                                        return(
                                                                                                            <td key={i}>
                                                                                                                <input  type="checkbox" 
                                                                                                                        value={this.state[updata.designation+"|"+data._id] ? this.state[updata.designation+"|"+data._id]  : ""} 
                                                                                                                        name={updata.designation+"|"+data._id} 
                                                                                                                        // checked={this.state[updata.designation+"|"+data._id] ? "checked":"unchecked"}
                                                                                                                        onChange={this.handleChange}
                                                                                                                        //onKeyDown={updata.max ? ((event)=>(event.target.value > updata.max ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)): ()=>{}}
                                                                                                                       
                                                                                                                        //className="form-control" style={{"width" : "90px", "height": "25px", "display": "inline-block"}} 
                                                                                                                        />
                                                                                                            </td>
                                                                                                        );
                                                                                                    })
                                                                                                :
                                                                                                null
                                                                                            }
                                                                                        </tr>
                                                                                    );
                                                                                })
                                                                                :
                                                                                null
                                                                            }
                                                                            
                                                                        </tbody>
                                                                    </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                                                            <button id="submitbtn" className="btn button3 pull-right" onClick={this.submit.bind(this)} >Submit</button>
                                                        </div>
                                                    </div>
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
export default DesignationMapping;