
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

export default class OrderDetails extends React.Component{
  constructor(props){
    super(props);
    this.state={
        inputFocusColor  : colors.textLight,
        isOpen           : false,
        currentPosition  : 0,
    };
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
                headerTitle={"Order Details"}
                toggle={()=>this.toggle.bind(this)} 
                openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
              <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View  style={styles.formWrapper}>
                <View style={{flex:1,marginBottom:"30%"}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:13,fontFamily:"Montserrat-Regular", color:'#666',paddingVertical:5}}>Placed On : </Text><Text  style={{fontSize:13,fontFamily:"Montserrat-Regular", color:'#333',paddingVertical:5}}>13 Dec 2019</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:13,fontFamily:"Montserrat-Regular", color:'#666',paddingVertical:5}}>Order no : </Text><Text  style={{fontSize:13,fontFamily:"Montserrat-Regular", color:'#333',paddingVertical:5}}>1365646486</Text>
                  </View>
                  <View style={{borderWidth:1,borderColor:'#ccc',width:'50%',alignSelf:"center",marginVertical:15}}></View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:13,fontFamily:"Montserrat-Regular", color:'#666',marginBottom:20}}>Price Details : </Text>
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{flex:0.5,}}>
                        <Text style={{fontSize:13,fontFamily:"Montserrat-Regular", color:'#666',alignSelf:'flex-start'}}>MRP : </Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <View style={{flexDirection:'row',marginRight:10}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333"
                            iconStyle={{marginTop:5,marginRight:5,}}
                            />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-Regular",color:'#333'}}>3,140</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <View style={{flex:0.5,}}>
                        <Text style={{fontSize:13,fontFamily:"Montserrat-Regular", color:'#666',alignSelf:'flex-start'}}>Shipping Charges : </Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <View style={{flexDirection:'row',marginRight:10}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333"
                            iconStyle={{marginTop:5,marginRight:5,}}
                            />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-Regular",color:'#333'}}>140</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <View style={{flex:0.5,}}>
                        <Text style={{fontSize:13,fontFamily:"Montserrat-Regular", color:'#666',alignSelf:'flex-start'}}>Item Discount : </Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <View style={{flexDirection:'row',marginRight:10}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333"
                            iconStyle={{marginTop:5,marginRight:5,}}
                            />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-Regular",color:'#333'}}>145</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <View style={{flex:0.5,}}>
                        <Text style={{fontSize:13,fontFamily:"Montserrat-Regular", color:'#666',alignSelf:'flex-start'}}>Cash On Delivery : </Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <View style={{flexDirection:'row',marginRight:10}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333"
                            iconStyle={{marginTop:5,marginRight:5,}}
                            />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-Regular",color:'#333'}}>1402</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{borderWidth:1,borderColor:'#ccc',width:'50%',alignSelf:"center",marginVertical:10}}></View>
                    <View style={{flexDirection:'row'}}>
                      <View style={{flex:0.5,}}>
                        <Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold", color:'#333',alignSelf:'flex-start'}}>Total : </Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <View style={{flexDirection:'row',marginRight:10}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333u"
                            iconStyle={{marginTop:5,marginRight:5,}}
                            />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#333'}}>1402666</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{borderWidth:1,borderColor:'#ccc',width:'100%',alignSelf:"center",marginVertical:15}}></View>
                    <View>
                      <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>Update Sent to :</Text>
                      <View style={{flexDirection:'row',marginRight:10,marginVertical:10}}>
                            <Icon
                            name="phone"
                            type="feather"
                            size={15}
                            color="#333u"
                            iconStyle={{marginRight:5,}}
                            />
                            <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>8989667765</Text>
                      </View>
                      <View style={{flexDirection:'row',marginRight:10}}>
                            <Icon
                            name="email-outline"
                            type="material-community"
                            size={15}
                            color="#333u"
                            iconStyle={{marginTop:3,marginRight:5,}}
                            />
                            <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>garimabillore@gmail.com</Text>
                        </View>
                    </View>
                    <View style={{borderWidth:1,borderColor:'#ccc',width:'100%',alignSelf:"center",marginVertical:15}}></View>
                    <View>
                      <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>Shipping Address :</Text>
                      <Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold",color:'#333',marginVertical:5}}>Garima Billore </Text>
                      <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>323 Amanora Chambers, Amanora Mall, Hadapsar, Pune - 411028</Text>
                    </View>
                    <View style={{borderWidth:1,borderColor:'#ccc',width:'100%',alignSelf:"center",marginVertical:15}}></View>
                    <View style={{}}>
                      <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>Payment Mode :</Text>
                      <Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold",color:'#333',marginVertical:5}}>Cash On Delivery </Text>
                      
                    </View>
                    <View style={{flex:1,borderWidth:1,borderColor:'#f1f1f1',backgroundColor:'#ccc',paddingVertical:15}}>
                      <Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold",color:'#333',paddingHorizontal:5}}>Item in this order</Text>                
                    </View>
                    <View style={{flex:1,flexDirection:'row',backgroundColor:'#fff',borderWidth:1,borderColor:'#f1f1f1',marginTop:15}}>
                        <View style={{flex:0.4,backgroundColor:'#f1f1f1',borderWidth:1,borderColor:'#f1f1f1',height:150,}}>
                           <Image
                            style={{width: "100%",height:150}}
                            source= {require("../../images/15.png")}
                          />
                        </View>
                        <View style={{flex:0.8,backgroundColor:'#f1f1f1',borderWidth:1,borderColor:'#f1f1f1',paddingHorizontal:15}}>
                            <Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold",color:'#333'}}>Kuki Fashion</Text>
                            <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>Women Red Solid Fit & Fla.....</Text>
                            <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>Size :38 </Text>
                            <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>Qty : 1</Text>
                            <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>Color : Red</Text>
                            <View style={{flexDirection:'row',marginRight:10}}>
                              <Icon
                              name="rupee"
                              type="font-awesome"
                              size={15}
                              color="#333"
                              iconStyle={{marginTop:5,marginRight:5,}}
                              />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#333'}}>1402.00</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                          <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#c10000',marginRight:10}}>Cancelled</Text>
                          <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#333'}}>(Dec 13,2019)</Text>
                        </View>
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



