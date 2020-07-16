
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import BouncingPreloader from 'react-native-bouncing-preloader';
import { Header, Button, Icon, SearchBar } from "react-native-elements";
import Modal from "react-native-modal";
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
// import Footer from '../../ScreenComponents/Footer/Footer.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import Notification from '../../ScreenComponents/Notification/Notification.js';
import axios from 'axios';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Wishliststyles.js';
import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
export default class WishlistComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      isOpen: false,
      removewishlistmodal: false,
      products: [],
      // ProductData: [
      //   {
      //     "catImage": require("../../AppDesigns/currentApp/images/15.png"),
      //     "productTitle": "Kuki Fashion",
      //     "productName": "Women Red Solid Fit & Flat",
      //   },
      //   {
      //     "catImage": require("../../AppDesigns/currentApp/images/16.png"),
      //     "productTitle": "Kuki Fashion",
      //     "productName": "Embroidered Daily Wear",
      //   },
      //   {
      //     "catImage": require("../../AppDesigns/currentApp/images/17.png"),
      //     "productTitle": "Kuki Fashion",
      //     "productName": "Women Red Solid Fit & Flat",
      //   },
      //   {
      //     "catImage": require("../../AppDesigns/currentApp/images/18.png"),
      //     "productTitle": "Kuki Fashion",
      //     "productName": "Embroidered Daily Wear",
      //   },
      // ]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getCartData();
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
  componentDidMount() {
    // const product_ID = this.props.navigation.getParam('product_ID', 'No product_ID');
    // const user_id = this.props.navigation.getParam('user_id', 'No user_ID');
    // console.log("product_ID wishlist==>", product_ID);
    // AsyncStorage.multiGet(['user_id', 'token'])
    // .then((data) => {
    //  var user_id = data[0][1];
    // console.log("user_id wishlist==>", user_id);

    //   this.setState({
    //     user_id: user_id,
    //   })
    // })
    // .catch((error) => {
    //   console.log('error', error);
    // })
    
    this.getCartData();
    // this.getData();
  }

  getCartData() {
    AsyncStorage.multiGet(['user_id', 'token'])
      .then((data) => {
        userId = data[0][1],
          axios.get('/api/wishlist/get/userwishlist/' + userId)
            .then((response) => {
              
              response.data.map((a, i) => {
                // console.log("Item a.product_ID==>", a.product_ID);
                axios.get('/api/products/get/one/' + a.product_ID)
                  .then((res) => {
                    console.log('data1 In Wishlist====>', res.data);
                    var products = this.state.products;
                    products.push({
                      "productName": res.data.productName,
                      "originalPrice": res.data.originalPrice,
                      "availableQuantity": res.data.availableQuantity,
                      "bestSeller": res.data.bestSeller,
                      "brand": res.data.brand,
                      "category": res.data.category,
                      "currency": res.data.currency,
                      "discountPercent": res.data.discountPercent,
                      "discountedPrice": res.data.discountedPrice,
                      "productCode": res.data.productCode,
                      "productImage": res.data.productImage,
                      "product_ID": res.data._id,
                      "wishlist_ID": a._id
                    });
                    // console.log('products In Wishlist====>', products);
                    this.setState({
                      products: products,
                      userId: userId,
                    })
                  })
                  .catch((error) => {
                    console.log('error', error);
                  })
              });
            })
            .catch((error) => {
              console.log('error', error);
            })
      })
  }





  // getData() {

  //   axios.get('/api/wishlist/get/userwishlist/' + this.state.user_ID)
  //     .then((response) => {
        
  //       response.data.map((a, i) => {
  //         console.log('data1 In Wishlist====>', a.product_ID);
  //         axios.get('/api/products/get/one/' + a.product_ID)
  //           .then((res) => {
  //             console.log('data1 In Wishlist====>', res.data);
  //             var products = this.state.products;
  //             products.push({
  //               "productName": res.data.productName,
  //               "originalPrice": res.data.originalPrice,
  //               "availableQuantity": res.data.availableQuantity,
  //               "bestSeller": res.data.bestSeller,
  //               "brand": res.data.brand,
  //               "category": res.data.category,
  //               "currency": res.data.currency,
  //               "discountPercent": res.data.discountPercent,
  //               "discountedPrice": res.data.discountedPrice,
  //               "productCode": res.data.productCode,
  //               "productImage": res.data.productImage,
  //               "product_ID": res.data._id,
  //               "wishlist_ID": a._id
  //             });
  //             this.setState({
  //               products: products
  //             })
  //           })
  //           .catch((error) => {
  //             console.log('error', error);
  //           })
  //       })
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     })

  // }
  toggle() {
    let isOpen = !this.state.isOpen;
    this.setState({
      isOpen
    });
  }
  removefromwishlist(id) {
    console.log("ididid", id);
    axios.delete('/api/wishlist/delete/' + id)
      .then((response) => {
        console.log("response rm wishlist=>", response.data);
        // this.getCartData();
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  addtocart(wishlist_ID,product_ID) {
    var wishlist_ID = wishlist_ID;
    var product_ID = product_ID;
    console.log('wishlist_ID', wishlist_ID);
    console.log('product_ID', product_ID);
    axios.get('/api/products/get/one/' + product_ID)
      .then((response) => {
        var totalForQantity = parseInt(1 * response.data.discountedPrice);
        const userid = this.state.userId;
        const formValues = {
          "user_ID": userid,
          "product_ID": response.data._id,
          "currency": response.data.currency,
          "productCode": response.data.productCode,
          "productName": response.data.productName,
          "section_ID": response.data.section_ID,
          "section": response.data.section,
          "category_ID": response.data.category_ID,
          "category": response.data.category,
          "subCategory_ID": response.data.subCategory_ID,
          "subCategory": response.data.subCategory,
          "productImage": response.data.productImage,
          "quantity": 1,
          "discountedPrice": parseInt(response.data.discountedPrice),
          "originalPrice": parseInt(response.data.originalPrice),
          "discountPercent": parseInt(response.data.discountPercent),
          "totalForQantity": totalForQantity,

        }
        axios.post('/api/carts/post', formValues)
          .then((response) => {
            console.log("Move to cart",response.data)
            axios.delete('/api/wishlist/delete/' + wishlist_ID)
              .then((response) => {
                console.log("ReMove from cart",response.data)
              })
              .catch((error) => {
                console.log('error', error);
              })
          })
          .catch((error) => {
            console.log('error', error);
          })
      })
      .catch((error) => {
        console.log('error', error);
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

  deleteCompetitor(id) {
    console.log("id = ", id);
    Meteor.call('deleteCompetitor', id, (err, res) => {
      if (err) {

      } else {
        Alert.alert('', 'Competitor has been deleted');
      }
    });
  }

  searchUpdated(text) {
    this.setState({ searchText: text });
  }

  render() {
    const { navigate, dispatch, goBack } = this.props.navigation;
      return (
        <React.Fragment>
          <HeaderBar5
            goBack={goBack}
            navigate={navigate}
            headerTitle={"My Wishlist"}
            toggle={() => this.toggle.bind(this)}
            openControlPanel={() => this.openControlPanel.bind(this)}
          />
          <View style={styles.superparent}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View style={styles.formWrapper}>
                <View style={styles.parent}>
                  <View style={styles.proddets}>
                    {
                      this.state.products ?
                        this.state.products && this.state.products.length > 0 ?
                        this.state.products.map((item, i) => {
                          console.log("item from wishlist==>",item)
                          return (
                            <View key={i} style={styles.width160}>
                              <View style={[styles.wishlist, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>
                                {item.productImage.length> 0 ?
                                 <Image
                                 source={{ uri: item.productImage[0] }}
                                 style={styles.catimg}
                               />
                                  :
                                  <Image
                                  source={require("../../AppDesigns/currentApp/images/notavailable.jpg")}
                                  style={styles.catimg}
                                />
                                }
                                {/* <Image
                                  source={{ uri: item.productImage[0] }}
                                  style={styles.catimg}
                                /> */}
                                <Text style={styles.peroff}> {item.discountPercent}% OFF</Text>
                                <View style={[styles.iconvw, (i % 2 == 0 ? { right: 20, top: -5 } : { right: 20, top: -5 })]}>
                                  <TouchableOpacity onPress={() => this.removefromwishlist(item.wishlist_ID)}>
                                    <Icon size={18} name='close' type='fontAwesome' color='#fff' style={{}} />
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <View style={styles.padvert}>
                                <Text numberOfLines={1} style={[styles.prodtitle, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>{item.productName}</Text>
                                <View style={[styles.rs, (i % 2 == 0 ? { marginLeft: 5 } : { marginLeft: 15 })]}>
                                  <View style={styles.rs}>
                                    <Icon
                                      name="rupee"
                                      type="font-awesome"
                                      size={15}
                                      color="#333"
                                      iconStyle={styles.rsicn}
                                    />
                                    <Text>{item.discountedPrice}</Text>
                                  </View>
                                  <Text style={styles.rsprice}>{item.originalPrice}</Text>
                                </View>
                              </View>
                              <View style={[{}, (i % 2 == 0 ? { marginTop: -15, marginBottom: 10, marginRight: 8 } : { marginTop: -15, marginLeft: 12, marginBottom: 10 })]}>
                                <TouchableOpacity>
                                  <Button
                                    titleStyle={styles.buttonText}
                                    onPress={() => this.addtocart(item.wishlist_ID,item.product_ID)}
                                    title="MOVE TO CART"
                                    buttonStyle={styles.button}
                                    containerStyle={styles.buttonContainer}
                                    icon={
                                      <Icon
                                        name="shopping-cart"
                                        type="feather"
                                        size={20}
                                        color="#fff"
                                        iconStyle={styles.mg10}
                                      />
                                    }
                                  />
                                </TouchableOpacity>
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
            <Footer />
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
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
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
          </View>
        </React.Fragment>
      );
    }
}



