import React, { Component } from 'react';
import "../../../../sites/currentSite/blocks/HomePageBanner2.css";

import HomePageBanner2_1 from "../../../../sites/currentSite/images/Vegetables.png"
import HomePageBanner2_2 from "../../../../sites/currentSite/images/Fruits.png"
import HomePageBanner2_3 from "../../../../sites/currentSite/images/frozen-vegetables.png"

class HomePageBanner2 extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 HomePageBanner2">
                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 ">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 imageBlock">
                            <a className="hover-images col-lg-12" href="/" >
                                <img className="img-responsive zoomImg col-lg-12" src={HomePageBanner2_1} alt="banner" />
                            </a>                        
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 imageBlock">
                            <a className="hover-images col-lg-12" href="/">
                                <img className="img-responsive zoomImg col-lg-12" src={HomePageBanner2_2} alt="banner" />
                            </a>                        
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 imageBlock">
                            <a className="hover-images col-lg-12" href="/">
                                <img className="img-responsive zoomImg col-lg-12" src={HomePageBanner2_3} alt="banner" />
                            </a>                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default HomePageBanner2;