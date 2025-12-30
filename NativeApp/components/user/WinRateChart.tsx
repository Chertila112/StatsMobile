import { Text, View, StyleSheet } from 'react-native'
import { PieChart } from "react-native-gifted-charts";
import { SummonerRank } from '@/types/types';
import { calculateWinRate } from '@/utils/calculations';
import { LinearGradient } from 'expo-linear-gradient';



interface WinRateChartProps {
  data: SummonerRank;
}

const WinRateChart = ({ data }: WinRateChartProps) => {
  const pieData = [
    { value: !!data ? data?.wins : 0, color: '#a9ff68' },
    { value: !!data ? data?.losses : 0, color: '#e9b7ce' }]
  return (
    <View className='flex-1' style={styles.wrapper}>
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.15)',
          'rgba(255, 255, 255, 0.05)',
          'rgba(0, 0, 0, 0.2)'
        ]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.3, y: 1 }}
        style={styles.gradientBorder}
      >
        <View className='rounded-3xl'>
          <View className='bg-dark-3 border-[8px] border-dark-2 p-2 justify-end rounded-3xl'>
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
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
  },
  gradientBorder: {
    borderRadius: 21,
    paddingTop: 1,
    paddingBottom: 2
  },
});

export default WinRateChart
