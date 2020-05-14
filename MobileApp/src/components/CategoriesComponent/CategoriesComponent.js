
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
import HeaderBar3 from '../../layouts/HeaderBar3/HeaderBar3.js';
import Footer from '../../layouts/Footer/Footer.js';
import Notification from '../../layouts/Notification/Notification.js'
import styles from './styles.js';
import {colors} from '../../config/styles.js';
import Loading from '../../layouts/Loading/Loading.js';
const window = Dimensions.get('window');

export default class CategoriesComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      	inputFocusColor       : colors.textLight,
      	isOpen: false,
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
            <HeaderBar3 
                goBack ={goBack}
            	  navigate={navigate}
                headerTitle={"Women's Fashion"}
              	toggle={()=>this.toggle.bind(this)} 
              	openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
            	<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              		<View  style={styles.formWrapper}>
               			<ScrollView 
							horizontal={true} 
							showsHorizontalScrollIndicator={false} >
               				<View style={styles.menuWrapper}>
               					{this.state.data.map((data,i)=>{
               						return(
	               						<View key={i}>
											<TouchableOpacity>
											    <View style={styles.imageMenuWraper}>
										         	<Image
											          source={data.categoryImage}
											          style={{ width: 150,height:85,borderRadius:5,width:'100%'}}
											          />
											    </View>
											    <Text style={styles.categoryTitle}>{data.categoryTitle}</Text>
											</TouchableOpacity>
										</View>
               							)
               					   })
								}
               				</View>
          				</ScrollView>
          				<View style={{backgroundColor:'#fff',paddingHorizontal:15,marginBottom:'30%'}}>
                      <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',marginBottom:'5%'}}>
                        {this.state.CategoriesData.map((CategoriesData,i)=>{
                            return(
                                <View  style={[{borderWidth:1,borderColor:'#f1f1f1',backgroundColor:"f1f1f1",flexDirection:'row',width:160,marginBottom:20,marginTop:15},(i%2==0?{marginRight:10}:{})]}>
                              <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate('SubCategoriesComp')}>
      			          						<Image
      									          source={CategoriesData.catImage}
      									          style={{ height:200,width:160,}}
      									          />
                              </TouchableOpacity>
                                 <Text style={{fontSize:14,fontFamily:"Montserrat-SemiBold",textAlign:'center',position:'absolute',bottom:'-15%',}}>{CategoriesData.catTitle}</Text>
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



