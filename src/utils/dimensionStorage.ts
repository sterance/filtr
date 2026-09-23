import type { DimensionState } from "../pages/DimensionContext.tsx";

const STORAGE_KEY = "dimension-state";

function readStoredDimensionState(): DimensionState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DimensionState;
    if (typeof parsed.length !== "number") return null;
    if (typeof parsed.width !== "number") return null;
    if (parsed.depth !== null && typeof parsed.depth !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredDimensionState(state: DimensionState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to write dimension state to localStorage:", error);
  }
}

export { readStoredDimensionState, writeStoredDimensionState, STORAGE_KEY };