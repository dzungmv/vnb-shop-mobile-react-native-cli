import {API_URL} from '@env';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import * as React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import EntypoIcon from '../components/common/icons/entypo-icon';
import Loading from '../components/common/loading-screen';
import NotFound from '../components/common/not-found';
import {CartType, MainStackParamsList, UserTypes} from '../type';

export default function OrderDetail() {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const user: UserTypes = useSelector((state: any) => state.user.user);

  const [isCancelPending, setIsCancelPending] = React.useState(false);

  const router = useRoute<RouteProp<MainStackParamsList, 'OrderDetail'>>();

  const {data} = router.params;

  const HANDLE = {
    cancelOrder: async () => {
      try {
        setIsCancelPending(true);
        await axios.put(
          `${API_URL}/user/update-order`,
          {
            orderId: data?._id,
            status: 'cancelled',
          },
          {
            headers: {
              authorization: user?.tokens?.accessToken,
              'x-client-id': user?.user?._id,
            },
          },
        );

        setIsCancelPending(false);
        Alert.alert('Order cancelled');
        navigation.navigate('Orders');
      } catch (error: any) {
        setIsCancelPending(false);
        Alert.alert(error?.response?.data?.message || 'Something went wrong');
      }
    },
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 relative mb-[80px]">
        <View className="relative flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" absolute left-3">
            <EntypoIcon name="chevron-thin-left" size={25} color="black" />
          </TouchableOpacity>

          <Text className="text-xl font-medium text-center">Order detail</Text>

          <Text className="text-gray-500 text-xs absolute right-3">
            {moment(data?.createdAt).format('LL')}
          </Text>
        </View>
        {data ? (
          <ScrollView>
            <View className="px-4 mt-7">
              <Text className="font-medium text-lg mb-4">
                Order information
              </Text>
              <View className=" flex-row items-start">
                <View className="flex items-center">
                  <View
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        data?.status === 'cancelled' ||
                        data?.status === 'returns'
                          ? '#E2E8F0'
                          : '#FF2461',
                    }}
                  />
                  <View
                    className="w-[5px] h-[90px]"
                    style={{
                      backgroundColor:
                        data?.status === 'cancelled' ||
                        data?.status === 'returns'
                          ? '#E2E8F0'
                          : '#FF2461',
                    }}
                  />
                </View>
                <View className="ml-2 -mt-[6px]">
                  <Text
                    className="text-base font-medium"
                    style={{
                      color:
                        data?.status === 'cancelled' ||
                        data?.status === 'returns'
                          ? '#E2E8F0'
                          : 'black',
                    }}>
                    Ordered placed
                  </Text>
                  <Text
                    className="text-sm"
                    style={{
                      color:
                        data?.status === 'cancelled' ||
                        data?.status === 'returns'
                          ? '#E2E8F0'
                          : 'gray',
                    }}>
                    Your order is being prepared
                  </Text>
                </View>
              </View>
              <View className=" flex-row items-start">
                <View className="flex items-center">
                  <View
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        data?.status === 'shipping' ||
                        data?.status === 'completed'
                          ? '#FF2461'
                          : '#E2E8F0',
                    }}
                  />
                  <View
                    className="w-[5px] h-[90px]"
                    style={{
                      backgroundColor:
                        data?.status === 'shipping' ||
                        data?.status === 'completed'
                          ? '#FF2461'
                          : '#E2E8F0',
                    }}
                  />
                </View>
                <View className="ml-2 -mt-[6px]">
                  <Text
                    className="text-base font-medium"
                    style={{
                      color:
                        data?.status === 'shipping' ||
                        data?.status === 'completed'
                          ? 'black'
                          : '#E2E8F0',
                    }}>
                    Ordered comfirm
                  </Text>
                  <Text
                    className="text-sm"
                    style={{
                      color:
                        data?.status === 'shipping' ||
                        data?.status === 'completed'
                          ? 'black'
                          : '#E2E8F0',
                    }}>
                    Store has been shipped your order
                  </Text>
                </View>
              </View>
              <View className=" flex-row items-start">
                <View className="flex items-center">
                  <View
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        data?.status === 'shipping' ||
                        data?.status === 'completed'
                          ? '#FF2461'
                          : '#E2E8F0',
                    }}
                  />
                  <View
                    className="w-[5px] h-[90px]"
                    style={{
                      backgroundColor:
                        data?.status === 'shipping' ||
                        data?.status === 'completed'
                          ? '#FF2461'
                          : '#E2E8F0',
                    }}
                  />
                </View>
                <View className="ml-2 -mt-[6px]">
                  <Text
                    className="text-base font-medium"
                    style={{
                      color:
                        data?.status === 'shipping' ||
                        data?.status === 'completed'
                          ? 'black'
                          : '#E2E8F0',
                    }}>
                    Shipping
                  </Text>
                  <Text
                    className="text-sm"
                    style={{
                      color:
                        data?.status === 'shipping' ||
                        data?.status === 'completed'
                          ? 'black'
                          : '#E2E8F0',
                    }}>
                    Store has been shipped your order
                  </Text>
                </View>
              </View>
              <View className="flex-row items-start">
                <View className="flex items-center">
                  <View
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        data?.status === 'completed' ? '#FF2461' : '#E2E8F0',
                    }}
                  />
                  {(data?.status === 'cancelled' ||
                    data?.status === 'returns') && (
                    <View
                      className="w-[5px] h-[90px]"
                      style={{
                        backgroundColor: '#E2E8F0',
                      }}
                    />
                  )}
                </View>
                <View className="ml-2 -mt-[6px]">
                  <Text
                    className="text-base font-medium"
                    style={{
                      color: data?.status === 'completed' ? 'black' : '#E2E8F0',
                    }}>
                    Order delivered
                  </Text>
                  <Text
                    className="text-sm"
                    style={{
                      color: data?.status === 'completed' ? 'black' : '#E2E8F0',
                    }}>
                    Your order has been delivered successfully
                  </Text>
                </View>
              </View>
              {(data?.status === 'cancelled' || data?.status === 'returns') && (
                <View className="flex-row items-start">
                  <View className="flex items-center">
                    <View
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: 'red',
                      }}
                    />
                  </View>
                  <View className="ml-2 -mt-[6px]">
                    <Text
                      className="text-base"
                      style={{
                        color: 'red',
                      }}>
                      Order cancelled
                    </Text>
                    <Text
                      className="text-sm"
                      style={{
                        color: 'red',
                      }}>
                      Your order has been cancelled
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View className="px-4 mt-10">
              <Text className="font-medium text-lg mb-4">Orders</Text>

              {data?.products?.map((item: CartType) => {
                return (
                  <View key={item?._id} className="flex-row items-center mb-3">
                    <Image
                      source={{uri: item?.product_image}}
                      className="w-[50px] h-[50px]"
                    />

                    <View className="flex-1 ml-2">
                      <Text numberOfLines={1} className="text-sm font-medium">
                        {item?.product_name}
                      </Text>
                      <Text className="text-xs text-primary font-medium">
                        {item?.product_price?.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View className="mt-4 flex-row justify-end items-center mx-4 pt-2 border-t border-gray-200">
              <View className="flex-row items-center">
                <Text className="text-base">Total:</Text>

                <Text className="text-base ml-1 text-primary font-bold">
                  {data?.total?.toLocaleString()}đ
                </Text>
              </View>
            </View>

            <View className="px-4 mt-6">
              <Text className="font-medium text-lg">Order information</Text>
              <View className="pl-3 flex gap-1">
                <Text>Full name: {data?.fullname}</Text>
                <Text>Phone: {data?.phone}</Text>
                <Text>Address: {data?.address}</Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <NotFound title="Ordered empty" />
        )}
      </View>

      {data && data?.status === 'pending' && (
        <View className="mb-10 px-4 absolute bottom-0 left-0 right-0 bg-white">
          <TouchableOpacity
            className="border border-gray-400 py-3 rounded-xl flex items-center"
            onPress={HANDLE.cancelOrder}>
            <Text className="font-medium text-lg text-gray-600">
              Cancel order
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Loading isLoading={isCancelPending} />
    </SafeAreaView>
  );
}
