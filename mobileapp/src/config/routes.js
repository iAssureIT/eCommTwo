import { createSwitchNavigator }  from 'react-navigation';
import { createDrawerNavigator }  from 'react-navigation-drawer';
import { createStackNavigator }   from 'react-navigation-stack';
import { createAppContainer }     from '@react-navigation/native';
import { Animated, Easing } from 'react-native';

import AuthLoadingScreen from '../ScreenComponents/AuthLoadingScreen/AuthLoadingScreen.js';

import Menu from '../ScreenComponents/Menu/Menu.js';



// import Home                       from '../Screens/Home.js';
// import Dashboard                  from '../Screens/Dashboard/Dashboard.js';
// import Menu                       from '../Screens/Menu/Menu.js';
// import AuthLoadingScreen          from '../ScreenComponents/AuthLoading/AuthLoadingScreen.js'; 


/*----SystemSecurity -----*/
import Login                      from '../Screens/SystemSecurity/Login/Login1.js';
import ForgotPassword             from '../Screens/SystemSecurity/ForgotPassword/ForgotPassword1.js';
import ResetPassword              from '../Screens/SystemSecurity/ResetPassword/ResetPassword1.js';
import Signup                     from '../Screens/SystemSecurity/Signup/Signup1.js';
import OTPVerification            from '../Screens/SystemSecurity/OTPVerification/OTPVerification.js';
import ForgotPasswordOTP          from '../Screens/SystemSecurity/ForgotPasswordOTP/ForgotPasswordOTP1.js';


import Dashboard from '../Screens/Dashboard/Dashboard.js';
import CategoriesComponent from'../Screens/CategoriesComponent/CategoriesComponent.js';
import SubCategoriesComp from'../Screens/CategoriesComponent/SubCategoriesComp.js';
import SubCatCompView from'../Screens/CategoriesComponent/SubCatCompView.js';
import CartComponent from '../Screens/CartComponent/CartComponent.js';
import ConfirmOrderComponent from '../Screens/ConfirmOrderComponent/ConfirmOrderComponent.js';
import AddressDefaultComp from '../Screens/AddressComponent/AddressDefaultComp.js';
import AddressComponent from '../Screens/AddressComponent/AddressComponent.js';
import AddressMenu from'../Screens/AddressComponent/AddressMenu.js';
import WishlistComponent from'../Screens/WishlistComponent/WishlistComponent.js';
import MyOrder from '../Screens/MyOrders/MyOrder.js';
import OrderDetails from '../Screens/MyOrders/OrderDetails.js';
import AccountDashboard from '../Screens/AccountDashboard/AccountDashboard.js';
import AccountInformation from'../Screens/AccountDashboard/AccountInformation.js';
import MyProductReview from'../Screens/MyProductReview/MyProductReview.js';

let SlideFromRight = (index, position, width)=>{
  const translateX = position.interpolate({
    inputRange: [index -1,index],
    outputRange: [width, 0],
  })
  return {transform: [{translateX}]}
};

let SlideFromBottom = (index, position, height)=>{
  const translateY = position.interpolate({
    inputRange: [index -1,index],
    outputRange: [height, 0],
  })
  return {transform: [{translateY}]}
};

let SlideFromTop = (index, position, height)=>{
  const translateXY = position.interpolate({
    inputRange: [index-1,index,index+1],
    outputRange: [height,0,0],
  })
  return {transform: [{translateY:translateXY}]}
};

const TransitionConfiguration = () =>{
  return {
    transitionSpec : {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const height = layout.initHeight;
      const { index, route } = scene;
      const params = route.params || {};
      const transition = params.transition || 'default';
      return {
        default : SlideFromRight(index, position, width),
        bottomTransition: SlideFromBottom(index, position, height),
        topTransition: SlideFromTop(index, position, height)
      }[transition];
    },
  }
}

const HomeStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
     header: null,
     headerBackTitleVisible:false,
    }
  },
  CategoriesComponent: {
    screen: CategoriesComponent,
    navigationOptions: {
      header: null,
    }
  },
    SubCategoriesComp: {
    screen: SubCategoriesComp,
    navigationOptions: {
       header: null,
    }
  },
    SubCatCompView: {
    screen: SubCatCompView,
    navigationOptions: {
      header: null,
    }
  },
  CartComponent:{
    screen: CartComponent,
    navigationOptions: {
     header: null,
    }
  },
   ConfirmOrderComponent:{
    screen: ConfirmOrderComponent,
    navigationOptions: {
    header: null,
    }
  },
  AddressDefaultComp:{
    screen: AddressDefaultComp,
    navigationOptions: {
     header: null,
    }
  },
  AddressComponent:{
    screen:AddressComponent,
    navigationOptions:{
     header: null,
    }
  },
  AddressMenu:{
    screen:AddressMenu,
    navigationOptions:{
    header: null,
    }
  },
WishlistComponent:{
   screen:WishlistComponent,
    navigationOptions:{
    header:null
    }
},
MyOrder:{
   screen:MyOrder,
    navigationOptions:{
     header: null,
    }
},
OrderDetails:{
   screen:OrderDetails,
    navigationOptions:{
     header: null,
    }
},
AccountDashboard:{
   screen:AccountDashboard,
    navigationOptions:{
     header: null,
    }
},
AccountInformation:{
   screen:AccountInformation,
    navigationOptions:{
    header: null,
    }
},
MyProductReview:{
   screen:MyProductReview,
    navigationOptions:{
     header: null,
    }
}, 
   
},{
  transitionConfig: TransitionConfiguration
});

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
       header: null,
      headerBackTitleVisible:false,
    }
  },
   Signup: {
    screen: Signup,
    navigationOptions: {
       header: null,
    }
  },
   OTPVerification: {
    screen: OTPVerification,
    navigationOptions: {
      header: null,
    }
  },
   ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
       header: null,
    }
  },
  ForgotPasswordOTP: {
    screen: ForgotPasswordOTP,
    navigationOptions: {
       header: null,
    }
  },
  
   ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null,
    }
  },

});

const drawer = createDrawerNavigator({
  Home : {
    screen: HomeStack
  }
},{
    drawerLockMode: 'locked-closed',
    contentComponent: Menu,
    drawerPosition: 'right'
});


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading : AuthLoadingScreen,
    App         : drawer,
    Auth        : AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    unmountInactiveRoutes: true,
  }
));

