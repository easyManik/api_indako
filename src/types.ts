/* eslint-disable */
import {combineReducers} from 'redux';
import authReducer from './storages/reducers/authReducer';
import salesReducer from './storages/reducers/salesReducer';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const rootReducer = combineReducers({
  auth: authReducer,
  sales: salesReducer,
  // other reducers if any
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
export type RootStackParamList = {
  Home: undefined;
  Product: undefined;
  Transaction: undefined;
  Login: {navigation: string};
  DetailProduct: {key: any};
  // Tambahkan rute lain jika diperlukan
};

export const SET_ROLE = 'SET_ROLE';

export interface SetRoleAction {
  type: typeof SET_ROLE;
  payload: 'kasir' | 'owner';
}

export type AuthActionTypes = SetRoleAction;

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
export type DetailProductRouteProp = RouteProp<
  RootStackParamList,
  'DetailProduct'
>;
