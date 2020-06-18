
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
  Picker,
  Keyboard

} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer';
import { TextField } from 'react-native-material-textfield';
import { Header, Button, Icon, SearchBar, CheckBox } from "react-native-elements";
import SideMenu from 'react-native-side-menu';
import Modal from "react-native-modal";
import axios from "axios";
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
// import Footer from '../../ScreenComponents/Footer/Footer.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import Notification from '../../ScreenComponents/Notification/Notification.js'
// import styles from './Addressstyles.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/OrderSummaryStyles.js';
import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import ConfirmOrderComponent from '../ConfirmOrderComponent/ConfirmOrderComponent.js';
const window = Dimensions.get('window');

export default class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      isOpen: false,
      starCount: 2.5,

    };
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  displayValidationError = (errorField) => {
    let error = null;
    if (this.state[errorField]) {
      error = <View style={{ width: '100%' }}>
        <Text style={{ color: '#dc3545' }}>{this.state[errorField][0]}</Text>
      </View>;
    }
    return error;
  }

  toggle() {
    let isOpen = !this.state.isOpen;
    this.setState({
      isOpen
    });
  }
  componentDidMount() {
    const product_ID = this.props.navigation.getParam('product_ID', 'No product_ID');
    const user_id = this.props.navigation.getParam('user_id', 'No user_ID');
    const adddata = this.props.navigation.getParam('adddata', 'No adddata');
    this.setState({
      product_ID: product_ID,
      user_ID: user_id,
      adddata: adddata,
      adddataaddType: adddata.addType,
      adddataname: adddata.name,
      adddataaddressLine1: adddata.addressLine1,
      adddataaddressLine2: adddata.addressLine2,
      adddatacity: adddata.city,
      adddatacountry: adddata.country,
      adddatapincode: adddata.pincode,
      adddatamobileNumber: adddata.mobileNumber,
      adddatastate: adddata.state,
    }, () => {
      this.getCartData(this.state.user_ID, this.state.product_ID);
    })
  }

  getCartData() {
    axios
      .get('/api/Carts/get/cartproductlist/' + userId)
      .then((response) => {
        console.log("Item size==>", response.data[0].cartItems.length);
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
  gettotalcount() {
    let totalcount = 0
    var resdata = this.state.cartData
    // console.log('cartData resdata------------>', resdata);
    resdata.filter((value) => {
      totalcount = totalcount + value.productDetail.originalPrice;
    });


    this.setState({
      totaloriginalprice: totalcount,
    })
  }
  closeControlPanel = () => {
    this._drawer.close()
  }

  openControlPanel = () => {
    this._drawer.open()
  }

  handleZipChange(value) {
    let x = value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,4})/);
    let y = !x[2] ? x[1] : x[1] + '-' + x[2];
    this.setState({
      zipcode: y,
    });
  }

  handleDelete = (id) => {
    Alert.alert("", "Are you sure you want to delete ?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          this.deleteCompetitor(id);
        }
      },
    ]);
  };

  render() {
    const { navigate, goBack } = this.props.navigation;
    const menu = <Menu navigate={navigate} isOpen={this.state.isOpen} />;

    if (this.props.loading) {
      return (
        <Loading />
      );
    } else {
      return (
        <React.Fragment>
          <HeaderBar5
            goBack={goBack}
            headerTitle={'Order Summary'}
            navigate={navigate}
            toggle={() => this.toggle.bind(this)}
            openControlPanel={() => this.openControlPanel.bind(this)}
          />
          <View style={styles.addsuperparent}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View style={styles.padhr15}>
                <View style={styles.addcmporder}>
                  <View style={styles.orderaddchkbx}>
                    <Text style={styles.addname}>{this.state.adddataname} </Text>
                    <Text style={styles.addoffice}> {this.state.adddataaddType} </Text>
                  </View>
                  <View style={styles.orderpadhr18}>
                    <Text style={styles.address}> {this.state.adddataaddressLine1}</Text>
                    <View style={styles.mobflx}>
                      <Text style={styles.mobileno}>Mobile:</Text>
                      <Text style={styles.mobilenum}>{this.state.adddatamobileNumber}</Text>
                    </View>
                    <View style={styles.confirmbtn}>
                      <TouchableOpacity >
                        <Button
                          onPress={() => this.props.navigation.navigate('AddressDefaultComp', this.state.user_ID)}
                          title={"Change or Add Address"}
                          buttonStyle={styles.button1}
                          containerStyle={styles.buttonContainer1}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.formWrapper}>
                  <View style={styles.cartdetails}>
                    {
                      this.state.cartData && this.state.cartData.length > 0 ?
                        this.state.cartData.map((item, i) => {
                          return (
                            <View key={i} style={styles.proddetails}>
                              <View style={styles.flxdir}>
                                <View style={styles.flxpd}>
                                  <Image
                                    style={styles.imgwdht}
                                    source={{ uri: item.productDetail.productImage[0] }}
                                  />
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
                                    <Text style={styles.proddetprice}>{item.productDetail.discountedPrice}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          )
                        })
                        :
                        <View style={{ flex: 1, alignItems: 'center', marginTop: '10%' }}>
                          <Image
                            source={require("../../AppDesigns/currentApp/images/noproduct.jpeg")}
                          />
                        </View>
                    }
                    <Text style={styles.totaldata}>Pricing Details </Text>
                    <View style={styles.totaldetails}>
                      <View style={styles.flxdata}>
                        <View style={styles.flx7}>
                          <Text style={styles.totaldata}>Total ({this.state.subtotalitems} Item(s)) </Text>
                        </View>
                        <View style={styles.flx3}>
                          <View style={styles.endrow}>
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
                      <View style={styles.orderbrdr}>
                        <View style={styles.flx7}>
                          <Text style={styles.totaldata}>Delivary </Text>
                        </View>
                        <View style={styles.flx3}>
                          <View style={styles.endrow}>
                            <Text style={styles.free}>&nbsp;&nbsp;Free</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.amountpay}>
                        <View style={styles.flx7}>
                          <Text style={styles.totaldata}>Amount Payable </Text>
                        </View>
                        <View style={styles.flx3}>
                          <View style={styles.endrow}>
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
                      <View style={styles.margTp20}>
                        <TouchableOpacity >
                          <Button
                            onPress={() => this.props.navigation.navigate('PaymentMethod', { cartdata: this.state.cartData, adddata: this.state.adddata, userID: this.state.user_ID })}
                            title={"PROCEED TO BUY"}
                            buttonStyle={styles.button1}
                            containerStyle={styles.buttonContainer1}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1, marginBottom: 30 }}>
                        <Text style={styles.securetxt}>Safe & Secure Payments | 100% Authentic Products</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <Modal isVisible={this.state.removewishlistmodal}
                onBackdropPress={() => this.setState({ removewishlistmodal: false })}
                coverScreen={true}
                hideModalContentWhileAnimating={true}
                style={{ paddingHorizontal: '5%', zIndex: 999 }}
                animationOutTiming={500}>
                <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                  <View style={{ justifyContent: 'center', }}>
                    <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
                  </View>
                  <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                    Product is removed from wishlist.
                </Text>
                  <View style={styles.yesmodalbtn}>
                    <View style={styles.ordervwbtn}>
                      <TouchableOpacity>
                        <Button
                          onPress={() => this.setState({ removewishlistmodal: false })}
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
            </ScrollView>
            <Footer />
          </View>
        </React.Fragment>
      );
    }
  }
}
