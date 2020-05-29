
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
import styles from './styles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
const window = Dimensions.get('window');

export default class ConfirmOrderComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      	inputFocusColor       : colors.textLight,
      	isOpen: false,
  	};
  }

  componentWillReceiveProps(nextProps){
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  displayValidationError = (errorField) =>{
    let error = null;
    if(this.state[errorField]){
      error = <View style={{width:'100%'}}>
                <Text style={{color:'#dc3545'}}>{this.state[errorField][0]}</Text>
              </View> ;
    }
    return error;
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


  render(){

    // const { goBack,navigate } = this.props.navigation;
    // const menu = <Menu navigate={navigate} isOpen={this.state.isOpen}/>;

    if(this.props.loading){
      return(
        <Loading />
      );
    }else{
      return (
    
            <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
            	
              		<View  style={styles.formWrapper}>
               			<View style={{ backgroundColor:'#fff',paddingHorizontal:10,paddingVertical:15,}}>
                      <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333'}}>Women Red Solid Fit and Flare Dress</Text>
                      <View style={{flexDirection:'row',flex:0.5,marginTop:15}}>
                        <View style={{flex:0.3}}>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Color</Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Size</Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Quantity</Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Seller</Text>
                          <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Price</Text> 
                        </View>
                        <View style={{flex:0.3}}>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',paddingVertical:5}}>Red</Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',paddingVertical:5}}> M </Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',paddingVertical:5}}> 2 </Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',paddingVertical:5}}> Kuki </Text>
                         <View style={{flexDirection:'row',marginRight:10}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#c10000"
                            iconStyle={{marginTop:5,marginRight:5,}}
                            />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#c10000'}}>3,140</Text>
                        </View>
                        </View>
                        <View style={{flex:0.4,backgroundColor:'#f1f1f1',borderWidth:1,borderColor:'#f1f1f1',height:150,}}>
                           <Image
                            style={{width: "100%",height:150}}
                            source= {require("../../AppDesigns/currentApp/images/15.png")}
                          />
                        </View>
                      </View>
                    <View style={{backgroundColor:'#f1f1f1',borderWidth:1,borderColor:'#f1f1f1',height:45,marginTop:'5%'}}>
                      <Text style={{textAlign:'center',marginTop:10,fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333'}}>Delivery by, Mon Sep 1</Text>
                    </View>
                    <View>
                    </View>
                    </View>
                  </View>
                </View>
           
        
      );  
    }
  }
}



