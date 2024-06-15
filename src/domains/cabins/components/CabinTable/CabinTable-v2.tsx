import { Spinner } from "../../../../shared/components";
import Table from "../../../../shared/components/Table";
import { useCabins } from "../../hooks/useCabins";
import CabinRow from "../CabinRow";

function CabinTable() {
  const { useGetAllCabins } = useCabins();
  const { isLoading, data: cabins } = useGetAllCabins();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {cabins &&
        cabins.map((cabin) => <CabinRow key={cabin.id} cabin={cabin} />)}
    </Table>
  );
}

export default CabinTable;
