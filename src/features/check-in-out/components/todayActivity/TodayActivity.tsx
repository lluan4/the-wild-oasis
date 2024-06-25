import { Heading, Row, Spinner } from '../../../../shared/components';
import useCheckInOut from '../../hooks/useCheckInOut';
import * as S from '../../styles/TodayActivity.styles';
import TodayItem from '../todayItem/TodayItem';

function TodayActivity() {
  const { useTodayActivity } = useCheckInOut();
  const { stays, isLoadingTodayActivity } = useTodayActivity();

  return (
    <S.StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoadingTodayActivity ? (
        stays?.length > 0 ? (
          <S.TodayList>
            {stays.map((stay) => (
              <TodayItem key={stay.id} activity={stay} />
            ))}
          </S.TodayList>
        ) : (
          <S.NoActivity>No activity today...</S.NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </S.StyledToday>
  );
}

export default TodayActivity;
