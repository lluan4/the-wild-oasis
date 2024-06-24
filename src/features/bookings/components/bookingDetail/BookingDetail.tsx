import * as S from '../../styles/BookingDetail.styles';

import { useMoveBack } from '../../../../shared/hooks/useMoveBack';
import {
  Button,
  ButtonGroup,
  ButtonText,
  ConfirmDelete,
  Heading,
  Modal,
  Row,
  Spinner,
  Tag,
} from '../../../../shared/components';
import useBookings from '../../hooks/useBookings';
import BookingDataBox from '../bookingDataBox/BookingDataBox';
import { useNavigate } from 'react-router-dom';
import useCheckInOut from '../../../check-in-out/hooks/useCheckInOut';

type IStatus = 'unconfirmed' | 'checked-in' | 'checked-out';

function BookingDetail() {
  const { useGetBooking, useDeleteBooking } = useBookings();
  const { isLoading, booking = {} } = useGetBooking();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const { useCheckOut } = useCheckInOut();
  const { checkOut, isCheckOutLoading } = useCheckOut();

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
        {status === 'checked-in' && (
          <Button
            onClick={() => checkOut(Number(bookingId))}
            disabled={isCheckOutLoading || isDeletingBooking}
          >
            Check Out
          </Button>
        )}

        {status !== 'checked-in' && (
          <Modal>
            <Modal.Open opens="delete">
              <Button $variation="danger">Delete</Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="booking"
                onConfirm={() =>
                  deleteBooking(Number(bookingId), {
                    onSettled: () => {
                      navigate('/bookings');
                    },
                  })
                }
                disabled={isDeletingBooking}
              />
            </Modal.Window>
          </Modal>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
