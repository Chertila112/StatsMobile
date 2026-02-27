import { MatchContext } from '@/app/match/[id]'
import { ChampionKillEvent, useEvents } from '@/hooks/memo/useEvents'
import { event, MatchTimeline } from '@/types/matchTimeline'
import { useContext } from 'react'
import { Image, ImageBackground, Pressable, View } from 'react-native'
import KillDetails from '../KillDetails'
import CardWrapperShadow from '../CardWrapperShadow'


interface MinimapData {
  height: number,
  width: number,
}

interface EventData {
  height: number,
  width: number
  position: {
    x: number,
    y: number
  }
}
interface MinimapProps {
  timelineData: MatchTimeline,
  participantId: number
}

const Minimap = ({ participantId, timelineData }: MinimapProps) => {
  const match = useContext(MatchContext);
  console.log(match);
  const events = useEvents(participantId, timelineData);

  const minimapSettings: MinimapData = {
    height: 355,
    width: 355,
  }
  return (
    <ImageBackground
      source={require('../../assets/images/minimap.png')}
      imageStyle={{
        marginVertical: 2,
        borderRadius: 16,
        borderWidth: 4,
        borderColor: '#232323',
        backgroundColor: '#343434',
      }}
      style={{
        height: minimapSettings.height,
        width: minimapSettings.width,
      }}
    >
      <View className=' h-full'>

        {events.events.map((e, index) => {
          const WIDTH = 12;
          const HEIGHT = 12;
          const killEvent = e as ChampionKillEvent;
          const kill: EventData = {
            height: HEIGHT,
            width: WIDTH,
            position: {
              x: killEvent.position.x / 15000 * minimapSettings.width - WIDTH / 2,
              y: killEvent.position.y / 15200 * (minimapSettings.height - 10) - HEIGHT / 2,
            }
          }
          return (
            <KillDetails
              key={index}
              event={killEvent}
              settings={kill}>
              <View
              >
                <Image
                  source={require('@/assets/images/swords.png')}
                  style={{
                    height: kill.height,
                    width: kill.width,
                  }}>
                </Image>
              </View>
            </KillDetails>
          )
        }
        )}
      </View>
    </ImageBackground>
  )
}

export default Minimap

