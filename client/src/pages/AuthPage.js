import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const [login, setLogin] = useState({ emailOrLogin: "", password: "" });
  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLogin({ ...login, [name]: value });
    } else {
      setRegister({ ...register, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data = await request(
          "http://localhost:3001/api/auth/login",
          "POST",
          login
        );
        auth.login(data.token, data.user);
      } else {
        const data = await request(
          "http://localhost:3001/api/users/",
          "POST",
          register
        );
        toast.success("Registration successful. Please check your email and confirm your account.");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <h1>{isLogin ? "Login" : "Register"}</h1>
        {isLogin ? (
          <>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="text"
                name="emailOrLogin"
                value={login.emailOrLogin}
                onChange={inputHandler}
                required
              ></input>
              <label>Email or login</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                id="password"
                name="password"
                value={login.password}
                onChange={inputHandler}
                required
              ></input>
              <label>Password</label>
            </div>
          </>
        ) : (
          <>
            <div className="inputbox">
              <ion-icon name="person-outline"></ion-icon>
              <input
                type="text"
                id="registerFullName"
                name="fullName"
                value={register.fullName}
                onChange={inputHandler}
                required
              ></input>
              <label>Name Surname</label>
              </div>
              <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="text"
                id="loginName"
                name="loginName"
                value={register.loginName}
                onChange={inputHandler}
                required
              ></input>
              <label>Login</label>
            </div>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="text"
                id="registerEmail"
                name="email"
                value={register.email}
                onChange={inputHandler}
                required
              ></input>
              <label>Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                id="registerPassword"
                name="password"
                value={register.password}
                onChange={inputHandler}
                required
              ></input>
              <label>Password</label>
            </div>
          </>
        )}
        <button type="submit" disabled={loading}>
          {isLogin ? "Sign In" : "Register"}
        </button>
        <div className="register">
          <p>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button type="button" onClick={switchForm}>
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </section>
  );
};
