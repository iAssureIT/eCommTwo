import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import Loadable    from 'react-loadable';
import "../../../sites/currentSite/blocks/Banner.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/carousel.js';	

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
  	ServicesData(){
        return [
            {
                servicesTitle : "Company Profile",
                servicesSubTitle : "iOG Solutions stands for intelligent O&G solutions.",
                servicesimg   : "../../../sites/currentSite/images/Truck.png",
                servicestext  : "iOG Solutions is an independent and reputed provider of consulting and implementation services on advanced and intelligent Software solutionsin the Oil & Gas industry. Our headquarters have been established since 2013 in Pune (India)."
                    
                
            } 
                        
        ]
    }
  render() {
		return (

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 homeBanner2"style={{padding:"0px"}}>
			<div clasName="col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10">

		         {
		            this.ServicesData().map((data, index)=>{
		              return (   
		                        <div key={index} className="col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10">
		                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                            <div className="col-lg-3 col-md-3 col-sm-3 colxs-3">
		                              <div className="img1 img_border">
		                                <img src={require("../../../sites/currentSite/images/truck11.png")} alt="" className="intro_img img-responsive" />
		                                <h5 className="homeBanner2_head">FREE DELIVERY NATIONWIDE</h5>
		                                <p>Door Step Delivery</p>
		                            </div>
		                          </div>
		                           <div className="col-lg-3 col-md-3 col-sm-3 colxs-3">
		                              <div className="img1 img_border">
		                                <img src={require("../../../sites/currentSite/images/whatsapp1.png")} alt="" className="intro_img img-responsive" />
		                                <h5 className="homeBanner2_head">24/7 WhatsApp Support</h5>
		                                <p> +91 - 98765 43210</p>
		                            </div>
		                          </div>
		                           <div className="col-lg-3 col-md-3 col-sm-3 colxs-3">
		                              <div className="img1 img_border">
		                                <img src={require("../../../sites/currentSite/images/savemoney.png")} alt="" className="intro_img img-responsive" />
		                               <h5 className="homeBanner2_head">100% Moneyback Guarantee</h5>
		                                <p>Trust worthy Transactions</p>
		                            </div>
		                          </div>
		                           <div className="col-lg-3 col-md-3 col-sm-3 colxs-3">
		                              <div className="img1">
		                                <img src={require("../../../sites/currentSite/images/cashhh.png")} alt="" className="intro_img img-responsive" />
		                                <h5 className="homeBanner2_head">Cash On Delivery</h5>
		                                <p>Pay after delivery at home</p>
		                            </div>
		                          </div>
		                          </div>
		                        </div>
		                         );
		                      })
		                    }
		            </div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  marginTop180">
					 <a href="https://www.youtube.com/results?search_query=anasHandicrafts"><button type="button" class="btn btn-lg madalbtn btnbg">You Tube</button></a>
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
											    	<img className="img img-responsive bannerimg" src={require("../../../sites/currentSite/images/banner1.png")} alt="banner" />
											    	<div className="col-lg-6 col-lg-offset-3 bannerAnimation">
											    		<img className="img img-responsive banner1upImg" src={require("../../../sites/currentSite/images/banner1(1).png")} alt="banner"  />
											    		<div className="BannerTitle"> Anas Handicraft </div>
											    		<img className="img img-responsive banner1downImg" src={require("../../../sites/currentSite/images/banner1(2).png")} alt="banner"  />
											    		<div className="bannertext">India's Largest Handicraft Furniture Mall</div>
											    	</div>
											    </div>
											    <div className="item">
											    	<img className="img img-responsive" src={require("../../../sites/currentSite/images/banner2.png")} alt="banner" />
											    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 banner2AnimationImg">
											    		<img className="img img-responsive banner2sideImg" src="../../../sites/currentSite/images/banner2(1).png" alt="banner" />
											    	</div>
											    	<div className="banner2TextBox col-lg-12">									    		
											    		<div className="BannerTitle2"> Authenticate Handicraft </div>	
											    		<div className="col-lg-6 col-lg-offset-3">								    		
											    			<div className="col-lg-2 hrLineBanner"/>
											    			<div className="bannertext1 col-lg-8">Pure Sagwan and Sheesham Furniture</div>
											    			<div className="col-lg-2 hrLineBanner" />
											    		</div>
											    	</div>
											    </div>
											    <div className="item">
											    	<img className="img img-responsive" src={require("../../../sites/currentSite/images/banner3.png")} alt="banner"  />
											    	<div className="col-lg-6 col-lg-offset-3 bannerAnimation">
											    		<img className="img img-responsive banner1upImg" src={require("../../../sites/currentSite/images/banner3(1).png")} alt="banner"  />
											    		<div className="BannerTitle"> Royal Collection </div>
											    		<img className="img img-responsive banner1downImg" src={require("../../../sites/currentSite/images/banner3(2).png")} alt="banner" />
											    		<div className="bannertext">At amazing disscount, door step delivery</div>
											    	</div>
											    </div>
											</OwlCarousel>
									</div>
								</div>
							</div>	
						</div>
					</div>
				 </div>	
		);
	}
}