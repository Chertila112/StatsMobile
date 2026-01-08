import { Participant } from '@/types/types'
import TeamColumn from './TeamColumn';
import Animated, { FadeInDown } from 'react-native-reanimated';


interface Teams {
  team100: Participant[],
  team200: Participant[],
}

const ParticipantsList = ({ team100, team200 }: Teams) => {

  return (
    <Animated.View entering={FadeInDown.duration(300)} className='flex-row gap-2'>
      <TeamColumn players={team100} didWin={team100[0]?.win} align='start'></TeamColumn>
      <TeamColumn players={team200} didWin={team200[0]?.win} align='end'></TeamColumn>
    </Animated.View>
  )
}

export default ParticipantsList

