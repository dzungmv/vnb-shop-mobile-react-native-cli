import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import AuthStack from './auth-stack';
import MainStack from './main-stack';
// import AuthStack from './auth-stack';

const Drawer = createDrawerNavigator();
export default function NavigationManager() {
  const isAuth: boolean = true;
  return (
    <NavigationContainer>
      {isAuth ? (
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Drawer.Screen name="Main" component={MainStack} />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
