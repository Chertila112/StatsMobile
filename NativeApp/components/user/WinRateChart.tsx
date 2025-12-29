import { Text, View } from 'react-native'
import { PieChart } from "react-native-gifted-charts";
import { SummonerRank } from '@/types/types';
import { calculateWinRate } from '@/utils/calculations';

interface WinRateChartProps {
  data: SummonerRank;
}

const WinRateChart = ({ data }: WinRateChartProps) => {
  const pieData = [
    { value: !!data ? data?.wins : 0, color: '#a9ff68' },
    { value: !!data ? data?.losses : 0, color: '#e9b7ce' }]
  return (
    <View className='border rounded-3xl'>
      <View className='bg-dark-3 border-[8px] border-dark-2 p-2 justify-end rounded-3xl flex-1'>
        <Text className='text-dark-7 text-center my-auto font-bold text-xl'>Winrate</Text>
        <View className='rounded-2xl items-center'>
          <PieChart
            data={pieData}
            radius={45}
            innerRadius={30}
            innerCircleColor={"#343434"}
            sectionAutoFocus
            centerLabelComponent={() => (
              <View className='justify-center items-center w-full'>
                {data && <Text className={`text-dark-6 font-semibold mx-auto`}>{`${calculateWinRate(data)}%`}</Text>}
              </View>)}
            donut>
          </PieChart>
          <View className='flex-row gap-2'>
            <View className='flex-row gap-1'>
              <View className='bg-util-2 my-auto w-[10px] h-[10px] rounded-full' />
              <Text className='text-dark-6 text-sm'>Losses</Text>
            </View>
            <View className='flex-row gap-1'>
              <View className='bg-util-1 my-auto w-[10px] h-[10px] rounded-full' />
              <Text className='text-dark-6 text-sm'>Wins</Text>
            </View>
          </View>
        </View>
      </View >
    </View>
  )
}

export default WinRateChart
