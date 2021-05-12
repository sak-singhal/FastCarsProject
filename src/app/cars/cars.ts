export interface ICar {
  id: number;
  carName: string;
  carimage: string;
  car_model: number;
  car_color: string;
  car_model_year: number;
  car_vin: string;
  price: string;
  availability: boolean;
}
export interface Users {
  carName: string;
  carimage: string;
  car_model: number;
  car_color: string;
  price: string;
  car_vin: string;
  car_model_year: number;
  availability: boolean;
  customer_name: string;
  customer_email: string;
  customer_number: string;
  customer_address: string;
  id: string;
  crossSellProductId: string;
  complains: string;
}
export interface CrossSellProducts {
  id: number;
  productName: string;
  price: string;
}
