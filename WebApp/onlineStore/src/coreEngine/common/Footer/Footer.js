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
            console.log("companyData:" ,response.data[0]);
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
        <div>
        <br/>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footer1">
            <div className="container col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-sm-12 col-sm-3">
                <div className="footer-top">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding"> 
                     <strong>About Market</strong>
                </div>   
               
                <ul>
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="/contact-us">Contact Us</a></li>
                    <li><a href="/privacypolicy">Privacy Policy</a></li>
                    <li><a href="/sitemap">Site Map</a></li>
                </ul>
                </div>
            </div>
            <div className="col-sm-12 col-sm-3">
                <div className="footer-top">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding"> 
                     <strong>MAKE MONEY WITH US</strong>
                </div>   
               
                <ul>
                    <li><a href="/account">My Account</a></li>
                    <li><a target="_blank" href="returnpolicy">Return Policy</a></li>
                </ul>
                </div> 
            </div>
            <div className="col-sm-12 col-sm-3">
                <div className="footer-top">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding"> 
                     <strong>PAYMENT & SHIPPING</strong>
                </div>   
               
                <ul>
                    <li><a href="/">Terms of Use</a></li>
                    <li><a href="/">Payment Methods</a></li>
                </ul>
                </div>
            </div>
            <div className="col-sm-12 col-sm-3">
                <div className="footer-top">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding"> 
                     <strong>LET US HELP YOU</strong>
                </div>   
                <ul>
                    <li><a href="/">Blogs</a></li>
                    <li><a href="/">Faqs</a></li>
                    <li><a href="/">Store Location</a></li>
                    <li><a href="/">Shop By Brands</a></li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        <div className="container">
            <div className="footer col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="footer-middle">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 logo-nb"> 
                            <a href="/" title="">
                                <img src="../../../sites/currentSite/images/anasLogo.png" alt="" />
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
                                {   this.state.locationdata && this.state.locationdata.length > 0 ?                                
                                        
                                        this.state.locationdata.map((data, index)=>{
                                           return(
                                                 <div key={index} className="col-lg-9 addressDetails">  
                                                    <div className="addfield">{data.locationType},&nbsp;{data.landmark}<br />{data.blockName},&nbsp;{data.area},<br/>
                                                    {data.city}-{data.pincode}</div>

                                                   {/* <a href="/">{this.state.companyInfo.companyaddress}<br />
                                                    {this.state.companyInfo.country},&nbsp;                                                   
                                                    {this.state.companyInfo.state}&nbsp;
                                                    {this.state.companyInfo.city}&nbsp;-&nbsp;{this.state.companyInfo.pincode}</a>*/}
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
                                <div className="addfield">Mob:+91-{this.state.companyInfo.companyContactNumber}<br />Mob:+91-{this.state.companyInfo.companyMobileNumber}</div>
                                {/*<a href="/">Mob:+91-{this.state.companyInfo.companyContactNumber}<br />Mob:+91-{this.state.companyInfo.companyMobileNumber}</a>*/}
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
                            <div className="addfield">{this.state.companyInfo.companyEmail}<br />{this.state.companyInfo.companyAltEmail}</div>
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
                    {
                       
                        /*this.state.categoryDetails && this.state.categoryDetails.map((data,index)=>{

                            if (index<8) {
                            var subCategoryStr = '';
                            if (data.subCategory) {
                                subCategoryStr = data.subCategory.map( (subcat) =>{
                                    return  subcat['subCategoryTitle'] ;
                                  }).join(', ');
                            } 
                            return(
                                <div className="col-md-3 col-lg-3 col-sm-3 col-xs-6  catdiv" key={index}>
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                                        <strong><a href={"/category/"+data.categoryUrl+'/'+data.section_ID+'/'+data._id}>{data.category}</a></strong><br/><br/> 
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 NoPadding">
                                        <p>
                                        {subCategoryStr}
                                        </p>
                                    </div>
                                </div>
                                );
                            
                            }
                        })*/
                    }
                    
                </div>
                <br />
            </div>
        </div> 
        <div className="footer3">
            <div className="container">
            <div className="footer_bottom">
                <div className="col-sm-9 col-md-7 col-lg-6">
                    <p>AnasHandicraft Copyright <i className="fa fa-copyright"></i> 2020 - 2021. All Rights Reserved.</p>
                </div>
                <div className="col-sm-3 col-md-5 col-lg-6">
                <a href="#">
                    <img src="http://demo8.cmsmart.net/mag2_amazon_themeforest/pub/media/multistore/icon/icon-footer.png" alt="" />
                </a>
                </div>
            </div>
            </div>
        </div>
        </div>  
        );
  } 

}