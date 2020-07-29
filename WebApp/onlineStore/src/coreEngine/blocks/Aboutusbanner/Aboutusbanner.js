import React, { Component } from 'react';
import "../../../sites/currentSite/blocks/Aboutusbanner.css";
import Aboutus_Banner from '../../../sites/currentSite/images/About_us_1920x500.png';

export default class Aboutusbanner extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    };
  	}  
  render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
				<div className="row">
					<div className="aboutusbanner" style={{'background' : "url("+Aboutus_Banner +")"}}>
						<h1 className="col-lg-12 col-md-12 hidden-sm hidden-xs aboutheading">ABOUT US</h1>
						<h4 className="col-xs-12 col-sm-12 hidden-lg hidden-md aboutheading">ABOUT US</h4>
						<ul className="breadcrumb aboutbread">
						  <li><a href="/" title="GO TO HOME PAGE">HOME</a></li>
						  <li>ABOUT US</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}