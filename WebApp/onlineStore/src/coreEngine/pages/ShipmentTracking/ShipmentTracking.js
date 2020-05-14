import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import moment from "moment";
import StepWizard         from "../../common/Wizard/StepWizard.jsx";
import '../../../sites/currentSite/pages/ShipmentTracking.css';
import Loader from "../../common/loader/Loader.js";

class ShipmentTracking extends Component {
  constructor(props) {
    super(props);

    if (!this.props.loading) {
      this.state = {
        "orderData": [],
        // "notificationData" :Meteor.subscribe("notificationTemplate"),
      };
    } else {
      this.state = {
        "orderData": [],
      };
    }
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.getMyOrders();
  }
  getMyOrders() {
    $('.fullpageloader').show();
    var userId = localStorage.getItem('user_ID');
    axios.get("/api/orders/get/list/" + userId)
      .then((response) => {
          // var orderData = response.data.filter((data,index)=>{
          //   return  data.deliveryStatus[data.deliveryStatus.length-1].status === 'Dispatch' || data.deliveryStatus[data.deliveryStatus.length-1].status === 'Delivery Initiated'
          //               || data.deliveryStatus[data.deliveryStatus.length-1].status === 'Delivered & Paid'
          // });
          $('.fullpageloader').hide();
          this.setState({orderData:response.data})
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  closeModal(event) {
    // console.log('event',event);
    event.preventDefault();
    $('.dispatchCompanyName').val('');
    $('.deliveryPersonName').val('');
    $('.deliveryPersonContact').val('');
  }

  render() {
    return (
      <div className="col-lg-12">
      <Loader type="fullpageloader" />
        <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 marginTop180 ">
          <div className="col-lg-12 myorderlistheader">
            <div className="">
              <div className="text-center">
                <h4>Shipment Tracking</h4>
              </div>
            </div>
          </div>
          <br />
          {/*
            this.state.orderData && this.state.orderData.length > 0 ?

              <div className="col-lg-12 col-md-12 col-sm-12 admin-orders-SubTitleRow">
                <div className="admin-orders-listofColors">
                  <span className="">
                    <span className="admin-orders-stat-Dispatched comm-status-of-order"></span>
                    Out for Delivery
                  </span>

                  <span className="">
                    <span className="admin-orders-stat-Deliveredpaid comm-status-of-order"></span>
                    Delivered & Paid
                  </span>
                </div>
              </div> : ''
          */}


          {
            this.state.orderData && this.state.orderData.length > 0 ?
              this.state.orderData.map((data, index) => {

                return (
                  <div key={index} className="container-fluid " >
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  parentDiv">
                          
                          <div key={index} className={data.deliveryStatus[data.deliveryStatus.length-1].status === "Cancelled" ? "col-lg-12 shiptracbg" : "col-lg-12" }>
                            <div className="col-lg-12 orderpagebox">
                              <div className="row">
                              <StepWizard data={data} />
                              </div>
                              <hr className="hrline" />
                              <div className="row">
                                <div className="col-lg-4">
                                {
                                  data.deliveryStatus[data.deliveryStatus.length-1].status === "Cancelled" ? 
                                  <div className="col-lg-8 orderButton2"> <b>Cancelled</b></div> : null
                                }
                                  
                                  <div className="">
                                    <div className=" col-lg-8 orderButton">Order-ID : <b>{data.orderID}</b></div>
                                  </div>
                                </div>
                                {data.products ?
                                  data.products.map((products, index) => {
                                    return (
                                      <div key={index} className={  products.status ? (products.status === "Returned" ? "col-lg-12 shiptracbg" : "col-lg-12") : "col-lg-12"} >
                                        <div className="col-lg-2 mtop10">
                                          <img className="itemImg" src={products.productImage[0]} alt="ProductImage" />
                                        </div>
                                        <div className="col-lg-6 mtop10">
                                          <h4>{products.productName}</h4>
                                        </div>
                                        <div className="col-lg-2 mtop10"><p className={"fa fa-" + products.currency}> {products.total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </p>
                                        </div>
                                        <div className="col-lg-2"> 
                                        <h4>
                                        { products.status ? products.status.charAt(0) + products.status.slice(1).toLowerCase()
                                          : data.status.charAt(0) + data.status.slice(1).toLowerCase()
                                        } 
                                        </h4>
                                        </div>
                                      </div>
                                    );
                                  })
                                  :
                                  null
                                }
                              </div>
                              <hr className="hrline" />
                              <div className="row">
                                <div className="col-lg-12 mtop10">
                                  <div className="col-lg-6">
                                    <p><span>Ordered On </span>&nbsp;{moment(data.createdAt).format("DD/MM/YYYY hh:mm a")}</p>
                                  </div>
                                  <div className="col-lg-6 pull-right plright">
                                    <p><span>Order Total</span>&nbsp;<span className={"fa fa-" + data.currency}>&nbsp;{data.totalAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })
              :
              <div>
                <h5 className="col-lg-12 textAlignCenter"><b>There is no order to track</b></h5>
                <div className="col-lg-12 textAlignCenter">
                  <img src="/images/emptyorder.png" alt="ProductImage" />
                </div>
                <p className="col-lg-12 textAlignCenter emptyCartMsg">Looks like you haven't placed anything to your orders yet.</p>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default ShipmentTracking