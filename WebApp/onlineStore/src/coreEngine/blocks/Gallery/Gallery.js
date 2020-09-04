import React from 'react';
import  '../../../sites/currentSite/pages/PhotoGallery.css';
import    UniImage  from '../../../sites/currentSite/images/about4.jpg';
import axios from 'axios';


export default class Gallery extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
		"PhotoList" : [],
	}
  }
componentDidMount(){
			axios.get("/api/gallery/get/")			
            .then((response) => {     	
                    if(response.data){
						console.log("gallery data:",response.data);
						this.setState({
							"galleryList" : response.data,
						})
						console.log("gallery list ===",this.state.galleryList);
                    }                  
                  })           
                .catch(function(error){
                  console.log(error);
                    
              })            

	}

	render() {
		return (
			<div className="">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cshoplistwrap galleryWrapper">
					{/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxmtop">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">							
							<div className="col-lg-12 col-md-12 col-sm-12 ">
							<h4 className="text-center">UniMandai Photo Gallery</h4>
							</div>
						</div>					
					
					</div> acha*/}
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					{
						Array.isArray(this.state.galleryList) && this.state.galleryList.length > 0
						    		? 
						    		this.state.galleryList.map((data, index)=>{										
									return(
									    <div className="col-lg-3 col-md-4 col-sm-3 col-xs-12">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxOfShop">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding galleryImg ">
													<img height="45px" className=" img img-responsive mtop10a" src={data.galleryImage}/>													
												</div>
											</div>
										</div>
									)
								})
						    	:""
					}
                    
                    {/* <div className="col-lg-3 col-md-4 col-sm-3 col-xs-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxOfShop">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <img height="45px" className=" img img-responsive mtop10a" src={UniImage}/>													
                            </div>
                        </div>
                    </div> */}
					
					</div>
					

				</div>
			</div>
		);
	}
}
