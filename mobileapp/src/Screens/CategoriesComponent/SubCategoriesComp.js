
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

import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar3 from '../../ScreenComponents/HeaderBar3/HeaderBar3.js';
import Footer from '../../ScreenComponents/Footer/Footer.js';
import Notification from '../../ScreenComponents/Notification/Notification.js'
// import styles from './Categoriesstyles.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Categoriesstyles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
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
            <View style={styles.addsuperparent}>
            	<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              		<View  style={styles.formWrapper}>
               			<View style={styles.flxdir}>
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
          				<View>
		          			<View style={styles.proddets}>
	          					 {this.state.ProductsDetails && this.state.ProductsDetails.length > 0 ?
                          this.state.ProductsDetails.map((item,i)=>{  
                            return(
                            <View key={i} style={styles.width160}>
                              <View  style={[styles.subimg,(i%2==0?{}:{marginLeft:12})]}>
                                <Image
                                  source={require("../../AppDesigns/currentApp/images/saleimage.png")}
                                  style={styles.subcatimg}
                                />
                                <Text style={styles.peroff}> {item.discountPercent}% OFF</Text>
                                 <View style={[styles.proddisperoff,(i%2==0?{right:30,top:5}:{right:30,top:5})]}>
                                 <TouchableOpacity >
                                    <Icon size={20} name='heart-o' type='font-awesome' color='#ec971f' style={{}}/>
                                </TouchableOpacity>
                                </View>
                              </View>
                              <TouchableOpacity  onPress={()=>this.props.navigation.navigate('SubCatCompView',{productID:item._id})}>
                              <View style={styles.padvert10}> 
      									        <Text numberOfLines = { 1 } style={[styles.nameprod,(i%2==0?{}:{marginLeft:12})]}>{item.productName}</Text>
                                <Text numberOfLines = { 1 } style={[styles.urlprod,(i%2==0?{}:{marginLeft:12})]}>{item.productUrl}</Text>
                               
                                  <View style={[styles.flxmgtp,(i%2==0?{marginLeft:5}:{marginLeft:15})]}>
                                    <View style={styles.flxdir}>
                                    <Icon
                                      name="rupee"
                                      type="font-awesome"
                                      size={15}
                                      color="#333"
                                      iconStyle={{marginTop:5,marginRight:3}}
                                    />
                                    <Text style={styles.ogprice}>{item.originalPrice}</Text>
                                    </View>
                                    <Text style={styles.disprice}>{item.discountedPrice}</Text>
                                  </View>
                              </View>
                              </TouchableOpacity> 
                            </View>
					          			)
		               				})
                          :

                          <View style={styles.noprod}>
                              <Text  style={styles.noprodtxt}>No products available!</Text>
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



