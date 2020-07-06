import React, { Component } from 'react';
import "../../../sites/currentSite/blocks/ProductDivider.css";

import saleimage        from "../../../sites/currentSite/images/BigSaleToday.png";
import icon_shipping_5  from "../../../sites/currentSite/images/icon-shipping-5.png";

export default class SaleProductDivider extends Component {
    // constructor(props){
 //        super(props);        
 //     }  
    
  render() {
        return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 abc NOpadding bigSaleWrapper" style={{"background":"url("+saleimage+")"}}>
            <div className=" col-lg-12 col-md-12 block newBlock">
             {/* <div className="col-lg-5 ">
              <img src={saleimage} className="bigSaleImg"/>
             </div> */}

            <div className="col-md-7  pull-right">
                <div className="flatSaleBlock"><span><img src={icon_shipping_5} className="imageposition"/></span>BIG SALE TODAY <span className="OffBlock"></span> </div>
                <div className="col-lg-8 offerText special-content">GET 30% OFF YOUR ORDER OVER <span>&#x20B9;</span>&nbsp;200 ...</div>
                <a href="/"><div className="col-lg-3 col-lg-offset-5 btn shopNow" title="">SHOP NOW</div></a>
            </div>
          </div>  
        </div>
            
        );
    }
}
