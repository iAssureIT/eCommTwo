
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

import Menu from '../../layouts/Menu/Menu.js';
import HeaderBar5 from '../../layouts/HeaderBar5/HeaderBar5.js';
import Footer from '../../layouts/Footer/Footer.js';
import Notification from '../../layouts/Notification/Notification.js'
import styles from './styles.js';
import {colors} from '../../config/styles.js';
import Loading from '../../layouts/Loading/Loading.js';
const window = Dimensions.get('window');

export default class WishlistComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      	inputFocusColor       : colors.textLight,
      	isOpen: false,
      	ProductData:[
          {
            "catImage" : require("../../images/15.png"),
            "productTitle" : "Kuki Fashion",
            "productName":"Women Red Solid Fit & Flat",
          },
          {
            "catImage" : require("../../images/16.png"),
            "productTitle" : "Kuki Fashion",
            "productName":"Embroidered Daily Wear",
          },
          {
            "catImage" : require("../../images/17.png"),
            "productTitle" : "Kuki Fashion",
            "productName":"Women Red Solid Fit & Flat",
          },
          {
            "catImage" : require("../../images/18.png"),
            "productTitle" : "Kuki Fashion",
            "productName":"Embroidered Daily Wear",
          },



      ]

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
                headerTitle={"My Wishlist"}
              	toggle={()=>this.toggle.bind(this)} 
              	openControlPanel={()=>this.openControlPanel.bind(this)}
            />
              <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
                  <View  style={styles.formWrapper}>
                  <View style={{backgroundColor:'#fff',paddingHorizontal:15,marginBottom:"15%",marginTop:15}}>
                   
                    <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',marginBottom:'10%',marginTop:15}}>
                      {this.state.ProductData.map((ProductData,i)=>{
                          return(
                         
                            <View key={i}  style={{width:160,}}>
                              <View  style={[{backgroundColor:"#f1f1f1",width:160,borderWidth:1,borderColor:'#f1f1f1',flexDirection:'row',},(i%2==0?{}:{marginLeft:12})]}>
                                
                                <Image
                                source={ProductData.catImage}
                                style={{ height:200,width:160,}}
                                />
                                <Text style={{backgroundColor:'#666',position:'absolute',bottom:"5%",borderWidth:1,padding:3,borderColor:'#666',borderRadius:5,color:'#fff',marginLeft:10}}> 80% OFF</Text>
                               <View style={[{justifyContent:'center',backgroundColor:"#f00",width:25,height:25,borderRadius:25,overflow:'hidden'},(i%2==0?{right:20,top:-5}:{right:20,top:-5})]}>
                                    <Icon size={18} name='close' type='fontAwesome' color='#fff' style={{}}/>
                                </View>
                              </View>
                              <View style={{paddingVertical:10,}}> 
                                <Text numberOfLines = { 1 } style={[{fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#333'},(i%2==0?{}:{marginLeft:12})]}>{ProductData.productTitle}</Text>
                                <Text numberOfLines = { 1 } style={[{flex:1,fontSize:13,flexWrap: "wrap",fontFamily:"Montserrat-Regular",color:'#666',paddingVertical:5},(i%2==0?{}:{marginLeft:12})]}>{ProductData.productName}</Text>
                               
                                  <View style={[{flexDirection:"row",marginTop:3},(i%2==0?{marginLeft:5}:{marginLeft:15})]}>
                                    <View style={{flexDirection:'row'}}>
                                    <Icon
                                      name="rupee"
                                      type="font-awesome"
                                      size={15}
                                      color="#333"
                                      iconStyle={{marginTop:5,marginRight:3}}
                                    />
                                    <Text>999</Text>
                                    </View>
                                    <Text style={{textDecorationLine: 'line-through',fontSize:12,fontFamily:"Montserrat-SemiBold",marginLeft:10}}>3140</Text>
                                  </View>
                              </View>
                              <View style={[{},(i%2==0?{marginTop:-15,marginBottom:10,marginRight:8}:{marginTop:-15,marginLeft:12,marginBottom:10})]}>
                               <TouchableOpacity onPress={()=>this.props.navigation.navigate('SubCatCompView')}>
                                  <Button
                                    titleStyle={styles.buttonText}
                                    title="MOVE TO CART"
                                    buttonStyle={styles.button}
                                    containerStyle={styles.buttonContainer}
                                     icon={
                                        <Icon
                                        name="shopping-cart"
                                        type="feather"
                                        size={20}
                                        color="#fff"
                                        iconStyle={{marginRight:10}}
                                        />
                                    }
                                  />
                                </TouchableOpacity> 
                                </View>
                              </View>
                          )
                          })
                }
                    </View>
                  </View>
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



