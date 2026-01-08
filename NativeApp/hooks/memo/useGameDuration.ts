import { useMemo } from 'react';

export const useGameDuration = (matchInfoData: any): string => {
  return useMemo(() => {
    if (!matchInfoData) return '0:00';
    const duration = matchInfoData.info.gameDuration;
    return `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;
  }, [matchInfoData]);
};
