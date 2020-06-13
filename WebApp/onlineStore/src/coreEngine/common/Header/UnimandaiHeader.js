import React, { Component }       from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Megamenu                   from '../Megamenu/Megamenu.js';
import axios                      from 'axios';
import { withRouter }             from 'react-router-dom';
import Message                    from '../../blocks/Message/Message.js'; 
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import {getCartData, searchProductAction} from '../../actions/index';
import $                          from "jquery";
import '../../../sites/currentSite/common/UnimandaiHeader.css';

// import './Header.css';
// import jQuery from "jquery";



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
      lastname       : ''
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

    /*$(".dropdown").hover(
      function () {
        $(this).addclass("open");
      },
      function () {
        $(this).removeclass("open");
      }
    );*/

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
    if (this.state.catArray.length > 0) {

      var searchstr = $('.headersearch').val()
      var formValues = {
        "searchstr": searchstr,
        "catArray": this.state.catArray,
        "loading": true,
      }

      if (searchstr !== '') {
        localStorage.setItem("searchstr", searchstr);
      }
      this.props.searchProductFun(formValues, this.state.searchResult)

      //this.props.searchProduct();

      axios.post("/api/products/post/searchINCategory", formValues)
        .then((response) => {
          this.setState({ searchResult: response.data }, () => {
            formValues.loading = false;
            this.props.searchProductFun(formValues, this.state.searchResult);
          });
        })
        .catch((error) => {
          // console.log('error', error);
        })

      this.props.history.push("/searchProducts");
    }
    if (this.state.catArray.length === 0 && $('.headersearch').val() !== '') {
      // var searchstr = $('.headersearch').val();
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
        .catch((error) => {
          // console.log('error', error);
        })

      this.props.history.push("/searchProducts");
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
    axios.get("/api/wishlist/get/wishlistcount/" + userid)
      .then((response) => {
        this.props.initialWishlist(response.data);
      })
      .catch((error) => {
        // console.log('error', error);
      })
  }
   modalClickEvent(){
    console.log("click event")
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
    // console.log('recentCartData', this.props.recentCartData.length);
    // console.log('recentCartData item====', this.props.recentCartData);
    
    const user_ID = localStorage.getItem("user_ID");
    // console.log("user_ID:",user_ID);
    return (
      <div className="homecontentwrapper">
        <Message messageData={this.state.messageData} />
        <header className="col-lg-12 headerflow">            
          <div className="row">
            <div id="topbar" className="">
                <div className="container headerContainer">
                    <div className="inner-topbar box">
                        <div className="float-left">
                            <p><img src="/images/unimandai/icon-phone-header.png.png" alt="icon"/>&nbsp; Call us&nbsp; <span> 070-7782-9137</span></p>
                        </div>
                        <div className="float-right align-right">
                            <div className="hover-menu">
                            {user_ID 
                            ?    
                                <li className="dropdown">
                                    <a className="acc" href="/account" title="My Account" area-hidden ="true"><img src="/images/unimandai/icon-user-header.png" alt="icon"/>&nbsp;MY ACCOUNT</a>
                                    <ul className="col-lg-4 dropdown-menu list-menu">
                                        
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
                                <a className="acc" href="login" title="My Account" area-hidden ="true"><img src="/images/unimandai/icon-user-header.png" alt="icon"/>&nbsp;MY ACCOUNT</a>
                                {/* <ul className="col-lg-3 dropdown-menu logout-list-menu">
                                    <li><a href="/login" title="Login">LOGIN</a></li>
                                    <li><a href="/signup" title="Resgister">REGISTER</a></li>
                                </ul> */}

                                <ul className="dropdown-menu logout-list-menu">
                                  <li className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="welcomeTxt">Welcome</div>
                                    <p>To access account and manage orders</p>
                                    <div className="borderTop"></div>
                                    <span className=" pull-left signInOutBtn"><a href="/login"><b> SIGN IN</b> </a></span>
                                    <span className=" pull-right signInOutBtn"><a href="/signup"><b>SIGN UP</b></a></span>
                                  </li>
                                </ul>
                            </li>

                            }
                            </div>
                        </div>
                    </div>
                </div>                
            </div> 

            <div className="col-lg-12 firstDiv">
              <div className="row">              
                
                <div className="col-lg-2 col-md-2 col-sm-2 header-top">
                    <div className="contaner">
                        <div className="box col-lg-12 col-md-12 col-sm-12">
                            <p className="icon-menu-mobile"><i class="fa fa-bars"></i></p>
                            <div className="logo col-lg-12 col-md-12 col-sm-12">
                                <a href="/" title="Unimandai logo">
                                {/* <img src="/images/unimandai/logoUnimandai.png" alt="images" className="col-lg-12 uniLogo"/> */}
                                    <img src="/images/unimandai/logoUnimandai.png" alt="images" className="col-lg-12"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <nav>
                    <div className="col-lg-8 col-md-8 col-sm-8 megamenuWrapper">
                        <Megamenu />
                    </div>
                </nav>


                          
                <div className="col-lg-1 col-md-1 col-sm-2 box-right">
                    <div className="col-lg-5 col-md-5 col-sm-5 search" id="searchModal" data-toggle="modal" data-target=".searchModal">
                        <i class="icon"></i>                        
                    </div>
                   {/* Search modal */}
                    <div className="modal bs-example-modal-lg in searchModal" aria-hidden="false">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content popup-search">
                                <button type="button" className="close" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i></button>
                                <div className="modal-body search-modal-body">
                                    <div className="input-group">
                                        <input type="text" className="form-control control-search" placeholder="Search and hit enter..."/>
                                        <button className="button_search" type="button">Search</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-5 col-sm-5 dropdown cart hover-menu ">                        
                        <a href={user_ID ? "/cart" : "/login"} className="icon-cart" onClick={this.loginPage.bind(this)}>
                            <i className="icon"></i>
                            <span className="cart-count">
                                {this.props.recentCartData.length>0? this.props.recentCartData[0].cartItems.length : 0}                                
                            </span>
                        </a>
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
                                        <div className="col-lg-3 cartdropimg">
                                          <div className="row">
                                            <img src={data.productDetail.productImage &&  data.productDetail.productImage[0] ? data.productDetail.productImage[0] : "/images/notavailable.jpg"} alt="Product Picture" />
                                          </div>
                                        </div>
                                        <div className="col-lg-9 cartdropimg">
                                          <div className="row">
                                            <a href={"/productdetails/"+data.productDetail.productUrl+"/" + data.productDetail._id}><p className="cartdroptext col-lg-12" title={data.productDetail.productName}>{data.productDetail.productName}</p></a>
                                            <div className="col-lg-12 text-center">
                                              <div className="row">
                                                <div className="col-lg-4"><p className="row"><b><i className="fa fa-inr"></i> {data.productDetail.discountedPrice}</b></p></div>
                                                <div className="col-lg-3"><p className="row"><b> {data.quantity}</b></p></div>
                                                <div className="col-lg-3"><p className="row"><b><i className="fa fa-inr"></i> {data.subTotal}</b></p></div>
                                                <div className="col-lg-2"><div className="row"><i className="fa fa-trash-o cartdropaction" aria-hidden="true" id={data._id} removeid={data._id} onClick={this.Removefromcart.bind(this)}></i></div></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
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
  return {
    searchResult: state.searchResult,
    searchCriteria: state.searchCriteria,
    recentCartData :  state.recentCartData

  }
}
const mapDispachToProps = (dispatch) => {
  return  bindActionCreators({ fetchCartData: getCartData, searchProductFun: searchProductAction }, dispatch)
}
export default connect(mapStateToProps, mapDispachToProps)(withRouter(unimandaiHeader));
