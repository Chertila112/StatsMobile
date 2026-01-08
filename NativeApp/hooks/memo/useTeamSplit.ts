import { useMemo } from 'react';
import { MatchInfo, Participant } from '@/types/types';

interface Teams {
  team100: Participant[];
  team200: Participant[];
}

export const useTeamSplit = (matchInfoData: MatchInfo | undefined): Teams => {
  return useMemo<Teams>(() => {
    if (!matchInfoData) return { team100: [], team200: [] };

    const participantsMap = new Map<string, Participant>(
      matchInfoData.metadata.participants.map((puuid: string) => [
        puuid,
        matchInfoData.info.participants.find((p: Participant) => p.puuid === puuid)!
      ])
    );

    const teams: Teams = { team100: [], team200: [] };

    participantsMap.forEach((player: Participant) => {
      player.teamId === 100 ? teams.team100.push(player) : teams.team200.push(player);
    });

    return teams;
  }, [matchInfoData]);
};
