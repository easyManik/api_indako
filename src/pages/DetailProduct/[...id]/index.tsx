/* eslint-disable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {PriceProduct, Product} from '../../Product/interface';
import apiClient from '../../../config';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';

type RouteParams = {
  id: string;
};

interface UOM {
  uom_name: string;
}

const DetailProduct = () => {
  const route = useRoute();
  const {id} = route.params as RouteParams;
  const [data, setData] = useState<Product>();
  const [uom, setuom] = useState<UOM>();
  const [price, setPrice] = useState<PriceProduct>();
  const getDataProduct = async () => {
    try {
      const response = await apiClient.get(`product/${id}`);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const getPriceProduct = async () => {
    try {
      const response = await apiClient.get(`product-price/${id}`);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const getUom = async () => {
    try {
      const response = await apiClient.get(`uom/${data?.uom_id}`);
      return response.data.uom;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  useEffect(() => {
    if (id) {
      getPriceProduct()
        .then(res => setPrice(res))
        .catch(error => console.error('Error fetching price:', error));
      getDataProduct()
        .then(res => setData(res))
        .catch(error => console.error('Error fetching data:', error));
      getUom()
        .then(res => setuom(res))
        .catch(error => console.error('Error fetching price:', error));
    }
  }, [id]);

  return (
    <View style={tw`w-full border h-full`}>
      <Image source={require('./kucing3.jpg')} style={tw`w-full h-1/3`} />

      <View style={tw`w-full h-2/3`}>
        <ScrollView style={{backgroundColor: '#FAF7ED'}}>
          <View style={tw`m-5`}>
            <View>
              <Text style={tw`font-bold text-2xl`}>{data?.name}</Text>
              <Text style={tw`flex justify-end w-full text-lg`}>
                {price?.price}
              </Text>
            </View>
            <View style={tw`mt-3`}>
              <Text>Code : {data?.code}</Text>
              <Text>Warna : {data?.color}</Text>
              <Text>
                Stock : {data?.stock} - {uom?.uom_name}
              </Text>
              <Text>
                Release at {moment(price?.published_at).format('DD-MM-YYYY')}
              </Text>
            </View>

            <View style={tw`mt-5`}>
              <Text style={tw`font-bold text-lg`}>Detail</Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailProduct;
