import { getMatches } from "@/api/getMatches";
import { useQuery } from "@tanstack/react-query";

export const useMatches = (username: string, tag: string, region: string) => {
  return useQuery({
    queryKey: ['matches', username, tag, region],
    queryFn: () => getMatches(username, tag, region),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!username && !!tag && !!region,
  }
  )
}
