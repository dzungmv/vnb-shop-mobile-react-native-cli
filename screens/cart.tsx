import {API_URL} from '@env';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
import {Alert, Image, SafeAreaView, ScrollView, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import IonIcon from '../components/common/icons/ion-icon';
import Loading from '../components/common/loading-screen';
import NotFound from '../components/common/not-found';
import {CartType, MainStackParamsList, UserTypes} from '../type';

export default function Cart() {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();

  const user: UserTypes = useSelector((state: any) => state.user.user);

  const cartStore: CartType[] = useSelector((state: any) => state.user.cart);

  const [cart, setCart] = React.useState<CartType[]>(cartStore);
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const total = cart?.reduce((acc, curr: CartType) => {
    return acc + curr.product_price * curr.product_quantity;
  }, 0);

  const HANDLE = {
    removeCart: (id: string) => {
      const findCart = cart.findIndex(item => item._id === id);

      if (findCart !== -1) {
        setCart((prev: CartType[]) => {
          const copy = JSON.stringify(prev);
          const data = JSON.parse(copy);

          data.splice(findCart, 1);

          return data;
        });
      }
    },
    checkout: async () => {
      try {
        setIsPending(true);
        await axios.post(
          `${API_URL}/user/checkout`,
          {
            cart,
            total: total,
          },
          {
            headers: {
              authorization: user.tokens.accessToken,
              'x-client-id': user.user._id,
            },
          },
        );
        setIsPending(false);
        navigation.navigate('Checkout', {cart, total});
      } catch (error: any) {
        setIsPending(false);

        if (error?.response?.data?.type === 'out_of_stock') {
          Alert.alert('Error', error?.response?.data?.stock);
        }

        Alert.alert('Error', 'Something went wrong!');
      }
    },
  };

  React.useEffect(() => {
    setCart(cartStore);
  }, [cartStore]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 relative">
        <View className="mt-3 px-4">
          <Text className="text-center text-xl font-medium">My cart</Text>
        </View>
        {cart && cart.length > 0 ? (
          <ScrollView className="px-4 mt-5 mb-[80px]">
            {cart?.map(item => {
              return (
                <View
                  key={item._id}
                  className="flex-row items-center p-2 bg-white mb-3 shadow-sm rounded-2xl">
                  <Image
                    source={{
                      uri: item?.product_image,
                    }}
                    className="w-[70px] h-[70px] object-contain mr-2"
                  />

                  <View className="flex-1">
                    <Text className="font-medium">{item?.product_name}</Text>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center mt-2">
                        <Text className="text-sm font-bold text-primary mr-1">
                          {item?.product_price?.toLocaleString()}
                        </Text>

                        <Text className="text-sm text-gray-500">
                          x{item?.product_quantity}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => HANDLE.removeCart(item._id)}>
                        <IonIcon name="trash-outline" size={20} color="gray" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <NotFound title="Cart empty" />
        )}

        {cart && cart.length > 0 && (
          <View className=" absolute bottom-0 px-4 left-0 right-0 z-10 pb-1">
            {/* <View className="flex-row items-center">
              <Text className=" text-base font-medium">Total:</Text>
              <Text className="pl-1 text-base font-bold text-primary">
                {total?.toLocaleString()}đ
              </Text>
            </View> */}

            <TouchableOpacity
              className="flex-row items-center justify-center py-3 px-5 rounded-lg bg-violet-600"
              onPress={HANDLE.checkout}>
              <Text className="text-base font-medium mr-1 text-white">
                Checkout
              </Text>
              <IonIcon name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Loading isLoading={isPending} />
    </SafeAreaView>
  );
}
