import { Participant } from '@/types/types'
import { View, Text } from 'react-native'
import ImageContainer from '../ImageContainer'
import { DDragon } from '@/utils/ddragon'
import { calculateFarm, calculateKDA } from '@/utils/calculations'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated'
import CardWrapperShadow from '../CardWrapperShadow'


interface MatchParticipantProps {
  player: Participant,
};


const MatchParticipant = ({ player }: MatchParticipantProps) => {
  return (
    <CardWrapperShadow radius={12} >
      <Animated.View entering={player.teamId === 100 ? FadeInLeft.duration(300).delay(100) : FadeInRight.duration(300).delay(100)}
        className={`flex-row rounded-xl w-full gap-1 p-2 bg-dark-3 ${player.teamId === 200 ? 'justify-end' : 'justify-start'}`} >
        {
          player.teamId === 100 && <View className='w-[80px] h-[80px] border-dark-6 border overflow-hidden my-auto'
            style={{
              borderTopStartRadius: 8,
              borderBottomStartRadius: 8
            }}>
            <ImageContainer className='scale-110' src={DDragon.getChampionIcon(player.championName)}></ImageContainer>
          </View>
        }
        <View className={`${player.teamId === 200 ? 'items-end' : 'items-start'} flex-1`}>
          <Text className='text-dark-7 font-bold text-[0.9rem]'
            numberOfLines={1}
            ellipsizeMode='tail'>{player.riotIdGameName}</Text>
          <Text className='text-dark-6 text-[0.75rem] font-semibold'
            numberOfLines={1}
            ellipsizeMode='tail'>{player.championName}</Text>
          <Text className='text-dark-6 text-[0.7rem]'>{`${player.kills}/${player.deaths}/${player.assists}`}</Text>
          <Text className='text-dark-6 text-[0.7rem]'>{`CS: ${calculateFarm(player)}`}</Text>
          <Text className='text-dark-6 text-[0.7rem]'>{`KDA: ${calculateKDA(player.kills, player.deaths, player.assists)}`}</Text>
        </View>
        {
          player.teamId === 200 && <View className='w-[80px] my-auto border-dark-6 border h-[80px] overflow-hidden'
            style={{
              borderTopEndRadius: 8,
              borderBottomEndRadius: 8
            }}>
            <ImageContainer className='scale-110' src={DDragon.getChampionIcon(player.championName)}></ImageContainer>
          </View>
        }
        <Text></Text>
      </Animated.View >
    </CardWrapperShadow>
  )
}

export default MatchParticipant
