import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import Address              from '../Address/Address.js';
import "../../../sites/currentSite/pages/AddressBook.css";
import Sidebar from '../../common/Sidebar/Sidebar.js';
import Message from '../../blocks/Message/Message.js';
import Loader from "../../common/loader/Loader.js";

class AddressBook extends Component{
    constructor(props) {
        super(props);
        this.state={
            deliveryAddresses : []
        }
        this.getUserData();
        this.getUserAddresses();
    }
    componentDidMount(){
        this.getUserData();
        this.getUserAddresses();
    }
    getUserData(){
        // $('.fullpageloader').show();
        var userid = localStorage.getItem("user_ID");
        axios.get('/api/users/'+ userid)
        .then( (res)=>{
            $('.fullpageloader').hide();
            this.setState({
                name              : res.data.deliveryAddress ? res.data.deliveryAddress[0].name : "",
                email              : res.data.deliveryAddress ? res.data.deliveryAddress[0].email : "",
                mobileNumber              : res.data.deliveryAddress ? res.data.deliveryAddress[0].mobileNumber : "",
                deliveryAddressID : res.data.deliveryAddress ? res.data.deliveryAddress[0]._id : "",
                addressLine1    : res.data.deliveryAddress ? res.data.deliveryAddress[0].addressLine1 : "",
                addressLine2    : res.data.deliveryAddress ? res.data.deliveryAddress[0].addressLine2 : "",
                block           : res.data.deliveryAddress ? res.data.deliveryAddress[0].block : "",
                city            : res.data.deliveryAddress ? res.data.deliveryAddress[0].city : "",
                pincode         : res.data.deliveryAddress ? res.data.deliveryAddress[0].pincode : "",
                state           : res.data.deliveryAddress ? res.data.deliveryAddress[0].state : "",
                country         : res.data.deliveryAddress ? res.data.deliveryAddress[0].country : "",
                type            : res.data.deliveryAddress ? res.data.deliveryAddress[0].type : "",
            })
        })
        .catch((error)=>{
          console.log("error = ",error);
          // alert("Something went wrong! Please check Get URL.");
        });
    }
    getUserAddresses(){
        var userid = localStorage.getItem("user_ID");
        axios.get('/api/users/'+ userid)
        .then( (res)=>{
            this.setState({
                deliveryAddresses : res.data.deliveryAddress
            })
        })
        .catch((error)=>{
          console.log("error = ",error);
          // alert("Something went wrong! Please check Get URL.");
        });   
    }
    deleteAddress(event){
        event.preventDefault();
        // $('.fullpageloader').show();
        var user_ID = localStorage.getItem("user_ID");
        var deliveryAddressID = event.target.id; 
        var formValues = {
            user_ID : user_ID,
            deliveryAddressID : deliveryAddressID
        }
        axios.patch('/api/users/delete/address', formValues)
        .then((response)=>{
            $('.fullpageloader').hide();
            // console.log('response', response);
            this.getUserAddresses();
            this.setState({
              messageData : {
                "type" : "outpage",
                "icon" : "fa fa-check-circle",
                "message" : "&nbsp; "+response.data.message,
                "class": "success",
                "autoDismiss" : true
              }
            })
            setTimeout(() => {
                this.setState({
                    messageData   : {},
                })
            }, 3000);
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }
    Closepagealert(event){
        event.preventDefault();
        $(".toast-error").html('');
        $(".toast-success").html('');
        $(".toast-info").html('');
        $(".toast-warning").html('');
        $(".toast-error").removeClass('toast');
        $(".toast-success").removeClass('toast');
        $(".toast-info").removeClass('toast');
        $(".toast-warning").removeClass('toast');

    }
    getAddressId(event){
        this.setState({
            addressId : event.target.id
        })
    }
    opDone(){
        this.getUserData();
        this.getUserAddresses();
    }
    render(){
        return(
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
            // <Loader type="fullpageloader" />
            <Address addressId={this.state.addressId} opDone={this.opDone.bind(this)}/>
            <div className="pagealertnone">
              <Message messageData={this.state.messageData} />
              </div>
                <div className="container">
                    <br/>
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 NOpadding mr20">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 NOpadding mt25">
                        <h4 className="addTitle">Default Addresses</h4>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb15">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                {
                                    this.state.addressLine1 ? 
                                    <div className="row">
                                        <label>Default Shipping / Billing Address</label>
                                        <p>
                                            {this.state.name} <br />
                                            {this.state.addressLine2 ? this.state.addressLine2+",  " : null}
                                            {this.state.addressLine1} <br />                                            
                                            {/* {this.state.city},<br /> */}
                                            {/* {this.state.state}, {this.state.country} - {this.state.pincode}<br /> */}
                                            Contact Number: {this.state.mobileNumber}
                                        </p>
                                        <div data-toggle="modal" data-target="#checkoutAddressModal" id={this.state.deliveryAddressID} onClick={this.getAddressId.bind(this)} className="btn anasBtn mt15">Change Billing Address</div>
                                        {/* <i id={this.state.deliveryAddressID} onClick={this.deleteAddress.bind(this)} className="fa fa-trash btn anasBtn deleteAdd"></i> */}
                                    </div>
                                    :
                                    <div className="row">
                                        <label>Default Billing Address</label>
                                        <p>You have not set a default billing address.</p>
                                        <div data-toggle="modal" data-target="#checkoutAddressModal" className="btn anasBtn mt15">Add Billing Address</div>
                                    </div>
                                }
                            </div>
                        </div>
                        {
                        /*<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt15 mb25 NOpaddingRight">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                {this.state.addressLine1 ?
                                    <div className="row">
                                        <label>Default Shipping Address</label>
                                        <p>
                                            {this.state.name} <br />
                                            {this.state.addressLine1} <br />
                                            {this.state.addressLine2} <br />
                                            {this.state.block}, {this.state.city},<br />
                                            {this.state.state}, {this.state.country} - {this.state.pincode}<br />
                                            T: {this.state.mobileNumber}
                                        </p>
                                        <div data-toggle="modal" data-target="#checkoutAddressModal" id={this.state.deliveryAddressID} onClick={this.getAddressId.bind(this)} className="btn btn-warning mt15">Change Shipping Address</div>
                                    </div>
                                    :
                                    <div className="row">
                                        <label>Default Shipping Address</label>
                                        <p>You have not set a default shipping address.</p>
                                        <div data-toggle="modal" data-target="#checkoutAddressModal" id={'/address'} className="btn btn-warning mt15">Add Shipping Address</div>
                                    </div>
                                }
                                
                            </div>
                        </div>*/
                        }
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt15 mb25 NOpaddingRight">
                            
                        <h4 className="addTitle">Additional Address Entries</h4>
                        {
                            this.state.deliveryAddresses && this.state.deliveryAddresses.length > 1 ?
                            this.state.deliveryAddresses.map((address , index)=>{
                                if(index !== 0){
                                    return(
                                        <div key={'address'+index} className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb15 NOpaddingLeft">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="row">
                                                    <p>
                                                        {address.name} <br />
                                                        {this.state.addressLine2 ? this.state.addressLine2+",  " : null}
                                                        {address.addressLine1} <br />                                                        
                                                        {/* {this.state.city},<br /> */}
                                                        {/* {address.state}, {address.country} - {address.pincode}<br /> */}
                                                        Pincode : {address.pincode +"."} <br />
                                                        Contact Number: {address.mobileNumber}
                                                    </p>
                                                    <div  data-toggle="modal" data-target="#checkoutAddressModal" id={address._id} onClick={this.getAddressId.bind(this)} className="btn anasBtn">Edit Address</div> &nbsp;
                                                    <i id={address._id} onClick={this.deleteAddress.bind(this)} className="fa fa-trash btn anasBtn deleteAdd"></i>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                            :
                            <p>You have no other address entries in your address book.</p>
                        }
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mt25">
                        <div data-toggle="modal" data-target="#checkoutAddressModal" id="" className="btn anasBtn addressSaveBtn">Add New Address</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default AddressBook;