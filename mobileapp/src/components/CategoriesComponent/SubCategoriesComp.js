
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
import StarRating from 'react-native-star-rating';

import Menu from '../../layouts/Menu/Menu.js';
import HeaderBar3 from '../../layouts/HeaderBar3/HeaderBar3.js';
import Footer from '../../layouts/Footer/Footer.js';
import Notification from '../../layouts/Notification/Notification.js'
import styles from './styles.js';
import {colors} from '../../config/styles.js';
import Loading from '../../layouts/Loading/Loading.js';
import axios                      from 'axios';
const window = Dimensions.get('window');

export default class SubCategoriesComp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      	inputFocusColor       : colors.textLight,
      	isOpen                : false,
        starCount             : 2.5,
        productImage          : [],
        ProductsDetails       : '',
        subCategory_ID        : '',
        category_ID           : ''
  	
    };

  }

  componentDidMount(){
     const category_ID    = this.props.navigation.getParam('category_ID','No category_ID');
     const subCategory_ID = this.props.navigation.getParam('subCategory_ID','No subCategory_ID');  
      this.setState({
       category_ID    : category_ID,
       subCategory_ID : subCategory_ID
        },()=>{ 
          this.focusListener = this.props.navigation.addListener('didFocus', () => {
          this.getProductsDetails(this.state.category_ID,this.state.subCategory_ID);
      })
    })
    
  }

  getProductsDetails(){
    axios.get("/api/Products/get/list/"+this.state.category_ID+'/'+this.state.subCategory_ID)
    .then((response)=>{
      console.log("ProductsDetails =========>", response.data);
      this.setState({
        ProductsDetails: response.data,
        // productImage   : response.data.productImage[0]

      })
    }) 
    .catch((error)=>{
      // console.log('error', error);
    })
  }
  componentWillReceiveProps(nextProps){
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
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
            <HeaderBar3 
                goBack={goBack}
                headerTitle={ 'SubCategory Products'}
            	  navigate={navigate}
              	toggle={()=>this.toggle.bind(this)} 
              	openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
            	<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              		<View  style={styles.formWrapper}>
               			<View style={{flexDirection:"row"}}>
                      <View >
                        <Button
                          icon={
                            <Icon
                              name="swap-vertical"
                              type="material-community"
                              size={28}
                              color="#fff"
                            />
                          }
                           buttonStyle={styles.button}
                          containerStyle={styles.buttonContainer}
                        />
                      </View>
                      <View >
                        <Button
                          icon={
                            <Icon
                              name="filter"
                              type="font-awesome"
                              size={20}
                              color="#fff"
                            />
                          }
                          titleStyle={styles.buttonText}
                          title="FILTER"
                          buttonStyle={styles.button}
                          containerStyle={styles.buttonContainer}
                        />
                      </View>
                     
                       <View >
                        <Button
                          titleStyle={styles.buttonText}
                          title="Color"
                          buttonStyle={styles.button}
                          containerStyle={styles.buttonContainer}
                        />
                      </View>
                      <View >
                        <Button
                          titleStyle={styles.buttonText}
                          title="Brand"
                          buttonStyle={styles.button}
                          containerStyle={styles.buttonContainer}
                        />
                      </View>
                      <View >
                        <Button
                          titleStyle={styles.buttonText}
                          title="Price"
                          buttonStyle={styles.button}
                          containerStyle={styles.buttonContainer}
                        />
                      </View>
                      <View>
                      </View>
                    </View>
          				<View style={{backgroundColor:'#fff',paddingHorizontal:15,marginBottom:"15%"}}>
                    {/*<Text style={{fontSize:12,color:'#666666',paddingVertical:10,fontFamily:"Montserrat-Regular",}}>Showing 1000 + results to 'Western Wear'</Text>*/}
		          			<View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',marginBottom:'15%'}}>
	          					 {this.state.ProductsDetails && this.state.ProductsDetails.length > 0 ?
                          this.state.ProductsDetails.map((item,i)=>{
                         
                            return(
                            <View key={i} style={{width:160,}}>
                              <View  style={[{backgroundColor:"#f1f1f1",width:160,borderWidth:1,borderColor:'#f1f1f1',flexDirection:'row',},(i%2==0?{}:{marginLeft:12})]}>
                              {/*  <Image
                                source={{uri:item.productImage}}
                                style={{ height:200,width:160,}}
                                />*/}
                                <Image
                                  source={require("../../images/saleimage.png")}
                                  style={{ height:200,width:160,}}
                                />
                                <Text style={{backgroundColor:'#666',position:'absolute',bottom:"5%",borderWidth:1,padding:3,borderColor:'#666',borderRadius:5,color:'#fff',marginLeft:10}}> {item.discountPercent}% OFF</Text>
                                 <View style={[{justifyContent:'center',width:25,height:25,borderRadius:25,overflow:'hidden'},(i%2==0?{right:30,top:5}:{right:30,top:5})]}>
                                 <TouchableOpacity >
                                    <Icon size={20} name='heart-o' type='font-awesome' color='#ec971f' style={{}}/>
                                </TouchableOpacity>
                                </View>
                              </View>
                              <TouchableOpacity  onPress={()=>this.props.navigation.navigate('SubCatCompView',{productID:item._id})}>
                              <View style={{paddingVertical:10,}}> 
      									        <Text numberOfLines = { 1 } style={[{fontSize:12,fontFamily:"Montserrat-SemiBold",color:'#333'},(i%2==0?{}:{marginLeft:12})]}>{item.productName}</Text>
                                <Text numberOfLines = { 1 } style={[{flex:1,fontSize:13,flexWrap: "wrap",fontFamily:"Montserrat-Regular",color:'#666',paddingVertical:5},(i%2==0?{}:{marginLeft:12})]}>{item.productUrl}</Text>
                               
                                  <View style={[{flexDirection:"row",marginTop:3},(i%2==0?{marginLeft:5}:{marginLeft:15})]}>
                                    <View style={{flexDirection:'row'}}>
                                    <Icon
                                      name="rupee"
                                      type="font-awesome"
                                      size={15}
                                      color="#333"
                                      iconStyle={{marginTop:5,marginRight:3}}
                                    />
                                    <Text style={{fontSize:12,fontFamily:"Montserrat-SemiBold",marginLeft:10,color:'#333'}}>{item.originalPrice}</Text>
                                    </View>
                                    <Text style={{textDecorationLine:'line-through',fontSize:12,fontFamily:"Montserrat-Regular",color:'#666',marginLeft:10}}>{item.discountedPrice}</Text>
                                  </View>
                              </View>
                              </TouchableOpacity> 
                            </View>
					          			)
		               				})
                          :

                          <View style={{alignItems:'center',marginTop:'10%'}}>
                              <Text  style={{alignItems:'center',marginTop:'10%'}}>No products available!</Text>
                          </View> 
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



