import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import Loadable    from 'react-loadable';
import "../../../sites/currentSite/blocks/Banner.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/carousel.js';	
import $                  from 'jquery';

import Background_2  from "../../../sites/currentSite/images/Background_2.png";
import Background_22  from "../../../sites/currentSite/images/Background_22.png";
import Background_3  from "../../../sites/currentSite/images/Background_3.png";



export default class EcommerceBanner extends Component {
	constructor(props){
    super(props);
	    this.state = {
	      responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:1 
            }
          },
 	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  marginTop180">
				<div className="row">
					<div className="">

						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerEcomm">
							<div className="row">
						 		<OwlCarousel
									    className="owl-theme bannercaro"
									    loop
                            			responsive={this.state.responsive} 
			                            autoplay={true}
			                            autoplayHoverPause={true}
			                            dots={true}
			                            dotData={true}
									>
									    <div className="item">
									    	<img className="img img-responsive bannerimg" src={Background_2} alt="banner" />
									    	<div className="col-lg-6 col-lg-offset-3 bannerAnimation">
									    		<div className="BannerTitle NewBannerTitle"> FRESH FOOD  </div>
									    		<div className="bannertext ml16">{/*We Deliver Organic Fruits And Vegetables Fresh From Our Fields To Your Home*/}</div>
									    		<button className="col-lg-offset-5 viewdetails">VIEW DETAILS</button> 
									    	</div>
									    </div>
									    <div className="item">
									    	<img className="img img-responsive" src={Background_22} alt="banner" />
									    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 banner2AnimationImg">
									    		{/*<img className="img img-responsive banner2sideImg" src="../../../sites/currentSite/images/banner2(1).png" alt="banner" />*/}
									    	</div>
									    	<div className="banner2TextBox col-lg-12">									    		
									    		<div className="BannerTitle2"></div>	
									    		<div className="col-lg-6 col-lg-offset-3">								    		
									    			<div className="bannertext1 col-lg-12">{/*We Deliver Organic Fruits And Vegetables Fresh From Our Fields To Your Home*/}</div>
									    			 <button className="col-lg-offset-5 viewdetails">VIEW DETAILS</button> 
									    			{/*<div className="col-lg-2 hrLineBanner" />*/}
									    		</div>
									    	</div>
									    </div>
									</OwlCarousel>
							</div>
						</div>
					</div>	
				</div>
			</div>
		);
	}
}