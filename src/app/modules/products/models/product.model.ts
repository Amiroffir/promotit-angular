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
