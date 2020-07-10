import React, { Component } from 'react';
import "../../../sites/currentSite/blocks/Aboutusbanner.css";
import Aboutus_Banner from '../../../sites/currentSite/images/About_us_Banner.png';

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
						<p className="col-lg-12 aboutheading">ABOUT US</p>
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