import { MatchContext } from '@/app/match/[id]';
import { ChampionKillEvent } from '@/hooks/memo/useEvents';
import { event } from '@/types/matchTimeline';
import React, { ReactNode, useContext, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated';
import ImageContainer from './ImageContainer';
import { DDragon } from '@/utils/ddragon';
import { Image } from 'expo-image';
import AbilityDamage from './AbilityDamage';




interface KillDetailsProps {
  children: ReactNode;
  event: event;
  settings: {
    height: number,
    width: number,
    position: {
      x: number,
      y: number
    }
  }
}

//closer to left side => 0 | in the middle => actual position centered | closer to right => sticked to the right side
//unreadable horseshit idk why, but let it be
const dynamicPos = (x: number, width: number): number => x < 120 ? 0 : (x > 200 ? 300 - x : x - width / 2)

const KillDetails = ({ settings, event, children }: KillDetailsProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const matchData = useContext(MatchContext);
  const styles = {
    height: 130,
    width: 250,
    offset: 40
  }
  const data = event as ChampionKillEvent;

  return (
    <>
      {visible && <Animated.View
        entering={FadeInDown.duration(200)}
        style={{
          width: 'auto',
          height: styles.height,
          position: 'absolute',
          borderRadius: 16,
          backgroundColor: '#282C3E',
          bottom: settings.position.y + styles.offset,
          left: dynamicPos(settings.position.x, styles.width),
          zIndex: 10,
          padding: 4,
          display: 'flex'
        }}>
        {matchData && <View className='flex-row flex-1 p-2'>
          <View
            style={{
              width: 'auto',
              height: 100,
              marginHorizontal: 4,
            }}
            className='items-center'>
            <ImageContainer
              style={{
                height: 40,
                width: 40,
                borderWidth: 1,
                borderColor: '#9e9e9e',
                borderRadius: 8
              }}
              src={DDragon.getChampionIcon(matchData.currentPlayer.championName)} />
            <Image
              source={require('../assets/images/down.png')}
              style={{
                height: 25,
                width: 25
              }}
            />
            <ImageContainer
              style={{
                height: 40,
                width: 40,
                borderWidth: 1,
                borderColor: '#9e9e9e',
                borderRadius: 8
              }}
              src={DDragon.getChampionIcon(matchData.matchData.info.participants.find(p => p.participantId === data.victimId)!.championName)} />
          </View>
          <View className='flex-2 flex-row gap-1 w-auto justify-start'>
            <AbilityDamage damageData={data}>
            </AbilityDamage>
          </View>
        </View>
        }
      </Animated.View>}
      <Pressable
        style={{
          position: 'absolute',
          bottom: settings.position.y,
          left: settings.position.x,
          height: settings.height + 8,
          backgroundColor: 'white',
          opacity: 0.75,
          width: settings.width + 8,
          borderRadius: 50,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPressIn={() => setVisible(true)}
        onPressOut={() => setVisible(false)}>
        {children}
      </Pressable>
    </>
  )
}

export default KillDetails

