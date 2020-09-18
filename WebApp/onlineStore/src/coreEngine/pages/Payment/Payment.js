import React, { Component } from 'react';
import axios from 'axios';
import '../../../sites/currentSite/pages/Payment.css';
import { withRouter } from 'react-router-dom';
import { ntc } from '../../ntc/ntc.js';
import moment from 'moment';
import notavailable from '../../../sites/currentSite/images/notavailable.jpg';
class Payment extends Component {
  constructor(props) {
    super(props);

    if (!this.props.loading) {
      this.state = {
        "orderData": [],
        "companyInfo": []
        // "notificationData" :Meteor.subscribe("notificationTemplate"),
      };
    } else {
      this.state = {
        "orderData": [],
        "companyInfo": []
      };
    }
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    //this.getMyOrders();
    axios.get("/api/orders/get/one/" + this.props.match.params.order_ID)
      .then((response) => {
        console.log('orderData', response.data)
        this.setState({
          orderData: response.data
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  render() {
    console.log('orderD', this.state.orderData);
    return (
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">

          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1  col-sm-12 col-xs-12">
            <br />
            <br />
            <div className="alert alert-success">
              <i className="fa fa-check-circle"></i> &nbsp;
              Your order is placed successfully.
</div>
            <br />
            <br />
            <h4 className="table-caption">Order Details</h4>
            <p>Ordered on {moment(this.state.orderData.createdAt).format("DD MMMM YYYY")}  | OrderID -  {this.state.orderData.orderID}    <span className="pull-right hidden-xs">Shipping Time : {this.state.orderData.shippingtime}</span></p>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerbox">
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb50">
                <strong className="box-title">
                  <span>Shipping Address</span>
                </strong>
                <div className="box-content">
                  {this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.name} <br />
                  {this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.addressLine2} - &nbsp;
                  {this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.addressLine1} &nbsp; - &nbsp; 
                  {this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.pincode}. <br />                  
                  {/* {this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.district + ', ' + this.state.orderData.deliveryAddress.state + ', ' + this.state.orderData.deliveryAddress.pincode} <br />
                  {this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.country} <br /> */}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb50">
                <strong className="box-title">
                  <span>Payment Method</span>
                </strong>
                <div className="box-content">
                  {
                    this.state.orderData.paymentMethod
                  }
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 mb50">
                <strong className="box-title">
                  <span>Order Summary</span>
                </strong>
                <div className="box-content">
                  <div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding"><span>Cart Total:</span>  </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding text-right"><span><i className={"fa fa-" + this.state.orderData.currency}> {this.state.orderData.cartTotal}</i></span> </div>
                  </div>
                  <div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding"><span>Shipping:  </span></div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding text-right"><span>Free</span> </div>
                  </div>
                  {/* <div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding"><span>Time:  </span></div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding text-right"><span>{this.state.orderData.shippingtime}</span><br/> </div>
                  </div> */}
                  <div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding"><span>Discount: </span></div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding text-right">
                      <span><i className={"fa fa-" + this.state.orderData.currency}> {parseInt(this.state.orderData.discount).toFixed(2)}</i></span>
                    </div>
                  </div>
                  <div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding"><span>Order Total: </span></div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding text-right">
                      <span><i className={"fa fa-" + this.state.orderData.currency}> {parseInt(this.state.orderData.total).toFixed(2)}</i></span>
                    </div>
                  </div>
                  <div className="brdrbtmpayment col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                  <div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding"><span>Total: </span></div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding text-right">
                      <span><i className={"fa fa-" + this.state.orderData.currency}> {parseInt(this.state.orderData.total).toFixed(2)}</i></span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerbox table-responsive">
              <table className="table orderTable">
                <thead>
                  <tr>
                    <th></th>
                    <th>Products Name</th>
                    <th className="textAlignRight">Price</th>
                    <th className="textAlignRight">Quantity</th>
                    <th className="textAlignRight">SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      this.state.orderData.products && this.state.orderData.products.length > 0 ?
                        this.state.orderData.products.map((data, index) => {
                          return (
                            <tr key={'cartData' + index}>
                              <td><img alt="Product_Image" className="img orderImg" src={data.productImage[0] ? data.productImage[0] : notavailable} /></td>
                              <td>
                                <a href={"/productdetails/" + data.product_ID}><h5 className="productName">{data.productName}</h5></a>

                                {data.discountPercent ?
                                  <div className="col-lg-12 col-md-12 NOpadding">
                                    <span className="cartOldprice"><i className="fa fa-inr cartOldprice"></i>{data.originalPrice}</span> &nbsp; &nbsp;
                                    <span className="cartPrice"><i className="fa fa-inr"></i>{data.discountedPrice}</span> &nbsp; &nbsp;
                                    <span className="cartDiscountPercent">({data.discountPercent}%)</span>
                                  </div>
                                  :
                                  <span className="price"><i className="fa fa-inr"></i>{data.originalPrice}</span>
                                }
                                <div>
                                  {data.color ? <span className="cartColor">Color : <span style={{ backgroundColor: data.color, padding: '0px 5px' }}>&nbsp;</span> {ntc.name(data.color)[1]}, </span> : null}
                                  {data.size ? <span className="cartColor">Size : {data.size}</span> : null} &nbsp;
                                  {data.size && data.unit ? <span className="cartColor">{data.unit}</span> : null}
                                </div>
                              </td>
                              <td className="textAlignRight">
                                {/* <span className="productPrize textAlignRight"><i className={"fa fa-" + data.currency}></i> &nbsp;{parseInt(data.discountedPrice).toFixed(2)}</span> */}
                                <span className="productPrize textAlignRight"><i className="fa fa-inr"></i> &nbsp;{parseInt(data.discountedPrice).toFixed(2)}</span>
                              </td>
                              <td className="textAlignRight">
                                <span className=" textAlignRight">{data.quantity}</span>
                              </td>
                              <td className="textAlignRight">
                                {/* <span className="productPrize textAlignRight"><i className={"fa fa-" + data.currency}></i> &nbsp;{parseInt(data.subTotal).toFixed(2)}</span> */}
                                <span className="productPrize textAlignRight"><i className="fa fa-inr"></i> &nbsp;{parseInt(data.subTotal).toFixed(2)}</span>
                              </td>
                            </tr>
                          );
                        })
                      :
                      null
                  }
                </tbody>
              </table>

            </div>

            <div className="backtoMyOrdersDiv">
              <a href="/my-orders" className="backtoMyOrders"> Back to My Orders</a>
            </div>
            <hr />

          </div>

        </div>
      </div>
    );
  }
}


export default withRouter(Payment);