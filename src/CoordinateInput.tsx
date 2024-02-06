import { TextField } from "@mui/material";
import { useState } from "react";
import { Coordinates } from "./types";

export function CoordinateInput(props: {
  label: string;
  setCoordinates: (coordinates: Coordinates) => void;
}) {
  const [coordinatesValid, setCoordinatesValid] = useState<boolean>(true);

  function validateCoordinates(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.target.value;
    const coordinates = value.split(",");
    if (coordinates.length !== 2) {
      console.log("Invalid coordinates: ", value);
      setCoordinatesValid(false);
      return;
    }
    const latitude = parseFloat(coordinates[0]);
    const longitude = parseFloat(coordinates[1]);
    if (isNaN(latitude) || isNaN(longitude)) {
      console.log("Invalid coordinates: ", value);
      setCoordinatesValid(false);
      return;
    }
    console.log("Valid coordinates: ", value);
    props.setCoordinates({ latitude, longitude });
    setCoordinatesValid(true);
  }

  return (
    <TextField
      label={props.label}
      variant="outlined"
      onBlur={validateCoordinates}
      error={!coordinatesValid}
      helperText={
        !coordinatesValid &&
        "Invalid coordinates. Please enter in format: lat,long"
      }
      sx={{ minWidth: 350 }}
    ></TextField>
  );
}
