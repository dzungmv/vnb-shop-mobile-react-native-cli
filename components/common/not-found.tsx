import * as React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {notFoundAnimation} from './animation';
import {Text, View} from 'react-native';

type NotFoundProps = {
  width?: number;
  height?: number;
  color?: string;
  title: string;
};

export default function NotFound({
  width = 300,
  height = 300,
  title,
  color = 'black',
}: NotFoundProps) {
  return (
    <View className="flex justify-center items-center flex-1">
      <AnimatedLottieView
        style={{
          width: width,
          height: height,
        }}
        source={notFoundAnimation}
        autoPlay
        loop
      />
      <Text
        className="mt-3 text-2xl font-semibold"
        style={{
          color: color,
        }}>
        {title}
      </Text>
    </View>
  );
}
