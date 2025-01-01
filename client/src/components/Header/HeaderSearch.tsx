import React, { useState } from "react";
import searchImg from "@assets/search.png";
import arrow from "@assets/left-arrow.png";
import { useAppDispatch } from "@src/hooks/redux";
import { toggle } from "@reducers/toggleSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { ActiveToggle } from "@src/types/main";

const HeaderSearch: React.FC = () => {
  const [text, setText] = useState<string>("");

  const { pathname } = useLocation();
  const currentPage: string = pathname.split("/")[1];

  const navigate = useNavigate();

  const search = () => {
    dispatch(toggle(ActiveToggle.SEARCH));
    switch (currentPage) {
      case "video":
        return navigate("video");

      case "chats":
        navigate(`chats/contacts/${text}`);

      default:
        break;
    }
  };

  const dispatch = useAppDispatch();

  return (
    <>
      <img
        src={arrow}
        alt="arrow"
        onClick={() => dispatch(toggle(ActiveToggle.SEARCH))}
      />
      <div className="header_search">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <img src={searchImg} alt="search" onClick={search} />
      </div>
    </>
  );
};

export default HeaderSearch;
