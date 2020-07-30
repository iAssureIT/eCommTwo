import React, { Component } from 'react';
import "../../../sites/currentSite/blocks/Aboutusmultistore.css";
import founderImg   from "../../../sites/currentSite/images/userimg.png";
import $ from 'jquery';
import ReactPlayer from 'react-player'

export default class Aboutusmultistore extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
	  }
	  componentDidMount(){
	  	$("#morecontent").css("display","none");
	  }  
	  showmore(){
	  	$("#morecontent").css("display", "block");
	  }

  VideoData(){
        return [
            {
                video1st        : "https://iogsolutions-my.sharepoint.com/personal/anurag_shinde_iogsolutions_com/_layouts/15/onedrive.aspx?originalPath=aHR0cHM6Ly9pb2dzb2x1dGlvbnMtbXkuc2hhcmVwb2ludC5jb20vOmY6L3AvYW51cmFnX3NoaW5kZS9Fc0VrNEo3cWtVaEx1UlRNNjBEUUttTUJndDB1WElqTjUwRmNjLU5ZT3dIUEp3P3J0aW1lPWFfRjg1Wlp0MTBn&id=%2Fpersonal%2Fanurag%5Fshinde%5Fiogsolutions%5Fcom%2FDocuments%2FMarketing%20Activities%2FWebsite%20Revamp%2FVideos%2F05%20iOG%20SCM%2Emp4&parent=%2Fpersonal%2Fanurag%5Fshinde%5Fiogsolutions%5Fcom%2FDocuments%2FMarketing%20Activities%2FWebsite%20Revamp%2FVideos",
                downstreamtext  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, elit id pharetra cursus, turpis ex mollis magna, eu fringilla urna ante ut tellus. Cras imperdiet tristique venenatis Vivamus elementum enim ipsum, nec pharetra sapien ornare eu. Mauris quis arcu quis tortor imperdiet viverra. Sed ut iaculis",
                link            : "https://www.youtube.com/watch?v=VXYXuLuiEug",
            }, 
            {
          
                downstreamtext  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, elit id pharetra cursus, turpis ex mollis magna, eu fringilla urna ante ut tellus. Cras imperdiet tristique venenatis Vivamus elementum enim ipsum, nec pharetra sapien ornare eu. Mauris quis arcu quis tortor imperdiet viverra. Sed ut iaculis",
                 link           : 'https://www.youtube.com/watch?v=BZ-Cg9PkcTo&list=UUqra0hFoxUFWDBeJ59cQYGg', 
            },
             {
          
                downstreamtext  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, elit id pharetra cursus, turpis ex mollis magna, eu fringilla urna ante ut tellus. Cras imperdiet tristique venenatis Vivamus elementum enim ipsum, nec pharetra sapien ornare eu. Mauris quis arcu quis tortor imperdiet viverra. Sed ut iaculis",
                 link           : 'https://www.youtube.com/watch?v=TlJakyoY4rw', 
            },
             {
          
                downstreamtext  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, elit id pharetra cursus, turpis ex mollis magna, eu fringilla urna ante ut tellus. Cras imperdiet tristique venenatis Vivamus elementum enim ipsum, nec pharetra sapien ornare eu. Mauris quis arcu quis tortor imperdiet viverra. Sed ut iaculis",
                 link           : 'https://www.youtube.com/watch?v=4bfyZ8DhQCI&list=UUqra0hFoxUFWDBeJ59cQYGg&index=22', 
            },
             {
          
                downstreamtext  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, elit id pharetra cursus, turpis ex mollis magna, eu fringilla urna ante ut tellus. Cras imperdiet tristique venenatis Vivamus elementum enim ipsum, nec pharetra sapien ornare eu. Mauris quis arcu quis tortor imperdiet viverra. Sed ut iaculis",
                 link           : 'https://www.youtube.com/watch?v=FqF_PhNDr7w', 
            },
             {
          
                downstreamtext  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, elit id pharetra cursus, turpis ex mollis magna, eu fringilla urna ante ut tellus. Cras imperdiet tristique venenatis Vivamus elementum enim ipsum, nec pharetra sapien ornare eu. Mauris quis arcu quis tortor imperdiet viverra. Sed ut iaculis",
                 link           : 'https://www.youtube.com/watch?v=f9axKUfpEJ4', 
            },
        ]
    }

	  
  render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
				<div className="row">
					<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
						<div className="">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 multistorebgimg">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center multistorebgimgtext">
										<h3 className="mb50 promisstxt">Our Committment</h3>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<p className=" textparaabout1">
												We promise that buying products from us; will be an exceptional experience.
												We promise that, wherever humanely possible, we will meet and exceed all customer needs & expectations.
												We promise that, in the unfortunate occasions when problems occur, we will own them and solve them with the least inconvenience to our customers.
												We promise that all our people will develop and maintain habits of excellence in all that they do.
											</p>
									   </div>		
									</div>
								</div>
								<div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								 <h3 className="mb50 promisstxt">The World of AnasHnadicraftts</h3>
								  <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                     {
				                      this.VideoData().map((data, index)=>{
				                      return (
				                        <div key={index} className="col-lg-4  col-md-4 col-sm-12 col-xs-12">
				                        <div className="videocard1_new">
				                            <div className="introvideo">      
				                             {/* <video width="320" height="240" controls>
				                                <source src={data.link} />
				                              </video>*/}
				                               <ReactPlayer url={data.link} width='324px' height='211px' controls loop  />
				                            </div>          
				                          <div className="go-corner" href="#">
				                            <div className="go-arrow">
				                            </div>
				                          </div>
				                        </div>
				                        </div>
				                         );
				                      })
				                    }   
				                 </div>
							   </div> 
							</div>
							{/* <div className="col-lg-6">
								<div className="col-lg-12 multistorebgimg2">
									<div className="col-lg-12 text-left multistorebgimgtext">
										<h3>Connected Commerce</h3>
										<p className="mt50 textparaabout1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
									</div>
								</div>
							</div> */}
						</div>
					
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 messageDiv">
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
						  <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
						    <div className="col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10">
							 <h3 className="mb50 promisstxt">About The Founder</h3>
						    </div>
						   </div> 
						  </div> 	
						 <div  className="backgrd_curve1 col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 head_spacing">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 takeleft">
                                 </div>
                                    <div className="col-lg-offset-1 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                      <img src={founderImg} alt="" className="director_img"/>
                                    </div>
                                  </div>
                                  <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12">
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 messageDiv1">
                                          <h2 className="para-top3 txt-size-director textcoloryellow"><b>Anas Khan</b></h2>
                                          <h4 className="txt-size-founder lightbluetext subheading_foundr"><b>Founder and Director of AnasHandicrafts</b></h4>
                                            <p className="para_spacing text-justify pull-right"></p> 
                                           <ul className="alg_lft">
                                            <li className="line_ht founderpara col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <p> We are nothing without our customers. We are priceless because they choose
	                                                to invest their faith in us. Their continued patronage and complete conviction
	                                                in our services inspires us to seek better solutions every day. This commitment is
	                                                the corner stone of our Quality Policy and we strive to achieve it by putting into 
	                                                place a Quality System which adheres to the Industry Standard.</p>
	                                            <p>Every employee at AnasHandicraftts is continually involved in achieving the company’s core objectives.
	                                               We do not have Impossible word in our dictionary. What we have is the vision, the commitment and the
	                                                expertise to become a leader.</p>
	                                            <p> To provide personalized service, on-schedule deliveries
	                                                and reliable quality at competitive prices at all times through our expertise while making
	                                                it a working pleasure for our staff, vendors and our customers. Our long-term success requires
	                                                a total commitment to exceptional standards of performance and productivity, to working together
	                                                 effectively, and to a willingness to embrace new ideas and learn continuously. </p>
	                                                 
	                                                </li>
                                                 
                                          </ul>                                     
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