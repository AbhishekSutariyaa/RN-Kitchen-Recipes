import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Switch,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {THEME_COLORS} from '../Theme';
import {commonStyle} from './commonStyle';
import {APP_BACKGROUND_IMAGE} from '../KitchenData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Filter = ({navigation}) => {
  const [isFirst, setFirstFilter] = useState(false);
  const [isSecond, setSecondFilter] = useState(false);
  const [isThird, setThirdFilter] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getDataArray);

    return unsubscribe;
  }, [navigation]);

  const getDataArray = async () => {
    let filterData = await AsyncStorage.getItem('filter');
    filterData = filterData ? JSON.parse(filterData) : [];
    // console.log('====JSON.parse(jsonValue)==', filterData);

    if (filterData.length) {
      if (filterData.includes(1)) setFirstFilter(true);
      if (filterData.includes(2)) setSecondFilter(true);
      if (filterData.includes(3)) setThirdFilter(true);
    }
  };

  const onSave = async () => {
    try {
      let data = [];
      if (isFirst) {
        data.push(1);
      }
      if (isSecond) {
        data.push(2);
      }
      if (isThird) {
        data.push(3);
      }
      data = JSON.stringify(data);
      await AsyncStorage.setItem('filter', data).then( i => alert("Filter Applied Successfully"))
    } catch (e) {
      console.log('e----->>>>', e);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={commonStyle.imageBg}
        source={APP_BACKGROUND_IMAGE}>
        <View style={styles.switchContainer}>
          <View style={{flex: 0.7, color: THEME_COLORS.background}}>
            <Text style={styles.textStyle}>{'Calories between 0- 200'}</Text>
          </View>
          {/* <View style={{flex: 0.3}}> */}
          <Switch
            trackColor={{false: '#000000', true: '#fff'}}
            thumbColor={isFirst ? '#23910d' : '#f4f3f4'}
            ios_backgroundColor="#000000"
            onValueChange={(newValue) => {
              setFirstFilter(newValue);
            }}
            value={isFirst}
          />
          {/* </View> */}
        </View>
        <View style={styles.switchContainer}>
          <View style={{flex: 0.7}}>
            <Text style={styles.textStyle}>{'Calories between 200 - 400'}</Text>
          </View>
          <Switch
            trackColor={{false: '#000000', true: '#fff'}}
            thumbColor={isSecond ? '#23910d' : '#f4f3f4'}
            ios_backgroundColor="#000000"
            onValueChange={(newValue) => {
              setSecondFilter(newValue);
            }}
            value={isSecond}
          />
        </View>
        <View style={styles.switchContainer}>
          <View style={{flex: 0.7}}>
            <Text style={styles.textStyle}>{'Calories are > 400'}</Text>
          </View>
          <Switch
            trackColor={{false: '#000000', true: '#fff'}}
            thumbColor={isThird ? '#23910d' : '#f4f3f4'}
            ios_backgroundColor="#000000"
            onValueChange={(newValue) => {
              setThirdFilter(newValue);
            }}
            value={isThird}
          />
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            alignSelf: 'center',
            padding: 10,
            marginTop: 10,
            borderColor: THEME_COLORS.background,
            borderRadius: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => onSave()}>
          <Text style={[styles.textStyle,{margin:5}]}>{'SAVE'}</Text>
          <Image
            source={require('../assets/save.png')}
            style={{height: 20, width: 20, margin:5}}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
const styles = {
  textContainer: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    margin: 20,
  },
  textStyle: {
    fontSize: 16,
    color: THEME_COLORS.background,
    fontWeight: 'bold',
  },
};
export default Filter;
