import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationHeader from "./ApplicationHeader";
import Dashboard from "./Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import "./styles/layout.css";

const userDefaultContext = {
  id: 76510190788,
  name: "Michael Daugherty",
  ledgerType: "complicated",
};

export const UserContext = React.createContext(userDefaultContext);

function App() {
  const [ledgerType, setLedgerType] = useState("complicated");
  return (
    <ErrorBoundary>
      <Router>
        <div className="layout">
          <ApplicationHeader />
          <div className="layout-content">
            <UserContext.Provider value={{ ...userDefaultContext, ledgerType }}>
              <Dashboard />
            </UserContext.Provider>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
