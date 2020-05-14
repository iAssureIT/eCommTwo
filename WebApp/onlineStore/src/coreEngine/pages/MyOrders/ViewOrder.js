import React, {Component} from 'react';
import axios                  from 'axios';
// import $                  from 'jquery';
import '../../../sites/currentSite/pages/MyOrders.css';
import {withRouter} from 'react-router-dom';
// import Sidebar from '../../common/Sidebar/Sidebar.js';
import moment from 'moment';
class ViewOrder extends Component {
  constructor(props) {
        super(props);

        if(!this.props.loading){
            this.state = {
                "orderData":[],
                "companyInfo" : []
                
            };
        } else{
            this.state = {
                "orderData":[],
                "companyInfo" : []
            };
        }
        this.getCompanyDetails =  this.getCompanyDetails.bind(this)
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        //this.getMyOrders();
        axios.get("/api/orders/get/one/"+this.props.match.params.order_ID)
            .then((response)=>{
              console.log("orders data:",response);
              this.setState({ 
                  orderData : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })
        this.getCompanyDetails();    
    }
    getCompanyDetails() {
        
        axios.get("/api/companysettings/list")
            .then((response) => {

                this.setState({
                    companyInfo: response.data[0]
                })
            })
            .catch((error) => {
                console.log('error', error);
            })
    }
  render() {  
    
    return (
    <div className="container"> 
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
        {/* <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 NOpadding mr20" >
          <div className="sidebar">
            <Sidebar />
          </div>
        </div> */}

        <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
        <br/>
        <br/>
        <h4 className="table-caption">Order Details</h4>
        <p>Ordered on {moment(this.state.orderData.createdAt).format("DD MMMM YYYY")}  | Order {this.state.orderData.orderID}</p>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerbox">
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <strong class="box-title">
                  <span>Shipping Address</span>
              </strong>
              <div className="box-content"> 
               { this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.name } <br/>
               { this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.addressLine1 }, <br/>
               { this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.addressLine2 } &nbsp;
               { this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.city }, <br/>
               { this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.district + ', ' +  this.state.orderData.deliveryAddress.state +', ' + this.state.orderData.deliveryAddress.pincode } <br/>
               { this.state.orderData.deliveryAddress && this.state.orderData.deliveryAddress.country } <br/>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6">
              <strong class="box-title">
                <span>Payment Method</span>
              </strong>
              <div className="box-content">
              {
                this.state.orderData.paymentMethod
              }
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
              <strong class="box-title">
                <span>Order Summary</span>
              </strong>
              <div className="box-content"> 
                <div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding"><span>Subtotal:</span>  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding text-right"><span><i className={"fa fa-"+this.state.orderData.currency}> {this.state.orderData.cartTotal}</i></span> </div> 
                </div>
                <div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding"><span>Shipping:  </span></div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding text-right"><span><i className={"fa fa-"+this.state.orderData.currency}> 0</i></span> </div>
                </div>
                <div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding"><span>GST ({ this.state.companyInfo.taxSettings && this.state.companyInfo.taxSettings[0].taxRating} %):  </span></div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding text-right">
                  <span><i className={"fa fa-"+this.state.orderData.currency}> { (this.state.orderData.cartTotal*18)/100 } </i></span> 
                  </div>
                </div>
                <div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding"><span>Total: </span></div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding text-right">
                    <span><i className={"fa fa-"+this.state.orderData.currency}> { parseInt(this.state.orderData.totalAmount).toFixed(2) }</i></span>
                  </div>
                </div>
              </div>
            </div>
           
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerbox">

          {
            this.state.orderData.products && this.state.orderData.products.length > 0 ?
                  this.state.orderData.products.map((data, index)=>{
                    return(
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{marginBottom:"10px"}}>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3">
                          <img src={data.productImage[0]} style={{width:"100%"}} alt="Product" />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-6 col-xs-6">

                          <p> <a href={"/productdetails/"+data.product_ID} className="productname">{data.productName}</a></p>
                          {
                              data.discountPercent ?
                              <div>
                                <span><i className="fa fa-inr"></i>&nbsp;{data.discountedPrice}</span> &nbsp;
                                <span className="oldprice"><i className="fa fa-inr oldprice"></i>&nbsp;{data.originalPrice}</span> 
                              </div>
                              :
                              <div>
                                <span className=""><i className="fa fa-inr "></i>&nbsp;{data.originalPrice}</span> 
                              </div>
                          }
                                          
                          <p>Total: &nbsp;<i className={"fa fa-"+this.state.orderData.currency}> {data.total}</i></p>
                          <p>Quantity: {data.quantity}</p>
                        </div>
                      </div>
                      );
                  })
                  : null
           }
            
          </div>
          {
          /*<table className="data table table-order-items history" id="my-orders-table">
            
            <thead>
                <tr>
                    <th scope="col" className="col id">Product Name</th>
                    <th scope="col" className="col date">Price</th>
                    <th scope="col" className="col shipping">Qty</th>
                    <th scope="col" className="col total text-right">Subtotal</th>
                </tr>
            </thead>
            <tbody>
              {
              this.state.orderData.products && this.state.orderData.products.length > 0 ?
                  this.state.orderData.products.map((data, index)=>{
                    return(
                    <tr>
                        <td data-th="Order #" className="col id">{data.productName}</td>
                        <td data-th="Date" className="col date"><i className={"fa fa-"+data.currency}> {data.total}</i></td>
                        <td data-th="Ship To" className="col shipping">Ordered: {data.quantity}</td>
                        <td data-th="Order Total" className="col total text-right"><span><i className={"fa fa-"+data.currency}> {data.total}</i></span></td>
                    </tr>
                    );
                })
                : ""
              }
            </tbody>

            <tfoot>
              <tr className="subtotal">
                  <th colspan="3" className="mark" scope="row">Subtotal</th>
                  <td className="amount" data-th="Subtotal" ><span><i className={"fa fa-"+this.state.orderData.currency}> {this.state.orderData.cartTotal}</i></span>                    </td>
              </tr>
              <tr className="shipping">
                  <th colspan="3" className="mark" scope="row">Shipping &amp; Handling</th>
                  <td className="amount" data-th="Shipping &amp; Handling">
                    <span><i className={"fa fa-"+this.state.orderData.currency}> 100</i></span> 
                  </td>
              </tr>
              <tr className="shipping">
                  <th colspan="3" className="mark" scope="row">GST ({ this.state.companyInfo.taxSettings && this.state.companyInfo.taxSettings[0].taxRating} %)</th>
                  <td className="amount" data-th="Shipping &amp; Handling">
                    <span><i className={"fa fa-"+this.state.orderData.currency}> { (this.state.orderData.cartTotal*18)/100 } </i></span> 
                  </td>
              </tr>
              <tr className="grand_total">

                  <th colspan="3" className="mark" scope="row"><strong> Estimated Total</strong></th>
                  <td className="amount" data-th=" &quot;Estimated Total&quot;">
                      <strong><span><i className={"fa fa-"+this.state.orderData.currency}> { parseInt(this.state.orderData.totalAmount).toFixed(2) }</i></span></strong>
                  </td>
              </tr>
            </tfoot>
          </table>*/
          }
          <div className="backtoMyOrdersDiv">
            <a href="/my-orders" className="backtoMyOrders"> Back to My Orders</a>
          </div>
          <hr/>
          
        </div>

      </div>
    </div>  
    );  
  }
}


export default withRouter(ViewOrder);