import * as S from "./CabinRow.styles";
import { ICabinRowProps } from "./CabinRow.interface";
import { formatCurrency } from "../../../utils/helpers";
import { useCabins } from "../../../hooks/useCabins";

function CabinRow({ cabin }: ICabinRowProps) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  const { useDeleteCabins } = useCabins();
  const { mutate, isPending: isDeleting } = useDeleteCabins();

  return (
    <S.TableRow role="row">
      <S.Img src={image} alt={"cabin"} />
      <S.Cabin>{name}</S.Cabin>
      <div>Fits up at {maxCapacity} guests</div>
      <S.Price>{formatCurrency(regularPrice)}</S.Price>
      <S.Discount>{formatCurrency(discount)}</S.Discount>
      <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
        delete
      </button>
    </S.TableRow>
  );
}

export default CabinRow;
