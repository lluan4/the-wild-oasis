import * as S from './CheckinBooking.styles';
import { useMoveBack } from '../../../../shared/hooks/useMoveBack';
import {
  Button,
  ButtonGroup,
  ButtonText,
  Checkbox,
  Heading,
  Row,
  Spinner,
} from '../../../../shared/components';
import { BookingDataBox } from '../../../bookings/components';
import useBookings from '../../../bookings/hooks/useBookings';
import { useState } from 'react';

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);

  const { useGetBooking } = useBookings();
  const { booking, isLoading } = useGetBooking();
  const moveBack = useMoveBack();

  if (isLoading) {
    return <Spinner />;
  }
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {}

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <S.Box>
        <Checkbox>
          I confirm that {guests.fullName} as paid the total amount
        </Checkbox>
      </S.Box>

      <ButtonGroup>
        <Button onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
