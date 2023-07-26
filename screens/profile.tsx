import * as React from 'react';
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {MainStackParamsList, UserTypes} from '../type';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '@env';
import {logout} from '../redux/slices/userSlice';
import {Image} from 'react-native';
import {avatar, cover} from '../assets';
import AntdIcon from '../components/common/icons/antd-icon';
import MaterialIcon from '../components/common/icons/material-icon';
import IonIcon from '../components/common/icons/ion-icon';
import FontAwesomeIcon from '../components/common/icons/fontawesome-icon';
import Loading from '../components/common/loading-screen';
import LinearGradient from 'react-native-linear-gradient';
import EntypoIcon from '../components/common/icons/entypo-icon';

export default function Profile() {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();

  const user: UserTypes = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  const [pendingVerify, setPendingVerify] = React.useState<boolean>(false);

  const [logoutPending, setLogoutPending] = React.useState<boolean>(false);

  const HANDLE = {
    verifyAccount: async () => {
      try {
        setPendingVerify(true);
        await axios.post(
          `${API_URL}/auth/send-otp`,
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
        // navigation.navigate('AccountVerifyHomeStack');
      } catch (error: any) {
        setPendingVerify(false);
        Alert.alert(
          'Error',
          error?.response?.data?.message || 'Something went wrong!',
        );
      }
    },
    logout: async () => {
      try {
        setLogoutPending(true);
        await axios.post(
          `${API_URL}/auth/logout`,
          {},
          {
            headers: {
              authorization: user.tokens.accessToken,
              'x-client-id': user.user._id,
            },
          },
        );

        await dispatch(logout());
        setLogoutPending(false);
      } catch (error: any) {
        setLogoutPending(false);
        if (error?.response?.status === 401) {
          dispatch(logout());
        }
      }
    },
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="">
        <Text className="text-center font-medium text-xl">Profile</Text>
      </View>
      <View className="px-4 mt-3">
        <Image source={cover} className="w-full h-[150px] rounded-xl" />
        <View className="flex-row items-center justify-center -mt-12">
          <LinearGradient
            colors={['#CA1D7E', '#E35157', '#F2703F']}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 1.0}}
            style={{
              height: 107,
              width: 107,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 107 / 2,
            }}>
            <Image
              source={avatar}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                alignSelf: 'center',
                borderColor: '#fff',
                borderWidth: 1,
              }}
            />
          </LinearGradient>
        </View>
      </View>
      <View className="bg-white flex-1">
        <View className=" p-2 flex justify-center items-center">
          <View className="flex-row items-center">
            <Text className="text-xl font-medium">{user?.user?.name} </Text>
            {user?.user?.verified && (
              <AntdIcon name="checkcircle" size={20} color="#FF2461" />
            )}
          </View>
        </View>

        <View className="px-4 flex-row justify-evenly mt-3">
          <View className="flex items-center">
            <Text className="text-base font-semibold">108</Text>
            <Text className="text-sm text-gray-500">Ordered</Text>
          </View>

          <View className="flex items-center">
            <Text className="text-base font-semibold">12</Text>
            <Text className="text-sm text-gray-500">Shipping</Text>
          </View>

          <View className="flex items-center">
            <Text className="text-base font-semibold">2</Text>
            <Text className="text-sm text-gray-500">Canncelled</Text>
          </View>
        </View>

        <View className="mt-2">
          {!user?.user?.verified && (
            <TouchableOpacity
              className="px-4 py-2 flex-row rounded-lg items-center"
              onPress={HANDLE.verifyAccount}>
              <View className="w-[40px] h-[40px] flex items-center justify-center rounded-3xl bg-red-500">
                <MaterialIcon name="account-check" size={27} color="white" />
              </View>
              <Text className="ml-2 text-base font-medium text-red-500">
                Account not verified, verify now
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate('Orders')}
            className="px-4 mt-3 flex-row justify-between rounded-lg py-2 items-center">
            <View className="flex-row items-center">
              <View className="w-[35px] h-[35px] flex items-center justify-center rounded-3xl bg-blue-500">
                <AntdIcon name="tags" size={27} color="white" />
              </View>

              <Text className="ml-2 text-base font-medium">All Ordered</Text>
            </View>

            <EntypoIcon name="chevron-thin-right" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="px-4 py-2 mt-2 flex-row justify-between items-center rounded-lg"
            onPress={() => navigation.navigate('Cart')}>
            <View className="flex-row items-center">
              <View className="w-[35px] h-[35px] flex items-center justify-center rounded-3xl bg-violet-500">
                <IonIcon name="cart-sharp" size={27} color="white" />
              </View>
              <Text className="ml-2 text-base font-medium">Cart</Text>
            </View>
            <EntypoIcon name="chevron-thin-right" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="px-4 py-2 mt-2 flex-row justify-between rounded-lg items-center"
            onPress={HANDLE.logout}>
            <View className="flex-row items-center">
              <View className="w-[35px] h-[35px] flex items-center justify-center rounded-3xl bg-black">
                <FontAwesomeIcon name="sign-out" size={27} color="white" />
              </View>
              <Text className="ml-2 text-base font-medium">Logout</Text>
            </View>
            <EntypoIcon name="chevron-thin-right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Loading isLoading={logoutPending || pendingVerify} />
    </SafeAreaView>
  );
}
