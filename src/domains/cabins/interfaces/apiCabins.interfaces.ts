import { IBase } from "../../../shared/interfaces/IBase";

export interface ICreateAndUpdateCabin {
  name: number;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string;
  image?: FileList | string;
  id?: number;
}

export interface IDeleteCabin {
  cabinId: number;
  cabinImg?: string;
}

export interface IGetAllCabin extends IBase {
  name: number;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}
