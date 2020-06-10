import React, { Component } from 'react';
// import { render } from 'react-dom';

// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import '../../../sites/currentSite/common/Footer.css';

export default class Footer extends Component {

    constructor(props){
    super(props);
        this.state = {
          categoryDetails:[],
           companyInfo   :"",
           Locationdata  :[],
        }
    }
    componentDidMount(){
     
      this.getCompanyDetails();

      axios.get("/api/category/get/list")
                .then((response)=>{
                  this.setState({
                      categoryDetails : response.data
                  })
                })
                .catch((error)=>{
                    console.log('error', error);
                })  
    }

    getCompanyDetails(){
        axios.get("/api/companysettings/list")
          .then((response)=>{ 
            // console.log("companyData:" ,response.data[0]);
              this.setState({
                companyInfo   : response.data[0],
                locationdata  : response.data[0].companyLocationsInfo,
             
            },
                ()=>{
              })
          })
          .catch((error)=>{
                console.log('error', error);
          })
    }

    render(){
       return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerWrapper">
        <br/>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerAnimation"></div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footer1">
            <div className="container col-lg-offset-1  col-lg-10 col-md-10 col-sm-10 col-xs-10">
            <div className="col-sm-12 col-sm-3">
                <div className="footer-top">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title-footer NoPadding"> 
                About Us
                </div>   
                 <p className="footer-v3">With more than 15 years of experience we can proudly say that we are one of the best in business, a trusted supplier for more than 1000 companies...</p>
                </div>
            </div>
            <div className="col-sm-12 col-sm-3">
                <div className="footer-top">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding title-footer"> 
                     Information
                </div>   
               <ul className="sublist">
                    <li><a href="/">Delivery</a></li>
                    <li><a href="/">Legal Notice</a></li>
                    <li><a href="/">About Us</a></li>
                    <li><a href="/">Secure Payment</a></li>
                    <li><a href="/">Our Stores</a></li>
                </ul>
                </div> 
            </div>
            <div className="col-sm-12 col-sm-3">
                <div className="footer-top">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title-footer NoPadding"> 
                   <p className="footertxt">Get It Touch</p>
                <div class="social space-30">
                    <ul className="no-icon-list socialicon col-lg-12">
                      <li className="col-lg-2"><a href="#" target="_blank"><i className="col-lg-3 fa fa-twitter" aria-hidden="true"></i></a></li>
                      <li className="col-lg-2"><a href="#" target="_blank"><i className="facebook col-lg-3 fa fa-facebook" aria-hidden="true"></i></a></li>
                      <li className="col-lg-2"><a href="#" target="_blank" ><i className="col-lg-3 fa fa-linkedin" aria-hidden="true"></i></a></li>
                      <li className="col-lg-2"><a href="#" target="_blank"><i className="col-lg-3 fa fa-whatsapp whatsupIcon" aria-hidden="true"></i></a></li>
                    </ul>
                </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title-footer NoPadding"> 
                   Payment Accept
                </div>
                <a href="#" title="paypal"><img src="/images/paypal-footer.png" alt="images"/></a>
             </div>
            </div>
            <div className="col-sm-12 col-sm-3">
                <div className="footer-top">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title-footer NoPadding"> 
                     Get Newsletter
                </div>  
                <p className="footer-v3">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p> 
                <form action="#" method="get" accept-charset="utf-8" className="subscribe">
                   <input type="text" className="input-text required-entry validate-email form-control subscribeMail" placeholder="Enter your Email" />
                    <button class="button button1 hover-white" title="Subscribe" type="submit">Subscribe<i class="fa fa-long-arrow-right"></i></button>
                 </form>
                </div>
            </div>
            </div>
        </div>
       {/* <div className="container">
            <div className="footer col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="footer-middle">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 logo-nb"> 
                            <a href="/" title="">
                                <img src="/images/anasLogo.png" alt="" />
                            </a>
                        </div>
                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6"> 
                            <div className="footer-middle-contact">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding"> 
                                <strong>CONTACT US</strong>
                            </div>    
                                <div className="col-lg-3 icondiv">
                                    <i className="fa fa-map-marker"></i>
                                </div>
                                {   this.state.locationdata && this.state.locationdata.length > 1 ?

                                    
                                        
                                        this.state.locationdata.map((data, index)=>{
                                           return(

                                                 <div key={index} className="col-lg-9 addressDetails">  
                                                    <a>{data.locationType},&nbsp;{data.landmark}<br />{data.blockName}, &nbsp;{data.area},
                                                    {data.city}-{data.pincode}</a>

                                                </div>
                                            );
                                        })
                                    : null
                                }
                            </div>
                        </div> 

                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
                            <strong className="hidelabel">phone</strong> 
                        </div>
                            <div className="col-lg-3 icondiv">
                                <i className="fa fa-phone"></i>
                            </div>
                            <div className="col-lg-9 addressDetails">  
                            <a href="/">Mob:+91-{this.state.companyInfo.companyContactNumber}<br />Mob:+91-{this.state.companyInfo.companyMobileNumber}</a>
                            </div>
                        </div> 

                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
                        <strong className="hidelabel">contact</strong>
                        </div>
                            <div className="col-lg-3 icondiv">
                                <i className="fa fa-envelope"></i>
                            </div>
                            <div className="col-lg-9 addressDetails">  
                            <a href="/">{this.state.companyInfo.companyEmail}<br />{this.state.companyInfo.companyAltEmail}</a>
                            </div>
                        </div>

                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">    
                            <strong>FOLLOW US</strong>
                        </div>    
                            <div className="col-lg-12 socialMedia">  
                                <ul>
                                    <li><a className="circle spin" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"> <i className="fa fa-facebook-f icon-facebook"></i></a></li>
                                    <li><a className="circle spin" target="_blank" rel="noopener noreferrer" href="https://twitter.com/"> <i className="fa fa-twitter icon-twitter icon-twitter"></i> </a></li>
                                    <li><a className="circle spin" target="_blank" rel="noopener noreferrer" href="https://plus.google.com/"> <i className="fa fa-google-plus icon-gplus"></i></a></li>
                                    <li className="ic-pinterest"><a className="circle spin" target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/"> <i className="fa fa-pinterest-square icon-pinterest"></i></a></li>
                                    <li><a className="circle spin" target="_blank" rel="noopener noreferrer" href="http://www.linkercreative.com/"> <i className="fa fa-linkedin icon-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div> 
                    </div>
                </div>
                
                <div className="categoryDiv row">
                    
                    
                    
                </div>
                <br />
            </div>
        </div>*/} 
        <div className="footer3">
            <div className="container">
            <div className="footer_bottom">
                <div className="col-sm-4 col-md-4 col-lg-6 copyrighttxt">
                    <p>Copyright @2020 <i className="fa fa-copyright"></i> Unimandai All Rights Reserved.</p>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 footernabbar">
                 <ul>
                  <li><a href="#home">Contact Us</a></li>
                  <li><a href="#news">Term of Use</a></li>
                  <li><a href="#contact">Privacy Policy</a></li>
                  <li><a href="#about" className="">Site Map</a></li>
                  <li><a href="#about" className="sitemapDiv">Language:</a></li>
                  <li><a href="#about" className="sitemapDiv">Price:</a></li>
                </ul>

                {/*<a href="#">
                    <img src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/multistore/icon/icon-footer.png" alt="" />
                </a>*/}
                </div>
            </div>
            </div>
        </div>
        </div>  
        );
  } 

}