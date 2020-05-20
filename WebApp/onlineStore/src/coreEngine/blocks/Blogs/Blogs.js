import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/carousel.js';	
import $                  from 'jquery';
import React from 'react';
// import "../../../sites/currentSite/blocks/Blogs.css";
import "../../../sites/4_UniMandai/blocks/Blogs.css";


export default class OurCources extends React.Component {
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
            1000:{
                items:1 
            }
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

	render() {
		var data = this.state.OurCources;
		var data1=this.state.OurCourcesmaster;
		return (
			<div>
				<div className="container col-lg-12 col-md-12 hidden-xs hidden-sm ocWrap">
					<div className="mtop65">
						 <div className="col-lg-12 ">
							<img src="/images/title-lastest-from.png" className="col-lg-offset-6 blogTopImg"/>
					
						   </div>
						   
						<div className="col-lg-12 ">
						 <div className="ocTitle txt2c offeredTitle text-center">Lastest From Blog</div>
							<div className="col-lg-12 ">
							 <div className="col-lg-offset-6 blogTopText">SEE ALL</div>
						   </div> 
                            <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 courceblockDiv1 movemasterdiv">
                            <OwlCarousel
							    className="owl-theme customnNavButtonEcommerceND col-md-12 col-lg-12 col-sm-12 col-xs-12 boxShadow"
							    	loop
								    margin 			=  {20}
								    items  			=  {3}
								    nav    			=  {0}
								    dots   			=  {0}
								    responsiveClass =  {true}
								    autoplay        =  {false}
								>
							{
		                		data1 && data1.length > 0 ?
				      				data1.map((data1, index)=>{
	                					return(

						          		<div className="col-lg-12 Allblog ">
						          		  <div className="col-lg-12 courceblockDiv NOpadding">
						          			 <div className="col-lg-12 courceDiv NOpadding "> 
						          			   <img className="img-responsive blockimg1 zoom " src={data1.bloggerImg} alt="Bannerpng"/>
						          			  </div>
						          			  <div className="col-lg-12 All1blog1">
					          					 <div className="ohide">	
												 </div>
													<p className="date">{data1.blogDate}</p>
													<h4 className="blog_content">{data1.blogTitle}</h4>
													<p className="blog_comment">{data1.blogPara}</p>
												</div>
						          			</div>
						          		</div>	
						          			);
	                					})
	                				:
	                				null
		                		}
                              </OwlCarousel>
		                	</div>	
						</div>
						<div className="col-lg-12 paddiv text-center">
						 <div className="col-lg-12 ">
							
						 </div>  
						</div>
						{/*<div className="col-lg-12">
							<div className="col-lg-offset-5">
								<div className="occmpbtn"> VIEW ALL COURCES</div>
							</div>
						</div>
*/}
					</div>					
				</div>
	
			</div>
		);
	}
}
