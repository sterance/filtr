import { useMemo, useContext } from "react";
import { Stack, Typography } from "@mui/material";
import "./Output.css";

import { DimensionContext } from "./DimensionContext.tsx";
import { roundTo } from "../utils/number.ts";

export function Output() {
  const { length, width, depth } = useContext(DimensionContext) ?? {
    length: 8,
    width: 8,
    depth: null,
  };

  const volumeLitres = useMemo(() => {
    if (depth === null) return null;
    const cubicMetres = length * width * depth;
    return roundTo(cubicMetres * 1000);
  }, [length, width, depth]);

  const cableLength = useMemo(() => {
    const longSide = Math.max(length, width);
    const shortSide = Math.min(length, width);
    return roundTo(Math.sqrt((longSide / 2) ** 2 + shortSide ** 2));
  }, [length, width]);

  return (
    <Stack className="output-container" spacing={3}>
      <Typography className="output-heading" variant="h4" align="center">
        Output
      </Typography>
      <Stack className="output-row" spacing={1}>
        <Typography className="output-label">Volume</Typography>
        <Typography className="output-value">{volumeLitres === null ? "—" : `${volumeLitres.toFixed(0)} L`}</Typography>
      </Stack>
      <Stack className="output-row" spacing={1}>
        <Typography className="output-label">Minimum cable length</Typography>
        <Typography className="output-value">{cableLength.toFixed(2)} m</Typography>
      </Stack>
    </Stack>
  );
}
