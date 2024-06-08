import * as S from "./CabinTable.styles";
import Spinner from "../../../ui/spinner/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "../../../hooks/useCabins";

function CabinTable() {
  const { useGetAllCabins } = useCabins();
  const { isLoading, data: cabins } = useGetAllCabins();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <S.Table role="table">
      <S.TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </S.TableHeader>
      {cabins &&
        cabins.map((cabin) => <CabinRow key={cabin.id} cabin={cabin} />)}
    </S.Table>
  );
}

export default CabinTable;
