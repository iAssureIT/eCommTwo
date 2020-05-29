import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { Header, Icon ,SearchBar  } from 'react-native-elements';
import ValidationComponent from "react-native-form-validator";
// import styles from "./styles.js";
import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/HeaderBar2Styles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js.js';
import Search from 'react-native-search-box';


export default  class HeaderBars2 extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText:''
    }
  }

  _goBack = () =>{
    this.props.goBack();
  }

  handleNavigation = (screen) =>{
    this.props.navigate(screen);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps){
      this.setState({
        count:parseInt(nextProps.count)
      })
    }
  }
  updateSearch = searchText => {
    this.setState({ searchText });
  };

  _goBack = () => {
    this.props.goBack();
  };

  render() {
    return (
      <View style={{ "borderBottomWidth": 1,
      "borderBottomColor": "#ebebeb",
      "backgroundColor": "#fff",elevation:4,
      "boxShadow": "10px 5px 5px black"}}>
      <Header 
        backgroundColor={'transparent'}
        placement="left"
        leftContainerStyle={{backgroundColor:'transparent',paddingHorizontal:15}}
        centerContainerStyle={{backgroundColor:'transparent',paddingLeft:0,paddingRight:0,paddingTop:0}}
        rightContainerStyle={{backgroundColor:'transparent',paddingHorizontal:15}}
        leftComponent={
          <View style={{justifyContent:'center',alignItems:'center',marginTop:10,alignSelf:'center'}}>
            <TouchableOpacity onPress={this.props.toggle()}>
              <Icon size={25} name='bars' type='font-awesome' color='#ff3e6c' />
            </TouchableOpacity>
          </View>
        }
        centerComponent={
        
          <Image
              resizeMode="contain"
              source={require("../../AppDesigns/currentApp/images/Logo.png")}
              style={{ height:45,width:45,marginTop:10 }}
              />
        }
        rightComponent={
          <View style={{flexDirection:'row'}}>
             <TouchableOpacity>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10,alignSelf:'center',marginRight:20}}>
                  <Icon name="bell-o" type="font-awesome" size={23}  color="#333" style={styles.bellIcon}/>
                  <Text style={styles.notificationText}>{0}</Text>
              </View>
            </TouchableOpacity>
          {/*  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10,alignSelf:'center'}}>
              <TouchableOpacity >
                <Icon name="shopping-cart" type="feather" size={25}  color="#333"/>
              </TouchableOpacity>
            </View>*/}
          </View>
        }
        containerStyle={{paddingTop:0,paddingLeft:0,paddingRight:0,backgroundColor:'#fff'}}
      />
     { <View style={{paddingHorizontal:15,marginBottom:30,}}>
        <SearchBar
          placeholder         = 'Search for Product, Brands and More'
          containerStyle      = {styles.searchContainer}
          inputContainerStyle = {styles.searchInputContainer}
          inputStyle          = {styles.searchInput}
          onChangeText        = {this.updateSearch}
          value               = {this.state.searchText}
        />
      </View>}
      </View>
    );
  }
}
