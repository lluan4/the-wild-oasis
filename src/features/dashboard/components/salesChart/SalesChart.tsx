import * as S from '../../styles/SalesChart.styles';
import { Heading } from '../../../../shared/components';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { useTheme } from 'styled-components';

const fakeData = [
  { label: 'Jan 09', totalSales: 480, extrasSales: 20 },
  { label: 'Jan 10', totalSales: 580, extrasSales: 100 },
  { label: 'Jan 11', totalSales: 550, extrasSales: 150 },
  { label: 'Jan 12', totalSales: 600, extrasSales: 50 },
  { label: 'Jan 13', totalSales: 700, extrasSales: 150 },
  { label: 'Jan 14', totalSales: 800, extrasSales: 150 },
  { label: 'Jan 15', totalSales: 700, extrasSales: 200 },
  { label: 'Jan 16', totalSales: 650, extrasSales: 200 },
  { label: 'Jan 17', totalSales: 600, extrasSales: 300 },
  { label: 'Jan 18', totalSales: 550, extrasSales: 100 },
  { label: 'Jan 19', totalSales: 700, extrasSales: 100 },
  { label: 'Jan 20', totalSales: 800, extrasSales: 200 },
  { label: 'Jan 21', totalSales: 700, extrasSales: 100 },
  { label: 'Jan 22', totalSales: 810, extrasSales: 50 },
  { label: 'Jan 23', totalSales: 950, extrasSales: 250 },
  { label: 'Jan 24', totalSales: 970, extrasSales: 100 },
  { label: 'Jan 25', totalSales: 900, extrasSales: 200 },
  { label: 'Jan 26', totalSales: 950, extrasSales: 300 },
  { label: 'Jan 27', totalSales: 850, extrasSales: 200 },
  { label: 'Jan 28', totalSales: 900, extrasSales: 100 },
  { label: 'Jan 29', totalSales: 800, extrasSales: 300 },
  { label: 'Jan 30', totalSales: 950, extrasSales: 200 },
  { label: 'Jan 31', totalSales: 1100, extrasSales: 300 },
  { label: 'Feb 01', totalSales: 1200, extrasSales: 400 },
  { label: 'Feb 02', totalSales: 1250, extrasSales: 300 },
  { label: 'Feb 03', totalSales: 1400, extrasSales: 450 },
  { label: 'Feb 04', totalSales: 1500, extrasSales: 500 },
  { label: 'Feb 05', totalSales: 1400, extrasSales: 600 },
  { label: 'Feb 06', totalSales: 1450, extrasSales: 400 },
];

function SalesChart({ bookings, numDays }: { bookings: any; numDays: number }) {
  const theme = useTheme();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking: any) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc: any, curr: any) => acc + curr.totalPrice, 0),
      extraSales: bookings
        .filter((booking: any) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc: any, curr: any) => acc + curr.extrasPrice, 0),
    };
  });

  return (
    <S.StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1), 'MMM dd yyyy')}{' '}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: theme.colors.grey[400] }}
            tickLine={{ stroke: theme.colors.grey[400] }}
          />
          <YAxis
            unit="$"
            tick={{ fill: theme.colors.grey[400] }}
            tickLine={{ stroke: theme.colors.grey[400] }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: theme.colors.blue[100] }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={theme.colors.blue[700]}
            fill={theme.colors.blue[100]}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={theme.colors.blue[700]}
            fill={theme.colors.blue[100]}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </S.StyledSalesChart>
  );
}

export default SalesChart;
