import { useAppDispatch } from "@src/hooks/redux";
import { registration } from "@src/store/reducers/ActionCreators/UserAC";
import React, { useState } from "react";

const RegistrationForm: React.FC = () => {
  const [loginText, setLoginText] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registration({ loginText, password }));
  };

  return (
    <form className="login_form" onSubmit={handleButton}>
      <input
        type="text"
        className="login_input"
        placeholder="login"
        value={loginText}
        onChange={(e) => setLoginText(e.target.value)}
      />
      <input
        type="password"
        className="login_input"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login_button" style={{ marginBottom: "15px" }}>
        Продолжить
      </button>
    </form>
  );
};

export default RegistrationForm;
