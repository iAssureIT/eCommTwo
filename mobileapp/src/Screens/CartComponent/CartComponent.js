
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
import { Header, Button, Icon, SearchBar } from "react-native-elements";
import SideMenu from 'react-native-side-menu';
import StarRating from 'react-native-star-rating';

import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar4 from '../../ScreenComponents/HeaderBar4/HeaderBar4.js';
import Footer from '../../ScreenComponents/Footer/Footer.js';
import Notification from '../../ScreenComponents/Notification/Notification.js'
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Cartstyles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import axios                      from 'axios';
import AsyncStorage                         from '@react-native-community/async-storage';
const window = Dimensions.get('window');

export default class CartComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      	inputFocusColor       : colors.textLight,
      	isOpen                : false,
        starCount             : 2.5,
        cartData              : '',
        cart                  : [],
        totalCartPrice        : '',
        productData           : {},
        productCartData       : [],
        vatPercent            : 0,
        companyInfo           : "",
        cartProduct           : "",
        shippingCharges       : 0,
        quantityAdded         : 0,
        totalIndPrice         : 0,
    };
  }

  componentDidMount(){
    const product_ID    = this.props.navigation.getParam('product_ID','No product_ID');
    const user_ID       = this.props.navigation.getParam('user_ID','No user_ID');
    console.log('product_ID-------------------------->', product_ID);
    console.log('user_ID-------------------------->', product_ID);
    this.setState({
      product_ID : product_ID,
      user_ID   : user_ID
    },()=>{
      this.getCartData(this.state.user_ID,this.state.product_ID);
    })
  }

  getCartData(){
    axios
    .get('/api/Carts/get/cartproductlist/'+userId)
    // .get('/api/Carts/get/cartproductlist/5ec4c2a472a23d4fea8798d9')
      .then((response)=>{ 
        console.log('cartData response.data------------------------->', response.data[0].cartItems);
        this.setState({
            // cartData : response.data[0],
            cartData :response.data[0].cartItems,
            subTotal :response.data.subTotal,
            saving   :response.data.saving,
            cartTotal:response.data.cartTotal
        })
      })
      .catch((error)=>{
        console.log('error', error);
    }) 
  }



  componentWillReceiveProps(nextProps){
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

  searchUpdated(text){
    this.setState({ searchText: text });
  }

  render(){
    const { navigate,dispatch,goBack } = this.props.navigation;
    const menu = <Menu navigate={navigate} isOpen={this.state.isOpen}/>;

    if(this.props.loading){
      return(
        <Loading />
      );
    }else{
      return (
        <Drawer
          	ref={(ref) => this._drawer = ref}
          	content={
	            <Notification 
              	navigate          = {this.props.navigation.navigate} 
              	updateCount       = {()=>this.updateCount.bind(this)}  
              	closeControlPanel = {()=>this.closeControlPanel.bind(this)} 
	            />
          	}
          	side="right"
          	>
          	<SideMenu disableGestures={true} openMenuOffset={300} menu={menu} isOpen={this.state.isOpen}  onChange={isOpen => this.updateMenuState(isOpen)} >
            <HeaderBar4
              goBack={goBack}
              headerTitle={ 'Cart'}
          	  navigate={navigate}
            	toggle={()=>this.toggle.bind(this)} 
            	openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
            	<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              		<View  style={styles.formWrapper}>
               			<View style={styles.cartdetails}>
                     <Text style={styles.details}>Details: </Text>
                      {this.state.cartData && this.state.cartData.length > 0 ?
                        this.state.cartData.map((item,i)=>{
                          // console.log("item cartData------------------->", item);
                          return(
                           <View key={i} style={styles.proddetails}>
                            <View style={styles.flxdir}>
                             <View style={styles.flxpd}>
                                <Image
                                  style={styles.imgwdht}
                                  source={{uri:item.productDetail.productImage[0]}}
                                />
                              </View>
                              <View style={styles.flxmg}>
                                <Text style={styles.productname}>{item.productDetail.productName}</Text>
                                <View style={styles.productdets}>
                                  <View style={styles.productdets}>
                                      <Icon
                                      name="rupee"
                                      type="font-awesome"
                                      size={15}
                                      color="#666"
                                      iconStyle={styles.iconstyle}
                                      />
                                      <Text style={styles.proddetprice}>{item.productDetail.discountedPrice}</Text>
                                  </View>
                                  <View style={styles.flxdir}>
                                      <Icon
                                      name="rupee"
                                      type="font-awesome"
                                      size={15}
                                      color="#666"
                                      iconStyle={styles.iconstyle}
                                      />
                                      <Text style={styles.ogprice}>{item.originalPrice}</Text>
                                      <Text style={styles.discountpr}>{item.productDetail.discountPercent}% OFF</Text>
                                  </View>
                                </View>
                                <View style={styles.productdets}>
                                  <Text style={styles.productsoldby}>Sold by : </Text>
                                  <Text style={styles.productsoldurl}>{item.productDetail.productUrl}</Text>
                                </View>
                                <View style={styles.productdets}>
                                  <TouchableOpacity>
                                    <View style={styles.mincircle}>
                                        <Icon
                                          name="minus-circle-outline"
                                          type="material-community"
                                          size={15}
                                          color="#666"
                                          iconStyle={styles.icnstyle}
                                        />
                                    </View>
                                  </TouchableOpacity>
                                  <View style={styles.productqty}>
                                    <Text style={{}}>Qty : {item.productDetail.availableQuantity}</Text>
                                  </View>
                                  <TouchableOpacity>
                                    <View style={styles.productqtyicn}>
                                      <Icon
                                        name="plus-circle-outline"
                                        type="material-community"
                                        size={15}
                                        color="#666"
                                        iconStyle={styles.icnstyle}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                                <View  style={styles.productdel}>
                                    <View style={styles.productdelopacity}>
                                    <TouchableOpacity>
                                      <Button
                                        titleStyle={styles.buttonText2}
                                        title="Delete"
                                        buttonStyle={styles.button2}
                                        containerStyle={styles.buttonContainer2}
                                      />
                                    </TouchableOpacity>
                                    </View>
                                  <View style={styles.mvtolist}>
                                    <TouchableOpacity>
                                      <Button
                                        titleStyle={styles.buttonText2}
                                        title="Move to Wishlist"
                                        buttonStyle={styles.button2}
                                        containerStyle={styles.buttonContainer2}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </View>
                           </View>
                            )
                          })
                          :

                          <View style={{alignItems:'center',marginTop:'10%'}}>
                              <Text>No products available!</Text>
                          </View> 
                        }
              

                     <View style={styles.totaldetails}>
                      <View style={styles.flxdata}>
                      <View style={{flex:0.5}}>
                        <Text style={styles.totaldata}>Subtotal (2 Item) </Text>
                        <Text style={styles.totaldata}>Your Saving </Text>
                        <Text style={styles.totaldata}>Shipping </Text>
                        <Text style={styles.totaldata}>Order Total</Text>
                      </View>
                      <View  style={{flex:0.5}}>
                        <View style={{flexDirection:"row",justifyContent:'flex-end'}}> 
                           <Icon
                              name="rupee"
                              type="font-awesome"
                              size={15}
                              color="#666"
                              iconStyle={styles.iconstyle}
                              />
                            <Text style={styles.savings}>{this.state.subTotal}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:'flex-end'}}> 
                           <Icon
                              name="rupee"
                              type="font-awesome"
                              size={15}
                              color="#666"
                              iconStyle={styles.iconstyle}
                              />
                            <Text style={styles.savings}>{this.state.saving}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:'flex-end'}}> 
                           <Icon
                              name="rupee"
                              type="font-awesome"
                              size={15}
                              color="#666"
                              iconStyle={styles.iconstyle}
                              />
                            <Text style={styles.savings}>50</Text>
                        </View>
                        <View style={styles.rupeeicn}> 
                           <Icon
                              name="rupee"
                              type="font-awesome"
                              size={15}
                              color="#666"
                              iconStyle={styles.iconstyle}
                              />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333'}}>{this.state.cartTotal}</Text>
                        </View>
                      </View>
                     </View>
                     <View style={styles.margTp20}>
                        <TouchableOpacity >
                          <Button
                          onPress={()=>this.props.navigation.navigate('AddressDefaultComp')}
                          title={"PROCEED TO CHECKOUT"}
                          buttonStyle={styles.button1}
                          containerStyle={styles.buttonContainer1}
                          />
                        </TouchableOpacity>
                    </View>
                     </View>
                    </View>

              		</View>

            	</ScrollView>
            	<Footer/>
            </View>
          </SideMenu>
        </Drawer>
      );  
    }
  }
}



