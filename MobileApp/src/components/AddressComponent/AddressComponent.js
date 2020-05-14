
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
import { colors, sizes } from '../../config/styles.js';
import Loading from '../../layouts/Loading/Loading.js';
import { Dropdown } from 'react-native-material-dropdown';

const window = Dimensions.get('window');

export default class AddressComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      	inputFocusColor      : colors.textLight,
      	isOpen               : false,
        starCount            : 2.5,
        fullName             : '',
        mobileNumber         : '',
  	  
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
            <HeaderBar5 
                goBack={goBack}
                headerTitle={ 'Add New Address'}
          	    navigate={navigate}
            	toggle={()=>this.toggle.bind(this)} 
            	openControlPanel={()=>this.openControlPanel.bind(this)}
            />
            <View style={{flex:1,backgroundColor:'#f1f1f1'}}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
                    <View style={styles.formWrapper}>
                        <View style={{backgroundColor:'#fff',paddingVertical:20,paddingHorizontal:15,}}>
                            <View style={[styles.formInputView, styles.marginBottom20]}>
                                <View style={[styles.inputWrapper]}>
                                    <View style={styles.inputImgWrapper}></View>
                                    <View style={styles.inputTextWrapper}>
                                        <TextField
                                            label                 = "Full Name"
                                            onChangeText          = {(firstName) => {this.setState({ firstName },()=>{this.validInputField('firstName', 'firstNameError');})}}
                                            lineWidth             = {1}
                                            tintColor             = {colors.button}
                                            inputContainerPadding = {0}
                                            labelHeight           = {13}
                                            labelFontSize         = {sizes.label}
                                            titleFontSize         = {13}
                                            baseColor             = {'#666'}
                                            textColor             = {'#333'}
                                            value                 = {this.state.firstName}
                                            containerStyle        = {styles.textContainer}
                                            inputContainerStyle   = {styles.textInputContainer}
                                            titleTextStyle        = {styles.textTitle}
                                            style                 = {styles.textStyle}
                                            labelTextStyle        = {styles.textLabel}
                                            keyboardType          = "default"
                                            />
                                    </View>
                                </View>
                                {this.displayValidationError('emailError')}
                            </View>

                            <View style={[styles.formInputView, styles.marginBottom20]}>
                                <View style={[styles.inputWrapper]}>
                                    <View style={styles.inputImgWrapper}></View>
                                    <View style={styles.inputText2Wrapper}>
                                        <TextField
                                        label                 = "Phone Number"
                                        onChangeText          = {(mobileNumber) => {this.setState({ mobileNumber },()=>{this.validInputField('mobileNumber', 'mobileNumberError');}),this.handleMobileChange(mobileNumber)}}
                                        // {mobileNumber => this.handleMobileChange(mobileNumber)}
                                        lineWidth             = {1}
                                        tintColor             = {colors.button}
                                        inputContainerPadding = {0}
                                        labelHeight           = {13}
                                        llabelFontSize         ={sizes.label}
                                        titleFontSize         = {13}
                                        baseColor             = {'#666'}
                                        textColor             = {'#333'}
                                        value                 = {this.state.mobileNumber}
                                        containerStyle        = {styles.textContainer}
                                        inputContainerStyle   = {styles.textInputContainer}
                                        titleTextStyle        = {styles.textTitle}
                                        style                 = {styles.textStyle}
                                        labelTextStyle        = {styles.textLabel}
                                        keyboardType          = "numeric"
                                        /> 
                                    </View>
                                </View>
                                {this.displayValidationError('mobileNumberError')}
                            </View>
                        </View>

                        <View style={{backgroundColor:'#fff',paddingVertical:20,paddingHorizontal:15,marginTop:15,marginBottom:"5%"}}>
                            <View style={[styles.formInputView, styles.marginBottom20]}>
                                <View style={[styles.inputWrapper]}>
                                    <View style={styles.inputImgWrapper}></View>
                                    <View style={styles.inputText2Wrapper}>
                                        <TextField
                                        label="Pincode"
                                        onChangeText={(email) => { this.setState({ email }, () => { this.validInputField('email', 'emailError'); }) }}
                                        lineWidth={1}
                                        tintColor={colors.tintColor}
                                        inputContainerPadding={0}
                                        labelHeight={13}
                                        labelFontSize         ={sizes.label}
                                        titleFontSize={13}
                                        baseColor={'#666'}
                                        textColor={'#333'}
                                        value={this.state.email}
                                        containerStyle={styles.textContainer}
                                        inputContainerStyle={styles.textInputContainer}
                                        titleTextStyle={styles.textTitle}
                                        style={styles.textStyle}
                                        labelTextStyle={styles.textLabel}
                                        keyboardType="email-address"
                                        autoCapitalize='none'
                                        />
                                    </View>
                                </View>
                                {this.displayValidationError('emailError')}
                            </View>
                            <View style={[styles.formInputView, styles.marginBottom20]}>
                                <View style={[styles.inputWrapper]}>
                                    <View style={styles.inputImgWrapper}></View>
                                    <View style={styles.inputText2Wrapper}>
                                        <TextField
                                        label="Address1"
                                        onChangeText={(email) => { this.setState({ email }, () => { this.validInputField('email', 'emailError'); }) }}
                                        lineWidth={1}
                                        tintColor={colors.tintColor}
                                        inputContainerPadding={0}
                                        labelHeight={13}
                                        labelFontSize         ={sizes.label}
                                        titleFontSize={13}
                                        baseColor={'#666'}
                                        textColor={'#333'}
                                        value={this.state.email}
                                        containerStyle={styles.textContainer}
                                        inputContainerStyle={styles.textInputContainer}
                                        titleTextStyle={styles.textTitle}
                                        style={styles.textStyle}
                                        labelTextStyle={styles.textLabel}
                                        keyboardType="email-address"
                                        autoCapitalize='none'
                                        />
                                    </View>
                                </View>
                                {this.displayValidationError('emailError')}
                            </View>
                            
                            <View style={[styles.formInputView, styles.marginBottom20]}>
                                <View style={[styles.inputWrapper]}>
                                    <View style={styles.inputImgWrapper}></View>
                                    <View style={styles.inputText2Wrapper}>
                                        <TextField
                                        label="Address2"
                                        onChangeText={(email) => { this.setState({ email }, () => { this.validInputField('email', 'emailError'); }) }}
                                        lineWidth={1}
                                        tintColor={colors.tintColor}
                                        inputContainerPadding={0}
                                        labelHeight={15}
                                        labelFontSize         ={sizes.label}
                                        titleFontSize={15}
                                        baseColor={'#666'}
                                        textColor={'#333'}
                                        value={this.state.email}
                                        containerStyle={styles.textContainer}
                                        inputContainerStyle={styles.textInputContainer}
                                        titleTextStyle={styles.textTitle}
                                        style={styles.textStyle}
                                        labelTextStyle={styles.textLabel}
                                        keyboardType="email-address"
                                        autoCapitalize='none'
                                        />
                                    </View>
                                </View>
                                {this.displayValidationError('emailError')}
                            </View>

                            <View style={[styles.formInputView,styles.marginBottom20]}>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}></View>
                                <View style={styles.inputTextWrapper}>
                                  <Dropdown
                                    label               = 'Country'
                                    containerStyle      = {styles.ddContainer}
                                    dropdownOffset      = {{top:0, left: 0}}
                                    itemTextStyle       = {styles.ddItemText}
                                    inputContainerStyle = {styles.ddInputContainer}
                                    labelHeight         = {10}
                                    tintColor           = {colors.button}
                                    labelFontSize       = {sizes.label}
                                    fontSize            = {15}
                                    baseColor           = {'#666'}
                                    textColor           = {'#333'}
                                    labelTextStyle      = {styles.ddLabelText}
                                    style               = {styles.ddStyle}
                                    data                = {this.props.industryData}
                                    value               = {this.state.industryType}
                                    onChangeText        = {industryType => {this.handleType(industryType); this.validInputField('industryType', 'industryTypeError');}}
                                                          
                                  />
                                </View>
                              </View>
                              {this.displayValidationError('industryTypeError')}
                            </View>
                            <View style={[styles.formInputView,styles.marginBottom20]}>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}></View>
                                <View style={styles.inputTextWrapper}>
                                  <Dropdown
                                    label               = 'State'
                                    containerStyle      = {styles.ddContainer}
                                    dropdownOffset      = {{top:0, left: 0}}
                                    itemTextStyle       = {styles.ddItemText}
                                    inputContainerStyle = {styles.ddInputContainer}
                                    labelHeight         = {10}
                                    tintColor           = {colors.button}
                                    labelFontSize       = {sizes.label}
                                    fontSize            = {15}
                                    baseColor           = {'#666'}
                                    textColor           = {'#333'}
                                    labelTextStyle      = {styles.ddLabelText}
                                    style               = {styles.ddStyle}
                                    data                = {this.props.industryData}
                                    value               = {this.state.industryType}
                                    onChangeText        = {industryType => {this.handleType(industryType); this.validInputField('industryType', 'industryTypeError');}}
                                                          
                                  />
                                </View>
                              </View>
                              {this.displayValidationError('industryTypeError')}
                            </View>
                            <View style={[styles.formInputView,styles.marginBottom20]}>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}></View>
                                <View style={styles.inputTextWrapper}>
                                  <Dropdown
                                    label               = 'District'
                                    containerStyle      = {styles.ddContainer}
                                    dropdownOffset      = {{top:0, left: 0}}
                                    itemTextStyle       = {styles.ddItemText}
                                    inputContainerStyle = {styles.ddInputContainer}
                                    labelHeight         = {10}
                                    tintColor           = {colors.button}
                                    labelFontSize       = {sizes.label}
                                    fontSize            = {15}
                                    baseColor           = {'#666'}
                                    textColor           = {'#333'}
                                    labelTextStyle      = {styles.ddLabelText}
                                    style               = {styles.ddStyle}
                                    data                = {this.props.industryData}
                                    value               = {this.state.industryType}
                                    onChangeText        = {industryType => {this.handleType(industryType); this.validInputField('industryType', 'industryTypeError');}}
                                                          
                                  />
                                </View>
                              </View>
                              {this.displayValidationError('industryTypeError')}
                            </View>
                             <View style={[styles.formInputView,styles.marginBottom20]}>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}></View>
                                <View style={styles.inputTextWrapper}>
                                  <Dropdown
                                    label               = 'City'
                                    containerStyle      = {styles.ddContainer}
                                    dropdownOffset      = {{top:0, left: 0}}
                                    itemTextStyle       = {styles.ddItemText}
                                    inputContainerStyle = {styles.ddInputContainer}
                                    labelHeight         = {10}
                                    tintColor           = {colors.button}
                                    labelFontSize       = {sizes.label}
                                    fontSize            = {15}
                                    baseColor           = {'#666'}
                                    textColor           = {'#333'}
                                    labelTextStyle      = {styles.ddLabelText}
                                    style               = {styles.ddStyle}
                                    data                = {this.props.industryData}
                                    value               = {this.state.industryType}
                                    onChangeText        = {industryType => {this.handleType(industryType); this.validInputField('industryType', 'industryTypeError');}}
                                                          
                                  />
                                </View>
                              </View>
                              {this.displayValidationError('industryTypeError')}
                             
                        </View>
                            </View>
                        <View style={{backgroundColor:'#fff',paddingVertical:20,paddingHorizontal:15,}}>
                            <Text style={{fontSize:15,fontFamily:"Montserrat-Regular",color:'#666',marginBottom:15}}> Type of Address</Text>
                            <View style={[styles.formInputView,styles.marginBottom20]}>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}></View>
                                <View style={styles.inputTextWrapper}>
                                  <Dropdown
                                    label               = 'Address Type'
                                    containerStyle      = {styles.ddContainer}
                                    dropdownOffset      = {{top:0, left: 0}}
                                    itemTextStyle       = {styles.ddItemText}
                                    inputContainerStyle = {styles.ddInputContainer}
                                    labelHeight         = {10}
                                    tintColor           = {colors.button}
                                    labelFontSize       = {sizes.label}
                                    fontSize            = {15}
                                    baseColor           = {'#666'}
                                    textColor           = {'#333'}
                                    labelTextStyle      = {styles.ddLabelText}
                                    style               = {styles.ddStyle}
                                    data                = {this.props.industryData}
                                    value               = {this.state.industryType}
                                    onChangeText        = {industryType => {this.handleType(industryType); this.validInputField('industryType', 'industryTypeError');}}
                                                          
                                  />
                                </View>
                              </View>
                              {this.displayValidationError('industryTypeError')}
                            </View>
                          
                        </View>
                        
                    </View>
                    <View style={{flexDirection:'row',marginBottom:85}}>
                        <View style={{flex:0.5,paddingHorizontal:15,marginTop:10}}>
                            <TouchableOpacity>
                                <Button
                                // onPress={()=>this.props.navigation.navigate('CartComponent')}
                                title={"CANCEL"}
                                buttonStyle={styles.button1}
                                containerStyle={styles.buttonContainerS}
                                titleStyle={styles.buttonTextEDIT}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.5,paddingHorizontal:15,marginTop:10}}>
                            <TouchableOpacity >
                                <Button
                                onPress={()=>this.props.navigation.navigate('AddressDefaultComp')}
                                title={"SAVE"}
                                buttonStyle={styles.buttonORANGE}
                                containerStyle={styles.buttonContainerS}
                                titleStyle={styles.buttonTextEDIT}

                                />
                            </TouchableOpacity>
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



