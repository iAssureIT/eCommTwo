import React, { Component } from 'react';
import "../../../../sites/currentSite/blocks/HomePageBanner2.css";

class HomePageBanner2 extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 HomePageBanner2">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <a className="hover-images" href="/" >
                            <img className="img-responsive zoomImg" src="/images/unimandai/HomePageBanner2-1.jpg" alt="banner" />
                        </a>                        
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <a className="hover-images" href="/">
                            <img className="img-responsive zoomImg" src="/images/unimandai/HomePageBanner2-2.jpg" alt="banner" />
                        </a>                        
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <a className="hover-images" href="/">
                            <img className="img-responsive zoomImg" src="/images/unimandai/HomePageBanner2-3.jpg" alt="banner" />
                        </a>                        
                    </div>
                </div>
            </div>
        )
    }

}

export default HomePageBanner2;