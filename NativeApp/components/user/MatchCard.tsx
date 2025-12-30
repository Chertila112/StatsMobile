import { Participant } from '@/types/types'
import { View, Text, Image, StyleSheet } from 'react-native'
import { DDragon } from '@/utils/ddragon'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import PlayerItems from './PlayerItems'

interface MatchCardProps {
  players: Participant[],
  puuid: string,
  version: string,
  matchId: string
}

const calculateKDA = (kills: number, deaths: number, assists: number) =>
  deaths !== 0 ? ((kills + assists) / deaths).toFixed(2) : (kills + assists)

const MatchCard = ({ matchId, version, players, puuid }: MatchCardProps) => {
  const player = players.find(p => p.puuid === puuid) as Participant;

  return (
    <Link href={`/match/${matchId}|${puuid}`}>
      <View className='w-full' style={styles.wrapper}>
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
          <View className='w-full p-4 flex-row bg-dark-2 rounded-3xl gap-2 min-h-[90px]'>
            <View className='h-[70px] w-[70px] flex-1 my-auto overflow-hidden rounded-l-2xl border border-dark-6'>
              <Image
                className='h-full w-full scale-110'
                source={{
                  uri: DDragon.getChampionIcon(player.championName),
                  headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                  }
                }}
                resizeMode='cover'
              />
            </View>

            <View className='flex-column gap-2 my-auto'>
              <SummonerSpell spellId={player.summoner1Id} />
              <SummonerSpell spellId={player.summoner2Id} />
            </View>

            {/* Stats and items */}
            <View className='flex-2 flex-row w-2/3 bg-dark-3 rounded-r-2xl'>
              <View className='flex-1 justify-center'>
                <Text className={`text-lg text-center font-semibold ${player.win ? 'text-green-500' : 'text-red-500'}`}>
                  {player.win ? 'Victory' : 'Defeat'}
                </Text>
                <Text className='text-base text-center text-dark-6'>
                  {`${player.kills}/${player.deaths}/${player.assists}`}
                </Text>
                <Text className='text-sm text-center text-dark-6'>
                  {`KDA: ${calculateKDA(player.kills, player.deaths, player.assists)}`}
                </Text>
              </View>

              <PlayerItems
                items={[
                  player.item0,
                  player.item1,
                  player.item2,
                  player.item3,
                  player.item4,
                  player.item5,
                ]}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </Link>
  )
}

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

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
  },
  gradientBorder: {
    borderRadius: 22,
    paddingTop: 1.5,
    paddingBottom: 3
  },
});

export default MatchCard;
