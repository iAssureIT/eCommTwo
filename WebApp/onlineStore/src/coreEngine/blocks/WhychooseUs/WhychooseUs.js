import React from 'react';

import '../../../sites/4_UniMandai/blocks/WhychooseUs.css';
import icon_choose_1 	from '../../../sites/currentSite/images/icon-choose-1.png';
import icon_choose_2 	from '../../../sites/currentSite/images/icon-choose-2.png';
import icon_choose_3 	from '../../../sites/currentSite/images/icon-choose-3.png';
import icon_choose_4 	from '../../../sites/currentSite/images/icon-choose-4.png';
import icon_choose_5 	from '../../../sites/currentSite/images/icon-choose-5.png';
import icon_choose_6 	from '../../../sites/currentSite/images/icon-choose-6.png';
import images_choose 	from "../../../sites/currentSite/images/images-choose.jpg";
import one 						from '../../../sites/currentSite/images/1.jpg';

export default class OurCources extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"OurCources"		: [
								{
									blogDate:"DEC 17,2016",
									blogTitle:"100% Organic",
									blogPara:"Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor.",
									bloggerImg:one,
									blogsubimg:icon_choose_1,
								},
								{
									blogDate:"DEC 17,2016",
									blogTitle:"Family healthy",
									blogPara:"Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor",								
									blogsubimg:icon_choose_2,
								},
								{
									blogDate:"DEC 17,2016",
									blogTitle:"Always Fresh",
									blogPara:"Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor",								
									blogsubimg:icon_choose_3,
								},
						],

		    "OurCourcesmaster" : [
							{
								blogDate:"DEC 17,2016",
								blogTitle:"100% Organic",
								blogPara:"Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor.",
								bloggerImg:one,
								blogsubimg:icon_choose_4,
							},
							{
								blogDate:"DEC 17,2016",
								blogTitle:"Family healthy",
								blogPara:"Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor",								
								blogsubimg:icon_choose_5,
							},
							{
								blogDate:"DEC 17,2016",
								blogTitle:"Always Fresh",
								blogPara:"Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor",								
								blogsubimg:icon_choose_6,
							},
						]				  
	};
	}

	render() {
		var data = this.state.OurCources;
		var data1=this.state.OurCourcesmaster;
		return (
			<div>
				<div className="col-lg-12 col-md-12 hidden-xs hidden-sm ocWrap WCUWrap " style={{marginbottom:"100px"}}>
					<div className="mtop65">
					 <div className="ocTitle txt2c offeredTitle text-center"><h3>Why Choose Us</h3></div>
					  <div className="col-lg-12 ">
						<div className="col-lg-8 col-lg-offset-2 text-center whyusText"><p>The fact of the matter is that you really know something's organic when you find bugs! they obviously wouldn't have made it that far in a non-organic growing environment, so better than any certification or seal on a package, the presence of creatures let you know the plant was healthy and.</p></div>
					  </div> 
						<div className="col-lg-12 whyUsDiv">
							<div className="col-lg-3  courceblockDiv1 courceblockDiv12">
							{
		                		data && data.length > 0 ?
				      				data.map((data, index)=>{
	                					return(
						          			<div className="col-lg-12 Allblog whyUsSubDiv">
						          			 <div className="col-lg-12">
                                               <div className="col-lg-2">
                                                <img src={data.blogsubimg}/>
                                               </div>
                                               <div className= "col-lg-10">
                                                <p className="subtext_choose">{data.blogTitle}</p>
                                               </div>
                                              </div>
                                              <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <p className="choosepara text-left">{data.blogPara}</p>
                                              </div>
						          		</div>	
						          			);
	                					})
	                				:
	                				null
		                		}
		                	</div>
		                		<div className="col-lg-4">
		                		 <img src={images_choose}/>
		                		</div>
                            <div className="col-lg-offset-1 col-lg-3 courceblockDiv1 movemasterdiv">
                           {/*  <div className=" col-md-2"></div>*/}
							{
		                		data1 && data1.length > 0 ?
				      				data1.map((data1, index)=>{
	                					return(
						          			<div className="col-lg-12 Allblog whyUsSubDiv">
						          			 <div className="col-lg-12">
                                               <div className= "col-lg-10">
                                                <p className="subtext_choose">{data1.blogTitle}</p>
                                               </div>
                                               <div className="col-lg-2">
                                                <img src={data1.blogsubimg}/>
                                               </div>
                                              </div>
                                              <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <p className="choosepara text-right">{data1.blogPara}</p>
                                              </div>
						          		</div>	
						          			);
	                					})
	                				:
	                				null
		                		}
		                	</div>	
						</div>
						
					</div>					
				</div>

			</div>
		);
	}
}
