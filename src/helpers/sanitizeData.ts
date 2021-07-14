import Ledger from "../types/Ledger";
import dayjs from "dayjs";

export const santizeLedgerEntries = (
  ledgerEntries: Ledger[],
  currentUserId: number
): Ledger[] => {
  let sanitizedLedgerEntries = removeDuplicates(ledgerEntries);
  // Filter entries which might not belong to this user
  sanitizedLedgerEntries = sanitizedLedgerEntries.filter(
    (entry) =>
      entry.source.id !== currentUserId ||
      entry.destination.id !== currentUserId
  );
  sanitizedLedgerEntries = sortEntries(sanitizedLedgerEntries);
  return sanitizedLedgerEntries;
};

// Remove duplicates from array. Keep the latest entry in case of duplicate.
const removeDuplicates = (ledgerEntries: Ledger[]): Ledger[] => {
  const groupedEntries = ledgerEntries.reduce(
    (acc: { [key: string]: Ledger }, ledgerEntry) => {
      // check if the instered entry is outdated, if it is then keep the latest one
      if (
        !acc[ledgerEntry.activity_id] ||
        dayjs(acc[ledgerEntry.activity_id].date).isBefore(
          dayjs(ledgerEntry.date)
        )
      )
        acc[ledgerEntry.activity_id] = ledgerEntry;

      return acc;
    },
    {}
  );
  return Object.values(groupedEntries);
};

const sortEntries = (ledgerEntries: Ledger[]): Ledger[] => {
  let sortedLedgerEntries = ledgerEntries.sort((a, b) =>
    dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
  );
  // Now try to find entries with same timestamp and fix the sorting by checking the balance

  const sameEntriesIndices: { [key: string]: number[] } = {};
  const sameEntries = sortedLedgerEntries.reduce(
    (acc: { [key: string]: string[] }, ledgerEntry, index) => {
      const timestamp = ledgerEntry.date;
      if (!acc[timestamp]) {
        acc[timestamp] = [];
        sameEntriesIndices[timestamp] = [];
      }
      acc[timestamp].push(ledgerEntry.activity_id);
      sameEntriesIndices[timestamp].push(index);
      return acc;
    },
    {}
  );

  const newSortedEntries = sortedLedgerEntries.slice();

  Object.keys(sameEntries).forEach((timestamp) => {
    if (sameEntries[timestamp].length > 1) {
      let potentialFixures = newSortedEntries.filter((entry) =>
        sameEntries[timestamp].includes(entry.activity_id)
      );
      sameEntriesIndices[timestamp].sort((a, b) => (a > b ? -1 : 1));
      sameEntriesIndices[timestamp].forEach((index) => {
        const previousEntry = newSortedEntries[index + 1]; // previous entry would be the next in array as it is sorted on timestamp
        const correctEntry = potentialFixures.find(
          (entry) => entry.balance === previousEntry.balance + entry.amount
        );
        if (correctEntry) {
          const foundIndex = newSortedEntries.findIndex(
            (entry) => entry.activity_id === correctEntry.activity_id
          );
          if (foundIndex !== -1) {
            newSortedEntries[foundIndex] = newSortedEntries[index];
            newSortedEntries[index] = correctEntry;
            potentialFixures = potentialFixures.filter(
              (entry) => entry.activity_id === correctEntry.activity_id
            );
          }
        }
      });
    }
  });
  return newSortedEntries;
};
