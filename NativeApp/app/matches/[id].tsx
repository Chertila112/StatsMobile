import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const Match = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>match {id}</Text>
    </View>
  )
}

export default Match

