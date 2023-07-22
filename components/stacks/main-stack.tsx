/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Cart from '../../screens/cart';
import Home from '../../screens/home';
import Orders from '../../screens/orders';
import Products from '../../screens/products';
import Profile from '../../screens/profile';
import FontAwesomeIcon from '../common/icons/fontawesome-icon';
import IonIcon from '../common/icons/ion-icon';
import MaterialIcon from '../common/icons/material-icon';
import Search from '../../screens/search';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SearchNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeSC" component={Home} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Search"
        component={Search}
      />
    </Stack.Navigator>
  );
};

export default function MainStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF2461',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialIcon name="home" color="#FF2461" />
            ) : (
              <MaterialIcon name="home-outline" color="black" />
            ),
        }}
        name="Home"
        component={SearchNavigation}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <IonIcon name="cart" color="#FF2461" />
            ) : (
              <IonIcon name="cart-outline" color="black" />
            ),
        }}
        name="Cart"
        component={Cart}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <IonIcon name="rocket-sharp" color={'#FF2461'} />
            ) : (
              <IonIcon name="rocket-outline" color="black" />
            ),
        }}
        name="Products"
        component={Products}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialIcon name="tag-heart" color={'#FF2461'} />
            ) : (
              <MaterialIcon name="tag-heart-outline" color="black" />
            ),
        }}
        name="Orders"
        component={Orders}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesomeIcon name="user-circle" color={'#FF2461'} />
            ) : (
              <FontAwesomeIcon name="user-circle-o" color="black" />
            ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
