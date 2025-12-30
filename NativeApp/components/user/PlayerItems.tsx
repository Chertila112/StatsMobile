import { View } from 'react-native'
import { DDragon } from '@/utils/ddragon';
import ImageContainer from '../ImageContainer';

interface PlayerItemsProps {

  items: number[];
}

const PlayerItems = ({ items }: PlayerItemsProps) => {
  const topRow = items.slice(0, 3);
  const bottomRow = items.slice(3, 6);

  return (
    <View className='px-2 py-1 flex-1 flex-column min-h-[70px] w-1/2 gap-1 rounded-r-2xl'>
      <ItemRow items={topRow} />
      <ItemRow items={bottomRow} />
    </View>
  );
};

interface ItemRowProps {
  items: number[];
}

const ItemRow = ({ items }: ItemRowProps) => {
  return (
    <View className='flex-row gap-1 flex-1'>
      {items.map((itemId, index) => (
        <PlayerItem key={index} itemId={itemId} />
      ))}
    </View>
  );
};

interface PlayerItemProps {
  itemId: number;
}

const PlayerItem = ({ itemId }: PlayerItemProps) => {
  return (
    <View className='player-item'>
      <ImageContainer src={DDragon.getItem(itemId)} />
    </View>
  );
};

export default PlayerItems;
