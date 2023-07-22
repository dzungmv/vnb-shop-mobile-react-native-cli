import * as React from 'react';
import {Dimensions, View} from 'react-native';
import Skeleton from '../../components/common/skeleton';

export default function SearchSkeleton() {
  const skeContentWidth = Dimensions.get('window').width - 102;
  return (
    <View className=" px-5 flex-col gap-2">
      {['', '', '', ''].map((_: any, index: number) => (
        <View key={index} className="w-full flex-row items-center">
          <Skeleton
            width={50}
            height={50}
            styles={{borderRadius: 9999, marginRight: 12}}
          />
          <View>
            <Skeleton
              width={skeContentWidth}
              height={10}
              styles={{borderRadius: 9999, marginBottom: 8}}
            />
            <Skeleton width={70} height={10} styles={{borderRadius: 9999}} />
          </View>
        </View>
      ))}
    </View>
  );
}
