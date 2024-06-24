import * as S from './BookingRow.styles';
import { format, isToday } from 'date-fns';
import { Menus, Table, Tag } from '../../../../shared/components';
import {
  formatCurrency,
  formatDistanceFromNow,
} from '../../../../shared/utils/helpers';
import { IBookingsRowProps } from '../../interfaces/BookingsProps.interface';
import { HiArrowDownOnSquare, HiEye } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

type IStatusToTagName = {
  unconfirmed: string;
  'checked-in': string;
  'checked-out': string;
};

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
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
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
