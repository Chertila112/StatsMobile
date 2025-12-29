import { get_match } from "@/api/getMatch"
import { useQuery } from "@tanstack/react-query"


export const useMatch = (matchId: string) => {
  return useQuery(
    {
      queryKey: ['match', matchId],
      queryFn: () => get_match(matchId),
      enabled: !!matchId,
      refetchOnWindowFocus: false,
      retry: false,
    }
  )
}
