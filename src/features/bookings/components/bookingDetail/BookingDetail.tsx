import * as S from './BookingDetail.styles';

import { useMoveBack } from '../../../../shared/hooks/useMoveBack';
import {
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  Row,
  Spinner,
  Tag,
} from '../../../../shared/components';
import useBookings from '../../hooks/useBookings';
import BookingDataBox from '../bookingDataBox/BookingDataBox';
import { useNavigate } from 'react-router-dom';

type IStatus = 'unconfirmed' | 'checked-in' | 'checked-out';

function BookingDetail() {
  const { useGetBooking } = useBookings();
  const { isLoading, booking = {} } = useGetBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const { status, id: bookingId }: { status: IStatus; id: string } = booking;

  return (
    <>
      <Row type="horizontal">
        <S.HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </S.HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
