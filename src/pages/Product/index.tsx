/* eslint-disable */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardCategory from '../../components/CardCategory';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {useSelector} from 'react-redux';
import {RootState} from '../../storages/store';
import tw from 'tailwind-react-native-classnames';
import {PriceProduct, Product} from './interface';
import apiClient from '../../config';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface UOM {
  uom_name: string;
}

const ProductScreen = ({navigation}: Props) => {
  const [data, setData] = useState<Product[] | []>([]);
  const [price, setPrice] = useState<PriceProduct>();
  const [id_product] = useState('');
  const [uom, setuom] = useState<UOM>();

  const getDataProduct = async () => {
    try {
      const response = await apiClient.get('product');
      return response.data;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const getUom = async () => {
    try {
      const response = await apiClient.get(`uom/${data[0]?.uom_id}`);
      return response.data.uom;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const getPriceProduct = async () => {
    try {
      const response = await apiClient.get(`product-price/${id_product}`);
      return response.data;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  useEffect(() => {
    getDataProduct()
      .then(res => setData(res))
      .catch(error => console.error('Error fetching data:', error));
    getUom()
      .then(res => setuom(res))
      .catch(error => console.error('Error fetching price:', error));
  }, []);

  useEffect(() => {
    if (id_product) {
      getPriceProduct()
        .then(res => setPrice(res))
        .catch(error => console.error('Error fetching price:', error));
      getUom()
        .then(res => setuom(res))
        .catch(error => console.error('Error fetching price:', error));
    }
  }, [id_product]);

  const handleSearch = () => {
    console.log('Navigating to Search');
    navigation.navigate('Search');
  };

  const {role} = useSelector((state: RootState) => state.auth);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            onPressIn={handleSearch}
          />
        </View>
        <ScrollView>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', {id: item.id})}>
              <View
                style={tw`flex flex-row bg-gray-100 mb-3 p-2 rounded-lg w-full`}>
                <View style={tw`flex flex-row items-center mr-3`}>
                  <CardCategory
                    backgroundColor="#FDE901"
                    iconName="silverware-fork-knife"
                    iconColor="#FDE902"
                    uri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="
                  />
                </View>
                <View style={tw`flex-1`}>
                  <View style={tw`flex flex-row justify-between`}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <View style={tw`flex flex-row items-center`}>
                      <Text style={tw`flex font-bold`}>{item.stock} - </Text>
                      <Text style={tw`text-sm`}>{uom?.uom_name}</Text>
                    </View>
                  </View>
                  <View style={styles.rating}>
                    <View style={tw`flex flex-row`}>
                      <Text style={styles.code}>Code: {item.code} - </Text>
                      <Text>{item.color}</Text>
                    </View>
                    <Text>
                      {id_product === item.id ? price?.price : 'Not published'}
                    </Text>
                    {role === 'kasir' && (
                      <View style={tw`w-fit rounded rounded-lg`}>
                        <Button
                          onPress={() =>
                            navigation.navigate('ProcessTransaction')
                          }
                          title="Proses"
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    padding: 15,
    gap: 10,
  },
  searchBar: {
    width: '100%',
    borderRadius: 15,
    paddingLeft: 48,
    height: 50,
    backgroundColor: '#EFEFEF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  productStyle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'gray-100',
  },
  productName: {fontSize: 18, color: '#18172B', fontWeight: 'bold'},
  rating: {flexDirection: 'column', gap: 2},
  code: {color: '#18172B', fontWeight: 'bold'},
});
