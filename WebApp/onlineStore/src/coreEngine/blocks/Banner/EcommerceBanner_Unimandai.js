import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import Loadable    from 'react-loadable';
import "../../../sites/currentSite/blocks/Banner.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/carousel.js';	
import $                  from 'jquery';
import axios                  from 'axios';
import Loader from "../../common/loader/Loader.js";
import AddressBanner2  from "../../../sites/currentSite/images/AddressBanner2.png";
import AddressBanner1  from "../../../sites/currentSite/images/AddressBanner1.png";
import Background_2    from "../../../sites/currentSite/images/Fruits1.png";
import Background_22   from "../../../sites/currentSite/images/VeggiesBanner1.png";
import OrganicItem     from "../../../sites/currentSite/images/Delivery banner2.png";

export default class EcommerceBanner extends Component {
	constructor(props){
    super(props);
	    this.state = {
	      responsive:{
            0:{
                items:1
            },
            600:{
                items:1
						},
            1000:{
                items:1 
            }
          },
 	
	    };
	  }
	  componentDidMount(){
		this.getBannerImages();
	  }
	  
	getBannerImages(){
		axios.get('/api/bannerimgs/get')
		.then((res)=>{
		  console.log('Banner Images ===>', res.data);
		  this.setState({
			bannerList : res.data
		  })
		})
		.catch((error)=>{
		  console.log('error', error);
		})
	}  
  render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorWhite  marginTop180">
				<Loader type="fullpageloader" />
				<div className="row">
					<div className="">

						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerContainerEcomm">
							<div className="row">
						 		<OwlCarousel
									  className="owl-theme bannercaro bannercaroBtn"
									  loop
                    responsive={this.state.responsive} 
										autoplay={true}
										autoplayHoverPause={true}
										dots={true}
										dotData={true}>
									 	
											{
												Array.isArray(this.state.bannerList) && this.state.bannerList.map((data, index)=>{                                                
													return(
														<div className="item">
															<img className="img img-responsive" src={data.bannerimages} alt="banner"></img>
														</div>
													)
												})
											} 
									
									    {/* <div className="item">
									    	<img className="img img-responsive" src={Background_2} alt="banner" />									    	
									    </div>
									    <div className="item">
									    	<img className="img img-responsive" src={Background_22} alt="banner" />									    	
									    </div>
											<div className="item">
													<img className="img img-responsive" src={AddressBanner1} alt="banner" />									    	
												</div>
											<div className="item">
													<img className="img img-responsive" src={AddressBanner2} alt="banner" />									    	
											</div> 
										<div className="item">
									    	<img className="img img-responsive" src={OrganicItem} alt="banner" />									    	
									    </div> */}
										
									</OwlCarousel>
							</div> 
						</div>
					</div>	
				</div>
			</div>
		);
	}
}