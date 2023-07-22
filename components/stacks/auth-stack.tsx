import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginSC from '../../screens/login';
import Register from '../../screens/register';
import Hello from '../../screens/hello';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Hello" component={Hello} />
      <Stack.Screen name="Login" component={LoginSC} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
