import { SummonerRank } from '@/types/types'
import { Image, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'




interface UserCardProps {
  user: SummonerRank,
}

const UserCard = ({ user }: UserCardProps) => {

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
        <View className='justify-start p-2 rounded-3xl gap-2 bg-dark-2'>
          <View className='flex-row gap-1 p-1 bg-dark-3 rounded-2xl overflow-hidden h-[50px]'>
            <Image
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${user.iconId}.jpg`}
              className='h-full border rounded-xl'
              width={40}
              height={40}
            ></Image>
            <View className='flex-column'>
              <Text className='text-dark-7 font-bold text-sm'>{user?.username}</Text>
              <Text className='text-dark-6'>lvl: {user?.level}</Text>
            </View>
          </View>
          <View className='bg-dark-3 rounded-2xl'>
            <Text className='text-dark-7 font-semibold w-full text-center text-base'>
              {`${user?.tier} ${user?.rank}`}
            </Text>
            <View className='flex-row'>
              <Image
                src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/${user?.tier.toLowerCase()}.png`}
                height={80}
                width={80}
              ></Image>
              <View className='mt-2'>
                <Text className='text-dark-6 text-sm'>LP: {user?.leaguePoints}</Text>
                <Text className='text-dark-6 text-sm'>Won: {user?.wins}</Text>
                <Text className='text-dark-6 text-sm'>Lost: {user?.losses}</Text>
              </View>
            </View>
          </View>
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
export default UserCard
