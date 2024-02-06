import { Box, Container, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { DateFilter } from "./SearchComponent";

type DatePickerGridProps = {
  setDateFilter: (dateFilter: DateFilter) => void;
};

type PartialDateFilter = {
  earliestStart?: Date | null;
  latestStart?: Date | null;
  earliestEnd?: Date | null;
  latestEnd?: Date | null;
};

export function DatePickerGrid(props: DatePickerGridProps) {
  const [internalDateFilter, setInternalDateFilter] =
    useState<PartialDateFilter>({});

  function setDateFilterValues(dateFilterUpdate: PartialDateFilter) {
    const combinedDateFilter = {
      ...internalDateFilter,
      ...dateFilterUpdate,
    };
    setInternalDateFilter(combinedDateFilter);
    if (
      combinedDateFilter.earliestStart &&
      combinedDateFilter.latestStart &&
      combinedDateFilter.earliestEnd &&
      combinedDateFilter.latestEnd
    ) {
      props.setDateFilter(combinedDateFilter as DateFilter);
    }
  }

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
          Choose the Start and end dates of your journey and a radius.
        </Typography>
      </Container>
      <Container maxWidth="md" sx={{ py: 2, display: "flex", gap: 4 }}>
        <DatePicker
          label="Select Earliest Start Date"
          value={internalDateFilter.earliestStart}
          onChange={(date) => setDateFilterValues({ earliestStart: date })}
        />

        <DatePicker
          label="Select Latest Start Date"
          value={internalDateFilter.latestStart}
          onChange={(date) => setDateFilterValues({ latestStart: date })}
        />
      </Container>
      <Container maxWidth="md" sx={{ py: 2, display: "flex", gap: 4 }}>
        <DatePicker
          label="Select Earliest End Date"
          value={internalDateFilter.earliestEnd}
          onChange={(date) => setDateFilterValues({ earliestEnd: date })}
        />

        <DatePicker
          label="Select Latest End Date"
          value={internalDateFilter.latestEnd}
          onChange={(date) => setDateFilterValues({ latestEnd: date })}
        />
      </Container>
    </Box>
  );
}
