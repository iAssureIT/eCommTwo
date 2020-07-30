import React, { Component }   from 'react';
import $                      from 'jquery';
import jQuery, { isNumeric, data } from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import moment                 from "moment";
// import IAssureTable           from "../../IAssureTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
import _                      from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCartData,storeCustData} from '../../redux/actions/index';

class customerModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showCustForm : false,
            customersArray : [],
            showCustInfoDiv : false,
            id : ''
        }
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        $.validator.addMethod("noSpace", function(value, element) { 
			return value == '' || value.trim().length != 0;
          }, "No space please and don't leave it empty");
          
		$.validator.addMethod("validPoNum", function(value, element) {
			return (/^-{0,1}\d+$/.test(value.replace(/[PR+]/g, '')));
		}, "Please enter a valid Purchase order Number");

		jQuery.validator.setDefaults({
			debug: true,
			success: "valid"
		});
	  
		  $("#addNewPurchaseOrder").validate({
			rules: {
                customerName:{
				  required:true,
				  noSpace: true
			  },
			  mobile:{
				  required:true,
				  noSpace: true,
				  maxlength: 10,
				  digits: true
			  },
			},
			errorPlacement: function (error, element) {
			  if (element.attr("name") === "customerName") {
				error.insertAfter(".customerDiv");
			  }
			  if (element.attr("name") === "mobile") {
				error.insertAfter(".mobileNumberDiv");
			  }
			}
		  });

    }

    closeModal(event){
        event.preventDefault();
        $('.ssmodal').css('display','none');
    }


    onAddNewCustomer(event){
        event.preventDefault();
        var showForm = this.state.showCustForm ? false : true;
        this.setState({
            showCustForm    : showForm,
            showCustInfoDiv : false,
            customerName    : '',
            mobile          : '',
            email           : '',
            address         : '',
            _id             : ''
        });
        $('input[name=selectCustomer').val('');
    }

    onChangeInput(event){
        event.preventDefault();
        const {name,value} = event.target;

        this.setState({ 
            [name]:value
        })
    }

    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps",nextProps);
        this.setState({
            'franchise_id' : nextProps.franchise_id
        })
        this.getCustomer();
    }

    getCustomer(){
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        axios.get('/api/billingmaster/getCompany/'+userDetails.companyID)
        .then((response) => {
            console.log("response",response)
            axios.get('/api/billingmaster/get/customers/'+response.data[0]._id)
            .then((response) => {
                this.setState({
                    customersArray : response.data
                })
            })
            .catch((error) => {
                console.log('error', error);
            })
        })
        .catch((error) => {
                console.log('error', error);
        })
    }

    onSearchCustomer(event){
        event.preventDefault();
        const {name,value} = event.target;
        this.setState({ 
            [name]:value
        })
		this.state.customersArray.map((data, i)=>{
			if(value == data.customerName){
                console.log("match");
				this.setState({
                    "id"            : data._id,
                    "customerName"   : data.customerName,
                    "mobile"         : data.mobile,
                    "email"          : data.email,
                    "address"        : data.address,
                    "showCustInfoDiv": true,
                    "showCustForm"   : false
                })
			}
		});

		// this.getOrder(id);
	}

    saveCustomerInfo(event){
        event.preventDefault();
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));

        var formValues = {
            "Name"   : this.state.customerName,
            "mobile" : this.state.mobile,
            "email"  : this.state.email,
            "address" : this.state.address
        }; 

        if($('.customerForm').valid()){
            axios.get('/api/billingmaster/getCompany/'+userDetails.companyID)
            .then((response) => {
                formValues.franchise_id = response.data[0]._id;
                axios.post('/api/billingmaster/saveCustomer', formValues)
                .then((response) => {
                    if(response.data.duplicated){
                        swal("This customer is already exist you can select from list.");
                    }else{
                        this.props.storeCustData(response.data.customerData);
                        swal("Customer added successfully");
                        $('.ssmodal').css('display','none');
                    }
                    
                })
                .catch((error) => {
                    console.log('error', error);
                })
            })
            .catch((error) => {
                console.log('error', error);
            })
        }
    }

    addCustomerToBill(event){
        event.preventDefault();
        var customerDetail = {
            "_id"     : this.state.id,
            "customerName"   : this.state.customerName,
            "mobile" : this.state.mobile,
            "email"  : this.state.email,
            "address" : this.state.address
        }
        this.props.storeCustData(customerDetail);
        $('.ssmodal').css('display','none');
    }

    render(){
        return( 
          <div className="col-lg-12">
                {
                <div className="modal-dialog customerModal-dialog">
                  <div className="modal-content">
                    <div className="modal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">    
                      <h4 className="WightFont textAlignCenter col-lg-11 col-md-11 col-sm-11 col-xs-11">Customer Information</h4>
                    </div>
                    <div className="modal-body textAlignLeft">
                        {/* onSubmit={this.addDispatchDetails.bind(this)} */}
                      <form className="customerForm">
                      <div className="row inputrow">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paddingTop">
                          <label>Search Customer</label>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
							    <input list="selectCustomer" type="search" refs="selectCustomer" className="form-control" placeholder="Search by Mobile Number or Name..." onChange={this.onSearchCustomer.bind(this)} name="selectCustomer" autoComplete="off"/> 
								<datalist id="selectCustomer" name="selectCustomer" className="customerDatalist">
										{
											this.state.customersArray && this.state.customersArray.length > 0 ?
												this.state.customersArray.map((data, i)=>{
													return(
														 <option key={i} value={data.customerName} data-id={data._id}>{data.customerName} - {data.mobile} - {data.email}</option>
													);
												})
											:
											<option>No Customers available</option>
										}
								</datalist>
                                <button className="input-group button_add button button" type="button"><i className="fa fa-plus"></i></button>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paddingTop">
                              <button onClick={this.onAddNewCustomer.bind(this)}>Add New Customer</button>
                          </div>
                          <br/>
                          {this.state.showCustForm ?
                          <div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group paddingTop">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 customerDiv">
                                    <label>Customer Name</label><span className="astrick redFont"> *</span>
                                    <input type="text" name="customerName" className="form-control customerName" onChange={this.onChangeInput.bind(this)} value={this.state.customerName} required/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mobileNumberDiv">
                                    <label>Mobile Number</label><span className="astrick redFont"> *</span>
                                    <input type="telephone" name="mobile" className="form-control mobile"  onChange={this.onChangeInput.bind(this)} value={this.state.mobile} required/>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control email"  onChange={this.onChangeInput.bind(this)} value={this.state.email}/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <label>Address</label>
                                    <input type="text" name="address" className="form-control address"  onChange={this.onChangeInput.bind(this)} value={this.state.address}/>
                                </div>
                            </div>
                          </div>
                        : null}
                        {this.state.showCustInfoDiv ? 
                            <div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group paddingTop">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <label>Customer Name</label>
                                    <p>{this.state.customerName}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <label>Mobile Number</label>
                                    <p>{this.state.mobile}</p>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <label>Email</label>
                                    <p>{this.state.email}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <label>Address</label>
                                    <p>{this.state.address}</p>
                                </div>
                            </div>
                          </div>
                        : null }
                       </div>
                      <div className="modal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {this.state.showCustInfoDiv ?  
                          <div>
                            <button className="btn btn-default modal-buttons" onClick={this.closeModal.bind(this)}>Close</button>
                            <button className="btn btn-primary modal-buttons textWhite" onClick={this.addCustomerToBill.bind(this)}>Use</button>
                          </div>
                          :
                          <div>
                             <button className="btn btn-default modal-buttons" onClick={this.closeModal.bind(this)}>Close</button>
                             <input  type="submit" className="btn btn-primary textWhite modal-buttons" onClick={this.saveCustomerInfo.bind(this)} value="Submit"/>
                          </div>
                          }
                      </div>
                      </form>
                      <br/>
                    </div>
                    <div className="modal-footer" style={{border:'none'}}>
                      
                    </div>
                  </div>
                </div>
              }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	//console.log("mapStateToProps",state);
	return {
	  recentCartData :  state.recentCartData
	}
  }
  const mapDispachToProps = (dispatch) => {
	return  bindActionCreators({ fetchCartData: getCartData,storeCustData: storeCustData }, dispatch)
  }
  export default connect(mapStateToProps, mapDispachToProps)(customerModal);