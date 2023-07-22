import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {adidas, kawasaki, lining, yonex} from '../assets';

export default function Sponsor() {
  return (
    <View className="px-4 mt-10 flex-col gap-3">
      <View className="border rounded-xl flex justify-between p-2 border-[#3644b7]">
        <Image
          source={yonex}
          resizeMode="contain"
          className="w-[100px] h-[100px] -mt-8"
        />

        <View>
          <Text className="text-base text-start text-[#3644b7]">
            Yonex Co., Ltd. is a Japanese sports equipment manufacturing
            company. Yonex produces equipment and apparel for tennis, badminton,
            golf, and running
          </Text>
        </View>
      </View>

      <View className="border px-1 rounded-xl flex justify-between p-2 border-[#edbd62]">
        <Image
          source={kawasaki}
          resizeMode="contain"
          className="w-[100px] h-[100px] -mt-10"
        />

        <View>
          <Text className="text-base text-[#edbd62]">
            KAWASAKI Badminton was founded in 1915 in Japan, and created world
            first carbon racket in 1983 named
          </Text>
        </View>
      </View>

      <View className="border px-1 rounded-xl flex justify-between p-2 border-[#d781f0]">
        <Image
          source={adidas}
          resizeMode="contain"
          className="w-[50px] h-[50px]"
        />

        <View>
          <Text className="text-base text-[#d781f0]">
            Adidas AG is a German multinational corporation, founded in Bavaria.
          </Text>
        </View>
      </View>

      <View className="border px-1 rounded-xl flex justify-between p-2 border-[#925ff6]">
        <Image
          source={lining}
          resizeMode="contain"
          className="w-[100px] h-[100px] -mt-8 -ml-3"
        />

        <View>
          <Text className="text-base text-[#925ff6]">
            Li-Ning Company Limited is a Chinese sportswear and sports equipment
            company founded by former Olympic gymnast Li Ning
          </Text>
        </View>
      </View>
    </View>
  );
}
