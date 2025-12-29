import { Participant } from '@/types/types'
import { View, Text } from 'react-native'
import MatchParticipant from '../user/MatchParticipant';

interface ParticipantsListProps {
  participants: Map<String, Participant>,
}

const ParticipantsList = ({ participants }: ParticipantsListProps) => {
  let team100: Participant[] = new Array<Participant>;
  let team200: Participant[] = new Array<Participant>;

  participants.forEach((player: Participant) =>
    player.teamId === 100 ? team100.push(player) : team200.push(player)
  )
  return (
    <View className='flex-row bg-dark-2 rounded-xl p-2 gap-2'>
      <View className='flex-column gap-2 flex-1'>
        <Text className={`${team100[0].win ? 'text-util-1' : 'text-util-2'} font-bold text-xl`}>{team100[0].win ? 'Victory' : 'Defeat'}</Text>
        {team100.map((player) => <MatchParticipant key={player.puuid} player={player} />)}
      </View>
      <View className='flex-column gap-2 items-end flex-1'>
        <Text className={`${team100[0].win ? 'text-util-1' : 'text-util-2'} font-bold text-xl`}>{team200[0].win ? 'Victory' : 'Defeat'}</Text>
        {team200.map((player) => <MatchParticipant key={player.puuid} player={player} />)}
      </View>
    </View>
  )
}

export default ParticipantsList

