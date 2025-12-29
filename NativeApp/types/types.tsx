import * as z from 'zod'

export const SummonerRankSchema = z.object({
  puuid: z.string(),
  queueType: z.string(),
  tier: z.string(),
  rank: z.string(),
  wins: z.number(),
  losses: z.number(),
  username: z.string(),
  tag: z.string(),
  region: z.string(),
  iconId: z.number(),
  level: z.number(),
  version: z.string(),
  leaguePoints: z.number(),
  matchesIds: z.array(z.string())
})

export type SummonerRank = z.infer<typeof SummonerRankSchema>;

export const ParticipantSchema =
  z.object({
    allInPings: z.number(),
    assistMePings: z.number(),
    assists: z.number(),
    baronKills: z.number(),
    basicPings: z.number(),
    champExperience: z.number(),
    champLevel: z.number(),
    championId: z.number(),
    championName: z.string(),
    championTransform: z.number(),
    commandPings: z.number(),
    consumablesPurchased: z.number(),
    damageDealtToBuildings: z.number(),
    damageDealtToObjectives: z.number(),
    damageDealtToTurrets: z.number(),
    damageSelfMitigated: z.number(),
    dangerPings: z.number(),
    deaths: z.number(),
    detectorWardsPlaced: z.number(),
    doubleKills: z.number(),
    dragonKills: z.number(),
    eligibleForProgression: z.boolean(),
    enemyMissingPings: z.number(),
    enemyVisionPings: z.number(),
    firstBloodAssist: z.boolean(),
    firstBloodKill: z.boolean(),
    firstTowerAssist: z.boolean(),
    firstTowerKill: z.boolean(),
    gameEndedInEarlySurrender: z.boolean(),
    gameEndedInSurrender: z.boolean(),
    getBackPings: z.number(),
    goldEarned: z.number(),
    goldSpent: z.number(),
    holdPings: z.number(),
    individualPosition: z.string(),
    inhibitorKills: z.number(),
    inhibitorTakedowns: z.number(),
    inhibitorsLost: z.number(),
    item0: z.number(),
    item1: z.number(),
    item2: z.number(),
    item3: z.number(),
    item4: z.number(),
    item5: z.number(),
    item6: z.number(),
    itemsPurchased: z.number(),
    killingSprees: z.number(),
    kills: z.number(),
    lane: z.string(),
    largestCriticalStrike: z.number(),
    largestKillingSpree: z.number(),
    largestMultiKill: z.number(),
    longestTimeSpentLiving: z.number(),
    magicDamageDealt: z.number(),
    magicDamageDealtToChampions: z.number(),
    magicDamageTaken: z.number(),
    needVisionPings: z.number(),
    neutralMinionsKilled: z.number(),
    nexusKills: z.number(),
    nexusLost: z.number(),
    nexusTakedowns: z.number(),
    objectivesStolen: z.number(),
    objectivesStolenAssists: z.number(),
    onMyWayPings: z.number(),
    participantId: z.number(),
    pentaKills: z.number(),
    perks: z.object({
      statPerks: z.object({
        defense: z.number(),
        flex: z.number(),
        offense: z.number()
      }),
      styles: z.array(
        z.object({
          description: z.string(),
          selections: z.array(
            z.object({
              perk: z.number(),
              var1: z.number(),
              var2: z.number(),
              var3: z.number()
            })
          ),
          style: z.number()
        })
      )
    }),
    physicalDamageDealt: z.number(),
    physicalDamageDealtToChampions: z.number(),
    physicalDamageTaken: z.number(),
    placement: z.number(),
    playerAugment1: z.number(),
    playerAugment2: z.number(),
    playerAugment3: z.number(),
    playerAugment4: z.number(),
    playerAugment5: z.number(),
    playerAugment6: z.number(),
    playerSubteamId: z.number(),
    profileIcon: z.number(),
    pushPings: z.number(),
    puuid: z.string(),
    quadraKills: z.number(),
    retreatPings: z.number(),
    riotIdGameName: z.string(),
    riotIdTagline: z.string(),
    role: z.string(),
    sightWardsBoughtInGame: z.number(),
    spell1Casts: z.number(),
    spell2Casts: z.number(),
    spell3Casts: z.number(),
    spell4Casts: z.number(),
    subteamPlacement: z.number(),
    summoner1Casts: z.number(),
    summoner1Id: z.number(),
    summoner2Casts: z.number(),
    summoner2Id: z.number(),
    summonerId: z.string(),
    summonerLevel: z.number(),
    summonerName: z.string(),
    teamEarlySurrendered: z.boolean(),
    teamId: z.number(),
    teamPosition: z.string(),
    timeCCingOthers: z.number(),
    timePlayed: z.number(),
    totalAllyJungleMinionsKilled: z.number(),
    totalDamageDealt: z.number(),
    totalDamageDealtToChampions: z.number(),
    totalDamageShieldedOnTeammates: z.number(),
    totalDamageTaken: z.number(),
    totalEnemyJungleMinionsKilled: z.number(),
    totalHeal: z.number(),
    totalHealsOnTeammates: z.number(),
    totalMinionsKilled: z.number(),
    totalTimeCCDealt: z.number(),
    totalTimeSpentDead: z.number(),
    totalUnitsHealed: z.number(),
    tripleKills: z.number(),
    trueDamageDealt: z.number(),
    trueDamageDealtToChampions: z.number(),
    trueDamageTaken: z.number(),
    turretKills: z.number(),
    turretTakedowns: z.number(),
    turretsLost: z.number(),
    unrealKills: z.number(),
    visionClearedPings: z.number(),
    visionScore: z.number(),
    visionWardsBoughtInGame: z.number(),
    wardsKilled: z.number(),
    wardsPlaced: z.number(),
    win: z.boolean()
  });

export type Participant = z.infer<typeof ParticipantSchema>

export const MatchInfoSchema = z.object({
  metadata: z.object({
    dataVersion: z.string(),
    matchId: z.string(),
    participants: z.array(z.string())
  }),
  info: z.object({
    endOfGameResult: z.string(),
    gameCreation: z.number(),
    gameDuration: z.number(),
    gameEndTimestamp: z.number(),
    gameId: z.number(),
    gameMode: z.string(),
    gameName: z.string(),
    gameStartTimestamp: z.number(),
    gameType: z.string(),
    gameVersion: z.string(),
    mapId: z.number(),
    participants: z.array(ParticipantSchema),
    platformId: z.string(),
    queueId: z.number(),
    teams: z.array(
      z.object({
        bans: z.array(
          z.object({ championId: z.number(), pickTurn: z.number() })
        ),
        feats: z.object({
          EPIC_MONSTER_KILL: z.object({ featState: z.number() }),
          FIRST_BLOOD: z.object({ featState: z.number() }),
          FIRST_TURRET: z.object({ featState: z.number() })
        }),
        objectives: z.object({
          atakhan: z.object({ first: z.boolean(), kills: z.number() }),
          baron: z.object({ first: z.boolean(), kills: z.number() }),
          champion: z.object({ first: z.boolean(), kills: z.number() }),
          dragon: z.object({ first: z.boolean(), kills: z.number() }),
          horde: z.object({ first: z.boolean(), kills: z.number() }),
          inhibitor: z.object({ first: z.boolean(), kills: z.number() }),
          riftHerald: z.object({ first: z.boolean(), kills: z.number() }),
          tower: z.object({ first: z.boolean(), kills: z.number() })
        }),
        teamId: z.number(),
        win: z.boolean()
      })
    ),
    tournamentCode: z.string()
  })
}).passthrough();

export type MatchInfo = z.infer<typeof MatchInfoSchema>

export type Summoner = {
  username: string,
  tag: string,
  region: string,
}




