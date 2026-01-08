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

const MatchDetails = () => {
  const { id } = useLocalSearchParams();
  const [matchId, puuid] = id.toString().split('|');

  const { data: matchInfoData, error: matchInfoError, isPending: matchInfoPending } = useMatch(matchId);
  const { data: timelineData, error: timelineError, isPending: timelinePending } = useQuery(timelineOptions(matchId));
  const { team100, team200 } = useTeamSplit(matchInfoData);
  const { tframe1, tframe2 } = useTimelineFrames(timelineData);
  const { t1gold, t2gold } = useTeamGoldTimeline(tframe1, tframe2);
  const totalGold = useTotalGold(team100, team200);
  const gameDuration = useGameDuration(matchInfoData);
  useCurrentPlayer(matchInfoData, puuid); // set global state with current player 
  if (matchInfoError) return <Popup msg={matchInfoError.message} />;

  if (timelineError) return <Popup msg={timelineError.message} />;

  return (
    <ScrollView className='bg-dark-1'>
      {matchInfoPending && <View className='loading' />}
      <View className='justify-start gap-2 px-4 pt-10 items-center'>
        {matchInfoData && (
          <View className='flex-column items-center p-2 h-auto w-full bg-dark-2 rounded-xl'>
            <MatchHeader totalGold={totalGold} gameDuration={gameDuration} />
            <ParticipantsList team100={team100} team200={team200} />
          </View>
        )}
        {timelinePending && <View className='loading'></View>}
        <GoldAdvantageGraph team1gold={t1gold} team2gold={t2gold} />
      </View>
    </ScrollView>
  );
};

export default MatchDetails;
