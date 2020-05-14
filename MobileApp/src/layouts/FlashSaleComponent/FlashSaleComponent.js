import React from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  AsyncStorage,
  TextInput,
  Alert
} from 'react-native';
import styles from './styles.js';
import { colors, sizes } from '../../config/styles.js';
import ValidationComponent from "react-native-form-validator";
import Loading from '../../layouts/Loading/Loading.js';


const window = Dimensions.get('window');

export default class FlashSaleComponent extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuCarouselData:[
            {
            "menuCarouselImage" : require("../../images/2.png"),
            "menuCarouselTitle" : "Furniture"
          },
          {
            "menuCarouselImage" : require("../../images/3.png"),
            "menuCarouselTitle" : "Fashion"
          },
          {
            "menuCarouselImage" : require("../../images/4.png"),
            "menuCarouselTitle" : "Kitchen"
          },
          {
            "menuCarouselImage" : require("../../images/5.png"),
            "menuCarouselTitle" : "Grocery"
          },
          {

            "menuCarouselImage" : require("../../images/6.png"),
            "menuCarouselTitle" : "Electronics"
          },
        ]
    };
  }
  

  render() {
      
      return (
        <View>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} >
              <View style={{marginTop:30}}>
                <View style={styles.menuWrapper}>
                      {this.state.menuCarouselData.map((menuCarouselData,i)=>{
                        return(
                            <View key={i} >
                              <TouchableOpacity onPress={()=>this.props.navigate('CategoriesComponent')}>
                                 <View style={styles.imageMenuWraper} >
                                      <Image
                                      source={menuCarouselData.menuCarouselImage}
                                      style={{ height:50,borderRadius:50,width: 50,}}
                                      />
                              <Text style={{color:'#333',textAlign:'center',marginTop:8,fontSize:10,fontFamily:"Montserrat-Regular"}}>{menuCarouselData.menuCarouselTitle}</Text>
                                 </View>
                              </TouchableOpacity>
                            </View>
                            )
                        })
                       }
                </View>
              </View>
          </ScrollView>
          <View style={{borderWidth:1,borderColor:"#f2f2f2",width:"100%",marginVertical:10}}></View>
        </View>
    
    );
  }
}
