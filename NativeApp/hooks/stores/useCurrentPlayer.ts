import { MatchInfo, Participant } from "@/types/types";
import { useMemo } from "react";

export const useCurrentPlayer = (matchInfoData: MatchInfo | undefined, puuid: string): Participant | undefined => {
  return useMemo(() => {
    if (!matchInfoData)
      return undefined;
    return matchInfoData?.info.participants.find(p => p.puuid === puuid);
  }, [puuid, matchInfoData]);
}
