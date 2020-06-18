
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
import Menu from '../../ScreenComponents/Menu/Menu.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Categoriesstyles.js';
import HeaderBar from '../../ScreenComponents/HeaderBar/HeaderBar.js';
import Footer from '../../ScreenComponents/Footer/Footer.js';
import Notification from '../../ScreenComponents/Notification/Notification.js'
// import styles from './Categoriesstyles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import Carousel from 'react-native-banner-carousel';
import ReviewComponent from '../../ScreenComponents/Reviews/ReviewComponent.js';
import axios                      from 'axios';
import AsyncStorage                         from '@react-native-community/async-storage';

const window = Dimensions.get('window');

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
 
const images = [
  {
    imageSource : require("../../AppDesigns/currentApp/images/23.png"),
  },
  {
    imageSource : require("../../AppDesigns/currentApp/images/24.png"),
  
  },
  {
    imageSource : require("../../AppDesigns/currentApp/images/25.png"),
 
  }
];

export default class SubCatCompView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      	inputFocusColor : colors.textLight,
      	isOpen          : false,
        starCount       : 2.5,
        productID       : '',
        productName     : '',
        productUrl      : '',
        discountedPrice : '',
        originalPrice   : '',
        color           : '',
        discountPercent : '',
        productDetails  : '',
        featureList     : '',
        productImage    : [],
    };
  }

  componentDidMount(){
    const productID    = this.props.navigation.getParam('productID','No productID');
    console.log('productID-------------------------->', productID);
    this.setState({
      productID : productID
    },()=>{
      this.getProductsView();
    })

    AsyncStorage.multiGet(['user_id','token'])
      .then((data)=>{
       userId = data[0][1],
        this.setState({
          userId : userId,
        },()=>{
          console.log('userId',this.state.userId)
        })
    })
  }

  getProductsView(){

    axios.get("/api/Products/get/one/"+this.state.productID)

    // axios.get('/api/Products/get/one/5ec4b6ea72a23d4fea8797e3')
    .then((response)=>{
      console.log("response.data ProductsView =========>", response.data);
      // console.log ('response.data productImage -------------------->', response.data.productImage[0])
      this.setState({    
        productName     : response.data.productName,
        productUrl      : response.data.productUrl,
        discountedPrice : response.data.discountedPrice,
        originalPrice   : response.data.originalPrice,
        color           : response.data.color,
        discountPercent : response.data.discountPercent,
        productDetails  : response.data.productDetails,
        featureList     : response.data.featureList,
        productImage    : response.data.productImage[0]
      })
    }) 
    .catch((error)=>{
      // console.log('error', error);
    })
  }

  handlePressAddCart() {
    const formValues = {
      "user_ID"    : this.state.userId,
      "product_ID" : this.state.productID,
      "quantity"   : 1
    }
    axios
    .post('/api/Carts/post',formValues)
    .then((response) => {
      console.log("formValues addCart =========>", formValues);
      console.log("this.props.navigation------------>",this.props.navigation);
      this.props.navigation.navigate('CartComponent',{user_ID:this.state.userId,product_ID:this.state.productID});
    })
    .catch((error) => {
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

  renderPage(item, index) {
      return (
        <View key={index}>
            <ImageBackground 
              style={styles.prodimg} 
              source={{uri:item.productImage}}
              resizeMode={"contain"}
            >
            </ImageBackground>
        </View>
      );
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
            <HeaderBar
                goBack={goBack}
                navigate={navigate}
                headerTitle={ 'Product View'}
                toggle={()=>this.toggle.bind(this)} 
                openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={styles.catsuperparent}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
                    <View  style={styles.formWrapper}>
                        <View style={styles.flxmg}>
                            <View style={styles.prodname}>
                                <Text numberOfLines = { 1 } style={styles.productname}>{this.state.productName}</Text>
                            </View>
                            <View style={styles.star}>
                                <View style={styles.staricn}>
                                    <Icon
                                    name="star"
                                    type="font-awesome"
                                    size={15}
                                    color="#fff"
                                    iconStyle={styles.icnstar}
                                    />
                                    <Text numberOfLines = { 1 } style={styles.prodqty}>4.5</Text>
                                </View>
                            </View>
                        </View>
                        <Text numberOfLines = { 1 } style={styles.produrl}>{this.state.productUrl}</Text>
                        <View>
                           <Image
                              source={require("../../AppDesigns/currentApp/images/saleimage.png")}
                              style={styles.saleimg}
                            />
                        </View>
                        <View style={styles.detailclr}>
                            <Text style={styles.detailcolor}>Details: {this.state.color}</Text>
                            <View style={styles.mgtp3}>
                                <View style={styles.flxdir}>
                                    <Icon
                                    name="rupee"
                                    type="font-awesome"
                                    size={25}
                                    color="#333"
                                    iconStyle={styles.rupeeicn}
                                    />
                                    <Text style={styles.rupeetxt}>{this.state.discountedPrice}</Text>
                                </View>
                                <View style={styles.flxdir}>
                                    <View style={styles.flxdirmgr}>
                                        <Icon
                                        name="rupee"
                                        type="font-awesome"
                                        size={15}
                                        color="#333"
                                        iconStyle={styles.rupeeicn}
                                        />
                                        <Text style={styles.originalprice}>{this.state.originalPrice}</Text>
                                    </View>
                                    <View style={styles.flxdir}>
                                        <Text style={styles.disper}>{this.state.discountPercent}% OFF</Text>
                                    </View>
                                </View>
                            </View>
                            <View >
                                <TouchableOpacity onPress={()=>this.handlePressAddCart()}>
                                    <Button
                                     onPress={()=>this.handlePressAddCart()}
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
                        <View style={styles.mgbtm15}>
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
                        <View style={styles.feature}></View>
                    </View>
            	</ScrollView>
            </View>
            <Footer/>
          </SideMenu>
        </Drawer>
      );  
    }
  }
}



