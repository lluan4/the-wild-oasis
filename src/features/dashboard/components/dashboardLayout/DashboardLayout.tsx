import { Spinner } from '../../../../shared/components';
import { useCabins } from '../../../cabins/hooks/useCabins';
import TodayActivity from '../../../check-in-out/components/todayActivity/TodayActivity';
import useDashboard from '../../hooks/useDashboard';
import * as S from '../../styles/DashboardLayout.styles';
import DurationChart from '../durationChart/DurationChart';
import SalesChart from '../salesChart/SalesChart';
import Stats from '../stats/Stats';

function DashboardLayout() {
  const { useRecentBookings, useRecentStays } = useDashboard();
  const { useGetAllCabins } = useCabins();

  const { isLoadingBookingDash, bookings } = useRecentBookings();
  const { isLoadingStaysDash, confirmedStays, numDays } = useRecentStays();
  const { data } = useGetAllCabins();

  if (isLoadingBookingDash || isLoadingStaysDash) {
    return <Spinner />;
  }

  return (
    <S.StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={data!.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </S.StyledDashboardLayout>
  );
}

export default DashboardLayout;
