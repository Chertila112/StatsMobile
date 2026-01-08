import { View, Animated, Easing } from "react-native";
import SummonerSearch from "@/components/user/SummonerSearch";
import { useEffect, useRef, useState } from "react";
import { Summoner } from "@/types/types";
import MainStats from "@/components/layout/MainStats";
import { useQueryClient } from "@tanstack/react-query";

export default function Index() {
  const [summonerContext, setSummonerContext] = useState<Summoner | null>(null);
  const translateY = useRef(new Animated.Value(300)).current;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (summonerContext) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    }
  }, [summonerContext]);

  const handleSearch = (newSummoner: Summoner) => {
    if (
      newSummoner.username !== summonerContext?.username ||
      newSummoner.tag !== summonerContext?.tag ||
      newSummoner.region !== summonerContext?.region
    ) {
      setSummonerContext(newSummoner);
    }
    queryClient.invalidateQueries({ queryKey: ['rank', newSummoner.username, newSummoner.tag, newSummoner.region] });
  };

  return (
    <View
      className="bg-dark-1 flex-1 justify-start pt-10">
      <Animated.View
        style={{ transform: [{ translateY }] }}>
        <SummonerSearch setContext={handleSearch}></SummonerSearch>
      </Animated.View>
      {summonerContext && <MainStats summoner={summonerContext}></MainStats>}
    </View>
  );
}
