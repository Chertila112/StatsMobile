import { Image } from 'react-native'

interface ImageContainerProps {
  src: string,
  className?: string,
}

const ImageContainer = ({ src, className }: ImageContainerProps) => {
  return (
    <Image
      className={'h-full w-full ' + className}
      source={{
        uri: src,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }}
      resizeMode='cover'>
    </Image>
  )
}

export default ImageContainer

