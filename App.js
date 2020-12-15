import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import Splash from './screens/Splash';
import Home from './screens/Home';
import KitchenCategoryDetails from './screens/KitchenCategoryDetails';
import FullImage from './screens/FullImage';
import KitchenCategoryList from './screens/KitchenCategoryList';

const Stack = createStackNavigator();

const App = ({params}) => {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator initialRouteName={'Splash'}>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="KitchenCategoryList"
            component={KitchenCategoryList}
            // options={{headerTitle: 'Category List'}}
          />
          <Stack.Screen
            name="KitchenCategoryDetails"
            component={KitchenCategoryDetails}
            options={{headerTitle: 'Category Details'}}
          />
          <Stack.Screen
            name="FullImage"
            component={FullImage}
            options={{headerTitle: 'Kitchen Recipes'}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
