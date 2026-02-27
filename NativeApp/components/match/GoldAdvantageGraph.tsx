import { statByTimestamp } from '@/types/matchTimeline'
import { View, Text, useWindowDimensions } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { useMemo } from 'react'
import CardWrapperShadow from '../CardWrapperShadow'

interface GoldAdvantageGraphProps {
  team1gold: statByTimestamp[],
  team2gold: statByTimestamp[],
}
interface LineData {
  value: number,
  label: string,
}

const convertToLineData = (goldData: statByTimestamp[]): LineData[] => {
  return goldData.map((item) => ({
    value: (item.stat / 1000),
    label: `${(item.timestamp / 60000).toFixed(0)} min`,
    labelTextStyle: { color: 'gray', width: 60 },
  }));
}

const GoldAdvantageGraph = ({ team1gold, team2gold }: GoldAdvantageGraphProps) => {
  const lineData = useMemo(() => convertToLineData(team1gold), [team1gold]);
  const lineData2 = useMemo(() => convertToLineData(team2gold), [team2gold]);
  const { width: screenWidth } = useWindowDimensions();

  const chartConfig = useMemo(() => {
    const dataLength = lineData.length;
    const padding = 90;
    const offset = 10;
    const availableWidth = screenWidth - padding;
    const calculatedSpacing = dataLength > 1 ? (availableWidth - offset) / (dataLength - 1) : availableWidth;
    console.log(calculatedSpacing);
    return {
      spacing: Math.max(20, Math.min(calculatedSpacing, 55)),
      width: availableWidth
    };
  }, [lineData.length, screenWidth]);

  return (
    <View
      className='w-full rounded-2xl h-auto bg-dark-2 p-2'>
      <View
        className='bg-dark-3 p-2 gap-2 rounded-xl'>
        <Text className='text-dark-7 font-bold text-center text-xl'>Gold distribution:</Text>
        <LineChart
          areaChart
          data={lineData}
          data2={lineData2}
          yAxisLabelWidth={30}
          yAxisThickness={0}
          xAxisThickness={0}
          labelsExtraHeight={20}
          xAxisLabelsVerticalShift={10}
          rulesType='solid'
          rulesColor={'#343434'}
          noOfSections={5}
          hideDataPoints
          yAxisTextStyle={{ color: 'gray' }}
          rotateLabel
          spacing={chartConfig.spacing}
          maxValue={Math.max(lineData[lineData.length - 1].value, lineData2[lineData2.length - 1].value)}
          backgroundColor={'#454545'}
          adjustToWidth
          initialSpacing={10}
          color1="blue"
          color2="#f18f01"
          startFillColor1="#006e90"
          endFillColor1='#006e90'
          startFillColor2="#f18f01"
          endFillColor2="#f18f01"
          startOpacity={0.7}
          endOpacity={0.3}
          pointerConfig={{
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: 'lightgray',
            radius: 4,
            autoAdjustPointerLabelPosition: true,
            pointerLabelWidth: 120,
            pointerLabelHeight: 120,
            shiftPointerLabelY: 100,
            pointerLabelComponent: (items: LineData[]) => {
              return (
                <View
                  style={{
                    height: 120,
                    width: 120,
                    backgroundColor: '#282C3E',
                    borderRadius: 8,
                    justifyContent: 'center',
                    padding: 4,
                  }}>
                  <View className='flex-row gap-1 items-center'>
                    <View className='bg-blue-500 rounded-full h-[0.75rem] w-[0.75rem]'></View>
                    <Text className='font-bold text-white'>Your team:</Text>
                  </View>
                  <Text className='font-semibold pl-4 text-dark-7'>{`${(items[0].value).toFixed(1)}k`}</Text>
                  <View className='flex-row gap-1 items-center'>
                    <View className='bg-orange-500 rounded-full h-[0.75rem] w-[0.75rem]'></View>
                    <Text className='font-bold text-white'>Enemy team:</Text>
                  </View>
                  <Text className='font-semibold pl-4 text-dark-7'>{`${items[1].value.toFixed(1)}k`}</Text>
                </View>
              );
            },
          }}
        />
      </View>
    </View>
  )
}

export default GoldAdvantageGraph
