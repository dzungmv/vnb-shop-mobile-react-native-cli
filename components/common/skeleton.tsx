import * as React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import type {ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type SkeletonProps = {
  width: number;
  height: number;
  styles?: ViewStyle;
};
export default function Skeleton({width, height, styles}: SkeletonProps) {
  const translateX = React.useRef(new Animated.Value(-width)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      }),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  return (
    <View
      style={StyleSheet.flatten([
        {
          width: width,
          height: height,
          backgroundColor: 'rgba(0,0,0,0.12)',
          overflow: 'hidden',
        },
        styles,
      ])}>
      <Animated.View
        className="w-full h-full"
        style={{transform: [{translateX: translateX}]}}>
        <LinearGradient
          className="w-full h-full"
          colors={['transparent', 'rgba(0, 0, 0, 0.05)', 'transparent']}
          start={{
            x: 1,
            y: 1,
          }}
        />
      </Animated.View>
    </View>
  );
}
