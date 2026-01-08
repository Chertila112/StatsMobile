import { View, Text } from 'react-native';
import Coin from '@/components/Coin';

interface MatchHeaderProps {
  totalGold: { team100: number; team200: number };
  gameDuration: string;
}

const MatchHeader = ({ totalGold, gameDuration }: MatchHeaderProps) => {
  return (
    <View className='flex-row gap-[20vw] w-full'>
      <View className='flex-row gap-2 items-center'>
        <Coin />
        <Text className='text-dark-7 font-semibold text-lg'>
          {totalGold.team100}
        </Text>
      </View>

      <Text className='text-dark-7 text-xl'>{gameDuration}</Text>

      <View className='flex-row gap-2 items-center'>
        <Text className='text-dark-7 font-semibold text-lg'>
          {totalGold.team200}
        </Text>
        <Coin />
      </View>
    </View>
  );
};

export default MatchHeader;
