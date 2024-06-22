import {
  Empty,
  Menus,
  Pagination,
  Spinner,
  Table,
} from '../../../../shared/components';
import useBookings from '../../hooks/useBookings';

import BookingRow from '../bookingRow/BookingRow';

function BookingTable() {
  const { useGetAllBookings } = useBookings();
  const { bookings, isLoadingBookings, count } = useGetAllBookings();

  if (bookings === undefined || !bookings.length)
    return <Empty resource="bookings" />;

  if (isLoadingBookings) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
