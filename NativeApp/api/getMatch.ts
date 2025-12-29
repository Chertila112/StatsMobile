import { MatchInfo, MatchInfoSchema } from "@/types/types"



export const get_match = async (matchId: string): Promise<MatchInfo> => {

  const base = "http://192.168.1.95:8000";

  const url = new URL(
    `/api/match/${encodeURIComponent(matchId)}`,
    base
  );

  const response = await fetch(url.toString());

  if (!response.ok) {
    let details = "";
    try {
      details = await response.text();
    } catch {
    }
    throw new Error(`HTTP ${response.status}${details ? `: ${details}` : ""}`);
  }

  const data: unknown = await response.json();

  const parsed = MatchInfoSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;

}
