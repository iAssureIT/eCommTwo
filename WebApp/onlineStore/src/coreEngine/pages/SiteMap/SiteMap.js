import React, { Component } from 'react';
import axios   from 'axios';
import "../../../sites/currentSite/pages/SiteMap.css";

class SiteMap extends Component{
    constructor(props) {
        super(props);
        this.state={
            sections    : [],
            categories  : []
        }
        this.getSections();
        this.getCategories();
    } 
    getSections(){
        axios.get('/api/sections/get/list')
        .then((response)=>{
            console.log('sect',response.data)
            this.setState({
                sections : response.data
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }
    getCategories(){
        axios.get('/api/category/get/list')
        .then((response)=>{
            this.setState({
                categories : response.data
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }
    render(){
        return(
            <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 sitemappWrapper">
                <h2>Sections</h2>
                <p>
                    {this.state.sections && this.state.sections.length>0?
                        this.state.sections.map((data, index)=>{
                            if(this.state.sections.length === index + 1){
                                return(
                                    <a className="siteSec" key={index} href={'/section/'+data.sectionUrl+'/'+data._id}>{data.section} </a>
                                );
                            }else{
                                return(
                                    <a className="siteSec" key={index} href={'/section/'+data.sectionUrl+'/'+data._id}>{data.section} | </a>
                                );
                            }
                        })
                        :
                        null
                    }
                </p>

                <h2>Categories</h2>
                <div>
                    {this.state.categories && this.state.categories.length>0?
                        this.state.categories.map((data, index)=>{
                            return(
                                <div>
                                    <h4 className="siteCat"><a key={index} href={'/category/'+data.categoryUrl+'/'+data.section_ID+'/'+data._id}>{data.category} </a></h4>
                                    <p>
                                    {data && data.subCategory.length>0?
                                        data.subCategory.map((datas, i)=>{
                                            if(data.subCategory.length === i + 1){
                                                return(
                                                    <a className="siteSubCat" key={i} href={'/subcategory/'+data.section_ID+'/'+data._id+'/'+datas._id}>{datas.subCategoryTitle}  </a>
                                                );
                                            }else{
                                                return(
                                                    <a className="siteSubCat" key={i} href={'/subcategory/'+data.section_ID+'/'+data._id+'/'+datas._id}>{datas.subCategoryTitle} | </a>
                                                );
                                            }
                                        })
                                        :
                                        null
                                    }
                                    </p>
                                </div>
                            );
                        })
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}
export default SiteMap;