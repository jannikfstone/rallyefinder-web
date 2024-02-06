import { Backdrop, CircularProgress, Container, Grid } from "@mui/material";
import { RelationCard } from "./RelationCard";
import { Relation } from "./types";
import { SearchState } from "./App";
import { useEffect } from "react";

export function RelationGrid(props: {
  relations: Relation[];
  searchState: SearchState;
  id: string;
}) {
  useEffect(() => {
    if (props.searchState === "success") {
      const gridElement = document.getElementById(props.id);
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: "smooth" });
        return;
      }
      console.error("Could not find grid element with id: ", props.id);
    }
  }, [props.searchState]);

  if (props.searchState === "loading") {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.searchState === "loading"}
      >
        <CircularProgress />
      </Backdrop>
    );
  }
  if (props.searchState === "error") {
    return <div>Es ist ein Fehler aufgetreten</div>;
  }
  if (props.searchState === "initial") {
    return <div></div>;
  }
  if (props.relations.length === 0) {
    return <div>Keine Verbindungen gefunden</div>;
  }
  return (
    <Container id={props.id} maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {props.relations.map((relation) => (
          <RelationCard relation={relation} />
        ))}
      </Grid>
    </Container>
  );
}
