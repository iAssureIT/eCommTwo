import React, { Component }       from 'react';
// import Gallery                    from "../../blocks/Gallery/Gallery.js";
import Gallery              from '../../blocks/Gallery/Gallery.js';
import SmallBanner          from '../../blocks/SmallBanner/SmallBanner.js';
import topBannerImg         from '../../../sites/currentSite/images/contact_us.png';

class PhotoGallery extends Component {
    constructor(props){
    super(props);
    this.state={
        bannerData : {
            title : "Photo Gallery",
            breadcrumb : 'Our Photo gallery',
            backgroungImage : topBannerImg,
        },
    }
} 
  render() {
    return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray">
          <div className="row">
                <SmallBanner bannerData={this.state.bannerData}/>              
                <Gallery />            
          </div>
        </div>
    );
  }
}

export default (PhotoGallery);
