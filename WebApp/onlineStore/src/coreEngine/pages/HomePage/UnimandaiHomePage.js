import React, { Component }         from 'react';
import $                            from 'jquery';
import axios                        from 'axios';

import ProductCarousel              from "../../blocks/ProductCarousel/ProductCarousel.js";
import EcommerceBanner_Unimandai    from "../../blocks/Banner/EcommerceBanner_Unimandai.js";
import HomePageBanner2              from "../../blocks/unimandaiBlock/HomePageBanner2/HomePageBanner2.js";
import ProductDivider               from "../../blocks/ProductDivider/ProductDivider.js";
import Unimandai_SaleProductDivider from "../../blocks/ProductDivider/Unimandai_SaleProductDivider.js";
import WhychooseUs                  from "../../blocks/WhychooseUs/WhychooseUs.js";
import FreshFoodBlock               from "../../blocks/unimandaiBlock/FreshFoodBlock/FreshFoodBlock.js";
import UnimandaiBlogs               from '../../blocks/Blogs/UnimandaiBlogs.js';

class UnimandaiHomePage extends Component {
    constructor(props){
    super(props);
      this.state = {
        featuredProducts        : [],
        discountedProducts      : [],
        exclusiveProducts       : [],
        categories              : [],
        exclusiveprloading      : true,
        discountedProductsloading : true,
        featuredproductsloading : true,
        vegetableProductsloading: true,
        fruitProductsloading    : true,
        vegetableProducts       : [],
        fruitProducts           : [],
        
        defaultProductsSettings : { 
            displayBrand 		    : true,
            displayWishlistIcon : true,
            displayRating 		  : true,
            displayAssuranceIcon: true,
            displayFeature 		  : 'size',
            displaySubCategory  : false,
            displayCategory   	: false,
            displaySection   	  : false,            
        },
        fruitsProductsSettings: { 
          displayBrand 		    : true,
          displayWishlistIcon : true,
          displayRating 		  : false,
          displayAssuranceIcon: false,
          displayFeature 		  : 'size',
          displaySubCategory  : false,
          displayCategory   	: false,
          displaySection   	  : false,          
      },
        fruitsBlock             : {
          blockTitle            : "Fruits",
          api                   : "/api/products/get/listbysection/"+"Fruits",    
          totalNumOfProducts 	  : 8,
          showCarousel 		      : true,
          numOfProductsPerLGRow : 4,
          numOfProductsPerMDRow : 4,
          numOfProductsPerSMRow : 4,
          numOfProductsPerXSRow : 2,			
        },        
        vegetablesBlock             : {
          blockTitle            : "Vegetables",
          api                   : "/api/products/get/listbysection/"+"Vegetables",    
          totalNumOfProducts 	  : 12,
          showCarousel 		      : true,
          numOfProductsPerLGRow : 6,
          numOfProductsPerMDRow : 6,
          numOfProductsPerSMRow : 3,
          numOfProductsPerXsRow : 2,			
        },
        vegetableProductsSettings: { 
          displayBrand 		      : true,
          displayWishlistIcon   : true,
          displayRating 		    : false,
          displayAssuranceIcon  : false,
          displayFeature 		    : '',
          displaySubCategory    : false,
          displayCategory   	  : false,
          displaySection   	    : false,
          displayDiscount 	    : false,          
        },
        disscountProductsSettings: { 
          displayBrand 		      : true,
          displayWishlistIcon   : true,
          displayRating 		    : false,
          displayAssuranceIcon  : false,
          displayFeature 		    : '',
          displaySubCategory    : false,
          displayCategory   	  : false,
          displaySection   	    : false,
          displayDiscount 	    : true,          
        },
        discountBlock           : {
          blockTitle            : "Deals For You",
          api                   : "/api/products/get/listbytype/"+"discounted",    
          totalNumOfProducts 	  : 12,
          showCarousel 		      : true,
          numOfProductsPerLGRow : 4,
          numOfProductsPerMDRow : 4,
          numOfProductsPerSMRow : 3,
          numOfProductsPerXLRow : 2,			
        },
        exclusiveBlock          : {
          blockTitle            : "Exclusive Product",
          api                   : "/api/products/get/listbytype/"+"exclusive",    
          totalNumOfProducts 	  : 12,
          showCarousel 		      : true,
          numOfProductsPerLGRow : 6,
          numOfProductsPerMDRow : 6,
          numOfProductsPerSMRow : 3,
          numOfProductsPerXsRow : 2,			
        },
        exclusiveProductsSettings: { 
          displayBrand 		      : true,
          displayWishlistIcon   : true,
          displayRating 		    : false,
          displayAssuranceIcon  : false,
          displayFeature 		    : '',
          displaySubCategory    : false,
          displayCategory   	  : false,
          displaySection   	    : false,
          displayDiscount 	    : false,          
        },
        featureBlock          : {
          blockTitle            : "Feature Product",
          api                   : "/api/products/get/listbytype/"+"featured",    
          totalNumOfProducts 	  : 12,
          showCarousel 		      : true,
          numOfProductsPerLGRow : 6,
          numOfProductsPerMDRow : 6,
          numOfProductsPerSMRow : 3,
          numOfProductsPerXsRow : 2,			
        },
        featureProductsSettings: { 
          displayBrand 		      : false,
          displayWishlistIcon   : false,
          displayRating 		    : false,
          displayAssuranceIcon  : false,
          displayFeature 		    : '',
          displaySubCategory    : true,
          displayCategory   	  : true,
          displaySection   	    : true,
          displayDiscount 	    : false,          
        },
        categoryBlock             : {
          blockTitle            : "Categories",
          api                   : "/api/products/get/listbysection/"+"Vegetables",    
          totalNumOfProducts 	  : 12,
          showCarousel 		      : true,
          numOfProductsPerLGRow : 6,
          numOfProductsPerMDRow : 6,
          numOfProductsPerSMRow : 3,
          numOfProductsPerXsRow : 2,			
        },
        
      };
    } 

    // UNSAFE_componentWillMount(){
    //   // this.getCategories();
    // }
    componentDidMount(){
      this.getCategories();
    }

    getCategories(){
      axios.get("/api/category/get/list")
      .then((response)=>{
        this.setState({
          categories : response.data
        })
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
   
    // changeProductCateWise(categoryID, type){
    //   axios.get("/api/products/get/listbytypeNcategory/"+categoryID+"/"+type)
    //   .then((response)=>{
    //     this.setState({
    //       [type+"Products"] : response.data
    //     },()=>{
    //       this.forceUpdate();
    //     })
    //   })
    //   .catch((error)=>{
    //     // console.log('error', error);
    //   })
    // }

  

    render() {     
        return (
          <div className="container-fluid uniHomepageWrapper">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " style={{ backgroundColor:"#fff"}} >
            <div className="row">  

                <EcommerceBanner_Unimandai/>
                <HomePageBanner2 /> 

                <div className="homeRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <ProductDivider categories={this.state.categories} />
                </div>            
            
                <div className="homeRow col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
                    <ProductCarousel
                      productSettings = {this.state.disscountProductsSettings}
                      blockSettings   = {this.state.discountBlock} 
                    />
                </div> 

                <FreshFoodBlock />
              
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding homeRow">
                  <ProductCarousel
                      productSettings = {this.state.vegetableProductsSettings}
                      blockSettings   = {this.state.vegetablesBlock}
                  />
                </div>              
      
                <Unimandai_SaleProductDivider /> 

                <div className="homeRow col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">                  
                  <ProductCarousel                      
                        productSettings = {this.state.fruitsProductsSettings}
                        blockSettings   = {this.state.fruitsBlock}                   
                  />
                </div>

                {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding homeRow">
                  <ProductCarousel
                      productSettings = {this.state.exclusiveProductsSettings}
                      blockSettings   = {this.state.exclusiveBlock}
                  />
                </div> 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding homeRow">
                  <ProductCarousel
                      productSettings = {this.state.featureProductsSettings}
                      blockSettings   = {this.state.featureBlock}
                  />
                </div>  */}
              <WhychooseUs/>            
              <UnimandaiBlogs />            
              </div>
            </div>
          </div>
        );
      }
    }
    export default (UnimandaiHomePage);