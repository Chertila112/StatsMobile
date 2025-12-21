import getRankedStats from "@/api/getRankedStats";
import { Summoner } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useRankStats = (props: Summoner | null) => {
  return useQuery({
    queryKey: ['rank', props?.username, props?.tag, props?.region],
    queryFn: () => getRankedStats(props!.username, props!.tag, props!.region),
    enabled: !!props,
    refetchOnWindowFocus: false,
    retry: false,
  }
  )
}



