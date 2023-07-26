import {API_URL} from '@env';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import * as React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialIcon from '../components/common/icons/material-icon';
import Loading from '../components/common/loading-screen';
import NotFound from '../components/common/not-found';
import {KeyObj, MainStackParamsList, OrderType, UserTypes} from '../type';

export default function Orders() {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const user: UserTypes = useSelector((state: any) => state.user.user);
  const [ordered, setOrdered] = React.useState([]);
  const [isPending, setIsPending] = React.useState(false);

  const data: OrderType[] = ordered?.sort((x: OrderType, y: OrderType) => {
    return new Date(x.updatedAt) < new Date(y.updatedAt) ? 1 : -1;
  });

  const stateColors: KeyObj = {
    cancelled: 'red',
    pending: 'orange',
    shipping: 'blue',
    completed: 'green',
    returned: 'red',
    undefined: 'black',
  };

  React.useEffect(() => {
    (async () => {
      try {
        setIsPending(true);
        const res = await axios.get(`${API_URL}/user/get-order`, {
          headers: {
            authorization: user?.tokens?.accessToken,
            'x-client-id': user?.user?._id,
          },
        });

        setOrdered(res?.data?.data?.orders);
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 relative">
        <View className="mb-4">
          <Text className="text-center text-xl font-medium">Ordered</Text>
        </View>
        <View className="flex-row justify-end px-4 mb-3">
          <MaterialIcon name="sort" />
        </View>
        {data && data?.length > 0 ? (
          <ScrollView className="px-4">
            {data?.map((item: OrderType) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  className="py-3 px-3 bg-white rounded-lg shadow-lg mb-7"
                  onPress={() =>
                    navigation.navigate('OrderDetail', {data: item})
                  }>
                  <View className="pb-2">
                    <View className="flex-row justify-between items-center mb-3">
                      <Text
                        className="text-base font-medium"
                        style={{
                          textTransform: 'capitalize',
                          color: stateColors[item?.status],
                        }}>
                        {item.status}
                      </Text>
                      <Text>{moment(item?.updatedAt).format('LLL')}</Text>
                    </View>
                    {item?.products && item?.products.length && (
                      <View
                        key={item?.products[0]._id}
                        className="flex-row items-center mb-4">
                        <Image
                          source={{
                            uri: item?.products[0]?.product_image,
                          }}
                          className="w-[50px] h-[50px]"
                        />

                        <View className="flex-1 ml-2">
                          <Text
                            numberOfLines={1}
                            className="text-sm font-medium ">
                            {item?.products[0]?.product_name}
                          </Text>
                          <View className="flex-row items-center text-base">
                            <Text className="text-xs font-bold text-primary">
                              {item?.products[0]?.product_price?.toLocaleString()}
                            </Text>
                            <Text className="text-gray-600 ml-1 text-xs">
                              x{item?.products[0].product_quantity}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}

                    {item.products && item.products.length > 2 && (
                      <Text className="text-center text-gray-500">
                        See more items ({item.products.length - 1})
                      </Text>
                    )}
                  </View>

                  <View className="flex-row justify-end items-center border-t border-gray-200 pt-2">
                    <View className="flex-row items-center">
                      <Text className="text-base">Total:</Text>
                      <Text className="text-base text-primary font-bold ml-1">
                        {item?.total?.toLocaleString()}đ
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <NotFound title="No Ordered" color="white" />
        )}
      </View>

      <Loading isLoading={isPending} />
    </SafeAreaView>
  );
}
