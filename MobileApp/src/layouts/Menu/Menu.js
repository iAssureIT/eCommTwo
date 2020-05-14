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
  AsyncStorage,
  PermissionsAndroid,
  Platform
} from "react-native";
import { Icon, Avatar } from 'react-native-elements';
// import axios from "../../config/axios.js";

import styles from './styles.js';
import {colors} from '../../config/styles.js';


export default  class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state={
      fullName:'',
      addressComponent:[]
    };
  }
  
  

  handleNavigation = (screen) =>{
    this.props.navigation.navigate(screen);
    this.props.navigation.closeDrawer();
  }

  handleLogout = () =>{
   // var tokenremove = AsyncStorage.removeItem("token");
    // console.log("tokenremove==>",tokenremove);
    this.props.navigate("LogIn");
    this.props.closeDrawer();
  }

  showUser(){
    var name  = "";
    AsyncStorage.multiGet(['token','user_id','userName'])
      .then((data)=>{
        // console.log('user',data)
        token = data[0][1]
        user_id = data[1][1]
        userName = data[2][1]
        this.setState({fullName:userName})

      })
    return this.state.fullName
  }
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
                source={require('../../images/34.png')}                 
                activeOpacity={0.7}
              />
            </TouchableOpacity> 
              </View> 
               <View style={{flex:0.5,}}> 
                <Text style={{fontSize:13,fontFamily:"Montserrat-SemiBold",marginTop:15}}>Garima Billore</Text>
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
            <TouchableOpacity onPress={this.handleLogout.bind(this)}>
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

// export default createContainer (props => {
//   var ownerId = Meteor.userId();
//   const bizHandle = Meteor.subscribe('businessDetailByUserId',ownerId);   
//   const loading   = !bizHandle.ready();
//   const businessData = Meteor.collection('businessDetail').findOne({'businessOwnerId':ownerId});

//   const s3Handle    = Meteor.subscribe('s3Details');   
//   const loading2    = !s3Handle.ready();
//   var s3Data        = Meteor.collection("projectSettings").findOne({'type':'S3'});
//   // console.log("container s3Data = ",s3Data);
//   return {
//     loading,
//     businessData,
//     s3Data
//   };
// }, Menu);

