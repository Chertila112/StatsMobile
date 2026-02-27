import { event, MatchTimeline, participantEvents } from "@/types/matchTimeline"
import { useMemo } from "react"

export type ChampionKillEvent = Extract<event, { type: "CHAMPION_KILL" }>;

function isParticipantKillEvent(
  e: event,
  participantId: number,
): e is ChampionKillEvent {
  if (e.type !== "CHAMPION_KILL")
    return false;
  const killEvent = e as ChampionKillEvent;
  return killEvent.killerId === participantId;
}

export const useEvents = (participantId: number, data: MatchTimeline | undefined): participantEvents => {
  if (!data)
    return { participantId: -1, events: [] };

  return useMemo(() => {

    const allEvents = data.info.frames.flatMap(f => f.events);

    const filteredEvents = allEvents.filter((e): e is ChampionKillEvent =>
      isParticipantKillEvent(e, participantId)
    );
    return { participantId: participantId, events: filteredEvents }
  }, [data, participantId])
}
