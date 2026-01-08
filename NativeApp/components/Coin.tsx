import { Text, View } from 'react-native'

const Coin = () => {
  return (
    <View
      className='bg-yellow-200 rounded-full h-[1rem] w-[1rem]'
      style={{
        outlineWidth: 1,
        outlineOffset: 1,
        outlineColor: '#FFF075',
        position: 'relative'
      }}>
      <Text
        style={{
          position: 'absolute',
          top: -3,
          left: -1,
          right: 0,
          bottom: 0,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          includeFontPadding: false
        }}>
        c
      </Text>
    </View>
  )
}

export default Coin

