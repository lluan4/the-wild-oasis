import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetAllBookings } from '../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../../shared/utils/constants';

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

  return { useGetAllBookings };
}

export default useBookings;
