import * as S from "./CabinRow.styles";
import { ICabinRowProps } from "./CabinRow.interface";
import { formatCurrency } from "../../../../shared/utils/helpers";
import { useCabins } from "../../hooks/useCabins";
import { useState } from "react";
import CreateCabinForm from "../createCabin/CreateCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

function CabinRow({ cabin }: ICabinRowProps) {
  const [showForm, setShowForm] = useState(false);
  const { useDeleteCabins, useCreateCabins } = useCabins();
  const { isPending: isCreating, mutate: createCabin } = useCreateCabins();
  const { mutate, isPending: isDeleting } = useDeleteCabins();

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
    console.log(image);
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
    <>
      <S.TableRow role="row">
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
          <button
            onClick={() => setShowForm((show) => !show)}
            disabled={isDeleting || isCreating}
          >
            <HiPencil />
          </button>
          <button
            onClick={() => mutate(cabinId)}
            disabled={isDeleting || isCreating}
          >
            <HiTrash />
          </button>
        </div>
      </S.TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
