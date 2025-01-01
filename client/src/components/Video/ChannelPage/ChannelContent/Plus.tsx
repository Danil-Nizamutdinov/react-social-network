import React from "react";
import plus from "@src/assets/plus.png";
import { useAppDispatch } from "@src/hooks/redux";

interface PlusProps {
  toggle: any;
}

const Plus: React.FC<PlusProps> = ({ toggle }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="plus" onClick={() => dispatch(toggle())}>
      <img src={plus} alt="plus" />
    </div>
  );
};

export default Plus;
