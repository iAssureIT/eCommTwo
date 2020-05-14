import { createSwitchNavigator }  from 'react-navigation';
import { createDrawerNavigator }  from 'react-navigation-drawer';
import { createStackNavigator }   from 'react-navigation-stack';
import { createAppContainer }     from '@react-navigation/native';
import { Animated, Easing } from 'react-native';

import AuthLoadingScreen from '../layouts/AuthLoadingScreen/AuthLoadingScreen.js';

import Menu from '../layouts/Menu/Menu.js';

import LogIn from '../components/LogIn/LogIn.js';
import SignUp from '../components/SignUp/SignUp.js';
import SignUpOTP from '../components/SignUpOTP/SignUpOTP.js';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword.js';
import ForgotPasswordOTP from '../components/ForgotPasswordOTP/ForgotPasswordOTP.js';
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
      header: null
    }
  },

  LogIn: {
    screen: LogIn,
    navigationOptions: {
      header: null,
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  SignUpOTP: {
    screen: SignUpOTP,
    navigationOptions: {
      header: null
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      header: null
    }
  },

  ForgotPasswordOTP: {
    screen: ForgotPasswordOTP,
    navigationOptions: {
      header: null
    }
  },

  CategoriesComponent: {
    screen: CategoriesComponent,
    navigationOptions: {
      header: null
    }
  },
    SubCategoriesComp: {
    screen: SubCategoriesComp,
    navigationOptions: {
      header: null
    }
  },
    SubCatCompView: {
    screen: SubCatCompView,
    navigationOptions: {
      header: null
    }
  },
  CartComponent:{
    screen: CartComponent,
    navigationOptions: {
    header: null
    }
  },
   ConfirmOrderComponent:{
    screen: ConfirmOrderComponent,
    navigationOptions: {
    header: null
    }
  },
  AddressDefaultComp:{
    screen: AddressDefaultComp,
    navigationOptions: {
    header: null
    }
  },
  AddressComponent:{
    screen:AddressComponent,
    navigationOptions:{
    header:null
    }
  },
  AddressMenu:{
    screen:AddressMenu,
    navigationOptions:{
    header:null
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
    header:null
    }
},
OrderDetails:{
   screen:OrderDetails,
    navigationOptions:{
    header:null
    }
},
AccountDashboard:{
   screen:AccountDashboard,
    navigationOptions:{
    header:null
    }
},
AccountInformation:{
   screen:AccountInformation,
    navigationOptions:{
    header:null
    }
},
MyProductReview:{
   screen:MyProductReview,
    navigationOptions:{
    header:null
    }
}, 





   
},{
  transitionConfig: TransitionConfiguration
});

const drawer = createDrawerNavigator({
  Home : {
    screen: HomeStack
  }
},{
  contentComponent: Menu
});

// const AuthStack = createStackNavigator({

//   LogIn: {
//     screen: LogIn,
//     navigationOptions: {
//       header: null,
//          headerBackTitleVisible:false,
//     }
//   },
  
//   SignUpOTP: {
//     screen: SignUpOTP,
//     navigationOptions: {
//       header: null
//     }
//   },
//   ForgotPassword: {
//     screen: ForgotPassword,
//     navigationOptions: {
//       header: null
//     }
//   },

//   ForgotPasswordOTP: {
//     screen: ForgotPasswordOTP,
//     navigationOptions: {
//       header: null
//     }
//   },

//   Dashboard: {
//     screen: Dashboard,
//     navigationOptions: {
//       header: null
//     }
//   },

// });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading : AuthLoadingScreen,
    App         : drawer,
    Auth        : HomeStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

