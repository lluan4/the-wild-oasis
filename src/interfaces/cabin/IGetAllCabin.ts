import { IBase } from "../IBase";

export interface IGetAllCabin extends IBase {
  name: number;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}
