import * as S from '../styles/SCabinRow';
import { formatCurrency } from '../../../shared/utils/helpers';
import { useCabins } from '../hooks/useCabins';

import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { ICabinRowProps } from '../interfaces/ICabinRow';
import CreateCabinForm from './CreateCabinForm';

import ConfirmDelete from '../../../shared/components/confirmDelete/ConfirmDelete';
import Table from '../../../shared/components/table/Table';
import { Menus, Modal } from '../../../shared/components';

function CabinRow({ cabin }: ICabinRowProps) {
  const { useDeleteCabins, useCreateCabins } = useCabins();
  const { mutate: createCabin } = useCreateCabins();
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
      <S.Img src={image} alt={'cabin'} />
      <S.Cabin>{name}</S.Cabin>
      <div>Fits up at {maxCapacity} guests</div>
      <S.Price>{formatCurrency(regularPrice)}</S.Price>

      <S.Discount>{formatCurrency(discount)}</S.Discount>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toogle id={cabinId} />
            <Menus.List id={cabinId.toString()}>
              <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack />}>
                Duplicate
              </Menus.Button>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="deleteCabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

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
