import React, { Component } from 'react';
// import './FreshFoodBlock.css';

import "../../../../sites/currentSite/blocks/FreshFoodBlock.css";
import freshFoodImg1   from "../../../../sites/currentSite/images/freshFoodImg1.jpg";
import bgBorderCenter  from "../../../../sites/currentSite/images/bg-border-center.png";
import icon_shipping_1 from "../../../../sites/currentSite/images/icon-shipping-1.png";
import icon_shipping_2 from "../../../../sites/currentSite/images/icon-shipping-2.png";
import icon_shipping_3 from "../../../../sites/currentSite/images/icon-shipping-3.png";
import icon_shipping_4 from "../../../../sites/currentSite/images/icon-shipping-4.png";

class FreshFoodBlock extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div className="container container-ver2 freshFood">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <img className="img-responsive hidden-table" src={freshFoodImg1} alt="banner"/>            
                    </div>
                    
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                        <div className="title-choose align-center">
                            <h3><span>We are </span>FRESH FOOD</h3>
                            <p>The fact of the matter is that you really know something's organic when you find bugs! they obviously wouldn't&nbsp;have made it that far in a non-organic growing environment, so better than any certification or seal on a package,&nbsp;the presence of creatures let you know the plant was healthy and</p>
                        </div>   

                        <div className="align-center border-choose">
                            <div className="images">
                                <img src={bgBorderCenter} alt="icon" />
                            </div>
                        </div>

                        <div className="shippingBlock">
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <div className="border">
                                    <img src={icon_shipping_1} alt="images"/>
                                    <h3>Free Shipping</h3>
                                    <p>ON ORDER OVER $500</p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <div className="border">
                                    <img src={icon_shipping_2} alt="images"/>
                                    <h3>Support</h3>
                                    <p>LIFE TIME SUPPORT 24/7</p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <div className="border">
                                    <img src={icon_shipping_3} alt="images"/>
                                    <h3>Help Partner</h3>
                                    <p>HELP ALL ASPECTS</p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <div className="border">
                                    <img src={icon_shipping_4} alt="images"/>
                                    <h3>Contact With Us</h3>
                                    <p>+07 (0) 7782 9137</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default FreshFoodBlock;