import React, { Component }       from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Megamenu                   from '../Megamenu/Megamenu.js';
import axios                      from 'axios';
import { withRouter }             from 'react-router-dom';
import Message                    from '../../blocks/Message/Message.js'; 
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import {getCartData, searchProductAction,getForm} from '../../actions/index';
import $                          from "jquery";
import cartImg                    from "../../../sites/currentSite/images/icon-cart.png";
import searchModalImg             from "../../../sites/currentSite/images/icon-search.png";
import LoginModal                 from "../../common/LoginModal/LoginModal.js";
import Login          from '../../systemSecurity/Login.js';
import SignUp         from '../../systemSecurity/SignUp.js';
import ForgotPassword from '../../systemSecurity/ForgotPassword.js';
import AskPincode     from '../../blocks/AskPincode/AskPincode.js';

import iconPhoneHeader from "../../../sites/currentSite/images/icon-phone-header.png";
import iconUserHeader  from "../../../sites/currentSite/images/icon-user-header.png";
import logoUnimandai   from "../../../sites/currentSite/images/Logo.png";
import loginIconImg    from "../../../sites/currentSite/images/userIcon.png";
import modalImg        from "../../../sites/currentSite/images/mapIcon.png";
import cartIconImg     from "../../../sites/currentSite/images/cartIcon.png";
import loginActiveIconImg from "../../../sites/currentSite/images/loginActiveImg.png";
import '../../../sites/currentSite/common/UnimandaiHeader.css';
import '../../../sites/currentSite/common/Header.css';
// import jQuery from "jquery";
import notavailable from '../../../sites/currentSite/images/notavailable.jpg';


class unimandaiHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      options       :[], 
      catArray      :[],
      searchstr     :'',
      searchCriteria:[],
      searchResult  :[],
      hotProducts   :[],
      categoryDetails: [],
      productCartData:[],
      cartProduct    :[],
      localCategories: [],
      userData       : {},
      firstname      : '',
      lastname       : '',
      formToShow     : "login",
    }  
    
    if (window.location.pathname !== "/searchProducts") {
      localStorage.removeItem("catArray");
      localStorage.removeItem("searchstr");
    }
}

componentWillMount() {
      
      $(document).ready(function(e){      
      $('.search-panel li a').on('click', function(e){
        var sp = $(this).closest('.search-panel');
        var to = $(this).html();
        var text = $(this).html();
        sp.data('search', to);
        sp.find('button span.search_by').html(text);
      });
    });

}

   async componentDidMount(){
     //if websiteModel is Franchise Model then save that franchise model in localStorage
    if(localStorage.getItem('websiteModel')=== null){
      axios.get("/api/adminPreference/get")
      .then(preference =>{
        if(preference.data){
          // console.log("preference = ",preference.data[0].websiteModel);
          if(preference.data[0].websiteModel === "FranchiseModel"){
            localStorage.setItem("websiteModel",preference.data[0].websiteModel);
          }         
        } 
      })
      .catch(error=>{
        console.log("Error in getting adminPreference = ", error);
      }) 
  }//end if

    await this.props.fetchCartData(); 
    //console.log(this.props.recentCartData);
    document.getElementsByTagName("DIV")[0].removeAttribute("style");
    this.getCartCount();
    this.getWishlistCount();
    this.getHotProduct();
    // this.getCartData();
    this.getUserData();
    const options = [];
    axios.get("/api/category/get/list")
      .then((response) => {

        response.data.map((data, index) => {
          options.push({ label: data.category, value: data._id, section_ID: data.section_ID });
        });

        this.setState({
          options: options
        })
      })
      .catch((error) => {
        // console.log('error', error);
      })

    var localcatArray = JSON.parse(localStorage.getItem("catArray"));
    var searchstr = localStorage.getItem("searchstr");

    if (localcatArray) {
      this.setState({ localCategories: localcatArray })

      var catArray = [];

      localcatArray.map((data, index) => {
        catArray.push({ id: data.value, category: data.label, section_ID: data.section_ID });
      })

      this.setState({ catArray: catArray }, () => {
        this.searchProducts();
      });

    }
    if (searchstr) {
      $('.headersearch').val(searchstr);
      this.searchProducts();
    }

  }

  componentWillReceiveProps(nextProps) {
    // var categoryArray = [];
    // var categoryDetails = [];

    this.setState({
      searchCriteria: nextProps.searchCriteria
    }, () => {
      {
        this.state.searchCriteria.catArray && this.state.searchCriteria.catArray.map((data, index) => {
          $('option[value="' + data + '"]').attr('selected', 'selected');
        });
      }
    })

    // this.setState({
    //   searchResult  : nextProps.searchResult
    // },()=>{
    //   {
    //     categoryArray = this.unique(this.state.searchResult,'category_ID');

    //     categoryArray.map((data,index)=>{
    //       this.getCategoryDetails(data, categoryDetails); 
    //     });
    //   }
    // })

  }

  
  unique(arr, prop) {
    return arr.map(function (e) { return e[prop]; }).filter(function (e, i, a) {
      return i === a.indexOf(e);
    });
  }

  handleChange(selectedOption) {
    var catArray = [];

    selectedOption.map((data, index) => {
      catArray.push({ id: data.value, category: data.label, section_ID: data.section_ID });
    })

    localStorage.setItem("catArray", JSON.stringify(selectedOption));

    this.setState({ localCategories: selectedOption },
      () => {
      });
    this.setState({ catArray: catArray });
  }
  handleString(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.currentTarget.value !== '') {
      localStorage.setItem("searchstr", event.currentTarget.value);  
    }
    
  }
  searchProducts() {
    // if (this.state.catArray.length > 0) {
    //   var searchstr = $('.headersearch').val()
    //   var formValues = {
    //     "searchstr": searchstr,
    //     "catArray": this.state.catArray,
    //     "loading": true,
    //   }
    // console.log("formValues in search ==>",formValues);
    //   if (searchstr !== '') {
    //     localStorage.setItem("searchstr", searchstr);
    //   }
    //   this.props.searchProductFun(formValues, this.state.searchResult)

    //   //this.props.searchProduct();

    //   axios.post("/api/products/post/searchINCategory", formValues)
    //     .then((response) => {
    //       console.log("response after in search ==>",response.data);
    //       this.setState({ searchResult: response.data }, () => {
    //         formValues.loading = false;
    //         this.props.searchProductFun(formValues, this.state.searchResult);
    //       });
    //     })
    //     .catch((error) => {
    //       // console.log('error', error);
    //     })

    //   this.props.history.push("/searchProducts");
    // }
    if (this.state.catArray.length === 0 && $('.headersearch').val() !== '') {
      var searchstr = this.refs.tableSearch.value.trim();
      if(searchstr){
        var formValues = {
          "searchstr": searchstr,
          "loading": true
        }
        this.props.searchProductFun(formValues, this.state.searchResult);
        axios.get("/api/products/get/search/" + searchstr)
          .then((response) => {
            formValues.loading = false;
            this.setState({ searchResult: response.data }, () => {
              this.props.searchProductFun(formValues, this.state.searchResult);
            });
          })
          .catch((error) => {})
        this.props.history.push("/searchProducts");
      }else{
        this.props.history.push("/");
      }
      
    }

  }

  async signOut(event) {
    event.preventDefault();
    localStorage.setItem("user_ID", "");
    this.props.fetchCartData(); 
    this.props.history.push('/');

  }
  getCartCount() {
    const userid = localStorage.getItem('user_ID');
    axios.get("/api/carts/get/count/" + userid)
      .then((response) => {
        this.setState({
          count: response.data
        })
        this.props.initialCart(response.data);
      })
      .catch((error) => {
        // console.log('error', error);
      })

  }
  getUserData() {
    const userid = localStorage.getItem('user_ID');
    axios.get('/api/users/' + userid)
      .then((res) => {
        if(res.data.profile){
          this.setState({
            userData : res.data.profile,
            firstname: res.data.profile.firstname.substring(0, 1),
            lastname : res.data.profile.lastname.substring(0, 1)
          },()=>{

          })
        }else{
          this.setState({
            userData  : "",
            firstname : "",
            lastname  : ""
          },()=>{

          })
        }         
        
      })
      .catch((error) => {
        console.log("error fetch user data = ", error);
      });
  }
  getWishlistCount() {
    const userid = localStorage.getItem('user_ID');
    axios.get("/api/wishlist/get/wishlistcount/" + userid)
      .then((response) => {
        this.props.initialWishlist(response.data);
      })
      .catch((error) => {
        // console.log('error', error);
      })
  }
   modalClickEvent(){
    $('#modalId').addclassName('in');
    $('#modalId').css('display','block');
    
    // $('#modalId').modal('hide');
    $('body').removeclassName('modal-open');
    $('.modal-backdrop').remove();
  }
  Removefromcart(event) {
    event.preventDefault();
    const userid = localStorage.getItem('user_ID');
    const cartitemremoveid = event.target.getAttribute('removeid');

    const formValues = {
      "user_ID": userid,
      "cartItem_ID": cartitemremoveid,
    }
    axios.patch("/api/carts/remove", formValues)
      .then((response) => {
        this.props.fetchCartData(); 
        this.setState({
          messageData: {
            "type": "outpage",
            "icon": "fa fa-check-circle",
            "message": "&nbsp; " + response.data.message,
            "className": "success",
            "autoDismiss": true
          }
        })
        setTimeout(() => {
          this.setState({
            messageData: {},
          })
        }, 3000);

        // this.getCartData();
        this.getCompanyDetails();

      })
      .catch((error) => {
        // console.log('error', error);
      })
  }

loginPage(event){
    event.preventDefault();
    localStorage.setItem('previousUrl' ,'/');
    this.props.history.push("/cart");
}

  submitQuery() {
    var formValues = {
      "customerName": this.refs.firstName.value,
      "customerMobile": this.refs.mobNumber.value,
      "query": this.refs.message.value
    }

    axios.post("/api/customerQuery/post", formValues)
      .then((response) => {
        
        this.setState({
          messageData: {
            "type": "outpage",
            "icon": "fa fa-check-circle",
            "message": "&nbsp; Your feedback has been submitted successfully",
            "className": "success",
            "autoDismiss": true
          }
        })
        setTimeout(() => {
          this.setState({
            messageData: {},
          })
        }, 3000);
        $("#customercareModal").hide();
        // $(".checkoutAddressModal").hide();
        $(".modal-backdrop").hide();

      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  
  getHotProduct() {
    axios.get("/api/products/get/hotproduct")
      .then((response) => {
        this.setState({
          hotProducts: response.data
        })
      })
      .catch((error) => {
        // console.log('error', error);
      })
  }
  render() {
    $(".modal-backdrop").hide();
    const user_ID = localStorage.getItem("user_ID");
    return (
      <div className="homecontentwrapper">
        <Message messageData={this.state.messageData} />
        <header className="col-lg-12 headerflow">            
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 greenStrip"></div>
            {/* <div id="topbar" className="topheadbar">
                <div className="container headerContainer">
                    <div className="inner-topbar box">
                        <div className="float-left">
                            <p><img src={iconPhoneHeader} alt="icon"/>&nbsp; Call us&nbsp; <span> 070-7782-9137</span></p>
                        </div>
                         <div className="col-lg-6 col-md-6 NOpadding">
                              <div className="col-lg-12 col-md-12 searchBox">
                                  <input type="text" placeholder="Search for Products, Brands and more   " onChange={this.searchProducts.bind(this)} className="NOpadding-right zzero form-control" ref="tableSearch" id="tableSearch" name="tableSearch" />
						                      <button className="button_search"  type="button"><i className="fa fa-search"></i></button>
                              </div> 
                          </div>
                        <div className="col-lg-3 float-right">
                            <div className="hover-menu">
                            {user_ID 
                            ? 
                                <li className="dropdown">
                                    <a className="acc" href="/account" area-hidden ="true"><img src={iconUserHeader} alt="icon"/>&nbsp;MY ACCOUNT</a>
                                    <ul className="col-lg-3 dropdown-menu list-menu">                                        
                                        <li className="col-lg-12 NOpadding">
                                            <a href="/">
                                            <div className="row">
                                                <div className="col-lg-2">
                                                <div className="shortnamebk">
                                                    <div className="">                                                    
                                                        <div className="userinfo">{this.state.firstname}{this.state.lastname}</div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="col-lg-10">
                                                <div className="col-lg-12">
                                                    <div className="userinfotext"><span >{this.state.userData ? this.state.userData.fullName : null}</span></div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="useremail"><span>{this.state.userData ? this.state.userData.email : null}</span></div>
                                                </div>
                                                </div>
                                            </div>
                                            </a>
                                        </li>                                  
                                        <li className="col-lg-12 NOpadding headerlia"><a href="/account">My Profile</a></li>
                                        <li className="col-lg-12 NOpadding headerlia"><a href="/my-ordersUni">My Orders</a></li>
                                        <li className="col-lg-12 NOpadding headerlia"><a href="/wishlist">My Wishlist</a></li>
                                        <li className="col-lg-12 NOpadding headerlia signoutBtn" style={{ backgroundColor:"#80b435", color:"#fff"}}  onClick={this.signOut.bind(this)}><a href="/" style={{ backgroundColor:"#80b435", color:"#fff"}}>Sign Out</a></li>
                                    </ul>
                                </li>
                            :
                              <li className="dropdown">                                
                                  <span className="  "><a href="" className="loginButton" data-toggle="modal" data-target="#loginFormModal" area-hidden ="true">Login </a></span>
                                  <span className="  "><a href="" className="loginButton" data-toggle="modal" data-target="#pincodeModal" area-hidden ="true"><i class="fa fa-map-marker" aria-hidden="true"></i> </a></span>
                                  <div id="loginFormModal" className="modal in">
                                    <div className="modal-dialog">                                        
                                        <div className="modal-content loginModalContent">                            
                                            <div className="modal-body">   
                                            <button type="button" className="close"  data-dismiss="modal" aria-hidden="true">&times;</button>                                                            
                                                {this.state.loginForm === "true" ?
                                                    <div className="col-lg-12 col-md-12 loginForm">
                                                        <Login />
                                                    </div>  
                                                : null
                                                }  
                                                {this.state.signUpForm === "true" ?
                                                    <div className="col-lg-12 col-md-12 signupForm">
                                                        <SignUp />
                                                    </div>  
                                                : null
                                                } 
                                                {this.state.forgotPassForm === "true" ?
                                                    <div className="col-lg-12 col-md-12 loginForm">
                                                        <ForgotPassword />
                                                    </div>  
                                                : null
                                                }                                                                
                                            </div>
                                        </div>
                                    </div>
                                  </div>                                  
                              </li>
                            }
                            </div>
                        </div>
                    </div>
                </div>                
            </div>  */}

            <div className="col-lg-12 firstDiv">
              <div className="row">           
                <div className="col-lg-2 col-md-1 col-sm-2 header-top">
                    <div className="contaner">
                        <div className="box col-lg-12 col-md-12 col-sm-12">
                            <p className="icon-menu-mobile"><i className="fa fa-bars"></i></p>
                            <div className="logo col-lg-12 col-md-12 col-sm-12">
                                <a href="/" title="Unimandai logo">
                                    <img src={logoUnimandai} alt="images" className="col-lg-12"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <nav>
                    <div className="col-lg-6 col-md-6 col-sm-8 megamenuWrapper">
                        <Megamenu />
                    </div>
                </nav>
                
                <div className="col-lg-3 col-md-3 NOpadding searchBoxWrapper">
                              <div className="col-lg-12 col-md-12 searchBox">
                                  <input type="text" placeholder="Search for Products, Brands and more   " onChange={this.searchProducts.bind(this)} className="NOpadding-right zzero form-control" ref="tableSearch" id="tableSearch" name="tableSearch" />
						                      <button className="button_search"  type="button"><i className="fa fa-search"></i></button>
                              </div> 
                </div>

                          
                <div className="col-lg-1 col-md-1 col-sm-2 box-right">
                      <div className="col-lg-4 col-md-4 col-sm-4">
                          {/* <span className="  "><a href="" className="faIcon" data-toggle="modal" data-target="#pincodeModal" area-hidden ="true"><i class="fa fa-map-marker" aria-hidden="true"></i> </a></span> */}
                          <span className="  "><a href="" className="faIcon " data-toggle="modal" data-target="#pincodeModal" area-hidden ="true">
                            <img src={modalImg} className="icon-cart"></img>
                          </a></span>
                          
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4">
                          {user_ID 
                            ? 
                                <li className="dropdown">
                                    <span className="  "><a href="" className="faIcon" area-hidden ="true">                         
                                    <img src={loginActiveIconImg} className="icon-cart"></img>
                                </a></span>
                                    <ul className="col-lg-3 dropdown-menu list-menu">                                        
                                        <li className="col-lg-12 NOpadding">
                                            <a href="/">
                                            <div className="row">
                                                <div className="col-lg-2">
                                                <div className="shortnamebk">
                                                    <div className="">                                                    
                                                        <div className="userinfo">{this.state.firstname}{this.state.lastname}</div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="col-lg-10">
                                                <div className="col-lg-12">
                                                    <div className="userinfotext"><span >{this.state.userData ? this.state.userData.fullName : null}</span></div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="useremail"><span>{this.state.userData ? this.state.userData.email : null}</span></div>
                                                </div>
                                                </div>
                                            </div>
                                            </a>
                                        </li>                                  
                                        <li className="col-lg-12 NOpadding headerlia"><a href="/account">My Profile</a></li>
                                        <li className="col-lg-12 NOpadding headerlia"><a href="/my-ordersUni">My Orders</a></li>
                                        <li className="col-lg-12 NOpadding headerlia"><a href="/wishlist">My Wishlist</a></li>
                                        <li className="col-lg-12 NOpadding headerlia signoutBtn" style={{ backgroundColor:"#80b435", color:"#fff"}}  onClick={this.signOut.bind(this)}><a href="/" style={{ backgroundColor:"#80b435", color:"#fff"}}>Sign Out</a></li>
                                    </ul>
                                </li>
                            :
                            <span><a href="" className="faIcon" data-toggle="modal" data-target="#loginFormModal" area-hidden ="true">                            
                              <img src={loginIconImg} className="icon-cart"></img></a>
                            </span>
                          }
                      </div>
                    
                      <div id="loginFormModal" className="modal in">
                          <div className="modal-dialog">                                        
                              <div className="modal-content loginModalContent">                            
                                  <div className="modal-body">   
                                  <button type="button" className="close"  data-dismiss="modal" aria-hidden="true">&times;</button>                                                            
                                      {this.props.formToShow === "login" ?
                                          <div className="col-lg-12 col-md-12 loginForm">
                                              <Login />
                                          </div>  
                                      : null
                                      }  
                                      {this.props.formToShow === "signUp" ?
                                          <div className="col-lg-12 col-md-12 signupForm">
                                              <SignUp />
                                          </div>  
                                      : null
                                      } 
                                      {this.props.formToShow === "forgotPassword" ?
                                          <div className="col-lg-12 col-md-12 loginForm">
                                              <ForgotPassword />
                                          </div>  
                                      : null
                                      }                                                                
                                  </div>
                              </div>
                          </div>
                        </div> 
                    
                    <div className="col-lg-4 col-md-4 col-sm-5 dropdown faIcon cart hover-menu ">
                      <span>  
                      {user_ID ?                      
                        <a href={user_ID ? "/cart" : null} className="icon-cart">
                            <img src={cartIconImg} className="icon-cart" onClick={this.loginPage.bind(this)}></img>
                            {/* <i class="fa fa-shopping-cart icon-cart" aria-hidden="true" onClick={this.loginPage.bind(this)}></i> */}
                            <span className="cart-count">
                                {this.props.recentCartData.length>0? this.props.recentCartData[0].cartItems.length : 0}                                
                            </span>
                        </a>
                        :
                        <a href='' className="icon-cart" data-toggle="modal" data-target="#loginFormModal">
                            <img src={cartIconImg} className="icon-cart"></img>
                            {/* <i class="fa fa-shopping-cart icon-cart" aria-hidden="true" onClick={this.loginPage.bind(this)}></i> */}
                            <span className="cart-count">
                                {this.props.recentCartData.length>0? this.props.recentCartData[0].cartItems.length : 0}                                
                            </span>
                        </a>
                      }
                      </span>
                        {user_ID ?
                          <ul className="dropdown-menu cart-dropdown-menu" role="menu" aria-labelledby="menu1">
                            <div className="checkoutBtn">
                            <div>
                              <p className="categoryDetails"><b>Cart Details</b></p>
                            </div>
                              <p className="col-lg-3 mb20"><b>{this.props.recentCartData.length>0? this.props.recentCartData[0].cartItems.length : 0}</b> item(s)</p>
                              <div className="col-lg-9 text-right">Subtotal : <i className="fa fa-inr"></i> {this.props.recentCartData.length>0 ? this.props.recentCartData[0].total : 0}</div>
                              
                            </div>
                            <div className={this.props.recentCartData.length > 0 ? "dropScroll": ""}>
                            {
                              this.props.recentCartData && this.props.recentCartData.length > 0 && this.props.recentCartData[0].cartItems.length > 0 ?
                              this.props.recentCartData[0].cartItems.map((data, index) => {
                                  return (
                                    <li className="col-lg-12 cartdropheight " key={index}>

                                      <div className="cartdropborder">
                                        <div className="col-lg-3">
                                            <img src={data.productDetail.productImage &&  data.productDetail.productImage[0] ? data.productDetail.productImage[0] : notavailable} alt="Product Picture" className="imghgt" />
                                        </div>
                                        <div className="col-lg-9 ">
                                          {/* <div className="row"> */}
                                            {/* <a href={"/productdetails/"+data.productDetail.productUrl+"/" + data.productDetail._id}></a> */}
                                            <div className="col-lg-12"><p className="row"><a href={"/productdetails/"+data.productDetail.productUrl+"/" + data.productDetail._id}><b>{data.productDetail.productName}</b></a></p></div>
                                            <div className="col-lg-12 text-center">
                                              {/* <div className="row"> */}
                                                {/* <div className="col-lg-4"><p className="row"><a href={"/productdetails/"+data.productDetail.productUrl+"/" + data.productDetail._id}><b>{data.productDetail.productName}</b></a></p></div> */}
                                                <div className="col-lg-2"><p className="row"><b><i className="fa fa-inr"></i> {data.productDetail.discountedPrice}</b></p></div>
                                                <div className="col-lg-2"><p className="row"><b> {data.quantity}</b></p></div>
                                                <div className="col-lg-2"><p className="row"><b><i className="fa fa-inr"></i> {data.subTotal}</b></p></div>
                                                <div className="col-lg-2"><div className="row"><i className="fa fa-trash-o cartdropaction" aria-hidden="true" id={data._id} removeid={data._id} onClick={this.Removefromcart.bind(this)}></i></div></div>
                                              {/* </div> */}
                                            </div>
                                          </div>
                                        {/* </div> */}
                                      </div>
                                    </li>
                                  );
                                })
                                :
                                <div>
                                  <div><p className="mt15 mb15 col-lg-12 col-md-12 col-sm-12 col-xs-12">You have no items in your shopping cart.</p></div>
                                </div>
                            }
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cartdropborder">

                              <div className="col-lg-6 NOpaddingLeft">
                                <a href="/cart"><div className="btn cartdropbtn2_un col-lg-12" title="VIEW CART">VIEW CART</div></a>
                              </div>
                              {
                              this.props.recentCartData[0] && this.props.recentCartData[0].cartItems.length > 0 ?  
                                <div className="col-lg-6 NOpaddingRight">
                                  <a href={user_ID ? "/checkout" : "/login"}><div className="btn cartdropbtn_un col-lg-12 checkoutBtn" title="Checkout">CHECKOUT</div></a>
                                </div>
                                : "" 
                              }                      

                            </div>
                          </ul>
                          :
                          null
                        }
                    </div>                    
                </div>
              </div>
            </div>          
          </div>
        </header>
        
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("form state===",state);
  return {
    searchResult   : state.searchResult,
    searchCriteria : state.searchCriteria,
    recentCartData : state.recentCartData,
    formToShow     : state.formToShow,


  }
}
const mapDispachToProps = (dispatch) => {
  return  bindActionCreators({ fetchCartData: getCartData, searchProductFun: searchProductAction, formToShowValue :getForm}, dispatch)
}
export default connect(mapStateToProps, mapDispachToProps)(withRouter(unimandaiHeader));
