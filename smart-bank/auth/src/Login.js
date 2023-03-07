import React, { useState } from "react";
import { checkUser } from "./api";

const Login = ({ customNavigate, setUserDetails }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (value) => {
    setUsername(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.length || !password.length) {
      alert("Please enter both values");
      setUsername("");
      setPassword("");
      return;
    }
    let res = await checkUser(username, password);
    if (res.length) {
      res = res[0];
      setCookie("username", res.name, 60);
      localStorage && localStorage.setItem("currentAccNum", res.accountNumber);
      localStorage && localStorage.setItem("currentName", res.name);
      if (typeof setUserDetails == "function") setUserDetails(res);
      customNavigate("/");
    } else {
      alert("User account does not exist. Please reach out to support");
    }
    setUsername("");
    setPassword("");
  };
  function setCookie(cName, cValue, expMins) {
    let date = new Date();
    date.setTime(date.getTime() + expMins * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  }

  return (
    <div className="card" id="card">
      <div className="front">
        <p className="login_word">LOGIN</p>
        {/* <img
          src="https://drive.google.com/uc?export=view&id=1K5_tAX_taOQQ0wwmFx3P--V05kjvg4cu"
          alt="person picture"
        /> */}
        <form method="post" action="">
          <input
            type="text"
            name="username"
            placeholder="username"
            className="f1"
            maxLength="10"
            required
            autoComplete="off"
            value={username}
            onChange={(e) => handleUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="f1"
            maxLength="10"
            required
            autoComplete="off"
            value={password}
            onChange={(e) => handlePassword(e.target.value)}
          />
          <button
            className="f1"
            name="login"
            value="clicked"
            onClick={(e) => handleLogin(e)}
            id="login_button"
          >
            Login
          </button>
          <p>
            Not registered?
            <br />
            <span>
              Reach out to us through Contact section or visit your nearest
              branch
            </span>
          </p>
        </form>
      </div>
      {/* SIGNUP */}
      {/* <div className="back">
        <p className="signup_word">SIGN UP</p>
        <form method="post" action="" id="signUp">
          <input
            type="text"
            name="first_name"
            placeholder="first name"
            className="f1"
            maxLength="10"
            required
            style={{ marginTop: "35px" }}
            autoComplete="off"
          />
          <input
            type="text"
            name="last_name"
            placeholder="last name"
            className="f1"
            maxLength="10"
            required
            autoComplete="off"
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            className="f1"
            maxLength="10"
            required
            autoComplete="off"
          />
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            className="f1"
            maxLength="30"
            required
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="f1"
            maxLength="10"
            required
            autoComplete="off"
          />
          <button className="f1" name="signup" value="clicked">
            Sign up
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default Login;
