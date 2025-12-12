import { UserData } from "@/types/types";

const base_url = process.env.BASE_URL

async function getRankedStats(username: string, tag: string, region: string): Promise<UserData> {
  const response = await fetch(`${base_url}/api/ranked/${region}/${username}/${tag}`);
  if (!response.ok) {
    throw new Error(`HTTPError, status: ${response.status}`)
  }
  return response.json();
}

export default getRankedStats;
