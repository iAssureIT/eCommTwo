import React, {Component} from 'react';
import axios              from 'axios'; 
// import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import '../../../sites/currentSite/blocks/NewDiscount.css';
import Newblock1 from '../../../sites/currentSite/images/Newblock1.png';
import Newblock2 from '../../../sites/currentSite/images/newblock2.png';
import newblock3 from '../../../sites/currentSite/images/newblock3.png';


export default class NewDiscount extends Component {
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
ServicesData(){
        return [
            {
                servicesTitle : "Company Profile",
                servicesSubTitle : "iOG Solutions stands for intelligent O&G solutions.",
                servicesimg   : "../../../sites/currentSite/images/Truck.png",
                servicestext  : "iOG Solutions is an independent and reputed provider of consulting and implementation services on advanced and intelligent Software solutionsin the Oil & Gas industry. Our headquarters have been established since 2013 in Pune (India)."
                    
                
            } 
                        
        ]
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
        <div clasName="col-lg-12 col-md-12 col-sm-12 col-xs-12 mainDiscDiv" style={{height:"350px"}}>
         <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 image1stDiv div1background image1_div">
          <img className="img img-responsive bannerimg" style={{height:"258px"}} src={require("../../../sites/currentSite/images/Newblock1.png")} alt="banner" />
         </div>
         <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 imagediv2 ">
           <img className="col-lg-6 col-md-6 col-sm-6 col-xs-6 img img-responsive bannerimg" src={require("../../../sites/currentSite/images/newblock2.png")} alt="banner" />
           <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 imge2text"style={{padding:"0px"}}>
            <h3 style={{color:"#fff"}}><b>BIG SAVING</b></h3>
            <h1 style={{color:"#fff"}}><b>GET 75%</b></h1>
            <a href="/deals-of-the-day"><div class="btn  new_shopnowbtn" title="Shop Now">Shop Now</div></a>
          </div>
         </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 imagediv3">
           <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 image1stDiv">
           <h1 style={{color:"#fff"}}><b>BIG SALE</b></h1>
           <h3 style={{color:"#fff"}}><b>GET 25%</b></h3>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 image1stDiv">\
            <img className="img img-responsive bannerimg" style={{height:"258px"}} src={require("../../../sites/currentSite/images/newblock3.png")} alt="banner" />
          </div>
         </div>
        </div>
    );  
  }
}