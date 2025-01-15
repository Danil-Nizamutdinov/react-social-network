import React from "react";
import cross from "@src/assets/cross.png";
import { useAppDispatch } from "@src/hooks/redux";
import { toggle } from "@src/store/reducers/toggleSlice";
import LoginForm from "./LoginForm";
import { ActiveToggle } from "@src/types/main";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="login" onClick={(e) => e.stopPropagation()}>
      <img
        src={cross}
        alt="close"
        className="login_cross cursor_pointer"
        onClick={() => dispatch(toggle(ActiveToggle.LOGIN))}
      />
      <div className="login_content">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
