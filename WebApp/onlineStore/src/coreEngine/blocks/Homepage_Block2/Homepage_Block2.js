import React, {Component} from 'react';
import axios              from 'axios'; 
// import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../../sites/currentSite/blocks/Homepage_Block2.css'; 


export default class Homepage_Block2 extends Component {
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
        <div clasName="col-lg-12 col-md-12 col-sm-12 col-xs-12 below_header">
         <div clasName="col-lg-offset-1 col-lg-10 col-md-10 col-sm-10 col-xs-10">

         {
            this.ServicesData().map((data, index)=>{
              return (   
                        <div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-12">shfhdsfiuh
                              <div className="img1">
                                <img src={data.servicesimg} alt="" className="intro_img img-responsive" />
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