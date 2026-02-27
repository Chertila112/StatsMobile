import { Participant } from "@/types/types";
import { View, Text } from 'react-native'
import MatchParticipant from "../match/MatchParticipant";


interface TeamColumnProps {
  players: Participant[];
  didWin?: boolean;
  align: 'start' | 'end';
}

interface TeamStats {
  kills: number,
  deaths: number,
  assists: number,
}

const TeamColumn = ({ players, didWin, align }: TeamColumnProps) => {
  const textColor = didWin ? 'text-green-500' : 'text-red-500';
  const alignClass = align === 'end' ? 'items-end' : '';

  const teamStat: TeamStats = {
    kills: 0,
    deaths: 0,
    assists: 0
  }

  players.forEach((p: Participant) => {
    teamStat.kills += p.kills;
    teamStat.deaths += p.deaths;
    teamStat.assists += p.assists;
  }
  )

  return (
    <View className={`flex-column flex-1 ${alignClass}`}>
      <View className={`${align === 'end' ? 'flex-row-reverse' : 'flex-row'} items-center gap-2`}>
        <Text className={`font-bold text-xl ${textColor}`}>
          {didWin ? 'Victory' : 'Defeat'}
        </Text>
        <Text className="text-dark-6">{`${teamStat.kills}/${teamStat.deaths}/${teamStat.assists}`}</Text>
      </View>
      {players.map((player) => (
        <MatchParticipant key={player.puuid} player={player} />
      ))}
    </View>
  );
};

export default TeamColumn;
