import {API_URL} from '@env';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IonIcon from '../components/common/icons/ion-icon';
import Loading from '../components/common/loading-screen';
import {MainStackParamsList, UserTypes} from '../type';
import {Catalog} from './catalog';
import Sponsor from './sponsor';
import {setCart} from '../redux/slices/userSlice';
import {Polulate} from './populate';

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();

  const [pending, setPending] = React.useState<boolean>(false);

  const [pendingVerify, setPendingVerify] = React.useState<boolean>(false);
  const user: UserTypes = useSelector((state: any) => state.user.user);

  React.useEffect(() => {
    if (!user?.user?.verified) {
      Alert.alert(
        'Account not verified',
        'Please verify your email to use our services',
        [
          {
            text: 'Later',
          },
          {
            text: 'Verify now',
            onPress: async () => {
              try {
                setPendingVerify(true);
                await axios.post(
                  'http://localhost:8080/api/vnb/v1/auth/send-otp',
                  {
                    email: user?.user?.email,
                  },
                  {
                    headers: {
                      authorization: user?.tokens?.accessToken,
                      'x-client-id': user?.user?._id,
                    },
                  },
                );
                setPendingVerify(false);
                navigation.navigate('Cart');
              } catch (error: any) {
                setPendingVerify(false);
                Alert.alert(
                  'Error',
                  error?.response?.data?.message || 'Something went wrong!',
                );
              }
            },
          },
        ],
      );
    }
  }, [
    navigation,
    user?.tokens?.accessToken,
    user?.user?._id,
    user?.user?.email,
    user?.user?.verified,
  ]);

  React.useEffect(() => {
    (async () => {
      const res = await axios.get(`${API_URL}/user/get-cart`, {
        headers: {
          authorization: user?.tokens?.accessToken,
          'x-client-id': user?.user?._id,
        },
      });

      dispatch(setCart(res?.data?.data?.products));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <Loading isLoading={pending} />
      <ScrollView>
        <View className="px-4 mt-5">
          <Text className="text-lg font-medium text-gray-500">
            Hello, {user?.user?.name}
          </Text>

          <Text className="font-medium text-2xl">
            Find your favorite badminton products
          </Text>
        </View>
        <TouchableOpacity
          className="px-4 my-7 mb-0"
          onPress={() => navigation.navigate('Search')}>
          <View className=" bg-slate-100 p-3 text-base rounded-full flex-row items-center">
            <IonIcon name="search-outline" color="gray" size={20} />
            <Text className="ml-1 text-gray-600">Search for product</Text>
          </View>
        </TouchableOpacity>
        <Catalog />
        <Polulate setPending={setPending} />
        <Sponsor />
      </ScrollView>
      <Loading isLoading={pendingVerify} />
    </SafeAreaView>
  );
}
