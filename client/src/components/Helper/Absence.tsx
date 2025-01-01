import React from "react";
import s from "@src/assets/asda.svg";

const Absence: React.FC = () => {
  return (
    <div className="absence">
      <div className="absence_box">
        <img src={s} className="absence_img" />
        <div>Тут еще ничего нет</div>
      </div>
    </div>
  );
};

export default Absence;
