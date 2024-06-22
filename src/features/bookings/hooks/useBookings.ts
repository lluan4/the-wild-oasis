import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetAllBookings } from '../services/apiBookings';
import * as I from '../interfaces/ApiBookings.interface';

export function useBookings() {
  const queryClient = useQueryClient();

  function useGetAllBookings() {
    const {
      isLoading: isLoadingBookings,
      data: bookings,
      error: bookingsError,
    } = useQuery<I.ApiBookingsCabinsGuests[] | [], Error>({
      queryKey: ['bookings'],
      queryFn: GetAllBookings,
    });
    return { isLoadingBookings, bookings, bookingsError };
  }

  return { useGetAllBookings };
}

export default useBookings;
