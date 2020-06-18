
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
import Notification from '../../ScreenComponents/Notification/Notification.js'
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/MyOrdersstyles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
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
            <View style={styles.superparent}>
              <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View  style={styles.formWrapper}>
                <View style={styles.placeonvw}>
                  <View style={styles.flxdir}>
                    <Text style={styles.placeon}>Placed On : </Text><Text  style={styles.ordernum}>13 Dec 2019</Text>
                  </View>
                  <View style={styles.flxdir}>
                    <Text style={styles.placeon}>Order no : </Text><Text  style={styles.ordernum}>1365646486</Text>
                  </View>
                  <View style={styles.pricedetsvw}></View>
                  <View style={styles.flxdir}>
                    <Text style={styles.pricedets}>Price Details : </Text>
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <View style={styles.flxdir}>
                      <View style={styles.flx5}>
                        <Text style={styles.mrp}>MRP : </Text>
                      </View>
                      <View style={styles.flx5}>
                        <View style={styles.pricecount}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333"
                            iconStyle={styles.iconrps}
                            />
                            <Text style={styles.priceon}>3,140</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.flxdir}>
                      <View style={styles.flx5}>
                        <Text style={styles.mrp}>Shipping Charges : </Text>
                      </View>
                      <View style={styles.flx5}>
                        <View style={{flexDirection:'row',marginRight:10}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333"
                            iconStyle={styles.iconrps}
                            />
                            <Text style={styles.priceon}>140</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.flxdir}>
                      <View style={styles.flx5}>
                        <Text style={styles.mrp}>Item Discount : </Text>
                      </View>
                      <View style={styles.flx5}>
                        <View style={{flexDirection:'row',marginRight:10}}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333"
                            iconStyle={styles.iconrps}
                            />
                            <Text style={styles.priceon}>145</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.flxdir}>
                      <View style={styles.flxdir}>
                        <Text style={styles.mrp}>Cash On Delivery : </Text>
                      </View>
                      <View style={styles.flxdir}>
                        <View style={styles.pricecount}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333"
                            iconStyle={styles.iconrps}
                            />
                            <Text style={styles.priceon}>1402</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{borderWidth:1,borderColor:'#ccc',width:'50%',alignSelf:"center",marginVertical:10}}></View>
                    <View style={styles.flxdir}>
                      <View style={styles.flx5}>
                        <Text style={styles.total}>Total : </Text>
                      </View>
                      <View style={styles.flx5}>
                        <View style={styles.pricecount}>
                            <Icon
                            name="rupee"
                            type="font-awesome"
                            size={15}
                            color="#333u"
                            iconStyle={styles.iconrps}
                            />
                            <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#333'}}>1402666</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{borderWidth:1,borderColor:'#ccc',width:'100%',alignSelf:"center",marginVertical:15}}></View>
                    <View>
                      <Text style={styles.updatenum}>Update Sent to :</Text>
                      <View style={{flexDirection:'row',marginRight:10,marginVertical:10}}>
                            <Icon
                            name="phone"
                            type="feather"
                            size={15}
                            color="#333u"
                            iconStyle={{marginRight:5,}}
                            />
                            <Text style={{}}>8989667765</Text>
                      </View>
                      <View style={styles.pricecount}>
                            <Icon
                            name="email-outline"
                            type="material-community"
                            size={15}
                            color="#333u"
                            iconStyle={styles.emailicn}
                            />
                            <Text style={styles.updatenum}>garimabillore@gmail.com</Text>
                        </View>
                    </View>
                    <View style={styles.outervw}></View>
                    <View>
                      <Text style={styles.commonadd}>Shipping Address :</Text>
                      <Text style={styles.namefordelivery}>Garima Billore </Text>
                      <Text style={styles.commonadd}>323 Amanora Chambers, Amanora Mall, Hadapsar, Pune - 411028</Text>
                    </View>
                    <View style={styles.outervw}></View>
                    <View style={{}}>
                      <Text style={styles.commonadd}>Payment Mode :</Text>
                      <Text style={styles.namefordelivery}>Cash On Delivery </Text>
                      
                    </View>
                    <View style={styles.itemordervw}>
                      <Text style={styles.itemorder}>Item in this order</Text>                
                    </View>
                    <View style={styles.itemoutervw}>
                        <View style={styles.imgvw}>
                           <Image
                            style={styles.img15}
                            source= {require("../../AppDesigns/currentApp/images/15.png")}
                          />
                        </View>
                        <View style={styles.productqtyty}>
                            <Text style={styles.fashion}>Kuki Fashion</Text>
                            <Text style={styles.commonadd}>Women Red Solid Fit & Fla.....</Text>
                            <Text style={styles.commonadd}>Size :38 </Text>
                            <Text style={styles.commonadd}>Qty : 1</Text>
                            <Text style={styles.commonadd}>Color : Red</Text>
                            <View style={styles.pricecount}>
                              <Icon
                              name="rupee"
                              type="font-awesome"
                              size={15}
                              color="#333"
                              iconStyle={styles.iconrps}
                              />
                            <Text style={styles.pricendate}>1402.00</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                          <Text style={styles.cacelled}>Cancelled</Text>
                          <Text style={styles.pricendate}>(Dec 13,2019)</Text>
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



