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
import { bindActionCreators } from 'redux';
import { getCartData } from '../../actions/index';
import { size } from 'underscore';
import notavailable from '../../../sites/currentSite/images/notavailable.jpg';
import Login          from '../../systemSecurity/Login.js';
import SignUp         from '../../systemSecurity/SignUp.js';
import ForgotPassword from '../../systemSecurity/ForgotPassword.js';
const user_ID = localStorage.getItem("user_ID");

class BigSaleCollageView extends Component {
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
    // console.log("componentDidMount:",this.props.products);

    this.setState({
      products: this.props.products,
      masterLimitProducts: this.props.products
    });
    console.log("Products array :",this.state.products);

  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps:==",nextProps);
    if(localStorage.getItem('websiteModel')=== "FranchiseModel"){
    for(var i=0;i<nextProps.products.length;i++){      
        var availableSizes = [];  
        var availablePack = [];       
        if(nextProps.products[i].size){ 
          // availableSizes.push(
          //   {
          //     "productSize": nextProps.products[i].size*1,
          //     "packSize"   :1,
          //   },
          //   {
          //     "productSize": nextProps.products[i].size*2,
          //     "packSize"   :2,
          //   },
          //   {
          //     "productSize": nextProps.products[i].size*4,
          //     "packSize"   :4,
          //   },
          // )
          availableSizes.push(nextProps.products[i].size*1);
          availableSizes.push(nextProps.products[i].size*2);
          availableSizes.push(nextProps.products[i].size*4); 
          nextProps.products[i].availableSizes = availableSizes;
          // console.log("availableSizes:---",availableSizes);  
                     
        }
    }
  }
    
    this.setState({
      products: nextProps.products,
      masterLimitProducts: nextProps.products,
      categoryDetails: nextProps.categoryDetails
    });
  }
  getProductData(id, clr) {
    axios.get("/api/products/get/productcode/" + id)
      .then((response) => {
        let mymap = new Map();
        var colorFilter = response.data.filter(x => x.color === clr);
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
          relatedProductArray: unique,
          productSizeArray: unique,
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }


  addtowishlist(event) {
    event.preventDefault();
    if (user_ID) {

      var id = event.target.id;
      const userid = localStorage.getItem('user_ID');
      const formValues = {
        "user_ID": userid,
        "product_ID": id,
      }
      axios.post('/api/wishlist/post', formValues)
        .then((response) => {

          var previousUrl = window.location.href;

          localStorage.setItem("previousUrl", previousUrl);
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
      var previousUrl = window.location.href;
      localStorage.setItem("previousUrl",previousUrl);
      if(localStorage.getItem('showLoginAs')==="modal"){
        $('#loginFormModal').show();
        $("#pageOpacity").show(); 
        }else{
        this.setState({
          messageData: {
            "type": "outpage",
            "icon": "fa fa-exclamation-circle",
            "message": "Need To Sign In, Please <a href='/login'>Sign In</a> First.",
            // "message" : "Need To Sign In, Please <a data-toggle=modal data-target=#loginFormModal>Sign In</a> First.",          
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
      if(localStorage.getItem('showLoginAs')==="modal"){
        $('#loginFormModal').show();
        }else{
        this.setState({
          messageData: {
            "type": "outpage",
            "icon": "fa fa-exclamation-circle",
            "message": "Need To Sign In, Please <a href='/login'>Sign In</a> First.",
            // "message" : "Need To Sign In, Please <a data-toggle=modal data-target=#loginFormModal>Sign In</a> First.",          
            
            "class": "danger",
            "autoDismiss": true
          }
        })
        setTimeout(() => {
          this.setState({
            messageData: {},
          })
        }, 3000);
      }//end else
    }
  }
  
  addCart(formValues, quantityAdded, availableQuantity) {
    // console.log("inside addCart");
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

          // console.log("changrCartCount:",response.data.cartCount);
          // this.props.changeCartCount(response.data.cartCount);

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
          // console.log("Response changeCartCount:",response);
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
          // this.props.changeCartCount(response.data.cartCount);

        })
        .catch((error) => {
          console.log('error', error);
        })
    }
  }//end else websiteModel
  }

  submitCart(event) { 
    const user_ID = localStorage.getItem('user_ID');
    if(user_ID){
    var id = event.target.id;
    console.log("Id:",id);
    if(localStorage.getItem("websiteModel")=== "FranchiseModel"){
      var selectedSize = $('#'+id+"-size").val();
      // var selectedSize = event.target.value;
      console.log("selectedSize:",selectedSize);
      var size = event.target.getAttribute('mainSize');
      console.log("size:",size);
      var unit = event.target.getAttribute('unit');
      // console.log("unit:",unit);
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
  }else{
    if(localStorage.getItem('showLoginAs')==="modal"){
      $('#loginFormModal').show();
      $(".modal-backdrop").remove();
      $("#pageOpacity").show(); 
      }else{
      this.setState({
        messageData: {
          "type": "outpage",
          "icon": "fa fa-exclamation-circle",
          "message": "Need To Sign In, Please <a href='/login'>Sign In</a> First.",
          // "message" : "Need To Sign In, Please <a data-toggle=modal data-target=#loginFormModal>Sign In</a> First.",          
          
          "class": "danger",
          "autoDismiss": true
        }
      })
      setTimeout(() => {
        this.setState({
          messageData: {},
        })
      }, 3000);
    }//end else
  }
  } 


  closeSize(event) {
    var id = event.target.id;
    this.setState({
      ['sizeCollage' + id]: false
    })
  }
  colseModal(event){
    console.log("inside close");
    $('#loginFormModal').hide();
  }
  render(){
    // console.log("Inside bigSaleView render");
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
        <Message messageData={this.state.messageData} />
        <div className="row">
          {
            Array.isArray(this.state.products) && this.state.products.length > 0 ? 
            Array.isArray(this.state.products) && this.state.products.map((data, index) => {                
              

                var x = this.props.wishList && this.props.wishList.length > 0 ? this.props.wishList.filter((abc) => abc.product_ID === data._id) : [];
                var wishClass = '';
                var tooltipMsg = '';
                if (x && x.length > 0) {
                  wishClass = '';
                  tooltipMsg = 'Remove from wishlist';
                } else {
                  wishClass = '-o';
                  tooltipMsg = 'Add To Wishlist';
                }
                return (                  
                  <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={index}>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                      <div className="card col-lg-12 col-md-12 col-sm-12 col-xs-8 col-xs-offset-2 productInnerWrap NOpadding">
                        <div className="item-top col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                          <div className="productImg col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                            <button type="submit" id={data._id} title={tooltipMsg} className={"wishIcon fa fa-heart" + wishClass} onClick={this.addtowishlist.bind(this)}></button>
                            {data.discountPercent ? <div className="btn-warning discounttag">{data.discountPercent} % </div> : null}
                            <a className="product photo product-item-photo collage" tabIndex="-1" href={"/productdetails/" + data.productUrl + "/" + data._id}>
                              <img src={data.productImage[0] ? data.productImage[0] : notavailable} alt="ProductImg" />
                            </a>
                          </div>
                          <div className="productDetails  col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                             
                            <div className="innerDiv">
                              <div className="product-brand" title={data.brand}>{data.brand}</div>
                              <div className="product-item-link" title={data.productName}>{data.productName} (<span className="marathiName">{data.shortDescription}</span>) </div>
                              <div className="col-lg-12 col-md-12 NOpadding">
                                {
                                  data.discountPercent ?
                                    <div className="col-lg-12 col-md-12 NOpadding">
                                      <span className="oldprice"><i className="fa fa-inr oldprice"></i>&nbsp;{data.originalPrice}</span> &nbsp;
                                      <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.discountedPrice} / {data.size}&nbsp;<span className="ProSize">{data.unit}</span></span> &nbsp;                                     
                                    </div>
                                    :
                                    localStorage.getItem("websiteModel")=== "FranchiseModel"?
                                      <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.originalPrice} / Pack of {data.size}&nbsp;<span className="ProSize">{data.unit}</span></span>
                                    :
                                      <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.originalPrice} / {data.size}&nbsp;<span className="ProSize">{data.unit}</span></span>
                                }
                              </div>
                              
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                                  
                                  {
                                    localStorage.getItem("websiteModel")=== "FranchiseModel"?
                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btnWrap NoPadding">                                                                             
                                        <div className="selectSizeBox col-lg-6 col-md-6 col-sm-6 col-xs-6 NoPadding ">                                                                              
                                        <select class="selectdropdown valid availablesize col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding" currPro={data._id} id={data._id +"-size"} mainSize={data.size} unit={data.unit} name="size" aria-invalid="false">
                                          { Array.isArray(data.availableSizes) && data.availableSizes.map((size, index) => {
                                              return( 
                                                // <option className="selectedSize" value={availablesize.productSize}>{availablesize.packSize} Pack</option>
                                                  size === 1000?
                                                  
                                                  <option className="" value={size}> 1 KG</option>
                                                  :
                                                  data.unit === "Box" || data.unit === "Wrap" || data.unit === "Pack" || data.unit==="pounch" ?
                                                    // <option className="selectedSize" value={size}>{data.unit}&nbsp;of&nbsp;{size}</option>
                                                    // <option className="selectedSize" value={size}>{size} Pack</option>
                                                    <option className="selectedSize" value={size}>{size}&nbsp;{data.unit}</option>
                                                      :
                                                  <option className="selectedSize" value={size}>{size}&nbsp;{data.unit}</option>                                                        
                                              )                                                        
                                            })
                                          }
                                        </select>                                     
                                      </div>    
                                      <button type="submit" color={data.color} id={data._id} productCode={data.productCode} availableQuantity={data.availableQuantity} currPro={data._id} mainSize={data.size} unit={data.unit}  onClick={this.submitCart.bind(this)} 
                                        title="Add to Cart" className="col-lg-6 col-md-6 col-sm-6 col-xs-6 homeCart fa fa-shopping-cart">                                                                         
                                         &nbsp;Add
                                      </button>            
                                    
                                    </div>
                                    :
                                    data.availableQuantity > 0 ?
                                      <button type="submit" color={data.color} id={data._id} productCode={data.productCode} availableQuantity={data.availableQuantity} onClick={this.addtocart.bind(this)} title="Add to Cart" className="homeCart fa fa-shopping-cart pull-right">
                                        &nbsp;Add To Cart
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
                  <img src="../../../sites/currentSite/images/Icon.png" alt="IconImg" />
                  <button type="button" className="close modalclosebut" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title modalheadingcont"> </h4>
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
                        <button type="button" className="close"  data-dismiss="modal" onClick={this.colseModal.bind(this)} aria-hidden="true">&times;</button>                                                            
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
export default connect(mapStateToProps, mapDispachToProps)(BigSaleCollageView);