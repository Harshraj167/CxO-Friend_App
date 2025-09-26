import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Project from "./pages/project";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/project/:id" element={<Project />} />
    </Routes>
  );
}
