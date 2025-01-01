import { useAppDispatch } from "@src/hooks/redux";
import React, { ReactNode } from "react";

interface Children {
  children: ReactNode;
  isMenu?: boolean;
  isPopup: boolean;
  close: any;
}

const Modal: React.FC<Children> = ({ children, isPopup, close, isMenu }) => {
  const dispatch = useAppDispatch();

  const active = isPopup ? "modal_active" : "";
  const menu = isMenu ? "modal_active_menu" : "";

  return (
    <div
      className={`modal ${active} ${menu}`}
      onClick={() => dispatch(close())}
    >
      {children}
    </div>
  );
};

export default Modal;
