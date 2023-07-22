import * as React from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import catalogs from './../components/common/catalog-ui.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CatalogCmpProps = {
  id: number;
  name?: string;
  href: string;
  imageSrc: string;
};

export function Catalog() {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const width = Dimensions.get('window').width;

  return (
    <View className="px-4 my-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-medium">Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
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
        }}>
        {catalogs.map((catalog: CatalogCmpProps) => {
          return (
            <TouchableHighlight
              className="rounded-[10px] mr-2"
              key={catalog.id}
              style={{
                width: width / 3 - 25,
                height: 100,
              }}
              onPress={() =>
                navigation.navigate('Products', {
                  screen: catalog?.href,
                })
              }>
              <Image
                source={{
                  uri: catalog.imageSrc,
                }}
                className="w-full h-full object-cover rounded-[10px]"
              />
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </View>
  );
}
