import React from "react";
import { formatAmount } from "./helpers/displayHelpers";
import Ledger from "./types/Ledger";

interface LedgerSummaryProps {
  ledgerEntries: Ledger[]; // Sorted ledger entries such that the latest is the first entry in the array
}

const LedgerSummary = React.memo(function LedgerSummary(
  props: LedgerSummaryProps
): JSX.Element {
  const { ledgerEntries } = props;
  return (
    <div className="ledger-summary-card">
      <div>
        <div className="label-text">Current Balance</div>
        <div className="heading1">
          {formatAmount(ledgerEntries[0]?.balance)}
        </div>
      </div>
    </div>
  );
});

export default LedgerSummary;
