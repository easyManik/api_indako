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

type TransactionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: TransactionScreenNavigationProp;
};

const AddProduct = ({navigation}: Props) => {
  const [body, setbody] = useState({
    code: '',
    name: '',
    color: '',
    is_raw_material: '',
    is_active: '',
    uom_id: '',
    stock: '',
  });

  const handleChange = (field: string, text: string) => {
    setbody({
      ...body,
      [field]: text,
    });
  };

  const handleAddProduct = async () => {
    try {
      const res = await apiClient.post('product', body);
      if (res.data.status == 'success') {
        navigation.navigate('Home');
        Alert.alert('Berhasil');
      }
      console.log('data', res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>Code</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('code', e)}
            value={body.code}
          />
        </View>
        <View>
          <Text>Nama Barang</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('name', e)}
            value={body.name}
          />
        </View>
        <View>
          <Text>Warna</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('color', e)}
            value={body.color}
          />
        </View>
        <View>
          <Text>Stock</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('stock', e)}
            value={body.stock}
          />
        </View>
        <View>
          <Text>Apakah Aktif?</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('is_active', e)}
            value={body.is_active}
          />
        </View>
        <View>
          <Text>Apakah Bahan Mentah?</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('is_raw_material', e)}
            value={body.is_raw_material}
          />
        </View>
        <View>
          <Text>Uom ID</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => handleChange('uom_id', e)}
            value={body.uom_id}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Tambah Product</Text>
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
export default AddProduct;
