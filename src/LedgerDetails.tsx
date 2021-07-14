import React, { useContext } from "react";
import Ledger from "./types/Ledger";
import dayjs from "dayjs";

import {
  formatAmount,
  renderAmount,
  renderDescription,
} from "./helpers/displayHelpers";
import { UserContext } from "./App";

interface LedgerDetailsProps {
  ledgerEntries: Ledger[]; // Sorted ledger entries such that the latest is the first entry in the array
}

const LedgerDetailItem = React.memo(function LedgerDetailItem(props: {
  ledgerItem: Ledger;
}): JSX.Element {
  const { ledgerItem } = props;
  const userContext = useContext(UserContext);
  return (
    <tr>
      <td className="secondary-text">
        {dayjs(ledgerItem.date).format("DD MMM YYYY HH:mm")}
      </td>
      <td>
        <div>{renderDescription(ledgerItem, userContext.id)}</div>
        {ledgerItem.method ? (
          <div className="secondary-text" style={{ fontSize: "12px" }}>
            <i>via</i> {ledgerItem.method}
          </div>
        ) : null}
      </td>
      <td style={{ textAlign: "right" }}>{renderAmount(ledgerItem.amount)}</td>
      <td style={{ textAlign: "right" }}>{formatAmount(ledgerItem.balance)}</td>
    </tr>
  );
});

const LedgerDetails = React.memo(function LedgerDetails(
  props: LedgerDetailsProps
): JSX.Element {
  const { ledgerEntries } = props;
  return (
    <div className="content-card">
      <div className="heading2">Transactions history</div>
      <div>
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th style={{ textAlign: "right" }}>Amount</th>
              <th style={{ textAlign: "right" }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {ledgerEntries.map((ledgerEntry) => (
              <LedgerDetailItem
                key={ledgerEntry.activity_id}
                ledgerItem={ledgerEntry}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default LedgerDetails;
