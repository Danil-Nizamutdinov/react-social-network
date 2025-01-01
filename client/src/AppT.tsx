import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkAuth } from "./store/reducers/ActionCreators/UserAC";
import Loading from "./components/Helper/Loading";
import Modals from "./components/Modal/Modals";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.userSlice.isLoading);

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
      <Outlet />
    </div>
  );
};

export default App;
