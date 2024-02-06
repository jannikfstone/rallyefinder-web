import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CoordinateInput } from "./CoordinateInput";
import { LocationFilter } from "./SearchComponent";
import { Coordinates } from "./types";

export type PartialLocationFilter = {
  start?: {
    coordinates?: Coordinates;
    radiusKm?: number;
  };
  end?: {
    coordinates?: Coordinates;
    radiusKm?: number;
  };
};

export function LocationGrid(props: {
  setLocationFilter: (locationFilter: LocationFilter) => void;
}) {
  const [internalLocationFilter, setInternalLocationFilter] =
    useState<PartialLocationFilter>({});

  function isLocationFilterComplete(
    locationFilter: PartialLocationFilter
  ): locationFilter is LocationFilter {
    return !!(
      locationFilter.start?.coordinates &&
      locationFilter.start?.radiusKm &&
      locationFilter.end?.coordinates &&
      locationFilter.end?.radiusKm
    );
  }

  const updateLocationFilter = (locationUpdate: PartialLocationFilter) => {
    const combinedLocationFilter = {
      start: { ...internalLocationFilter.start, ...locationUpdate.start },
      end: { ...internalLocationFilter.end, ...locationUpdate.end },
    };
    setInternalLocationFilter(combinedLocationFilter);
    if (isLocationFilterComplete(combinedLocationFilter)) {
      props.setLocationFilter(combinedLocationFilter);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 4,
        pb: 3,
        position: "relative",
      }}
    >
      <Container maxWidth="md" sx={{ pt: 6, pb: 4 }}>
        <Typography variant={"h4"} align={"left"}>
          Choose the Start and end location of your journey and a radius.
        </Typography>
      </Container>
      <Container
        maxWidth="md"
        sx={{ py: 2, display: "flex", gap: 4 }}
        key={"startCoordinatesInput"}
      >
        <CoordinateInput
          label="Start location coordinates"
          setCoordinates={(coordinates) =>
            updateLocationFilter({ start: { coordinates } })
          }
        />
        <TextField
          label="Start location radius"
          id="start-location-radius-input"
          InputProps={{
            startAdornment: <InputAdornment position="end">km</InputAdornment>,
          }}
          onBlur={(event) => {
            updateLocationFilter({
              start: { radiusKm: parseFloat(event.target.value) },
            });
          }}
        />
      </Container>

      <Container
        maxWidth="md"
        sx={{ py: 2, display: "flex", gap: 4 }}
        key={"endCoordinatesInput"}
      >
        <CoordinateInput
          label="End location coordinates"
          setCoordinates={(coordinates) =>
            updateLocationFilter({ end: { coordinates } })
          }
        />
        <TextField
          label="End location radius"
          id="start-location-radius-input"
          InputProps={{
            startAdornment: <InputAdornment position="end">km</InputAdornment>,
          }}
          onBlur={(event) => {
            updateLocationFilter({
              end: { radiusKm: parseFloat(event.target.value) },
            });
          }}
        />
      </Container>
    </Box>
  );
}
