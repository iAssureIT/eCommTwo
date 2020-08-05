import React, { Component } from 'react';
import '../../../sites/currentSite/blocks/Banner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/carousel.js';
import "../../../sites/currentSite/blocks/Marketing.css";

export default class Marketing extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
				<div className="col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 mb50  marketing_div">
					<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
					  <img className="marketingImg" src={require("../../../sites/currentSite/images/marketing1.png")} />
					  <h3 className="marketingImg_txt text-center">Royal Kingsly Interior Furniture</h3>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
					  <img className="marketingImg" src={require("../../../sites/currentSite/images/marketing2.png")} />
					  <h3 className="marketingImg2_txt text-center">Pure Hands Crafted Classic Design</h3>
					</div>
				</div>
		);
	}
}