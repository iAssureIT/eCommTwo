import React from 'react';
import {
  Text, View, TouchableOpacity, Image,
} from 'react-native';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/FeatureProductComponentStyles.js';
import { Icon, Button } from "react-native-elements";
import axios from 'axios';

export default class Exclusiveproducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // inputFocusColor: colors.textLight,
      productImg: [],
      newProducts: [],
      addtocart: false,
      wishlisted: false,
      alreadyincarts: false,
      alreadyinwishlist: false,
      packsizes: ""
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    for (var i = 0; i < nextProps.newProducts.length; i++) {
      var availableSizes = [];
      if (nextProps.newProducts[i].size) {
        // console.log("availableSizes NExt==>",nextProps.newProducts[i]);
        availableSizes.push(
          {
            "productSize": nextProps.newProducts[i].size * 1,
            "packSize": 1,
          },
          {
            "productSize": nextProps.newProducts[i].size * 2,
            "packSize": 2,
          },
          {
            "productSize": nextProps.newProducts[i].size * 4,
            "packSize": 4,
          },
        )
        // console.log("availableSizes==>", availableSizes);
        nextProps.newProducts[i].availableSizes = availableSizes;
      }
    }
    this.setState({
      ProductsDetails: nextProps.newProducts,
      type: nextProps.type
    })
  }
  handleTypeChange = (value) => {
    console.log('PackSize ===> ', value);
    this.setState({
      packsizes: value,
    });
  }
  componentDidMount() {
    // console.log("this.props.userId addCart =========>",  this.props.newProducts);
    for (var i = 0; i < this.props.newProducts.length; i++) {
      var availableSizes = [];
      if (this.props.newProducts[i].size) {
        // console.log("availableSizes NExt==>",this.props.newProducts[i]);
        availableSizes.push(
          {
            "productSize": this.props.newProducts[i].size * 1,
            "packSize": 1,
          },
          {
            "productSize": this.props.newProducts[i].size * 2,
            "packSize": 2,
          },
          {
            "productSize": this.props.newProducts[i].size * 4,
            "packSize": 4,
          },
        )
        // console.log("availableSizes==>",availableSizes);
        this.props.newProducts[i].availableSizes = availableSizes;
      }
    }
    // var array = response.data.map((a,i)=>{return{label  : a.fromtime +" - "+a.totime ,value  : a.fromtime +"-"+a.totime}})
    this.setState({
      ProductsDetails: this.props.newProducts,
      type: this.props.type
    })
  }
  addtocart(productid) {
    console.log("this.state.packsizes==>",this.state.packsizes === undefined || null || 0 ? 1 :this.state.packsizes);
    
    const formValues = {
      "user_ID": this.props.userId,
      "product_ID": productid,
      "quantity": this.state.packsizes === "" || 0 ? 1 :this.state.packsizes,
    }
    axios
      .post('/api/Carts/post', formValues)
      .then((response) => {
        // console.log("formValues addCart =========>", response.data);
        this.setState({
          addtocart: true,
        });
      })
      .catch((error) => {
        this.setState({ alreadyincarts: true })
        console.log('error', error);
      })
  }

  addtowishlist = (productid) => {
    const wishValues = {
      "user_ID": this.props.userId,
      "product_ID": productid,
    }
    console.log("wishValuess==>", wishValues);
    axios.post('/api/wishlist/post', wishValues)
      .then((response) => {
        // console.log(" response wishValuess==>", response.data);
        this.setState({
          wishlisted: true,
        });
      })
      .catch((error) => {
        this.setState({ alreadyinwishlist: true })
        console.log('error', error);
      })
  }
  Viewallfeatureprod() {
    // console.log(" AllFeatureProducts==>",);
    this.props.navigate('AllExclusiveProducts')
  }

  render() {
    return (
      <React.Fragment>

      <View style={styles.maintitle}>
        <View style={styles.maintitle}>
          <Text style={styles.title}>Exclusive Products </Text>
          </View>
          <View style={styles.viewalltxt}>
            <View style={styles.sizedrpbtn}>
              <Button
                onPress={() => this.Viewallfeatureprod()}
                titleStyle={styles.buttonText1}
                title="View All"
                buttonStyle={styles.buttonGreen}
                containerStyle={styles.buttonContainer2}
              />
            </View>
        </View>
        </View>
        <View style={styles.featurelistwrap}>
          <View style={styles.proddets}>
            {this.state.ProductsDetails &&
              this.state.ProductsDetails.map((item, i) => {
                // var array = item.map((a,i)=>{return{label  : a.fromtime +" - "+a.totime ,value  : a.fromtime +"-"+a.totime}})
                var availablessiz = []
                availablessiz = item.availableSizes.map((a, i) => { return { label: a.packSize + " Pack", value: a.packSize } })
                const packsizes = item.availableSizes[0].packSize
                // console.log("featuredproductsloading =========>", packsizes);
                return (
                  // <View key={i} style={styles.width160}>
                  <View key={i} style={styles.mainrightside}>
                    <TouchableOpacity onPress={() => this.props.navigate('SubCatCompView', { productID: item._id })}>
                      <View style={styles.flx5}>

                        <View style={styles.flx1}>
                          {
                            item.productImage.length > 0 ?
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
                            <Icon size={22} name='heart-o' type='font-awesome' color='#80c21c' style={{ backgroundColor: "red" }} />
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
                        <View style={styles.addtocartbtn}>

                          <View style={styles.addbtn}>

                            {/* <View style={styles.marginBottom20}> */}
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
                            {/* </View> */}

                          </View>

                          <View style={styles.sizedrpbtn}>
                            <Button
                              onPress={() => this.addtocart(item._id)}
                              titleStyle={styles.buttonText1}
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
            }
          </View>

          <Modal isVisible={this.state.addtocart}
            onBackdropPress={() => this.setState({ addtocart: false })}
            coverScreen={true}
            hideModalContentWhileAnimating={true}
            style={{ paddingHorizontal: '5%', zIndex: 999 }}
            animationOutTiming={500}>
            <View  style={styles.modalmainvw}>
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
            style={{ zIndex: 999 }}
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

        </View>
      </React.Fragment>
    );
  }
}



// import React from 'react';
// import {
//   ScrollView,
//   Text,
//   View,
//   BackHandler,
//   Dimensions,
//   TouchableOpacity,
//   ImageBackground,
//   Image,
//   Button, 
//   TextInput,
//   Alert
// } from 'react-native';
// // import styles from './styles.js';
// import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/FeatureProductComponentStyles.js';
// import { colors, sizes } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
// import ValidationComponent from "react-native-form-validator";
// // import Loading from '../../../AppDesigns/currentApp/styles/ScreenComponentStyles/LoadingStyles.js';


// const window = Dimensions.get('window');

// export default class FeatureProductComponent extends ValidationComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       productImg:[],
//       newProducts: [],
//     };
//   }
//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       newProducts: nextProps.newProducts,
//       type: nextProps.type
//     })
//   }

//   componentDidMount(){
//      this.setState({
//         newProducts : this.props.newProducts,
//         type        : this.props.type
//     })
//   }



//   render() {
//     return (
//       <View style={{marginBottom:"15%"}}>
//         <View>
//           <Text style={styles.title}>Feature Products</Text> 
//         </View>
//         <View style={styles.featurelistwrap}>
//           {
//             this.state.newProducts && this.state.newProducts.length > 0 ?
//               this.state.newProducts.map((item, i) => {
//                 // console.log("item feature===>",item);
//                 return(
//                  <View  key={i}>
//                   <View  style={[styles.featureprod,(i%2==0?{marginRight:10}:{})]}>
//                     <TouchableOpacity  onPress={()=>this.props.navigate('SubCatCompView',{productID:item._id})}>
//                         {/* <Image
//                           source={{uri:item.productImage[0] ? item.productImage[0] : '../../AppDesigns/currentApp/images/notavailable.jpg'}}
//                           style={styles.featureimg}
//                         /> */} 
//                         {item.productImage.length> 0 ?
//                             <Image
//                               source={{ uri: item.productImage[0] }}
//                               style={styles.featureimg}
//                             />
//                           :
//                             <Image
//                               source={require("../../AppDesigns/currentApp/images/notavailable.jpg")}
//                               style={styles.featureimg}
//                             />
//                         }
//                       <Text style={styles.featureprodname}>{item.productName}</Text>
//                     </TouchableOpacity>
//                     </View>

//                   </View>


//                    )
//                  })
//                :
//                 null
//               }
//         </View>
//       </View>
//     );
//   }
// }



