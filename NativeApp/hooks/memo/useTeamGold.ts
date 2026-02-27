import { useMemo } from 'react';
import { Participant } from '@/types/types';
import { ParticipantFrame, ParticipantFrameTimed } from '@/types/matchTimeline';
import { statByTimestamp } from '@/types/matchTimeline';

interface TeamGold {
  t1gold: statByTimestamp[];
  t2gold: statByTimestamp[];
}

interface TotalGold {
  team100: number;
  team200: number;
}

export const useTeamGoldTimeline = (
  tframe1: Array<ParticipantFrameTimed>,
  tframe2: Array<ParticipantFrameTimed>
): TeamGold => {
  return useMemo<TeamGold>(() => {
    const calculateTeamGold = (frames: Array<ParticipantFrameTimed>): statByTimestamp[] =>
      frames.map((playerFrames: ParticipantFrameTimed): statByTimestamp => {
        return {
          stat: playerFrames.participants.reduce((total: number, pframe: ParticipantFrame) =>
            total + pframe.totalGold, 0
          ),
          timestamp: playerFrames.timestamp,

        }
      }
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
