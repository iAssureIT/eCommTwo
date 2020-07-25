
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Header, Button, Icon, SearchBar } from "react-native-elements";

import Modal from "react-native-modal";
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import Notification from '../../ScreenComponents/Notification/Notification.js';
import axios from 'axios';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/PaymentMethodStyles.js';
import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import { RadioButton } from 'react-native-paper';

export default class PaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'first',
      inputFocusColor: colors.textLight,
      isOpen: false,
      paymentmod: false,
    };
  }

  componentWillReceiveProps(nextProps) {
  }
  componentDidMount() {
    const cartdata = this.props.navigation.getParam('cartdata', 'No product_ID');
    const userID = this.props.navigation.getParam('userID', 'No userID');
    const adddata = this.props.navigation.getParam('adddata', 'No adddata');
    const totalamountpay = this.props.navigation.getParam('totalamountpay', 'No totalamountpay');
    // console.log('cartdata-------------------------->', cartdata);
    // console.log('user_ID-------------------------->', userID);
    // console.log('adddata-------------------------->', totalamountpay);
    this.setState({
      cartdata: cartdata,
      user_ID: userID,
      adddata: adddata,
      totalamountpay: totalamountpay,
    }, () => {
    })
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
  continuepage(id) {
    var cartItems = this.state.cartdata.map((a, i) => {
      console.log("a item for selling==>", a);
      return {
        "product_ID"      : a.productDetail._id,
        "productName"     : a.productDetail.productName,
        "discountPercent" : a.productDetail.discountPercent,
        "discountedPrice" : a.productDetail.discountedPrice,
        "originalPrice"   : a.productDetail.originalPrice,
        "color"           : a.productDetail.color,
        "size"            : a.productDetail.size,
        "currency"        : a.productDetail.currency,
        "quantity"        : a.quantity,
        "subTotal"        : a.subTotal,
        "saving"          : a.saving,
        "productImage"    : a.productDetail.productImage,
        "section_ID"      : a.productDetail.section_ID,
        "section"         : a.productDetail.section,
        "category_ID"     : a.productDetail.category_ID,
        "category"        : a.productDetail.category,
        "subCategory_ID"  : a.productDetail.subCategory_ID,
        "subCategory"     : a.productDetail.subCategory,
        "vendor_ID"       : a.productDetail.vendor_ID,
      
      }
    })
    var deliveryAddress = {
      "name"            : this.state.adddata.name,
      "addressLine1"    : this.state.adddata.addressLine1,
      "addressLine2"    : this.state.adddata.addressLine2,
      "pincode"         : this.state.adddata.pincode,
      "city"            : this.state.adddata.city,
      "state"           : this.state.adddata.state,
      "mobileNumber"    : this.state.adddata.mobileNumber,
      "district"        : this.state.adddata.district,
      "country"         : this.state.adddata.country,
      "addType"         : this.state.adddata.addType
    }
    console.log("cartItems==>", cartItems);
    var orderData = {
      user_ID     : this.state.user_ID,
      cartItems   : cartItems,
      total       : this.state.totalamountpay,
      cartTotal   : this.state.cartdata[0].cartTotal,
      discount    : this.state.cartdata[0].discount,
      cartQuantity: this.state.cartdata[0].cartQuantity,
      deliveryAddress: deliveryAddress,
      paymentMethod  : "Cash on Delivary",
    }
    console.log("orderData==>", orderData);
    axios.post('/api/orders/post', orderData)
      .then((result) => {
        this.setState({ paymentmod: true });
        this.props.navigation.navigate('Dashboard')
      })
      .catch((error) => {
        console.log(error);
      })
  }



  searchUpdated(text) {
    this.setState({ searchText: text });
  }

  render() {
    const { checked } = this.state;
    const { navigate, dispatch, goBack } = this.props.navigation;
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
            navigate={navigate}
            headerTitle={"Payment Methods"}
            toggle={() => this.toggle.bind(this)}
            openControlPanel={() => this.openControlPanel.bind(this)}
          />
          <View style={styles.superparent}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View style={styles.formWrapper}>
                <View style={styles.parent}>
                  <View style={styles.vwwishlist}>
                    <Image
                      style={styles.imgwdht}
                      source={require("../../AppDesigns/currentApp/images/paymentmethod.png")}
                    />
                  </View>
                  <View style={styles.orderbrdr}>
                    <View style={styles.flx3}>
                      <RadioButton
                        style={styles.radiobtn}
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ checked: 'first' }); }}
                      />
                      <Text style={styles.free}>Cash on Delivary</Text>
                    </View>
                  </View>
                  <View style={styles.orderbrdr}>
                    <View style={styles.flx3}>
                      <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ checked: 'second' }); }}
                      />
                      <Text style={styles.free}>Credit/Debit Card</Text>
                    </View>
                  </View>
                  <View style={styles.orderbrdr}>
                    <View style={styles.flx3}>
                      <RadioButton
                        value="third"
                        status={checked === 'third' ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ checked: 'third' }); }}
                      />
                      <Text style={styles.free}>Net Banking</Text>
                    </View>
                  </View>
                  <View style={styles.margTp20}>
                    <TouchableOpacity >
                      <Button
                        onPress={() => this.continuepage()}
                        title={"CONFIRM ORDER"}
                        buttonStyle={styles.button1}
                        containerStyle={styles.buttonContainer1}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Modal isVisible={this.state.paymentmod}
                onBackdropPress={() => this.setState({ paymentmod: false })}
                coverScreen={true}
                hideModalContentWhileAnimating={true}
                style={{ paddingHorizontal: '5%', zIndex: 999 }}
                animationOutTiming={500}>
                <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                  <View style={{ justifyContent: 'center', }}>
                    <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
                  </View>
                  <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                    Your order is confirmed.Thank you for shopping with us.
                  </Text>
                  <View style={styles.yesmodalbtn}>
                    <View style={styles.ordervwbtn}>
                      <TouchableOpacity>
                        <Button
                          onPress={() => this.setState({ paymentmod: false })}
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



