import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import Stat from '../stat/Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../../../shared/utils/helpers';

function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: {
  bookings: any;
  confirmedStays: any;
  numDays: number;
  cabinCount: number;
}) {
  const numBookings = bookings?.length;

  const sales = bookings?.reduce((acc: number, curr: any) => {
    return acc + curr.totalPrice;
  }, 0);
  const checkins = confirmedStays?.length;

  console.log(numDays, cabinCount);
  const occupancyRate =
    confirmedStays.reduce((acc: number, curr: any) => {
      return acc + Number(curr.numNights);
    }, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100).toFixed(2) + '%'}
      />
    </>
  );
}

export default Stats;
