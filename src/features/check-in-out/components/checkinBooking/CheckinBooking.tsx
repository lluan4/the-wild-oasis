import * as S from '../styles/CheckinBooking.styles';
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
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../../../shared/utils/helpers';
import useCheckInOut from '../../hooks/useCheckInOut';
import { useSetting } from '../../../settings/hooks/useSettings';

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { useGetBooking } = useBookings();
  const { booking, isLoading } = useGetBooking();

  const { useCheckIn } = useCheckInOut();
  const { checkIn, isCheckinLoading } = useCheckIn();

  const { useGetAllSettings } = useSetting();
  const { data: settings, isLoading: isLoadingSettings } = useGetAllSettings();

  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || isLoadingSettings) {
    return <Spinner />;
  }

  if (!settings) {
    throw new Error('Settings could not be loaded');
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
      return;
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <S.Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </S.Box>
      )}

      <S.Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          disabled={confirmPaid || isCheckinLoading}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </S.Box>

      <ButtonGroup>
        <Button
          disabled={!confirmPaid || isCheckinLoading}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
