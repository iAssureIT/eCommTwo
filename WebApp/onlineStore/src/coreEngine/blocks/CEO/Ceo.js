import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/carousel.js';	
import $                  from 'jquery';
import React from 'react';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import "../../../sites/4_UniMandai/blocks/Ceo.css";

export default class Ceo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

			responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            800:{
                items:3
            },
            1000:{
                items:4 
            },
            1000:{
                items:5 
            },
            1000:{
                items:6 
            },
          },
        

		    "OurCourcesmaster"		: [
							{
								blogDate:"DEC 17,2016",
								blogTitle:"Learn On Organic Farms",
								blogPara:"Post by :FreshFood",
								bloggerImg:"/images/1.jpg",
								// smallimg:"img/icon1.png"
								
							},
							{
								blogDate:"DEC 17,2016",
								blogTitle:"What is organic farming?",
								blogPara:"Post by :FreshFood",
								bloggerImg:"/images/2.jpg",
								// smallimg:"img/icon2.png"
								
							},
							{
								blogDate:"DEC 17,2016",
								blogTitle:"Advantages of Organic Meat",
								blogPara:"Post by :FreshFood",
								bloggerImg:"/images/3.jpg",
								// smallimg:"img/icon3.png"
								
							},

						  ]				  
	};
	}

	componentDidMount(){	
		
		} 
    
	render() {
		 var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
		var data = this.state.OurCources;
		var data1=this.state.OurCourcesmaster;
		return (
		   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sliderback">	
			<div id="myCarousel" className="carousel slide" data-interval="false" data-ride="carousel">
		     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cutom_indicator"id="cutom_indicator1"> 
               <ol className="carousel-indicators custom_carousel-indicators col-lg-12 col-md-12 col-sm-12 col-xs-12">
			      <li data-target="#myCarousel" data-slide-to="0" className=" slider_image1" >
			        {/*<img src="../../../sites/currentSite/images/about2.jpg" className="slideimg" alt="Los Angeles"  />*/}
			      </li>
			      <li data-target="#myCarousel" data-slide-to="1" className=" slider_image2">
	{/*		        <img src="../../../sites/currentSite/images/about3.jpg" className="slideimg" alt="Chicago"  />*/}
			      </li>
			      <li data-target="#myCarousel" data-slide-to="2" className="active slider_image3">
			        {/*<img src="../../../sites/currentSite/images/about4.jpg" className="slideimg" alt="New york"  />*/}
			      </li>
			       <li data-target="#myCarousel" data-slide-to="3" className=" slider_image4">
			       {/* <img src="../../../sites/currentSite/images/about5.jpg" className="slideimg" alt="New york"  />*/}
			      </li>
			      <li data-target="#myCarousel" data-slide-to="4" className=" slider_image5">
			       {/* <img src="../../../sites/currentSite/images/about5.jpg" className="slideimg" alt="New york"  />*/}
			      </li>
		      </ol>
             </div>
             <div className="carousel-inner col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
		      <div className="item active">
		        <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
		      </div>

		      <div className="item">
		        kkk
		      </div>
		    
		      <div className="item">
		        lll
		      </div>
		    </div>
		   </div>
		   <div className="col-lg-12 col-md-12 bordertop_div"></div>
		   <div className="col-lg-offset-1 col-lg-10 col-md-10 col-sm-12 col-xs-12 bannerContainerSlick" id="Divbelowslick">
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
			 <div className="items">
		    	<img className="img img-responsive banner1upImg" src="../../../sites/currentSite/images/brand-1.png" alt="banner"  />
		    </div>
		    <div className="items">
		    	
		    	<div className=" ">
		    	<img className="img img-responsive banner1upImg" src="../../../sites/currentSite/images/brand-2.png" alt="banner"  />
		    		
		    	</div>
		    </div>
		    <div className="items">
		    	<img className="img img-responsive banner1upImg" src="../../../sites/currentSite/images/brand-3.png" alt="banner"  />
		    </div>
		     <div className="items">
		    	<img className="img img-responsive banner1upImg" src="../../../sites/currentSite/images/brand-4.png" alt="banner"  />
		    </div>
		     <div className="items">
		    	<img className="img img-responsive banner1upImg" src="../../../sites/currentSite/images/brand-5.png" alt="banner"  />
		    </div>
		     <div className="items">
		    	<img className="img img-responsive banner1upImg" src="../../../sites/currentSite/images/brand-6.png" alt="banner"  />
		    </div>
		{/*	  <div className="container container-ver2" id="slickblock">
            <div className="brand-content owl-carousel owl-loaded owl-drag">    
               <div className="owl-stage-outer">
                  <div className="owl-stage owl1stclassName" >
                    <div className="owl-item cloned" style={{width: "195px"}}>
                      <div className="items col-lg-2" id="bottom_slick">
                        <a href="#" title="brand">
                          <img className="img-responsive" src="../../../sites/currentSite/images/brand-1.png" alt="Brand"/>
                        </a>
                      </div>
                    </div>
                  <div className="owl-item cloned" style={{width: "195px"}}>
                    <div className="items">
                        <a href="#" title="brand">
                        <img className="img-responsive" src="../../../sites/currentSite/images/brand-2.png" alt="Brand"/>
                        </a>
                     </div>
                    </div>
                    <div className="owl-item cloned" style={{width: "195px"}}>
                     <div className="items">
                        <a href="#" title="brand">
                        <img className="img-responsive" src="../../../sites/currentSite/images/brand-3.png" alt="Brand"/></a>
                     </div>
                   </div>
                   <div className="owl-item cloned" style={{width: "195px"}}>
                    <div className="items">
                        <a href="#" title="brand">
                        <img className="img-responsive" src="../../../sites/currentSite/images/brand-4.png" alt="Brand"/></a>
                     </div>
                    </div>
                    <div className="owl-item cloned" style={{width: "195px"}}>
                     <div className="items">
                        <a href="#" title="brand">
                        <img className="img-responsive" src="../../../sites/currentSite/images/brand-5.png" alt="Brand"/></a>
                    </div>
                    </div>
                    <div className="owl-item cloned" style={{width: "195px"}}>
                     <div className="items">
                        <a href="#" title="brand">
                         <img className="img-responsive" src="../../../sites/currentSite/images/brand-6.png" alt="Brand"/></a>
                    </div>
                    </div>
                    
                    <div className="owl-item cloned" style={{width: "195px"}}>
                    <div className="items">
                        <a href="#" title="brand">
                        <img className="img-responsive" src="../../../sites/currentSite/images/brand-1.png" alt="Brand"/>
                        </a>
                    </div>
                    </div>
                    <div className="owl-item cloned" style={{width: "195px"}}>
                    <div className="items">
                        <a href="#" title="brand">
                        <img className="img-responsive" src="../../../sites/currentSite/images/brand-2.png" alt="Brand"/>
                        </a>
                    </div>
                    </div>
                    <div className="owl-item cloned" style={{width: "195px"}}>
                    <div className="items">
                        <a href="#" title="brand">
                        <img className="img-responsive" src="../../../sites/currentSite/images/brand-3.png" alt="Brand"/>
                        </a>
                    </div>
                    </div>
                        <div className="owl-item cloned" style={{width: "195px"}}>
                        <div className="items">
                            <a href="#" title="brand">
                            <img className="img-responsive" src="../../../sites/currentSite/images/brand-4.png" alt="Brand"/>
                            </a>
                        </div>
                        </div>
                        <div className="owl-item cloned" style={{width: "195px"}}>
                        <div className="items">
                            <a href="#" title="brand">
                            <img className="img-responsive" src="../../../sites/currentSite/images/brand-5.png" alt="Brand"/>
                            </a>
                        </div>
                        </div>
                        <div className="owl-item cloned" style={{width: "195px"}}>
                        <div className="items">
                            <a href="#" title="brand">
                            <img className="img-responsive" src="../../../sites/currentSite/images/brand-6.png" alt="Brand"/>
                            </a>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div className="owl-nav disabled">
                        <div className="owl-prev">
                        <i className="fa fa-angle-left"></i>
                        </div><div className="owl-next">
                        <i className="fa fa-angle-right"></i>
                        </div>
                        </div>
                        <div className="owl-dots disabled">
                        <div className="owl-dot active">
                        <span>
                            
                        </span>
                        </div>
                        </div>
                        </div>
                </div>*/}
                        
			</OwlCarousel>
			</div>
		</div>	
		  </div> 
		);
	}
}
