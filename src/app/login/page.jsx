"use client";

import React, { useState } from "react";

//* Style
import styles from "./styles.module.scss";

function Login() {
  const [pos, setPos] = useState(true);
  
  const signUpSubmit = (e) => {
    e.preventDefault();
  };
  const loginSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.signup} ${!pos ? styles.active : ""}`}>
        <form onSubmit={signUpSubmit}>
          <h1>Sign Up</h1>
          <label>Username</label>
          <input type="text" name="" />

          <label>Email</label>
          <input type="text" name="Email" />

          <label>Password</label>
          <input type="password" name="password" />

          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className={`${styles.login} ${pos ? styles.active : ""}`}>
        <img src="https://images5.alphacoders.com/112/1123510.jpg" alt="" />
        <form onSubmit={loginSubmit}>
          <h1>Login</h1>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="Username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
      {pos ? (
        <p>
          Don't you have an account? Visit{" "}
          <span onClick={() => setPos(false)}>Sign Up</span> page
        </p>
      ) : (
        <p>
          Do you already have an account? Visit{" "}
          <span onClick={() => setPos(true)}>Login</span> page
        </p>
      )}
    </div>
  );
}

export default Login;
