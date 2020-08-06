import React, { Component } from 'react';
import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { getCartData } from '../../actions/index';
import Loadable from 'react-loadable';
import axios from 'axios';
import { connect } from 'react-redux';
import "../../../sites/currentSite/blocks/EcommerceProductCarousel.css";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductDetailsHomeView from "../../pages/ProductDetailsEcommerce/ProductDetailsHomeView.js";
import notavailable from '../../../sites/currentSite/images/notavailable.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import Login          from '../../systemSecurity/Login.js';
import SignUp         from '../../systemSecurity/SignUp.js';
import ForgotPassword from '../../systemSecurity/ForgotPassword.js';
import Message from '../Message/Message.js';
const OwlCarousel = Loadable({
  loader: () => import('react-owl-carousel'),
  loading() {
    return <div className="col-sm-12 col-xs-12 col-lg-2 col-lg-offset-5 col-md-12 loadingImg"><img src="../images/loadersglms.gif" className="img-responsive" alt="loading" /></div>
  }
});

const user_ID = localStorage.getItem("user_ID");
class EcommerceProductCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 5
        }
      },
      responsive2: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 4
        }
      },
      productType: props.type,
      newProducts: [],
      modalIDNew: [],
      sizeCollage: false,
      relatedProductArray: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("localStorage:",localStorage.getItem('websiteModel'));
    if(localStorage.getItem('websiteModel')=== "FranchiseModel"){
      for(var i=0;i<nextProps.newProducts.length;i++){      
          var availableSizes = [];         
          if(nextProps.newProducts[i].size){
            // availableSizes.push(
            //   {
            //     "productSize": nextProps.newProducts[i].size*1,
            //     "packSize"   :1,
            //   },
            //   {
            //     "productSize": nextProps.newProducts[i].size*2,
            //     "packSize"   :2,
            //   },
            //   {
            //     "productSize": nextProps.newProducts[i].size*4,
            //     "packSize"   :4,
            //   },
            // )
            availableSizes.push(nextProps.newProducts[i].size*1);
            availableSizes.push(nextProps.newProducts[i].size*2);
            availableSizes.push(nextProps.newProducts[i].size*4); 
            nextProps.newProducts[i].availableSizes = availableSizes; 
                    
          }
      }
    } 
      this.setState({
        newProducts: nextProps.newProducts,        
        type: nextProps.type
      });
    }

  componentDidMount() {
    const websiteModel = localStorage.getItem("websiteModel");      
    const showLoginAs = localStorage.getItem("showLoginAs");      
    this.setState({showLoginAs: showLoginAs,websiteModel:websiteModel}); 
  }  
  addtocart(event) {
    event.preventDefault();
    var productCode = event.target.getAttribute('productCode');
    var clr = event.target.getAttribute('color');

    if (user_ID) {
      var id = event.target.id;
      const userid = localStorage.getItem('user_ID');
      var availableQuantity = event.target.getAttribute('availableQuantity');
      var recentCartData = this.props.recentCartData.length > 0 ? this.props.recentCartData[0].cartItems : [];
      var productCartData = recentCartData.filter((a) => a.product_ID === id);
      var quantityAdded = productCartData.length > 0 ? productCartData[0].quantity : 0;

      const formValues = {
        "user_ID": userid,
        "product_ID": event.target.id,
        "quantity": 1,
      }
      // this.getProductData(productCode, clr);
      axios.get("/api/products/get/productcode/" + productCode)
        .then((response) => {
          console.log('getProductData', response.data);
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
          // console.log('unique', unique);
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
      if(localStorage.getItem('showLoginAs')==="modal"){
        $('#loginFormModal').show();
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

  addCart(formValues, quantityAdded, availableQuantity){
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
    const user_ID = localStorage.getItem('user_ID');
    if(user_ID){
      if(this.props.recentCartData[0] && this.props.recentCartData[0].cartItems.length>0){
        var cartLength = this.props.recentCartData[0].cartItems.length;
        var productId = event.target.id;
        for(let i=0;i<cartLength;i++){
            if(this.props.recentCartData[0].cartItems[i].product_ID === productId){
              this.setState({
                messageData: {
                  "type": "outpage",
                  "icon": "fa fa-exclamation-circle",
                  "message": "This product is already in your cart",       
                  "class": "success",
                  "autoDismiss": true
                }
              })
              setTimeout(() => {
                this.setState({
                  messageData: {},
                })
              }, 3000);
              break;
            }//end if
        }//end for loop
    }
    var id = event.target.id;
    if(localStorage.getItem("websiteModel")=== "FranchiseModel"){
      var selectedSize = $('#'+id+"-size").val();
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

  // closeSize(event) {
  //   var id = event.target.id;
  //   this.setState({
  //     ['sizeCollage' + id]: false
  //   })
  // }

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
          // console.log('res', response.data.message);
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
        
        this.props.getWishData();
        })
        .catch((error) => {
          console.log('error', error);
        })
    }
    else {      
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
  getCategoryID(event) {
    event.preventDefault();
    // var id = event.target.id;
  }
  openModal(event) {
    event.preventDefault();
    var modalID = event.target.id;
    this.setState({
      modalIDNew: { productID: modalID, productType: this.state.productType }
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
  removeModalBackDrop(event){
    $(".modal-backdrop").hide();
    $("#pageOpacity").show(); 
  }
  render() {
    // const token = localStorage.getItem("user_ID");
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20" id="flashsalediv">
        <div className="row">
          <Message messageData={this.state.messageData} />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 productcomponentheading text-center">
              <div className="producttextclass  col-lg-2">
                <h3 className="row">
                  <b>{this.props.title}</b>
                </h3>
              </div>
              
              {/* <div className="col-lg-5 producttimer producttimerposition">
                <OwlCarousel
                  className="owl-theme customnNavButtoncaro1"
                  margin={0}
                  nav={true}
                  responsive={this.state.responsive2}
                  autoplay={true}
                  autoplayHoverPause={true}
                >
                  {
                    this.props.categories && this.props.categories.length > 0 ?
                      this.props.categories.map((data, index) => {
                        return (
                          <div className="item" key={index}>
                            <span className="col-lg-12 row  productcarotext1" id={data._id} onClick={this.getCategoryID.bind(this)}>{data.category}</span>//
                          </div>
                        );
                      })
                      :
                      null
                  }
                </OwlCarousel>
              </div> */}
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
          <div className="tab-content customTabContent">
            <div id="home" className="tab-pane fade in active ecommerceTabContent exclusiveProduct">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50 mb50">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <OwlCarousel
                    className="owl-theme customnNavButton"
                    margin={0}
                    nav={true} 
                    responsive={this.state.responsive}
                    autoplay={true}
                    autoplayHoverPause={true}
                  >
                    {
                      Array.isArray(this.state.newProducts) && this.state.newProducts.length > 0 ?
                        this.state.newProducts.map((data, index) => {
                          var x = this.props.wishList && this.props.wishList.length > 0 ? this.props.wishList.filter((abc) => abc.product_ID === data._id) : [];
                           var wishClass = '';
                            var tooltipMsg = '';
                          if(x && x.length > 0){
                             wishClass = '';
                             tooltipMsg = 'Remove from wishlist';
                          }else{
                             wishClass = '-o';
                             tooltipMsg = 'Add To Wishlist';
                          }
                          return (
                            <div className="item col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                              {/* <a href=""> */}
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
                                  <div className="card blockCard col-lg-12 col-md-12 col-sm-12 col-xs-10 productInnerWrap NoPadding">
                                    <div className="item-top col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
                                      <div className="productImg col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
                                        <button type="submit" id={data._id} title={tooltipMsg} className={"wishIcon fa fa-heart"+wishClass} onClick={this.addtowishlist.bind(this)}></button>
                                        {data.discountPercent ? <div className=" discounttag">{data.discountPercent} % </div> : null} 
                                        <a href={"/productdetails/"+data.productUrl+"/" + data._id} className="product photo product-item-photo" tabIndex="-1">
                                          <img src={data.productImage[0] ? data.productImage[0] : notavailable} />
                                        </a>
                                      </div>
                                      <div className="productDetails">                                      
                                        <div className="innerDiv">
                                          <div className="product-brand" title={data.brand}>{data.brand}</div>
                                          <div className="product-item-link" title={data.productName}>{data.productName} (<span className="marathiName">{data.shortDescription}</span>) </div>
                                          <div className="col-lg-12 col-md-12 NOpadding">
                                            {
                                              data.discountPercent ?
                                                <div className="col-lg-12 col-md-12 NOpadding">
                                                  <span className="oldprice"><i className="fa fa-inr oldprice"></i>&nbsp;{data.originalPrice}</span> &nbsp;
                                                  <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.discountedPrice}</span> &nbsp;                                     
                                                </div>
                                                :
                                                localStorage.getItem("websiteModel")=== "FranchiseModel"?
                                                  <span className="price"><i className="fa fa-inr"></i>&nbsp;{data.originalPrice} / {data.size}&nbsp;<span className="ProSize">{data.unit}</span></span>
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
                                                                <option className="selectedSize" value={size}>{data.unit}&nbsp;of&nbsp;{size}</option>
                                                              :
                                                              <option className="selectedSize" value={size}>{size}&nbsp;{data.unit}</option>                                                                                                                    
                                                          )                                                        
                                                        })
                                                      }
                                                    </select>                                     
                                                  </div>   
                                                
                                                {/* <button type="submit" color={data.color} id={data._id} productCode={data.productCode} availableQuantity={data.availableQuantity} onClick={this.addtocart.bind(this)}  */}
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
                              {/* </a> */}
                            </div>
                          );
                        })
                        : ''
                    }
                  </OwlCarousel>
                </div>
                <div className="modal " id={"productviewmodal" + this.state.productType} role="dialog">
                  <div className="modal-dialog modal-lg dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <img src="../../../sites/currentSite/images/Icon.png" alt="" />
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
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    recentCartData :  state.recentCartData
  }
}
const mapDispachToProps = (dispatch) => {
  return  bindActionCreators({ fetchCartData: getCartData }, dispatch)
}
export default connect(mapStateToProps, mapDispachToProps)(EcommerceProductCarousel);