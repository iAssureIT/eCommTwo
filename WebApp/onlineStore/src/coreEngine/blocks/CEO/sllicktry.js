import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/carousel.js';  
import $                  from 'jquery';
import React from 'react';
import './Ceo.css';

export default class Ceo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:1 
            }
          },
    

            "OurCourcesmaster"      : [
                            {
                                blogDate:"DEC 17,2016",
                                blogTitle:"Learn On Organic Farms",
                                blogPara:"Post by :FreshFood",
                                bloggerImg:"/images/1.jpg",
                                // smallimg:"img/icon1.png"
                                
                            },
                            {
                                blogDate:"DEC 17,2016",
                                blogTitle:"What is organic farming?",
                                blogPara:"Post by :FreshFood",
                                bloggerImg:"/images/2.jpg",
                                // smallimg:"img/icon2.png"
                                
                            },
                            {
                                blogDate:"DEC 17,2016",
                                blogTitle:"Advantages of Organic Meat",
                                blogPara:"Post by :FreshFood",
                                bloggerImg:"/images/3.jpg",
                                // smallimg:"img/icon3.png"
                                
                            },

                          ]               
    };
    }

    render() {
        var data = this.state.OurCources;
        var data1=this.state.OurCourcesmaster;
        return (
            <div>
                <div className="container col-lg-12 col-md-12 CEO_Back NOPadding">
                  <div class="bg-slider-one-item space-50 ">
                   <div class="slider-dot-images">
                     <div class="container container-ver2 center">
                       <div class="slider-nav slick-initialized slick-slider">
                         <div aria-live="polite" class="slick-list draggable" style={{padding: "0px 50px"}}>

                          <div class="slick-track" style={{opacity: "1"}, {width: "1980px"}, {transform: "translate3d(-360px, 0px, 0px)"}} role="listbox">
                           <div class="slick-slide slick-cloned" data-slick-index="-6" aria-hidden="true" style={{width: "90px"}} tabindex="-1">
                            <img src="/images/about5.jpg" alt="images"/>
                           </div>
                           <div class="slick-slide slick-cloned" data-slick-index="-5" aria-hidden="true" style={{width: "90px"}} tabindex="-1">
                            <img src="/images/about1.jpg" alt="images"/>
                           </div>
                            <div class="slick-slide slick-cloned" data-slick-index="-4" aria-hidden="true" style={{width: "90px"}} tabindex="-1">
                             <img src="/images/about2.jpg" alt="images"/>
                            </div>
                            <div class="slick-slide" data-slick-index="7" aria-hidden="true" style={{width: "90px"}} tabindex="-1" role="option" aria-describedby="slick-slide17">
                            <img src="/images/about3.jpg" alt="images"/>
                            </div>
                            <div class="slick-slide" data-slick-index="8" aria-hidden="true" style={{width: "90px"}} tabindex="-1" role="option" aria-describedby="slick-slide18">
                                <img src="/images/about4.jpg" alt="images"/>
                            </div>
                            <div class="slick-slide" data-slick-index="9" aria-hidden="true" style={{width: "90px"}} tabindex="-1" role="option" aria-describedby="slick-slide19">
                                <img src="/images/about5.jpg" alt="images"/>
                            </div>
                            <div class="slick-slide slick-cloned slick-center" data-slick-index="10" aria-hidden="true" style={{width: "90px"}} tabindex="-1">
                                <img src="/images/about1.jpg" alt="images"/>
                            </div>
                            <div class="slick-slide slick-cloned" data-slick-index="11" aria-hidden="true" style={{width: "90px"}} tabindex="-1">
                                <img src="/images/about2.jpg" alt="images"/>
                            </div>
                            <div class="slick-slide slick-cloned" data-slick-index="12" aria-hidden="true" style={{width: "90px"}} tabindex="-1">
                                <img src="/images/about3.jpg" alt="images"/>
                            </div>
                            <div class="slick-slide slick-cloned" data-slick-index="13" aria-hidden="true" style={{width: "90px"}} tabindex="-1">
                                <img src="/images/about4.jpg" alt="images"/>
                            </div>
                            <div class="slick-slide slick-cloned" data-slick-index="14" aria-hidden="true" style={{width: "90px"}} tabindex="-1">
                                <img src="/images/about5.jpg" alt="images"/>
                            </div>
                            <div class="slick-slide slick-cloned" data-slick-index="15" aria-hidden="true" style={{width: "90px"}} tabindex="-1">
                                <img src="/images/about1.jpg" alt="images"/>
                            </div>
                          </div>

                         </div>
                       </div>
                       <div class="slider-for slick-initialized slick-slider">
                         <div aria-live="polite" class="slick-list draggable">
                          <div class="slick-track" style={{opacity: "1"}, {width: "14040px"}, {transform: "translate3d(-360px, 0px, 0px)"}} role="listbox">
                            <div class="slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true" style={{width: "1170px"}} tabindex="-1">
                              <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                              <h3>JONATHAN VANCE</h3>
                              <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                             </div>
                             <div class="slick-slide" data-slick-index="0" aria-hidden="true" style={{width: "1170px"}} tabindex="-1" role="option" aria-describedby="slick-slide00">
                                <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                <h3>JONATHAN VANCE</h3>
                                <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                               </div>
                               <div class="slick-slide" data-slick-index="1" aria-hidden="true" style={{width: "1170px"}} tabindex="-1" role="option" aria-describedby="slick-slide01">
                                <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                <h3>JONATHAN VANCE</h3>
                                <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                               </div>
                               <div class="slick-slide" data-slick-index="2" aria-hidden="true" style={{width: "1170px"}} tabindex="-1" role="option" aria-describedby="slick-slide02">
                                <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                <h3>JONATHAN VANCE</h3>
                                <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                               </div>
                                <div class="slick-slide" data-slick-index="3" aria-hidden="true" style={{width: "1170px"}} tabindex="-1" role="option" aria-describedby="slick-slide03">
                                    <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                    <h3>JONATHAN VANCE</h3>
                                    <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                                </div>
                                <div class="slick-slide" data-slick-index="4" aria-hidden="true" style={{width: "1170px"}} tabindex="-1" role="option" aria-describedby="slick-slide04">
                                    <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                    <h3>JONATHAN VANCE</h3>
                                    <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                                 </div>
                                 <div class="slick-slide" data-slick-index="5" aria-hidden="true" style={{width: "1170px"}} tabindex="-1" role="option" aria-describedby="slick-slide05">
                                    <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                    <h3>JONATHAN VANCE</h3>
                                    <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                                  </div>
                                  <div class="slick-slide" data-slick-index="6" aria-hidden="true" style={{width: "1170px"}} tabindex="-1" role="option" aria-describedby="slick-slide06">
                                    <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                    <h3>JONATHAN VANCE</h3>
                                    <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                                  </div>
                                  <div class="slick-slide slick-current slick-active" data-slick-index="7" aria-hidden="false" style={{width: "1170px"}} tabindex="-1" role="option" aria-describedby="slick-slide07">
                                    <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                    <h3>JONATHAN VANCE</h3>
                                    <a href="#" title="CEO" tabindex="0">CEO &amp; Founder</a>
                                </div>
                                <div class="slick-slide" data-slick-index="8" aria-hidden="true" style={{width: "1170px"}} tabindex="-1" role="option" aria-describedby="slick-slide08">
                                    <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                    <h3>JONATHAN VANCE</h3>
                                    <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                                </div>
                                <div class="slick-slide" data-slick-index="9" aria-hidden="true" style={{width: "1170px"}} tabindex="-1" role="option" aria-describedby="slick-slide09">
                                    <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                    <h3>JONATHAN VANCE</h3>
                                    <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                                </div>
                                <div class="slick-slide slick-cloned" data-slick-index="10" aria-hidden="true"style={{width: "1170px"}} tabindex="-1">
                                    <p>I rarely write reviews for products but with the EngoCreative, I am more than grateful. The site is fully customizable and you can really feel like playing while designing the site! Thanks again for having made such a convenient, yet fully-functional theme.</p>
                                    <h3>JONATHAN VANCE</h3>
                                    <a href="#" title="CEO" tabindex="-1">CEO &amp; Founder</a>
                                </div>
                                </div>
                         </div>
                       </div>
                     </div>
                    </div>  
                  </div>        
                </div>
    
            </div>
        );
    }
}
