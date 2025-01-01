import React from "react";
import menu from "@assets/menu.png";
import search from "@assets/search.png";
import ananim from "@assets/user.png";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { toggle } from "@src/store/reducers/toggleSlice";
import { apiUrlStatic } from "@src/api";
import { ActiveToggle } from "@src/types/main";

const HeaderContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.userSlice.isAuth);
  const user = useAppSelector((state) => state.userSlice.user);

  return (
    <>
      <div className="header_content">
        <img
          src={menu}
          alt="menu"
          onClick={() => dispatch(toggle(ActiveToggle.MENU))}
        />
        <span className="header_content_last_item">Logo</span>
      </div>
      <div className="header_content">
        <img
          src={search}
          alt="search"
          onClick={() => dispatch(toggle(ActiveToggle.SEARCH))}
        />
        {isAuth ? (
          <img
            src={apiUrlStatic + user.avatar}
            alt="ava"
            className="ava header_content_last_item"
            onClick={() => dispatch(toggle(ActiveToggle.PROFILE))}
          />
        ) : (
          <img
            src={ananim}
            alt="user"
            className="header_content_last_item"
            onClick={() => dispatch(toggle(ActiveToggle.LOGIN))}
          />
        )}
      </div>
    </>
  );
};

export default HeaderContent;
