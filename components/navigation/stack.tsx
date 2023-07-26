import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../../screens/search';
import TabNavigation from './tab';
import ProductDetail from '../../screens/product-detail';
import Checkout from '../../screens/checkout';
import OrderDetail from '../../screens/order-detail';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tab" component={TabNavigation} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
}
