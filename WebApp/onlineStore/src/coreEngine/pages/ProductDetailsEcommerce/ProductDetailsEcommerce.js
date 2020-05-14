import React, { Component } 		            from 'react';
import ProductViewEcommerce                 from "../../blocks/ProductViewEcommerce/ProductViewEcommerce.js";
import ProductViewEcommerceBestSellers      from "../../blocks/ProductViewEcommerceBestSellers/ProductViewEcommerceBestSellers.js";
// import ProductViewEcommerceDetailsReviewFAQ from "../../blocks/ProductViewEcommerceDetailsReviewFAQ/ProductViewEcommerceDetailsReviewFAQ.js";
import axios                  		          from 'axios';
// var webCategory  = 'Main-Site';

export default class ProductDetailsEcommerce extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	 bestSellerProducts:[]
	    };
        this.bestSellerData();
  	} 
  	componentDidMount(){
  		var productType4 = 'bestSeller';
  		// var webCategory = 'Main-Site'
  		axios.get("/api/products/get/listbytype/"+productType4)
      .then((response)=>{
        this.setState({
            bestSellerProducts : response.data
        })
      })
      .catch((error)=>{
          console.log('error', error);
      }) 

      this.bestSellerData();
  	} 

    bestSellerData(){
      var productType4 = 'bestSeller';
      // var webCategory = 'Main-Site'
      axios.get("/api/products/get/listbytype/"+productType4)
            .then((response)=>{

              this.setState({
                  bestSellerProducts : response.data
              })
            })
            .catch((error)=>{
                console.log('error', error);
            })    
    }

  	  	
  	render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop180  backColorGray">
          <ProductViewEcommerce productID = { this.props.match.params.productID } />
        
          <ProductViewEcommerceBestSellers title={'RELATED PRODUCTS'} productID = { this.props.match.params.productID } />
        </div>
		);
	}
}
