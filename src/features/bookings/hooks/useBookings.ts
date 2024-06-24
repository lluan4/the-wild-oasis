import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  DeleteBooking,
  GetAllBookings,
  GetBooking,
} from '../services/apiBookings';
import { useParams, useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../../shared/utils/constants';
import toast from 'react-hot-toast';

export function useBookings() {
  const queryClient = useQueryClient();

  function useGetAllBookings() {
    const [searchParams] = useSearchParams();

    //FILTER
    const filterValue = searchParams.get('status') || '';

    const filter =
      !filterValue || filterValue === 'all'
        ? { field: 'status', value: 'all' }
        : { field: 'status', value: filterValue };

    //SORT
    const sortByParams = searchParams.get('sort') || 'startDate-desc';
    const [field, direction] = sortByParams.split('-');
    const sortBy = { field, direction };

    //PAGINATION
    const page = !searchParams.get('page')
      ? 1
      : Number(searchParams.get('page'));

    //QUERY
    const {
      isPending: isLoadingBookings,
      data,
      error: bookingsError,
    } = useQuery({
      queryKey: ['bookings', filter, sortBy, page],
      queryFn: () => GetAllBookings({ filter, sortBy, page }),
    });

    const bookings = data?.data ?? [];
    const count = data?.count ?? 0;

    //PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, page + 1],
        queryFn: () => GetAllBookings({ filter, sortBy, page: page + 1 }),
      });
    }
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, page - 1],
        queryFn: () => GetAllBookings({ filter, sortBy, page: page - 1 }),
      });
    }

    return { isLoadingBookings, bookings, count, bookingsError };
  }

  function useGetBooking() {
    const { bookingId } = useParams();
    const {
      isLoading,
      data: booking,
      error,
    } = useQuery({
      queryKey: ['booking', bookingId],
      queryFn: () => GetBooking(Number(bookingId)),
      retry: false,
    });
    return { isLoading, booking, error };
  }

  function useDeleteBooking() {
    const { bookingIdParam } = useParams();

    const { isPending: isDeletingBooking, mutate: deleteBooking } = useMutation(
      {
        mutationFn: (bookingId?: number) => {
          if (!bookingId && !bookingIdParam) {
            throw new Error('No bookingId provided');
          }
          const id = bookingId || Number(bookingIdParam);
          return DeleteBooking(id);
        },
        onSuccess: () => {
          toast.success(`Booking deleted successfully`);
          queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },

        onError: () => {
          toast.error('Error deleting a booking');
        },
      }
    );
    return { isDeletingBooking, deleteBooking };
  }

  return { useGetAllBookings, useGetBooking, useDeleteBooking };
}

export default useBookings;
