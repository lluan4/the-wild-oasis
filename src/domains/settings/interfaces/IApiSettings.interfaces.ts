import { IBase } from "../../../shared/interfaces/IBase";

export interface IApiRequestUpdateSetting {
  minBookingLenght?: number;
  maxBookingLenght?: number;
  maxGuestsPerBooking?: number;
  breakfastPrice?: number;
}
export interface IApiGetAllSetting extends IBase {
  minBookingLenght: number;
  maxBookingLenght: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}
