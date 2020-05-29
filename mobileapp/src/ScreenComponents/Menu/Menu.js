import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  PermissionsAndroid,
  Platform
} from "react-native";
import { Icon, Avatar } from 'react-native-elements';
import axios                    from "axios";
import AsyncStorage             from '@react-native-community/async-storage';

import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/MenuStyles.js';
import {colors} from '../../AppDesigns/currentApp/styles/CommonStyles.js.js';

export default  class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state={
      fullName         :'',
      addressComponent :[],
      firstname        :"",
      lastname         :"",
    };
  }
  
componentDidMount(){
 AsyncStorage.getItem('user_id')
    .then((userId)=>{
      axios
      .get('/api/users/get/'+userId)
      .then((user)=>{
        this.setState({
          firstName      : user.data.firstname,
          lastName       : user.data.lastname,
          // imgPath        : user.data.image,
          user_id        : userId,  
        })
      })
      .catch((error)=>{
        console.log("error=>",error)
      })
    })
}

  logout=()=>{
      AsyncStorage.removeItem('user_id');
      AsyncStorage.removeItem('token');
      // this.props.navigation.closeDrawer();
      this.props.navigation.navigate('Login');
  };

  // showUser(){
  //   var name  = "";
  //   AsyncStorage.multiGet(['token','user_id','userName'])
  //     .then((data)=>{
  //       console.log('user',data)
  //       token = data[0][1]
  //       user_id = data[1][1]
  //       userName = data[2][1]
  //       this.setState({fullName:userName})

  //     })
  //   return this.state.fullName
  // }
  render(){

    return (
      <ScrollView contentContainerStyle={[styles.container]} scrollsToTop={false}>
        <View style={{flexDirection:'row',paddingHorizontal:25,marginTop:25,}}>
          <View style={{flex:0.5,}}> 
            <TouchableOpacity onPress={this.editProfileImage}>
              <Avatar
                overlayContainerStyle={{}}
                width={90}
                height={90}
                rounded
                source={require('../../AppDesigns/currentApp/images/34.png')}                 
                activeOpacity={0.7}
              />
            </TouchableOpacity> 
              </View> 
               <View style={{flex:0.5,}}> 
                <Text style={{fontSize:15,fontFamily:"Montserrat-SemiBold",marginTop:15}}>{this.state.firstName} {this.state.lastName}</Text>
              </View> 
          </View>
          <View style={styles.menuWrapper}>
       
            <TouchableOpacity onPress={()=> this.props.navigate('AccountDashboard')}>
              <View style={styles.menu}>
                <Icon 
                  size={22} 
                  name='user-circle-o' 
                  type='font-awesome' 
                  color='#666' 
                  containerStyle={styles.iconContainer}
                />
                <Text style={styles.menuText}>
                  Account Dashboard
                </Text>
              </View>
            </TouchableOpacity>
             <TouchableOpacity onPress={()=> this.props.navigate('AddressMenu')} >
              <View style={styles.menu}>
                <Icon 
                  size={22} 
                  name='address-book-o' 
                  type='font-awesome' 
                  color='#666' 
                  containerStyle={styles.iconContainer}
                />
                <Text style={styles.menuText}>
                  Address Book
                </Text>
              </View>
            </TouchableOpacity>
             <TouchableOpacity onPress={()=> this.props.navigate('MyOrder')}>
              <View style={styles.menu}>
                <Icon 
                  size={20} 
                  name='briefcase' 
                  type='entypo' 
                  color='#666' 
                  containerStyle={styles.iconContainer}
                />
                <Text style={styles.menuText}>
                  My Orders
                </Text>
              </View>
            </TouchableOpacity>

             <TouchableOpacity onPress={()=> this.props.navigate('WishlistComponent')}>
              <View style={styles.menu} >
                <Icon 
                  size={20} 
                  name='bookmark-o' 
                  type='font-awesome' 
                  color='#666' 
                  containerStyle={styles.iconContainer}
                />
                <Text style={styles.menuText}>
                  My Wishlist
                </Text>
              </View>
            </TouchableOpacity>
             <TouchableOpacity onPress={()=> this.props.navigate('MyProductReview')}>
              <View style={styles.menu} >
                <Icon 
                  size={20} 
                  name='eye' 
                  type='font-awesome' 
                  color='#666' 
                  containerStyle={styles.iconContainer}
                />
                <Text style={styles.menuText}>
                  My Product Review
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigate('Login')}>
              <View style={styles.menu}>
                <Icon 
                  size={23} 
                  name='power' 
                  type='material-community' 
                  color='#666' 
                  containerStyle={styles.iconContainer}
                />
                <Text style={styles.menuText}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>

          </View>
      </ScrollView>
    );
  }
}
