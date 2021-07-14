import React from "react";
import Ledger from "../types/Ledger";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatAmount = (amount: number): string => {
  return formatter.format(amount);
};

export const renderAmount = (amount: number): JSX.Element => {
  const formattedAmount = formatAmount(amount);
  return (
    <b className={amount >= 0 ? "positiveAmount" : "negativeAmount"}>
      {formattedAmount}
    </b>
  );
};

const getSrcDestDesc = (
  ledgerEntry: Ledger,
  type: "source" | "destination"
): string => {
  return ledgerEntry[type].description || `Unknown ${type}`;
};

export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const renderType = (type: string) => {
  return <span style={{ fontWeight: 500 }}>{toTitleCase(type)}</span>;
};

export const renderDescription = (
  ledgerEntry: Ledger,
  currentUserId: number
): JSX.Element => {
  switch (ledgerEntry.type) {
    case "DEPOSIT":
    case "REFUND":
      return (
        <span>
          {renderType(ledgerEntry.type)} from{" "}
          <b>{getSrcDestDesc(ledgerEntry, "source")}</b>
        </span>
      );
    case "INVESTMENT":
    case "WITHDRAWAL":
      return (
        <span>
          {renderType(ledgerEntry.type)} to{" "}
          <b>{getSrcDestDesc(ledgerEntry, "destination")}</b>
        </span>
      );
    case "TRANSFER":
      let srcDest: "source" | "destination" = "source";
      if (ledgerEntry.source.id === currentUserId) srcDest = "destination";
      return (
        <span>
          {renderType(ledgerEntry.type)}{" "}
          {srcDest === "destination" ? "to" : "from"}{" "}
          <b>{getSrcDestDesc(ledgerEntry, srcDest)}</b>
        </span>
      );
    default:
      return (
        <span>
          Unknown transaction type from {getSrcDestDesc(ledgerEntry, "source")}{" "}
          to {getSrcDestDesc(ledgerEntry, "destination")}
        </span>
      );
  }
};
