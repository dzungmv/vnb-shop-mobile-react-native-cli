import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Logo} from '../assets';
import LoadingScreen from '../components/common/loading-screen';
import {setUser} from '../redux/slices/userSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login() {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isInputFocus, setIsInputFocus] = React.useState<string | null>(null);

  const dispatch = useDispatch();
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();

  const emailRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);

  const handleLogin = async () => {
    if (email.length === 0) {
      Alert.alert('Email is required', 'Please enter your email to continue');
      emailRef?.current?.focus();
      return;
    }

    if (password.length === 0) {
      Alert.alert(
        'Password is required',
        'Please enter your password to continue',
      );
      passwordRef?.current?.focus();
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:8080/api/vnb/v1/auth/login',
        {
          email,
          password,
        },
      );
      await dispatch(setUser(res?.data?.metadata));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Wrong Credentials', error?.response?.data?.message);
    }
  };

  React.useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (!isInputFocus) {
          Keyboard.dismiss();
        }
      },
    );

    return () => keyboardDidHideListener.remove();
  }, [isInputFocus]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <View className="flex-1">
          <SafeAreaView className="flex-1 relative">
            <View className="mt-20 px-6">
              <View className=" flex justify-center items-center">
                <Image className="w-[80px] h-[80px]" source={Logo} />
              </View>

              <View className="mt-10">
                <Text className="text-base text-gray-500">Email</Text>
                <TextInput
                  ref={emailRef}
                  onFocus={() => setIsInputFocus('email')}
                  onBlur={() => setIsInputFocus(null)}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  className="border-b-[1px] border-gray-300 py-4 text-base"
                />
              </View>
              <View className="mt-7">
                <Text className="text-base text-gray-500">Password</Text>
                <View className=" relative">
                  <TextInput
                    ref={passwordRef}
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    onFocus={() => setIsInputFocus('password')}
                    onBlur={() => setIsInputFocus(null)}
                    autoCapitalize="none"
                    className="border-b-[1px] border-gray-300 py-4 text-base"
                  />
                  {password && password.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setShowPassword(prev => !prev)}
                      className=" absolute right-0 bottom-5">
                      {showPassword ? (
                        <Icon name="eye" size={24} color="black" />
                      ) : (
                        <Icon name="eye-off" size={24} color="black" />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View className="mt-10">
                <TouchableOpacity
                  className=" bg-primary rounded-lg"
                  onPress={handleLogin}>
                  <Text className="text-white text-lg font-medium py-4 rounded-lg text-center">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>

              <Text className="text-center mt-5 text-base text-gray-700">
                Forgot password?
              </Text>
            </View>

            <View className=" absolute bottom-12 left-0 right-0 mx-6">
              <TouchableOpacity
                className="border border-primary py-2 rounded-md"
                onPress={() => navigation.push('Register')}>
                <Text className="text-base text-primary text-center">
                  Create new account
                </Text>
              </TouchableOpacity>
            </View>

            <LoadingScreen isLoading={loading} />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
