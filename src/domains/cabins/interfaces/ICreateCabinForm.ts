import { IGetAllCabin } from "./IApiCabins.interfaces";

export interface ICreateCabinsFormProps {
  cabinToEdit?: IGetAllCabin | Record<string, never>;
  onCloseModal?: () => void;
}
