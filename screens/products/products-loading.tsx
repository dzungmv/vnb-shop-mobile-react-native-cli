import * as React from 'react';
import {Dimensions, View} from 'react-native';
import Skeleton from '../../components/common/skeleton';

export default function ProductsLoading() {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 56) / 2;
  return (
    <View className="px-4 mt-4 flex-row flex-wrap">
      {['', '', '', '', '', ''].map((_: any, index: number) => {
        return (
          <View
            key={index}
            style={{
              width: itemWidth,
              height: 250,
              backgroundColor: 'white',
              borderRadius: 16,
              margin: 8,
            }}>
            <Skeleton
              width={itemWidth}
              height={150}
              styles={{
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
              }}
            />
            <View className="px-2">
              <Skeleton
                width={itemWidth - 25}
                height={10}
                styles={{
                  borderRadius: 9999,
                  marginTop: 16,
                }}
              />

              <Skeleton
                width={itemWidth / 2}
                height={10}
                styles={{
                  borderRadius: 9999,
                  marginTop: 12,
                }}
              />

              <Skeleton
                width={itemWidth - 50}
                height={10}
                styles={{
                  borderRadius: 9999,
                  marginTop: 24,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
