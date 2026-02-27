import { useMemo } from 'react';
import { MatchTimeline, ParticipantFrame } from '@/types/matchTimeline';
import { ParticipantFrameTimed } from '@/types/matchTimeline';


interface FramesByTeam {
  tframe1: Array<ParticipantFrameTimed>;
  tframe2: Array<ParticipantFrameTimed>;
}

export const useTimelineFrames = (timelineData: MatchTimeline | undefined): FramesByTeam => {
  return useMemo<FramesByTeam>(() => {
    if (!timelineData) return { tframe1: [], tframe2: [] };
    const frames = timelineData.info.frames;
    const step = 5;
    const lastIndex = frames.length - 1;

    const result: FramesByTeam = { tframe1: [], tframe2: [] };

    frames.forEach((frame: any, index: number) => {
      if (index % step === 0 || index === lastIndex) {
        const participantFrames: ParticipantFrame[] = Object.values(frame.participantFrames);
        const timestamp = frame.timestamp;
        result.tframe1.push({ participants: participantFrames.slice(0, 5), timestamp: timestamp });
        result.tframe2.push({ participants: participantFrames.slice(5, 10), timestamp: timestamp });
      }
    });

    return result;
  }, [timelineData]);
};
