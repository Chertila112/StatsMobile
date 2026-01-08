import { queryOptions } from "@tanstack/react-query"
import { getTimeline } from "@/api/getTimeline"



export function timelineOptions(matchId: string) {
  return queryOptions({
    queryKey: ['timeline', matchId],
    queryFn: () => getTimeline(matchId),
    refetchOnWindowFocus: false,
    enabled: !!matchId
  })
}


