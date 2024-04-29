/* eslint-disable */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../components/Login/Index';
import HomeScreen from '../pages/Home';
import ProductScreen from '../pages/Product';
import TransactionScreen from '../pages/Transaction';
import AppNavigator from '../navigation/AppNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailProduct from '../pages/DetailProduct/[...id]';
import DetailTransaction from '../pages/DetailTransaction/[...id]';
import ProcessTransaction from '../components/ProcessTransaction';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabs"
          component={AppNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Detail"
          component={DetailProduct}
          initialParams={{id: ''}}
        />
        <Stack.Screen name="DetailTtransaction" component={DetailTransaction} />
        <Stack.Screen
          name="ProcessTransaction"
          component={ProcessTransaction}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
