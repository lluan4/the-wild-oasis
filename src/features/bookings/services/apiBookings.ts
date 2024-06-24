import { getToday } from '../../../shared/utils/helpers';
import supabase from '../../../shared/services/supabase';
import * as I from '../interfaces/ApiBookings.interface';
import { PAGE_SIZE } from '../../../shared/utils/constants';

export async function GetAllBookings({
  filter: { method = 'eq', ...filter },
  sortBy,
  page,
}: {
  filter: { field: string; value: string; method?: string };
  sortBy: { field: string; direction: string };
  page: number;
}): Promise<I.IApiBookingsResponse> {
  try {
    let query = supabase
      .from('bookings')
      .select(
        'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
        { count: 'exact' }
      );

    //FILTER
    if (filter.value !== 'all')
      query = (query as any)[method](filter.field, filter.value);

    //SORT
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

    //PAGINATION
    if (page) {
      const from = (page - 1) * (PAGE_SIZE - 1);
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error, count } =
      await query.returns<I.ApiBookingsCabinsGuests>();

    if (error) {
      console.error('Error fetching bookings:', error);
      throw new Error('Booking could not be loaded');
    }

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received');
    }

    return { data: data, count: count as number };
  } catch (error) {
    console.error('Error in GetAllBookings:', error);
    return { data: [], count: 0 };
  }
}

export async function GetBooking(id: number) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function UpdateBooking(
  id: number,
  obj: {
    status?: string;
    isPaid?: boolean;
    extrasPrice?: number;
    totalPrice?: number;
  }
) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function DeleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
