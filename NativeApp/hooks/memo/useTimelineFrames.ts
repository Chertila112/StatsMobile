import { useMemo } from 'react';
import { MatchTimeline, ParticipantFrame } from '@/types/matchTimeline';

interface FramesByTeam {
  tframe1: Array<ParticipantFrame[]>;
  tframe2: Array<ParticipantFrame[]>;
}

export const useTimelineFrames = (timelineData: MatchTimeline | undefined): FramesByTeam => {
  return useMemo<FramesByTeam>(() => {
    if (!timelineData) return { tframe1: [], tframe2: [] };

    const frames = timelineData.info.frames;
    const step = 3;
    const lastIndex = frames.length - 1;

    const result: FramesByTeam = { tframe1: [], tframe2: [] };

    frames.forEach((frame: any, index: number) => {
      if (index % step === 0 || index === lastIndex) {
        const participantFrames: ParticipantFrame[] = Object.values(frame.participantFrames);
        result.tframe1.push(participantFrames.slice(0, 5));
        result.tframe2.push(participantFrames.slice(5, 10));
      }
    });

    return result;
  }, [timelineData]);
};
