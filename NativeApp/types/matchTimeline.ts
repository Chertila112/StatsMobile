import z from "zod";


const PositionSchema = z.object({
  x: z.number(),
  y: z.number()
});

const ChampionStatsSchema = z.object({
  abilityHaste: z.number(),
  abilityPower: z.number(),
  armor: z.number(),
  armorPen: z.number(),
  armorPenPercent: z.number(),
  attackDamage: z.number(),
  attackSpeed: z.number(),
  bonusArmorPenPercent: z.number(),
  bonusMagicPenPercent: z.number(),
  ccReduction: z.number(),
  cooldownReduction: z.number(),
  health: z.number(),
  healthMax: z.number(),
  healthRegen: z.number(),
  lifesteal: z.number(),
  magicPen: z.number(),
  magicPenPercent: z.number(),
  magicResist: z.number(),
  movementSpeed: z.number(),
  omnivamp: z.number(),
  physicalVamp: z.number(),
  power: z.number(),
  powerMax: z.number(),
  powerRegen: z.number(),
  spellVamp: z.number()
});

const DamageStatsSchema = z.object({
  magicDamageDone: z.number(),
  magicDamageDoneToChampions: z.number(),
  magicDamageTaken: z.number(),
  physicalDamageDone: z.number(),
  physicalDamageDoneToChampions: z.number(),
  physicalDamageTaken: z.number(),
  totalDamageDone: z.number(),
  totalDamageDoneToChampions: z.number(),
  totalDamageTaken: z.number(),
  trueDamageDone: z.number(),
  trueDamageDoneToChampions: z.number(),
  trueDamageTaken: z.number()
});

const VictimDamageSchema = z.object({
  basic: z.boolean(),
  magicDamage: z.number(),
  name: z.string(),
  participantId: z.number(),
  physicalDamage: z.number(),
  spellName: z.string(),
  spellSlot: z.number(),
  trueDamage: z.number(),
  type: z.string()
});

const BaseEventSchema = z.object({
  timestamp: z.number(),
  type: z.string()
});

const PauseEndEventSchema = BaseEventSchema.extend({
  realTimestamp: z.number().optional(),
  type: z.literal('PAUSE_END')
});

const ItemPurchasedEventSchema = BaseEventSchema.extend({
  itemId: z.number(),
  participantId: z.number(),
  type: z.literal('ITEM_PURCHASED')
});

const ItemDestroyedEventSchema = BaseEventSchema.extend({
  itemId: z.number(),
  participantId: z.number(),
  type: z.literal('ITEM_DESTROYED')
});

const SkillLevelUpEventSchema = BaseEventSchema.extend({
  levelUpType: z.string(),
  participantId: z.number(),
  skillSlot: z.number(),
  type: z.literal('SKILL_LEVEL_UP')
});

const LevelUpEventSchema = BaseEventSchema.extend({
  level: z.number(),
  participantId: z.number(),
  type: z.literal('LEVEL_UP')
});

const WardPlacedEventSchema = BaseEventSchema.extend({
  creatorId: z.number(),
  wardType: z.string(),
  type: z.literal('WARD_PLACED')
});

const ChampionKillEventSchema = BaseEventSchema.extend({
  bounty: z.number(),
  killStreakLength: z.number(),
  killerId: z.number(),
  position: PositionSchema,
  shutdownBounty: z.number(),
  victimDamageDealt: z.array(VictimDamageSchema),
  victimDamageReceived: z.array(VictimDamageSchema),
  victimId: z.number(),
  assistingParticipantIds: z.array(z.number()).optional(),
  type: z.literal('CHAMPION_KILL')
});

const TurretPlateDestroyedEventSchema = BaseEventSchema.extend({
  killerId: z.number(),
  laneType: z.string(),
  position: PositionSchema,
  teamId: z.number(),
  type: z.literal('TURRET_PLATE_DESTROYED')
});

const EventSchema = z.union([
  PauseEndEventSchema,
  ItemPurchasedEventSchema,
  ItemDestroyedEventSchema,
  SkillLevelUpEventSchema,
  LevelUpEventSchema,
  WardPlacedEventSchema,
  ChampionKillEventSchema,
  TurretPlateDestroyedEventSchema,
  BaseEventSchema
]);

const ParticipantFrameSchema = z.object({
  championStats: ChampionStatsSchema,
  currentGold: z.number(),
  damageStats: DamageStatsSchema,
  goldPerSecond: z.number(),
  jungleMinionsKilled: z.number(),
  level: z.number(),
  minionsKilled: z.number(),
  participantId: z.number(),
  position: PositionSchema,
  timeEnemySpentControlled: z.number(),
  totalGold: z.number(),
  xp: z.number()
});

export type ParticipantFrame = z.infer<typeof ParticipantFrameSchema>;

const FrameSchema = z.object({
  events: z.array(EventSchema),
  participantFrames: z.record(z.string(), ParticipantFrameSchema),
  timestamp: z.number()
});

const MetadataSchema = z.object({
  dataVersion: z.string(),
  matchId: z.string(),
  participants: z.array(z.string())
});

const InfoSchema = z.object({
  endOfGameResult: z.string(),
  frameInterval: z.number(),
  frames: z.array(FrameSchema)
});

export const MatchTimelineSchema = z.object({
  metadata: MetadataSchema,
  info: InfoSchema
});

export type MatchTimeline = z.infer<typeof MatchTimelineSchema>;
