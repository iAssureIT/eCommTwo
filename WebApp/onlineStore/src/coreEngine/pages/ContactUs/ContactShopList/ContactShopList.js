import React from 'react';
import './ContactShopList.css';
import axios from 'axios';

import SiteLogo from '../../../../sites/currentSite/images/anasLogo.png';

export default class ContactShopList extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
		"franchiseList" : [],
	}
     
  
  }
componentDidMount(){
/*console.log("==>",this.props.block_id);*/
           var entityType ="franchise";
			axios.get("/api/entitymaster/get/"+entityType)			
            .then((response) => {     	
                    if(response.data){
						console.log("franchise data:",response.data);
						this.setState({
							"franchiseList" : response.data,
						})
						console.log("Franchise list ===",this.state.franchiseList);
                    }                  
                  })           
                .catch(function(error){
                  console.log(error);
                    
              })
            

	}

	render() {
		return (
			<div className="">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cshoplistwrap">
				    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxmtop">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
							<img height="45px" className="col-lg-2 col-lg-offset-5 " src={SiteLogo}/>
							<div className="col-lg-12 col-md-12 col-sm-12 ">
							<h4 className="text-center">AnasHnadicraft Shop Location</h4>
							</div>
						</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">				
				      <div className="col-lg-offset-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxOfShop">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
								<img height="45px" className=" img img-responsive mtop10a" src=""/>
								<div className="franchiseName">Anas Handicrafts</div>
								<div>Above Barista Cafe,</div>
								<div> Opposite Arora Towers, 
									MG Road, Camp, Pune
									411001</div>																																					
							</div>
						</div>
					 </div>
					</div>
				</div>
			</div>
		);
	}
}
