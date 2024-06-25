import { Heading, Row } from '../../../shared/components';
import { DashboardFilter } from '../components';
import DashboardLayout from '../components/dashboardLayout/DashboardLayout';

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
