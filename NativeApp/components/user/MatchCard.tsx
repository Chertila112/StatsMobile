import { Participant } from '@/types/types'
import { View, Text, Image } from 'react-native'
import { DDragon } from '@/utils/ddragon'
import ImageContainer from '../ImageContainer'
import { Link } from 'expo-router'

interface MatchCardProps {
  players: Participant[],
  puuid: string,
  version: string,
  matchId: string
}

const calculateKDA = (kills: number, deaths: number, assists: number) => deaths != 0 ? ((kills + assists) / deaths).toFixed(2) : (kills + assists)

const MatchCard = ({ matchId, version, players, puuid }: MatchCardProps) => {


  const player = players.find(p => p.puuid === puuid) as Participant;

  return (
    <Link href={`/match/${matchId}|${puuid}|${version}`} >
      <View className='my-1 p-4 flex-row bg-dark-2 rounded-3xl gap-2 min-h-[90px]'>
        <View className='h-[70px] w-[70px] flex-1 my-auto overflow-hidden border rounded-l-2xl border-dark-6'>
          <Image
            className='h-full w-full scale-110'
            source={
              {
                uri: DDragon.getChampionIcon(player.championName),
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
              }}
            resizeMode='cover'
          />
        </View>
        <View className='flex-column gap-2 my-auto'>
          <Image
            className='border border-dark-6'
            source={{
              uri: DDragon.getSummonerSpell(player.summoner1Id),
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
              }
            }
            }
            height={31}
            width={31}
          />
          <Image
            className='border border-dark-6'
            source={{
              uri: DDragon.getSummonerSpell(player.summoner2Id),
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
              }
            }
            }
            height={31}
            width={31}
          />
        </View>
        <View className='flex-2 flex-row w-2/3 bg-dark-3 rounded-r-2xl'>
          <View className='flex-1'>
            <Text className='text-lg text-center font-semibold text-dark-7'>{player.win ? 'Victory' : 'Defeat'}</Text>
            <Text className='text-base text-center text-dark-6'>{`${player.kills}/${player.deaths}/${player.assists}`}</Text>
            <Text className='text-sm text-center text-dark-6'>{`KDA: ${calculateKDA(player.kills, player.deaths, player.assists)}`}</Text>
          </View>
          <View className='px-2 py-1 flex-1 flex-column min-h-[70px] w-1/2 gap-1 rounded-r-2xl'>
            <View className='flex-row gap-1 flex-1'>
              <View className='player-item'>
                <ImageContainer
                  src={DDragon.getItem(player.item0)}
                />
              </View>
              <View className='player-item'>
                <ImageContainer
                  src={DDragon.getItem(player.item1)}
                />
              </View>
              <View className='player-item'>
                <ImageContainer
                  src={DDragon.getItem(player.item2)}
                />
              </View>
            </View>
            <View className='flex-row gap-1 flex-1'>
              <View className='player-item'>
                <ImageContainer
                  src={DDragon.getItem(player.item3)}
                />
              </View>
              <View className='player-item'>
                <ImageContainer
                  src={DDragon.getItem(player.item4)}
                />
              </View>
              <View className='player-item'>
                <ImageContainer
                  src={DDragon.getItem(player.item5)}
                />
              </View>
            </View>
          </View>
        </View>
      </View >
    </Link >
  )
}
export default MatchCard
