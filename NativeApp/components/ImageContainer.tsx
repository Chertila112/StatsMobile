import { ImageStyle, StyleProp, View } from 'react-native'
import { Image } from 'expo-image'

interface ImageContainerProps {
  src: string,
  className?: string,
  style?: StyleProp<ImageStyle>
}
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const ImageContainer = ({ style, src, className }: ImageContainerProps) => {
  return (
    <View className={className}>
      <Image
        style={!style ? { width: '100%', height: '100%' } : style}
        source={{
          uri: src,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        }}
        placeholder={{ blurhash }}
        contentFit='cover'
        cachePolicy={'disk'}>
      </Image>
    </View>
  )
}

export default ImageContainer

