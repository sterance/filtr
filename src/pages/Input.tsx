import { useState } from "react";
import { Stack } from "@mui/material";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ImageContainer } from "../components/ImageContainer.tsx";
import NumberField from "../components/NumberField.tsx";
import complexImage from "../media/complex.svg?raw";
import rectangularImage from "../media/rectangular.svg?raw";
import roundImage from "../media/round.svg?raw";

export function Input() {
  const images = [complexImage, rectangularImage, roundImage];
  const [selectedImage, setSelectedImage] = useState(complexImage);
  const [length, setLength] = useState(8);
  const [width, setWidth] = useState(8);
  const [depth, setDepth] = useState(0);
  const [surface, setSurface] = useState("Tile");

  return (
    <Stack className="input-container" spacing={3}>
      <Stack direction="row" spacing={1}>
        <div className="selected-image" aria-live="polite">
          <div className="theme-image" aria-label="Selected shape" dangerouslySetInnerHTML={{ __html: selectedImage }} />
        </div>
        <Stack spacing={1} sx={{ height: "auto", alignSelf: "stretch", alignItems: "center" }}>
          <Slider
            orientation="vertical"
            size="small"
            min={1}
            max={16}
            value={width}
            onChange={(_, newValue) => setWidth(typeof newValue === "number" ? newValue : newValue[0])}
            aria-label="Small"
            valueLabelDisplay="auto"
            sx={{
              marginBottom: "8px !important",
              "& .MuiSlider-thumb": { backgroundColor: "var(--accent)" },
              "& .MuiSlider-track": { backgroundColor: "var(--accent)" },
              "& .MuiSlider-rail": { backgroundColor: "var(--border)" },
            }}
          />
          <NumberField min={1} max={16} value={width} label="Width" onChange={setWidth} />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <NumberField min={1} max={16} value={length} label="Length" onChange={setLength} />
        <Slider
          size="small"
          min={1}
          max={16}
          value={length}
          onChange={(_, newValue) => setLength(typeof newValue === "number" ? newValue : newValue[0])}
          aria-label="Small"
          valueLabelDisplay="auto"
          sx={{
            marginTop: "auto !important",
            marginBottom: "auto !important",
            "& .MuiSlider-thumb": { backgroundColor: "var(--accent)" },
            "& .MuiSlider-track": { backgroundColor: "var(--accent)" },
            "& .MuiSlider-rail": { backgroundColor: "var(--border)" },
          }}
        />
      </Stack>
      <Stack className="input-options" direction="row" spacing={1}>
        {images.map((imagePath) => (
          <ImageContainer key={imagePath} imagePath={imagePath} selected={selectedImage === imagePath} onClick={() => setSelectedImage(imagePath)} />
        ))}
      </Stack>
      <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
        <TextField
          label="Depth (cm)"
          variant="outlined"
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          sx={{
            width: "50%",
            "& .MuiOutlinedInput-root": {
              color: "var(--text)",
              "& fieldset": { borderColor: "var(--border)" },
              "&:hover fieldset": { borderColor: "var(--accent)" },
              "&.Mui-focused fieldset": { borderColor: "var(--accent)" },
              "& .MuiInputBase-input": { color: "var(--text)" },
            },
            "& .MuiInputLabel-root": {
              color: "var(--text)",
              "&.Mui-focused": { color: "var(--text)" },
            },
            ":hover": { color: "var(--text)" },
            ":focus": { color: "var(--text)" },
          }}
        />
        <TextField
          select
          label="Surface"
          variant="outlined"
          value={surface}
          onChange={(e) => setSurface(e.target.value)}
          sx={{
            width: "50%",
            "& .MuiOutlinedInput-root": {
              color: "var(--text)",
              "& fieldset": { borderColor: "var(--border)" },
              "&:hover fieldset": { borderColor: "var(--accent)" },
              "&.Mui-focused fieldset": { borderColor: "var(--accent)" },
              "& .MuiSelect-select": { color: "var(--text)" },
            },
            "& .MuiInputLabel-root": { color: "var(--text)" },
            ":hover": { color: "var(--text)" },
            ":focus": { color: "var(--text)" },
          }}
        >
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
