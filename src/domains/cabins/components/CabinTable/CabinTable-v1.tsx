import { Spinner } from "../../../../shared/components";
import { useCabins } from "../../hooks/useCabins";
import * as S from "../../styles/SCabinTable";
import CabinRow from "../CabinRow";

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
