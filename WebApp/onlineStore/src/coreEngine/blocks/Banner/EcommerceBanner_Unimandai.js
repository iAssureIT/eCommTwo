import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import Loadable    from 'react-loadable';
import "../../../sites/4_UniMandai/blocks/Banner.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/carousel.js';	
import $                  from 'jquery';
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
 /*componentDidMount(){
 	var $elem = $('.thing');

   MotionUI.animateIn($elem, 'slide-in-left', function() {
  console.log('Transition finished!');
});
 }*/
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
									    	<img className="img img-responsive bannerimg" src="/images/carausel1img.jpg" alt="banner" />
									    	<div className="col-lg-6 col-lg-offset-3 bannerAnimation">
									    		{/*<img className="img img-responsive banner1upImg" src="/images/banner1(1).png" alt="banner"  />*/}
									    		<div className="BannerTitle NewBannerTitle"> FRESH FOOD  </div>
									    		{/*<img className="img img-responsive banner1downImg" src="/images/banner1(2).png" alt="banner"  />*/}
									    		<div className="bannertext ml16">We Deliver Organic Fruits And Vegetables Fresh From Our Fields To Your Home</div>
									    		<button className="col-lg-offset-5 viewdetails">VIEW DETAILS</button> 
									    	</div>
									    </div>
									    <div className="item">
									    	<img className="img img-responsive" src="/images/caroselmandai.jpg" alt="banner" />
									    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 banner2AnimationImg">
									    		{/*<img className="img img-responsive banner2sideImg" src="/images/banner2(1).png" alt="banner" />*/}
									    	</div>
									    	<div className="banner2TextBox col-lg-12">									    		
									    		<div className="BannerTitle2">Fresh Organic Food</div>	
									    		<div className="col-lg-6 col-lg-offset-3">								    		
									    			{/*<div className="col-lg-2 hrLineBanner"/>*/}
									    			<div className="bannertext1 col-lg-12">We Deliver Organic Fruits And Vegetables Fresh From Our Fields To Your Home</div>
									    			 <button className="col-lg-offset-5 viewdetails">VIEW DETAILS</button> 
									    			{/*<div className="col-lg-2 hrLineBanner" />*/}
									    		</div>
									    	</div>
									    </div>
									   {/* <div className="item">
									    	<img className="img img-responsive" src="/images/banner3.png" alt="banner"  />
									    	<div className="col-lg-6 col-lg-offset-3 bannerAnimation">
									    		<img className="img img-responsive banner1upImg" src="/images/banner3(1).png" alt="banner"  />
									    		<div className="BannerTitle"> Royal Collection </div>
									    		<img className="img img-responsive banner1downImg" src="/images/banner3(2).png" alt="banner" />
									    		<div className="bannertext">At amazing disscount, door step delivery</div>
									    	</div>
									    </div>*/}
									</OwlCarousel>
									<div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 secondSection">
									 <div class="col-md-3 col-sm-3 col-xs-6 shippingBox">
				                        <img src="/images/icon-shipping-1.png" alt="images" className="Shippingimage"/>
				                        <h4 className="text-center"><b>FREE SHIPPING</b></h4>
				                        <p className="text-center onOrder">ON ORDER OVER $500</p>
				                    </div>
				                    <div class="col-md-3 col-sm-3 col-xs-6 shippingBox">
				                        <img src="/images/icon-shipping-2.png" alt="images" className="Shippingimage"/>
				                        <h4 className="text-center"><b>SUPPORT</b></h4>
				                        <p className="text-center onOrder">LIFE TIME SUPPORT 24/7</p>
				                    </div>
				                    <div class="col-md-3 col-sm-3 col-xs-6 shippingBox">
				                        <img src="/images/icon-shipping-3.png" alt="images" className="Shippingimage"/>
				                        <h4 className="text-center"><b>HELP PARTNER</b></h4>
				                        <p className="text-center onOrder">HELP ALL ASPECTS</p>
				                    </div>
				                    <div class="col-md-3 col-sm-3 col-xs-6 shippingBox1">
				                        <img src="/images/icon-shipping-4.png" alt="images" className="Shippingimage"/>
				                        <h4 className="text-center"><b>CONTACT WITH US</b></h4>
				                        <p className="text-center onOrder">+07 (0) 7782 9137</p>
				                    </div>
									</div>
							</div>
						</div>
					</div>	
				</div>
			</div>
		);
	}
}