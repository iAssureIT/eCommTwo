
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  AsyncStorage,
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
import { Header, Button, Icon, SearchBar,CheckBox } from "react-native-elements";
import SideMenu from 'react-native-side-menu';
import StarRating from 'react-native-star-rating';
import axios from "axios";
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
// import Footer from '../../ScreenComponents/Footer/Footer.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import Notification from '../../ScreenComponents/Notification/Notification.js'
// import styles from './AccountDashboardstyles.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/AccountDashboardstyles';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';


export default class AccountDashboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
        inputFocusColor       : colors.textLight,
        isOpen: false,
        starCount: 2.5,
      
    };
  }
  componentDidMount() {
    AsyncStorage.multiGet(['user_id', 'token'])
      .then((data) => {
        userId = data[0][1]
        console.log('userId on Dashboard===>', userId);
        this.setState({
          userId : userId
      },()=>{
        axios.get('/api/users/get/' + this.state.userId)
        .then((res) => {
          console.log("res.data.image==>", res.data);
          this.setState({
            fullName: res.data.fullName,
            username: res.data.email,
            dAddress: res.data.deliveryAddress[0].addressLine1,
            mobNumber: res.data.mobile,
            profileImage: res.data.image,
            companyID: res.data.companyID
          })
        })
        .catch((error) => {
        });
      })

      })
      .catch((error) => {
        console.log('error', error);
      })

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

   

  render(){

    const { navigate,goBack } = this.props.navigation;
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
                goBack={goBack}
                headerTitle={ 'Account Dashboard'}
                navigate={navigate}
                toggle={()=>this.toggle.bind(this)} 
                openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={styles.acdashsuperparent}>
              <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
                <View style={styles.acdashparent}>
                  
                  <View style={styles.accuserinfo}>
                    <View style={styles.padhr15}>
                    <Text style={styles.acccontactinfo}>User Information</Text>
                    </View>
                    {/* <View style={styles.accnameuser}>
                      <Text style={styles.accusername}> {this.state.fullName} {"\n"} {this.state.username}</Text>
                    </View> */}
                     <View style={styles.padhr18}> 
                      {/* <Text style={styles.accuseraddress}> 323 Amanora Chambers, Amanora Mall,Hadapsar,Pune,411028 Maharashtra uygfewuafyrfuyeuwefegfuyegfuwgefwyegfyuwegfyugewfyuwe jhfjwfwegfw hfuwehuiwef efwfuwehfuw</Text>  */}
                      <View style={styles.accusermobinfo}>
                        <Text style={styles.accusermob}>Your Name:</Text>
                        <Text style={styles.accmobnumber}>: {this.state.fullName}</Text>
                      </View>
                    </View>
                     <View style={styles.padhr18}> 
                      {/* <Text style={styles.accuseraddress}> 323 Amanora Chambers, Amanora Mall,Hadapsar,Pune,411028 Maharashtra uygfewuafyrfuyeuwefegfuyegfuwgefwyegfyuwegfyugewfyuwe jhfjwfwegfw hfuwehuiwef efwfuwehfuw</Text>  */}
                      <View style={styles.accusermobinfo}>
                        <Text style={styles.accusermob}>Your Address</Text>
                        <Text style={styles.accmobnumber}>: {this.state.dAddress } </Text> 
                      </View>
                    </View>
                    <View style={styles.padhr18}>
                    <View style={styles.accusermobinfo}>
                      <Text style={styles.accusermob}>Mobile:</Text>
                      <Text style={styles.accmobnumber}>: {this.state.mobNumber}</Text>
                    </View>
                    </View>
                    <View style={styles.acceditbtn}>
                      <View style={styles.acceditbtns}>
                        <TouchableOpacity>
                          <Button
                          onPress={()=>this.props.navigation.navigate('AccountInformation')}
                          title={"EDIT"}
                          buttonStyle={styles.buttonORANGE}
                          titleStyle={styles.buttonTextEDIT}
                          containerStyle={styles.buttonContainerEDIT}
                          />
                      </TouchableOpacity>
                      </View>
                    </View> 
                  </View>
                  {/* <View style={{backgroundColor:'#fff',marginTop:0,marginBottom:15,}}>
                    <View style={{paddingHorizontal:15}}>
                    <Text style={{paddingHorizontal:18,fontSize:13,fontFamily:"Montserrat-SemiBold",textAlign:'center',paddingVertical:10,marginTop:15,backgroundColor:'#f1f1f1',borderWidth:1,borderColor:'#f1f1f1'}}>Default Shipping Address</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingHorizontal:15,paddingVertical:10}}>
                      <Text style={{flex:0.7,fontSize:13,fontFamily:"Montserrat-SemiBold",marginTop:15}}> Garima Billore</Text>
                      <Text style={{flex:0.3,alignItem:'flex-end',marginTop:10,paddingTop:8,textAlign:'center',backgroundColor:'#f1f1f1',height:35,color:'#333',borderWidth:1,borderColor:'#f1f1f1',borderRadius:3,fontSize:12,fontFamily:"Montserrat-SemiBold",}}> OFFICE </Text>
                    </View>
                    <View style={{paddingHorizontal:18}}>
                    <Text style={{fontSize:12,fontFamily:"Montserrat-Regular",color:'#666'}}> 323 Amanora Chambers, Amanora Mall,Hadapsar,Pune,411028 Maharashtra uygfewuafyrfuyeuwefegfuyegfuwgefwyegfyuwegfyugewfyuwe jhfjwfwegfw hfuwehuiwef efwfuwehfuw</Text> 
                    <View style={{flexDirection:'row',marginTop:15}}>
                      <Text style={{flex:0.2,fontSize:13,fontFamily:"Montserrat-Regular",color:'#666'}}>Mobile:</Text>
                      <Text style={{flex:0.4,fontSize:13,fontFamily:"Montserrat-SemiBold",color:'#333'}}>79989846513</Text>
                    </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:15}}>
                      <View style={{flex:0.5,paddingHorizontal:15,}}>
                        <TouchableOpacity>
                          <Button
                          onPress={()=>this.props.navigation.navigate('AddressComponent')}
                          title={"EDIT"}
                          buttonStyle={styles.buttonORANGE}
                          titleStyle={styles.buttonTextEDIT}
                          containerStyle={styles.buttonContainerEDIT}
                          />
                      </TouchableOpacity>
                      </View>
                    </View> 
                  </View> */}
                 
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



