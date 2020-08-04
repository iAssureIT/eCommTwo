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
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

class customerModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showCustForm : false,
            customersArray : [],
            showCustInfoDiv : false,
            id : '',
            selectCustomer : '',
            gmapsLoaded: false,
            updateCustomer : false
        }
        window.scrollTo(0, 0);
    }

    initMap = () => {
        this.setState({
          gmapsLoaded: true,
        })
      }

    componentDidMount() {
        this.getGoogleAPIKey();
        this.getLocationType();
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

    //for google addressess
    getGoogleAPIKey(){
        axios.get("/api/projectSettings/get/GOOGLE",)
        .then((response) => {
            this.setState({
                googleAPIKey : response.data.googleapikey
            },()=>{
                console.log("googleAPIKey",response.data.googleapikey);
                window.initMap = this.initMap
                const gmapScriptEl = document.createElement(`script`)
                gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=`+this.state.googleAPIKey+`&libraries=places&callback=initMap`
                document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
            });
        })
        .catch((error) =>{
            swal(error)
        })
    }

    getLocationType() {
		axios.get('/api/locationtypemaster/get/list')
			.then((response) => {
				this.setState({
					locationTypeArry: response.data
				})
			})
			.catch((error) => {

			})
	}

    closeModal(event){
        event.preventDefault();
        $('.ssmodal').css('display','none');
    }


    onAddNewCustomer(event){
        alert();
        event.preventDefault();
        var showForm = this.state.showCustForm ? false : true;
        this.setState({
            showCustForm    : true,
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
            'franchise_id' : nextProps.franchise_id,
            "showCustForm" : nextProps.updateCustomer ? true : false,
            "showCustInfoDiv" : nextProps.updateCustomer == 'update' ? false : '',
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
        console.log("onSearchCustomer",event);
        event.preventDefault();
        const {name,value} = event.target;
        this.setState({ 
            [name]:value
        })
		this.state.customersArray.map((data, i)=>{
			if(value == data.customerName){
                console.log("match");
				this.setState({
                    "id"             : data._id,
                    "customerName"   : data.customerName,
                    "mobile"         : data.mobile,
                    "email"          : data.email,
                    "address"        : data.address,
                    "showCustInfoDiv": true,
                    "showCustForm"   : false
                })
			}else{
                this.setState({
                    // "showCustForm"   : true
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
            "address" : this.state.address,
            "houseNo"  : this.state.houseNo
        }; 

        if($('.customerForm').valid()){
            axios.get('/api/billingmaster/getCompany/'+userDetails.companyID)
            .then((response) => {
                formValues.franchise_id = response.data[0]._id;
                axios.post('/api/billingmaster/saveCustomer', formValues)
                .then((response) => {
                        this.props.storeCustData(response.data.customerData);
                        swal(response.data.message);
                        $('.ssmodal').css('display','none'); 
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

    handleEnter(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.setState({
                showCustForm    : true,
                showCustInfoDiv : false,
                customerName    : '',
                mobile          : '',
                email           : '',
                address         : '',
                _id             : ''
            })
            }
      }

    handleChangePlaces = address => {
		console.log("address in handle change=>",address)
	    this.setState({ address : address});
	};

	handleSelect = address => {

    geocodeByAddress(address)
      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'latLng': latLng}))
      .catch(error => console.error('Error', error));
     
      this.setState({ address : address});
  };

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
                                <input list="CustomerDatalist" type="search"  onChange={this.onSearchCustomer.bind(this)}  onKeyPress={this.handleEnter.bind(this)}  refs="selectCustomer" className="form-control" placeholder="Search by Mobile Number or Name..."  name="selectCustomer" value={this.state.selectCustomer}  autoComplete="off"
                                    /> 
                                    {/* <input list="selectCustomer" type="search" refs="selectCustomer" className="form-control" placeholder="Search by Mobile Number or Name..." onChange={this.onSearchCustomer.bind(this)} name="selectCustomer" value={this.state.selectCustomer} onKeyPress={this.handleKeyPress.bind(this)} onKeyUp={this.handleKeyPress.bind(this)} autoComplete="off"/>  */}
                                    <datalist id="CustomerDatalist" name="CustomerDatalist" className="customerDatalist">
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
                                    <button className="input-group button_add button button" type="button"><i className="fa fa-search"></i></button>
                                </div>
                          </div>
                        </div>
                        {this.state.showCustForm ?
                            <div className="customerFormDiv col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group paddingTop">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 customerDiv">
                                        <label>Customer Name</label><span className="astrick redFont"> *</span>
                                        <input type="text" name="customerName" className="form-control customerName" placeholder="Enter Name" onChange={this.onChangeInput.bind(this)} value={this.state.customerName} required/>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mobileNumberDiv">
                                        <label>Mobile Number</label><span className="astrick redFont"> *</span>
                                        <input type="tel" name="mobile" className="form-control mobile" placeholder="Enter Mobile Number"  onChange={this.onChangeInput.bind(this)} value={this.state.mobile} minlength="10" maxlength="10" required/>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Email</label>
                                        <input type="email" name="email" className="form-control email" placeholder="Enter Email" onChange={this.onChangeInput.bind(this)} value={this.state.email}/>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>House No</label>
                                        <input type="text" name="houseNo" className="form-control houseNo" placeholder="Enter House Number" onChange={this.onChangeInput.bind(this)} value={this.state.houseNo}/>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Address</label>
                                        {this.state.gmapsLoaded ?
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 shippingInput" style={{padding: "0px"}}>
                                            <PlacesAutocomplete value={this.state.address} 
                                                    onChange={this.handleChangePlaces}
                                                    onSelect={this.handleSelect}
                                            >
                                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                            <div>
                                                                <input
                                                                    {...getInputProps({
                                                                            placeholder: ' Start typing ...',
                                                                            className: 'location-search-input col-lg-12 form-control errorinputText',
                                                                            id: "address",
                                                                            name: "address",
                                                                            style : {padding:"0px"}
                                                                    })}
                                                                />
                                                                <div className="autocomplete-dropdown-container SearchListContainer">
                                                                    {loading && <div>Loading...</div>}
                                                                    {suggestions.map(suggestion => {
                                                                            const className = suggestion.active
                                                                                    ? 'suggestion-item--active'
                                                                                    : 'suggestion-item';
                                                                            // inline style for demonstration purpose
                                                                            const style = suggestion.active
                                                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                                            return (
                                                                                    <div
                                                                                            {...getSuggestionItemProps(suggestion, {
                                                                                                    className,
                                                                                                    style,
                                                                                            })}
                                                                                    >
                                                                                            <span>{suggestion.description}</span>
                                                                                    </div>
                                                                            );
                                                                    })}
                                                                </div>
                                                            </div>
                                                            )}
                                                    </PlacesAutocomplete>
                                            </div>        
                                            :
                                            <input id="address" type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.addressLine} placeholder="GOOGLE API NOT FOUND" ref="addressLine" name="addressLine" onChange={this.handleChange} />
                                        }
                                        {/* <input type="text" name="address" className="form-control address"  onChange={this.onChangeInput.bind(this)} value={this.state.address}/> */}
                                    </div>
                                </div>
                        </div>
                        : null}
                        {this.state.showCustInfoDiv ? 
                         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 showCustInfoDiv">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group paddingTop">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label><i class="fa fa-user" aria-hidden="true"></i> Customer Name</label>
                                    <p>{this.state.customerName}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label><i class="fa fa-phone" aria-hidden="true"></i> Mobile Number</label>
                                    <p>{this.state.mobile}</p>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label><i class="fa fa-envelope" aria-hidden="true"></i> Email</label>
                                    <p>{this.state.email}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label><i class="fa fa-map-marker" aria-hidden="true"></i> Address </label>
                                    <p>{this.state.address}</p>
                                </div>
                            </div>
                          </div>
                        </div>
                        : null }
                      <div className="modal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {this.state.showCustInfoDiv ?  
                          <div>
                            <button className="btn btn-default modal-buttons pullleft" onClick={this.closeModal.bind(this)}>Close</button>
                            <button className="btn btn-primary modal-buttons textWhite" onClick={this.addCustomerToBill.bind(this)}>Use</button>
                          </div>
                          :
                          <div>
                             <button className="btn btn-default modal-buttons pullleft" onClick={this.closeModal.bind(this)}>Close</button>
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