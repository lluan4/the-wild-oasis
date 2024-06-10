import supabase from "../supabase";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { ICreateAndUpdateCabin, IGetAllCabin } from "./apiCabins.interfaces";
import { generateImageName } from "../../utils/helpers";

export async function GetAllCabins() {
  const { data, error }: PostgrestMaybeSingleResponse<IGetAllCabin[]> =
    await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins not found");
  }
  return data;
}

export async function DeleteCabin(cabinId: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function CreateCabin(form: ICreateAndUpdateCabin) {
  // https://beubesxdvxybcyjkfemt.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg

  const imageName = generateImageName(form.image?.item(0)?.name);

  const obj = {
    ...form,
    image: form.image?.item(0),
  };

  const { data, error } = await supabase
    .from("cabins")
    .insert([obj])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  const storageError = await requestUploadoPhoto(imageName, obj.image!);

  if (storageError) {
    DeleteCabin(data.at(0).id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and and the cabin was not created"
    );
  }

  return data;
}

export async function UpdateCabin(form: ICreateAndUpdateCabin) {
  console.log(form);
  // const obj = {
  //   ...form,
  //   image: form.image?.item(0),
  // };

  // const { data, error } = await supabase
  //   .from("cabins")
  //   .update({ obj })
  //   .eq("id", id)
  //   .select();

  // if (error) {
  //   console.error(error);
  //   throw new Error("Cabin could not be created");
  // }

  // const storageError = await requestUploadoPhoto(imageName, obj.image!);

  // if (storageError) {
  //   DeleteCabin(data.at(0).id);
  //   console.error(storageError);
  //   throw new Error(
  //     "Cabin image could not be uploaded and and the cabin was not created"
  //   );
  // }

  // return data;
}

async function requestUploadoPhoto(imageName: string, file: File) {
  const { error } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, file);
  return error;
}
