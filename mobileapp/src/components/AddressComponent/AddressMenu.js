
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
import { Header, Button, Icon, SearchBar,CheckBox } from "react-native-elements";
import SideMenu from 'react-native-side-menu';
import StarRating from 'react-native-star-rating';

import Menu from '../../layouts/Menu/Menu.js';
import HeaderBar5 from '../../layouts/HeaderBar5/HeaderBar5.js';
import Footer from '../../layouts/Footer/Footer.js';
import Notification from '../../layouts/Notification/Notification.js'
import styles from './styles.js';
import {colors} from '../../config/styles.js';
import Loading from '../../layouts/Loading/Loading.js';
import ConfirmOrderComponent from '../ConfirmOrderComponent/ConfirmOrderComponent.js';
const window = Dimensions.get('window');

export default class AddressMenu extends React.Component{
  constructor(props){
    super(props);
    this.state={
        inputFocusColor       : colors.textLight,
        isOpen: false,
        starCount: 2.5,
      
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
                headerTitle={ 'Address'}
                navigate={navigate}
                toggle={()=>this.toggle.bind(this)} 
                openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
              <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
                <View style={{paddingHorizontal:15}}>
                  <View style={{flex:0.5,paddingHorizontal:0,}}>
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
                  <View style={{backgroundColor:'#fff',marginTop:0,marginBottom:15}}>
                    <View style={{flexDirection:'row',paddingHorizontal:5,paddingVertical:15}}>
                       <CheckBox
                          center
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          checked={this.state.checked}
                          textStyle={{fontSize:15,fontFamily:"Montserrat-Regular",color:'#666'}}
                          containerStyle={{borderWidth:0,}}
                        />
                      <Text style={{flex:0.7,fontSize:13,fontFamily:"Montserrat-SemiBold",marginTop:15}}> Garima Billore (Default)</Text>
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
                     <View style={{flex:0.5,paddingHorizontal:15,}}>
                      <TouchableOpacity >
                        <Button
                        onPress={()=>this.props.navigation.navigate('AddressComponent')}
                        title={"REMOVE"}
                        buttonStyle={styles.button1}
                        containerStyle={styles.buttonContainer1}
                        titleStyle={styles.buttonTextEDIT}
                        />
                    </TouchableOpacity>
                    </View>
                    </View> 
                  </View>
                   <View style={{backgroundColor:'#fff',marginTop:0,marginBottom:255}}>
                    <View style={{flexDirection:'row',paddingHorizontal:5,paddingVertical:15}}>
                       <CheckBox
                          center
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          checked={this.state.checked}
                          textStyle={{fontSize:15,fontFamily:"Montserrat-Regular",color:'#666'}}
                          containerStyle={{borderWidth:0,}}
                        />
                      <Text style={{flex:0.7,fontSize:13,fontFamily:"Montserrat-SemiBold",marginTop:15}}> Gaurav Billore</Text>
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
                     <View style={{flex:0.5,paddingHorizontal:15,}}>
                      <TouchableOpacity >
                        <Button
                        onPress={()=>this.props.navigation.navigate('AddressComponent')}
                        title={"REMOVE"}
                        buttonStyle={styles.button1}
                        containerStyle={styles.buttonContainer1}
                        titleStyle={styles.buttonTextEDIT}
                        />
                    </TouchableOpacity>
                    </View>
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



