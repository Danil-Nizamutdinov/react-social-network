import React from "react";
import HeaderContent from "./HeaderContent";
import HeaderSearch from "./HeaderSearch";
import { useAppSelector } from "@src/hooks/redux";
import { useLocation, useParams } from "react-router-dom";
import HeaderMessage from "./HeaderMessage";

const Header: React.FC = () => {
  const activeToggle = useAppSelector(
    (state) => state.toggleSlice.activeToggle
  );

  const { pathname } = useLocation();
  const { id } = useParams();

  const isMessagePage = pathname === `/chats/${id}`;

  return (
    <div className="header_wrapper">
      <header className="header">
        {isMessagePage ? (
          <HeaderMessage />
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
