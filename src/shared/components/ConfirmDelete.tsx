import { IConfirmDeleteProps } from "../interfaces/IConfirmDelete";
import * as S from "../styles/SConfirmDelete";
import Button from "./Button";
import Heading from "./Heading";

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: IConfirmDeleteProps) {
  return (
    <S.StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={() => onCloseModal && onCloseModal()}
        >
          Cancel
        </Button>
        <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </S.StyledConfirmDelete>
  );
}

export default ConfirmDelete;
