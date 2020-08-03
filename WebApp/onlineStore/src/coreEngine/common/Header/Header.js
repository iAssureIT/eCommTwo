 
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
import '../../../sites/currentSite/common/Header.css';
import Login          from '../../systemSecurity/Login.js';
import SignUp         from '../../systemSecurity/SignUp.js';
import ForgotPassword from '../../systemSecurity/ForgotPassword.js';
import loginIconImg    from "../../../sites/currentSite/images/userIcon.png";
import logoUnimandai   from "../../../sites/currentSite/images/Logo.png";
import cartphoto       from "../../../sites/currentSite/images/cartpic1.png";
import modalImg        from "../../../sites/currentSite/images/mapIcon.png";
import cartIconImg     from "../../../sites/currentSite/images/cartIcon.png";
import loginActiveIconImg from "../../../sites/currentSite/images/loginActiveImg.png";

// import jQuery from "jquery";

import notavailable from '../../../sites/currentSite/images/notavailable.jpg';

class Header extends Component {
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
removeModalBackDrop(event){
    $(".modal-backdrop").hide();
  }

   async componentDidMount(){
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

    $(".dropdown").hover(
      function () {
        $(this).addClass("open");
      },
      function () {
        $(this).removeClass("open");
      }
    );

    var localcatArray = JSON.parse(localStorage.getItem("catArray"));
    var searchstr = localStorage.getItem("searchstr");

    if (localcatArray) {
      this.setState({ localCategories: localcatArray })

      var catArray = [];

      localcatArray.map((data, index) => {
        catArray.push({ id: data.value, category: data.label, section_ID: data.section_ID });
      })
      console.log("catArray:" ,catArray);
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
  showSearchbar(){
    $(".searchBox").css('display','block');
    $(".searchicon").fadeOut();
    $(".searchclose").css('display','block');

  }
  closesearchbar(){
    // $(".searchBox").css('display','none');
    $(".searchBox").fadeOut(); 
    $(".searchicon").css('display','block');
    $(".searchclose").fadeOut();

  }
  searchProducts() {
    
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
  CloseModal() {
    $("#pageOpacity").hide();
    $('#loginFormModal').hide();
  }
  getUserData() {
    const userid = localStorage.getItem('user_ID');
    // console.log("inside getuserdata");
    axios.get('/api/users/' + userid)
      .then((res) => {

        console.log('userdata res', res.data);
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
    if(userid){
    const userid = localStorage.getItem('user_ID');
      console.log("userId :",userid);
      axios.get("/api/wishlist/get/wishlistcount/" + userid)
      .then((response) => {
        this.props.initialWishlist(response.data);
      })
      .catch((error) => {
        // console.log('error', error);
      })
    }  
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
            "class": "success",
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
            "class": "success",
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
  loginPage(event){
    event.preventDefault();
    localStorage.setItem('previousUrl' ,'/');
    this.props.history.push("/cart");
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
    // console.log('recentCartData', this.props.recentCartData.length);
    const user_ID = localStorage.getItem("user_ID");
    // console.log("user_ID:",user_ID);
    return (
      <div className="homecontentwrapper">
        <Message messageData={this.state.messageData} />
          <header className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headerflow NoPadding">
          {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 upper_headerdiv"></div>*/}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NoPadding">
                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-3 headerlogoimg headerLogoPaddingtop text-left NoPadding">
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 NoPadding">
                        <a href="/"><img src={require("../../../sites/currentSite/images/NewAnasLogo.jpg")} alt="Logo Picture " /></a>
                    </div>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 NoPadding-right">
                  <nav>
                      <Megamenu />
                  </nav>
                </div>
                {/*<div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 headerpaddingtop">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="row">
                         <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                          <div className="row">
                            <button className="col-lg-offset-4 col-lg-8 col-md-8 col-sm-8 col-xs-8 btn searchbutton_left" type="button" onClick={this.searchProducts.bind(this)} ><i className="fa fa-search" aria-hidden="true"></i></button>
                          </div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                          <div className="row">
                            <input type="text" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headersearch" onChange={this.searchProducts.bind(this)}
                              ref="tableSearch" id="tableSearch" name="tableSearch"
                              placeholder="Search by product name, category, brand..." />
                          </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                          <div className="row">
                            <button className="col-lg-8 col-md-8 col-sm-8 col-xs-8 btn searchbutton" type="button" onClick={this.searchProducts.bind(this)} ><i className="fa fa-search" aria-hidden="true"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>*/}
               
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 usericon_pos">
                 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 header1list2">
                  <i className="searchicon headercarticon fa fa-search "id="demo-2" title="Search The website" onClick={this.showSearchbar.bind(this)}></i>
                  <i className="searchclose headercarticon fa fa-times" title="Close Search" onClick={this.closesearchbar.bind(this)}></i>
                    
                 </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 header1list2">
                      <div className="row">
                        <ul>
                          {/*
                            user_ID ? ""
                              : <li className="borderLeft"><a href="/signup"><i className="fa fa-sign-in"></i> &nbsp;Sign Up</a></li>
                          */}

                          {

                            user_ID ?
                              <li className="dropdown">
                                <i className="headercarticon fa fa-user"aria-hidden="true"></i>
                                <ul className="dropdown-menu signinmenuul">
                                  <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                    <a href="/">
                                      <div className="row">
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                          <div className="shortnamebk">
                                            <div className="">
                                              {/*<div className="userinfo">{this.state.userData ? this.state.firstname  : null}</div>*/}
                                              <div className="userinfo">{this.state.firstname}{this.state.lastname}</div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="userinfotext"><span >{this.state.userData ? this.state.userData.fullName : null}</span></div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                            <div className="useremail"><span>{this.state.userData ? this.state.userData.email : null}</span></div>
                                          </div>
                                        </div>
                                      </div>
                                    </a>

                                  </li>
                                  <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding"><a href="/account">My Profile</a></li>
                                  <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding"><a href="/my-orders">My Orders</a></li>
                                  <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding"><a href="/wishlist">My Wishlist</a></li>
                                  <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding" onClick={this.signOut.bind(this)}><a href="/" style={{ backgroundColor:"#A2632C", color:"#fff"}}>Sign Out</a></li>
                                </ul>
                              </li>
                              :
                             <li>
                               <span><a href="" className="faIcon" data-toggle="modal" data-target="#loginFormModal"  onClick={this.removeModalBackDrop.bind(this)} area-hidden ="true">                            
                                 <i className="headercarticon  fa fa-user" aria-hidden="true"></i></a>
                               </span>
                        
                             </li>
                          }
                        </ul>
                      </div>
                      <div id="loginFormModal" className="modal in">
                        <div className="modal-dialog">                                        
                            {/* <div className="modal-content loginModalContent col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12" style={{'background': 'url(' +pincodeModalImg  +')'}}>                             */}
                            <div className="modal-content loginModalContent col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">                            
                              <div className="modal-body">   
                                <button type="button" className="close" onClick={this.CloseModal.bind(this)}  data-dismiss="modal" aria-hidden="true">&times;</button>                                                            
                                    {this.props.formToShow === "login" ?
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 loginForm">
                                            <Login />
                                        </div>  
                                    : null
                                    }  
                                    {this.props.formToShow === "signUp" ?
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signupForm">
                                            <SignUp />
                                        </div>  
                                    : null
                                    } 
                                    {this.props.formToShow === "forgotPassword" ?
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 loginForm">
                                            <ForgotPassword />
                                        </div>  
                                    : null
                                    }                                                                
                                </div>
                            </div>
                        </div>
                     </div> 
                  </div>
                   
                    
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 dropdown faIcon cart hover-menu ">
                      <span>  
                      {user_ID ?                      
                        <a href={user_ID ? "/cart" : null} className="icon-cart ">
                           <i className=" headercarticon headercarticon_bag fa fa-shopping-cart" aria-hidden="true" onClick={this.loginPage.bind(this)} style={{width:"24px"}}></i>
                            
                            {/* <i className="fa fa-shopping-cart icon-cart" aria-hidden="true" onClick={this.loginPage.bind(this)}></i> */}
                            <span className="cornercart cart-count">
                                {this.props.recentCartData.length>0? this.props.recentCartData[0].cartItems.length : 0}                                
                            </span>
                        </a>
                        :
                        <a href='' className="icon-cart" data-toggle="modal" data-target="#loginFormModal" onClick={this.removeModalBackDrop.bind(this)}>
                           <i className=" headercarticon headercarticon_bag fa fa-shopping-cart" aria-hidden="true" style={{width:"24px"}}></i>
                            {/* <i className="fa fa-shopping-cart icon-cart" aria-hidden="true" onClick={this.loginPage.bind(this)}></i> */}
                            <span className="cornercart cart-count">
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
                              <p className="col-lg-3 col-md-3 col-sm-3 col-xs-3 mb20"><b>{this.props.recentCartData.length>0? this.props.recentCartData[0].cartItems.length : 0}</b> item(s)</p>
                              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 text-right">Subtotal : <i className="fa fa-inr"></i> {this.props.recentCartData.length>0 ? this.props.recentCartData[0].total : 0}</div>                              
                            </div>
                            <div className={this.props.recentCartData.length > 0 ? "dropScroll": ""}>
                            {
                              this.props.recentCartData && this.props.recentCartData.length > 0 && this.props.recentCartData[0].cartItems.length > 0 ?
                              this.props.recentCartData[0].cartItems.map((data, index) => {
                                  return (
                                    <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cartdropheight " key={index}>

                                      <div className="cartdropborder">
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                            <img src={data.productDetail.productImage &&  data.productDetail.productImage[0] ? data.productDetail.productImage[0] : notavailable} alt="Product Picture" className="imghgt" />
                                        </div>
                                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 ">
                                          {/* <div className="row"> */}
                                            {/* <a href={"/productdetails/"+data.productDetail.productUrl+"/" + data.productDetail._id}></a> */}
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><p className="row"><a href={"/productdetails/"+data.productDetail.productUrl+"/" + data.productDetail._id}><b>{data.productDetail.productName}</b></a></p></div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                              {/* <div className="row"> */}
                                                {/* <div className="col-lg-4"><p className="row"><a href={"/productdetails/"+data.productDetail.productUrl+"/" + data.productDetail._id}><b>{data.productDetail.productName}</b></a></p></div> */}
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3"><p className="row"><b><i className="fa fa-inr"></i> {data.productDetail.discountedPrice}</b></p></div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3"><p className="row"><b> {data.quantity}</b></p></div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3"><p className="row"><b><i className="fa fa-inr"></i> {data.subTotal}</b></p></div>
                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 pull-right"><div className="row"><i className="fa fa-trash-o cartdropaction" aria-hidden="true" id={data._id} removeid={data._id} onClick={this.Removefromcart.bind(this)}></i></div></div>

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
                              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpaddingLeft">
                                <a href="/cart">
                                 <div className="btn cartdropbtn2_un col-lg-12 col-md-12 col-sm-12 col-xs-12" title="VIEW CART">VIEW CART</div></a>
                              </div>
                              
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpaddingRight">
                                  <a href={user_ID ? "/checkout" : "/login"}>
                                    <div className="btn cartdropbtn_un col-lg-12 cartdropbtn2_un" title="Checkout">CHECKOUT</div></a>
                                </div>
                            </div>
                          </ul>
                          :
                          null
                        }
                    </div> 
                </div>
            </div>
             <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 searchBox">
                  <input type="text" placeholder="Search for Products  " onChange={this.searchProducts.bind(this)} className="NOpadding-right zzero form-control search_input" ref="tableSearch" id="tableSearch" name="tableSearch" />
                  <i className="fa fa-search searchIcon" ></i>
                </div> 
        </header>
        <nav>
         {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 catogeryvaluebg">
            <div className="row">
              <Megamenu />
            </div>
          </div>*/}
        </nav>
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
export default connect(mapStateToProps, mapDispachToProps)(withRouter(Header));