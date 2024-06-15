import * as S from "../../../shared/styles/STable";
import { Menus, Spinner, Table } from "../../../shared/components";
import { useCabins } from "../hooks/useCabins";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";
import { IGetAllCabin } from "../interfaces/IApiCabins.interfaces";

function CabinTable() {
  const { useGetAllCabins } = useCabins();
  const { isLoading, data: cabins } = useGetAllCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins: IGetAllCabin[] | [] = [];
  if (cabins) {
    switch (filterValue) {
      case "no-discount":
        filteredCabins =
          cabins && cabins.filter((cabin) => cabin.discount === 0);
        break;
      case "with-discount":
        filteredCabins = cabins && cabins.filter((cabin) => cabin.discount > 0);
        break;
      default:
        filteredCabins = cabins && cabins;
    }
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
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
