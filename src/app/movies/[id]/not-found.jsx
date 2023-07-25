"use client";
import React from "react";

function notFound() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>We couldn&apos;t find the movie you looking for!</h1>
      <div
        onClick={() => window.history.back()}
        style={{
          cursor: "pointer",
          textDecoration: "underline",
          fontSize: 20,
          marginTop: 8,
        }}
      >
        Go Previous Page
      </div>
    </div>
  );
}

export default notFound;
