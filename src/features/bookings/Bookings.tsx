import { Heading, Row } from '../../shared/components';
import { BookingTable } from './components';

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <p>TEST</p>
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
