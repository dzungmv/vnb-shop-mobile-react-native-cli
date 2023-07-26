import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import * as React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CartType, MainStackParamsList, UserTypes} from '../type';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';
import {RadioButton} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Loading from '../components/common/loading-screen';
import EntypoIcon from '../components/common/icons/entypo-icon';

export default function Checkout() {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const router = useRoute<RouteProp<MainStackParamsList, 'Checkout'>>();

  const total = router.params?.total;
  const cart = router.params?.cart;

  const user: UserTypes = useSelector((state: any) => state.user.user);

  const fullnameRef = React.useRef<TextInput>(null);
  const phoneRef = React.useRef<TextInput>(null);
  const addressRef = React.useRef<TextInput>(null);

  const [payment, setPayment] = React.useState<string>('cod');
  const [fullname, setFullname] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const HANDLE = {
    order: async () => {
      if (fullname === '') {
        Alert.alert('Please enter your name');
        fullnameRef.current?.focus();
        return;
      }

      if (phone === '') {
        Alert.alert('Please enter your phone number');
        phoneRef.current?.focus();
        return;
      }

      if (address === '') {
        Alert.alert('Please enter your address');
        addressRef.current?.focus();
        return;
      }

      try {
        const data = {
          fullname,
          phone,
          address,
          payment,
          products: cart,
          total,
        };
        setIsPending(true);
        await axios.post(
          `${API_URL}/user/order`,
          {data},
          {
            headers: {
              authorization: user.tokens.accessToken,
              'x-client-id': user.user._id,
            },
          },
        );
        setIsPending(false);

        Alert.alert('Success', 'Order successfully');
        navigation.navigate('Orders');
      } catch (error: any) {
        setIsPending(false);
        Alert.alert(
          'Error',
          error?.response?.data?.message || 'Something went wrong',
        );
      }
    },
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 relative">
        <View className="px-4">
          <TouchableOpacity
            className=" absolute left-4 z-10"
            onPress={() => navigation.goBack()}>
            <EntypoIcon name="chevron-thin-left" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl text-center font-bold">CheckOut</Text>
        </View>

        <ScrollView className="px-4 mt-5 mb-[80px]">
          <View>
            <Text className="text-base text-gray-600">Name</Text>
            <TextInput
              ref={fullnameRef}
              onChangeText={setFullname}
              className="border h-12 rounded-lg px-3 border-gray-300"
              style={{
                textAlignVertical: 'center',
                fontSize: 16,
              }}
            />
          </View>

          <View className="mt-3">
            <Text className="text-base text-gray-600">Mobile phone</Text>
            <TextInput
              ref={phoneRef}
              onChangeText={setPhone}
              keyboardType="numeric"
              className="border h-12 rounded-lg px-3 border-gray-300"
              style={{
                textAlignVertical: 'center',
                fontSize: 16,
              }}
            />
          </View>

          <View className="mt-3">
            <Text className="text-base text-gray-600">Address</Text>
            <TextInput
              ref={addressRef}
              onChangeText={setAddress}
              className="border h-12 rounded-lg px-3 border-gray-300"
              style={{
                textAlignVertical: 'center',
                fontSize: 16,
              }}
            />
          </View>

          <View className="mt-7">
            <Text className="text-base">Payment method</Text>

            <View className=" rounded-lg bg-pink-100 mt-2">
              <RadioButton.Group
                value={payment}
                onValueChange={value => setPayment(value)}>
                <RadioButton.Item value="cod" label="Cash on delivery" />

                <RadioButton.Item value="banking" label="Banking" />
              </RadioButton.Group>
              {payment === 'banking' && (
                <Animatable.View
                  animation="zoomIn"
                  easing={'ease-in'}
                  duration={300}
                  className="mx-4 mb-4 rounded-lg bg-blue-50 p-2">
                  <Text>Test branch, Test branch</Text>
                  <Text>Account number: 0000000000000</Text>
                  <Text>Account owner: Test</Text>
                  <Text>(Content of transfer: Name + Order phone number)</Text>
                </Animatable.View>
              )}
            </View>

            <View>
              <Text className="text-base mt-5">Products</Text>
              <View>
                {cart?.map((item: CartType) => {
                  return (
                    <View key={item._id} className="flex-row items-center mt-2">
                      <Image
                        source={{
                          uri: item?.product_image,
                        }}
                        className="w-[80px] h-[80px]"
                      />

                      <View className="flex-1">
                        <Text className="text-base font-medium">
                          {item?.product_name}
                        </Text>
                        <View className="flex-row items-center">
                          <Text className="text-base font-medium text-primary">
                            {item?.product_price.toLocaleString()}
                          </Text>
                          <Text className="text-base text-gray-500 ml-1">
                            x{item?.product_quantity}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>

        <View className=" absolute bottom-0 px-4 py-3 flex-row items-center justify-between left-0 right-0 z-10 bg-white">
          <View className="flex-row items-center">
            <Text className=" text-base font-medium">Total:</Text>
            <Text className="pl-1 text-base font-medium text-primary">
              {total?.toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center py-2 px-6 rounded-lg bg-violet-600"
            onPress={HANDLE.order}>
            <Text className="text-base mr-1 text-white">Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Loading isLoading={isPending} />
    </SafeAreaView>
  );
}
