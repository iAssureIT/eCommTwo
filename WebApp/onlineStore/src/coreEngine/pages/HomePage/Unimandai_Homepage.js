import React, { Component }         from 'react';
// import { connect }                from 'react-redux';
import $                            from 'jquery';
import EcommerceProductCarousel     from "../../blocks/ProductCarouselEcommerce/EcommerceProductCarousel.js";
import Ecommercenewproductcaro      from "../../blocks/ProductCarouselEcommerce/Ecommercenewproductcaro.js";
import EcommerceDiscountedProducts  from "../../blocks/ProductCarouselEcommerce/EcommerceDiscountedProducts.js";
import EcommerceBanner_Unimandai    from "../../blocks/Banner/EcommerceBanner_Unimandai.js";
import ProductDivider               from "../../blocks/ProductDivider/ProductDivider.js";
import Unimandai_SaleProductDivider from "../../blocks/ProductDivider/Unimandai_SaleProductDivider.js";
import WhychooseUs                  from "../../blocks/WhychooseUs/WhychooseUs.js";
import AskPincode                   from "../../blocks/AskPincode/AskPincode.js";
import HomePageBanner2              from "../../blocks/unimandaiBlock/HomePageBanner2/HomePageBanner2.js";
import FreshFoodBlock               from "../../blocks/unimandaiBlock/FreshFoodBlock/FreshFoodBlock.js";
import axios                        from 'axios';
import Loader                       from "../../common/loader/Loader.js";
import Blogs                        from "../../blocks/Blogs/Blogs.js";
import Ceo                          from "../../blocks/CEO/Ceo.js";
import UnimandaiBlogs               from '../../blocks/Blogs/UnimandaiBlogs.js';

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
        vegetableProductsloading: true,
        fruitProductsloading    : true,
        askPincodeToUser        : "",
        userPincode             : "",
        DeliveryStatus          : "",
        vegetableProducts       : [],
        fruitProducts           : [],
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
      this.setState({"askPincodeTolistbytypeUser" : preferences}); 
      this.featuredProductData();
      this.getVegetablesData();
      this.getFruitsData();
      this.exclusiveProductsData();
      this.discountedproductsData();
      // this.bestSellerData();
      this.getCategories();
      this.getWishData();       
  }

    componentWillMount(){
      // console.log("1.wilmount ================");  
      this.getVegetablesData();
      const preferences = localStorage.getItem("preferences");
      // console.log("wilmount askPincodeToUser:",preferences);      
      this.setState({"askPincodeToUser" : preferences});  
         
    }
    getVegetablesData(){
      var section = 'Vegetables';
      axios.get("/api/products/get/list/"+section)      
            .then((response)=>{
              if(response.data){
              // console.log('vegetables Products ==== ' , response.data)
              this.setState({
                vegetableProductsloading:false,
                vegetableProducts : response.data
              })
            }
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }
    getFruitsData(){
      var section = 'Fruits';
      axios.get("/api/products/get/list/"+section)      
            .then((response)=>{
              if(response.data){
              // console.log('vegetables Products ==== ' , response.data)
              this.setState({
                fruitProductsloading:false,
                fruitProducts : response.data
              })
            }
            })
            .catch((error)=>{
                console.log('error', error);
            })
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
      // console.log('productType3==>', productType3);
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
        // console.log("Category response:",response.data);
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
        this.getVegetablesData();
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
      <div className="container-fluid uniHomepageWrapper">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">    
          <AskPincode />        
          <EcommerceBanner_Unimandai/>
          <HomePageBanner2 />

            {/*-----------------shop by category block---------------------*/}
          <div className="homeRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <ProductDivider categories={this.state.categories} />
          </div>
            
          </div>
          <div className="homeRow">
            {
              this.state.discountedProductsloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              :
              (this.state.discountedProducts.length > 0 ? 
                <EcommerceDiscountedProducts  
                    title={'Discounted PRODUCTS'} 
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

          <FreshFoodBlock />

          {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding homeRow">
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
          </div> */}
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding homeRow">
            {
              this.state.vegetableProductsloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              :
              (this.state.vegetableProducts.length > 0 ? 
                <Ecommercenewproductcaro  
                    title={'Vegetables'} 
                    newProducts={this.state.vegetableProducts} 
                    type={'featured'} 
                    getWishData={this.getWishData.bind(this)} 
                    wishList={this.state.wishList} 
                    categories={this.state.categories} 
                    changeProductCateWise={this.changeProductCateWise.bind(this)}/>
                : null
              )
            }
          </div>
        </div>

        <Unimandai_SaleProductDivider />
        {/* <div className="homeRow">
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
        </div> */}
        <div className="homeRow">
          {
            this.state.fruitProductsloading ?  
            <Loader type="carouselloader" productLoaderNo = {4}/>      
            : 
            (this.state.exclusiveProducts.length > 0 ? 
              <EcommerceProductCarousel 
                  title={'FRUITS'} 
                  newProducts={this.state.fruitProducts}
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
            

        <WhychooseUs/>

        {/* <Ceo />*/}

        {/* <Blogs /> */}
        <UnimandaiBlogs />


      </div>
    );
  }
}



export default (HomePage);