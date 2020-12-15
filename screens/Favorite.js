import React, {useEffect, useState} from 'react';
import {THEME_COLORS} from '../Theme';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {commonStyle} from './commonStyle';
import {APP_BACKGROUND_IMAGE} from '../KitchenData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite = ({navigation}) => {
  const getDataArray = async () => {
    // AsyncStorage.clear()
    console.log('UseEffect--------');
    let jsonArray = await AsyncStorage.getItem('favData');
    jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
    // favArray.push(JSON.parse(jsonValue));
    // let obj = [];
    console.log('====JSON.parse(jsonValue)==', jsonArray);
    // obj.push(JSON.parse(jsonValue));
    dataSet(jsonArray);
    setIndex(index + 1);
    // console.log('getData-------', data);
  };
  const [data, dataSet] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getDataArray);

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={commonStyle.imageBg}
        source={APP_BACKGROUND_IMAGE}>
        <FlatList
          extraData={index}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          ListEmptyComponent={
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                alignSelf: 'center',
                color:THEME_COLORS.background
              }}>
              {'No Favorite Recipe Found'}
            </Text>
          }
          renderItem={({item}) => {
            console.log("item--->", item)
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('KitchenCategoryDetails', {Item: item})}
                style={styles.categoryContainer}>
                <Image
                  style={{height: 250, width: '100%'}}
                  source={{uri: item.image[0]}}
                />
                <View
                  style={{
                    backgroundColor: THEME_COLORS.background,
                    width: '100%',
                    padding: 5,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={[styles.title, {textAlign: 'center'}]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: THEME_COLORS.background,
    flex: 1,
    padding: 10,
  },
  categoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: THEME_COLORS.primaryColor,
  },
};

export default Favorite;
