
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import { Header, Button, Icon, SearchBar } from "react-native-elements";
import Modal from "react-native-modal";
import Menu from '../../ScreenComponents/Menu/Menu.js';
import BouncingPreloader from 'react-native-bouncing-preloader';
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
// import Footer from '../../ScreenComponents/Footer/Footer.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import Notification from '../../ScreenComponents/Notification/Notification.js'
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Cartstyles.js';
import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Counter from "react-native-counters";


export default class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      isOpen: false,
      starCount: 2.5,
      cartData: '',
      cart: [],
      totalCartPrice: '',
      productData: {},
      productCartData: [],
      vatPercent: 0,
      companyInfo: "",
      totaloriginalprice: 0,
      cartProduct: "",
      removefromcart: false,
      wishlisted: false,
      shippingCharges: 0,
      quantityAdded: 0,
      totalIndPrice: 0,
      // removeprod            : false,
    };
  }

  componentDidMount() {
    const product_ID = this.props.navigation.getParam('product_ID', 'No product_ID');
    const userId = this.props.navigation.getParam('user_ID', 'No user_ID');
    console.log('user_ID-------------------------->', userId);
    console.log('product_ID-------------------------->', product_ID);
    // this.getCartData(userId, product_ID);
    // AsyncStorage.multiGet(['user_id', 'token'])
    //   .then((data) => {
    //     userId = data[0][1],
    //       this.setState({
    //         product_ID: product_ID,
    //         userId: userId,
    //       }, () => {
    //         // console.log('userId', this.state.userId)
    //         this.getCartData(this.state.user_ID, this.state.product_ID);
    //         console.log('user_ID-------------------------->', this.state.userId);
    //       })
    //   })
    // console.log('user_ID-------------------------->', user_ID);
    this.setState({
      product_ID: product_ID,
      userId: userId
    }, () => {
      this.getCartData(this.state.userId, this.state.product_ID);
    })
  }

  getCartData() {
    axios
      .get('/api/Carts/get/cartproductlist/' + this.state.userId)
      .then((response) => {
        // console.log("Item size cart itemsss==>", response.data[0].cartItems[0].quantity);
        this.setState({
          subtotalitems: response.data[0].cartItems.length,
          cartData: response.data[0].cartItems,
          subTotal: response.data.subTotal,
          saving: response.data.saving,
          cartTotal: response.data.cartTotal
        }, () => {
          this.gettotalcount();
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  DeleteItem() {
    const formValues = {
      "user_ID": this.state.userId,
      "cartItem_ID": this.state.cartitemid,
    }
    console.log('formValues----->', formValues);
    axios.patch("/api/carts/remove", formValues)
      .then((response) => {
        this.setState({
          removefromcart: false,
        })
        this.getCartData(this.state.userId, this.state.product_ID);
      })
  }
  DeleteItemfromcart(cartitemid) {
    this.setState({
      removefromcart: true,
      cartitemid: cartitemid,

    })
  }
  addtowishlist = (productid) => {
    const wishValues = {
      "user_ID": this.state.userId,
      "product_ID": productid,
    }
    // console.log("wishValuess==>", wishValues);
    axios.post('/api/wishlist/post', wishValues)
      .then((response) => {
        // console.log(" response wishValuess==>", response.data);
        this.setState({
          wishlisted: true,
        });
        const formValues = {
          "user_ID": this.state.userId,
          "cartItem_ID": productid,
        }
        axios.patch("/api/carts/remove" ,formValues)
        .then((response)=>{
          this.getCartData(this.state.userId, this.state.product_ID);
        })
        .catch((error)=>{
            console.log('error', error);
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
  }
  gettotalcount() {
    let totalcount = 0;
    var resdata = this.state.cartData;
    resdata.filter((value) => {
      totalcount = totalcount + value.productDetail.originalPrice;
    });


    this.setState({
      totaloriginalprice: totalcount,
    })
  }
  UNSAFE_componentWillReceiveProps() {
    const product_ID = this.props.navigation.getParam('product_ID', 'No product_ID');
    const user_ID = this.props.navigation.getParam('user_ID', 'No user_ID');
    this.setState({
      product_ID: product_ID,
      user_ID: user_ID
    }, () => {
      this.getCartData(this.state.userId, this.state.product_ID);
    })
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  toggle() {
    let isOpen = !this.state.isOpen;
    this.setState({
      isOpen
    });
  }

  closeControlPanel = () => {
    this._drawer.close()
  }

  openControlPanel = () => {
    this._drawer.open()
  }
  onChange(product_ID, number, type) {
    console.log(product_ID, number, type) // 1, + or -
    const quantity = parseInt(number);
    // console.log("quantity ==>", quantity)
    // const quantityAdded = quantity+1;
    console.log("quantityAdded ==>", quantity)
    const formValues = {
      "user_ID"       : this.state.userId,
      "product_ID"    : product_ID,
      "quantityAdded" : quantity,
    }
    console.log('for cart on change==>', formValues);
    axios.patch("/api/carts/quantity", formValues)
      .then((response) => {
        this.getCartData(this.state.userId, this.state.product_ID);
        console.log("response ==>", response.data)
        // console.log("response ==>", formValues.quantityAdded)
          this.setState({
            incresecartnum : formValues.quantityAdded
          })
      })
      .catch((error) => {
        console.log('error', error);
      })
      

    // var carqty = {};
    // this.setState({
    //   number: parseInt(number),
    //   plusminustype: type
    // });
  }
  searchUpdated(text) {
    this.setState({ searchText: text });
  }

  render() {
    const { navigate, dispatch, goBack } = this.props.navigation;
    const menu = <Menu navigate={navigate} isOpen={this.state.isOpen} />;
    var totalcountofcart = 0;
    if (this.props.loading) {
      return (
        <Loading />
      );
    } else {
      return (
        <React.Fragment>
          <HeaderBar5
            goBack={goBack}
            headerTitle={'Cart'}
            navigate={navigate}
            toggle={() => this.toggle.bind(this)}
            openControlPanel={() => this.openControlPanel.bind(this)}
          />
          <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View style={styles.formWrapper}>
                <View style={styles.cartdetails}>

                  {
                    this.state.cartData ?
                      this.state.cartData && this.state.cartData.length > 0 ?
                        this.state.cartData.map((item, i) => {
                          console.log("item ==>", item.productDetail);
                          return (

                            <View key={i}>
                              <View key={i} style={styles.proddetails}>
                                <View style={styles.flxdir}>
                                  <View style={styles.flxpd}>
                                   {item.productDetail.productImage.length > 0 ?
                                      <Image
                                      style={styles.imgwdht}
                                      source={{ uri: item.productDetail.productImage[0] }}
                                      />
                                      :
                                      <Image
                                      style={styles.imgwdht}
                                      source={require("../../AppDesigns/currentApp/images/notavailable.jpg")}
                                      />
                                   }
                                   
                                  </View>
                                  <View style={styles.flxmg}>
                                    <Text style={styles.productname}>{item.productDetail.productName}</Text>
                                    <View style={styles.productdets}>
                                      <Icon
                                        name="rupee"
                                        type="font-awesome"
                                        size={11}
                                        color="#666"
                                        iconStyle={styles.iconstyle}
                                      />
                                      <Text style={styles.proddetprice}>{item.productDetail.discountedPrice} {item.productDetail.unit}</Text>
                                    </View>
                                    {/* <Text style={styles.proddetprice}>Select Quantity</Text> */}
                                    <Counter start={item.quantity} min={1}
                                      buttonStyle={{
                                        borderColor: '#80c21c',
                                        borderWidth: 1,
                                        borderRadius: 25,
                                        width: 20,
                                        height: 10
                                      }}
                                      buttonTextStyle={{
                                        color: '#80c21c',
                                      }}
                                      countTextStyle={{
                                        color: '#80c21c',
                                      }}
                                      size={5}
                                      
                                      onChange={this.onChange.bind(this, item.productDetail._id)} />
                                  </View>
                                  <View style={styles.flxmg2}>

                                    <View style={styles.proddeletes}>
                                      <TouchableOpacity style={[styles.flx1, styles.wishlisthrt]} onPress={() => this.addtowishlist(item._id)} >
                                        <Icon size={20} name='heart-o' type='font-awesome' color='#80c21c' style={{ backgroundColor: "red" }} />
                                      </TouchableOpacity>
                                      <Icon
                                        onPress={() => this.DeleteItemfromcart(item._id)}
                                        name="delete"
                                        type="AntDesign"
                                        size={18}
                                        color="#ff4444"
                                        iconStyle={styles.iconstyle}
                                      />

                                    </View>
                                    {
                                      item.productDetail.availableQuantity > 0 ?
                                        <View style={styles.productdetsprice}>
                                          <Icon
                                            name="rupee"
                                            type="font-awesome"
                                            size={16}
                                            color="#666"
                                            iconStyle={styles.iconstyle}
                                          />
                                          <Text id={item._id} value={this.state['quantityAdded|' + item._id]} style={styles.proprice}>
                                            {/* {item.productDetail.discountedPrice * item.size } */}
                                            { item.productDetail.size > 0 ?
                                                  item.productDetail.discountedPrice * item.quantity
                                              :
                                                  item.productDetail.discountedPrice 
                                            } 
                                          </Text>
                                          {/* <Text style={styles.proprice}>1200</Text> */}
                                        </View>
                                        :
                                        <Text style={styles.totaldata}>SOLD OUT</Text>
                                    }
                                  </View>
                                </View>
                              </View>
                            </View>
                          )
                        })
                        :
                        <View style={{ flex: 1, alignItems: 'center', marginTop: '90%' }}>
                        <BouncingPreloader
                            icons={[
                              require("../../AppDesigns/currentApp/images/bellpaper.png"),
                              require("../../AppDesigns/currentApp/images/carrot.png"),
                              require("../../AppDesigns/currentApp/images/mangooo.png"),
                              require("../../AppDesigns/currentApp/images/tomato.png"),
                            ]}
                            leftRotation="-680deg"
                            rightRotation="360deg"
                            speed={2000} />
                      </View>
                      :
                      
                      <View style={{ flex: 1, alignItems: 'center', marginTop: '10%' }}>
                      <Image
                        source={require("../../AppDesigns/currentApp/images/saleimage.png")}
                      />
                    </View>
                  }

                  {
                    this.state.cartData && this.state.cartData.length > 0 ?
                      <View style={styles.totaldetails}>
                        <View style={styles.flxdata}>
                          <View style={{ flex: 0.7 }}>
                            <Text style={styles.totaldata}>Subtotal ({this.state.subtotalitems} Item) </Text>
                          </View>
                          <View style={{ flex: 0.3 }}>
                            <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                              <Icon
                                name="rupee"
                                type="font-awesome"
                                size={15}
                                color="#666"
                                iconStyle={styles.iconstyle}
                              />
                              <Text style={styles.totalpriceincart}>&nbsp;&nbsp;{this.state.totaloriginalprice}</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.totalsubtxt}>Part of your order qualify for Free Delivery </Text>
                        </View>
                        <View style={styles.flxdata}>
                          <View style={{ flex: 0.2 }}>
                            <Image
                              source={require("../../AppDesigns/currentApp/images/Logo.png")}
                              style={styles.cartlogoimg}
                            />
                          </View>
                          <View style={{ flex: 0.7 }}>
                            <View >
                              <Text style={styles.purchasep}>100% Purchase Protection </Text>
                              <Text style={styles.freshnsecuretxt}>Fresh Product | Secure Payment </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.margTp20}>
                          <TouchableOpacity >
                            <Button
                              onPress={() => this.props.navigation.navigate('AddressDefaultComp', { userID: this.state.userId })}
                              title={"PROCEED TO CHECKOUT"}
                              buttonStyle={styles.button1}
                              containerStyle={styles.buttonContainer1}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      :
                      null
                  }

                </View>
              </View>
            </ScrollView>

            <Footer />
            <Modal isVisible={this.state.removefromcart}
              onBackdropPress={() => this.setState({ removefromcart: false })}
              coverScreen={true}
              hideModalContentWhileAnimating={true}
              style={{ paddingHorizontal: '5%', zIndex: 999 }}
              animationOutTiming={500}>
              <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                <View style={{ justifyContent: 'center', backgroundColor: "transparent", width: 60, height: 60, borderRadius: 30, overflow: 'hidden' }}>
                  <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
                </View>
                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 15, textAlign: 'center', marginTop: 20 }}>
                  Are you sure you want to remove this from cart?
              </Text>
                <View style={styles.cancelbtn}>
                  <View style={styles.cancelvwbtn}>
                    <TouchableOpacity>
                      <Button
                        onPress={() => this.setState({ removefromcart: false })}
                        titleStyle={styles.buttonText}
                        title="NO"
                        buttonStyle={styles.buttonRED}
                        containerStyle={styles.buttonContainer2}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.ordervwbtn}>
                    <TouchableOpacity>
                      <Button
                        onPress={() => this.DeleteItem()}
                        titleStyle={styles.buttonText1}
                        title="Yes"
                        buttonStyle={styles.buttonGreen}
                        containerStyle={styles.buttonContainer2}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal isVisible={this.state.wishlisted}
              onBackdropPress={() => this.setState({ wishlisted: false })}
              coverScreen={true}
              hideModalContentWhileAnimating={true}
              style={{ paddingHorizontal: '5%', zIndex: 999 }}
              animationOutTiming={500}>
              <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                <View style={{ justifyContent: 'center', backgroundColor: "transparent", width: 60, height: 60, borderRadius: 30, overflow: 'hidden' }}>
                  <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
                </View>
                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 15, textAlign: 'center', marginTop: 20 }}>
                  Product is added to wishlist.
                </Text>
                <View style={styles.cancelbtn}>
                  <View style={styles.cancelvwbtn}>
                    <TouchableOpacity>
                    <Button
                        onPress={() => this.setState({ wishlisted: false })}
                        titleStyle={styles.buttonText1}
                        title="OK"
                        buttonStyle={styles.buttonGreen}
                        containerStyle={styles.buttonContainer2}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            {/* <Modal isVisible={this.state.wishlisted}
              onBackdropPress={() => this.setState({ wishlisted: false })}
              coverScreen={true}
              hideModalContentWhileAnimating={true}
              style={{ paddingHorizontal: '5%', zIndex: 999 }}
              animationOutTiming={500}>
              <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                <View style={{ justifyContent: 'center', }}>
                  <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
                </View>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                  Product is added to wishlist.
                </Text>
                <View style={styles.yesmodalbtn}>
                  <View style={styles.ordervwbtn}>
                    <TouchableOpacity>
                      <Button
                        onPress={() => this.setState({ wishlisted: false })}
                        titleStyle={styles.buttonText1}
                        title="OK"
                        buttonStyle={styles.buttonGreen}
                        containerStyle={styles.buttonContainer2}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal> */}
          </View>
        </React.Fragment>
      );
    }
  }
}



