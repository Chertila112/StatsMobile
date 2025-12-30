import { Participant } from '@/types/types'
import { View, Text } from 'react-native'
import MatchParticipant from '../user/MatchParticipant';
import { useMemo } from 'react';
import TeamColumn from './TeamColumn';


interface ParticipantsListProps {
  participants: Map<string, Participant>,
}

interface Teams {
  team100: Participant[],
  team200: Participant[],
}

const ParticipantsList = ({ participants }: ParticipantsListProps) => {

  const { team100, team200 } = useMemo<Teams>(() => {
    const team100: Participant[] = [];
    const team200: Participant[] = [];

    participants.forEach((player: Participant) => {
      if (player.teamId === 100) {
        team100.push(player);
      } else {
        team200.push(player);
      }
    });

    return { team100, team200 };
  }, [participants]);

  return (<>
    <View className='flex-row bg-dark-2 rounded-xl p-2 gap-2'>
      <TeamColumn players={team100} didWin={team100[0]?.win} align='start'></TeamColumn>
      <TeamColumn players={team200} didWin={team200[0]?.win} align='end'></TeamColumn>
    </View>
  </>
  )
}

export default ParticipantsList

