import React from 'react';
import {Image, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {THEME_COLORS} from '../Theme';
import Favorite from './Favorite';
import Filter from './Filter';
import KitchenCategory from './KitchenCategory';

const Tab = createBottomTabNavigator();

const Home = ({params}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: THEME_COLORS.primaryColor,
        inactiveTintColor: '#000000',
        labelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={KitchenCategory}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/home.png')}
              style={{height: focused ? 30 : 20, width: focused ? 30 : 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/star.png')}
              style={{height: focused ? 30 : 20, width: focused ? 30 : 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Filter"
        component={Filter}
        options={{
          tabBarLabel: 'Filter',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/filtertab.png')}
              style={{height: focused ? 30 : 20, width: focused ? 30 : 20}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
