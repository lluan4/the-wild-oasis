import { IGetAllCabin } from "../../interfaces/IApiCabins.interfaces";

export interface ICreateCabinsFormProps {
  cabinToEdit?: IGetAllCabin | Record<string, never>;
}
