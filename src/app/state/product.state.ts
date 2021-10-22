export enum ProductActionsType{
  GET_ALL_PRODUCTS = "[Product] Get All products",
  GET_SELECTED_PRODUCTS = "[Product] Get Selected Products",
  GET_AVAILABLE_PRODUCTS = "[Product] Get Available Products",
  SEARCH_PRODUCTS = "[Products] Search products",
  NEW_PRODUCT = "[Product] New product",
  SELECT_PRODUCT = "[Product] Select product",
  EDIT_PRODUCT = "[Product] Edit product",
  DELETE_PRODUCT = "[Product] Delete product"
}

export interface  ActionEvent {
  type: ProductActionsType ;
  payload?: any;
}
export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T>{
  dataState?: DataStateEnum;
  data?: T;
  errorMessage?: string;
}
