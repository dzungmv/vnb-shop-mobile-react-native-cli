import {NavigationProp} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MainStackParamsList} from '../type';

type CartScreenNavigationProps = NavigationProp<MainStackParamsList, 'Cart'>;

interface Props {
  navigation: CartScreenNavigationProps;
}

export default function Cart({navigation}: Props) {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text> Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
