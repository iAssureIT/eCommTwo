import React, {Component} from 'react';
import axios              from 'axios'; 
// import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../../sites/currentSite/common/Megamenu.css'; 


export default class Megamenu extends Component {
constructor(props) {
        super(props);
        this.state = {
          categoryData:[],
        };
        window.scrollTo(0, 0);
    }

componentDidMount(){
  axios.get("/api/sections/get/get_megamenu_list")
            .then((response)=>{
             if(response.data){
              console.log("section data===",response.data); 
              this.setState({ 
                  categoryData : response.data
              })
              // console.log("megamenu section Data: ",this.state.categoryData);
            }
            })
            .catch((error)=>{
                console.log('error', error);
            })
}  
addtocart(event){
      event.preventDefault();
      var id = event.target.id;
     
      axios.get('/api/products/get/one/'+id)
      .then((response)=>{
        var totalForQantity   =   parseInt(1 * response.data.discountedPrice);
            const userid = localStorage.getItem('user_ID');
            
            const formValues = { 
                "user_ID"    : userid,
                "product_ID" : response.data._id,
                "currency" : response.data.currency,
                "productCode" : response.data.productCode,
                "productName" : response.data.productName,
                "section_ID"        : response.data.section_ID,
            "section"           : response.data.section,
            "category_ID": response.data.category_ID,
            "category": response.data.category,
            "subCategory_ID": response.data.subCategory_ID,
            "subCategory": response.data.subCategory,
                "productImage" : response.data.productImage,
                "quantity" : 1  ,
                "discountedPrice" : parseInt(response.data.discountedPrice),
                "originalPrice" : parseInt(response.data.originalPrice),
                "discountPercent" :parseInt(response.data.discountPercent),
                "totalForQantity" : totalForQantity,
                
            }
            axios.post('/api/carts/post', formValues)
            .then((response)=>{
              
            // swal(response.data.message);
            this.props.changeCartCount(response.data.cartCount);
            })
            .catch((error)=>{
              console.log('error', error);
            })
      })
      .catch((error)=>{
        console.log('error', error);
      })
}
componentWillMount() {
}
  
  render() {  
        return (
        <header className="dark">
        <nav className="" role="navigation" style={{height:"52px"}}>
          {/* <a href="javascript:void(0);" className="ic menu" tabindex="1">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </a> */}
          <a href="javascript:void(0);" className="ic close"> </a>

          <ul className="main-nav textAlignCenter">            
            {
              Array.isArray(this.state.categoryData) && this.state.categoryData.map((data,index)=>{
                  return(
                    <li key={index} className="top-level-link">
                      <a className="mega-menu" href={"/section/"+data.sectionUrl+'/'+data._id}><span>{data.section}</span></a>
                      <div className="col-lg-2 col-md-2 sub-menu-block textAlignLeft"style={{width:"208px"}}>
                        <div className="row">
                          <div className="col-md-3 col-lg-3 col-sm-3 megamenusubwidth">
                          <ul className="sub-menu-head">
                            {
                              data.categorylist.map((cateoryDetails,catindex)=>{                                
                                // if(!cateoryDetails.subCategory.length > 0){
                                  return(
                                    <div key={catindex} className="col-md-12 col-lg-12 col-sm-12 megamenusubwidth1">
                                      {/* <h1 className="sub-menu-head"><a href={"/category/"+cateoryDetails.categoryUrl+'/'+data._id+'/'+cateoryDetails._id}>{cateoryDetails.category}</a></h1> */}   
                                          <li className="category_list">
                                              <a href={"/category/"+cateoryDetails.categoryUrl+'/'+data._id+'/'+cateoryDetails._id}>{cateoryDetails.category}</a>
                                          </li>
                                    </div>
                                  );
                                // }
                                
                              })
                            }
                          </ul>
                          </div>
                          {/* <div className="col-md-7 col-lg-7 col-sm-7 megamenusubwidth">
                          <ul className="sub-menu-head">
                            {
                              data.categorylist.map((cateoryDetails,catindex)=>{
                                if(cateoryDetails.subCategory.length>0){
                                  return(
                                    <div className="col-md-2 col-lg-2 col-sm-2 megamenusubwidth">
                                       
                                          <li>
                                            <a href={"/category/"+cateoryDetails.categoryUrl+'/'+data._id+'/'+cateoryDetails._id}>{cateoryDetails.category}</a>
                                          </li>
                                                                              
                                     
                                        <ul className="sub-menu-head"> 
                                        {
                                          cateoryDetails.subCategory.map((subCat,subindex)=>{
                                            return(
                                                <li><a href={"/subcategory/"+data._id+'/'+cateoryDetails._id+'/'+subCat._id}>{subCat.subCategoryTitle}</a></li>
                                              );
                                          })
                                        }
                                      </ul>           

                                    </div>
                                  );
                                }                                
                              })
                            }
                            </ul>
                          </div>                           */}
                        </div>
                      </div>
                    </li>
                    );
                 })
              }
          </ul> 
        </nav>
    </header>  
    );  
  }
}