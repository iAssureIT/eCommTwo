
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
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
import Footer from '../../ScreenComponents/Footer/Footer.js';
import Notification from '../../ScreenComponents/Notification/Notification.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/MyOrdersstyles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
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
            <View style={styles.superparent}>
              <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View  style={styles.formWrapper}>
                <View style={styles.parent}>
                  <View style={styles.prodinfoparent}>
                    <View style={styles.orderid}>
                    <Text style={styles.orderidinfo}>Order ID : 1256484848</Text></View>
                    <Text style={styles.orderdets}>Women Red Solid Fit and Flare Dress</Text>
                      <View style={styles.prodorderdets}>
                        <View style={styles.flx3}>
                          <Text  style={styles.proddets}>Color</Text>
                          <Text  style={styles.proddets}>Size</Text>
                          <Text  style={styles.proddets}>Quantity</Text>
                          <Text  style={styles.proddets}>Seller</Text>
                          <Text  style={styles.proddets}>Price</Text> 
                          <Text  style={styles.proddets}>Discount Price</Text>
                        </View>
                        <View style={styles.flx3}>
                          <Text  style={styles.prodinfo}>Red</Text>
                          <Text  style={styles.prodinfo}> M </Text>
                          <Text  style={styles.prodinfo}> 2 </Text>
                          <Text  style={styles.prodinfo}> Kuki </Text>
                         <View style={styles.prodrps}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333"
                            iconStyle={styles.iconrps}
                            />
                            <Text style={styles.price}>3,140</Text>
                        </View>
                        <View style={{flexDirection:'row',marginRight:10,marginTop:10}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#388e3c"
                            iconStyle={styles.iconrps}
                            />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#388e3c'}}>3,140</Text>
                        </View>
                        </View>
                        <View style={styles.imgvw}>
                           <Image
                            style={styles.img15}
                            source= {require("../../AppDesigns/currentApp/images/15.png")}
                          />
                        </View>
                      </View>
                      
                  <View style={styles.orderstatus}>
                  <Text style={styles.orderstatustxt}>Order Status</Text>
                  <StepIndicator
                       customStyles={thirdIndicatorStyles}
                       currentPosition={this.state.currentPosition}
                       labels={labels}
                       dateTime={dateTime}
                       stepCount={4}
                  />
                  </View>
                  <View  style={styles.cancelbtn}>
                              <View style={styles.cancelvwbtn}>
                              <TouchableOpacity>
                                <Button
                                  titleStyle={styles.buttonText}
                                  title="CANCEL"
                                  buttonStyle={styles.buttonRED}
                                  containerStyle={styles.buttonContainer2}
                                />
                              </TouchableOpacity>
                              </View>
                            <View style={styles.ordervwbtn}>
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



