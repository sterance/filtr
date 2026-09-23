import { createContext } from "react";

export type DimensionState = {
  length: number;
  width: number;
  depth: number | null;
};

export type DimensionContextValue = {
  length: number;
  width: number;
  depth: number | null;
  setLength: (value: number) => void;
  setWidth: (value: number) => void;
  setDepth: (value: number | null) => void;
};

export const DimensionContext = createContext<DimensionContextValue | null>(null);
