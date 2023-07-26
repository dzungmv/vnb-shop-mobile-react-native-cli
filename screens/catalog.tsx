import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MainStackParamsList} from '../type';
import catalogs from './../components/common/catalog-ui.json';

type CatalogCmpProps = {
  id: number;
  name?: string;
  href: string;
  type: string;
  imageSrc: string;
};

export function Catalog() {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();

  return (
    <View className="px-4 my-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-medium">Categories</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Products', {type: ''})}>
          <View className="flex-row items-center">
            <Text>Show all</Text>
            <Icon name="chevron-right" size={16} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 8,
        }}
        className="flex-row flex-wrap gap-3 mt-1">
        {catalogs.map((catalog: CatalogCmpProps) => {
          return (
            <TouchableOpacity
              className="rounded-[10px] mr-2"
              key={catalog.id}
              onPress={() =>
                navigation.navigate('Products', {
                  type: catalog?.type,
                })
              }>
              <View className="flex items-center p-1">
                <Image
                  source={{
                    uri: catalog.imageSrc,
                  }}
                  className="w-[45px] h-[45px] object-cover rounded-full"
                />
                <Text className="text-base ml-2 mt-1">{catalog.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
