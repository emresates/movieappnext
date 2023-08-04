"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

//* Style
import styles from "./styles.module.scss";
import { signIn } from "next-auth/react";

function LoginForm() {
  const [pos, setPos] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      res.status === 201 && router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();

    signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.signup} ${!pos ? styles.active : ""}`}>
        <form onSubmit={signUpSubmit}>
          <h1>Sign Up</h1>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="text"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className={`${styles.login} ${pos ? styles.active : ""}`}>
        <img src="https://images5.alphacoders.com/112/1123510.jpg" alt="" />
        <form onSubmit={loginSubmit}>
          <h1>Login</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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

export default LoginForm;
