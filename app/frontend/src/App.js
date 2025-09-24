import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MarketingPanel from "./pages/MarketingPanel";
import OperationsPanel from "./pages/OperationsPanel";
import HRPanel from "./pages/HRPanel";
import FinancePanel from "./pages/FinancePanel";

function App() {
  return (
    <div className="App min-h-screen bg-gray-50 flex flex-col">
      <BrowserRouter>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketing" element={<MarketingPanel />} />
            <Route path="/operations" element={<OperationsPanel />} />
            <Route path="/hr" element={<HRPanel />} />
            <Route path="/finance" element={<FinancePanel />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;