import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import { getLedgerEntries } from "./apis/ledgerEntries";
import { UserContext } from "./App";
import Deposits from "./Deposits";
import { santizeLedgerEntries } from "./helpers/sanitizeData";
import LedgerDetails from "./LedgerDetails";
import LedgerSummary from "./LedgerSummary";
import Transfers from "./Transfers";
import Ledger from "./types/Ledger";

const Dashboard = React.memo(function Dashboard(): JSX.Element {
  const userContext = useContext(UserContext);
  const [ledgerEntries, setLedgerEntries] = useState<Ledger[]>([]);

  useEffect(() => {
    const data = santizeLedgerEntries(
      getLedgerEntries(userContext.ledgerType),
      userContext.id
    );
    setLedgerEntries(data);
    console.log("data", data);
  }, [userContext.ledgerType, userContext.id]);
  return (
    <div>
      <LedgerSummary ledgerEntries={ledgerEntries} />
      <Switch>
        <Route path="/deposit">
          <Deposits />
        </Route>
        <Route path="/transfers">
          <Transfers />
        </Route>
        <Route path="/">
          <LedgerDetails ledgerEntries={ledgerEntries} />
        </Route>
      </Switch>
    </div>
  );
});

export default Dashboard;
