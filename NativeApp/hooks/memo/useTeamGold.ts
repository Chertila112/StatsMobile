import { useMemo } from 'react';
import { Participant } from '@/types/types';
import { ParticipantFrame } from '@/types/matchTimeline';

interface TeamGold {
  t1gold: number[];
  t2gold: number[];
}

interface TotalGold {
  team100: number;
  team200: number;
}

export const useTeamGoldTimeline = (
  tframe1: Array<ParticipantFrame[]>,
  tframe2: Array<ParticipantFrame[]>
): TeamGold => {
  return useMemo<TeamGold>(() => {
    const calculateTeamGold = (frames: Array<ParticipantFrame[]>): number[] =>
      frames.map((playerFrames: ParticipantFrame[]) =>
        playerFrames.reduce((total: number, pframe: ParticipantFrame) =>
          total + pframe.totalGold, 0
        )
      );

    return {
      t1gold: calculateTeamGold(tframe1),
      t2gold: calculateTeamGold(tframe2)
    };
  }, [tframe1, tframe2]);
};

export const useTotalGold = (team100: Participant[], team200: Participant[]): TotalGold => {
  return useMemo(() => ({
    team100: team100.reduce((acc: number, player: Participant) => acc + player.goldEarned, 0),
    team200: team200.reduce((acc: number, player: Participant) => acc + player.goldEarned, 0)
  }), [team100, team200]);
};
