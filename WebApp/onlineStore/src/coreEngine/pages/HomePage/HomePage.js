import React, { Component }         from 'react';
// import { connect }                from 'react-redux';
import $                            from 'jquery';
import EcommerceProductCarousel     from "../../blocks/ProductCarouselEcommerce/EcommerceProductCarousel.js";
import Ecommercenewproductcaro      from "../../blocks/ProductCarouselEcommerce/Ecommercenewproductcaro.js";
import EcommerceDiscountedProducts  from "../../blocks/ProductCarouselEcommerce/EcommerceDiscountedProducts.js";
import EcommerceBanner              from "../../blocks/Banner/EcommerceBanner.js";
import NewDiscount                  from "../../blocks/NewDiscount/NewDiscount.js";
import Marketing                    from "../../blocks/Marketing/Marketing.js";
import ProductDivider               from "../../blocks/ProductDivider/ProductDivider.js";
import SaleProductDivider           from "../../blocks/ProductDivider/SaleProductDivider.js";
import WhychooseUs                  from "../../blocks/WhychooseUs/WhychooseUs.js";
import AskPincode                   from "../../blocks/AskPincode/AskPincode.js";
import HomePageBanner2              from "../../blocks/unimandaiBlock/HomePageBanner2/HomePageBanner2.js";
import FreshFoodBlock               from "../../blocks/unimandaiBlock/FreshFoodBlock/FreshFoodBlock.js";
import                              "../../../sites/currentSite/pages/HomePage.css";
import axios                        from 'axios';
import Loader                       from "../../common/loader/Loader.js";
import Blogs                        from "../../blocks/Blogs/Blogs.js";
import Ceo                          from "../../blocks/CEO/Ceo.js";

class HomePage extends Component {
    constructor(props){
    super(props);
      this.state = {
        featuredProducts        : [],
        discountedProducts      : [],
        exclusiveProducts       : [],
        categories              : [],
        exclusiveprloading      : true,
        discountedProductsloading   : true,
        featuredproductsloading : true,
        askPincodeToUser        : "",
        userPincode             : "",
        DeliveryStatus          : "",
      };
      // this.featuredProductData();
      // this.exclusiveProductsData();
      // this.newProductsData();
      // this.bestSellerData();
    }  
    componentDidMount() {
      // console.log("2.Didmount askPincodeToUser:");
      const preferences = localStorage.getItem("websiteModel");      
      const showLoginAs = localStorage.getItem("showLoginAs");      
      this.setState({"askPincodeToUser" : preferences}); 

      // if(localStorage.getItem('flag')=== null){
      //   localStorage.setItem('flag','false');
      // }

      // if(localStorage.getItem('flag')=== null){
      //   localStorage.setItem('flag','false');
      //   import("../../blocks/AskPincode/AskPincode.js")
      //   .catch(error => {
      //     console.error('AskPincode not yet supported');
      //   });
      // } 
     
      this.featuredProductData();
      this.exclusiveProductsData();
      this.discountedproductsData();
      // this.bestSellerData();
      this.getCategories();
      this.getWishData();       
  }

    componentWillMount(){
      // console.log("1.wilmount askPincodeToUser:");  
      const preferences = localStorage.getItem("preferences");
      // console.log("wilmount askPincodeToUser:",preferences);      
      this.setState({"askPincodeToUser" : preferences});  
         
    }
    featuredProductData(){
      var productType1 = 'featured';
      
      axios.get("/api/products/get/listbytype/"+productType1)
            .then((response)=>{
              // console.log('featuredProducts = ' , response.data)
              this.setState({
                featuredproductsloading:false,
                featuredProducts : response.data
              })
            })
            .catch((error)=>{
                // console.log('error', error);
            })

    }
    exclusiveProductsData(){
      var productType2 = 'exclusive';
      axios.get("/api/products/get/listbytype/"+productType2)
            .then((response)=>{
              // console.log('exclusiveProductsData = ' , response.data)

              this.setState({
                exclusiveprloading:false,
                exclusiveProducts : response.data
              })
            })
            .catch((error)=>{
                // console.log('error', error);
            })
    }
    discountedproductsData(){
      var productType3 = 'discounted';
      console.log('productType3==>', productType3);
      axios.get("/api/products/get/listbytype/"+productType3)
            .then((response)=>{
              // console.log('discounted prod response==>', response);
              this.setState({
                discountedProductsloading:false,
                discountedProducts : response.data
              })
            })
            .catch((error)=>{})    
    }
    getCategories(){
      axios.get("/api/category/get/list")
      .then((response)=>{
        console.log("Category response:",response.data);
        this.setState({
          categories : response.data
        })
      })
      .catch((error)=>{
        // console.log('error', error);
      })
    }
    changeProductCateWise(categoryID, type){
      axios.get("/api/products/get/listbytypeNcategory/"+categoryID+"/"+type)
      .then((response)=>{
        this.setState({
          [type+"Products"] : response.data
        },()=>{
          this.forceUpdate();
        })
      })
      .catch((error)=>{
        // console.log('error', error);
      })
    }
    getWishData(){
      var user_ID = localStorage.getItem('user_ID');
      axios.get('/api/wishlist/get/userwishlist/'+user_ID)
      .then((response)=>{
        this.featuredProductData();
        this.exclusiveProductsData();
        this.discountedproductsData();
        // this.bestSellerData();
        this.setState({
          wishList : response.data
        },()=>{
        })
      })
      .catch((error)=>{
        // console.log('error', error);
      })
    }
  render() {    
    return (
      <div className="container-fluid uniHomepageWrapper"style={{padding:"0px"}}>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">    
             
            {/* {localStorage.getItem("preferences") === "true"
              ?
                <AskPincode />               
              :
                null
            } */}

            <EcommerceBanner/>
              {
              this.state.discountedProductsloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              :
              (this.state.discountedProducts.length > 0 ? 
                <EcommerceDiscountedProducts  
                    title={'Top Deals For You'} 
                    newProducts={this.state.discountedProducts} 
                    type={'featured'} 
                    getWishData={this.getWishData.bind(this)} 
                    wishList={this.state.wishList} 
                    categories={this.state.categories} 
                    changeProductCateWise={this.changeProductCateWise.bind(this)}/>
                : null
              )
            }
          </div>
             {/*-----------------shop by category block---------------------*/}
          <div className="homeRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <ProductDivider categories={this.state.categories} />
          </div>
          <div className="homeRow col-lg-12 col-md-12 col-sm-12 col-xs-12 take_disc_down">
            <NewDiscount />
          </div>
           <div className="homeRow">
            {
              this.state.featuredproductsloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              :
              (this.state.featuredProducts.length > 0 ? 
                <Ecommercenewproductcaro  
                    title={'FEATURED PRODUCTS'} 
                    newProducts={this.state.featuredProducts} 
                    type={'featured'} 
                    getWishData={this.getWishData.bind(this)} 
                    wishList={this.state.wishList} 
                    categories={this.state.categories} 
                    changeProductCateWise={this.changeProductCateWise.bind(this)}/>
                : null
              )
            }
          </div>
             <div className="homeRow">          
          
            <HomePageBanner2 />
           {/* <FreshFoodBlock />*/}
          </div>          
        </div>
        
        <SaleProductDivider />
        <div className="homeRow">
          {
            this.state.exclusiveprloading ?  
            <Loader type="carouselloader" productLoaderNo = {4}/>      
            : 
            (this.state.exclusiveProducts.length > 0 ? 
              <EcommerceProductCarousel 
                  title={'EXCLUSIVE PRODUCTS'} 
                  newProducts={this.state.exclusiveProducts}
                  type={'exclusive'} 
                  categories={this.state.categories} 
                  getWishData={this.getWishData.bind(this)} 
                  wishList={this.state.wishList}
                  changeProductCateWise={this.changeProductCateWise.bind(this)} />
              :
              null
            )
          }
        </div>
        <div className="homeRow">
           <Marketing/>
        </div>
        
       


        {/* <Ceo />*/}

        {/* <Blogs /> */}

      </div>
    );
  }
}

export default (HomePage);