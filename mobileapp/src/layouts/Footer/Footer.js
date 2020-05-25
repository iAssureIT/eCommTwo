import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import {  Icon ,SearchBar  } from 'react-native-elements';
import ValidationComponent from "react-native-form-validator";
import styles from "./styles.js";
import {colors} from '../../config/styles.js';
import Search from 'react-native-search-box';
import axios                      from 'axios';


export default  class Footer extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText:'',
      getCartCountData:''
    }
  }

  _goBack = () =>{
    this.props.goBack();
  }
  
  UNSAFE_componentWillMount() {
   
  }

    handleNavigation = (screen) =>{
      this.props.navigate(screen);

  }


  componentDidMount(){
     // const user_ID    = this.props.navigation.getParam('user_ID','No user_ID');
      this.setState({
       // user_ID    : user_ID,
       
        },()=>{ 
          // this.focusListener = this.props.navigation.addListener('didFocus', () => {
          this.getCartCount();
      /*})*/
    })
    
  }

  getCartCount(){
    axios.get("/api/Carts/get/count/"+this.state.user_ID)
    .then((response)=>{
      console.log("this.state.user_ID ============== ",this.state.user_ID);
      console.log("response.data getCartCountData =========>", response.data);
      this.setState({
        getCartCountData: response.data,    
      })
    }) 
    .catch((error)=>{
      // console.log('error', error);
    })
  }


  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if(nextProps){
      this.setState({
        count:parseInt(nextProps.count)
      })
    }
  }
  updateSearch = searchText => {
    this.setState({ searchText });
  };

  componentWillUnmount() {
  }

  _goBack = () => {
    this.props.goBack();
  };

  render() {
    return (
     <View>
          <View  style={styles.footer}>
               <View style={{flexDirection:'row',flex:1}}>
                    <View style={styles.iconOuterWrapper}>
                         <Icon name="home" type="feather" size={25}  color="#666"/>   
                         <Text style={styles.footerTitle}>Home</Text>
                    </View>

                    <View>
                     <View style={styles.Wrapper}>
                          <TouchableOpacity >
                               <View style={styles.outerWrapper}>
                                    <Icon name="shopping-cart" type="feather" size={20}  color="#fff"/>
                               </View>
                          </TouchableOpacity>
                     </View>
                    </View>

                    <View style={styles.iconOuterWrapper2}>
                         <Icon name="bookmark-o" type="font-awesome" size={20}  color="#666"/>
                         <Text style={styles.footerTitle}>Wishlist</Text>
                    </View>
               </View>
          </View>
     </View>
      
    );
  }
}
