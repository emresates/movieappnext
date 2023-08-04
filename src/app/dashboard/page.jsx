"use client";
import React, { useEffect, useState } from "react";
import { Loading } from "@/components/loading";
import {
  fetchEditUserData,
  fetchSingleUserData,
} from "@/services/user.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//* Style
import styles from "./styles.module.scss";

function Dashboard() {
  const session = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [prevState, setPrevState] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (session.status !== "authenticated") {
      router.push("/login");
    }
    if (session.status === "authenticated") {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    const { user } = await fetchSingleUserData(session.data.user.id);
    setUserData(user);
    setPrevState(user);
    setLoading(false);
  };

  //* Input Change
  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  //* Save User
  const saveUser = async () => {
    setEditMode(!editMode);
    if (JSON.stringify(userData) === JSON.stringify(prevState)) {
      console.log("No change found");
      return;
    } else {
      console.log("User info saved");
      setPrevState(userData);
      await fetchEditUserData(userData);
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <h1>Giriş yaptın aferin</h1>
          <div className={styles.account}>
            <div className={styles.info}>
              {editMode ? (
                <>
                  <label htmlFor="username">Username:</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Your Username"
                    value={userData.username}
                    disabled
                  />
                </>
              ) : (
                <p id="username">Username: {userData.username}</p>
              )}
            </div>
            <div className={styles.info}>
              {editMode ? (
                <>
                  <label htmlFor="name">Name:</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <p id="name">Name: {userData.name}</p>
              )}
            </div>
            <div className={styles.info}>
              {editMode ? (
                <>
                  <label htmlFor="surname">Surname:</label>
                  <input
                    id="surname"
                    type="text"
                    placeholder="Your Surname"
                    value={userData.surname}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <p id="surname">Surname: {userData.surname}</p>
              )}
            </div>
            <div className={styles.info}>
              {editMode ? (
                <>
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Your Email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <p id="email">Email: {userData.email}</p>
              )}
            </div>
            <div className={styles.info}>
              {editMode ? (
                <>
                  <label htmlFor="password">Current Password:</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Your Current Password"
                  />
                </>
              ) : (
                <p id="password">
                  Password: Don't worry. We don't know either. Only you know ^-^
                </p>
              )}
            </div>
            <div className={styles.info}>
              {editMode && (
                <>
                  <label htmlFor="passwordNew">New Password:</label>
                  <input
                    id="passwordNew"
                    type="password"
                    placeholder="Your New Password"
                  />
                </>
              )}
            </div>
            <div className={styles.info}>
              {editMode && (
                <>
                  <label htmlFor="passwordNewRetype">
                    Retype New Password:
                  </label>
                  <input
                    id="passwordNewRetype"
                    type="password"
                    placeholder="Retype New Password"
                  />
                </>
              )}
            </div>

            {!editMode ? (
              <button onClick={() => setEditMode(!editMode)}>Edit</button>
            ) : (
              <button onClick={saveUser}>Save</button>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Dashboard;
