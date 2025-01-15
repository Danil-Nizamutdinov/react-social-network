import React from "react";
import HeaderContent from "./HeaderContent";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import { useAppSelector } from "@src/hooks/redux";
import { useLocation, useParams } from "react-router-dom";
import HeaderMessage from "./HeaderMessage";
import useWindowWidth, { mobile } from "@src/hooks/useWindowWidth";

const Header: React.FC = () => {
  const activeToggle = useAppSelector(
    (state) => state.toggleSlice.activeToggle
  );

  const { pathname } = useLocation();
  const { id } = useParams();

  const isMessagePage = pathname === `/chats/${id}`;
  const isDesctop = mobile < useWindowWidth();
  return (
    <div className="header_wrapper">
      <header className="header">
        {isMessagePage ? (
          isDesctop ? (
            <HeaderContent />
          ) : (
            <HeaderMessage />
          )
        ) : activeToggle === "search" ? (
          <HeaderSearch />
        ) : (
          <HeaderContent />
        )}
      </header>
    </div>
  );
};

export default Header;
