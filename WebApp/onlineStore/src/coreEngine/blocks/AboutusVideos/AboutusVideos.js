import React, { Component } from 'react';
// import { render } from 'react-dom';
// import   Loadable                  from 'react-loadable';
// import axios from 'axios';
import $ from "jquery";
import notavailable from '../../../sites/currentSite/images/video2.mp4';
import "../../../sites/currentSite/blocks/Aboutusmultistore.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './AboutusVideos.css';

import ReactPlayer from 'react-player'

export default class AboutusVideos extends Component {

  
  VideoData(){
        return [
            {
                video1st        : "https://iogsolutions-my.sharepoint.com/personal/anurag_shinde_iogsolutions_com/_layouts/15/onedrive.aspx?originalPath=aHR0cHM6Ly9pb2dzb2x1dGlvbnMtbXkuc2hhcmVwb2ludC5jb20vOmY6L3AvYW51cmFnX3NoaW5kZS9Fc0VrNEo3cWtVaEx1UlRNNjBEUUttTUJndDB1WElqTjUwRmNjLU5ZT3dIUEp3P3J0aW1lPWFfRjg1Wlp0MTBn&id=%2Fpersonal%2Fanurag%5Fshinde%5Fiogsolutions%5Fcom%2FDocuments%2FMarketing%20Activities%2FWebsite%20Revamp%2FVideos%2F05%20iOG%20SCM%2Emp4&parent=%2Fpersonal%2Fanurag%5Fshinde%5Fiogsolutions%5Fcom%2FDocuments%2FMarketing%20Activities%2FWebsite%20Revamp%2FVideos",
                downstreamtext  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, elit id pharetra cursus, turpis ex mollis magna, eu fringilla urna ante ut tellus. Cras imperdiet tristique venenatis Vivamus elementum enim ipsum, nec pharetra sapien ornare eu. Mauris quis arcu quis tortor imperdiet viverra. Sed ut iaculis",
                link            : "https://anashandicraftapp.s3.amazonaws.com/AnasHandicrafts/Anas Products Video Final_1.mp4",
            }, 
            /*{
          
                downstreamtext  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, elit id pharetra cursus, turpis ex mollis magna, eu fringilla urna ante ut tellus. Cras imperdiet tristique venenatis Vivamus elementum enim ipsum, nec pharetra sapien ornare eu. Mauris quis arcu quis tortor imperdiet viverra. Sed ut iaculis",
                 link           : 'https://anashandicraftapp.s3.amazonaws.com/AnasHandicrafts/video2.mp4', 
            },*/
        ]
    }
  VideoData1(){
        return [
            
           
        ]
    }

    render(){
      console.log("link",this.VideoData());
        return(
            <div className="col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10 margin-top">
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h2 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt50 text-center"><b>AnasHandicraftts</b></h2>
                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1">
                    <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20 ">
                      We often take care of our loved ones, family and friends. 
                      AnasHnadicraftts has raised the bar even higher for others emulate. It is one of the furniture supplier chain..  
                      The difference lies in the sheer scale of operations at AnasHnadicraftts.All the standard sanitizing and packaging procedures are in line with the Total Quality Management principles and conform to the quality standards set by us.At any given point in time Team AnasHnadicrafts can handle customers  ensuring its flawless service.
                    </p>
                  </div>
                </div>
                <div className="col-lg-10 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-12 col-xs-12 mt50">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <i className="fa fa-inbox multiicon" aria-hidden="true"></i>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3><b>5000+</b></h3>
                    <h4>Products</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <i className="fa fa-shopping-cart multiicon" aria-hidden="true"></i>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3><b>3000+</b></h3>
                    <h4>Categories</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <i className="fa fa-globe multiicon" aria-hidden="true"></i>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3><b>Pune</b></h3>
                    <h4>City</h4>
                    </div>
                  </div>
                </div>
                 <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                   <h3 className="mb50 videoHeading text-center">Know more about AnasHandicraftts</h3>
                     {
                      this.VideoData().map((data, index)=>{
                      return (
                        <div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 seperatevideo">
                        <div className="videocard1">
                            <div className="introvideo">      
                             {/* <video width="320" height="240" controls>
                                <source src={data.link} />
                              </video>*/}
                               <ReactPlayer url={data.link} width='960px' height='300px' controls loop  />
                            </div>          
                           <div className="go-corner" href="#">
                            <div className="go-arrow">
                            </div>
                          </div>
                        </div>
                        </div>
                         );
                      })
                    }   
                 </div>
            </div>
        );
    }
}