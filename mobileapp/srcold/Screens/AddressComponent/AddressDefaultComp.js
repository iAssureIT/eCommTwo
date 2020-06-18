
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
  Keyboard,
  AsyncStorage
} from 'react-native';
// import RadioButton from 'react-native-radio-button';
// import RadioForm from 'react-native-simple-radio-button';
// import {RadioGroup, RadioButton} from 'react-native-custom-radio-button'

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
// import styles from './Addressstyles.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Addressstyles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import ConfirmOrderComponent from '../ConfirmOrderComponent/ConfirmOrderComponent.js';

export default class AddressDefaultComp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      	inputFocusColor       : colors.textLight,
      	isOpen: false,
        starCount: 2.5,
        isSelected: "",
        isSelected:false,
        isChecked: false,
  	  
    };
  }
componentDidMount(){
  const user_ID       = this.props.navigation.getParam('user_ID','No user_ID');
  AsyncStorage.multiGet(['token', 'user_id'])
  .then((data) => {
    console.log("user_id ===>>", data[1][1]);
    this.setState({ user_id: data[1][1] })
    axios.get('/api/ecommusers/'+data[1][1])
    .then((response) => {
      console.log("response LIst:==>>>", response.data.deliveryAddress);
      var Deliveryaddress = response.data.deliveryAddress
      this.setState({ Deliveryaddress: Deliveryaddress })
    })
    .catch((error) => {
      console.log('error', error)
    });
  });
  
  this.getaddresslist();
}
getaddresslist(){
AsyncStorage.multiGet(['token', 'user_id'])
.then((data) => {
  console.log("user_id ===>>", data[1][1]);
  this.setState({ user_id: data[1][1] })
  axios.get('/api/ecommusers/'+data[1][1])
  .then((response) => {
    console.log("response LIst:==>>>", response.data.deliveryAddress);
    var Deliveryaddress = response.data.deliveryAddress
    this.setState({ Deliveryaddress: Deliveryaddress })
  })
  .catch((error) => {
    console.log('error', error)
  });
});
}
componentWillReceiveProps(){
  AsyncStorage.multiGet(['token', 'user_id'])
  .then((data) => {
    console.log("user_id ===>>", data[1][1]);
    this.setState({ user_id: data[1][1] })
    axios.get('/api/ecommusers/'+data[1][1])
    .then((response) => {
      console.log("response LIst:==>>>", response.data.deliveryAddress);
      var Deliveryaddress = response.data.deliveryAddress
      this.setState({ Deliveryaddress: Deliveryaddress })
    })
    .catch((error) => {
      console.log('error', error)
    });
  });
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

  Deleteaddress(deliveryAddressID){
    console.log("this.state.user_id Deleted address:==>>>", this.state.user_id);
    console.log("this.deliveryAddressID:==>>>", deliveryAddressID);
    var formValues = {
      user_ID : this.state.user_id,
      deliveryAddressID : deliveryAddressID
  }
  axios.patch('/api/users/delete/address', formValues)
    .then((response) => {
      console.log("response LIst:==>>>", response.data);
      Alert.alert(
        "Address Deleted",
        "",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      this.getaddresslist();
    })
    .catch((error) => {
      console.log('error', error)
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
  selectedaddress(id,adddata){
    let isChecked = !this.state.isChecked;
    this.setState({ isChecked })
    console.log("id = ",id);
    console.log("adddata = ",adddata);
    this.setState({
      // isChecked: true,
      addressid   : id,
      adddata : adddata,
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
        <React.Fragment>
            <HeaderBar5
                goBack={goBack}
                headerTitle={ 'Delivery Address'}
            	  navigate={navigate}
              	toggle={()=>this.toggle.bind(this)} 
              	openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={styles.addsuperparent}>
            	<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              	<View style={styles.padhr15}>
                  <View style={styles.addcmpbtn}>
                    <TouchableOpacity >
                      <Button
                      onPress={()=>this.props.navigation.navigate('AddressComponent')}
                      title={"ADD NEW ADDRESS"}
                      buttonStyle={styles.button1}
                      containerStyle={styles.buttonContainer1}
                      titleStyle={styles.buttonTextEDIT}
                      />
                    </TouchableOpacity>
                  </View>
                  {
                    this.state.Deliveryaddress ?
                    this.state.Deliveryaddress && this.state.Deliveryaddress.map((item,i)=>{
                      console.log("ITEM Address ==>",item);
                      return(
                    <View key={i} style={styles.addcmpchkbx}>
                        <View style={styles.addchkbx}>
                        <View style={styles.chkvw}>
                          {/* <CheckBox
                              onPress={()=>this.selectedaddress(item._id,item)}
                              checkedIcon='dot-circle-o'
                              uncheckedIcon='circle-o'
                              checked={this.state.checked}
                              containerStyle={{borderWidth:0}}
                            />  */}
                                <CheckBox
                                  style={{ flex: 1, padding: 0 }}
                                  checkBoxColor={"red"}
                                  // onClick={this.checkboxClick}
                                  isChecked={this.state.isChecked}
                                  onPress={()=>this.selectedaddress(item._id,item)}
                                />
                            {/* <RadioButton
                              animation={'bounceIn'}
                              isSelected={false}
                              outerColor ={"#80c21c"}
                              innerColor ={"#80c21c"}
                              onPress={()=>this.selectedaddress(item._id,item)}
                            />  */}
                          
                          </View>
                          <View style={styles.nameofcontact}>
                            <Text style={styles.addname}> {item.name}</Text>
                          </View>

                          <View style={styles.proddeletes}>
                              <Icon
                              name="edit"
                              type="AntDesign"
                              size={18}
                              color="#80c21c"
                              iconStyle={styles.iconstyle}
                              />
                          </View>
                          <View style={styles.proddeletes}>
                              <Icon
                              onPress={()=>this.Deleteaddress(item._id)}
                              name="delete"
                              type="AntDesign"
                              size={18}
                              color="#ff4444"
                              iconStyle={styles.iconstyle}
                              />
                          </View>
                        </View>
                        <View style={styles.padhr18}>
                          <Text style={styles.address}>{item.addressLine1}</Text> 
                          <View style={styles.mobflx}>
                            <Text style={styles.mobileno}>Mobile:</Text>
                            <Text style={styles.mobilenum}>{item.mobileNumber}</Text>
                          </View>
                        </View>
                    
                    </View>
                     )
                    })
                    :
                    <View style={styles.addcmpchkbx}>
                      <View style={styles.addchkbx}>
                        <Text style={styles.addnotfound}>Address Not Found:</Text>
                      </View>
                    </View>
                  }
                    <View style={styles.continuebtn}>
                    {
                    this.state.addressid  ?
                    <TouchableOpacity >
                      <Button
                      onPress={()=>this.props.navigation.navigate('OrderSummary',{adddata:this.state.adddata,user_id:this.state.user_id})}
                      title={"CONTINUE"}
                      buttonStyle={styles.button1}
                      containerStyle={styles.buttonContainer1}
                      titleStyle={styles.buttonTextEDIT}
                      />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity >
                      <Button
                      title={"CONTINUE"}
                      buttonStyle={styles.buttondis}
                      containerStyle={styles.buttonContainer1}
                      titleStyle={styles.buttonTextEDIT}
                      />
                    </TouchableOpacity>
                    }
                  </View>
                </View>
            	</ScrollView>
            	<Footer/>
            </View>
          </React.Fragment>
      );  
    }
  }
}



