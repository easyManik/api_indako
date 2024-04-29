/* eslint-disable */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import tw from 'tailwind-react-native-classnames';
import apiClient from '../../config';
import {Transaction} from './interface';
import moment from 'moment';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const TransactionScreen = ({navigation}: Props) => {
  const [data, setData] = useState<Transaction[] | []>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  const calculateTotalAmount = (transactions: Transaction[]) => {
    let total = 0;
    transactions.forEach(item => {
      total += parseFloat(item.grand_total);
    });
    return total;
  };

  const getDatatransaction = async () => {
    try {
      const response = await apiClient.get('sell-transaction');
      console.log(response.data);
      return response.data.sellTransactions;
    } catch (e) {
      console.error('Error:', e);
    }
  };

  useEffect(() => {
    getDatatransaction()
      .then(res => {
        setData(res);
        const amount = calculateTotalAmount(res); // Hitung jumlah total
        setTotalAmount(amount);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const itemArr = Array.from({length: 6}, (_, index) => index);

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
        <View style={tw`bg-green-100 p-4 rounded rounded-xl`}>
          <Text>Jumlah Terjual</Text>
          <Text style={styles.productName}>Rp. {totalAmount.toFixed(2)}</Text>
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`font-bold text-lg mr-2`}>{data.length}</Text>
            <Text>PCS</Text>
          </View>
        </View>
        <ScrollView>
          {data.map((item, index) => (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailTtransaction', {id: item.id})
                }>
                <View style={styles.productStyle}>
                  <View style={styles.category}>
                    <View style={styles.details}>
                      <View>
                        <Text style={styles.productName}>
                          {item.customer_name}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.code}>
                          Disc: {item.disc_amount}%
                        </Text>
                        <Text>Rp. {item.grand_total}</Text>
                        <Text>
                          {moment(item.transaction_date).format(
                            'DD-MM-YYYY hh:mm:ss',
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={tw`p-2 rounded bg-blue-100 text-blue-500`}>
                      Success
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: 'gray',
                  margin: 10,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            </>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    padding: 15,
    gap: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  category: {
    flexDirection: 'row',
    columnGap: 5,
  },
  details: {
    justifyContent: 'center',
    gap: 10,
    marginLeft: 5,
  },
  productName: {fontSize: 18, color: '#18172B', fontWeight: 'bold'},
  rating: {flexDirection: 'row'},
  code: {color: '#18172B', fontWeight: 'bold'},
});
function setData(res: any): any {
  throw new Error('Function not implemented.');
}
