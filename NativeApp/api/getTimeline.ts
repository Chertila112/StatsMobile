import { MatchTimeline, MatchTimelineSchema } from "@/types/matchTimeline"

export const getTimeline = async (matchId: string): Promise<MatchTimeline> => {
  const base = "http://192.168.1.95:8000";

  const url = new URL(
    `/api/match/${encodeURIComponent(matchId)}/timeline`,
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

  const parsed = MatchTimelineSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
}
