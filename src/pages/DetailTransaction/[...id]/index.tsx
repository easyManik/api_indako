/* eslint-disable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {useRoute} from '@react-navigation/native';
import {Transaction} from '../../Transaction/interface';
import apiClient from '../../../config';
import {PriceProduct, Product} from '../../Product/interface';
import moment from 'moment';

type RouteParams = {
  id: string;
};

interface UOM {
  uom_name: string;
}

const DetailTransaction = () => {
  const route = useRoute();
  const {id} = route.params as RouteParams;

  const [data, setData] = useState<Transaction>();
  const [dataProduct, setDataProduct] = useState<Product>();
  const [price, setPrice] = useState<PriceProduct>();
  const [uom, setuom] = useState<UOM>();

  const getDatatransaction = async () => {
    try {
      const response = await apiClient.get(`sell-transaction/${id}`);
      console.log('transa', response.data);
      return response.data.sellTransaction;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const getDataProduct = async () => {
    try {
      const response = await apiClient.get(`product/${data?.product_id}`);
      console.log('product detail', response.data);
      return response.data;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const getPriceProduct = async () => {
    try {
      const response = await apiClient.get(`product-price/${data?.product_id}`);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const getUom = async () => {
    try {
      const response = await apiClient.get(`uom/${dataProduct?.uom_id}`);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  useEffect(() => {
    if (id) {
      getDatatransaction()
        .then(res => setData(res))
        .catch(error => console.error('Error fetching data:', error));
      getDataProduct()
        .then(res => setDataProduct(res))
        .catch(e => console.log(e));
      getPriceProduct()
        .then(res => setPrice(res))
        .catch(error => console.error('Error fetching price:', error));
      getUom()
        .then(res => setuom(res))
        .catch(error => console.error('Error fetching price:', error));
    }
  }, [id, data, uom, price, dataProduct]);

  return (
    <View style={tw`w-full border h-full`}>
      <Image
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
        style={tw`w-full h-1/3`}
      />

      <View style={tw`w-full h-2/3`}>
        <ScrollView style={{backgroundColor: '#FAF7ED'}}>
          <View style={tw`m-5`}>
            <View>
              <Text style={tw`font-bold text-2xl`}>{dataProduct?.name}</Text>
              <Text style={tw`flex justify-end w-full text-lg`}>
                Rp. {price?.price}
              </Text>
            </View>
            <View style={tw`mt-3`}>
              <Text>Code : {dataProduct?.code}</Text>
              <Text>Warna : {dataProduct?.color}</Text>
              <Text>
                Stock : {dataProduct?.stock}-{uom?.uom_name}
              </Text>
              <Text>
                Release at{' '}
                {moment(price?.published_at).format('DD-MM-YYYY hh:mm:ss')}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: 'gray',
                marginVertical: 10,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View style={styles.details}>
              <Text style={tw`font-bold text-lg`}>Detail</Text>
              <View>
                <Text>Terjual Kepada : {data?.customer_name}</Text>
                <Text style={tw`flex justify-end w-full text-lg font-bold`}>
                  Rp. {data?.grand_total}
                </Text>
              </View>
              <View>
                <Text>Discount:</Text>
                <Text>1. {data?.disc_1}%</Text>
                <Text>2. {data?.disc_2}%</Text>
                <Text>Total Disc: Rp. {data?.disc_amount}%</Text>
              </View>
              <View>
                <Text>QTY : {data?.qty}</Text>
                <Text>UOM : {uom?.uom_name}</Text>
                <Text>COGS : {data?.cogs}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailTransaction;

const styles = StyleSheet.create({
  details: {
    gap: 8,
  },
});
