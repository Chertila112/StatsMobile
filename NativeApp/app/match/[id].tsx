import ParticipantsList from '@/components/layout/ParticipantsList';
import Popup from '@/components/Popup';
import { useMatch } from '@/hooks/useMatch';
import { Participant } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native'

const MatchDetails = () => {

  const { id } = useLocalSearchParams();
  const [matchId, puuid] = id.toString().split('|');

  const { data, isLoading, error, isPending } = useMatch(matchId);

  const participants = new Map<string, Participant>();

  if (data)
    data.metadata.participants.forEach(
      (item: string) => participants.set(item,
        data.info.participants.find(
          (player: Participant) => player.puuid === item
        ) as Participant
      )
    );

  return (
    <ScrollView>
      {error && <Popup msg={error.message} />}
      {(isLoading || isPending) && <View className='loading'></View>}
      <View className='justify-start px-4 pt-10 bg-dark-1 h-screen items-center'>
        <ParticipantsList participants={participants}></ParticipantsList>
      </View>
    </ScrollView>
  )
}

export default MatchDetails;

