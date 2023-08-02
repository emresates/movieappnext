"use client"
import { useSession } from "next-auth/react";
import React from "react";

function Dashboard() {
  const session = useSession();
  console.log(session);
  return <div>Giriş yaptın aferin</div>;
}

export default Dashboard;
