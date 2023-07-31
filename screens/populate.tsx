import {API_URL} from '@env';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MainStackParamsList, ProductType} from '../type';

type Props = {
  setPending: (state: boolean) => void;
};

export function Polulate({setPending}: Props) {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();

  const [data, setData] = React.useState<ProductType[]>([]);
  // const res = axios.get(`${API_URL}/product/get-products?page=${1}&limit=5}`);
  const saleProductCalculate = (price: number) => {
    const sale = price * 0.1;
    return price - sale;
  };

  React.useEffect(() => {
    (async () => {
      setPending(true);
      const res = await axios.get(
        `${API_URL}/product/get-products?page=${1}&limit=5}`,
      );
      setData(res.data?.data);
      setPending(false);
    })();
  }, [setPending]);

  return (
    <>
      <View className="px-4 my-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-medium">Populate</Text>
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
          }}>
          {data.map((item: ProductType) => {
            return (
              <TouchableOpacity
                className="rounded-[10px] mr-5 bg-white p-2 pb-3"
                key={item._id}
                style={{
                  width: width / 2,
                }}
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    data: item,
                  })
                }>
                <View>
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    className="w-full h-[220px] object-cover"
                  />
                  <View>
                    <Text numberOfLines={1} className="font-medium mb-3">
                      {item.name}
                    </Text>
                    <Text className="mb-1 text-center line-through text-gray-500">
                      {item?.price?.toLocaleString()}đ
                    </Text>
                    <Text className="text-center font-bold text-primary">
                      {saleProductCalculate(item?.price).toLocaleString()}đ
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}
