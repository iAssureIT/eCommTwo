import { createSwitchNavigator }  from 'react-navigation';
import { createDrawerNavigator }  from 'react-navigation-drawer';
import { createStackNavigator }   from 'react-navigation-stack';
import { createAppContainer }     from '@react-navigation/native';
import { Animated, Easing } from 'react-native';

import AuthLoadingScreen from '../layouts/AuthLoadingScreen/AuthLoadingScreen.js';

import Menu from '../layouts/Menu/Menu.js';



// import Home                       from '../components/Home.js';
// import Dashboard                  from '../components/Dashboard/Dashboard.js';
// import Menu                       from '../components/Menu/Menu.js';
// import AuthLoadingScreen          from '../layouts/AuthLoading/AuthLoadingScreen.js'; 


/*----SystemSecurity -----*/
import Login                      from '../components/SystemSecurity/Login/Login1.js';
import ForgotPassword             from '../components/SystemSecurity/ForgotPassword/ForgotPassword1.js';
import ResetPassword              from '../components/SystemSecurity/ResetPassword/ResetPassword1.js';
import Signup                     from '../components/SystemSecurity/Signup/Signup1.js';
import OTPVerification            from '../components/SystemSecurity/OTPVerification/OTPVerification.js';
import ForgotPasswordOTP          from '../components/SystemSecurity/ForgotPasswordOTP/ForgotPasswordOTP1.js';


import Dashboard from '../components/Dashboard/Dashboard.js';
import CategoriesComponent from'../components/CategoriesComponent/CategoriesComponent.js';
import SubCategoriesComp from'../components/CategoriesComponent/SubCategoriesComp.js';
import SubCatCompView from'../components/CategoriesComponent/SubCatCompView.js';
import CartComponent from '../components/CartComponent/CartComponent.js';
import ConfirmOrderComponent from '../components/ConfirmOrderComponent/ConfirmOrderComponent.js';
import AddressDefaultComp from '../components/AddressComponent/AddressDefaultComp.js';
import AddressComponent from '../components/AddressComponent/AddressComponent.js';
import AddressMenu from'../components/AddressComponent/AddressMenu.js';
import WishlistComponent from'../components/WishlistComponent/WishlistComponent.js';
import MyOrder from '../components/MyOrders/MyOrder.js';
import OrderDetails from '../components/MyOrders/OrderDetails.js';
import AccountDashboard from '../components/AccountDashboard/AccountDashboard.js';
import AccountInformation from'../components/AccountDashboard/AccountInformation.js';
import MyProductReview from'../components/MyProductReview/MyProductReview.js';

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

