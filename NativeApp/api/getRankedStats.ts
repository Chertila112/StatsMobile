import { SummonerRank } from "@/types/types";
import { SummonerRankSchema } from "@/types/types";

async function getRankedStats(username: string, tag: string, region: string): Promise<SummonerRank> {
  const response = await fetch(`http://192.168.1.95:8000/api/main_user_info/${region}/${username}/${tag}`.toLowerCase());
  if (!response.ok) {
    throw new Error(`HTTPError, status: ${response.status}`)
  }
  const data = await response.json();

  const rawData = SummonerRankSchema.safeParse(data)
  if (!rawData.success)
    throw rawData.error;

  return rawData.data;
}

export default getRankedStats;
