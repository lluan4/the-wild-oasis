import { IGetAllCabin } from "../../interfaces/apiCabins.interfaces";

export interface ICreateCabinsFormProps {
  cabinToEdit?: IGetAllCabin | Record<string, never>;
}
