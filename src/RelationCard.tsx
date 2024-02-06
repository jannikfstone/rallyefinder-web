import { Card, Typography, Divider, Grid, Box } from "@mui/material";
import { Relation } from "./types";

export function RelationCard(props: { relation: Relation }) {
  return (
    <Grid
      item
      key={`${props.relation.endStation}-${props.relation.startStation}`}
      xs={4}
    >
      <Card>
        <Typography variant="h4">
          Von {props.relation.startStation} nach {props.relation.endStation}
        </Typography>
        <Divider />
        {props.relation.timeWindows.map((timeWindow, index, elements) => {
          const startDateString = timeWindow.startDate.toLocaleDateString();
          const endDateString = timeWindow.endDate.toLocaleDateString();
          const nextTimeWindow = elements[index + 1];
          const mainContent = (
            <Box>
              <Typography variant="body1">Start: {startDateString}</Typography>
              <Typography variant="body1">Ende: {endDateString}</Typography>
            </Box>
          );
          if (nextTimeWindow) {
            return (
              <Box>
                {mainContent}
                <Divider />
              </Box>
            );
          }
          return mainContent;
        })}
      </Card>
    </Grid>
  );
}
