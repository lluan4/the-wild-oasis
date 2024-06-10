import { IGetAllCabin } from "../../../services/cabins/apiCabins.interfaces";

export interface ICreateCabinsFormProps {
  cabinToEdit: IGetAllCabin | Record<string, never>;
}
