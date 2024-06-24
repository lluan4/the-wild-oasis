import { HiDotsVertical } from 'react-icons/hi';
import {
  IMenusButtonProps,
  IMenusContext,
  IMenusListProps,
  IMenusProps,
  IMenusToggleProps,
} from './Menus.interfaces';
import * as S from './Menus.styles';
import {
  MouseEvent,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import useOutsideClick from '../../hooks/useClickOutside';

const MenusContext = createContext<IMenusContext | null>(null);

function useGetMenusContext() {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error('useGetMenusContext must be used within a MenusProvider');
  }
  return context;
}

function Menus({ children }: IMenusProps) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const close = useCallback(() => setOpenId(''), []);
  const open = setOpenId;

  const obj = useMemo(
    () => ({ open, close, openId, position, setPosition }),
    [open, close, openId, position, setPosition]
  );

  return <MenusContext.Provider value={obj}>{children}</MenusContext.Provider>;
}

function Toogle({ id }: IMenusToggleProps) {
  const { openId, open, close, setPosition } = useGetMenusContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (e.target instanceof HTMLElement || e.target instanceof SVGElement) {
      const button = e.target.closest('button');
      if (button) {
        const rect = button.getBoundingClientRect();
        setPosition({
          x: window.innerWidth - rect.width - rect.x,
          y: 8 + rect.height + rect.y,
        });
        openId === '' || openId !== id.toString()
          ? open(id.toString())
          : close();
      }
    }
  }

  return (
    <S.StyledToggle onClick={handleClick}>
      <HiDotsVertical />
    </S.StyledToggle>
  );
}

function List({ id, children }: IMenusListProps) {
  const { openId, position, close } = useGetMenusContext();
  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id.toString()) return null;
  return createPortal(
    <S.StyledList ref={ref} $position={position}>
      {children}
    </S.StyledList>,
    document.body
  );
}

function Button({ children, onClick, icon, ...props }: IMenusButtonProps) {
  const { close } = useGetMenusContext();
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <S.StyledButton onClick={handleClick} {...props}>
        {icon}
        <span>{children}</span>{' '}
      </S.StyledButton>
    </li>
  );
}

Menus.Menu = Menus;
Menus.Toogle = Toogle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
