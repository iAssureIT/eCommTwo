import React, { Component } from 'react';
import "../../../sites/currentSite/blocks/ProductDivider.css";
import notavailable from '../../../sites/currentSite/images/notavailable.jpg';

export default class ProductDivider extends Component {
	constructor(props){
    super(props);
	   
	    this.state={
	    	categoriesImg        : [],
	    }
  	} 
  	componentWillReceiveProps(nextProps){
  		
  		this.setState({categoriesImg:nextProps.categories},()=>{
  			console.log("Category Data:",this.state.categoriesImg);
  		});
      // this.changeProductCateWise(categoryID, type);
    } 
  render() {
  	 
		return (
		<div className="col-lg-12 col-md-12 col-ms-12 col-xs-12 flatSale">	
			<div className="col-lg-12 col-md-12 col-ms-12 col-xs-12">
				<div className="col-lg-12 col-md-12 col-ms-12 col-xs-12">
					<div className="col-lg-12 col-md-12 col-ms-12 col-xs-12 shopByCat mt50 mb15">Browse Popular Categories</div>
				</div>
				{
					Array.isArray(this.state.categoriesImg) && this.state.categoriesImg.map((data,index)=>{
						if (index < 8 ) {
						return(
							<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={index}>
				                {/* <a href={"/section/"+ data.section.replace(/\s+/g, '-').toLowerCase() +'/'+data.section_ID} > */}
								<a href={"/category/"+ data.categoryUrl.replace(/\s+/g, '-').toLowerCase() +'/'+data.section_ID +'/'+data._id} >
				                <div className="block">
				                    <a className="image divimgprod" href={"/category/"+ data.categoryUrl.replace(/\s+/g, '-').toLowerCase() +'/'+data.section_ID +'/'+data._id} target="_blank" rel="noopener noreferrer"> 
										{data.categoryImage
										?
										<img src={data.categoryImage} alt="home banner" className="divImage"/>
										:
										<img src={notavailable} alt="home banner" className="divImage"/>
										}
									</a>
									
				                </div>
				                </a>
				                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 figcaption_new">
				                		<span>{data.category}</span>
				                	</div>
			            	</div>
						);
						}
					})
				}
         	</div>  
        </div> 	
		);
	}
}
