import React, { Component } from 'react';
import "../../../sites/currentSite/blocks/ProductDivider.css";

export default class SaleProductDivider extends Component {
    // constructor(props){
 //        super(props);        
 //     }  
    
  render() {
        return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 abc NOpadding">
            <div className="block newBlock">
             <div className="col-lg-5 ">
              <img src="/images/saleimage.png"/>
             </div>
                {/*<a className="image" href="#" target="_blank"> 
                    <img src="/images/sofa.jpg" alt="home banner" className="divImage"/>
                </a>*/}
                {/*<a href="#flashsalediv"><div className="btn  shopnowbtn" title="Checkout">Shop Now</div></a>
                <div className="figcaption2"> </div>*/}
            <div className="col-md-7 ">
                <div className="flatSaleBlock"><span><img src="/images/icon-shipping-5.png" className="imageposition"/></span>BIG SALE TODAY <span className="OffBlock"></span> </div>
                <div className="col-lg-8 offerText special-content">GET 30% OFF YOUR ORDER OF $100 OR MORE...</div>
                <button className="col-lg-3 col-lg-offset-5 viewdetails">SHOP NOW</button> 
            </div>
          </div>  
        </div>
            
        );
    }
}
