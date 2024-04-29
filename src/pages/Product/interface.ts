/* eslint-disable */
export interface Product {
  id: string;
  code: string;
  name: string;
  color: string;
  is_raw_material: boolean;
  is_active: boolean;
  uom_id: number;
  stock: number;
}

export interface PriceProduct {
  product_id: number;
  price: any;
  published_at: any;
}
