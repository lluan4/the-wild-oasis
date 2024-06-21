import { useForm } from 'react-hook-form';
import { useCabins } from '../../hooks/useCabins';
import { ICreateAndUpdateCabin } from '../../interfaces/IApiCabins.interfaces';
import {
  Button,
  FileInput,
  Form,
  FormRow,
  Input,
  TextArea,
} from '../../../../shared/components';

function CreateCabinForm() {
  const { useCreateCabins, useGetAllCabins } = useCabins();
  const { data: cabins } = useGetAllCabins();
  const { isPending, mutate } = useCreateCabins();
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<ICreateAndUpdateCabin>();
  const { errors } = formState;

  function onSubmit(form: ICreateAndUpdateCabin) {
    mutate(form, {
      onSuccess: () => {
        reset;
      },
    });
  }

  // function onError(error: FieldErrors<ICreateCabin>) {
  //   console.log(error);
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register('name', {
            required: 'This field is required',
            validate: (value) =>
              !cabins?.some((cabin) => cabin.name === Number(value)) ||
              'Cabin name already exists',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than the regular price',
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
          disabled={isPending}
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isPending}
          accept="image/*"
          {...register('image', {
            required: 'This field is required',
          })}
          // onChange={handleFileChange}
        />
      </FormRow>

      <FormRow>
        <>
          <Button disabled={isPending} $variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isPending}>Add Cabin</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
