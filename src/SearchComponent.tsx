import { Box, Button, Container } from "@mui/material";
import { DatePickerGrid } from "./DatePickerGrid";
import { LocationGrid } from "./LocationGrid";
import { useState } from "react";
import { apiBaseUrl } from "./config";
import { SearchState } from "./App";
import { Coordinates, PostSearchBody } from "./types";

export type DateFilter = {
  earliestStart: Date;
  latestStart: Date;
  earliestEnd: Date;
  latestEnd: Date;
};

export type LocationFilter = {
  start: {
    coordinates: Coordinates;
    radiusKm: number;
  };
  end: {
    coordinates: Coordinates;
    radiusKm: number;
  };
};

type SearchComponentProps = {
  searchState: SearchState;
  setSearchState: (searchState: SearchState) => void;
  fetchSearchResults: (searchId: string) => void;
};

export function SearchComponent(props: SearchComponentProps) {
  const [dateFilter, setDateFilter] = useState<DateFilter | null>(null);
  const [locationFilter, setLocationFilter] = useState<LocationFilter | null>(
    null
  );

  async function sendRelationQuery() {
    const body: PostSearchBody = {
      earliestStartDate: dateFilter?.earliestStart?.toISOString(),
      latestStartDate: dateFilter?.latestStart?.toISOString(),
      earliestEndDate: dateFilter?.earliestEnd?.toISOString(),
      latestEndDate: dateFilter?.latestEnd?.toISOString(),
      startLocation: locationFilter?.start.coordinates,
      startLocationRadius: locationFilter?.start.radiusKm,
      endLocation: locationFilter?.end.coordinates,
      endLocationRadius: locationFilter?.end.radiusKm,
    };
    props.setSearchState("loading");
    const response = await fetch(apiBaseUrl + "/search", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    const searchId = data.searchId;
    console.log("got search id: ", searchId);
    props.fetchSearchResults(searchId);
  }

  function isSendButtonDisabled() {
    return (
      dateFilter === null ||
      locationFilter === null ||
      props.searchState === "loading"
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 0,
        pb: 0,
        position: "relative",
      }}
    >
      <DatePickerGrid setDateFilter={setDateFilter} />
      <LocationGrid setLocationFilter={setLocationFilter} />
      <Container maxWidth="md" sx={{ py: 2, display: "flex", gap: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={sendRelationQuery}
          disabled={isSendButtonDisabled()}
        >
          Query relations
        </Button>
      </Container>
    </Box>
  );
}
