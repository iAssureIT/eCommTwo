
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
import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import Footer from '../../layouts/Footer/Footer.js';
import Notification from '../../layouts/Notification/Notification.js'
import styles from './styles.js';
import {colors} from '../../config/styles.js';
import Loading from '../../layouts/Loading/Loading.js';
import Carousel from 'react-native-banner-carousel';
import ReviewComponent from '../../layouts/Reviews/ReviewComponent.js';
const window = Dimensions.get('window');

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
 
const images = [
  {
    imageSource : require("../../images/23.png"),
  },
  {
    imageSource : require("../../images/24.png"),
  
  },
  {
    imageSource : require("../../images/25.png"),
 
  }
];

export default class SubCatCompView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      	inputFocusColor       : colors.textLight,
      	isOpen: false,
        starCount: 2.5,
      	data:[
		      	{
		      		"categoryImage" : require("../../images/11.png"),
		      		"categoryTitle" : "Clothing"
		      	},
		      	{
		      		"categoryImage" : require("../../images/12.png"),
		      		"categoryTitle" : "Footwear"
		      	},
		      	{
		      		"categoryImage" : require("../../images/13.png"),
		      		"categoryTitle" : "Accessories"
		      	},
		      	{
		      		"categoryImage" : require("../../images/14.png"),
		      		"categoryTitle" : "Fragrances"
		      	},
	      	],	
	  	CategoriesData:[
	  		{
	      		"catImage" : require("../../images/15.png"),
	      		"catTitle" : "Western Wear"
		    },
	      	{
	      		"catImage" : require("../../images/16.png"),
	      		"catTitle" : "Dress Material"
	      	},
	      	{
	      		"catImage" : require("../../images/17.png"),
	      		"catTitle" : "Saree Small"
		    },
	      	{
	      		"catImage" : require("../../images/18.png"),
	      		"catTitle" : "Lehnga Choli"
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
  renderPage(image, index) {
        return (
            <View key={index}>
                <ImageBackground 
                  style={{ width:230, height: 230,alignItems:"center",alignSelf:"center",marginBottom:"20%"}} 
                  source={image.imageSource}
                  resizeMode={"contain"}
                >
                </ImageBackground>
            </View>
        );
    }



  searchUpdated(text){
    this.setState({ searchText: text });
  }


  render(){

    const { navigate,dispatch,goBack } = this.props.navigation;
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
            <HeaderBar
                goBack={goBack}
                navigate={navigate}
                headerTitle={ 'Western Wear'}
                toggle={()=>this.toggle.bind(this)} 
                openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={{flex:1,backgroundColor:'#f1f1f1',marginBottom:50}}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
                    <View  style={styles.formWrapper}>
                        <View style={{flexDirection:"row",marginTop:15,}}>
                            <View style={{flex:0.8}}>
                                <Text numberOfLines = { 1 } style={{fontSize:13,fontFamily:"Montserrat-SemiBold",color:'#333'}}>Kuki Fashion</Text>
                            </View>
                            <View style={{flex:0.2,backgroundColor:'#388e3c',borderRadius:3,paddingVertical:3}}>
                                <View style={{flexDirection:'row',justifyContent:'center',}}>
                                    <Icon
                                    name="star"
                                    type="font-awesome"
                                    size={15}
                                    color="#fff"
                                    iconStyle={{marginTop:3,marginRight:5}}
                                    />
                                    <Text numberOfLines = { 1 } style={{fontSize:13,fontFamily:"Montserrat-SemiBold",color:'#fff',marginTop:0,}}>4.5</Text>
                                </View>
                            </View>
                        </View>
                        <Text numberOfLines = { 1 } style={{fontSize:14,paddingVertical:5,fontFamily:"Montserrat-Regular",color:'#666'}}>Women Red Solid Fit and Flare Dress</Text>
                        

                            <View style={styles.containerViews}>
                              <Carousel
                                   autoplay
                                   autoplayTimeout={5000}
                                   loop
                                   index={0}
                                   pageSize={BannerWidth}
                               >
                              {images.map((image, index) => this.renderPage(image, index))}
                              </Carousel>
                         </View>
                        <View style={{backgroundColor:'#fff',padding:10,borderRadius:3,marginTop:15}}>
                            <Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold",color:'#333'}}>Details: Red</Text>
                            <View style={{marginTop:3}}>
                                <View style={{flexDirection:'row'}}>
                                    <Icon
                                    name="rupee"
                                    type="font-awesome"
                                    size={25}
                                    color="#333"
                                    iconStyle={{marginTop:5,marginRight:3}}
                                    />
                                    <Text style={{fontSize:17,fontFamily:"Montserrat-SemiBold",}}>999</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flexDirection:'row',marginRight:10}}>
                                        <Icon
                                        name="rupee"
                                        type="font-awesome"
                                        size={15}
                                        color="#333"
                                        iconStyle={{marginTop:5,marginRight:3,}}
                                        />
                                        <Text style={{textDecorationLine: 'line-through',fontSize:12,fontFamily:"Montserrat-Regular",}}>3,140</Text>
                                    </View>
                                    <View style={{flexDirection:'row',}}>
                                        <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#666',marginRight:5}}>Save</Text>
                                        <Icon
                                        name="rupee"
                                        type="font-awesome"
                                        size={15}
                                        color="#666"
                                        iconStyle={{marginTop:5,marginRight:3,}}
                                        />
                                        <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",}}>2,141</Text>
                                        <Text style={{fontSize:13,fontFamily:"Montserrat-Regular",color:'#c10000',fontStyle:"italic",marginLeft:10}}> 68% OFF</Text>
                                    </View>
                                </View>
                            </View>
                            <View >
                                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('CartComponent')}>
                                    <Button
                                    onPress={()=>this.props.navigation.navigate('CartComponent')}
                                    title={"ADD TO CART"}
                                    buttonStyle={styles.button1}
                                    containerStyle={styles.buttonContainer1}
                                    icon={
                                        <Icon
                                        name="shopping-cart"
                                        type="feather"
                                        size={25}
                                        color="#fff"
                                        iconStyle={{marginRight:10}}
                                        />
                                    }
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginBottom:15}}>
                            <Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold",marginBottom:10,marginTop:10}}>Details</Text>
                            <Text style={{fontSize:12,fontFamily:"Montserrat-Regular",}}>Sold by Kuki Fashion. (3.7 out of 5 stars | 139 ratings) & Delivery by GangaExpress.</Text>
                            <Text style={{fontSize:12,fontFamily:"Montserrat-Regular",marginTop:10}}>Deliver to A1GW7CB... -Hadpsar 411028</Text>
                        </View>
                        <View style={{borderWidth:1,borderColor:'#ccc'}}></View>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Icon
                                    name="format-list-checks"
                                    type="material-community"
                                    size={25}
                                    color="#c10000"
                                    iconStyle={{marginRight:10,marginTop:8}}
                                    />
                                <Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold",marginBottom:10,marginTop:10}}>About this item</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize:20,fontFamily:"Montserrat-Regular",}}>{'\u2022'}</Text>
                                <Text style={{flex: 1,marginTop:5, paddingLeft: 5,fontSize:12,fontFamily:"Montserrat-Regular",}}>Care Instructions: Machine wash</Text>
                            </View>
                             <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize:20,fontFamily:"Montserrat-Regular",}}>{'\u2022'}</Text>
                                <Text style={{flex: 1,marginTop:5, paddingLeft: 5,fontSize:12,fontFamily:"Montserrat-Regular",}}>Color Name: Blue</Text>
                            </View>
                             <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize:20,fontFamily:"Montserrat-Regular",}}>{'\u2022'}</Text>
                                <Text style={{flex: 1,marginTop:5, paddingLeft: 5,fontSize:12,fontFamily:"Montserrat-Regular",}}>Art silk</Text>
                            </View>
                             <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize:20,fontFamily:"Montserrat-Regular",}}>{'\u2022'}</Text>
                                <Text style={{flex: 1,marginTop:5, paddingLeft: 5,fontSize:12,fontFamily:"Montserrat-Regular",}}>With blouse piece</Text>
                            </View>
                        </View>
                        <View style={{borderWidth:1,borderColor:'#ccc'}}></View>
                        <ReviewComponent />
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



