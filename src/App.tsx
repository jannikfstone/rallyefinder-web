import { useState } from "react";
import "./App.css";
import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { apiBaseUrl } from "./config";
import { RelationGrid } from "./RelationGrid";
import { ApiRelation, Relation, SearchResponse } from "./types";
import { SearchComponent } from "./SearchComponent";
import { mapStationIdsToNames } from "./stationsService";

export type SearchState = "initial" | "loading" | "success" | "error";

function App() {
  const [relations, setRelations] = useState<Relation[]>([]);
  const [searchState, setSearchState] = useState<SearchState>("initial");

  async function fetchSearchResults(searchId: string) {
    try {
      const result = await fetch(apiBaseUrl + "/search/" + searchId);
      const data = (await result.json()) as SearchResponse;
      console.log("got search result: ", data);
      if (data.searchState === "PENDING") {
        console.log("search is still pending, retrying in 1s");
        setTimeout(() => fetchSearchResults(searchId), 1000);
        return;
      }
      if (data.searchState === "SUCCESS") {
        const relations = data.searchResult.map(apiRelationToDomainRelation);
        const relationsWithStationNames = await convertStationIdsToNames(
          relations
        );
        setRelations(relationsWithStationNames);
        setSearchState("success");
      }
      if (data.searchState === "ERROR") {
        setSearchState("error");
      }
    } catch (error) {
      console.error(error);
      setSearchState("error");
    }
  }

  async function convertStationIdsToNames(
    relationsWithIds: Relation[]
  ): Promise<Relation[]> {
    const allIds = new Set(
      relationsWithIds.flatMap((relation) => [
        relation.startStation,
        relation.endStation,
      ])
    );
    const stationNameMap = await mapStationIdsToNames(allIds);
    return relationsWithIds.map((relation) => ({
      ...relation,
      startStation: stationNameMap[relation.startStation],
      endStation: stationNameMap[relation.endStation],
    }));
  }

  function apiRelationToDomainRelation(apiRelation: ApiRelation): Relation {
    return {
      startStation: apiRelation.startStation,
      endStation: apiRelation.endStation,
      timeWindows: apiRelation.timeWindows.map((timeWindow) => ({
        startDate: new Date(timeWindow.startDate),
        endDate: new Date(timeWindow.endDate),
      })),
    };
  }

  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                alignItems: "flex-start",
              },
            },
          },
        },
      })}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <AirportShuttleIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Rallye Finder
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <SearchComponent
            searchState={searchState}
            setSearchState={setSearchState}
            fetchSearchResults={fetchSearchResults}
          />
          <RelationGrid
            id={"relationGrid"}
            relations={relations}
            searchState={searchState}
          />
        </main>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
