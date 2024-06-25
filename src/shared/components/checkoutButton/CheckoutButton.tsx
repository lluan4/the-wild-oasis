import useCheckInOut from '../../../features/check-in-out/hooks/useCheckInOut';
import Button from '../button/Button';

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { useCheckOut } = useCheckInOut();
  const { checkOut, isCheckOutLoading } = useCheckOut();
  return (
    <Button
      $variation="primary"
      $sizes="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckOutLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
