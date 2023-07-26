import * as React from 'react';

import {NavigationProp} from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {API_URL} from '@env';

import axios from 'axios';
import AntdIcon from '../../components/common/icons/antd-icon';
import NotFound from '../../components/common/not-found';
import useDebounce from '../../components/hooks/useDebounce';
import {MainStackParamsList, ProductType} from '../../type';
import SearchSkeleton from './search-loading';

type SearchNavigationProps = NavigationProp<
  MainStackParamsList,
  'ProductDetail'
>;
interface Props {
  navigation: SearchNavigationProps;
}

export default function Search({navigation}: Props) {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [searchPending, setSearchPending] = React.useState<boolean>(false);
  const [searchResult, setSearchResult] = React.useState<ProductType[] | null>(
    null,
  );

  const searchRef = React.useRef<TextInput | null>(null);

  const searchDeb = useDebounce(searchValue, 800);

  React.useEffect(() => {
    // eslint-disable-next-line curly
    if (!searchDeb) return;
    (async () => {
      try {
        setSearchPending(true);
        const res = await axios.post(`${API_URL}/product/search-products`, {
          keyword: searchDeb,
        });

        setSearchResult(res.data.data);

        setSearchPending(false);
      } catch (error: any) {
        setSearchPending(false);
      }
    })();
  }, [searchDeb]);

  React.useEffect(() => {
    if (!searchValue) {
      setSearchResult([]);
    }
  }, [searchValue]);

  React.useEffect(() => {
    searchRef.current && searchRef.current?.focus();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="mt-2 px-5">
          <View className="flex-row gap-1 items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntdIcon name="left" color="black" />
            </TouchableOpacity>
            <TextInput
              ref={searchRef}
              value={searchValue}
              maxLength={35}
              autoCapitalize="none"
              placeholder="Search for product"
              className="p-3 bg-slate-100 flex-1 rounded-full"
              onChangeText={text => setSearchValue(text)}
            />
          </View>
        </View>

        {searchPending && (
          <View className="mt-5">
            <SearchSkeleton />
          </View>
        )}
        {!searchPending &&
        searchValue &&
        searchResult &&
        searchResult.length ? (
          <View className="mt-5 px-5">
            {searchResult?.map((item: ProductType) => {
              return (
                <TouchableOpacity
                  key={item?._id}
                  className="flex-row items-center px-1 py-2 mb-1"
                  onPress={() =>
                    navigation.navigate('ProductDetail', {data: item})
                  }>
                  <View className="flex-row items-center">
                    <Image
                      source={{uri: item?.image}}
                      className="w-[50] h-[50]"
                      resizeMode="contain"
                    />
                    <View className="flex-1 ml-2">
                      <Text className="text-base font-medium">
                        {item?.name}
                      </Text>
                      <Text className="text-sm text-primary">
                        {item?.price?.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <>
            {searchDeb &&
            !searchPending &&
            searchResult &&
            searchResult.length === 0 ? (
              <NotFound title="No product found..." />
            ) : (
              <Text className="px-4 text-center mt-4 text-gray-500">
                No recently searched
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
