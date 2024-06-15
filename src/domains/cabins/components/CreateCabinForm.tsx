import { FieldErrors, useForm } from "react-hook-form";
import { ICreateCabinsFormProps } from "../interfaces/ICreateCabinForm";
import { useCabins } from "../hooks/useCabins";
import { ICreateAndUpdateCabin } from "../interfaces/IApiCabins.interfaces";
import {
  Button,
  FileInput,
  Form,
  FormRow,
  Input,
  TextArea,
} from "../../../shared/components";

function CreateCabinForm({
  cabinToEdit = {},
  onCloseModal,
}: ICreateCabinsFormProps) {
  const { id: editID, ...editValues } = cabinToEdit;
  const isEditingSession = Boolean(editID);

  const { useCreateCabins, useGetAllCabins, useUpdateCabins } = useCabins();
  const { data: cabins } = useGetAllCabins();
  const { isPending: pendingCreate, mutate: CreateCabin } = useCreateCabins();
  const { isPending: pedingUpdate, mutate: UpdateCabin } = useUpdateCabins();

  const defaultValues: ICreateAndUpdateCabin | Record<string, never> =
    isEditingSession
      ? {
          discount: Number(editValues.name),
          maxCapacity: Number(editValues.maxCapacity),
          regularPrice: Number(editValues.regularPrice),
          name: editValues.name.toString(),
          description: editValues.description,
          image: editValues.image,
          id: editID,
        }
      : {};

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<ICreateAndUpdateCabin>({
      defaultValues: defaultValues,
    });

  const { errors } = formState;

  function onSubmit(form: ICreateAndUpdateCabin) {
    !isEditingSession
      ? CreateCabin(form, {
          onSuccess: () => {
            reset;
            onCloseModal?.();
          },
        })
      : UpdateCabin(form, { onSuccess: () => onCloseModal?.() });
  }

  function onError(error: FieldErrors<ICreateAndUpdateCabin>) {
    console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      variation={onCloseModal ? "regular" : "modal"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={pendingCreate}
          {...register("name", {
            required: "This field is required",
            validate: (value) =>
              !cabins?.some((cabin) => cabin.name === Number(value)) ||
              isEditingSession ||
              "Cabin name already exists",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={pendingCreate}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={pendingCreate}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={pendingCreate || pedingUpdate}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <TextArea
          type="number"
          id="description"
          disabled={pendingCreate || pedingUpdate}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={pendingCreate || pedingUpdate}
          accept="image/*"
          {...register("image", {
            required: isEditingSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            disabled={pendingCreate || pedingUpdate}
            $variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={pendingCreate || pedingUpdate}>
            {isEditingSession ? "Edit Cabin" : "Create New Cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
