import React, { Component } from 'react';
import "../../../sites/currentSite/blocks/ProductCollageView.css";
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCartData } from '../../actions/index';
// import ProductDetailsHomeView from "../../pages/ProductDetailsEcommerce/ProductDetailsHomeView.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import $ from 'jquery';
import Message from '../Message/Message.js';
// import { size } from 'underscore';
import notavailable from '../../../sites/currentSite/images/notavailable.jpg';
import AssuredImg from '../../../sites/currentSite/images/assured.png';

import './ProductBlock.css';
const user_ID = localStorage.getItem("user_ID");

class SingleProductBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      data:{},
      masterLimitProducts: [],
      categoryDetails: [],
      modalIDNew: [],
      sizeCollage: false,
      relatedProductArray: [],
      productSettings:{}
    }
  }
  async componentDidMount() {
    await this.props.fetchCartData();
    // console.log("1.componentDidMount:",this.props.products);

    this.setState({
      products: this.props.products,
      masterLimitProducts: this.props.products
    });
    
  }

  componentWillReceiveProps(nextProps) {
    // console.log("3.componentWillReecived props");
    console.log("singleProduct Block componentWillReceiveProps :==",nextProps); 
//     if(localStorage.getItem('websiteModel')=== "FranchiseModel"){
//     for(var i=0;i<nextProps.products.length;i++){      
//         var availableSizes = [];             
//         if(nextProps.products[i].size){          
//           availableSizes.push(nextProps.products[i].size*1);
//           availableSizes.push(nextProps.products[i].size*2);
//           availableSizes.push(nextProps.products[i].size*4); 
//           nextProps.products[i].availableSizes = availableSizes;                     
//         }
//     }
//   }
    
//     this.setState({
//       products: nextProps.products,
//       masterLimitProducts: nextProps.products,
//       categoryDetails: nextProps.categoryDetails,
//       productSettings: nextProps.productSettings
//     });
    this.setState({
      data : nextProps.data,
      index: nextProps.index,
      productSettings: nextProps.productSettings
      
    });
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

//   openModal(event) {
//     event.preventDefault();
//     var modalID = event.target.id;
//     this.setState({
//       modalIDNew: { productID: modalID }
//     })
//   }

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
      // console.log("this.props.recentCartData[0].cartItems:",this.props.recentCartData[0].cartItems);
    var id = event.target.id;
    // console.log("Id:",id);
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
        quantity    = selectedSize/size;
        totalWeight = size*quantity +" "+unit;
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
  showRatingBlock(event){

  }

  render(){
    // console.log("Inside product collage view");
    var x = this.props.wishList && this.props.wishList.length > 0 ? this.props.wishList.filter((abc) => abc.product_ID === this.state.data._id) : [];
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
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
        <Message messageData={this.state.messageData} />
        <div className="row">         
            <div className="col-lg-12 col-md-3 col-sm-4 col-xs-6 customePadding"  key={this.state.index}>
                <div className="productBlock col-lg-12 col-md-12 col-sm-12 col-xs-12 productInnerWrap NOpadding">
                <div className="item-top col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                    <div className="productImg col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                    {this.state.productSettings.displayWishtlistIcon === true?
                        <button type="submit" id={this.state.data._id} title={tooltipMsg} className={"wishIcon fa fa-heart" + wishClass} onClick={this.addtowishlist.bind(this)}></button>
                    :null
                    }
                    {this.state.data.discountPercent ? <div className="btn-warning discounttag">{this.state.data.discountPercent} % </div> : null}
                    <a className="product photo product-item-photo collage" tabIndex="-1" href={"/productdetails/" + this.state.data.productUrl + "/" + this.state.data._id}>
                        <img src={this.state.data.productImage ? this.state.data.productImage[0] : notavailable} alt="ProductImg" />
                    </a>
                    </div>
                    <div className="productDetails col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                             
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerDiv">
                        {this.state.productSettings.displayBrand === true ?
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 product-brand" title={this.state.data.brand}>{this.state.data.brand}</div>
                        :null
                        }
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding product-item-link" title={this.state.data.productName}>{this.state.data.productName} 
                        {this.state.data.shortDescription ?                                                        
                            <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding marathiName"><span className="bracket">(</span> {this.state.data.shortDescription} <span className="bracket">)</span></span>                        
                        :null
                        }
                        </div>
                        <div className="col-lg-12 col-md-12 NOpadding">
                        {
                            localStorage.getItem("websiteModel")=== "FranchiseModel"?                                  
                            this.state.data.discountPercent ?                                      
                                <span className="price"><span className="oldprice"><i className="fa fa-inr "></i>&nbsp;{this.state.data.originalPrice} </span>&nbsp; <i className="fa fa-inr "></i> {this.state.data.discountedPrice} / {this.state.data.size}&nbsp;<span className="ProSize">{this.state.data.unit}</span></span>       
                            :
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                <span className="price"><i className="fa fa-inr price"></i>&nbsp;{this.state.data.originalPrice} / {this.state.data.size}&nbsp;<span className="ProSize">{this.state.data.unit}</span></span> &nbsp;                                       
                                </div>

                            :                                    
                            this.state.data.discountPercent ?
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                <span className="price"><span className="oldprice"><i className="fa fa-inr "></i>&nbsp;{this.state.data.originalPrice} </span><i className="fa fa-inr"></i>&nbsp;{this.state.data.discountedPrice} / {this.state.data.size}&nbsp;<span className="ProSize">{this.state.data.unit}</span></span>
                            </div>
                            :  
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                <span className="price"><i className="fa fa-inr price"></i>&nbsp;{this.state.data.originalPrice} /{this.state.data.size}&nbsp;<span className="ProSize">{this.state.data.unit}</span></span> &nbsp;                                      
                            </div>                              

                        }
                        </div>
                        {this.state.productSettings.displayRating === true ?
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 displayRating customePadding">
                            <span id="productRating" className="col-lg-3 col-md-3 col-sm-3 col-xs-3 NoPadding" onMouseOver={this.showRatingBlock.bind(this)} >
                                <div className="showRating col-lg-12 col-md-12 col-sm-12 col-xs-12"> 4 <i className="fas fa-star"></i></div>                                        
                            </span>  
                            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding ratingBlock">
                                <RatingBlock />
                            </div>                                   */}
                            <span className="col-lg-5 col-md-5-col-sm-5 col-xs-5 customePadding">(&nbsp;162 &nbsp;)</span>
                            {this.state.productSettings.displayAssuranceIcon === true ?
                                <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 NoPadding assurenceIcon">
                                <img className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding" src={AssuredImg} alt="Assured Img" />                                      </span>
                            :null
                            }
                        </div>
                        :null
                        }                              
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                                  
                            {
                            localStorage.getItem("websiteModel")=== "FranchiseModel"?
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btnWrap NoPadding">                                                                             
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 selectSizeBox NoPadding ">                                                                              
                                <select className="col-lg-12 col-md-12 col-sm-12 col-xs-12 selectdropdown valid availablesize NoPadding" currPro={this.state.data._id} id={this.state.data._id +"-size"} mainSize={this.state.data.size} unit={this.state.data.unit} name="size" aria-invalid="false">
                                    { Array.isArray(this.state.data.availableSizes) && this.state.data.availableSizes.map((size, index) => {
                                        return( 
                                        // <option className="selectedSize" value={availablesize.productSize}>{availablesize.packSize} Pack</option>
                                        
                                            size === 1000?                                                  
                                            <option className="" value={size}> 1 KG</option>
                                            :
                                            this.state.data.unit === "Box" || this.state.data.unit === "Wrap" || this.state.data.unit === "Pack" || this.state.data.unit==="pounch" ?                                                    
                                            <option className="selectedSize" value={size}>{size} Pack</option>
                                                :
                                            <option className="selectedSize" value={size}>{size}&nbsp;{this.state.data.unit}</option>                                                        
                                        )                                                        
                                    })
                                    }
                                </select>                                     
                                </div>    
                                <button type="submit" color={this.state.data.color} id={this.state.data._id} productCode={this.state.data.productCode} availableQuantity={this.state.data.availableQuantity} currPro={this.state.data._id} mainSize={this.state.data.size} unit={this.state.data.unit}  onClick={this.submitCart.bind(this)} 
                                title="Add to Cart" className="col-lg-6 col-md-6 col-sm-6 col-xs-6 homeCart fa fa-shopping-cart">                                                                         
                                    &nbsp;Add
                                </button>                          
                            </div>
                            :
                            this.state.data.availableQuantity > 0 ?
                                <button type="submit" id={this.state.data._id} className="homeCart fa fa-shopping-cart pull-right" color={this.state.data.color} productCode={this.state.data.productCode} availableQuantity={this.state.data.availableQuantity} onClick={this.addtocart.bind(this)} title="Add to Cart" >
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

              {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="wishlistNoProduct col-lg-12 col-md-12 col-sm-12 col-xs-12 mt25">
                  <i className="fa fa-exclamation-triangle"></i>&nbsp;  There is no items in this category.
                </div>
                <a href="/" className="pull-right mt15 wishBack">Back</a>
              </div>
          } */}
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
export default connect(mapStateToProps, mapDispachToProps)(SingleProductBlock);