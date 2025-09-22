import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { Toaster } from "./components/ui/toaster";
import { IntegrationProvider } from "./contexts/IntegrationContext";

function App() {
  return (
    <div className="App">
      <IntegrationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </IntegrationProvider>
    </div>
  );
}

export default App;