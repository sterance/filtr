import { useState, useCallback, useEffect, useMemo, type ReactNode } from "react";
import { DimensionContext } from "./DimensionContext.tsx";
import { readStoredDimensionState, writeStoredDimensionState } from "../utils/dimensionStorage.ts";

const DEFAULT_STATE = { length: 8, width: 8, depth: null };

export function DimensionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ length: number; width: number; depth: number | null }>(() => {
    return readStoredDimensionState() ?? DEFAULT_STATE;
  });

  const setLength = useCallback((value: number) => {
    setState((prev) => {
      const next = { ...prev, length: value };
      writeStoredDimensionState(next);
      return next;
    });
  }, []);

  const setWidth = useCallback((value: number) => {
    setState((prev) => {
      const next = { ...prev, width: value };
      writeStoredDimensionState(next);
      return next;
    });
  }, []);

  const setDepth = useCallback((value: number | null) => {
    setState((prev) => {
      const next = { ...prev, depth: value };
      writeStoredDimensionState(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({
    length: state.length,
    width: state.width,
    depth: state.depth,
    setLength,
    setWidth,
    setDepth,
  }), [state.length, state.width, state.depth, setLength, setWidth, setDepth]);

  useEffect(() => {
    writeStoredDimensionState(state);
  }, [state]);

  return <DimensionContext value={value}>{children}</DimensionContext>;
}