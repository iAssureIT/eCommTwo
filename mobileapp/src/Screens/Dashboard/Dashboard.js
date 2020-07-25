import React from 'react';
import {ScrollView,View,AsyncStorage,} from 'react-native';

import { Header, Button, Icon, SearchBar } from "react-native-elements";
import SideMenu from 'react-native-side-menu';
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar from '../../ScreenComponents/HeaderBar/HeaderBar.js';
import HeaderBar2 from '../../ScreenComponents/HeaderBar2/HeaderBar2.js';
import BannerComponent from '../../ScreenComponents/BannerComponent/BannerComponent.js';
import MenuCarouselSection from '../../ScreenComponents/Section/MenuCarouselSection.js';
import FeatureProductComponent from'../../ScreenComponents/FeatureProductComponent/FeatureProductComponent.js';
import SearchProducts from'../Search/SearchProducts.js';
// import Footer from '../../ScreenComponents/Footer/Footer.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import Notification from '../../ScreenComponents/Notification/Notification.js'
import { connect }        from 'react-redux';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Dashboardstyles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer';
import { TextField } from 'react-native-material-textfield';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import axios from "axios";

class Dashboard extends React.Component{
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
    this.SearchProducts();
  }

  componentDidMount() {
    console.log("this.searchText IN ===>s", this.props.searchText);
    AsyncStorage.multiGet(['user_id', 'token'])
      .then((data) => {
        userId = data[0][1]
        console.log('userId on Dashboard===>', userId);
        this.setState({
          userId : userId
      })
      })
      .catch((error) => {
        console.log('error', error);
      })
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
  SearchProducts(){
    // console.log("Name serarch==>",this.props.searchText);
    axios.get("/api/products/get/search/" + this.props.searchText)
          .then((response) => {
            // console.log("searchResult of serarch==>",response.data);
            this.setState({
              ProductsDetails: response.data,
            },()=>{
              console.log("searchResult of serarch==>",this.state.ProductsDetails);
            })
            
          })
          .catch((error) => {})
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
    console.log("this.searchText nextprops ===>s", nextProps.searchText);
    this.SearchProducts();
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
                <View style={styles.bannerwrap}>
                  <BannerComponent />
                </View>
                <View>
                { this.props.searchText ?
                  null
                     
                :
                  <MenuCarouselSection  navigate = {navigate} sections={this.state.sections} />
                }
                  </View>
                { this.props.searchText ?
                     <SearchProducts navigate = {navigate} title={'Search PRODUCTS'} searchProds={this.state.ProductsDetails}  />
                     
                :
                  (this.state.featuredProducts.length > 0 ? 
                    <FeatureProductComponent navigate = {navigate} title={'FEATURE PRODUCTS'}  newProducts={this.state.featuredProducts} type={'featured'} getWishData={this.getWishData.bind(this)} wishList={this.state.wishList} userId={this.state.userId} categories={this.state.categories}/>
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

const mapStateToProps = (state) => {
  // console.log("Name serarch state==>",state.searchText);
  return {
      searchText: state.searchText,
  }
};
export default connect(mapStateToProps)(Dashboard);
