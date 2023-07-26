import {API_URL} from '@env';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntdIcon from '../../components/common/icons/antd-icon';
import NotFound from '../../components/common/not-found';
import {MainStackParamsList, ProductCard, ProductType} from '../../type';
import ProductsLoading from './products-loading';
import FontAwesomeIcon from '../../components/common/icons/fontawesome-icon';
import IonIcon from '../../components/common/icons/ion-icon';
import MaterialIcon from '../../components/common/icons/material-icon';

type ProductsNavigationProps = NavigationProp<MainStackParamsList, 'Products'>;
type ProductRouterProps = RouteProp<MainStackParamsList, 'Products'>;

type ProductCardProps = ProductCard & {
  navigation: ProductsNavigationProps;
};

export interface ProductsProps {
  navigation: ProductsNavigationProps;
  route: ProductRouterProps;
}

const Products: React.FC<ProductsProps> = ({
  navigation,
  route,
}: ProductsProps) => {
  const [products, setProducts] = React.useState<ProductType[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);
  const [sort, setSort] = React.useState<string>('');
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const fetchData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_URL}/product/get-products?page=${page}&limit=10&sort=${sort}&type=${
          route.params?.type ?? ''
        }`,
      );

      if (res?.data?.data?.length === 0) {
        setHasMore(false);
        setIsLoading(false);
      }

      if (page === 1) {
        // If it's the first page, set the data directly
        setProducts(res?.data?.data);
        setIsLoading(false);
      } else {
        // Otherwise, append the new data to the existing products
        setProducts(prevData =>
          prevData !== null ? [...prevData, ...res?.data?.data] : [],
        );
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setHasMore(false);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [page, sort, route.params?.type]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  React.useEffect(() => {
    // Fetch data initially and when the page changes
    fetchData();
  }, [fetchData, page]);

  React.useEffect(() => {
    // Sort data whenever the sort parameter changes
    if (sort === 'price_asc' || sort === 'price_desc') {
      fetchData();
    }
  }, [fetchData, sort]);

  React.useEffect(() => {
    // When the type parameter changes (e.g., when navigating back),
    // reset the products and page to fetch the new data.
    setHasMore(true);
    setIsLoading(true);
    setProducts([]); // Clear the existing products
    setPage(1); // Reset the page to 1
  }, [route.params?.type]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className=" flex-row justify-between px-4 mt-4">
        <Text className="text-2xl font-medium">
          {route?.params?.type ? capitalize(route?.params?.type) : 'Products'}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <View className=" rounded-full bg-gray-300 p-2">
            <IonIcon name="search-outline" color="black" size={20} />
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row mt-3 px-4 justify-end">
        <TouchableOpacity
          className="px-3 py-2 bg-gray-300 rounded-[10px] flex-row "
          style={{
            backgroundColor: sort ? '#FF2461' : '#c1c2cd',
          }}
          disabled={isLoading}
          onPress={() => {
            if (sort === 'price_asc') {
              setSort('price_desc');
            } else if (sort === 'price_desc') {
              setSort('');
            } else {
              setSort('price_asc');
            }
          }}>
          <MaterialIcon
            name={
              sort === 'price_desc'
                ? 'sort-ascending'
                : sort === 'price_asc'
                ? 'sort-descending'
                : 'sort'
            }
            size={15}
            color={sort ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>

      {products && products.length ? (
        <View className="px-4 mt-2">
          {products && products.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
              data={products}
              renderItem={({item}) => {
                return (
                  <ProductItem
                    _id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    slug={item.slug}
                    data={item}
                    navigation={navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => String(index)}
              ListFooterComponent={<Pending isLoading={isLoading} />}
              onEndReached={() => {
                if (hasMore) {
                  setPage(prevPage => prevPage + 1);
                }
              }}
              onEndReachedThreshold={0.1}
            />
          )}
        </View>
      ) : (
        products &&
        !products.length &&
        !isLoading && <NotFound title="Products empty" />
      )}
    </SafeAreaView>
  );
};

export default Products;

const ProductItem: React.FC<ProductCardProps> = ({
  _id,
  name,
  price,
  image,
  data,
  navigation,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 2 - 25;

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl relative"
      onPress={() => navigation.navigate('ProductDetail', {data: data})}
      style={{
        width: itemWidth,
      }}>
      <>
        <View className="pb-5 mb-5 mt-2">
          <View className="p-1 rounded-full flex items-center justify-center absolute right-4 z-10 bg-primary">
            <FontAwesomeIcon name="heart" size={15} color="white" />
          </View>
          <Image
            source={{uri: image}}
            className="w-full h-[120px] rounded-[10px] mix-blend-multiply"
            resizeMode="contain"
          />
          <Text className="text-left text-sm p-3">{name}</Text>
        </View>
        <View className="absolute bottom-3 px-3 right-0 left-0">
          <Text className="text-left text-primary font-bold">
            {price?.toLocaleString()}₫
          </Text>

          <View className="flex-row mt-1">
            <AntdIcon name="star" color="#ffc420" size={15} />
            <AntdIcon name="star" color="#ffc420" size={15} />
            <AntdIcon name="star" color="#ffc420" size={15} />
            <AntdIcon name="star" color="#ffc420" size={15} />
            <AntdIcon name="star" color="#ffc420" size={15} />
          </View>
        </View>
      </>
    </TouchableOpacity>
  );
};

const Pending = ({isLoading}: {isLoading: boolean}) => {
  return isLoading ? <ProductsLoading /> : null;
};
