
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Header, Button, Icon, SearchBar } from "react-native-elements";
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Categoriesstyles.js';
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import Carousel from 'react-native-banner-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Counter from "react-native-counters";

export default class SubCatCompView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      isOpen: false,
      starCount: 2.5,
      productID: '',
      countofprod: '',
      productName: '',
      productUrl: '',
      discountedPrice: '',
      originalPrice: '',
      color: '',
      discountPercent: '',
      productDetails: '',
      featureList: '',
      productImage: [],
    };
  }

  componentDidMount() {
    const productID = this.props.navigation.getParam('productID', 'No productID');
    console.log('productID-------------------------->', productID);
    this.setState({
      productID: productID
    }, () => {
      this.getProductsView(this.state.productID);
    })

    AsyncStorage.multiGet(['user_id', 'token'])
      .then((data) => {
        userId = data[0][1],
          this.setState({
            userId: userId,
          }, () => {
            console.log('userId', this.state.userId)
          })
      })
  }

  getProductsView(productID) {
    console.log(" ProductsView =========>", productID);

    axios.get("/api/Products/get/one/" + productID)
      .then((response) => {
        console.log("response.data ProductsView =========>", response.data);
        this.setState({
          productdata: response.data,
          brand: response.data.brand,
          productName: response.data.productName,
          shortDescription: response.data.shortDescription,
          productUrl: response.data.productUrl,
          discountedPrice: response.data.discountedPrice,
          originalPrice: response.data.originalPrice,
          color: response.data.color,
          size: response.data.size,
          unit: response.data.unit,
          discountPercent: response.data.discountPercent,
          productDetails: response.data.productDetails,
          featureList: response.data.featureList,
          productImage: response.data.productImage
        })
      })
      .catch((error) => {
        // console.log('error', error);
      })
  }
  onChange(number, type) {
    // console.log(id, number, type) // 1, + or -
    console.log("number ==>", number)
    // console.log("type ==>", type)
    var carqty = {};
    this.setState({
      number: parseInt(number),
      plusminustype: type
    });
  }
  handlePressAddCart() {
    const formValues = {
      "user_ID": this.state.userId,
      "product_ID": this.state.productID,
      "quantity": this.state.number,
    }
            console.log("formValues addCart =========>", formValues);
    axios
      .post('/api/Carts/post', formValues)
      .then((response) => {
        // console.log("formValues addCart =========>", formValues);
        // console.log("this.props.navigation------------>", this.props.navigation);
        this.props.navigation.navigate('CartComponent', { user_ID: this.state.userId, product_ID: this.state.productID });
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  componentWillReceiveProps(nextProps) {
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

  renderPage(item, index) {
    return (
      <View key={index}>
        <ImageBackground
          style={styles.prodimg}
          source={{ uri: item.productImage }}
          resizeMode={"contain"}
        >
        </ImageBackground>
      </View>
    );
  }

  searchUpdated(text) {
    this.setState({ searchText: text });
  }


  render() {
    // var productImages = JSON.stringify(this.state.productImage);
    // console.log("this.state.productImage RENder------------>", productImages);
    const { navigate, dispatch, goBack } = this.props.navigation;
    return (
      <React.Fragment>
        <HeaderBar5
          goBack={goBack}
          navigate={navigate}
          headerTitle={'Product View'}
          toggle={() => this.toggle.bind(this)}
          openControlPanel={() => this.openControlPanel.bind(this)}
        />
        <View style={styles.prodviewcatsuperparent}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
            <View style={styles.formWrapper}>

              <Text numberOfLines={1} style={styles.produrl}></Text>
              <View style={styles.imgvw}>
                {/* <View style={styles.flxmgstart}>
                  <View style={styles.star}>
                    <View style={styles.staricn}>
                      <Icon
                        name="star"
                        type="font-awesome"
                        size={15}
                        color="#fff"
                        iconStyle={styles.icnstar}
                      />
                      <Text numberOfLines={1} style={styles.prodqty}>4.5</Text>
                    </View>
                  </View>
                </View> */}

                {this.state.productImage.length > 0 ?
                            <Image
                              source={{ uri: this.state.productImage[0]}}
                              // source={require("../../AppDesigns/currentApp/images/saleimage.png")}
                              style={styles.saleimg}
                            />
                          :
                            <Image
                              source={require("../../AppDesigns/currentApp/images/notavailable.jpg")}
                              style={styles.saleimg}
                            />
                        }
                <View style={styles.prodnameview}>
                  <Text numberOfLines={1} style={styles.brandname}>{this.state.brand}</Text>
                  <Text numberOfLines={1} style={styles.productname}>{this.state.productName}</Text>
                  <Text numberOfLines={1} style={styles.shortDescription}>{this.state.shortDescription}</Text>
                </View>
                <View style={styles.flxdirview}>
                  <Icon
                    name="rupee"
                    type="font-awesome"
                    size={16}
                    color="#333"
                    iconStyle={styles.rupeeicn}
                  />
                  {/* <Text style={styles.rupeetxt}> {this.state.discountedPrice}</Text> */}
                  <Text style={styles.proddetprice}>{this.state.discountedPrice} - <Text style={styles.packofnos}>Pack Of {this.state.size}  {this.state.unit}</Text></Text>
                </View>
              </View>
              <View style={styles.orderstatus}>
                <View style={styles.kgs}>
                  <Text style={styles.orderstatustxt}>1 kg</Text>
                </View>
                <View style={styles.qtys}>
                  {/* <Counter start={1}
                    buttonStyle={{
                      borderColor: '#80c21c',
                      borderWidth: 1,
                    }}
                    buttonTextStyle={{
                      color: '#80c21c',

                    }}
                    countTextStyle={{
                      color: '#80c21c',
                    }}
                    onChange={this.onChange.bind(this)} /> */}
                    <Counter start={1} min={1}
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
                        value={this.state.countofprod}
                        onChange={this.onChange.bind(this)} />
                </View>
              </View>
              <View style={styles.detailclr}>
                <Text style={styles.detailcolor}>Details: {this.state.color}</Text>
                {
                  this.state.productDetails == "-" ?
                    <Text style={styles.detaildetailstxt}>"Product details not available"</Text>
                    :
                    <Text style={styles.detaildetailstxt}>{this.state.productDetails}</Text>
                }
                <View>
                  <TouchableOpacity onPress={() => this.handlePressAddCart()}>
                    <Button
                      onPress={() => this.handlePressAddCart()}
                      title={"ADD TO CART"}
                      buttonStyle={styles.button1}
                      containerStyle={styles.buttonContainer1}
                      icon={
                        <Icon
                          name="shopping-cart"
                          type="feather"
                          size={25}
                          color="#fff"
                          iconStyle={styles.mgrt10}
                        />
                      }
                    />
                  </TouchableOpacity>
                </View>
                
              </View>
              
              {/* <View style={styles.mgbtm15}>
                            <Text style={styles.proddetails}>Details</Text>
                            <Text style={styles.productDetails}>{this.state.productDetails}</Text>
                        </View>
                        <View style={styles.feature}></View>
                        <View>
                            <View style={styles.flxdir}>
                                <Icon
                                    name="format-list-checks"
                                    type="material-community"
                                    size={25}
                                    color="#c10000"
                                    iconStyle={styles.mgrttp}
                                    />
                                <Text style={styles.abtitm}>About this item</Text>
                            </View>
                            <View style={styles.flxdir}>
                                <Text style={styles.featuretxt}>{'\u2022'}</Text>
                                <Text style={styles.featurelist}>{this.state.featureList}</Text>
                            </View>
                        </View>
                        <View style={styles.feature}></View> */}
            </View>
          </ScrollView>
        </View>
        <Footer />
      </React.Fragment>
    );

  }
}



