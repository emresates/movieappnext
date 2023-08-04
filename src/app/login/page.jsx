"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//* Style
import { useSession } from "next-auth/react";
import LoginForm from "@/components/loginForm";

function Login() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  return <>{status === "unauthenticated" && <LoginForm />}</>;
}

export default Login;
