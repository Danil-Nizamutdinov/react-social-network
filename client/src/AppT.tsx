import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkAuth } from "./store/reducers/ActionCreators/UserAC";
import Loading from "./components/Helper/Loading";
import Modals from "./components/Modal/Modals";
import HeaderMenu from "./components/Modal/MenuModal/HeaderMenu";
import useWindowWidth, { mobile } from "./hooks/useWindowWidth";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.userSlice.isLoading);

  const isDesctop = mobile < useWindowWidth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <Header />
      <Modals />
      <div className={isDesctop ? "appt_content" : ""}>
        {isDesctop && (
          <div className="header_menu_box">
            <HeaderMenu />
          </div>
        )}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
