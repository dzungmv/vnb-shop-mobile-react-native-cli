import * as React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconProps} from './type';

export default function MaterialOIcon({name, size = 25, color}: IconProps) {
  return <Icon size={size} name={name} color={color} />;
}
