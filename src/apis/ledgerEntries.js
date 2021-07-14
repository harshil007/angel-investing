export const getLedgerEntries = (type = "simple") => {
  const data = require(`../data/${type}_ledger.json`);
  return data;
};
