import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';
import 'jquery-validation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import Loaderspinner from 'react-loader-spinner'
import "../../../sites/currentSite/pages/Checkout.css";

class Paymentgateway extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCartPrice: '',
            productData: {},
            paymethods : true,
        }
    }
    componentDidMount() {
        
        // var order_ID = "5f48e5491017612d1089e5c6" //this.props.match.params.editId
        // var paymentdetails = {
        //     RESPOSE_CODE :"1",
        //     RESPOSE_MESSAGE :"Success",
        //     REFERENCE_NO :"5f48e5491017612d1089e5c6",
        //     status :"Paid"
        // }
        // axios.patch('/api/orders/paymentorder/'+order_ID,paymentdetails)
        // .then((payurl) => {
        //     console.log('sendDataToUser in payurl==>>>', payurl.data.message)
        //     if(payurl.data.message === "Order Updated Successfully."){
        //         this.setState({paymethods : false})
        //         this.props.history.push('/payment/'+order_ID);
        //     }else{

        //     }
        // })
        // .catch((error) => {
        //     console.log("return to checkout");
        //     console.log(error);
        // })
    }
 
    getpaymentData() {
        
    }
    

    render() {
        return (
            <div>
               {  this.state.paymethods ?
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkoutWrapper" style={{backgroundColor: "#ffffff"}}>                   
                        <div className="col-lg-5 col-lg-offset-5 col-md-2 col-sm-12 col-xs-12 loadercircle" >
                            <Loaderspinner
                                type="Circles"
                                color="#80b435"
                                height={140}
                                width={140}
                            />
                        </div>
                        <div className="row transaction">
                            <span className="col-lg-12 col-md-6 col-sm-6 col-xs-6 transactionpageText">Processing ...</span>
                            <span className="col-lg-12 col-md-6 col-sm-6 col-xs-6 transactionpageText">Please do not refresh the page</span>
                        </div>
                    </div>
                :
                    <div className="row transaction">
                        <span className="col-lg-12 col-md-6 col-sm-6 col-xs-6 transactionpageText">Processing ...</span>
                        <span className="col-lg-12 col-md-6 col-sm-6 col-xs-6 transactionpageText">Please do not refresh the page</span>
                    </div>
               }
            </div>   
        );
    }
}

export default Paymentgateway;