import { Heading, Row } from '../../../shared/components';
import { BookingTable, BookingTableOperations } from '../components';

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
