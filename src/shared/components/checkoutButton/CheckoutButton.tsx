import Button from '../button/Button';

function CheckoutButton({ bookingId }: { bookingId: string | number }) {
  return (
    <Button $variation="primary" $sizes="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
