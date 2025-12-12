import { StyleSheet, Text, View } from 'react-native'
import { UserData } from '@/types/types'
const UserCard = (data: UserData) => {
  return (
    <View className='border'>
      <Text>
        {data.username}
      </Text>
      <Text>
        {data.queueType}
      </Text>
      <Text>
        {data.rank}
      </Text>
      <Text>
        {data.tier}
      </Text>
    </View>
  )
}

export default UserCard

