import { Form, FormRow, Input, Spinner } from "../../../shared/components";
import { useSetting } from "../hooks/useSettings";

function UpdateSettingsForm() {
  const { useGetAllSettings, useGetUpdateSettings } = useSetting();
  const { isPending: isLoading, data } = useGetAllSettings();
  const { isPending: isUpdating, mutate: UpdateSettings } =
    useGetUpdateSettings();

  const {
    breakfastPrice,
    maxBookingLenght,
    maxGuestsPerBooking,
    minBookingLenght,
  } = data || {};

  const handleUpdate = (
    e: React.FocusEvent<HTMLInputElement>,
    field: string
  ) => {
    if (e.target.value === "") return;
    UpdateSettings({ [field]: parseInt(e.target.value) });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLenght}
          onBlur={(e) => handleUpdate(e, "minBookingLenght")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLenght}
          onBlur={(e) => handleUpdate(e, "maxBookingLenght")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
