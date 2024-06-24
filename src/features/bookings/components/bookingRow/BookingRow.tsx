import * as S from '../../styles/BookingRow.styles';
import { format, isToday } from 'date-fns';
import {
  ConfirmDelete,
  Menus,
  Modal,
  Table,
  Tag,
} from '../../../../shared/components';
import {
  formatCurrency,
  formatDistanceFromNow,
} from '../../../../shared/utils/helpers';
import { IBookingsRowProps } from '../../interfaces/BookingsProps.interface';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import useCheckInOut from '../../../check-in-out/hooks/useCheckInOut';
import useBookings from '../../hooks/useBookings';

type IStatusToTagName = {
  unconfirmed: string;
  'checked-in': string;
  'checked-out': string;
};

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
  },
}: IBookingsRowProps) {
  const statusToTagName: IStatusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const { fullName: guestName, email } = guests;
  const { name: cabinName } = cabins;
  const navigate = useNavigate();

  const { useCheckOut } = useCheckInOut();
  const { checkOut, isCheckOutLoading } = useCheckOut();

  const { useDeleteBooking } = useBookings();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  function handleDelete() {
    deleteBooking(bookingId);
  }

  return (
    <Table.Row>
      <S.Cabin>{cabinName}</S.Cabin>

      <S.Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </S.Stacked>

      <S.Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </S.Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <S.Amount>{formatCurrency(totalPrice)}</S.Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toogle id={bookingId} />
          <Menus.List id={bookingId.toString()}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkOut(bookingId)}
                disabled={isCheckOutLoading}
              >
                Check Out
              </Menus.Button>
            )}
            {status !== 'checked-in' && (
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={handleDelete}
            disabled={isDeletingBooking}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
