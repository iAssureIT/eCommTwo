
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
import StepIndicator from 'react-native-step-indicator';
import Menu from '../../layouts/Menu/Menu.js';
import HeaderBar5 from '../../layouts/HeaderBar5/HeaderBar5.js';
import Footer from '../../layouts/Footer/Footer.js';
import Notification from '../../layouts/Notification/Notification.js'
import styles from './styles.js';
import {colors} from '../../config/styles.js';
import Loading from '../../layouts/Loading/Loading.js';
const window = Dimensions.get('window');

const labels = ["Order Placed","Out for delivery","In transition","Delivered"];
const dateTime =['13/12/2019 12:48 pm'];
const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#eea236',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#eea236',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#eea236',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#eea236',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  labelFontFamily: 'OpenSans-Italic',
  currentStepLabelColor: '#eea236'
}
export default class MyOrder extends React.Component{
  constructor(props){
    super(props);
    this.state={
        inputFocusColor  : colors.textLight,
        isOpen           : false,
        currentPosition  : 0,
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

  handleZipChange(value){
    let x = value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,4})/);
    let y = !x[2] ? x[1] : x[1]+'-'+x[2];
    this.setState({
      zipcode : y,
    });
  }

  handleDelete = (id) => {
    Alert.alert("", "Are you sure you want to delete ?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          this.deleteCompetitor(id);
        }
      },
    ]);
  };

  deleteCompetitor(id){
    console.log("id = ",id);
    Meteor.call('deleteCompetitor',id,(err,res)=>{
      if(err){

      }else{
        Alert.alert('','Competitor has been deleted');
      }
    });
  }

  onPageChange(position){
    this.setState({currentPosition: position});
  }

  searchUpdated(text){
    this.setState({ searchText: text });
  }

  render(){

    const { navigate,dispatch ,goBack} = this.props.navigation;
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
            <HeaderBar5
                goBack ={goBack}
                navigate={navigate}
                headerTitle={"My Orders"}
                toggle={()=>this.toggle.bind(this)} 
                openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
              <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View  style={styles.formWrapper}>
                <View style={{flex:1,marginBottom:'30%'}}>
                  <View style={{flex:1,backgroundColor:'#fff',marginTop:15,paddingHorizontal:15,paddingVertical:15,borderWidth:1,borderColor:'#f1f1f1',paddingBottom:'10%'}}>
                    <View style={{flex:0.1,backgroundColor:'#F1F1F1',borderWidth:1,borderColor:'#F1F1F1',paddingHorizontal:10,paddingVertical:5}}><Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold", color:'#333',paddingTop:3}}>Order ID : 1256484848</Text></View>
                    <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',marginTop:15}}>Women Red Solid Fit and Flare Dress</Text>
                            <View style={{flexDirection:'row',flex:0.5,marginTop:15}}>
                        <View style={{flex:0.3}}>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Color</Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Size</Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Quantity</Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Seller</Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Price</Text> 
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',paddingVertical:5}}>Discount Price</Text>
                        </View>
                        <View style={{flex:0.3}}>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',paddingVertical:5}}>Red</Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',paddingVertical:5}}> M </Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',paddingVertical:5}}> 2 </Text>
                          <Text  style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',paddingVertical:5}}> Kuki </Text>
                         <View style={{flexDirection:'row',marginRight:10,marginTop:5}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333"
                            iconStyle={{marginTop:5,marginRight:5,}}
                            />
                            <Text style={{textDecorationLine: 'line-through',fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#333'}}>3,140</Text>
                        </View>
                        <View style={{flexDirection:'row',marginRight:10,marginTop:10}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#388e3c"
                            iconStyle={{marginTop:5,marginRight:5,}}
                            />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#388e3c'}}>3,140</Text>
                        </View>
                        </View>
                        <View style={{flex:0.4,backgroundColor:'#f1f1f1',borderWidth:1,borderColor:'#f1f1f1',height:150,}}>
                           <Image
                            style={{width: "100%",height:150}}
                            source= {require("../../images/15.png")}
                          />
                        </View>
                      </View>
                      
                  <View style={{backgroundColor:'#fff',marginTop:15,paddingHorizontal:15,paddingVertical:15,borderWidth:1,borderColor:'#f1f1f1',    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1,}}>
                  <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#666',marginBottom:15}}>Order Status</Text>
                  <StepIndicator
                       customStyles={thirdIndicatorStyles}
                       currentPosition={this.state.currentPosition}
                       labels={labels}
                       dateTime={dateTime}
                       stepCount={4}
                  />
                  </View>
                  <View  style={{flexDirection:'row',marginTop:20,paddingRight:10}}>
                              <View style={{flex:0.5,marginRight:10,borderRadius:3,shadowColor: '#fff',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                // shadowRadius: 2,
                                elevation: 5,}}>
                              <TouchableOpacity>
                                <Button
                                  titleStyle={styles.buttonText}
                                  title="CANCEL"
                                  buttonStyle={styles.buttonRED}
                                  containerStyle={styles.buttonContainer2}
                                />
                              </TouchableOpacity>
                              </View>
                            <View style={{flex:0.5,borderRadius:3,shadowColor: '#fff',
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.2,
                              shadowRadius: 2,
                              elevation: 5,}}>
                              <TouchableOpacity>
                                <Button
                                  onPress={()=>this.props.navigation.navigate('OrderDetails')}
                                  titleStyle={styles.buttonText1}
                                  title="ORDER DETAILS"
                                  buttonStyle={styles.buttonORANGE}
                                  containerStyle={styles.buttonContainer2}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                  </View>
                </View>
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



