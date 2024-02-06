export type Relation = {
  startStation: string;
  endStation: string;
  timeWindows: { startDate: Date; endDate: Date }[];
};

export type ApiRelation = {
  startStation: string;
  endStation: string;
  timeWindows: { startDate: string; endDate: string }[];
};

export type SearchResponse = {
  searchResult: ApiRelation[];
  searchFilters: any;
  searchState: "PENDING" | "ERROR" | "SUCCESS";
};
export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type PostSearchBody = {
  earliestStartDate?: string;
  latestStartDate?: string;
  earliestEndDate?: string;
  latestEndDate?: string;
  startLocation?: Coordinates;
  startLocationRadius?: number;
  endLocation?: Coordinates;
  endLocationRadius?: number;
};
