import { MatchInfo } from "@/types/types";
import { MatchInfoSchema } from "@/types/types";
import z from "zod";

export const getMatches = async (
  username: string,
  tag: string,
  region: string
): Promise<MatchInfo[]> => {
  const base = "http://192.168.1.95:8000";

  const url = new URL(
    `/api/matches/${encodeURIComponent(region)}/${encodeURIComponent(username.toLowerCase())}/${encodeURIComponent(tag.toLowerCase())}`,
    base
  );
  console.log(url)
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
  const MatchesArraySchema = z.array(MatchInfoSchema);

  const parsed = MatchesArraySchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};
