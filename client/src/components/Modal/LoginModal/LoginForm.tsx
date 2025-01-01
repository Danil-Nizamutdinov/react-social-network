import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { login, registration } from "@src/store/reducers/ActionCreators/UserAC";
import { toggleFalse, toggleReg } from "@src/store/reducers/toggleSlice";
import { setError } from "@src/store/reducers/userSlice";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [loginText, setLoginText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const dispatch = useAppDispatch();

  const error = useAppSelector((state) => state.userSlice.error);
  const isReg = useAppSelector((state) => state.toggleSlice.isReg);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ loginText, password }));
  };

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === password2) {
      dispatch(registration({ loginText, password }));
    } else {
      dispatch(setError("не совпадают"));
    }
  };

  return (
    <>
      <div className="login_title">{isReg ? "Регистрация" : "Вход"}</div>
      <form
        className="login_form"
        onSubmit={isReg ? handleRegistration : handleLogin}
      >
        {typeof error === "string" && (
          <label className="error_label">{error}</label>
        )}
        <input
          type="text"
          className="login_input login_form_item"
          placeholder="login"
          value={loginText}
          onChange={(e) => setLoginText(e.target.value)}
        />
        <input
          type="password"
          className="login_input login_form_item"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isReg ? (
          <input
            type="password"
            className="login_input login_form_item"
            placeholder="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        ) : (
          ""
        )}
        <button className="login_button login_form_item">Продолжить</button>
      </form>
      <div className="reg" onClick={() => dispatch(toggleReg(!isReg))}>
        {isReg ? "Войти" : "Зарегистрироваться"}
      </div>
    </>
  );
};

export default LoginForm;
