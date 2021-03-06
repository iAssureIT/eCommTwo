
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,

} from 'react-native';
import BouncingPreloader from 'react-native-bouncing-preloader';
import { Dropdown } from 'react-native-material-dropdown';
import { Icon, Button } from "react-native-elements";
import Modal from "react-native-modal";
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar3 from '../../ScreenComponents/HeaderBar3/HeaderBar3.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import Notification from '../../ScreenComponents/Notification/Notification.js'
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Categoriesstyles.js';
import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import axios from 'axios';
export default class AllExclusiveProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      isOpen: false,
      starCount: 2.5,
      productImage: [],
      ProductsDetails: '',
      subCategory_ID: '',
      category_ID: '',
      addtocart: false,
      wishlisted: false,
      alreadyincarts: false,
      alreadyinwishlist: false,

    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }
  componentDidMount() { 
    this.allExclusiveproducts();
    const category_ID = this.props.navigation.getParam('category_ID', 'No category_ID');
    const subCategory_ID = this.props.navigation.getParam('subCategory_ID', 'No subCategory_ID');
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
  allExclusiveproducts(){
    var productType2 = 'exclusive';
    axios.get("/api/products/get/listbytype/"+productType2)
      .then((response)=>{
    // console.log('response.data ===> ', response.data);
    for (var i = 0; i < response.data.length; i++) {
      var availableSizes = [];
      if (response.data[i].size) {
        // console.log("availableSizes NExt==>",response.data[i]);
        availableSizes.push(
          {
            "productSize": response.data[i].size * 1,
            "packSize": 1,
          },
          {
            "productSize": response.data[i].size * 2,
            "packSize": 2,
          },
          {
            "productSize": response.data[i].size * 4,
            "packSize": 4,
          },
        )
        // console.log("availableSizes==>",availableSizes);
        response.data[i].availableSizes = availableSizes;
      }
    }

        this.setState({
          ExclusivedProducts : response.data
        })
      })
      .catch((error)=>{})
  }
  handleTypeChange = (value) => {
    console.log('PackSize ===> ', value);
    this.setState({
      packsizes: value,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.allExclusiveproducts();
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  addtocart(productid) {
    // console.log("productid addCart =========>", productid);
    const formValues = {
      "user_ID": this.state.userId,
      "product_ID": productid,
      // "quantity": this.state.packsizes === "" || 0 ? 1 :this.state.packsizes,
      "quantity": this.state.packsizes === undefined || "" ? 1 :this.state.packsizes,
    }
    axios
      .post('/api/Carts/post', formValues)
      .then((response) => {
        this.setState({
          addtocart: true,
        });
      })
      .catch((error) => {
        this.setState({ alreadyincarts: true })
        console.log('error', error);
      })
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
  addtowishlist = (productid) => {
    const wishValues = {
      "user_ID": this.state.userId,
      "product_ID": productid,
    }
    axios.post('/api/wishlist/post', wishValues)
      .then((response) => {
        this.setState({
          wishlisted: true,
        });
      })
      .catch((error) => {
        this.setState({ alreadyinwishlist: true })
        console.log('error', error);
      })
  }

  openControlPanel = () => {
    this._drawer.open()
  }


  searchUpdated(text) {
    this.setState({ searchText: text });
  }



  render() {
    const { navigate, goBack } = this.props.navigation;
    if (this.props.loading) {
      return (
        <Loading />
      );
    } else {
      return (
        <React.Fragment>
        <HeaderBar3
          goBack={goBack}
          headerTitle={'Exclusive Products'}
          navigate={navigate}
          toggle={() => this.toggle.bind(this)}
          openControlPanel={() => this.openControlPanel.bind(this)}
        />
        <View style={styles.addsuperparent}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
            <View style={styles.formWrapper}>
              
              <View>
                <View style={styles.proddets}>
                  {this.state.ExclusivedProducts ? 
                    this.state.ExclusivedProducts.length > 0 ?
                    this.state.ExclusivedProducts.map((item, i) => {
                      // console.log("item.availableSizes =========>", item.availableSizes);
                      var availablessiz = []
                      availablessiz = item.availableSizes.map((a, i) => { return { label: a.packSize + " Pack", value: a.packSize } })
                      const packsizes = item.availableSizes[0].packSize
                      return (
                        <View key={i} style={styles.width160}>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('SubCatCompView', { productID: item._id })}>
                            <View style={styles.flx5}>
                              <View style={styles.flx1}>
                                {item.productImage.length > 0 ?
                                  <Image
                                    source={{ uri: item.productImage[0] }}
                                    style={styles.subcatimg}
                                  />
                                  :
                                  <Image
                                    source={require("../../AppDesigns/currentApp/images/notavailable.jpg")}
                                    style={styles.subcatimg}
                                  />
                                }
                                <TouchableOpacity style={[styles.flx1, styles.wishlisthrt]} onPress={() => this.addtowishlist(item._id)} >
                                  <Icon size={20} name='heart-o' type='font-awesome' color='#80c21c' style={{ backgroundColor: "red" }} />
                                </TouchableOpacity>
                                {
                                  item.discountPercent > 0 ?
                                    <Text style={styles.peroff}> {item.discountPercent}% OFF</Text>
                                    :
                                    null
                                }

                              </View>
                              <View style={[styles.flx1, styles.protxt]}>

                                <Text numberOfLines={1} style={[styles.nameprod, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>{item.productName}</Text>
                                <Text numberOfLines={1} style={[styles.shortDescription]}>{item.shortDescription}</Text>
                              </View>
                              <View style={[styles.flx1, styles.prdet]}>
                                <View style={[styles.flxdir]}>
                                  <Icon
                                    name="rupee"
                                    type="font-awesome"
                                    size={12}
                                    color="#333"
                                    iconStyle={{ marginTop: 5, marginRight: 3 }}
                                  />
                                  <Text style={styles.ogprice}>{item.originalPrice} - <Text style={styles.packofnos}>Pack Of {item.size} {item.unit}</Text> </Text>
                                </View>
                              </View>
                              {/* <View style={[styles.flx1,styles.addtocartbtn]}>
                              <Button
                                onPress={() => this.addtocart(item._id)}
                                titleStyle={styles.buttonText1}
                                title="Add To Cart"
                                buttonStyle={styles.buttonGreen}
                                containerStyle={styles.buttonContainer2}
                                icon={
                                  <Icon
                                    name="shopping-cart"
                                    type="feather"
                                    size={17}
                                    color="#fff"
                                    iconStyle={styles.mg10}
                                  />
                                }
                              />
                              </View>  */}
                              <View style={styles.addtocartbtn}>
                                <View style={styles.addbtn}>
                                  <View style={[styles.inputWrapper]}>
                                    <View style={styles.inputImgWrapper}></View>
                                    <View style={styles.inputTextWrapper}>
                                      {/* {console.log("item.availableSizes in data=>",item.availableSizes)} */}
                                      <Dropdown
                                        // placeholder         = {availablessiz}
                                        onChangeText={(value) => this.handleTypeChange(value)}
                                        data={availablessiz}
                                        value={packsizes}
                                        containerStyle={styles.ddContainer}
                                        dropdownOffset={{ top: 0, left: 0, bottom: 0 }}
                                        itemTextStyle={styles.ddItemText}
                                        inputContainerStyle={{ borderBottomColor: 'transparent', padding: 0 }}
                                      />
                                    </View>
                                  </View>
                                </View>

                                <View style={styles.sizedrpbtn}>
                                  <Button
                                    onPress={() => this.addtocart(item._id)}
                                    titleStyle={styles.modalText}
                                    title="Add"
                                    buttonStyle={styles.buttonGreen}
                                    containerStyle={styles.buttonContainer2}
                                  />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )
                    })
                    :
                    <View style={{ flex: 1, alignItems: 'center', marginTop: '10%' }}>
                      <Image
                        source={require("../../AppDesigns/currentApp/images/noproduct.jpeg")}
                      />
                    </View>
                      :
                      <View style={{ flex: 1, alignItems: 'center', marginTop: '100%' }}>
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
                  }
                </View>
              </View>
            </View>
          </ScrollView>
          <Modal isVisible={this.state.addtocart}
            onBackdropPress={() => this.setState({ addtocart: false })}
            coverScreen={true}
            hideModalContentWhileAnimating={true}
            style={{ paddingHorizontal: '5%', zIndex: 999 }}
            animationOutTiming={500}>
            <View style={styles.modalmainvw}>
              <View style={{ justifyContent: 'center', }}>
                <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
              </View>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                Product is added to cart.
                  </Text>

              <View style={styles.yesmodalbtn}>
                <Button
                  onPress={() => this.setState({ addtocart: false })}
                  titleStyle={styles.modalText}
                  title="OK"
                  buttonStyle={styles.modalGreen1}
                  containerStyle={styles.buttonContainer1}
                />
              </View>
            </View>
          </Modal>
          <Modal isVisible={this.state.wishlisted}
            onBackdropPress={() => this.setState({ wishlisted: false })}
            coverScreen={true}
            hideModalContentWhileAnimating={true}
            style={{ paddingHorizontal: '5%', zIndex: 999 }}
            animationOutTiming={500}>
            <View style={styles.modalmainvw}>
              <View style={{ justifyContent: 'center', }}>
                <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
              </View>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20, }}>
                Product is added to wishlist.
              </Text>
              <View style={styles.yesmodalbtn}>
                <Button
                  onPress={() => this.setState({ wishlisted: false })}
                  titleStyle={styles.modalText}
                  title="OK"
                  buttonStyle={styles.modalGreen1}
                  containerStyle={styles.buttonContainer1}
                />
              </View>
            </View>
          </Modal>
          <Modal isVisible={this.state.alreadyinwishlist}
            onBackdropPress={() => this.setState({ alreadyinwishlist: false })}
            coverScreen={true}
            hideModalContentWhileAnimating={true}
            style={{ zIndex: 999 }}
            animationOutTiming={500}>
            <View style={styles.modalmainvw}>
              <View style={{ justifyContent: 'center', }}>
                <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
              </View>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20, }}>
                Product is already to wishlist.
                </Text>
              <View style={styles.yesmodalbtn}>
                <Button
                  onPress={() => this.setState({ alreadyinwishlist: false })}
                  titleStyle={styles.modalText}
                  title="OK"
                  buttonStyle={styles.modalGreen1}
                  containerStyle={styles.buttonContainer1}
                />
              </View>
            </View>
          </Modal>
          <Modal isVisible={this.state.alreadyincarts}
            onBackdropPress={() => this.setState({ alreadyincarts: false })}
            coverScreen={true}
            hideModalContentWhileAnimating={true}
            style={{ zIndex: 999 }}
            animationOutTiming={500}>
            <View style={styles.modalmainvw}>
              <View style={{ justifyContent: 'center', }}>
                <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
              </View>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20, }}>
                Product is already to Cart.
              </Text>
              <View style={styles.yesmodalbtn}>
                <Button
                  onPress={() => this.setState({ alreadyincarts: false })}
                  titleStyle={styles.modalText}
                  title="OK"
                  buttonStyle={styles.modalGreen1}
                  containerStyle={styles.buttonContainer1}
                />
              </View>
            </View>
          </Modal>
          <Footer />
        </View>
      </React.Fragment>
      );
    }
  }
}



