import { View } from 'react-native'
import { Summoner } from '@/types/types'
import { useRankStats } from '@/hooks/useRankStats'
import UserCard from '../user/UserCard';
import WinRateChart from '../user/WinRateChart';
import Popup from '../Popup';
import MatchContainer from './MatchContainer';
import Animated, { FadeIn } from 'react-native-reanimated';
interface MainStatsProps {
  summoner: Summoner | null,
}


const MainStats = ({ summoner }: MainStatsProps) => {
  const { isLoading, isPending, data, error } = useRankStats(summoner);
  return (<>
    {error && <Popup msg={error.message}></Popup>}
    {(isLoading || isPending) && <View className='loading'></View>}
    {data &&
      <View className='w-full flex-1'>
        <Animated.View
          entering={FadeIn.duration(400).delay(100)}>
          <View className='flex-row h-auto gap-2 p-4'>
            <UserCard user={data}></UserCard>
            <WinRateChart data={data}></WinRateChart>
          </View>
        </Animated.View>
        <View className='flex-1'>
          <MatchContainer SummonerStats={data}></MatchContainer>
        </View>
      </View >
    }
  </>)
}

export default MainStats

