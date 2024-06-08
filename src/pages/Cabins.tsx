import { useState } from "react";

import CabinTable from "../features/cabins/table/CabinTable";
import Button from "../ui/button/Button";
import Heading from "../ui/heading/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/createCabin/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sord</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new Cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
