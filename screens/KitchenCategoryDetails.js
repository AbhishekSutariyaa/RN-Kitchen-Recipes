import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Share,
} from 'react-native';
import {APP_BACKGROUND_IMAGE, APP_NAME} from '../KitchenData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THEME_COLORS} from '../Theme';
import {commonStyle} from './commonStyle';
import {SliderBox} from 'react-native-image-slider-box';

const KitchenCategoryDetails = ({route, navigation}) => {
  const {Item} = route.params;
  const [favData, setData] = useState([]);
  // const [images, setImages] = useState([]);

  navigation.setOptions({
    headerTitle: Item.name,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', isDataFav);
    // setImages(Item.image);
    return unsubscribe;
  }, [navigation]);

  const isDataFav = async () => {
    let jsonArray = await AsyncStorage.getItem('favData');
    jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
    let checkItem = jsonArray.filter((item) => item.name == Item.name);
    // console.log('dataArray--', checkItem);
    setData(checkItem);
  };

  const addToFav = async (data) => {
    try {
      // AsyncStorage.clear()
      console.log('press Fav');
      let jsonArray = await AsyncStorage.getItem('favData');
      jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
      // console.log('jsonArray--', jsonArray);
      jsonArray.push(data);
      const jsonValue = JSON.stringify(jsonArray);
      await AsyncStorage.setItem('favData', jsonValue).then((i) =>
        console.log('response---->'),
      );
      isDataFav();
    } catch (e) {
      console.log('e----->>>>', e);
    }
  };

  const removeFromFav = async (data) => {
    try {
      let jsonArray = await AsyncStorage.getItem('favData');

      jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
      let filterArray = jsonArray.filter((i) => i.name !== data.name);
      const jsonValue = JSON.stringify(filterArray);
      await AsyncStorage.setItem('favData', jsonValue);
      isDataFav();
    } catch (e) {
      console.log('e--', e);
    }
  };

  const handleOnShare = async () => {
    try {
      const result = await Share.share({
        message: `Share your ${Item.name} for  ${APP_NAME}`,
        url: Item.des,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        alert('dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={commonStyle.imageBg}
        source={APP_BACKGROUND_IMAGE}>
        {/* <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('FullImage', {itemImage: Item.image});
          }}>
          <Image
            style={styles.mobileImage}
            source={{url: Item.image}}
            resizeMode="stretch"
          />
        </TouchableOpacity> */}

        {Item.image.length > 0 ? (
          <SliderBox
            images={Item.image}
            onCurrentImagePressed={(index) => {
              console.log(`image ${index} pressed`);
              navigation.navigate('FullImage', {itemImage: Item.image[index]});
            }}
            sliderBoxHeight={280}
            dotColor={THEME_COLORS.background}
            inactiveDotColor="#90A4AE"
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 15,
              marginHorizontal: 10,
              padding: 0,
              margin: 0,
              borderWidth: 2,
            }}
            autoplay
            circleLoop
          />
        ) : null}

        {/* <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              !favData.length ? addToFav(Item) : removeFromFav(Item);
            }}>
            <Text style={styles.buttonText}>
              {!favData.length ? 'Add To Favorite' : 'Remove From Favorite'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonContainer, {margin: 10}]}
            onPress={handleDownload}>
            <Text
              style={{
                textAlign: 'center',
                color: THEME_COLORS.background,
                fontWeight: 'bold',
              }}>
              {'Download Image'}
            </Text>
          </TouchableOpacity>
        </View> */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: THEME_COLORS.background,
            paddingTop: 10,
          }}>
          {Item.name}
        </Text>
        <View style={styles.textDuration}>
          <Text style={{color: THEME_COLORS.background}}>
            Recipe Duration:
            <Text style={{fontWeight: 'bold'}}>{Item.type + ' Mins'}</Text>
          </Text>
          <Text style={{color: THEME_COLORS.background}}>
            Calories: <Text style={{fontWeight: 'bold'}}>{Item.calories}</Text>
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={
            !favData.length ? () => addToFav(Item) : () => removeFromFav(Item)
          }
          style={[
            styles.touchableOpacityStyle,
            {
              backgroundColor: !favData.length
                ? THEME_COLORS.background
                : 'yellow',
            },
          ]}>
          <Image
            source={require('../assets/star.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleOnShare}
          style={[styles.downloadTouchableOpacityStyle, {zIndex: 300}]}>
          <Image
            source={require('../assets/share.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Item.des}
          renderItem={({item, index}) => {
            return (
              <View style={styles.detailItemcontainer}>
                <Text style={{fontSize: 16, color: THEME_COLORS.background}}>
                  {item}
                </Text>
              </View>
            );
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
    // padding: 10,
  },
  mobileImage: {width: '100%', height: 260},
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  detailItemcontainer: {
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  textDuration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    margin: 10,
  },
  buttonContainer: {
    borderWidth: 1,
    marginVertical: 10,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: THEME_COLORS.primaryColor,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: THEME_COLORS.background,
    fontWeight: 'bold',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
    backgroundColor: THEME_COLORS.background,
    borderRadius: 25,
    zIndex: 100,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
    //backgroundColor:'black'
  },
  downloadTouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 70,
    backgroundColor: THEME_COLORS.background,
    borderRadius: 25,
  },
};

export default KitchenCategoryDetails;
