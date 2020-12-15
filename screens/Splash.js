import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {THEME_COLORS} from '../Theme';

const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('Home');
    }, 1000);
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: THEME_COLORS.background,
      }}>
      <Image
        style={{width: 200, height: 200}}
        source={require('../assets/cooking.png')}></Image>
    </View>
  );
};

export default Splash;
