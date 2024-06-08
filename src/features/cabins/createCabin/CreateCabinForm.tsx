/* eslint-disable @typescript-eslint/no-explicit-any */
import * as S from "./CreateCabinForm.styles";

import Input from "../../../ui/input/Input";
import Form from "../../../ui/form/Form";
import Button from "../../../ui/button/Button";
import Textarea from "../../../ui/textArea/Textarea";
import FileInput from "../../../ui/fileInput/FileInput";

import { useForm } from "react-hook-form";
import { useCabins } from "../../../hooks/useCabins";
import { ICreateCabin } from "../../../interfaces/cabin/ICreateCabin";

function CreateCabinForm() {
  const { register, handleSubmit, reset } = useForm<ICreateCabin>();
  const { useCreateCabins } = useCabins();
  const { isPending, mutate } = useCreateCabins();

  const onSubmit = async (form: ICreateCabin) => {
    const obj: ICreateCabin = {
      ...form,
    };
    mutate(obj, { onSuccess: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <S.FormRow>
        <S.Label htmlFor="name">Cabin name</S.Label>
        <Input type="text" id="name" {...register("name")} />
      </S.FormRow>

      <S.FormRow>
        <S.Label htmlFor="maxCapacity">Maximum capacity</S.Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </S.FormRow>

      <S.FormRow>
        <S.Label htmlFor="regularPrice">Regular price</S.Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </S.FormRow>

      <S.FormRow>
        <S.Label htmlFor="discount">Discount</S.Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </S.FormRow>

      <S.FormRow>
        <S.Label htmlFor="description">Description for website</S.Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </S.FormRow>

      <S.FormRow>
        <S.Label htmlFor="image">Cabin photo</S.Label>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </S.FormRow>

      <S.FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add Cabin</Button>
      </S.FormRow>
    </Form>
  );
}

export default CreateCabinForm;
