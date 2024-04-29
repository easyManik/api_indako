/* eslint-disable */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardCategory from '../../components/CardCategory';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import tw from 'tailwind-react-native-classnames';
import apiClient from '../../config';
import {Product} from './interface';
import {RootState} from '../../storages/store';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Home = ({navigation}: Props) => {
  const [data, setData] = useState<Product[] | []>([]);

  const getDataProduct = async () => {
    try {
      const response = await apiClient.get('product');
      return response.data;
    } catch (e) {
      console.error('Error:', e);
    }
  };
  useEffect(() => {
    getDataProduct()
      .then(response => {
        setData(response);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      const response = await apiClient.post('logout');
      if (response.data.status === 'success') {
        await AsyncStorage.removeItem('authToken');
        navigation.navigate('Login'); // Example navigation to Login screen
      } else {
        Alert.alert('Logout Failed', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Logout Error', 'An error occurred while logging out');
    }
  };

  const {role} = useSelector((state: RootState) => state.auth);

  const handleSearch = () => {
    console.log('Navigating to Search');
    navigation.navigate('Search');
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={tw`flex flex-row mb-3 justify-between`}>
          <Text>As {role}</Text>
          <Button onPress={handleLogout} title="LogOut" />
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            onPressIn={handleSearch}
          />
        </View>
        <ScrollView>
          <View style={styles.newProduct}>
            <Text style={styles.sectionText}>New Release</Text>
            <ScrollView style={styles.content}>
              <FlatList
                horizontal
                data={data}
                // keyExtractor={item => item.Products_id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Detail', {
                        id: item.id,
                      })
                    }>
                    <View
                      style={tw`flex flex-row mr-5 rounded p-4 bg-gray-100`}>
                      <View style={styles.category}>
                        <CardCategory
                          backgroundColor="#FDE901"
                          iconName="silverware-fork-knife"
                          iconColor=""
                        />
                        <View style={styles.details}>
                          <View>
                            <Text style={styles.productName}>{item.name}</Text>
                          </View>
                          <View style={styles.rating}>
                            <Text style={styles.code}>
                              Code: {item?.code} -{' '}
                            </Text>
                            <Text>{item.color}</Text>
                          </View>
                        </View>
                      </View>
                      <View>
                        <Text>{item.stock}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
          <View style={styles.popularProduct}>
            <View style={styles.popularProductText}>
              <Text style={styles.sectionText}>Popular</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Category')}>
                <Text
                  style={styles.sectionInfo}
                  onPress={() => navigation.navigate('Product')}>
                  More Info
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.popularList}>
              {data.map((item, index) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Detail', {id: item.id})}>
                  <View style={tw`rounded p-2 bg-gray-100`}>
                    <View style={styles.productStyle}>
                      <View style={styles.category}>
                        <CardCategory
                          backgroundColor="#FDE901"
                          iconName="silverware-fork-knife"
                          iconColor=""
                          uri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="
                        />
                        <View style={styles.details}>
                          <View>
                            <Text style={styles.productName}>{item.name}</Text>
                          </View>
                          <View style={styles.rating}>
                            <Text style={styles.code}>
                              Code: {item.code} -{' '}
                            </Text>
                            <Text>{item.color}</Text>
                          </View>
                        </View>
                      </View>
                      <View>
                        <Text>{item.stock}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    padding: 15,
  },
  search: {
    display: 'flex',
  },
  icon: {
    position: 'absolute',
    top: 45,
    left: 15,
  },
  searchBar: {
    width: '100%',
    borderRadius: 15,
    height: 50,
    backgroundColor: '#EFEFEF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  newProduct: {marginTop: 41},
  sectionText: {fontSize: 18, fontWeight: 'bold', color: '#3F3A3A'},
  content: {marginTop: 10, marginRight: 10},
  popularProduct: {marginTop: 30},
  popularList: {flexDirection: 'column', gap: 8},
  popularProductText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionInfo: {color: '#6D61F2'},
  productStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  category: {
    flexDirection: 'row',
    columnGap: 5,
    marginRight: 20,
  },
  details: {
    justifyContent: 'center',
    gap: 10,
    marginLeft: 15,
  },
  productName: {fontSize: 18, color: '#18172B', fontWeight: 'bold'},
  rating: {flexDirection: 'row'},
  code: {color: '#18172B', fontWeight: 'bold'},
});
