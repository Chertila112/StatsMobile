import { Image } from "react-native";
import { DDragon } from "@/utils/ddragon";


interface SummonerSpellProps {
  spellId: number;
}

const SummonerSpell = ({ spellId }: SummonerSpellProps) => (
  <Image
    className='border border-dark-6 rounded'
    source={{
      uri: DDragon.getSummonerSpell(spellId),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }}
    style={{ height: 31, width: 31 }}
  />
);


export default SummonerSpell;
