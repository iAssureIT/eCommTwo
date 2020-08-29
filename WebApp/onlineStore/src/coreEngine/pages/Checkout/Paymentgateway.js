import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';
import 'jquery-validation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import Loader from "../../common/loader/Loader.js";
import "../../../sites/currentSite/pages/Checkout.css";

class Paymentgateway extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCartPrice: '',
            productData: {},
        }
    }
    componentDidMount() {
        var order_ID = "" //this.props.match.params.editId
        var paymentdetails = {
            RESPOSE_CODE :"",
            RESPOSE_MESSAGE :"",
            REFERENCE_NO :"",
            Status :"Paid"
        }
        axios.patch('/api/orders/paymentorder'+order_ID,paymentdetails)
        .then((payurl) => {
            console.log('sendDataToUser in payurl==>>>', payurl.data)
        
        })
        .catch((error) => {
            console.log("return to checkout");
            console.log(error);
        })
    }
 
    getpaymentData() {
        
    }
    

    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutWrapper" style={{ backgroundColor: "#ffffff" }}>
               
                <div className="row">
                    
                    <Loader type="fullpageloader" />
                    {/* <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"> */}
                    <span className="col-lg-12 col-md-6 col-sm-6 col-xs-6 transactionpageText">Processing ...</span>
                    <span className="col-lg-12 col-md-6 col-sm-6 col-xs-6 transactionpageText">Please do not refresh the page</span>

                    {/* </div> */}
                </div>
            </div>
        );
    }
}

export default Paymentgateway;