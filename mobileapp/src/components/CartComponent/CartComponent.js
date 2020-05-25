
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

import Menu from '../../layouts/Menu/Menu.js';
import HeaderBar4 from '../../layouts/HeaderBar4/HeaderBar4.js';
import Footer from '../../layouts/Footer/Footer.js';
import Notification from '../../layouts/Notification/Notification.js'
import styles from './styles.js';
import {colors} from '../../config/styles.js';
import Loading from '../../layouts/Loading/Loading.js';
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
               			<View style={{flex:1,paddingHorizontal:15,marginTop:15,marginBottom:"20%"}}>
                     <Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold",color:'#333'}}>Details: </Text>
                      {this.state.cartData && this.state.cartData.length > 0 ?
                        this.state.cartData.map((item,i)=>{
                          console.log("item cartData------------------->", item);
                          return(
                           <View key={i} style={{borderWidth:1,borderColor:'#f1f1f1',backgroundColor:"#fff",height:250,borderRadius:5,marginTop:10,}}>
                            <View style={{flexDirection:'row'}}>
                             <View style={{flex:0.4,padding:20}}>
                                <Image
                                  style={{width: "100%", height:"100%",}}
                                  source={{uri:item.productDetail.productImage[0]}}
                                />
                              </View>
                              <View style={{flex:0.8,marginTop:18}}>
                                <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold",flexWrap:'wrap'}}>{item.productDetail.productName}</Text>
                                <View style={{flexDirection:'row',marginTop:10}}>
                                  <View style={{flexDirection:'row',marginRight:10}}>
                                      <Icon
                                      name="rupee"
                                      type="font-awesome"
                                      size={15}
                                      color="#666"
                                      iconStyle={{marginTop:5,marginRight:3,}}
                                      />
                                      <Text style={{textDecorationLine: 'line-through',fontSize:12,fontFamily:"Montserrat-Regular",}}>{item.productDetail.discountedPrice}</Text>
                                  </View>
                                  <View style={{flexDirection:'row',}}>
                                      <Icon
                                      name="rupee"
                                      type="font-awesome"
                                      size={15}
                                      color="#666"
                                      iconStyle={{marginTop:5,marginRight:3,}}
                                      />
                                      <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",}}>{item.originalPrice}</Text>
                                      <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#c10000',fontStyle:"italic",marginLeft:10}}>{item.productDetail.discountPercent}% OFF</Text>
                                  </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:10}}>
                                  <Text style={{fontSize:12,fontFamily:"Montserrat-Regular", color:'#666'}}>Sold by : </Text>
                                  <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#3090C7'}}>{item.productDetail.productUrl}</Text>
                                </View>
                                <View style={{flexDirection:'row',marginTop:10,}}>
                                  <TouchableOpacity>
                                    <View style={{borderWidth:1,borderColor:"#ccc",padding:5,borderTopLeftRadius:5,height:50,borderBottomLeftRadius:5}}>
                                        <Icon
                                          name="minus-circle-outline"
                                          type="material-community"
                                          size={15}
                                          color="#666"
                                          iconStyle={{marginTop:10,marginRight:3,paddingHorizontal:5}}
                                        />
                                    </View>
                                  </TouchableOpacity>
                                  <View style={{borderWidth:1,borderColor:"#ccc",padding:13,height:50}}>
                                    <Text style={{}}>Qty : {item.productDetail.availableQuantity}</Text>
                                  </View>
                                  <TouchableOpacity>
                                    <View style={{borderWidth:1,borderColor:"#ccc",padding:5,borderTopRightRadius:5,height:50,borderBottomRightRadius:5}}>
                                      <Icon
                                        name="plus-circle-outline"
                                        type="material-community"
                                        size={15}
                                        color="#666"
                                        iconStyle={{marginTop:10,marginRight:3,paddingHorizontal:5}}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                                <View  style={{flexDirection:'row',marginTop:15,paddingRight:10}}>
                                    <View style={{flex:0.4,marginRight:10,borderWidth:1,borderColor:"#ccc",borderRadius:3,shadowColor: '#f1f1f1',
                                      shadowOffset: { width: 0, height: 1 },
                                      shadowOpacity: 1,
                                      shadowRadius: 2,
                                      elevation: 1,}}>
                                    <TouchableOpacity>
                                      <Button
                                        titleStyle={styles.buttonText2}
                                        title="Delete"
                                        buttonStyle={styles.button2}
                                        containerStyle={styles.buttonContainer2}
                                      />
                                    </TouchableOpacity>
                                    </View>
                                  <View style={{flex:0.8,borderRadius:3,borderWidth:1,borderColor:"#ccc",shadowColor: '#f1f1f1',
                                      shadowOffset: { width: 0, height: 1 },
                                      shadowOpacity: 1,
                                      shadowRadius: 2,
                                      elevation: 1,}}>
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
              

                     <View style={{backgroundColor:'#fff',borderWidth:1,borderColor:"#f1f1f1",height:180,marginTop:15,paddingHorizontal:15,paddingVertical:15}}>
                      <View style={{flex:1,flexDirection:"row"}}>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666'}}>Subtotal (2 Item) </Text>
                        <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666'}}>Your Saving </Text>
                        <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666'}}>Shipping </Text>
                        <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666'}}>Order Total</Text>
                      </View>
                      <View  style={{flex:0.5}}>
                        <View style={{flexDirection:"row",justifyContent:'flex-end'}}> 
                           <Icon
                              name="rupee"
                              type="font-awesome"
                              size={15}
                              color="#666"
                              iconStyle={{marginTop:5,marginRight:3,}}
                              />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333'}}>{this.state.subTotal}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:'flex-end'}}> 
                           <Icon
                              name="rupee"
                              type="font-awesome"
                              size={15}
                              color="#666"
                              iconStyle={{marginTop:5,marginRight:3,}}
                              />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333'}}>{this.state.saving}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:'flex-end'}}> 
                           <Icon
                              name="rupee"
                              type="font-awesome"
                              size={15}
                              color="#666"
                              iconStyle={{marginTop:5,marginRight:3,}}
                              />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333'}}>50</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:'flex-end'}}> 
                           <Icon
                              name="rupee"
                              type="font-awesome"
                              size={15}
                              color="#666"
                              iconStyle={{marginTop:5,marginRight:3,}}
                              />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333'}}>{this.state.cartTotal}</Text>
                        </View>
                      </View>
                     </View>
                     <View style={{marginTop:20}}>
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



