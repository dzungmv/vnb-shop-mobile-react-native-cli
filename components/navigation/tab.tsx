/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Cart from '../../screens/cart';
import Home from '../../screens/home';
import Orders from '../../screens/orders';
import Products from '../../screens/products';
import Profile from '../../screens/profile';
import FontAwesomeIcon from '../common/icons/fontawesome-icon';
import IonIcon from '../common/icons/ion-icon';
import MaterialIcon from '../common/icons/material-icon';

const Tab = createBottomTabNavigator();

const ProductsWrapper: React.FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  return <Products navigation={navigation} route={route} />;
};

export default function TabNavigation() {
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
        component={Home}
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
            // <View
            //   style={{
            //     width: 100,
            //     height: 100,
            //     backgroundColor: 'black',
            //     display: 'flex',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     borderRadius: 9999,
            //   }}>
            //   {}
            // </View>
            focused ? (
              <IonIcon name="rocket-sharp" color={'#FF2461'} />
            ) : (
              <IonIcon name="rocket-outline" color="black" />
            ),
        }}
        name="Products"
        component={ProductsWrapper}
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
