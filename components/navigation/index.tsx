import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import AuthStack from './auth-stack';
import StackNavigation from './stack';
import {UserTypes} from '../../type';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();
export default function NavigationManager() {
  const user: UserTypes = useSelector((state: any) => state.user.user);
  return (
    <NavigationContainer>
      {user?.tokens?.accessToken ? (
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Drawer.Screen name="Home" component={StackNavigation} />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
