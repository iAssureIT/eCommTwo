import React from 'react';
import './ContactShopList.css';
import axios from 'axios';

export default class ContactShopList extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      blocks: {
        "blockComponentName"  : "Typecomponent1",
        "blockType"       	  : "simple",
        blockTitle  		  : "This is Block Title",
        blockDescription  	  : "This is a Description. Some text goes here. You can replace the text as per your choice.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        fgImage          	  : "/images/bgimage1.jpg",
        bgImage 			  : "/images/header3.jpg",
        repeatedBlocks 		  : [
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        },
	        						{
							        	Title :"<b>Kisan Fresh</b><br/>Mundhwa - Kharadi Rd,<br/>Amanora Park Town,<br/>Hadapsar, Pune, Maharashtra 411028",
							        	Image :"/images/carloader.gif"
							        }
							       
						    	],
      },
      blockID:"",
      block_id:""
    }; 

    
  }
componentDidMount(){
/*console.log("==>",this.props.block_id);*/
          {
             axios
                .get('/api/blocks/get/'+this.props.block_id)
                .then((response)=>{
                	console.log("res=-0-0",response.data);
                    if(response.data){

                      this.setState({
                          blocks:response.data
                      });
                    }                  
                  })           
                .catch(function(error){
                  console.log(error);
                    if(error.message === "Request failed with status code 401")
                      {
                          // swal("Your session is expired! Please login again.","", "error");
                      }
              })
            }
      this.setState({
                block_id:this.props.block_id
              });

	}

	render() {
		return (
			<div className="">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cshoplistwrap">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxmtop">
						<img height="45px" className="mtop10bqa" src="/images/carloader.gif"/>
						<h4 className="text-center">UniMandai Shop Locations
						</h4>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					{
						Array.isArray(this.state.blocks.repeatedBlocks) && this.state.blocks.repeatedBlocks.length > 0
						    		? 
						    		this.state.blocks.repeatedBlocks.map((result, index)=>{
										// console.log('result', result);
									return(
									    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxOfShop">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
													<img height="45px" className="mtop10a" src={result.Image}/>
													<p dangerouslySetInnerHTML={ { __html:result.Title}}></p>
												
												</div>
											</div>
										</div>
									)
								})
						    	:""
					}
						
					
					</div>
					

				</div>
			</div>
		);
	}
}
