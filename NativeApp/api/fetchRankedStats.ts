import { UserData } from "@/types/types";

const base_url = process.env.BASE_URL

async function fetchRankedStats(username: string, tag: string, region: string): Promise<UserData> {
  const response = await fetch(`${base_url}/api/ranked/${region}/${username}/${tag}`);

  if (!response.ok) {
    throw new Error(`HTTPError, status: ${response.status}`)
  }

  const data = await response.json();
  return data as UserData;
}

export default fetchRankedStats;
