import React, { useContext, useMemo } from 'react';
import { View, Text } from 'react-native';
import { ChampionKillEvent } from '@/hooks/memo/useEvents';
import { MatchContext } from '@/app/match/[id]';
import ImageContainer from './ImageContainer';
import { DDragon } from '@/utils/ddragon';

interface AbilityDamageProps {
  damageData: ChampionKillEvent;
}

interface DamageSpell {
  originalName: string;
  key: string;
  totalDamage: number;
  mDamage: number,
  tDamage: number,
  pDamage: number,
  iconUrl: string;
}

const AUTO_ATTACK_ICON = 'https://raw.communitydragon.org/latest/game/assets/ux/deathrecap/autoattack.png';

const AbilityDamage = ({ damageData }: AbilityDamageProps) => {
  const matchData = useContext(MatchContext);

  const sortedSpells = useMemo<DamageSpell[]>(() => {
    if (!matchData?.currentPlayer) return [];

    const { participantId, championName } = matchData.currentPlayer;

    return damageData.victimDamageReceived
      .filter(
        (event) =>
          event.participantId === participantId &&
          event.spellName?.length > 0
      )
      .map((event) => {
        let rawKey: string;
        switch (event.spellSlot) {
          case 0:
            rawKey = 'q';
            break;
          case 1:
            rawKey = 'w';
            break;
          case 2:
            rawKey = 'e';
            break;
          case 3:
            rawKey = 'r';
            break;
          case 63:
            rawKey = 'p';
            break;
          default:
            rawKey = 'b';
        }
        const isAutoAttack = rawKey === 'b' || event.spellName.includes('basicattack');

        const url = !isAutoAttack
          ? DDragon.getAbility(championName, rawKey)
          : AUTO_ATTACK_ICON;
        return {
          originalName: event.spellName,
          key: rawKey,
          totalDamage: event.physicalDamage + event.magicDamage + event.trueDamage,
          mDamage: event.magicDamage,
          pDamage: event.physicalDamage,
          tDamage: event.trueDamage,
          iconUrl: url,
        };
      })
      .sort((a, b) => b.totalDamage - a.totalDamage);
  }, [damageData, matchData]);

  const maxDamage = sortedSpells[0].totalDamage;
  const heights: number[] = sortedSpells.flatMap(v => Math.max(v.totalDamage / maxDamage) * 70, 1);
  console.log(sortedSpells);
  if (!matchData) return null;

  return (
    <View className="flex-row gap-1">
      {sortedSpells.map((spell, index) => {
        return (
          <View key={index}
            className='flex-row'>
            <DamageBarItem
              height={heights[index]}
              spell={spell}
            />
          </View>
        )
      }
      )}
    </View>
  );
};

const DamageBarItem = ({ height, spell }: { height: number, spell: DamageSpell }) => (
  <View className="gap-1 items-center">
    <ImageContainer
      style={{ width: 20, height: 20 }}
      src={spell.iconUrl}
    />
    <View
      style={{
        width: 20,
        height: height,
        borderWidth: 1,
        backgroundColor: '#9a9a9a'
      }}
    />
    <Text className='text-dark-7 text-sm'>{spell.totalDamage}</Text>
  </View>
);

export default AbilityDamage;
