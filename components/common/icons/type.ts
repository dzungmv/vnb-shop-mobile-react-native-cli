import {PropsWithChildren} from 'react';

export type IconProps = PropsWithChildren<{
  size?: number;
  name: string;
  color?: string;
}>;
