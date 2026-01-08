import { MatchInfo } from "@/types/types";
import { useEffect } from "react";
import { usePlayerStore } from "./currentPlayerStore";

export const useCurrentPlayer = (matchInfoData: MatchInfo | undefined, puuid: string) => {

  const { setCurrentPlayer } = usePlayerStore();
  useEffect(() => {
    const player = matchInfoData?.info.participants.find(p => p.puuid === puuid);
    if (player)
      setCurrentPlayer(player);
  }, [puuid, matchInfoData, setCurrentPlayer]);
}
