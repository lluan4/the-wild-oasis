import * as S from '../../../shared/components/table/Table.styles';
import { Menus, Spinner, Table } from '../../../shared/components';
import { useCabins } from '../hooks/useCabins';
import CabinRow from './CabinRow';
import { useSearchParams } from 'react-router-dom';
import { IGetAllCabin } from '../interfaces/IApiCabins.interfaces';
import { useGetUrlParams } from '../../../shared/hooks/useUrl';
import { useSort } from '../../../shared/hooks/useSort';

function CabinTable() {
  const { useGetAllCabins } = useCabins();
  const { isLoading, data: cabins } = useGetAllCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('discount') || 'all';

  //1)Filter
  let filteredCabins: IGetAllCabin[] | IGetAllCabin = [];
  if (cabins) {
    switch (filterValue) {
      case 'no-discount':
        filteredCabins =
          cabins && cabins.filter((cabin) => cabin.discount === 0);
        break;
      case 'with-discount':
        filteredCabins = cabins && cabins.filter((cabin) => cabin.discount > 0);
        break;
      default:
        filteredCabins = cabins && cabins;
    }
  }

  //2)Sort
  // const sortBy = useGetUrlParams('sort') || 'startDate-asc';
  // const [field, direction] = sortBy.split('-');
  // const typedField = field as keyof IGetAllCabin;

  // const modifier = direction === 'asc' ? 1 : -1;
  // const sortedCabins = filteredCabins.sort(
  //   (a, b) => (Number(a[typedField]) - Number(b[typedField])) * modifier
  // );

  const sortedCabins = useSort<IGetAllCabin | IGetAllCabin>(
    filteredCabins,
    useGetUrlParams('sort') || 'startDate-asc'
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <S.TableData as="th"></S.TableData>
          <S.TableData as="th">Cabin</S.TableData>
          <S.TableData as="th">Capacity</S.TableData>
          <S.TableData as="th">Price</S.TableData>
          <S.TableData as="th">Discount</S.TableData>
          <S.TableData as="th"></S.TableData>
        </Table.Header>
        <Table.Body
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
