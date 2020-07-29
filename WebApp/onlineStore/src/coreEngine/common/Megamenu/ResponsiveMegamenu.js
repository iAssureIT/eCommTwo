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
              // console.log("section data===",response.data); 
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

  render() {  
        return (
        <header className=" col-sm-12 col-xs-12 megamenu-top">      
          
          {
              Array.isArray(this.state.categoryData) && this.state.categoryData.map((data,index)=>{
                  return(
                    <div className="dropdown menuDropDown col-sm-3 NoPadding col-xs-12">
                        <button className="dropbtn">{data.section} 
                            {/* <i className="fa fa-caret-down"></i> */}
                        </button>                        
                        {
                              data.categorylist.map((cateoryDetails,catindex)=>{                                
                                
                                  return(
                                    <div className="dropdown-content dropdownContent">
                                        <a href={"/category/"+cateoryDetails.categoryUrl+'/'+data._id+'/'+cateoryDetails._id} className="topNavCategory">{cateoryDetails.category}</a>
                                    </div>
                                  );
                                  })
                        }
                        
                    </div>
                  );

                  })
            }
    
    </header>  
    );  
  }
}