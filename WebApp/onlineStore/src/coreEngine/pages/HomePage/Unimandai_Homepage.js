import React, { Component }       from 'react';
// import { connect }                from 'react-redux';
import $                          from 'jquery';
import EcommerceProductCarousel     from "../../blocks/ProductCarouselEcommerce/EcommerceProductCarousel.js";
import Ecommercenewproductcaro      from "../../blocks/ProductCarouselEcommerce/Ecommercenewproductcaro.js";
import EcommerceBanner_Unimandai    from "../../blocks/Banner/EcommerceBanner_Unimandai.js";
import ProductDivider               from "../../blocks/ProductDivider/ProductDivider.js";
import Unimandai_SaleProductDivider from "../../blocks/ProductDivider/Unimandai_SaleProductDivider.js";
import WhychooseUs                  from "../../blocks/WhychooseUs/WhychooseUs.js";
import AskPincode                   from "../../blocks/AskPincode/AskPincode.js";
import AllowdeliveryModal           from "../../blocks/AskPincode/AllowdeliveryModal.js";
import axios                        from 'axios';
import Loader                       from "../../common/loader/Loader.js";
import Blogs                        from "../../blocks/Blogs/Blogs.js";
import Ceo                          from "../../blocks/CEO/Ceo.js";

class HomePage extends Component {
    constructor(props){
    super(props);
      this.state = {
        featuredProducts        : [],
        exclusiveProducts       : [],
        categories              : [],
        exclusiveprloading      : true,
        bestsellerloading       : true,
        newproductloading       : true,
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
      const preferences = localStorage.getItem("preferences");      
      console.log("localstorage preferences:=============",preferences);
      this.setState({"askPincodeToUser" : preferences});    
      
      this.featuredProductData();
      this.exclusiveProductsData();
      // this.newProductsData();
      // this.bestSellerData();
      this.getCategories();
      this.getWishData();       
  }

    componentWillMount(){
      const preferences = localStorage.getItem("preferences");
      console.log("wilmount askPincodeToUser:",preferences);      
      this.setState({"askPincodeToUser" : preferences});    
      var pincode = localStorage.getItem("pincode");
      if(pincode){
      console.log("inside will mount localstorage pincode---------",pincode);
      this.setState({
                userPincode : pincode,
      });
      console.log("user setstate varialble Pincode :=====",this.state.userPincode);

      //when user visit the site second time, check again delivery is possible or not
      // if(localStorage.getItem('status') === "NotAllow"){
      //   console.log("1.check again pincode available or",pincode);
      // axios.get("/api/allowablepincode/checkpincode/"+pincode)
      //       .then((response)=>{
      //           var status = "";
      //           if(response){          
      //               console.log("Checking second time delivery========");
      //               if(response.data.message === "Delivery Available"){                                                                  
      //                  localStorage.setItem("DeliveryStatus","Allowable");
      //                  localStorage.setItem("status","Allow");
      //                  this.setState({
      //                       DeliveryStatus : "Allowable",
      //                  })
      //                  console.log("Delivery Status======",this.state.DeliveryStatus);
      //                  console.log("delivery allow", localStorage.getItem('status'));
      //               }else{
      //                 console.log("Delivery not available");
      //                 this.setState({
      //                   DeliveryStatus : "NotAllowable",
      //              })
      //               }
      //           }
      //       })
      //       .catch((error)=>{
      //           console.log('error', error);
      //       })
      // }
      // console.log("pincodeObj:====",pincodeObj.pincode);
    }
    }
    featuredProductData(){
      var productType1 = 'featured';
      
      axios.get("/api/products/get/listbytype/"+productType1)
            .then((response)=>{
              // console.log('featuredProducts' , response.data)
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

              this.setState({
                exclusiveprloading:false,
                exclusiveProducts : response.data
              })
            })
            .catch((error)=>{
                // console.log('error', error);
            })
    }
    newProductsData(){
      var productType3 = 'newProduct';
      axios.get("/api/products/get/listbytype/"+productType3)
            .then((response)=>{

              this.setState({
                newproductloading:false,
                newProducts : response.data
              })
            })
            .catch((error)=>{
                // console.log('error', error);
            })    
    }
    bestSellerData(){
      var productType4 = 'bestSeller';
      axios.get("/api/products/get/listbytype/"+productType4)
            .then((response)=>{
              // console.log("Bestseller data => ", response.data);
              this.setState({
                bestsellerloading  : false,
                bestSellerProducts : response.data
              })
            })
            .catch((error)=>{
                // console.log('error', error);
            })    
    }
    getCategories(){
      axios.get("/api/category/get/list")
      .then((response)=>{
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
        this.newProductsData();
        this.bestSellerData();
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
    var projectName=process.env.REACT_APP_PROJECT_NAME;
    // console.log("projectNmae in homepage",projectName);
    return (

      <div className="">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray">
          <div className="row">         
         {this.state.askPincodeToUser === "true"
          ?
            <AskPincode />
          :
            null
         }
            <EcommerceBanner_Unimandai/>

          </div>
            <div className="homeRow">
            { /*new product */}
            {
              this.state.exclusiveprloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              : 
              (this.state.exclusiveProducts.length > 0 ? 
                <EcommerceProductCarousel title={'FLASH SALE'} newProducts={this.state.exclusiveProducts}
                 type={'exclusive'} categories={this.state.categories} 
                 getWishData={this.getWishData.bind(this)} wishList={this.state.wishList}
                 changeProductCateWise={this.changeProductCateWise.bind(this)}/>
                :
                null
              )
            }
            {
              this.state.bestsellerloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              :
              ( this.state.bestSellerProducts.length  > 0 ? 
                <Ecommercenewproductcaro   title={'BEST SELLERS'} newProducts={this.state.bestSellerProducts} type={'bestSeller'} getWishData={this.getWishData.bind(this)} wishList={this.state.wishList} categories={this.state.categories} changeProductCateWise={this.changeProductCateWise.bind(this)}/>
                :
                null
                )
            }
            
          {/*-----------------shop by category block---------------------*/}
            <ProductDivider categories={this.state.categories} />
            
            {
              this.state.newproductloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              :
              (this.state.newProducts.length >0 ? 
              <Ecommercenewproductcaro title={'NEW PRODUCTS'} newProducts={this.state.newProducts} type={'newProducts'} getWishData={this.getWishData.bind(this)} wishList={this.state.wishList} categories={this.state.categories} changeProductCateWise={this.changeProductCateWise.bind(this)}/>                
              :
              null )
            }
            
            {
              this.state.featuredproductsloading ?  
              <Loader type="carouselloader" productLoaderNo = {4}/>      
              :
              (this.state.featuredProducts.length > 0 ? 
                <Ecommercenewproductcaro  title={'FEATURE PRODUCTS'} newProducts={this.state.featuredProducts} type={'featured'} getWishData={this.getWishData.bind(this)} wishList={this.state.wishList} categories={this.state.categories} changeProductCateWise={this.changeProductCateWise.bind(this)}/>
                : null
              )
            }
            
          </div>
        </div>
        <Unimandai_SaleProductDivider />

         <WhychooseUs/>

        {/* <Ceo />
*/}
          <Blogs />


      </div>
    );
  }
}



export default (HomePage);