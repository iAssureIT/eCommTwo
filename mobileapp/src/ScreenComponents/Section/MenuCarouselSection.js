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
import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/MenuCarouselSectionStyles.js';
import { colors, sizes } from '../../AppDesigns/currentApp/styles/CommonStyles.js.js';
import ValidationComponent from "react-native-form-validator";
import Loading from '../../layouts/Loading/Loading.js';
import axios                      from 'axios';

const window = Dimensions.get('window');

export default class MenuCarousel extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      sections             : [],
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      sections:nextProps.sections
    },()=>{
      
    });
  } 
  
  
  render() {
      console.log('sections -------------------->', this.state.sections);
      return (
        <View>
          <View>
            <Text style={styles.title}>List of Sections</Text> 
          </View>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} >
              {this.state.sections && this.state.sections.length>0?
                this.state.sections.map((item, index)=>{
                    if(this.state.sections.length == index + 1){

                        return(
                          <TouchableOpacity onPress={()=>this.props.navigation.navigate('CategoriesComponent',{section_id:item._id})}>
                             <View style={styles.imageMenuWraper} >
                                  <Image
                                   source= {require("../../AppDesigns/currentApp/images/saleimage.png")}
                                   style={{ height:80,borderRadius:5,width: 120,}}
                                  />
                             </View>
                             <Text style={{color:'#333',flexShrink:1,textAlign:'center',marginTop:10,fontSize:13,fontFamily:"Montserrat-SemiBold",flexWrap: 'wrap'}}>{item.section}</Text>
                          </TouchableOpacity>
                        );
                    }else{
                        return(
                          <TouchableOpacity onPress={()=>this.props.navigate('CategoriesComponent',{section_id:item._id})}>
                             <View style={styles.imageMenuWraper} >
                                  <Image
                                 
                                     source= {require("../../AppDesigns/currentApp/images/saleimage.png")}
                                  style={{ height:80,borderRadius:5,width: 120,}}
                                  />
                             </View>
                             <Text style={{color:'#333',flexShrink:1,textAlign:'center',marginTop:10,fontSize:13,fontFamily:"Montserrat-SemiBold",flexWrap: 'wrap'}}>{item.section}</Text>
                          </TouchableOpacity>
                        );
                    }
                })
                :
                null
            }
          </ScrollView>
          <View style={{borderWidth:1,borderColor:"#f2f2f2",width:"100%",marginVertical:20}}></View>
        </View>
    
    );
  }
}
