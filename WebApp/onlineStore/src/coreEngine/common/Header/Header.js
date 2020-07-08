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
import '../../../sites/currentSite/common/Header.css';
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
          console.log("search response:",response);
          this.setState({ searchResult: response.data }, () => {
            formValues.loading = false;
            this.props.searchProductFun(formValues, this.state.searchResult);
          });
        })
        .catch((error) => {
          console.log('error', error);
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
        <header className="col-lg-12 headerflow">
          <div className="row">
            {/* <div className="col-lg-12 header1wrapper">
              <div className="row">
                <div className="col-lg-10 col-lg-offset-1">
                  <div className="row">
                    <div className="col-lg-6 header1list1">
                      <div className="row">
                        <ul>
                          <li><a href="/">Get the app</a></li>
                          {user_ID ?
                            <li className="borderLeft cursorpointer" data-toggle="modal" data-target="#customercareModal"><a>Customer Care</a></li>
                            :
                            <li className="borderLeft cursorpointer"><a href="/login">Customer Care</a></li>
                          }
                          <div className="modal " id="customercareModal" role="dialog">
                            <div className="modal-dialog modal-lg dialog">
                              <div className="modal-content col-lg-8 col-lg-offset-2">
                                <div className="row">
                                  <div className="modal-header">
                                    <img src="../../../sites/currentSite/images/Icon.png" />
                                    <button type="button" className="close modalclosebut" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title modalheadingcont">CUSTOMER CARE</h4>
                                  </div>
                                  <div className="">
                                    <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1 carewrap">
                                      <div className="formcontentheight col-lg-12">
                                        <label htmlFor="name">Name<span className="redFont">*</span></label>
                                        <input disabled className="col-lg-12 inputcontent" id="name" type="text" ref="firstName" />
                                      </div>
                                      <div className="formcontentheight col-lg-12">
                                        <label htmlFor="email">Mobile No<span className="redFont">*</span></label>
                                        <input disabled className="col-lg-12 inputcontent" id="mobileno" type="number" ref="mobNumber" />
                                      </div>
                                      <div className="formcontent1 col-lg-12">
                                        <label htmlFor="message">Write a Feedback<span className="redFont">*</span></label>
                                        <textarea className="col-lg-12 inputcontenttextarea" id="message" ref="message" name="message" value={this.state.message} row="5"></textarea>
                                      </div>
                                      <div className="checkbox">
                                      </div>
                                      <div onClick={this.submitQuery.bind(this)} className="btn btn-warning pull-right"> Submit</div>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {
                            <li className="borderLeft"><a href={user_ID ? "/shipment-tracking" : "/login"}>Track my order</a></li>
                          }

                        </ul>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>  */}
            <div className="col-lg-10 col-lg-offset-1">
              <div className="row">
                <div className="col-lg-3 headerlogoimg headerLogoPaddingtop text-center">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="row">
                        <a href="/"><img src="../../../sites/currentSite/images/anasLogo.png" alt="Logo Picture " /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 headerpaddingtop">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="row abc">
                            <ReactMultiSelectCheckboxes placeholderButtonLabel="Shop by category"
                              value={this.state.localCategories}
                              options={this.state.options} className={"customStyles"}
                              onChange={this.handleChange.bind(this)} />
                          </div>
                        </div>
                        <div className="col-lg-7">
                          <div className="row">
                            <input type="text" className="col-lg-12 headersearch"
                              onBlur={this.handleString.bind(this)} name="localstr"
                              placeholder="Search by product name, category, brand..." />
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="row">
                            <button className="col-lg-8 btn searchbutton" type="button" onClick={this.searchProducts.bind(this)} ><i className="fa fa-search" aria-hidden="true"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-1 col-md-1 headerpaddingtop text-center">
                  <div className="col-lg-12 headercart">
                    <div className="row dropdown">
                      <a href={user_ID ? "/cart" : "/login"}><i className="fa fa-shopping-bag headercarticon" aria-hidden="true"></i><span className="cartvalue">{this.props.recentCartData.length>0? this.props.recentCartData[0].cartItems.length : 0}
                      </span></a>

                      {user_ID ?
                        <ul className="dropdown-menu cartdropmenu" role="menu" aria-labelledby="menu1">
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
                                          <img src={data.productDetail.productImage &&  data.productDetail.productImage[0] ? data.productDetail.productImage[0] : notavailable} alt="Product Picture" />
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
                              <a href="/cart"><div className="btn cartdropbtn2 col-lg-12" title="VIEW CART">VIEW CART</div></a>
                            </div>
                            {
                             this.props.recentCartData[0] && this.props.recentCartData[0].cartItems.length > 0 ?  
                              <div className="col-lg-6 NOpaddingRight">
                                <a href={user_ID ? "/checkout" : "/login"}><div className="btn cartdropbtn col-lg-12 checkoutBtn" title="Checkout">CHECKOUT</div></a>
                              </div>
                              : "" 
                            }

                            

                          </div>
                        </ul>
                        :
                        null
                      }
                      {/* <a href={user_ID ? "/cart" : "/login"} className="cartitemscss">ITEM (S)</a> */}
                    </div>
                  </div>
                </div>

                <div className="col-lg-1 col-md-1 headerpaddingtop">
                <div className="col-lg-6 header1list2">
                      <div className="row">
                        <ul>
                          {/*
                            user_ID ? ""
                              : <li className="borderLeft"><a href="/signup"><i className="fa fa-sign-in"></i> &nbsp;Sign Up</a></li>

                          */}

                          {

                            user_ID ?
                              <li className="dropdown"><i className="fa fa-user headercarticon" aria-hidden="true"></i>
                                <ul className="dropdown-menu signinmenuul">
                                  <li className="col-lg-12 NOpadding">
                                    <a href="/">
                                      <div className="row">
                                        <div className="col-lg-2">
                                          <div className="shortnamebk">
                                            <div className="">
                                              {/*<div className="userinfo">{this.state.userData ? this.state.firstname  : null}</div>*/}
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
                                  <li className="col-lg-12 NOpadding"><a href="/account">My Profile</a></li>
                                  <li className="col-lg-12 NOpadding"><a href="/my-orders">My Orders</a></li>
                                  <li className="col-lg-12 NOpadding"><a href="/wishlist">My Wishlist</a></li>
                                  <li className="col-lg-12 NOpadding" onClick={this.signOut.bind(this)}><a href="/" style={{ backgroundColor:"#A2632C", color:"#fff"}}>Sign Out</a></li>
                                </ul>
                              </li>
                              :
                              <li className="dropdown"><i className="fa fa-user headercarticon" aria-hidden="true"></i>
                                <ul className="dropdown-menu signinmenuul signoutmenuul">
                                  <li className="col-lg-12">
                                    <label>Welcome</label>
                                    <p>To access account and manage orders</p>
                                    <div className="borderTop"></div>
                                    <span className="col-lg-6 dropBtn"><a href="/login"> SIGN IN </a></span>
                                    <span className="col-lg-6 dropBtn"><a href="/signup">SIGN UP</a></span>
                                  </li>
                                </ul>
                              </li>
                          }
                        </ul>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <nav>
          <div className="col-lg-12 catogeryvaluebg">
            <div className="row">
              <Megamenu />
            </div>
          </div>
        </nav>
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
export default connect(mapStateToProps, mapDispachToProps)(withRouter(Header));
