import * as React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {IconProps} from './type';

export default function FontAwesomeIcon({name, size = 25, color}: IconProps) {
  return <Icon size={size} name={name} color={color} />;
}
