/* eslint-disable */
import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import apiClient from '../../config';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {useRoute} from '@react-navigation/native';

type TransactionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: TransactionScreenNavigationProp;
};

type RouteParams = {
  id: string;
};

const ProcessTransaction = ({navigation}: Props) => {
  const route = useRoute();
  const {id} = route.params as RouteParams;
  console.log('id', id);

  const [body, setbody] = useState({
    product_id: id,
    transaction_date: '',
    customer_name: '',
    is_cancelled: '',
    cancelled_at: '',
    is_printed: '',
    printed_at: '',
    sub_total: '',
    disc_amount: '',
    grand_total: '',
    notes: '',
  });

  const handleChange = (field: string, text: string) => {
    setbody({
      ...body,
      [field]: text,
    });
  };

  const handleProcessProduct = async () => {
    try {
      const res = await apiClient.post('sell-transaction', body);
      if (res.data.status == 'success') {
        navigation.navigate('Tabs');
        Alert.alert('Berhasil');
      }
      console.log('data', res.data.status);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <View>
          <Text>Product</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('product_id', e)}
            value={body.product_id}
          />
        </View> */}
        <View>
          <Text>Tanggal Transaksi</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('transaction_date', e)}
            value={body.transaction_date}
          />
        </View>
        <View>
          <Text>Nama Pembeli</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('customer_name', e)}
            value={body.customer_name}
          />
        </View>
        <View>
          <Text>Apakah di batalkan?</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('is_cancelled', e)}
            value={body.is_cancelled}
          />
        </View>
        <View>
          <Text>Tanggal dibatalkan</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('cancelled_at', e)}
            value={body.cancelled_at}
          />
        </View>
        <View>
          <Text>Apakah diprint?</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('is_printed', e)}
            value={body.is_printed}
          />
        </View>
        <View>
          <Text>Tanggal diprint</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('printed_at', e)}
            value={body.printed_at}
          />
        </View>
        <View>
          <Text>Sub Total</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('sub_total', e)}
            value={body.sub_total}
          />
        </View>
        <View>
          <Text>Total Diskon</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('disc_amount', e)}
            value={body.disc_amount}
          />
        </View>
        <View>
          <Text>Grand Total</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('grand_total', e)}
            value={body.grand_total}
          />
        </View>
        <View>
          <Text>Notes</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('notes', e)}
            value={body.notes}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleProcessProduct}>
          <Text style={styles.buttonText}>Proses Transaksi</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    padding: 15,
    gap: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default ProcessTransaction;
