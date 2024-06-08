export interface ICreateCabin {
  name: number;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string;
  image?: FileList;
}
