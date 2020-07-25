import React from 'react';
import {
  Text,View,TouchableOpacity,Image,
} from 'react-native';
import Modal from "react-native-modal";
import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/FeatureProductComponentStyles.js';
// import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import {  Icon,Button} from "react-native-elements";
import axios from 'axios';

export default class SearchProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // inputFocusColor: colors.textLight,
      productImg:[],
      newProducts: [],
      addtocart: false,
      wishlisted: false
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("this.nextProps.searchProds =========>", nextProps.searchProds);
    this.setState({
      ProductsDetails: nextProps.searchProds,
    })
  }

  componentDidMount(){
    // console.log("this.props.userId addCart =========>", this.props.userId);
    // console.log("this.props.searchProds =========>", this.props.searchProds);
     this.setState({
        ProductsDetails : this.props.searchProds,
    })
  }
  addtocart(productid) {
    
    const formValues = {
      "user_ID": this.props.userId,
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

  addtowishlist = (productid) => {
    const wishValues = {
      "user_ID": this.props.userId,
      "product_ID": productid,
    }
    console.log("wishValuess==>", wishValues);
    axios.post('/api/wishlist/post', wishValues)
      .then((response) => {
        console.log(" response wishValuess==>", response.data);
        this.setState({
          wishlisted: true,
        });
      })
      .catch((error) => {
        console.log('error', error);
      })
  }




  render() {
      return (
        <React.Fragment>
          
          <View>
           <Text style={styles.title}>Search Products</Text> 
         </View>
         <View style={styles.featurelistwrap}>
                  <View style={styles.proddets}>
                  {this.state.ProductsDetails &&
                      this.state.ProductsDetails.map((item, i) => {
                        return (
                          <View key={i} style={styles.width160}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('SubCatCompView', { productID: item._id })}>
                              <View style={styles.flx5}>
                             
                                <View style={styles.flx1}>
                                {
                                  item.productImage.length> 0 ?
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
                                 <TouchableOpacity style={[styles.flx1,styles.wishlisthrt]} onPress={() => this.addtowishlist(item._id)} >
                                   <Icon size={20} name='heart-o' type='font-awesome' color='#80c21c' style={{backgroundColor:"red"}} />
                                 </TouchableOpacity>
                                 <Text style={styles.peroff}> {item.discountPercent}% OFF</Text> 
                                </View>  
                                <View style={[styles.flx1, styles.protxt]}>
                                  <Text numberOfLines={1} style={[styles.nameprod, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>{item.productName}</Text>
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
                                <View style={styles.addtocartbtn}>
                                
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
              <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                <View style={{ justifyContent: 'center', }}>
                  <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
                </View>
                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                  Product is added to cart.
                    </Text>
                
                <View style={styles.yesmodalbtn}>
                {/*  <View style={styles.ordervwbtn}>
                    <TouchableOpacity> */}
                      <Button
                        onPress={() => this.setState({ addtocart: false })}
                        titleStyle={styles.buttonText1}
                        title="OK"
                        buttonStyle={styles.buttonGreen}
                        containerStyle={styles.buttonContainer1}
                      />
                    {/* </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            </Modal>
            <Modal isVisible={this.state.wishlisted}
              onBackdropPress={() => this.setState({ wishlisted: false })}
              coverScreen={true}
              hideModalContentWhileAnimating={true}
              style={{  zIndex: 999 }}
              animationOutTiming={500}>
              <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                <View style={{ justifyContent: 'center', }}>
                  <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
                </View>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20, }}>
                  Product is added to wishlist.
                </Text>
                 <View style={styles.yesmodalbtn}>
                {/*  <View style={styles.ordervwbtn}>
                    <TouchableOpacity> */}
                      <Button
                        onPress={() => this.setState({ wishlisted: false })}
                        titleStyle={styles.buttonText1}
                        title="OK"
                        buttonStyle={styles.buttonGreen}
                        containerStyle={styles.buttonContainer1}
                      />
                    {/* </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            </Modal>
        
          </View>
        </React.Fragment>
      );
  }
}
