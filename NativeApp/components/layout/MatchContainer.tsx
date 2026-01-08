import { SummonerRank } from '@/types/types'
import { View, FlatList } from 'react-native'
import MatchCard from '../match/MatchCard'
import { useMatches } from '@/hooks/useMatches'
import Popup from '../Popup'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';


interface MatchContainerProps {
  SummonerStats: SummonerRank,
}

const MatchContainer = ({ SummonerStats }: MatchContainerProps) => {
  const { data, error, isLoading, isPending } = useMatches(SummonerStats.username, SummonerStats.tag, SummonerStats.region);

  return (
    <View className='flex-1 mb-[45px]'>
      {error && <Popup msg={error.message}></Popup>}
      {(isLoading || isPending) && <View className='loading'></View>}

      {data && (
        <FlatList className='px-4'
          data={data}
          keyExtractor={(item) => item.metadata.matchId}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={index % 2 === 0 ? FadeInLeft.delay(index * 100).duration(300) : FadeInRight.delay(index * 100).duration(300)}>
              <MatchCard matchId={item.metadata.matchId} puuid={SummonerStats.puuid} players={item.info.participants} />
            </Animated.View>
          )}
          ItemSeparatorComponent={() => <View className='h-[4px]'></View>}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
        />
      )}
    </View>
  )
}

export default MatchContainer
