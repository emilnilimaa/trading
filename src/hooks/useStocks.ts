import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Stock, getStocks } from "../api/stocks";
import { createSelectors } from "../util/createSelectors";

type StockHistory = {
  date: Date;
  stocks: Stock[];
};

interface StocksState {
  stocks: Stock[] | []; // Current stock values
  stockHistory: StockHistory[]; // History of stock values
  setStocks(stocks: Stock[]): void;
  setStockHistory(stockHistory: StockHistory[]): void;
  addStockHistory(stockHistory: StockHistory): void;
}

const useStockStoreBase = create<StocksState>()(
  persist(
    (set) => ({
      stocks: [],
      stockHistory: [],
      setStocks: (stocks: Stock[]) => set((state) => ({ stocks })),
      setStockHistory: (stockHistory: StockHistory[]) =>
        set((state) => ({ stockHistory })),
      addStockHistory: (stockHistory: StockHistory) => {
        // Limit to 100 items in history
        set((state) => ({
          stockHistory: limitStockHistory([
            ...state.stockHistory,
            stockHistory,
          ]),
        }));
      },
    }),
    {
      name: "stocks-storage", // name of item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);

const limitStockHistory = (stockHistory: StockHistory[]): StockHistory[] => {
  return stockHistory.length > 100 ? stockHistory.slice(1) : stockHistory;
};

export const useStockStore = createSelectors(useStockStoreBase);

export const useStocks = () => {
  const setStocks = useStockStore.use.setStocks();
  const stocks = useStockStore.use.stocks();
  const stockHistory = useStockStore.use.stockHistory();
  const addStockHistory = useStockStore.use.addStockHistory();

  const fetchStocks = async () => {
    const fetched = await getStocks();
    setStocks(fetched);

    // We also need to add this into the stock history
    addStockHistory({
      date: new Date(),
      stocks: fetched,
    });
  };

  return {
    stocks,
    stockHistory,
    fetchStocks,
  };
};
