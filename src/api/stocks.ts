export type Stock = {
  name: string;
  price: number;
};
export const getStocks = async (): Promise<Stock[]> => {
  return [
    { name: "AAPL", price: generateStockPrice("AAPL") },
    { name: "GOOGL", price: generateStockPrice("GOOGL") },
    { name: "MSFT", price: generateStockPrice("MSFT") },
  ];
};

const generateStockPrice = (name: string): number => {
  const hash = name.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  const amplitude = 100;
  const d = new Date();
  const n = d.getTime();
  return Math.abs(3 * Math.sin(2 * hash * n) + Math.random() * amplitude);
};
