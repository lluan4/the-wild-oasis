import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  UpdateBooking,
  getStaysTodayActivity,
} from '../../bookings/services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useCheckInOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function useCheckIn() {
    const { mutate: checkIn, isPending: isCheckInLoading } = useMutation({
      mutationFn: ({
        bookingId,
        breakfast,
      }: {
        bookingId: number;
        breakfast?: {
          hasBreakfast?: boolean;
          extrasPrice?: number;
          totalPrice?: number;
        };
      }) =>
        UpdateBooking(bookingId, {
          status: 'checked-in',
          isPaid: true,
          ...breakfast,
        }),
      onSuccess: (data) => {
        toast.success(`Booking #${data.id} checked in successfully`);
        queryClient.invalidateQueries({ refetchType: 'active' });
        navigate('/');
      },

      onError: () => {
        toast.error('Error checking in booking');
      },
    });

    return { checkIn, isCheckinLoading: isCheckInLoading };
  }

  function useCheckOut() {
    const { mutate: checkOut, isPending: isCheckOutLoading } = useMutation({
      mutationFn: (bookingId: number) =>
        UpdateBooking(bookingId, {
          status: 'checked-out',
        }),
      onSuccess: (data) => {
        toast.success(`Booking #${data.id} checked out successfully`);
        queryClient.invalidateQueries({ refetchType: 'active' });
      },

      onError: () => {
        toast.error('Error checking in booking');
      },
    });

    return { checkOut, isCheckOutLoading };
  }

  function useTodayActivity() {
    const { isPending: isLoadingTodayActivity, data: stays } = useQuery({
      queryFn: getStaysTodayActivity,
      queryKey: ['today-activity'],
    });

    return { isLoadingTodayActivity, stays };
  }

  return {
    useCheckIn,
    useCheckOut,
    useTodayActivity,
  };
}

export default useCheckInOut;
