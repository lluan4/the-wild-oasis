import {
  ReactElement,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as S from "../styles/SModal";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import {
  IModalContextProps,
  IModalProps,
  IOpenProps,
  WindowProps,
} from "../interfaces/IModal";
import useClickOutside from "../hooks/useClickOutside";

const ModalContext = createContext<IModalContextProps | null>(null);

const useGetModalContext = () => {
  const object = useContext(ModalContext);
  if (!object) {
    throw new Error("useGetModalContext must be used within a Provider");
  }
  return object;
};

function Modal({ children }: IModalProps): ReactElement {
  const [openName, setOpenName] = useState<string>("");

  const close = useCallback(() => setOpenName(""), []);
  const open = useCallback((name: string) => setOpenName(name), []);

  const obj = useMemo(
    () => ({ openName, close, open }),
    [openName, close, open]
  );

  return <ModalContext.Provider value={obj}>{children}</ModalContext.Provider>;
}

function Open({ children, opens: opensWindowName }: IOpenProps): ReactElement {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Open must be used within a Modal");
  }
  const { open } = context;
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }: WindowProps): ReactElement | null {
  const { openName, close } = useGetModalContext();
  const ref = useClickOutside({ handler: close });
  // useEffect(() => {
  //   function handleClick(event: MouseEvent) {
  //     if (ref.current && !ref.current.contains(event.target as Node)) {
  //       close();
  //     }
  //   }
  //   document.addEventListener("click", handleClick, true);
  //   return () => document.removeEventListener("click", handleClick, true);
  // }, [close]);

  if (openName !== name) return null;

  return createPortal(
    <S.Overlay>
      <S.StyledModal ref={ref}>
        <S.Button onClick={close}>
          <HiXMark />
        </S.Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </S.StyledModal>
    </S.Overlay>,
    document.body
    //document.querySelector("#modal-root") as Element
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

//Exemplo de modal sem usar compound components

/* function Modal({ children, onCloseModal }: IModal) {
  return createPortal(
    <S.Overlay>
      <S.StyledModal>
        <S.Button onClick={onCloseModal}>
          <HiXMark />
        </S.Button>

        <div>{children}</div>
      </S.StyledModal>
    </S.Overlay>,
    document.body
    //document.querySelector("#modal-root") as Element
  );
}*/
