import { usePlayerStore } from '@/hooks/stores/currentPlayerStore'
import { useCurrentPlayer } from '@/hooks/stores/useCurrentPlayer'
import { View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'

interface GoldAdvantageGraphProps {
  team1gold: number[],
  team2gold: number[]
}

const currentPlayer = usePlayerStore.getState().currentPlayer;

const GoldAdvantageGraph = ({ team1gold, team2gold }: GoldAdvantageGraphProps) => {
  const lineData = [
    { value: 0, dataPointText: '0' },
  ]
  const lineData2 = [
    { value: 0, dataPointText: '0' },
  ]

  team1gold.forEach(gold => lineData.push({ value: gold, dataPointText: gold.toString() }));
  team2gold.forEach(gold => lineData2.push({ value: gold, dataPointText: gold.toString() }));

  return (
    <View className='w-full rounded-2xl bg-dark-2 p-2'>
      <View className='bg-dark-3 p-2 rounded-xl'>
        <LineChart
          areaChart
          data={lineData2}
          hideDataPoints
          data2={lineData}
          yAxisLabelWidth={50}
          maxValue={Math.max(team1gold[team1gold.length - 1], team2gold[team2gold.length - 1])}
          spacing={20}
          adjustToWidth
          initialSpacing={0}
          color1="blue"
          color2="#f18f01"
          textColor1="green"
          startFillColor1="#006e90"
          startFillColor2="#f18f01"
          startOpacity={0.7}
          endOpacity={0.3}
        />
      </View>
    </View>
  )
}

export default GoldAdvantageGraph
