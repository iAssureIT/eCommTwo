import React, { Component } from 'react';
import "../../../sites/currentSite/blocks/ProductDivider.css";

export default class SaleProductDivider extends Component {
	// constructor(props){
 //        super(props);	    
 //  	}  
    
  render() {
		return (
		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 abc NOpadding">
            <div className="block">
                <a className="image" href="#" target="_blank"> 
                    <img src={require("../../../sites/currentSite/images/sofa.jpg")} alt="home banner" className="divImage"/>
                </a>
            	<a href="/"><div className="btn  shopnowbtn" title="Shop Now">Shop Now</div></a>
            	<div className="figcaption2"> </div>
            </div>
            <div className="flatSaleBlockWrapper">
                <div className="flatSaleBlock">Flash Sale <span className="OffBlock">Minimum 10% OFF</span> </div>
                <div className="offerText">Only for Limited period of time..</div>
            </div>
            
    	</div> 	
		);
	}
}
