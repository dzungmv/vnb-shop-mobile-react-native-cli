import * as React from 'react';
import {BlurView} from '@react-native-community/blur';
import {ActivityIndicator, StyleSheet} from 'react-native';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({isLoading}) => {
  return (
    <>
      {isLoading && (
        <BlurView
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="white"
          style={styles.absolute}>
          <ActivityIndicator size="large" color="black" />
        </BlurView>
      )}
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});
