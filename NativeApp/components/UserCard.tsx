import { StyleSheet, Text, View } from 'react-native'
import { UserData } from '@/types/types'
const UserCard = (data: UserData) => {
  return (
    <View className='bg-dark-secondary border'>
      <Text>
        SwaGGMaster69
      </Text>
      <Text>
        Solo Ranked 5v5
      </Text>
      <Text>
        Platinum
      </Text>
      <Text>
        III
      </Text>
    </View>
  )
}

export default UserCard

