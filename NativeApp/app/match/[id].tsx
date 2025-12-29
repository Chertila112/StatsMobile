import ParticipantsList from '@/components/layout/ParticipantsList';
import Popup from '@/components/Popup';
import { useMatch } from '@/hooks/useMatch';
import { Participant } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import { version } from 'react';
import { Text, View } from 'react-native'

const MatchDetails = () => {

  const { id } = useLocalSearchParams();
  const [matchId, puuid, version] = id.toString().split('|');

  const { data, isLoading, error, isPending } = useMatch(matchId);

  const participants = new Map<String, Participant>();

  if (data)
    data.metadata.participants.forEach(
      (item: String) => participants.set(item,
        data.info.participants.find(
          (player: Participant) => player.puuid === item
        ) as Participant
      )
    );

  return (
    <>
      {error && <Popup msg={error.message} />}
      {(isLoading || isPending) && <View className='loading'></View>}
      <View className='justify-start px-4 pt-10 bg-dark-1 h-screen items-center'>
        <ParticipantsList participants={participants}></ParticipantsList>
      </View>
    </>
  )
}

export default MatchDetails;

