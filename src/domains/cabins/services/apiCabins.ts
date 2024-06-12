import supabase from "../../../shared/services/supabase";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { generateImageName } from "../../../shared/utils/helpers";
import {
  ICreateAndUpdateCabin,
  IGetAllCabin,
} from "../interfaces/IApiCabins.interfaces";

const BASE_IMAGE_URL =
  "https://beubesxdvxybcyjkfemt.supabase.co/storage/v1/object/public/cabins-images/";

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
  let filePath = form.image;
  let imageName = "";
  if (typeof form.image !== "string") {
    imageName = generateImageName(form.image?.item(0)?.name);
    filePath = `${BASE_IMAGE_URL}/${imageName}`;
  }

  const obj = {
    ...form,
    image: filePath,
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

  if (typeof form.image === "undefined") throw new Error("Image invalid");

  if (imageName !== "") {
    const storageError = await requestUploadoPhoto(
      imageName,
      form.image[0] as File
    );

    if (storageError) {
      DeleteCabin(data.at(0).id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and and the cabin was not created"
      );
    }
  }

  return data;
}

export async function UpdateCabin(form: ICreateAndUpdateCabin) {
  const { name, maxCapacity, regularPrice, discount, description, image, id } =
    form;

  if (typeof image === "undefined") throw new Error("Image invalid");

  const imageName =
    typeof image !== "string" ? generateImageName(image[0].name) : image ?? "";

  const filePath = `${BASE_IMAGE_URL}/${imageName}`;

  const obj: ICreateAndUpdateCabin = {
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    id,
    image: typeof image === "string" ? image : filePath,
  };

  const { data, error } = await supabase
    .from("cabins")
    .update([obj])
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (typeof image !== "string") {
    const storageError = await requestUploadoPhoto(imageName, image[0]);

    if (storageError) {
      DeleteCabin(data.at(0).id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and and the cabin was not created"
      );
    }
  }

  return data;
}

async function requestUploadoPhoto(imageName: string, file: File) {
  const { error } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, file);
  return error;
}
