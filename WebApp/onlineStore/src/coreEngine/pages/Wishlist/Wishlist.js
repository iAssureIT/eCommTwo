import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import SmallBanner from '../../blocks/SmallBanner/SmallBanner.js';
import '../../../sites/currentSite/pages/Wishlist.css';
import Sidebar from '../../common/Sidebar/Sidebar.js';
import notavailable from '../../../sites/currentSite/images/notavailable.jpg';
import Login from '../../systemSecurity/Login.js';
import SignUp from '../../systemSecurity/SignUp.js';
import ForgotPassword from '../../systemSecurity/ForgotPassword.js';
import Message from '../../blocks/Message/Message.js';
import Loader from "../../common/loader/Loader.js";
import { bindActionCreators } from 'redux';
import { getCartData } from '../../actions/index';
class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerData: {
        title: "MY WISHLIST",
        breadcrumb: 'My Wishlist',
        backgroungImage: '/images/wishlist.png',
      },
      wishlist: [],
      products: [],
      abc: [],
      quantity: 1
    }
    window.scrollTo(0, 0);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async componentDidMount() {
    const websiteModel = localStorage.getItem("websiteModel");
    const showLoginAs = localStorage.getItem("showLoginAs");
    this.setState({ showLoginAs: showLoginAs, websiteModel: websiteModel });
    await this.props.fetchCartData();
    this.getData();
  }
  getProduct(product_ID) {
    axios.get('/api/products/get/one/' + product_ID)
      .then((response) => {
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  getData() {
    $('.fullpageloader').show();
    var user_ID = localStorage.getItem('user_ID');

    axios.get('/api/wishlist/get/userwishlist/' + user_ID)
      .then((response) => {
        $('.fullpageloader').hide();
        response.data.map((a, i) => {
          axios.get('/api/products/get/one/' + a.product_ID)
            .then((res) => {
              console.log('data1', res);
              var products = this.state.products;
              products.push({
                "productName": res.data.productName,
                "originalPrice": res.data.originalPrice,
                "availableQuantity": res.data.availableQuantity,
                "bestSeller": res.data.bestSeller,
                "brand": res.data.brand,
                "category": res.data.category,
                "currency": res.data.currency,
                "discountPercent": res.data.discountPercent,
                "discountedPrice": res.data.discountedPrice,
                "productCode": res.data.productCode,
                "productImage": res.data.productImage,
                "product_ID": res.data._id,
                "wishlist_ID": a._id
              });
              this.setState({
                products: products
              })
            })
            .catch((error) => {
              console.log('error', error);
            })
        })
      })
      .catch((error) => {
        console.log('error', error);
      })

  }
  addtocart(event) {
    event.preventDefault();
    $('.fullpageloader').show();
    const user_ID = localStorage.getItem("user_ID");
    var wishlist_ID = event.target.getAttribute('wishid');

    if (user_ID) {

      var id = event.target.getAttribute('id');
      console.log('id', id);
      axios.get('/api/products/get/one/' + id)
        .then((response) => {
          var totalForQantity = parseInt(1 * response.data.discountedPrice);
          const userid = localStorage.getItem('user_ID');

          const formValues = {
            "user_ID": userid,
            "product_ID": response.data._id,
            "currency": response.data.currency,
            "productCode": response.data.productCode,
            "productName": response.data.productName,
            "section_ID": response.data.section_ID,
            "section": response.data.section,
            "category_ID": response.data.category_ID,
            "category": response.data.category,
            "subCategory_ID": response.data.subCategory_ID,
            "subCategory": response.data.subCategory,
            "productImage": response.data.productImage,
            "quantity": 1,
            "discountedPrice": parseInt(response.data.discountedPrice),
            "originalPrice": parseInt(response.data.originalPrice),
            "discountPercent": parseInt(response.data.discountPercent),
            "totalForQantity": totalForQantity,

          }
          axios.post('/api/carts/post', formValues)
            .then((response) => {
              this.props.fetchCartData();
              $('.fullpageloader').hide();
              this.setState({
                messageData: {
                  "type": "outpage",
                  "icon": "fa fa-check-circle",
                  "message": response.data.message,
                  "class": "success",
                  "autoDismiss": true
                }
              })
              setTimeout(() => {
                this.setState({
                  messageData: {},
                })
              }, 3000);

              axios.delete('/api/wishlist/delete/' + wishlist_ID)
                .then((response) => {
                  this.setState({
                    products: []
                  })
                  this.getData();
                })
                .catch((error) => {
                  console.log('error', error);
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
    else {
      this.setState({
        messageData: {
          "type": "outpage",
          "icon": "fa fa-times-circle",
          // "message" : "Need To Sign In, Please <a href='/login'>Sign In</a> First.",
          "message": this.state.showLoginAs === "modal" ? "Need To Sign In, Please <a data-toggle=modal data-target=#loginFormModal>Sign In</a> First." : "Need To Sign In, Please <a href='/login'>Sign In</a> First.",
          "class": "danger",
          "autoDismiss": true
        }
      })
      setTimeout(() => {
        this.setState({
          messageData: {},
        })
      }, 3000);
    }
  }

  removefromwishlist(event) {
    event.preventDefault();
    var id = event.target.id;
    console.log("ididid", id);
    axios.delete('/api/wishlist/delete/' + id)
      .then((response) => {
        window.scrollTo(0, 0);
        // console.log('response', response);
        this.setState({
          products: []
        })
        this.getData();
        this.setState({
          messageData: {
            "type": "outpage",
            "icon": "fa fa-check-circle",
            "message": response.data.message,
            "class": "success",
            "autoDismiss": true
          }
        })
        setTimeout(() => {
          this.setState({
            messageData: {},
          })
        }, 3000);
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  Closepagealert(event) {
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

  render() {

    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
        <Loader type="fullpageloader" />
        <Message messageData={this.state.messageData} />
        <SmallBanner bannerData={this.state.bannerData} />

        <div className="container">

          <br />
          <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4 NOpadding mr20">
            <Sidebar />
          </div>
          <div className="col-lg-9 col-md-9 col-sm-8 col-xs-8 NOpadding">
            <br />
            <br />
            {
              this.state.products && this.state.products.length > 0 ?
                this.state.products.map((data, index) => {

                  return (

                    <div className="item col-lg-4 col-md-4 col-sm-4 col-xs-4" key={index}>
                      <a href={"/productdetails/" + data.product_ID}>
                        <div className="">
                          <div className="card">
                            <div className="item-top">
                              <div className="productImg">
                                <span title="Delete" id={data.wishlist_ID} onClick={this.removefromwishlist.bind(this)} className={"wishRemove fa fa-trash"}></span>
                                {data.discountPercent ? <div className="btn-warning discounttag">{data.discountPercent} % </div> : null}
                                <a href="/" className="product photo product-item-photo collage" tabIndex="-1">
                                  <img src={data.productImage[0] ? data.productImage[0] : notavailable} alt="Product Picture" />
                                </a>
                              </div>
                              <div className="productDetails">
                                <div className="innerDiv">

                                  <div className="product-brand" title={data.brand}>{data.brand}</div>
                                  <div className=" product-item-link" title={data.productName}>{data.productName}</div>

                                  <div className="col-lg-12 col-md-12 NOpadding">
                                    {
                                      data.discountPercent ?
                                        <div className="col-lg-12 col-md-12 NOpadding">
                                          <span className="oldprice"><i className="fa fa-inr oldprice"></i>&nbsp;{data.originalPrice}</span> &nbsp;
                                                        <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.discountedPrice}</span>
                                        </div>
                                        :
                                        <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.originalPrice}</span>
                                    }
                                  </div>

                                  <div >
                                  </div>
                                  {
                                    data.availableQuantity > 0 ?
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <div className="col-lg-8 col-lg-offset-2 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 NOpadding">
                                          <button type="submit" id={data.product_ID} wishid={data.wishlist_ID} onClick={this.addtocart.bind(this)} title="Move to Cart" className="homeCart fa fa-shopping-cart col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            &nbsp;Move to Cart
                                                        </button>
                                        </div>
                                      </div>
                                      :
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                          <div className="outOfStock">Sold Out</div>
                                        </div>
                                      </div>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })
                :
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="alert alert-warning textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                    <i className="fa fa-exclamation-circle"></i>&nbsp;  You have no items in your wish list.
                                </div>
                  <a href="/" className="pull-right mt15 wishBack">Back</a>
                </div>
            }

          </div>
          <div id="loginFormModal" className="modal in">
            <div className="modal-dialog">
              <div className="modal-content loginModalContent">
                <div className="modal-body">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  {this.props.formToShow === "login" ?
                    <div className="col-lg-12 col-md-12 loginForm">
                      <Login />
                    </div>
                    : null
                  }
                  {this.props.formToShow === "signUp" ?
                    <div className="col-lg-12 col-md-12 signupForm">
                      <SignUp />
                    </div>
                    : null
                  }
                  {this.props.formToShow === "forgotPassword" ?
                    <div className="col-lg-12 col-md-12 loginForm">
                      <ForgotPassword />
                    </div>
                    : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    recentCartData: state.recentCartData
  }
}
const mapDispachToProps = (dispatch) => {
  return bindActionCreators({ fetchCartData: getCartData }, dispatch)
}
export default connect(mapStateToProps, mapDispachToProps)(Wishlist);