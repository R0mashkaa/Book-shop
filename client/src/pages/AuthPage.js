import React, { useContext, useState, useEffect } from "react";
import "materialize-css";
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/AuthContext'
import { toast } from "react-toastify";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState([]);
  const [login, setLogin]=useState({emailOrLogin:"", password:""})
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);


// console.log(error)

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputHandler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("http://localhost:3001/api/users/", "POST", { ...form });
      console.log(data)
      // toast.error(data?.message)
      setForm(false)
      setOpenSignUp(false)
    } catch (error) {
      
      toast.error(error?.message)
    }
  };

  // console.log(message)

  const loginHandler = async () => {
    try {
      const data = await request("http://localhost:3001/api/auth/", "POST", { ...login });
      console.log(data.message);
      auth.login(data.token, data.user)
      setLogin(false)
      setOpenLogin(false)
    } catch (error) {
      // console.error(error)
      toast.error(error?.message)
    }
  };

  return (
    <div className="row">
         <h1>Do you have an account ?</h1>
      <button className="btn orange darken-1" onClick={()=>setOpenLogin(!openLogin)}>LOGIN</button>
      <div>{openLogin ?  
      <div className="col s6 offset-s3">
        <div className="card  blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Вхід</span>
            <div>
              <div className="input-field ">
                <input
                  placeholder="Введіть email Or Login"
                  type="text"
                  name="emailOrLogin"
                  value={login.emailOrLogin}
                  onChange={inputHandler}
                  className="white-input"
                />
                <label className="label-form" htmlFor="first_name">
                Email or Login
                </label>
              </div>
              <div className="input-field ">
                <input
                  placeholder="Введіть пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={inputHandler}
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
      <button className="btn yellow darken-1 " onClick={()=>setOpenSignUp(!openSignUp)}>SIGN UP</button>
      <div>{openSignUp ? 
      <div className="col s6 offset-s3">
        <div className="card  blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field ">
              <input
                  placeholder="Введіть вік"
                  type="text"
                  name="age"
                  value={form.age}
                  onChange={changeHandler}
                  className="white-input"
                  autocomplete="off"
                />
                <label className="label-form" >
                Age
                </label>
                </div>
                <div className="input-field ">
              <input
                  placeholder="Введіть ім'я"
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={changeHandler}
                  className="white-input"
                  autocomplete="off"
                />
                <label className="label-form" htmlFor="first_name">
                Full name
                </label>
                </div>
                <div className="input-field ">
              <input
                  placeholder="Введіть логін"
                  type="text"
                  name="loginName"
                  value={form.loginName}
                  onChange={changeHandler}
                  className="white-input"
                  autocomplete="off"
                />
                <label className="label-form" htmlFor="first_name">
                Login
                </label>
                </div>
                <div className="input-field ">
                <input
                  placeholder="Введіть email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  className="white-input"
                  // autocomplete="off"
                  // list="autocompleteOff" 
                />
                <label className="label-form" htmlFor="email">
                  Email
                </label>
                </div>
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
                  autoComplete='new-password'
                  list="autocompleteOff" 
                />
                <label className="label-form" htmlFor="password">
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
      :null}</div>
    </div>
  );
};
