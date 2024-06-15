export interface IConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
  disabled: boolean;
}
