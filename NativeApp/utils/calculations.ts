import { Participant, SummonerRank } from "@/types/types"

export const calculateWinRate = (data: SummonerRank) => (data?.wins / (data?.losses + data?.wins) * 100).toFixed(1);

export const calculateFarm = (player: Participant) => player.neutralMinionsKilled + player.totalMinionsKilled;

export const calculateKDA = (kills: number, deaths: number, assists: number) => deaths != 0 ? ((kills + assists) / deaths).toFixed(2) : (kills + assists);


