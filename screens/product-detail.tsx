import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import * as React from 'react';

import {API_URL} from '@env';
import axios from 'axios';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import EntypoIcon from '../components/common/icons/entypo-icon';
import Loading from '../components/common/loading-screen';
import {logout, setCart} from '../redux/slices/userSlice';
import {MainStackParamsList, UserTypes} from '../type';
import IonIcon from '../components/common/icons/ion-icon';
import AntdIcon from '../components/common/icons/antd-icon';

const ProductDetail = () => {
  const router = useRoute<RouteProp<MainStackParamsList, 'ProductDetail'>>();

  const product = router.params?.data;

  const width = Dimensions.get('window').width;

  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const dispatch = useDispatch();

  const user: UserTypes = useSelector((state: any) => state.user.user);

  const [quantity, setQuantity] = React.useState(1);
  const [isPending, setIsPending] = React.useState(false);

  const HANDLE = {
    setQuantityIncrease: () => {
      if (quantity > product?.quantity) {
        return;
      }
      setQuantity(prev => prev + 1);
    },

    setQuantityDecrease: () => {
      setQuantity(prev => (prev <= 1 ? 1 : prev - 1));
    },

    addToCart: async () => {
      const data = {
        productId: product._id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image,
        product_quantity: quantity,
      };

      try {
        setIsPending(true);
        const res = await axios.post(
          `${API_URL}/user/add-cart`,
          {
            product: data,
          },
          {
            headers: {
              authorization: user?.tokens?.accessToken,
              'x-client-id': user?.user?._id,
            },
          },
        );

        dispatch(setCart(res?.data?.data?.products));
        setIsPending(false);
        Alert.alert('Success', 'Added to cart successfully', [
          {
            text: 'OK',
          },
          {
            text: 'View cart',
            onPress: () => {
              navigation.navigate('Cart');
            },
          },
        ]);
      } catch (error: any) {
        setIsPending(false);
        if (error?.response?.status === 401) {
          dispatch(logout());
        }
      }
    },
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="flex-1 relative">
        <ScrollView>
          <View className="px-4 mt-3 flex-row justify-between">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <EntypoIcon name="chevron-thin-left" size={25} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <IonIcon name="cart" color="#FF2461" />
            </TouchableOpacity>
          </View>
          <View className="">
            <Image
              source={{uri: product?.image}}
              className="w-full h-[250px] rounded-[10px]"
              resizeMode="contain"
            />
          </View>

          <View className="px-4 mt-10 bg-slate-100 rounded-t-[40px] pt-5">
            <View className="flex-row justify-between items-start flex-wrap">
              <Text className="text-lg font-medium flex-1">
                {product?.name}
              </Text>
              <View className="p-2 bg-white rounded-full shadow-lg">
                <IonIcon name="heart" size={20} color="#FF2461" />
              </View>
            </View>
            <Text className="my-3 text-base text-primary font-semibold">
              {product?.price?.toLocaleString()}₫
            </Text>

            <View className="flex-row mb-3">
              <AntdIcon name="star" color="#ffc420" size={15} />
              <AntdIcon name="star" color="#ffc420" size={15} />
              <AntdIcon name="star" color="#ffc420" size={15} />
              <AntdIcon name="star" color="#ffc420" size={15} />
              <AntdIcon name="star" color="#ffc420" size={15} />
            </View>

            {product?.endows?.map((item, index: number) => {
              return (
                <View className="flex-row items-center mt-1" key={index}>
                  <IonIcon
                    name="checkmark-circle-sharp"
                    size={15}
                    color="violet"
                  />
                  <Text className="ml-2">{item}</Text>
                </View>
              );
            })}

            {product?.description && product?.description?.length > 0 && (
              <View className="mt-14">
                <Text className="text-xl font-medium">Description</Text>

                <View>
                  <RenderHTML
                    contentWidth={width}
                    source={{html: product?.description}}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View className="absolute bottom-0 px-4 py-3 flex-row items-center justify-between left-0 right-0 z-10 bg-white">
          <View className="flex-row items-center">
            <TouchableOpacity
              className=" mr-1"
              onPress={HANDLE.setQuantityDecrease}>
              <AntdIcon
                name="minuscircle"
                color={quantity === 1 ? 'gray' : 'black'}
              />
            </TouchableOpacity>
            <TextInput
              className="flex px-10 border border-gray-300 rounded-xl"
              textAlign="center"
              keyboardType="numeric"
              value={quantity.toString()}
              onChangeText={num => setQuantity(Number(num))}
              style={{
                textAlignVertical: 'center',
                paddingBottom: 0,
                paddingTop: 0,
                height: 32,
                fontSize: 18,
              }}
            />
            <TouchableOpacity
              className=" ml-1"
              onPress={HANDLE.setQuantityIncrease}>
              <AntdIcon name="pluscircle" color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={HANDLE.addToCart}>
            <View className="flex-row items-center p-3 rounded-xl bg-black">
              <IonIcon name="cart" color="white" />
              <Text className="text-white font-medium ml-2">Add to cart</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Loading isLoading={isPending} />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
