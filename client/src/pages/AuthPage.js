import React, { useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  // useEffect(() => {
  //   window.M.updateTextFields();
  // }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("http://localhost:3001/auth/register", "POST", { ...form });
      message(data.message);
      console.log(data);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("http://localhost:3001/auth/login", "POST", { ...form });
      message(data.message);
      auth.login(data.token, data.userId)
      console.log(data);
    } catch (error) {}
  };

  return (
    <div className="row">
         <h1>Do you have an account ?</h1>
      <button onClick={()=>setOpenLogin(!openLogin)}>LOGIN</button>
      <div>{openLogin ?  <div className="col s6 offset-s3">
        {/* <h3>Скороти посиланя</h3> */}
        <div className="card  blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field ">
                <input
                  placeholder="Введіть email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  className="white-input"
                />
                <label className="label-form" htmlFor="first_name">
                  Email
                </label>
              </div>
              <div className="input-field ">
                <input
                  placeholder="Введіть пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  className="white-input"
                />
                <label className="label-form" htmlFor="last_name">
                  Password
                </label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn orange darken-1"
              disabled={loading}
              onClick={() => loginHandler()}
            >
              Вхід
            </button>
          </div>
        </div>
      </div> : null}</div>

      
      <h1>Or you can create it right now</h1>
      <button onClick={()=>setOpenSignUp(!openSignUp)}>SIGN UP</button>
      <div>{openSignUp ? 
      <div className="col s6 offset-s3">
        <div className="card  blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field ">
                <input
                  placeholder="Введіть email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  className="white-input"
                />
                <label className="label-form" htmlFor="first_name">
                  Email
                </label>
              </div>
              <div className="input-field ">
                <input
                  placeholder="Введіть пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  className="white-input"
                />
                <label className="label-form" htmlFor="last_name">
                  Password
                </label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-1 "
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={() => registerHandler()}
            >
              Реєстрація
            </button>
          </div>
        </div>
      </div>:null}</div>
    </div>
  );
};
