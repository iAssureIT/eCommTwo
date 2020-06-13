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
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar from '../../ScreenComponents/HeaderBar/HeaderBar.js';
import HeaderBar2 from '../../ScreenComponents/HeaderBar2/HeaderBar2.js';
import BannerComponent from '../../ScreenComponents/BannerComponent/BannerComponent.js';
import MenuCarouselSection from '../../ScreenComponents/Section/MenuCarouselSection.js';
import FeatureProductComponent from'../../ScreenComponents/FeatureProductComponent/FeatureProductComponent.js';
import FlashComponent from'../../ScreenComponents/FlashComponent/FlashComponent.js';
// import Footer from '../../ScreenComponents/Footer/Footer.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import Notification from '../../ScreenComponents/Notification/Notification.js'
// import styles from './Dashboardstyles.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Dashboardstyles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer';
import { TextField } from 'react-native-material-textfield';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import axios from "axios";

const window = Dimensions.get('window');

export default class Dashboard extends React.Component{
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
        this.setState({
          featuredproductsloading:false,
          featuredProducts : response.data
        })
      })
      .catch((error)=>{
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
          // ref={(ref) => this._drawer = ref}
          // content={
          //   <Notification 
          //     navigate          = {this.props.navigation.navigate} 
          //     updateCount       = {()=>this.updateCount.bind(this)}  
          //     closeControlPanel = {()=>this.closeControlPanel.bind(this)} 
          //   />
          // }
          // side="left"
          >
          <SideMenu disableGestures={true} openMenuOffset={300} menu={menu} isOpen={this.state.isOpen}  onChange={isOpen => this.updateMenuState(isOpen)} >
            <HeaderBar2 
              navigate={navigate}
              toggle={()=>this.toggle.bind(this)} 
              openControlPanel={()=>this.openControlPanel.bind(this)}
          
            />
            <View style={styles.superparent}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View  style={styles.formWrapper}>
                <View>
                  <BannerComponent />
                </View>
                <View>
                  <MenuCarouselSection  navigate = {navigate} sections={this.state.sections} />
                </View>
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
            {/* </React.Fragment> */}
           </SideMenu>
        </Drawer>
      );  
    }
    
    
  }
}



