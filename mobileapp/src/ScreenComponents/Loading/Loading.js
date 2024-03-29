import React from 'react';
import PropTypes from 'prop-types';

import { View, ActivityIndicator, Image } from 'react-native';
// import styles from './styles';
import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/LoadingStyles.js';
const Loading = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={{height:'100%'}} size="large" color="#2bbbad" />
      
    </View>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
};

Loading.defaultProps = {
  size: 'large',
};

export default Loading;
