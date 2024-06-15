import * as S from "../../styles/SCabinRow";
import { formatCurrency } from "../../../../shared/utils/helpers";
import { useCabins } from "../../hooks/useCabins";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { ICabinRowProps } from "../../interfaces/ICabinRow";
import CreateCabinForm from "../CreateCabinForm";
import { Modal } from "../../../../shared/components";
import ConfirmDelete from "../../../../shared/components/ConfirmDelete";
import Table from "../../../../shared/components/Table";

function CabinRow({ cabin }: ICabinRowProps) {
  const { useDeleteCabins, useCreateCabins } = useCabins();
  const { isPending: isCreating, mutate: createCabin } = useCreateCabins();
  const { mutate: DeleteCabin, isPending: isDeleting } = useDeleteCabins();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row role="row">
      <S.Img src={image} alt={"cabin"} />
      <S.Cabin>{name}</S.Cabin>
      <div>Fits up at {maxCapacity} guests</div>
      <S.Price>{formatCurrency(regularPrice)}</S.Price>
      {discount ? (
        <S.Discount>{formatCurrency(discount)}</S.Discount>
      ) : (
        <span>&mdash</span>
      )}
      <div>
        <button onClick={handleDuplicate} disabled={isDeleting || isCreating}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="deleteCabin">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="deleteCabin">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => DeleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
