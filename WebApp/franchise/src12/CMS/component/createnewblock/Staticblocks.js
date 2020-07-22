import React 						from 'react';
import {Route, withRouter} 			from 'react-router-dom';


import Typecomponent1                from "../blockTemplate/Typecomponent1/Typecomponent1.js";
import Aboutusbanner                from "../blockTemplate/Aboutusbanner/Aboutusbanner.js";
import Aboutusmultistore                from "../blockTemplate/Aboutusmultistore/Aboutusmultistore.js";
import PrivacyPolicy                from "../blockTemplate/PrivacyPolicy/PrivacyPolicy.js";
import ReturnPolicy                from "../blockTemplate/ReturnPolicy/ReturnPolicy.js";
import LegalNotice                from "../blockTemplate/LegalNotice/LegalNotice.js";

// import CircleMenuBars            	 from "../blockTemplate/CircleMenuBars/CircleMenuBars.js";


import 									 './Staticblocks.css';



class Staticblocks extends React.Component {

	constructor(props) {
		super(props);
	}

	selectComponent(event){
		var blockTitle 			= "";
		var blocksubTitle 		= "";
		var blockDescription 	= "";
		var blockType 			= "";
		var blockLink 			= "";
		var bgImage 			= "";
		var bgVideo 			= "";
		var fgImage 			= "";
		var rBlocksTitle 		= "";
		var rBlocksSubTitle 	= "";
		var rBlocksDescription 	= "";
		var rBlocksImage 		= "";
		var rBlocksVideo 		= "";
		var rBlocksLink         = "";
		var RepetedBlock        = "";
	   

		var componentName = event.target.id;
		var element = document.getElementById("id");

		if(event.target.getAttribute("data-blockTitle")){
			blockTitle = event.currentTarget.getAttribute("data-blockTitle");
		}
		if(event.target.getAttribute("data-blocksubTitle")){
			blocksubTitle = event.currentTarget.getAttribute("data-blocksubTitle");
		}
		if(event.target.getAttribute("data-blockDescription")){
			blockDescription = event.currentTarget.getAttribute("data-blockDescription");
		}
		if(event.target.getAttribute("data-blockType")){
			blockType = event.currentTarget.getAttribute("data-blockType");
		}
		if(event.target.getAttribute("data-fgImage")){
			fgImage = event.currentTarget.getAttribute("data-fgImage");
			console.log("fgImage  =>",fgImage);
		}
		if(event.target.getAttribute("data-bgImage")){
			bgImage = event.currentTarget.getAttribute("data-bgImage");
			console.log("bgImage  =>",bgImage);
		}
		if(event.target.getAttribute("data-bgVideo")){
			bgVideo = event.currentTarget.getAttribute("data-bgVideo");
			console.log("bgVideo  =>",bgVideo);
		}
		if(event.target.getAttribute("data-blockLink")){
			blockLink = event.currentTarget.getAttribute("data-blockLink");
			console.log("blockLink  =>",blockLink);
		}
		if(event.target.getAttribute("data-rBlocksTitle")){
			rBlocksTitle = event.currentTarget.getAttribute("data-rBlocksTitle");
		}
		if(event.target.getAttribute("data-rBlocksSubTitle")){
			rBlocksSubTitle = event.currentTarget.getAttribute("data-rBlocksSubTitle");
		}
		if(event.target.getAttribute("data-rBlocksDescription")){
			rBlocksDescription = event.currentTarget.getAttribute("data-rBlocksDescription");
		}
		if(event.target.getAttribute("data-rBlocksImage")){
			rBlocksImage = event.currentTarget.getAttribute("data-rBlocksImage");
		}
		if(event.target.getAttribute("data-rBlocksVideo")){
			rBlocksVideo = event.currentTarget.getAttribute("data-rBlocksVideo");
		}
		if(event.target.getAttribute("data-rBlocksLink")){
			rBlocksLink = event.currentTarget.getAttribute("data-rBlocksLink");
		}
		if(event.target.getAttribute("data-RepetedBlock")){
			RepetedBlock = event.currentTarget.getAttribute("data-RepetedBlock");
		}

	

		var queryString = 	"componentName="+componentName
							+"&blockTitle="+blockTitle
							+"&blocksubTitle="+blocksubTitle
							+"&blockDescription="+blockDescription
							+"&blockType="+blockType
							+"&fgImage="+fgImage
							+"&bgImage="+bgImage
							+"&bgVideo="+bgVideo
							+"&blockLink="+blockLink
							+"&RepetedBlock="+RepetedBlock
							+"&rBlocksTitle="+rBlocksTitle
							+"&rBlocksSubTitle="+rBlocksSubTitle
							+"&rBlocksDescription="+rBlocksDescription
							+"&rBlocksImage="+rBlocksImage
							+"&rBlocksVideo="+rBlocksVideo
							+"&rBlocksLink="+rBlocksLink

							
		
		this.props.history.push('/cms/create-new-block?'+queryString);
	}

	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 bgclrwhtforstatic">

				<div className="boxItem1Statickblocks ">
				<div className=" txtCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
					<div className="  col-lg-12 col-md-12 col-sm-12 col-xs-12 ">

                    	<h2 className="text-center">Select Required Design from Following list </h2>
            		</div>
            	</div>{/*
					<section className="col-lg-12 col-md-12 col-sm-12 col-xl-12 selectHover m10">	
			            <button id="Typecomponent1" 
								data-blockTitle="blockTitle" 
			                	data-blockDescription="blockDescription" 
								data-fgImage="fgImage" 
			                	className="btn zIndexmtop pull-right" 
			                	onClick={this.selectComponent.bind(this)} > 
			                	Select this Design
			            </button>		            
						<Typecomponent1 /> 
					</section>*/}
					
					<section className="col-lg-12 col-md-12 col-sm-12 col-xl-12 selectHover m10">	
			            <button id="Aboutusbanner" 
								data-blockTitle="blockTitle" 
			                	
								data-bgImage="bgImage" 
			                	className="btn zIndexmtop pull-right" 
			                	onClick={this.selectComponent.bind(this)} > 
			                	Select this Design
			            </button>		            
						<Aboutusbanner /> 
					</section>
					
					<section className="col-lg-12 col-md-12 col-sm-12 col-xl-12 selectHover m10">	
			            <button id="Aboutusmultistore" 
								data-blockTitle="blockTitle" 
			                	data-blocksubTitle="blocksubTitle" 
			                	data-blockDescription="blockDescription" 
			                	data-RepetedBlock="RepetedBlock" 
			                	data-rBlocksTitle="rBlocksTitle" 
			                	data-rBlocksSubTitle="rBlocksSubTitle" 
								
			                	className="btn zIndexmtop pull-right" 
			                	onClick={this.selectComponent.bind(this)} > 
			                	Select this Design
			            </button>		            
						<Aboutusmultistore /> 
					</section>
					
					<section className="col-lg-12 col-md-12 col-sm-12 col-xl-12 selectHover m10">	
			            <button id="PrivacyPolicy" 
								data-blockTitle="blockTitle" 
			                	data-blockDescription="blockDescription" 
								
			                	className="btn zIndexmtop pull-right" 
			                	onClick={this.selectComponent.bind(this)} > 
			                	Select this Design
			            </button>		            
						<PrivacyPolicy /> 
					</section>
					
					
					<section className="col-lg-12 col-md-12 col-sm-12 col-xl-12 selectHover m10">	
			            <button id="ReturnPolicy" 
								data-blockTitle="blockTitle" 
			                	data-blockDescription="blockDescription" 
								
			                	className="btn zIndexmtop pull-right" 
			                	onClick={this.selectComponent.bind(this)} > 
			                	Select this Design
			            </button>		            
						<ReturnPolicy /> 
					</section>
					
					
					<section className="col-lg-12 col-md-12 col-sm-12 col-xl-12 selectHover m10">	
			            <button id="LegalNotice" 
								data-blockTitle="blockTitle" 
			                	data-blockDescription="blockDescription" 
							 
			                	className="btn zIndexmtop pull-right" 
			                	onClick={this.selectComponent.bind(this)} > 
			                	Select this Design
			            </button>		            
						<LegalNotice /> 
					</section>
					
					

				</div>
			</div>
		);
	}
}

export default withRouter(Staticblocks);
