export interface ApiBookingsGetAll {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  created_at: string;
  cabinID: number;
  guestID: number;
}

export interface ApiBookingsCabinsGuests
  extends Pick<
    ApiBookingsGetAll,
    | 'id'
    | 'created_at'
    | 'startDate'
    | 'endDate'
    | 'numNights'
    | 'numGuests'
    | 'status'
    | 'totalPrice'
  > {
  cabins: {
    name: string;
  };
  guests: {
    email: string;
    fullName: string;
  };
}
