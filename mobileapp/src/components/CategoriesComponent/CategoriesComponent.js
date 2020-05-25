
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
// import SubCategoryMenu from './SubCategoryMenu.js';
import styles from './styles.js';
import {colors} from '../../config/styles.js';
import Loading from '../../layouts/Loading/Loading.js';
import axios                      from 'axios';
const window = Dimensions.get('window');

export default class CategoriesComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      	inputFocusColor      : colors.textLight,
      	isOpen               : false,  
        categoriesImg        : [], 
      	categories           : [],
        subCategory          : [],
        categoryImage        : [],
        section_id           : '',
        showView             : false,
        subCategoryTitle     : '',
        subCategory_ID       : ''

    };
  }


  componentDidMount(){
     const section_id = this.props.navigation.getParam('section_id','No section_id');
      // console.log("section_id Category--------------> ", section_id);
      this.setState({
        section_id: section_id,
        },()=>{
          this.focusListener = this.props.navigation.addListener('didFocus', () => {
          this.getCategories();
      })
    })
    
  }
   componentWillUnmount () {
    this.focusListener.remove()
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.getCategories();
  }

  getCategories(){
    axios.get("/api/category/get/list/"+this.state.section_id)
    .then((response)=>{
      // console.log('response.data categoriesId ================>', response.data );
      this.setState({
        categories  : response.data,
        
      })
    })
    .catch((error)=>{
      // console.log('error', error);
    })
  }

  handlePressCategoryMenu(id){
    axios.get("/api/category/get/one/"+id)
      .then((res)=>{
      // console.log('category_ID =======>', id);
      // console.log('res.data.subCategory--------->',res.data.subCategory);
      this.setState({
        showView       : true,
        category_ID    : id,
        subCategory    : res.data.subCategory,
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



    const {navigate, dispatch ,goBack} = this.props.navigation;
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
                headerTitle={"Category & SubCategory"}
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
                      {
                        this.state.categories && this.state.categories.map((item,index)=>{
                          if (index < 8 ) {
                          return(
                          <View key={index}>
                            <TouchableOpacity onPress={()=>this.handlePressCategoryMenu(item._id)}>
                               <View style={styles.imageMenuWraper} >
                                  <Image
                                  source={{uri:item.categoryImage[0]}}
                                  style={{ height:80,borderRadius:5,width: 120,}}
                                  />
                                 {/*<Image
                                  source={require("../../images/saleimage.png")}
                                  style={{ height:80,borderRadius:5,width: 120,}}
                                  />*/}
                               </View>
                               <Text style={{color:'#333',textAlign:'center',marginTop:8,fontSize:13,fontFamily:"Montserrat-SemiBold",flexWrap: 'wrap'}}>{item.category}</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      })
                     }
                    </View>
          				</ScrollView>
                  {this.state.showView === true ?
              				<View style={{backgroundColor:'#fff',paddingHorizontal:15,marginBottom:'30%',marginTop:20}}>
                        <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',marginBottom:'15%'}}>
                        {
                          this.state.subCategory && this.state.subCategory.map((item,i)=>{
                            // console.log('item =========> ',item);
                            return(
                              <View key={i} style={[{borderWidth:1,borderRadius:5,borderColor:'#f1f1f1',backgroundColor:"#ccc",flexDirection:'row',width:160,marginBottom:30,marginTop:15},(i%2==0?{marginRight:25}:{})]}>
                                  <TouchableOpacity  onPress={()=>this.props.navigation.navigate('SubCategoriesComp',{category_ID:this.state.category_ID,subCategory_ID:item._id})}>
                                    <Image
                                    source={require("../../images/saleimage.png")}
                                    style={{ height:200,width:160,}}
                                    />
                                    <Text  style={{fontSize:14,fontFamily:"Montserrat-SemiBold",textAlign:'center',position:'absolute',bottom:'-15%',color:'#333'}}>{item.subCategoryTitle}</Text>
                                  </TouchableOpacity>
                              </View> 
                                )
                              })
                            }
                        </View>
                    </View>
                    : null
                  }
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



