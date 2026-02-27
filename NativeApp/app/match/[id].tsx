import { ScrollView, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import ParticipantsList from '@/components/layout/ParticipantsList';
import Popup from '@/components/Popup';
import GoldAdvantageGraph from '@/components/match/GoldAdvantageGraph';
import MatchHeader from '@/components/match/MatchHeader';
import { useMatch } from '@/hooks/useMatch';
import { timelineOptions } from '@/hooks/timelineQueryProps';
import { useTeamSplit } from '@/hooks/memo/useTeamSplit';
import { useTimelineFrames } from '@/hooks/memo/useTimelineFrames';
import { useTeamGoldTimeline, useTotalGold } from '@/hooks/memo/useTeamGold';
import { useGameDuration } from '@/hooks/memo/useGameDuration';
import { useCurrentPlayer } from '@/hooks/stores/useCurrentPlayer';
import Minimap from '@/components/match/Minimap';
import { createContext } from 'react';
import { MatchInfo, Participant } from '@/types/types';

type MatchContext = {
  matchData: MatchInfo,
  currentPlayer: Participant,
}


export const MatchContext = createContext<MatchContext | undefined>(undefined);

const MatchDetails = () => {
  const { id } = useLocalSearchParams();
  if (!id) return null;
  const [matchId, puuid] = id.toString().split('|');

  const { data: matchInfoData, error: matchInfoError, isPending: matchInfoPending } = useMatch(matchId);
  const { data: timelineData, error: timelineError, isPending: timelinePending } = useQuery(timelineOptions(matchId));

  //DATA HOOKS 

  const { team100, team200 } = useTeamSplit(matchInfoData);
  const { tframe1, tframe2 } = useTimelineFrames(timelineData);
  const { t1gold, t2gold } = useTeamGoldTimeline(tframe1, tframe2);
  const totalGold = useTotalGold(team100, team200);
  const gameDuration = useGameDuration(matchInfoData);
  const currentPlayer = useCurrentPlayer(matchInfoData, puuid);

  if (!currentPlayer) {
    return <View className='loading bg-dark-1'></View>
  }

  if (matchInfoPending) {
    return <View className='loading bg-dark-1'></View>;
  }

  if (matchInfoError) return <Popup msg={matchInfoError.message} />;

  const isTeam1 = currentPlayer ? currentPlayer.participantId <= 5 : true;

  return (
    <ScrollView className='bg-dark-1'>
      {timelineError && <Popup msg={timelineError.message} />}
      <MatchContext value={{ matchData: matchInfoData, currentPlayer: currentPlayer }} >
        <View className='justify-start pb-10 gap-2 px-4 pt-10 items-center'>

          {matchInfoData && (
            <View className='flex-column items-center p-2 h-auto w-full bg-dark-2 rounded-xl'>
              <MatchHeader totalGold={totalGold} gameDuration={gameDuration} />
              <ParticipantsList team100={team100} team200={team200} />
            </View>
          )}

          {timelinePending && <View className='loading'></View>}

          {!timelinePending && !timelineError && timelineData && currentPlayer && (
            <>
              <GoldAdvantageGraph
                team1gold={isTeam1 ? t1gold : t2gold}
                team2gold={isTeam1 ? t2gold : t1gold}
              />

              <Minimap
                participantId={currentPlayer.participantId}
                timelineData={timelineData}
              />
            </>
          )}
        </View>
      </MatchContext>
    </ScrollView >
  );
};

export default MatchDetails;
