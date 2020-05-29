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

import { Header, Button, Icon, SearchBar } from "react-native-elements";
import SideMenu from 'react-native-side-menu';
import Menu from '../../layouts/Menu/Menu.js';
import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import HeaderBar2 from '../../layouts/HeaderBar2/HeaderBar2.js';
import FlashSaleComponent from '../../layouts/FlashSaleComponent/FlashSaleComponent.js';
import BestSellers from '../../layouts/BestSellers/BestSellers.js';
import BannerComponent from '../../layouts/BannerComponent/BannerComponent.js';
import MenuCarouselSection from '../../layouts/Section/MenuCarouselSection.js';
import FeatureProductComponent from'../../layouts/FeatureProductComponent/FeatureProductComponent.js';
import FlashComponent from'../../layouts/FlashComponent/FlashComponent.js';
import Footer from '../../layouts/Footer/Footer.js';
import Notification from '../../layouts/Notification/Notification.js'
import styles from './styles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js.js';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer';
import { TextField } from 'react-native-material-textfield';
import Loading from '../../layouts/Loading/Loading.js';
import axios                      from 'axios';

const window = Dimensions.get('window');

export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state={
      inputFocusColor   : colors.textLight,
      isOpen            : false,
      sections          : [],
      exclusiveProducts : [],
      featuredProducts  : [],
      featuredproductsloading : true
  
    };
    this.getSections();
    this.exclusiveProductsData();
    this.featuredProductData();
  }

  componentDidMount() {
    this.getSections();
    this.exclusiveProductsData();
    this.getWishData();
    //     var refresh = window.localStorage.getItem('refresh');
    //     // console.log(refresh);
    //     if (refresh===null){
    //         window.location.reload();
    //         window.localStorage.setItem('refresh', "1");
    // }
  }  

  getSections(){
      axios.get('/api/sections/get/list')
      .then((response)=>{
          console.log('sect',response.data)
          this.setState({
              sections : response.data
          })
      })
      .catch((error)=>{
          console.log('error', error);
      })
  }

  featuredProductData(){
    var productType1 = 'featured';
    
    axios.get("/api/products/get/listbytype/"+productType1)
      .then((response)=>{
        // console.log('featuredProducts' , response.data)
        this.setState({
          featuredproductsloading:false,
          featuredProducts : response.data
        })
      })
      .catch((error)=>{
          // console.log('error', error);
      })

    }


  exclusiveProductsData(){
    var productType2 = 'exclusive';
    axios.get("/api/products/get/listbytype/"+productType2)
    .then((response)=>{
      this.setState({
        exclusiveprloading:false,
        exclusiveProducts : response.data
      })
    })
    .catch((error)=>{
        // console.log('error', error);
    })
  }

  getWishData(){
    // var user_ID = localStorage.getItem('user_ID');
    axios.get('/api/wishlist/get/userwishlist/')
    .then((response)=>{
      this.featuredProductData();
      this.exclusiveProductsData();
      this.newProductsData();
      this.bestSellerData();
      this.setState({
        wishList : response.data
      },()=>{
      })
    })
    .catch((error)=>{
      // console.log('error', error);
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

    const { navigate,dispatch } = this.props.navigation;
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
            <HeaderBar2 
              navigate={navigate}
              toggle={()=>this.toggle.bind(this)} 
              openControlPanel={()=>this.openControlPanel.bind(this)}
          
            />
            <View style={{flex:1, backgroundColor:'#fff'}}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View  style={styles.formWrapper}>
                <View>
                  <BannerComponent />
                </View>
                {/* <View>
                  <FlashSaleComponent  navigate = {navigate} />
                </View>*/}
                <View>
                  <MenuCarousel  navigate = {navigate} />
                </View>
                <View>
                  <MenuCarouselSection  navigate = {navigate} sections={this.state.sections} />
                </View>
                <View>
                 <BestSellers />
                </View>
                {/*
                  (this.state.exclusiveProducts.length > 0 ? 
                    <FlashComponent navigate = {navigate} newProducts={this.state.exclusiveProducts} type={'exclusive'} categories={this.state.categories} getWishData={this.getWishData.bind(this)} wishList={this.state.wishList}/>
                     :
                    null
                  )
                */}

                {
                
                  (this.state.featuredProducts.length > 0 ? 
                    <FeatureProductComponent navigate = {navigate} title={'FEATURE PRODUCTS'} newProducts={this.state.featuredProducts} type={'featured'} getWishData={this.getWishData.bind(this)} wishList={this.state.wishList} categories={this.state.categories}/>
                    : null
                  )
                }
               
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



