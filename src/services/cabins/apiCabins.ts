import supabase from "../supabase";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { IGetAllCabin } from "../../interfaces/cabin/IGetAllCabin";
import { ICreateCabin } from "../../interfaces/cabin/ICreateCabin";

export async function GetAllCabins() {
  const { data, error }: PostgrestMaybeSingleResponse<IGetAllCabin[]> =
    await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins not found");
  }
  return data;
}

export async function DeleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
export async function CreateCabin(form: ICreateCabin) {
  // https://beubesxdvxybcyjkfemt.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg

  // const imageName = `${Math.random()}-${form.image?.item.}.jpg`;

  // const obj = {
  //   ...form,
  //   image: form.image?.at(0),
  // };
  console.log(form);

  // const { data, error } = await supabase.from("cabins").insert([form]).select();
  // if (error) {
  //   console.error(error);
  //   throw new Error("Cabins could not be created");
  // }
  // return data;
}
