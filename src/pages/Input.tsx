import { useState, useContext } from "react";
import { Stack, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { DimensionContext } from "./DimensionContext.tsx";
import { ImageContainer } from "../components/ImageContainer.tsx";
import NumberField from "../components/NumberField.tsx";
import complexImage from "../media/complex.svg?raw";
import rectangularImage from "../media/rectangular.svg?raw";
import roundImage from "../media/round.svg?raw";
import "./Input.css";

const images = [
  { name: "Complex", image: complexImage },
  { name: "Rectangular", image: rectangularImage },
  { name: "Round", image: roundImage },
];

export function Input() {
  const dimensionContext = useContext(DimensionContext);
  const length = dimensionContext?.length ?? 8;
  const width = dimensionContext?.width ?? 8;
  const setLength = dimensionContext?.setLength ?? (() => {});
  const setWidth = dimensionContext?.setWidth ?? (() => {});
  const setDepth = dimensionContext?.setDepth ?? (() => {});
  const [selectedImage, setSelectedImage] = useState(complexImage);
  const [surface, setSurface] = useState<string | null>(null);
  const [depthUnit, setDepthUnit] = useState<"cm" | "m">("m");
  const [depthInput, setDepthInput] = useState<string | null>(() => {
    if (dimensionContext?.depth === null || dimensionContext?.depth === undefined) return null;
    return String(depthUnit === "m" ? dimensionContext.depth : dimensionContext.depth * 100);
  });

  const handleDepthChange = (value: string) => {
    const nextValue = value === "" ? null : value;
    setDepthInput(nextValue);
    if (nextValue === null) {
      setDepth(null);
      return;
    }

    const numericValue = Number(nextValue);
    if (!Number.isNaN(numericValue)) {
      setDepth(depthUnit === "cm" ? numericValue / 100 : numericValue);
    }
  };

  const handleDepthUnitChange = (_: React.MouseEvent<HTMLElement>, unit: "cm" | "m" | null) => {
    if (!unit || unit === depthUnit) {
      return;
    }

    setDepthUnit(unit);
    if (depthInput === null) {
      return;
    }

    const numericValue = Number(depthInput);
    if (!Number.isNaN(numericValue)) {
      setDepthInput(unit === "cm" ? String(numericValue * 100) : String(numericValue / 100));
    }
  };

  return (
    <Stack className="input-container" spacing={3}>
      <Stack direction="row" spacing={1}>
        <div className="selected-image" aria-live="polite">
          <div className="theme-image" aria-label="Selected shape" dangerouslySetInnerHTML={{ __html: selectedImage }} />
        </div>
        <Stack spacing={1} className="input-width-control">
          <Slider orientation="vertical" size="small" min={1} max={16} value={width} onChange={(_, newValue) => setWidth(typeof newValue === "number" ? newValue : newValue[0])} aria-label="Small" valueLabelDisplay="auto" className="input-slider input-slider--vertical" />
          <NumberField min={1} max={16} value={width} onChange={setWidth} />
          <Typography className="dimension-label">Width (m)</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Typography className="dimension-label">Length (m)</Typography>
        <NumberField min={1} max={16} value={length} onChange={setLength} />
        <Slider size="small" min={1} max={16} value={length} onChange={(_, newValue) => setLength(typeof newValue === "number" ? newValue : newValue[0])} aria-label="Small" valueLabelDisplay="auto" className="input-slider input-slider--horizontal" />
      </Stack>
      <Typography className="input-heading" variant="h5" align="center">
        Shape
      </Typography>
      <Stack className="input-options" direction="row" spacing={1}>
        {images.map(({ name, image }) => (
          <Stack key={image} className="input-option" spacing={1} sx={{ alignItems: "center" }}>
            <ImageContainer imagePath={image} selected={selectedImage === image} onClick={() => setSelectedImage(image)} />
            <Typography variant="body2" align="center">
              {name}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Typography className="input-heading" variant="h5" align="center">
        Depth and Surface Type
      </Typography>
      <Stack direction="row" spacing={1} className="input-details-row">
        <TextField
          label="Depth"
          variant="outlined"
          value={depthInput ?? ""}
          onChange={(e) => handleDepthChange(e.target.value)}
          className="depth-input-field"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <ToggleButtonGroup value={depthUnit} exclusive onChange={handleDepthUnitChange} size="small" aria-label="Depth unit" className="depth-unit-toggle">
                    <ToggleButton value="cm" aria-label="Centimeters">
                      cm
                    </ToggleButton>
                    <ToggleButton value="m" aria-label="Meters">
                      m
                    </ToggleButton>
                  </ToggleButtonGroup>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField select label="Surface" variant="outlined" value={surface} onChange={(e) => setSurface(e.target.value)} className="input-field">
          <MenuItem value="Tile">Tile</MenuItem>
          <MenuItem value="Pebble">Pebble</MenuItem>
          <MenuItem value="Concrete">Concrete</MenuItem>
          <MenuItem value="Vinyl">Vinyl</MenuItem>
          <MenuItem value="Fibreglass">Fibreglass</MenuItem>
        </TextField>
      </Stack>
    </Stack>
  );
}
