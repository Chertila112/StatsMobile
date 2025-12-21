import * as z from 'zod'

export const SummonerRankSchema = z.object({
  queueType: z.string(),
  tier: z.string(),
  rank: z.string(),
  wins: z.number(),
  losses: z.number(),
})

export type SummonerRank = z.infer<typeof SummonerRankSchema>;


export type Summoner = {
  username: string,
  tag: string,
  region: string,
}




