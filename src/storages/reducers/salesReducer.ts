/* eslint-disable */
const initialState = {
  salesList: [], // List of sales
};

// Action types
const ADD_SALE = 'sales/ADD_SALE';

// Action creators
export const addSale = (saleData: any) => ({
  type: ADD_SALE,
  payload: saleData,
});

// Reducer function
const salesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_SALE:
      return {...state, salesList: [...state.salesList, action.payload]};
    default:
      return state;
  }
};

export default salesReducer;
