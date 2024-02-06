import { apiBaseUrl } from "./config";

export async function getStationName(id: string): Promise<string> {
  const stationFetchResult = await fetchWithRetries(
    `${apiBaseUrl}/stations/${id}`
  );
  const station = await stationFetchResult.json();
  if (!station.name) throw new Error("Station not found");
  return station.name;
}

export async function mapStationIdsToNames(
  ids: Set<string>
): Promise<{ [id: string]: string }> {
  const stationIdArray = Array.from(ids);
  const stationNamePromises = stationIdArray.map(getStationName);
  const allStationNames = await Promise.all(stationNamePromises);
  return stationIdArray.reduce((acc: { [id: string]: string }, id, index) => {
    acc[id] = allStationNames[index];
    return acc;
  }, {});
}

export async function fetchWithRetries(
  url: string,
  retries: number = 5
): Promise<Response> {
  let response: Response;
  for (let i = 0; i < retries; i++) {
    try {
      response = await fetch(url);
      if (response.ok) {
        return response;
      }
    } catch (error) {
      console.error(`Error fetching ${url}: ${error}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 2 ** i * 100));
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}
