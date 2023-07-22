/* eslint-disable @typescript-eslint/no-unused-vars */
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Loading from '../components/common/loading-screen';
import {UserTypes} from '../type';
import Sponsor from './sponsor';
import {Catalog} from './catalog';
import IonIcon from '../components/common/icons/ion-icon';

export default function Home() {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();

  const user: UserTypes = useSelector((state: any) => state.user.user);
  const [pendingVerify, setPendingVerify] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      bottomTabBarVisible: true,
    });
  }, [navigation]);

  // React.useEffect(() => {
  //   if (!user?.user?.verified) {
  //     Alert.alert(
  //       'Account not verified',
  //       'Please verify your email to use our services',
  //       [
  //         {
  //           text: 'Later',
  //         },
  //         {
  //           text: 'Verify now',
  //           onPress: async () => {
  //             try {
  //               setPendingVerify(true);
  //               await axios.post(
  //                 'http://localhost:8080/api/vnb/v1/auth/send-otp',
  //                 {
  //                   email: user?.user?.email,
  //                 },
  //                 {
  //                   headers: {
  //                     authorization: user?.tokens?.accessToken,
  //                     'x-client-id': user?.user?._id,
  //                   },
  //                 },
  //               );
  //               setPendingVerify(false);
  //               navigation.navigate('AccountVerifyHomeStack');
  //             } catch (error: any) {
  //               setPendingVerify(false);
  //               Alert.alert(
  //                 'Error',
  //                 error?.response?.data?.message || 'Something went wrong!',
  //               );
  //             }
  //           },
  //         },
  //       ],
  //     );
  //   }
  // }, [
  //   navigation,
  //   user?.tokens?.accessToken,
  //   user?.user?._id,
  //   user?.user?.email,
  //   user?.user?.verified,
  // ]);

  return (
    <SafeAreaView className="flex-1 bg-white ">
      {/* <HeaderCmp title="Home" isHome /> */}
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
          className="px-4 my-7"
          onPress={() => navigation.navigate('Search')}>
          <View className=" bg-slate-100 p-3 text-base rounded-full flex-row items-center">
            <IonIcon name="search-outline" color="gray" size={20} />
            <Text className="ml-1 text-gray-600">Search for product</Text>
          </View>
        </TouchableOpacity>
        <Catalog />
        <Sponsor />
      </ScrollView>
      <Loading isLoading={pendingVerify} />
    </SafeAreaView>
  );
}
