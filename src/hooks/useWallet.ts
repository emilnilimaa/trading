import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "../util/createSelectors";

type StockAmount = {
  name: string;
  amount: number;
};

interface WalletState {
  balance: number;
  stocks: StockAmount[]; // ownership of stocks
  setBalance(balance: number): void;
  addStocks(name: string, amount: number): void;
  removeStocks(name: string, amount: number): void;
}

const useWalletStoreBase = create<WalletState>()(
  persist(
    (set) => ({
      balance: 100000,
      stocks: [] as StockAmount[],
      setBalance: (balance: number) =>
        set((state) => ({ balance: Math.max(balance, 0) })),
      addStocks: (name: string, amount: number) => {
        set((state) => ({ stocks: addToStocks(name, amount, state.stocks) }));
      },
      removeStocks: (name: string, amount: number) => {
        set((state) => ({
          stocks: removeFromStocks(name, amount, state.stocks),
        }));
      },
    }),
    {
      name: "wallet-storage", // name of item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);

export const useWalletStore = createSelectors(useWalletStoreBase);

const addToStocks = (
  name: string,
  amount: number,
  stocks: StockAmount[]
): StockAmount[] => {
  if (stocks.find((stock) => stock.name === name)) {
    return stocks.map((stock) => {
      if (stock.name === name) {
        return { ...stock, amount: stock.amount + amount };
      }
      return stock;
    });
  } else {
    return [...stocks, { name, amount }];
  }
};

const removeFromStocks = (
  name: string,
  amount: number,
  stocks: StockAmount[]
): StockAmount[] => {
  return stocks.map((stock) => {
    if (stock.name === name) {
      return { ...stock, amount: Math.max(stock.amount - amount, 0) };
    }
    return stock;
  });
};
