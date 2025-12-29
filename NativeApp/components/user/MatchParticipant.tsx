import { Participant } from '@/types/types'
import { View, Text } from 'react-native'
import ImageContainer from '../ImageContainer'
import { DDragon } from '@/utils/ddragon'
import { calculateFarm, calculateKDA } from '@/utils/calculations'

interface MatchParticipantProps {
  player: Participant,
};


const MatchParticipant = ({ player }: MatchParticipantProps) => {
  return (
    <View className={`flex-row border rounded-xl w-full gap-1 p-1 bg-dark-3 ${player.teamId === 200 ? 'justify-end' : 'justify-start'}`} >
      {
        player.teamId === 100 && <View className='w-[60px] my-auto h-[60px]'>
          <ImageContainer src={DDragon.getChampionIcon(player.championName)}></ImageContainer>
        </View>
      }
      <View className={`${player.teamId === 200 ? 'items-end' : 'items-start'} flex-1`}>
        <Text className='text-dark-7 font-semibold text-xs'
          numberOfLines={1}
          ellipsizeMode='tail'>{player.riotIdGameName}</Text>
        <Text className='text-dark-6 text-xs'>{`${player.kills}/${player.deaths}/${player.deaths}`}</Text>
        <Text className='text-dark-6 text-xs'>{`CS: ${calculateFarm(player)}`}</Text>
        <Text className='text-dark-6 text-xs'>{`KDA: ${calculateKDA(player.kills, player.deaths, player.assists)}`}</Text>
      </View>
      {
        player.teamId === 200 && <View className='w-[60px] my-auto h-[60px]'>
          <ImageContainer src={DDragon.getChampionIcon(player.championName)}></ImageContainer>
        </View>
      }
      <Text></Text>
    </View >)
}

export default MatchParticipant
