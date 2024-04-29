/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {useDispatch} from 'react-redux';
import {setRole} from '../../storages/reducers/authReducer';
import tw from 'twrnc';
import apiClient from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../storages/action/authAction';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Login = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'kasir' | 'owner'>('kasir');

  const setAuthToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    setAuthToken();
  }, []);

  const checkAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        console.log('Token:', token);
      } else {
        console.log('Token tidak ditemukan di AsyncStorage');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const body = {
        email: email,
        role: role,
        password: password,
      };
      console.log('data login', body);
      const response = await apiClient.post(
        'login',
        // body,

        {
          email: 'easy@gmail.com',
          role: role,
          password: '123',
        },
      );
      console.log('data 1', response);
      if (response.data.status == 'success') {
        const token = response.data.token;
        await AsyncStorage.setItem('authToken', token);
        dispatch(login(email, role));
        console.log('data masuk', response);
        navigation.navigate('Tabs');
        checkAuthToken();
      } else {
        console.log('data 2', response);
        Alert.alert(`${response.data}`);
      }
      console.log('data login', response);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <View style={tw`flex flex-row gap-4`}>
        <Button title="Login as Kasir" onPress={() => setRole('kasir')} />
        <Button title="Login as Owner" onPress={() => setRole('owner')} />
      </View>
      <View style={tw`flex flex-col w-full p-5`}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
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

export default Login;
