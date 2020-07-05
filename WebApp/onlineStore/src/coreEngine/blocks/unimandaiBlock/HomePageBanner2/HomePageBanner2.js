import React, { Component } from 'react';
import "../../../../sites/currentSite/blocks/HomePageBanner2.css";
import axios from 'axios';

import HomePageBanner2_1 from "../../../../sites/currentSite/images/vegetables1.jpeg"
import HomePageBanner2_2 from "../../../../sites/currentSite/images/Fruits1.jpg"
import HomePageBanner2_3 from "../../../../sites/currentSite/images/frozen1.png"

// import HomePageBanner2_1 from "../../../../sites/currentSite/images/unimandai_vegetable_blocks.png"
// import HomePageBanner2_2 from "../../../../sites/currentSite/images/unimandai_Fruits_blocks.png";
// import HomePageBanner2_3 from "../../../../sites/currentSite/images/frozen1.png"

class HomePageBanner2 extends Component{
    constructor(props){
        super(props);
        this.state={
            "sectionDetails" : [],
        }
    }
    componentDidMount(){
        axios.get("/api/sections/get/get_megamenu_list")
                  .then((response)=>{                      
                    if(response.data){
                        var sectionDetails = [];
                        console.log("Category data=======",response.data); 
                        var sectionDetailsArray = response.data;
                       for(let i=0;i<response.data.length;i++){
                        //    console.log("sectionDetailsArray[i].section==",sectionDetailsArray[i].section);
                            if(sectionDetailsArray[i].section === "Vegetables"){
                                sectionDetails[i] = {
                                    "section"    : sectionDetailsArray[i].section,
                                    "sectionId"  : sectionDetailsArray[i]._id,
                                    "sectionImg" : "HomePageBanner2_1"
                                }
                                // console.log("sectionDetails:",sectionDetails);
                            }else if(sectionDetailsArray[i].section === "Fruits"){
                                sectionDetails[i] = {
                                    "section"    : sectionDetailsArray[i].section,
                                    "sectionId"  : sectionDetailsArray[i]._id,
                                    "sectionImg" : "HomePageBanner2_2"
                                }
                            }else if(sectionDetailsArray[i].section === "Frozen Item"){
                                sectionDetails[i] = {
                                    "section"    : sectionDetailsArray[i].section,
                                    "sectionId"  : sectionDetailsArray[i]._id,
                                    "sectionImg" : "HomePageBanner2_3"
                                }
                                // console.log("sectionDetails===",sectionDetails);
                                                            
                            }                        
                        }   
                    this.setState({ 
                        "sectionDetails" : sectionDetails                  
                    });   
                    // console.log("sectionData =========",this.state.sectionData);      
                    }
                  })
                  .catch((error)=>{
                      console.log('error', error);
                  })
      }  
    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 HomePageBanner2">
                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 ">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 imageBlock">
                            <a className="hover-images col-lg-12" href="/" > 
                                <div className="imgTitle">Vegetables</div>                               
                                <img className="img-responsive zoomImg col-lg-12" src={HomePageBanner2_1} alt="banner" />
                                
                            </a>                        
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 imageBlock">
                            <a className="hover-images col-lg-12" href="/">
                                <div className="imgTitle">Fruits</div> 
                                <img className="img-responsive zoomImg col-lg-12" src={HomePageBanner2_2} alt="banner" />
                            </a>                        
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 imageBlock">
                            <a className="hover-images col-lg-12" href="/">
                                <div className="imgTitle">Frozen Items</div> 
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