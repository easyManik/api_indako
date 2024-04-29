/* eslint-disable */
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../storages/store';
import HomeScreen from '../pages/Home';
import ProductScreen from '../pages/Product';
import TransactionScreen from '../pages/Transaction';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddProduct from '../components/AddProduuct';

const Tab = createBottomTabNavigator();
function AppNavigator() {
  const {role} = useSelector((state: RootState) => state.auth);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      // screenOptions={{
      //   tabBarActiveTintColor: '#EEC302',
      // }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {role === 'kasir' && (
        <>
          <Tab.Screen name="Product" component={ProductScreen} />
        </>
      )}
      {role === 'owner' && (
        <>
          <Tab.Screen name="Product" component={ProductScreen} />
          <Tab.Screen name="AddProduct" component={AddProduct} />
          <Tab.Screen name="Transaction" component={TransactionScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}

export default AppNavigator;
