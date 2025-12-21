import { SummonerRank } from "@/types/types";
import { SummonerRankSchema } from "@/types/types";

async function getRankedStats(username: string, tag: string, region: string): Promise<SummonerRank> {
  console.log(`--- Making API call with: /api/ranked/${region}/${username}/${tag}`);
  const response = await fetch(`http://192.168.1.95:8000/api/ranked/${region}/${username}/${tag}`); if (!response.ok) {
    throw new Error(`HTTPError, status: ${response.status}`)
  }
  const data = await response.json();

  const rawData = SummonerRankSchema.safeParse(data)
  if (!rawData.success)
    throw rawData.error;

  return rawData.data;
}

export default getRankedStats;
