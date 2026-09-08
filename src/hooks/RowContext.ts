import { createContext, useContext } from "react";

interface IRowContext {
  gutter: [number, number];
}

export const RowContext = createContext<IRowContext>({ gutter: [0, 0] });
export const useRowContext = () => useContext(RowContext);
