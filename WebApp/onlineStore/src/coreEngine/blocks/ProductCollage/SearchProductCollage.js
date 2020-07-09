import React, { Component } from 'react';
import "../../../sites/currentSite/blocks/ProductCollageView.css";
import axios from 'axios';
import { connect } from 'react-redux';
import ProductDetailsHomeView from "../../pages/ProductDetailsEcommerce/ProductDetailsHomeView.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import $ from 'jquery';
import Message from '../Message/Message.js';
import notavailable from '../../../sites/currentSite/images/notavailable.jpg';
import Login          from '../../systemSecurity/Login.js';
import SignUp         from '../../systemSecurity/SignUp.js';
import ForgotPassword from '../../systemSecurity/ForgotPassword.js';
import { bindActionCreators } from 'redux';
import { getCartData } from '../../actions/index';
const user_ID = localStorage.getItem("user_ID");

class SearchProductCollage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      masterLimitProducts: [],
      categoryDetails: [],
      modalIDNew: [],
      sizeCollage: false,
      relatedProductArray: []
    }
  }
  async componentDidMount() {
    await this.props.fetchCartData();
    this.setState({
      //products : this.props.products,
      masterLimitProducts: this.props.products
    }, () => { });

  }
  
  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps:",nextProps.products);
    if(localStorage.getItem('websiteModel')=== "FranchiseModel"){
    for(var i=0;i<nextProps.products.length;i++){      
        var availableSizes = [];
      
        if(nextProps.products[i].size){
          availableSizes.push(nextProps.products[i].size*1);
          availableSizes.push(nextProps.products[i].size*2);
          availableSizes.push(nextProps.products[i].size*4); 
          nextProps.products[i].availableSizes = availableSizes;
          // console.log("availableSizes=======",availableSizes);    
        }
    }
  }
    // console.log("componentWillReceiveProp products===:",nextProps.products);
    this.setState({
      products: nextProps.products,
      masterLimitProducts: nextProps.products,
      categoryDetails: nextProps.categoryDetails
    });
  }

  addtocart(event) {
    event.preventDefault();
    var productCode = event.target.getAttribute('productCode');
    var clr = event.target.getAttribute('color');

    if (user_ID) {
      var id = event.target.id;
      const userid          = localStorage.getItem('user_ID');
      var availableQuantity = event.target.getAttribute('availableQuantity');
      var recentCartData    = this.props.recentCartData.length > 0 ? this.props.recentCartData[0].cartItems : [];
      var productCartData   = recentCartData.filter((a) => a.product_ID === id);
      var quantityAdded     = productCartData.length > 0 ? productCartData[0].quantity : 0;
      // if(localStorage.getItem('websiteModel')==="FranchiseModel"{

      // }
      const formValues = {
        "user_ID": userid,
        "product_ID": event.target.id,
        "quantity": 1,
      }
      // this.getProductData(productCode, clr);
      axios.get("/api/products/get/productcode/" + productCode)
        .then((response) => {
          // console.log('getProductData', response.data);
          let mymap = new Map();
          var colorFilter = response.data.filter(x => { 
            return x.color === clr && x.availableQuantity > 0
          });
          var unique = colorFilter.filter(el => {
            const val = mymap.get(el.size);
            if (val) {
              if (el._id < val) {
                mymap.delete(el.size);
                mymap.set(el.size, el._id);
                return true;
              } else {
                return false;
              }
            }
            mymap.set(el.size, el._id);
            return true;
          });
          this.setState({
            ['relatedProductArray' + id]: unique
          })
          if (unique.length > 0) {
            if (unique.length === 1) {
              if (unique[0].size) {
                this.setState({
                  ['sizeCollage' + id]: true
                })
              } else {
                this.addCart(formValues, quantityAdded, availableQuantity);
              }
            } else if (unique.length > 1) {
              this.setState({
                ['sizeCollage' + id]: true
              })
            } else {
              this.addCart(formValues, quantityAdded, availableQuantity);
            }
          } else {
            this.addCart(formValues, quantityAdded, availableQuantity);
          }
        })
        .catch((error) => {
          console.log('error', error);
        })
    } else {
      var previousUrl = window.location.href;
      localStorage.setItem("previousUrl",previousUrl);
      // console.log("previousUrl===",previousUrl);
      // console.log("localstorage previousUrl===",localStorage.getItem('previousUrl'));
      this.setState({
        messageData: {
          "type": "outpage",
          "icon": "fa fa-exclamation-circle",
          // "message": "Need To Sign In, Please <a href='/login'>Sign In</a> First.",
          "message" : "Need To Sign In, Please <a data-toggle=modal data-target=#loginFormModal>Sign In</a> First.",          

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
  addCart(formValues, quantityAdded, availableQuantity) {
    if(localStorage.getItem('webSiteModel')==='FranchiseModel'){
      axios.post('/api/carts/post', formValues)
        .then((response) => {
          this.props.fetchCartData();
          console.log("this.props.fetchCartData();",this.props.fetchCartData());
          this.setState({
            messageData: {
              "type": "outpage",
              "icon": "fa fa-check-circle",
              "message": "&nbsp; " + response.data.message,
              "class": "success",
              "autoDismiss": true
            }
          })
          setTimeout(() => {
            this.setState({
              messageData: {},
            })
          }, 3000);

          console.log("changrCartCount:",response.data.cartCount);
          this.props.changeCartCount(response.data.cartCount);

        })
        .catch((error) => {
          console.log('error', error);
        })
    }else{
    if (quantityAdded >= availableQuantity) {
      this.setState({
        messageData: {
          "type": "outpage",
          "icon": "fa fa-check-circle",
          "message": "Last " + availableQuantity + " items taken by you",
          "class": "success",
          "autoDismiss": true
        }
      })
      setTimeout(() => {
        this.setState({
          messageData: {},
        })
      }, 3000);
    } else {
      // console.log("addCart formValues===",formValues);
      axios.post('/api/carts/post', formValues)
        .then((response) => {
          this.props.fetchCartData();
          // console.log("this.props.fetchCartData();",this.props.fetchCartData());
          this.setState({
            messageData: {
              "type": "outpage",
              "icon": "fa fa-check-circle",
              "message": "&nbsp; " + response.data.message,
              "class": "success",
              "autoDismiss": true
            }
          })
          setTimeout(() => {
            this.setState({
              messageData: {},
            })
          }, 3000);
          // console.log("changrCartCount:",response.data.cartCount);
          this.props.changeCartCount(response.data.cartCount);

        })
        .catch((error) => {
          console.log('error', error);
        })
    }
  }//end else websiteModel
  }

  submitCart(event) {
    var id = event.target.id;
    if(localStorage.getItem("websiteModel")=== "FranchiseModel"){
      var selectedSize = event.target.value;
      var size = event.target.getAttribute('mainSize');
      var unit = event.target.getAttribute('unit');
    }
    const userid = localStorage.getItem('user_ID');
    var availableQuantity = event.target.getAttribute('availableQuantity');
    var currProId = event.target.getAttribute('currPro');
    var recentCartData = this.props.recentCartData.length > 0 ? this.props.recentCartData[0].cartItems : [];
    var productCartData = recentCartData.filter((a) => a.product_ID === id);
    var quantityAdded = productCartData.length > 0 ? productCartData[0].quantity : 0;
    var formValues ={};
    if(localStorage.getItem("websiteModel")=== "FranchiseModel"){
      if(selectedSize === size){
         var quantity = 1;
         var totalWeight = selectedSize +" "+unit
         formValues = {
          "user_ID": userid,
          "product_ID": event.target.id,
          "quantity": 1,  
          "selectedSize" : selectedSize,
          "size"         : size,
          "totalWeight"  : totalWeight,      
        }
      }else{
        var quantity    = selectedSize/size;
        var totalWeight = size*quantity +" "+unit;
        formValues = {
          "user_ID"      : userid,
          "product_ID"   : event.target.id,
          "quantity"     : quantity,
          "selectedSize" : selectedSize,
          "size"         : size,
          "totalWeight"  : totalWeight,
        }
      }
      
    }else{      
      formValues = {
        "user_ID": userid,
        "product_ID": event.target.id,
        "quantity": 1,        
      }      
    }

    this.addCart(formValues, quantityAdded, availableQuantity);
    this.setState({
      ['sizeCollage' + currProId]: false
    })
  }
  closeSize(event) {
    var id = event.target.id;
    this.setState({
      ['sizeCollage' + id]: false
    })
  }
  addtowishlist(event) {
    event.preventDefault();

    if (user_ID) {
      var id = event.target.id;
      const userid = localStorage.getItem('user_ID');
      const formValues =
      {
        "user_ID": userid,
        "product_ID": id,
      }
      axios.post('/api/wishlist/post', formValues)
        .then((response) => {
          this.setState({
            messageData: {
              "type": "outpage",
              "icon": "fa fa-check-circle",
              "message": "&nbsp; " + response.data.message,
              "class": "success",
              "autoDismiss": true
            }
          })
          setTimeout(() => {
            this.setState({
              messageData: {},
            })
          }, 3000);
          this.props.getWishData();
        })
        .catch((error) => {
          console.log('error', error);
        })
    }
    else {
      this.setState({
        messageData: {
          "type": "outpage",
          "icon": "fa fa-exclamation-circle",
          // "message": "Need To Sign In, Please <a href='/login'>Sign In</a> First.",
          "message" : "Need To Sign In, Please <a data-toggle=modal data-target=#loginFormModal>Sign In</a> First.",
          "class": "warning",
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
  openModal(event) {
    event.preventDefault();
    var modalID = event.target.id;
    this.setState({
      modalIDNew: { productID: modalID }
    })
  }
  sortProducts(event) {
    event.preventDefault();
    var sortBy = event.target.value;

    if (sortBy === "alphabeticallyAsc") {
      let field = 'productName';
      this.setState({
        products: this.state.products.sort((a, b) => (a[field] || "").toString().localeCompare((b[field] || "").toString()))
      });
    }
    if (sortBy === "alphabeticallyDsc") {
      let field = 'productName';
      this.setState({
        products: this.state.products.sort((a, b) => -(a[field] || "").toString().localeCompare((b[field] || "").toString()))
      });

    }
    if (sortBy === "priceAsc") {
      let field = 'discountedPrice';
      this.setState({
        products: this.state.products.sort((a, b) => a[field] - b[field])
      });
    }
    if (sortBy === "priceDsc") {
      let field = 'discountedPrice';
      this.setState({
        products: this.state.products.sort((a, b) => b[field] - a[field])
      });
    }
  }

  render() {
    //console.log('products11',this.props.products)
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <Message messageData={this.state.messageData} />
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-9 col-xs-9 pull-right NoPadding">
            <label className="col-lg-3 col-md-6 col-sm-9 col-xs-9 NoPadding labeldiv">Sort By</label>
            <select className="sortProducts col-lg-8 col-sm-9 col-md-8 col-xs-9 NoPadding" onChange={this.sortProducts.bind(this)}>
              <option className="hidden" >Relevance</option>
              <option value="alphabeticallyAsc">Name A-Z</option>
              <option value="alphabeticallyDsc">Name Z-A</option>
              <option value="priceAsc">Price Low to High</option>
              <option value="priceDsc">Price High to Low </option>
            </select>
          </div>
        </div>

        <div className="row">
          {
            this.props.products && this.props.products.length > 0 ?
              this.props.products && this.props.products.map((data, index) => {
                var x = this.props.wishList && this.props.wishList.length > 0 ? this.props.wishList.filter((abc) => abc.product_ID === data._id) : [];
                if (x && x.length > 0) {
                  var wishClass = '';
                  var tooltipMsg = 'Remove from wishlist';
                } else {
                  // var wishClass = '-o';
                  // var tooltipMsg = 'Add to wishlist';
                }
                return (
                  <div className="item col-lg-3 col-md-3 col-sm-3 col-xs-3" key={index}>
                    {/* <a href={"/productdetails/" + data.productUrl + "/" + data._id}> */}
                      <div className="">
                        <div className="card">
                          <div className="item-top">
                            <div className="productImg">
                              <button type="submit" id={data._id} title={tooltipMsg} className={"wishIcon fa fa-heart" + wishClass} onClick={this.addtowishlist.bind(this)}></button>
                              {data.discountPercent ? <div className="btn-warning discounttag">{data.discountPercent} % </div> : null}
                              {/* <a href="/" className="product photo product-item-photo collage" tabIndex="-1"> */}
                              <a href={"/productdetails/" + data.productUrl + "/" + data._id} className="product photo product-item-photo collage" tabIndex="-1">

                                <img src={data.productImage[0] ? data.productImage[0] : notavailable} alt="ProductImage" />
                              </a>
                            </div>
                            <div className="productDetails">
                              {
                                this.state['sizeCollage' + data._id] === true ?
                                  <div className="sizeCollage col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <i className="fa fa-times pull-right" id={data._id} onClick={this.closeSize.bind(this)}></i>
                                    {
                                      this.state['relatedProductArray' + data._id] && this.state['relatedProductArray' + data._id].length > 0 ?
                                        this.state['relatedProductArray' + data._id].map((a, i) => {
                                          if (a.size) {
                                            return (
                                              <div className="selectSizeBox">                                                
                                                <span className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 pull-left Nopadding">Select Size</span>
                                                <select class="form-control selectdropdown valid availablesize" currPro={data._id} mainSize={data.size} unit={data.unit} availableQuantity={a.availableQuantity} onClick={this.submitCart.bind(this)} id={a._id} name="size" aria-invalid="false">
                                                  { Array.isArray(data.availableSizes) && data.availableSizes.map((size, index) => {
                                                      return(
                                                          size === 1000?
                                                          <option className="" value={size}>{size}KG</option>
                                                          :
                                                          data.unit === "Box" || data.unit === "Wrap" || data.unit === "Pack" || data.unit==="Pounch" ?
                                                            <option className="" value={size}>{data.unit}&nbsp;of&nbsp;{size}</option>
                                                          :
                                                          <option className="" value={size}>{size}{data.unit}</option>                                                        
                                                      )
                                                      
                                                    })
                                                  }
                                                </select>
                                                <div className="col-lg-12 col-md-12 col-sm-12 pull-left Nopadding prodName">{data.productName}</div>
                                                {data.discountedPrice === data.originalPrice ?
                                                  <div class="col-lg-12 col-md-12 col-sm-12 price Nopadding"><i class="fa fa-inr"></i>&nbsp;{data.originalPrice} &nbsp;                                                    
                                                  </div>
                                                :
                                                  <div class="col-lg-12 col-md-12 col-sm-12 price Nopadding"><i class="fa fa-inr"></i>&nbsp;{data.discountedPrice} &nbsp;
                                                    <span className="discountedPrice">Rs.{data.originalPrice}</span>&nbsp;
                                                    <span className="disscountedPer">({data.discountPercent}% Off)</span>
                                                  </div>
                                                }
                                              </div> 
                                            );
                                          }
                                        })
                                        :
                                        null
                                    }
                                  </div>
                                  :
                                  null
                              }
                              <div className="innerDiv">
                                <div className="product-brand" title={data.brand}>{data.brand}</div>
                                <div className=" product-item-link" title={data.productName}>{data.productName}</div>
                                <div className="col-lg-12 col-md-12 NOpadding">
                                  {
                                    data.discountPercent ?
                                      <div className="col-lg-12 col-md-12 NOpadding">
                                        <span className="oldprice"><i className="fa fa-inr oldprice"></i>&nbsp;{data.originalPrice}</span> &nbsp;
                                        <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.discountedPrice}</span>&nbsp;
                                                                                
                                      </div>
                                      :
                                      <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.originalPrice}</span>
                                  }
                                </div>

                                <div >
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                  {
                                    data.availableQuantity > 0 ?
                                      <button type="submit" color={data.color} id={data._id} productCode={data.productCode} availableQuantity={data.availableQuantity} onClick={this.addtocart.bind(this)} title="Add to Cart" className="homeCart fa fa-shopping-cart">
                                        &nbsp;Add to Cart
                                      </button>
                                      :
                                      <div className="outOfStock">Sold Out</div>
                                  }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    {/* </a> */}
                  </div>
                );
              })
              :

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="wishlistNoProduct col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                  <i className="fa fa-exclamation-triangle"></i>&nbsp;  There is no items in this category.
                </div>
                <a href="/" className="pull-right mt15 wishBack">Back</a>
              </div>
          }


          <div id="productviewmodal" className="modal" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <img src="../../../sites/currentSite/images/Icon.png" alt="Icon" />
                  <button type="button" className="close modalclosebut" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <ProductDetailsHomeView productInfo={this.state.modalIDNew} />
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
          </div>
          <div id="loginFormModal" className="modal in">
                <div className="modal-dialog">                                        
                    <div className="modal-content loginModalContent">                            
                        <div className="modal-body">   
                        <button type="button" className="close"  data-dismiss="modal" aria-hidden="true">&times;</button>                                                            
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
export default connect(mapStateToProps, mapDispachToProps)(SearchProductCollage);