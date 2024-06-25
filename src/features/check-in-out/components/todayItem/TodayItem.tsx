import { Link } from 'react-router-dom';
import {
  Button,
  CheckoutButton,
  Flag,
  Tag,
} from '../../../../shared/components';
import * as S from '../../styles/TodayItem.styles';

function TodayItem({ activity }: { activity: any }) {
  const { id, status, guests, numNights } = activity;

  return (
    <S.StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={guests.country} />
      <S.Guest>{guests.fullName}</S.Guest>
      <div> {numNights} nights</div>

      {status === 'unconfirmed' && (
        <Button
          $sizes="small"
          $variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </S.StyledTodayItem>
  );
}

export default TodayItem;
