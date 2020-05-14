
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
import { Header, Button, Icon, SearchBar,Rating, AirbnbRating } from "react-native-elements";
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

export default class MyProductReview extends React.Component{
  constructor(props){
    super(props);
    this.state={
        inputFocusColor  : colors.textLight,
        isOpen           : false,
        currentPosition  : 0,
        rating           : 3, 
    };
    this.ratingCompleted = this.ratingCompleted.bind(this);
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

   ratingCompleted(rating) {
    // console.log("Rating is: " + rating);
    this.setState({
      rating : rating
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
                headerTitle={"Product Reviews"}
                toggle={()=>this.toggle.bind(this)} 
                openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
              <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View  style={styles.formWrapper}>
                <View style={{flex:1,marginBottom:'30%'}}>
                  <View style={{backgroundColor:'#fff',marginTop:15,paddingHorizontal:15,borderWidth:1,borderColor:'#f1f1f1',paddingBottom:'10%'}}>
                      <View style={{flexDirection:'row',marginTop:15}}>
                        <View style={{flex:0.3,backgroundColor:'#f1f1f1',borderWidth:1,borderColor:'#f1f1f1',height:150,marginRight:10}}>
                           <Image
                            style={{width: "100%",height:150}}
                            source= {require("../../images/15.png")}
                          />
                        </View>
                        <View style={{flex:0.5,}}>
                          <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',marginBottom:10}}>Women Red Solid Fit and Flare Dress</Text>
                          <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',marginBottom:10}}>By Garima Billore</Text>
                          <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',marginBottom:0}}>29-11-2019</Text>
                          <View style={{alignSelf:'flex-start',marginTop:-45,}}>
                           <AirbnbRating
                            count          = {5}
                            reviews        = {[]}
                            defaultRating  = {this.state.ratin}
                            startingValue  = {this.state.rating}
                            size           = {20}
                            isDisabled     = {true}
                            onFinishRating = {this.ratingCompleted}
                          />
                          </View>
                        </View>
                        <View style={{flex:0.2,}}>
                         <View style={{alignSelf:'flex-end',backgroundColor:"#f1f1f1",borderRadius:5,padding:10,overflow:'hidden'}}>
                            <Icon size={18} name='edit' type='font-awesome' color='#333' style={{}}/>
                          </View>
                        </View>

                      </View>
                      <View style={{flex:1,marginTop:15}}>
                        <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold", color:'#333',flexWrap:'wrap'}}>The Women Red Solid Fit and Flare Dress is so amazing, I couldn't believe the results after even just one try. I was shown the product from Tom who was so lovely and down to earth, very honest and friendly.</Text>
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



