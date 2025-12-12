import fetchRankedStats from "@/api/fetchRankedStats";
import { useQuery } from "@tanstack/react-query";

const useRankedStats() => {
  return useQuery({
    queryKey =['ranked'],
    queryFn = fetchRankedStats,
  }
  )
}
