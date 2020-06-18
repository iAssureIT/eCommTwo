
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

import Drawer from 'react-native-drawer';
import { Header, Button, Icon, SearchBar } from "react-native-elements";
import SideMenu from 'react-native-side-menu';
import Modal from "react-native-modal";
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar3 from '../../ScreenComponents/HeaderBar3/HeaderBar3.js';
import Footer from '../../ScreenComponents/Footer/Footer.js';
import Notification from '../../ScreenComponents/Notification/Notification.js'
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Categoriesstyles.js';
import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import axios from 'axios';
export default class SubCategoriesComp extends React.Component {
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
      wishlisted: false


    };

  }
  componentDidMount() {
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
    axios.get("/api/Products/get/list/" + category_ID + '/' + subCategory_ID)
      .then((response) => {
        console.log("ProductsDetails =========>", response.data);
        this.setState({
          ProductsDetails: response.data,

        })
      })
      .catch((error) => {
      })
    this.setState({
      category_ID: category_ID,
      subCategory_ID: subCategory_ID
    }, () => {
      this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.getProductsDetails(this.state.category_ID, this.state.subCategory_ID);
      })
    })

  }

  getProductsDetails() {
    axios.get("/api/Products/get/list/" + this.state.category_ID + '/' + this.state.subCategory_ID)
      .then((response) => {
        console.log("ProductsDetails =========>", response.data);
        this.setState({
          ProductsDetails: response.data,

        })
      })
      .catch((error) => {
      })
  }
  componentWillReceiveProps(nextProps) {
    this.getProductsDetails(this.state.category_ID, this.state.subCategory_ID);
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  addtocart(productid) {
    console.log("productid addCart =========>", productid);
    const formValues = {
      "user_ID": this.state.userId,
      "product_ID": productid,
      "quantity": 1
    }
    axios
      .post('/api/Carts/post', formValues)
      .then((response) => {
        console.log("formValues addCart =========>", response.data);
        this.setState({
          addtocart: true,
        });
      })
      .catch((error) => {
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
    console.log("wishValuess==>", wishValues);
    axios.post('/api/wishlist/post', wishValues)
      .then((response) => {
        console.log(" response wishValuess==>", response.data);
        this.setState({
          wishlisted: true,
        });
        // axios.patch("/api/carts/remove" ,formValues)
        // .then((response)=>{
        // })
        // .catch((error)=>{
        //     console.log('error', error);
        // })
      })
      .catch((error) => {
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

    const { navigate, dispatch, goBack } = this.props.navigation;
    const menu = <Menu navigate={navigate} isOpen={this.state.isOpen} />;

    if (this.props.loading) {
      return (
        <Loading />
      );
    } else {
      return (
        <React.Fragment>
          <HeaderBar3
            goBack={goBack}
            headerTitle={'SubCategory Products'}
            navigate={navigate}
            toggle={() => this.toggle.bind(this)}
            openControlPanel={() => this.openControlPanel.bind(this)}
          />
          <View style={styles.addsuperparent}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View style={styles.formWrapper}>
                <View style={styles.flxdir}>
                  <View >
                    <Button
                      icon={
                        <Icon
                          name="swap-vertical"
                          type="material-community"
                          size={28}
                          color="#fff"
                        />
                      }
                      buttonStyle={styles.button}
                      containerStyle={styles.buttonContainer}
                    />
                  </View>
                  <View >
                    <Button
                      icon={
                        <Icon
                          name="filter"
                          type="font-awesome"
                          size={20}
                          color="#fff"
                        />
                      }
                      titleStyle={styles.buttonText}
                      title=" Filter"
                      buttonStyle={styles.button}
                      containerStyle={styles.buttonContainer}
                    />
                  </View>

                  <View >
                    <Button
                      titleStyle={styles.buttonText}
                      title="Color"
                      buttonStyle={styles.button}
                      containerStyle={styles.buttonContainer}
                    />
                  </View>
                  <View >
                    <Button
                      titleStyle={styles.buttonText}
                      title="Brand"
                      buttonStyle={styles.button}
                      containerStyle={styles.buttonContainer}
                    />
                  </View>
                  <View >
                    <Button
                      titleStyle={styles.buttonText}
                      title="Price"
                      buttonStyle={styles.button}
                      containerStyle={styles.buttonContainer}
                    />
                  </View>
                  <View>
                  </View>
                </View>
                <View>
                  <View style={styles.proddets}>
                    {this.state.ProductsDetails && this.state.ProductsDetails.length > 0 ?
                      this.state.ProductsDetails.map((item, i) => {
                        return (
                          <View key={i} style={styles.width160}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('SubCatCompView', { productID: item._id })}>
                              <View style={styles.flx5}>
                             
                                <View style={styles.flx1}>
                                <Image
                                  source={{ uri: item.productImage[0] }}
                                  style={styles.subcatimg}
                                />
                                 <TouchableOpacity style={[styles.flx1,styles.wishlisthrt]} onPress={() => this.addtowishlist(item._id)} >
                                   <Icon size={20} name='heart-o' type='font-awesome' color='#80c21c' style={{backgroundColor:"red"}} />
                                 </TouchableOpacity>
                                 <Text style={styles.peroff}> {item.discountPercent}% OFF</Text> 
                                </View>  
                                {/* <View style={styles.flx1}> */}
                                  {/* <Text style={styles.peroff}> {item.discountPercent}% OFF</Text> */}
                                  {/* <Text style={styles.peroff}> {item.discountPercent}% OFF</Text> */}
                                  
                                {/* </View>  */}
                                <View style={[styles.flx1, styles.protxt]}>
                                  <Text numberOfLines={1} style={[styles.nameprod, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>{item.productName}</Text>
                                  <Text numberOfLines={1} style={[styles.urlprod, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>{item.productUrl}</Text>
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
                                    <Text style={styles.ogprice}>{item.originalPrice}</Text>
                                  </View>
                                </View>
                                {/* <View style={styles.cancelbtn}>
                                  <View style={styles.wishbtn}>
                                    <TouchableOpacity>
                                      <Button
                                        onPress={() => this.setState({ cancelordermodal: false })}
                                        titleStyle={styles.buttonText1}
                                        title="Wishlist"
                                        buttonStyle={styles.buttonGreen}
                                        containerStyle={styles.buttonContainer2}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                  <View style={styles.ordervwbtn}>
                                    <TouchableOpacity>
                                      <Button
                                        onPress={() => this.confirmcancelorderbtn()}
                                        titleStyle={styles.buttonText1}
                                        title="ADD"
                                        buttonStyle={styles.buttonGreen}
                                        containerStyle={styles.buttonContainer2}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View> */}
                                <View style={[styles.flx1,styles.addtocartbtn]}>
                                <Button
                                  onPress={() => this.addtocart(item._id)}
                                  titleStyle={styles.buttonText1}
                                  title="ADD"
                                  buttonStyle={styles.buttonGreen}
                                  containerStyle={styles.buttonContainer2}
                                />
                                </View> 
                              </View>
                            </TouchableOpacity>
                          </View>
                          // <View key={i} style={styles.width160}>
                          // <TouchableOpacity onPress={() => this.props.navigation.navigate('SubCatCompView', { productID: item._id })}>
                          //   <View style={[styles.subimg, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>
                          //     <Image
                          //       // source={require("../../AppDesigns/currentApp/images/saleimage.png")}
                          //       source={{ uri: item.productImage[0] }}
                          //       style={styles.subcatimg}
                          //     />
                          //     <Text style={styles.peroff}> {item.discountPercent}% OFF</Text>
                          //     <View style={[styles.proddisperoff, (i % 2 == 0 ? { right: 30, top: 5 } : { right: 30, top: 5 })]}>
                          //       <TouchableOpacity onPress={() => this.addtowishlist(item._id)} >
                          //         <Icon size={20} name='heart-o' type='font-awesome' color='#80c21c' style={{}} />
                          //       </TouchableOpacity>
                          //     </View>
                          //   </View>
                          //   </TouchableOpacity>  
                          //   <View style={styles.padvert10}>
                          //     <Text numberOfLines={1} style={[styles.nameprod, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>{item.productName}</Text>
                          //     <Text numberOfLines={1} style={[styles.urlprod, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>{item.productUrl}</Text>
                          //     <View style={[styles.flxmgtp, (i % 2 == 0 ? { marginLeft: 5 } : { marginLeft: 15 })]}>
                          //       <View style={styles.flxdir}>
                          //         <Icon
                          //           name="rupee"
                          //           type="font-awesome"
                          //           size={15}
                          //           color="#333"
                          //           iconStyle={{ marginTop: 5, marginRight: 3 }}
                          //         />
                          //         <Text style={styles.ogprice}>{item.originalPrice}</Text>
                          //       </View>
                          //       <Text style={styles.disprice}>{item.discountedPrice}</Text>
                          //       <View style={styles.flx1}>
                          //       <Button
                          //         onPress={() => this.addtocart(item._id)}
                          //         titleStyle={styles.buttonText1}
                          //         title="ADD"
                          //         buttonStyle={styles.buttonGreen}
                          //         containerStyle={styles.buttonContainer2}
                          //       />
                          //     </View>
                          //     </View>
                          //   </View>

                          // </View>

                        )
                      })
                      :
                      <View style={{ flex: 1, alignItems: 'center', marginTop: '10%' }}>
                        <Image
                          source={require("../../AppDesigns/currentApp/images/noproduct.jpeg")}
                        />
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
              <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                <View style={{ justifyContent: 'center', }}>
                  {/* <Icon size={30} name='check' type='fontAwesome5' color='#fff' style={{}} /> */}
                  <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
                </View>
                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                  Product is added to cart.
                    </Text>
                <View style={styles.yesmodalbtn}>
                  <View style={styles.ordervwbtn}>
                    <TouchableOpacity>
                      <Button
                        onPress={() => this.setState({ addtocart: false })}
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
            <Modal isVisible={this.state.wishlisted}
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
            </Modal>
            <Footer />
          </View>
        </React.Fragment>
      );
    }
  }
}



