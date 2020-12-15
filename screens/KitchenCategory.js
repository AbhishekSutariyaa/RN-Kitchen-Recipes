import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {KITCHEN_CATEGORY, APP_BACKGROUND_IMAGE} from '../KitchenData';
import {THEME_COLORS} from '../Theme';
import {commonStyle} from './commonStyle';

const KitchenCategory = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={commonStyle.imageBg}
        source={ APP_BACKGROUND_IMAGE}>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 10,
            fontWeight: 'bold',
            fontSize: 20,
            color: THEME_COLORS.background,
          }}>
          {`Please Choose Kitchen Category`}
        </Text>
        <FlatList
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}
          data={KITCHEN_CATEGORY}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('KitchenCategoryList', {
                    itemId: item.id,
                    headerTitlePass: item.title,
                  })
                }
                style={styles.categoryContainer}>
                <Image
                  style={{height: 250, width: '100%'}}
                  source={{uri: item.image}}
                />
                <View
                  style={{
                    position: 'absolute',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 9,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 12.35,
                    elevation: 19,
                    right: 5,
                    bottom: 5,
                  }}>
                  <Text
                    style={[
                      styles.title,
                      {
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 24,
                        fontWeight: 'bold',
                        textShadowOffset: {width: 2, height: 2},
                        textShadowRadius: 10,
                        textShadowColor: 'black',
                      },
                    ]}>
                    {item.title}
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
    // backgroundColor: THEME_COLORS.background,
    flex: 1,
    // padding: 10,
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
    color: THEME_COLORS.background,
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
};

export default KitchenCategory;
