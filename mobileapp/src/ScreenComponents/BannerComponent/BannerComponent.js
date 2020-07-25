import React from 'react';
import {
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/BannerComponentStyles.js';
import ValidationComponent from "react-native-form-validator";
import Carousel from 'react-native-banner-carousel';

// const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 230;
 
const images = [
  {
    imageSource : require("../../AppDesigns/currentApp/images/img11.jpg"),
  },
  {
    imageSource : require("../../AppDesigns/currentApp/images/VeggiesBanner1.png"),
  
  },
  {
    imageSource : require("../../AppDesigns/currentApp/images/Fruits1.png"),
 
  }
];

export default class BannerComponent extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  
  renderPage(image, index) {
        return (
            <View key={index}>
                <ImageBackground 
                  style={{ width:380, height: 230,}} 
                  source={image.imageSource}
                  // resizeMode={"contain"}
                >
                </ImageBackground>
            </View>
        );
    }

  render() {


    return (
     
        <View style={styles.bannerWrapper}>
            <Carousel
               autoplay
               autoplayTimeout={5000}
               loop
               index={0}
              //  pageSize={BannerWidth}
               pageSize={360}
               >
              {images.map((image, index) => this.renderPage(image, index))}
            </Carousel>
        </View>
    
    );
  }
}
