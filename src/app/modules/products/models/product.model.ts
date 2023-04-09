export interface IProduct {
  id: number;
  productId: number;
  sysId: string;
  productName: string;
  price: number;
  donatedBy: string;
  donatedTo: string;
  isBought: boolean;
  buyerID: number | null;
  isDelivered: boolean;
  image: string;
}

export interface IDelivery {
  serialNumber: number;
  pid: number;
  fullName: string;
  email: string;
  address: string;
  phone: string;
}

export interface IServerDelivery {
  ProductSerialNumber: number;
  PID: number;
  FullName: string;
  Email: string;
  Address: string;
  Phone: string;
}

export interface IServerProduct {
  id: number;
  productID: number;
  productName: string;
  price: number;
  donatedBy: number;
  donatedTo: number;
  isBought: boolean;
  buyerID: number | null;
  isDelivered: boolean;
  image: string;
}

export interface IProductToBuyRequest {
  id: string;
  email: string;
  price: number;
}
