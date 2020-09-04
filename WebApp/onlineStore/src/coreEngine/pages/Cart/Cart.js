import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Loader       from "../../common/loader/Loader.js";

import SmallBanner          from '../../blocks/SmallBanner/SmallBanner.js';
import CartProducts         from '../../blocks/CartProducts/CartProducts.js';
import topBannerImg         from '../../../sites/currentSite/images/cartBanner.png';
import Ecommercenewproductcaro from '../../blocks/ProductCarouselEcommerce/Ecommercenewproductcaro.js';
import "../../../sites/currentSite/pages/Cart.css";


// import $                    from 'jquery';
// import axios                from 'axios';
// import GiftOption           from '../../blocks/GiftOption/GiftOption.js';
// import Discount             from '../../blocks/Discount/Discount.js';
// import EstimateShipping     from '../../blocks/EstimateShipping/EstimateShipping.js';

class Cart extends Component{
    constructor(props) {
        super(props);
        this.state={
            bannerData : {
                title : "MY SHOPPING CART",
                breadcrumb : 'My Shopping Cart',
                backgroungImage : topBannerImg,
            },
            wishlistProductsloading: true,
            products : [],
        }
    } 
    componentDidMount(){
        this.getWishlistData();
    }
    getWishlistData() {
        // $('.fullpageloader').show();
        var user_ID = localStorage.getItem('user_ID');    
        axios.get('/api/wishlist/get/userwishlist/' + user_ID)
          .then((response) => {
            // $('.fullpageloader').hide();
            console.log("response:---",response.data);           
            response.data.map((a, i) => {
              axios.get('/api/products/get/one/' + a.product_ID)
                .then((res) => {
                  // console.log('data1', res);
                  var products = this.state.products;
                  products.push({
                    "_id"              : res.data._id,
                    "productName"      : res.data.productName,
                    "productUrl"       : res.data.productUrl,
                    "originalPrice"    : res.data.originalPrice,
                    "availableQuantity": res.data.availableQuantity,
                    "size"             : res.data.size,
                    "shortDescription" : res.data.shortDescription,
                    "unit"             : res.data.unit, 
                    "bestSeller"       : res.data.bestSeller,
                    "brand"            : res.data.brand,
                    "category"         : res.data.category,
                    "currency"         : res.data.currency,
                    "discountPercent": res.data.discountPercent,
                    "discountedPrice": res.data.discountedPrice,
                    "productCode": res.data.productCode,
                    "productImage": res.data.productImage,
                    "product_ID": res.data._id,
                    "wishlist_ID": a._id
                  });
                  this.setState({
                    wishlistProductsloading:false,
                    wishlistedProducts : products,
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

    render(){
        // console.log("this.state.wishlistedProducts---",this.state.wishlistedProducts);
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <SmallBanner bannerData={this.state.bannerData}/>
                    <CartProducts />
                    {/* <WishlistBlock /> */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 homeRow">
                        {
                        this.state.wishlistProductsloading ?  
                        null
                        // <Loader type="carouselloader" productLoaderNo = {4}/>      
                        :
                        Array.isArray(this.state.wishlistedProducts) && this.state.wishlistedProducts.length > 0 ?                        
                            <Ecommercenewproductcaro  
                                title={'Wishlist'} 
                                newProducts={this.state.wishlistedProducts} 
                                type={'wishlist'} 
                                getWishData={this.getWishlistData.bind(this)}   
                                // wishList={this.state.wishList} 
                                // categories={this.state.categories} 
                                // changeProductCateWise={this.changeProductCateWise.bind(this)}/>
                                ></Ecommercenewproductcaro>
                            : null
                        
                        }
                    </div>
                    {/* <GiftOption /> */}
                    {/* <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                            <Discount />
                            <EstimateShipping />
                        </div>
                    </div> */}
                    
                </div>
            </div>
        )
    }
}

export default Cart;