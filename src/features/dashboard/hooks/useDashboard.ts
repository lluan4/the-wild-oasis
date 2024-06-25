import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from '../../bookings/services/apiBookings';

function useDashboard() {
  const [searchParams] = useSearchParams();

  function useRecentBookings() {
    const numDays = !searchParams.get('last')
      ? 7
      : Number(searchParams.get('last'));

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading: isLoadingBookingDash, data: bookings } = useQuery({
      queryKey: ['bookings', `last-${numDays}`],
      queryFn: () => getBookingsAfterDate(queryDate),
    });
    return { isLoadingBookingDash, bookings };
  }

  function useRecentStays() {
    const numDays = !searchParams.get('last')
      ? 7
      : Number(searchParams.get('last'));

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading: isLoadingStaysDash, data: stays } = useQuery({
      queryKey: ['bookings', `last-${numDays}`],
      queryFn: () => getStaysAfterDate(queryDate),
    });

    const confirmedStays = stays?.filter((stay) => {
      return stay.status === 'checked-in' || stay.status === 'checked-out';
    });

    return { isLoadingStaysDash, stays, confirmedStays, numDays };
  }

  return { useRecentBookings, useRecentStays };
}

export default useDashboard;
