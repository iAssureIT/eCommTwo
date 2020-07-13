import React, { Component } from 'react';
// import { render } from 'react-dom';

// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import '../../../sites/currentSite/common/Footer.css';
import logoUnimandai   from "../../../sites/currentSite/images/Logo.png";

import paypal_footer from "../../../sites/currentSite/images/paypal-footer.png";
import footerAnimationImg from '../../../sites/currentSite/images/bg-footer.jpg';

export default class Footer extends Component {

    constructor(props){
    super(props);
        this.state = {
          categoryDetails:[],
           companyInfo   :"",
           Locationdata  :[],
           categoryData  :[],
        }
    }
    componentDidMount(){
        axios.get("/api/sections/get/get_megamenu_list")
            .then((response)=>{
                if(response){
                    this.setState({ 
                        categoryData : response.data
                    })
                }
            })
            .catch((error)=>{
                console.log('error', error);
            })
    }

    // getCompanyDetails(){
    //     axios.get("/api/entitymaster/get/one/companyName/1")
    //       .then((response)=>{ 
    //         console.log("companyData:" ,response.data);
    //         this.setState({
    //             companyInfo   : response.data[0],
    //             locationdata  : response.data[0].companyLocationsInfo,             
    //         },
    //             ()=>{
    //           })
    //       })
    //       .catch((error)=>{
    //             console.log('error', error);
    //       })
    // }

    render(){
       return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerWrapper" >
        <br/>
        {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footerAnimation" style={{'background' : "url("+footerAnimationImg +")" }}></div> */}
       <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footer1">
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-12 categoryFooterWrapper">
                <div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 FooterTitle">Online Shopping</div>
                    <div className=" col-lg-2 col-md-4 col-sm-6 col-xs-12 hrLine"></div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {Array.isArray(this.state.categoryData) && this.state.categoryData.map((data,index)=>{
                    return(
                        index <=3 ?
                        <div className="">
                            <div className=" col-lg-3 col-md-3 col-sm-3 col-xs-6 sectionName">
                                <a className="sectionurl" href={"/section/"+data.sectionUrl+'/'+data._id} ><span>{data.section}</span></a>
                            
                            {
                                data.categorylist.map((cateoryDetails,catindex)=>{                             
                                
                                    return(
                                    <div key={catindex} className="">                                   
                                        <div className="categortTitle">
                                            <a href={"/category/"+cateoryDetails.categoryUrl+'/'+data._id+'/'+cateoryDetails._id}><span>{cateoryDetails.category}</span></a>
                                        </div>
                                    </div>
                                    );                            
                                })
                            }
                            </div>
                        </div>
                        :null
                    );
                    })
                }
            </div>
            </div>

            <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12 aboutusFooterWrapper">
                <div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 FooterTitle">About Us</div>
                    <div className=" col-lg-7 col-md-7 col-sm-6 col-xs-12 hrLine"></div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="categortTitle"><a href="/returnpolicy" target="_blank"><span>Return Policy</span></a></div>
                    <div className="categortTitle"><a href="/about-us" target="_blank"><span>About Us</span></a></div>
                    {/* <div className="categortTitle"><a href="/terms-conditions" target="_blank"><span>Terms Of Use</span></a></div> */}
                    {/* <div className="categortTitle"><a href="/privacypolicy" target="_blank"><span>Privacy Policy</span></a></div> */}      
                    <div className="categortTitle"><a href="/legal-notice" target="_blank"><span>Legal Notice</span></a></div>
                    <div className="categortTitle"><a href="/sitemap" target="_blank"><span>Site Map</span></a></div> 
                    <div className="categortTitle"><a href="/contact-us" target="_blank"><span>Contact Us</span></a></div>    
                                  
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 onlineShoppingWrapper">
               {/* <div className="container"></div> */}
                <div>
                    <div className="logo col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <a href="/" title="Unimandai logo ">
                            <img src={logoUnimandai} alt="images" className="footerLogoImg col-lg-12"/>
                        </a>
                    </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 FooterTitle">Connect</div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="socialMediaIcons"><a href="https://www.facebook.com/Unimandai-105550984521880" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></div>
                    <div className="socialMediaIcons"><a href="https://www.instagram.com/unimandai/" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a></div>
                    <div className="socialMediaIcons"><a href=" https://www.youtube.com/channel/UCOXIsYFFEHlzRnMI89Enoag" target="_blank"><i class="fa fa-youtube-play" aria-hidden="true"></i></a></div>  
                    <div className="socialMediaIcons"><a href="https://twitter.com/Unimandai1" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></div>                   
                </div>

            </div>            
        </div>
        </div>
       
        <div className="footer3 col-lg-12 col-md-12 col-sm-12 col-xs-12">
           
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footer_bottom">
                <div className="col-lg-6 col-sm-12 col-md-6 col-xs-12 copyrighttxt">
                    <p>Copyright @2020 <i className="fa fa-copyright"></i> <span className="uniColor">Uni</span><span className="mandaiColor">mandai</span> All Rights Reserved.</p>
                </div>
                <div className=" col-md-6 col-lg-6 col-sm-12 col-xs-12 footernabbar">
                    <span>Design & Developed by <a href="http://iassureit.com/" target="_blank"> iAssure International Technologies Pvt. Ltd. </a> Version 1.0</span>
                </div>
            </div>
            
        </div>
        </div>  
        );
  } 

}