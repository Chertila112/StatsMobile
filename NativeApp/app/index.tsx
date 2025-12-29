import { View, Animated, Easing } from "react-native";
import SummonerSearch from "@/components/user/SummonerSearch";
import { useEffect, useRef, useState } from "react";
import { Summoner } from "@/types/types";
import MainStats from "@/components/layout/MainStats";

export default function Index() {
  const [summonerContext, setSummonerContext] = useState<Summoner | null>(null);
  const translateY = useRef(new Animated.Value(300)).current;

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

  return (
    <View
      className="bg-dark-1 flex-1 justify-start pt-10">
      <Animated.View
        style={{ transform: [{ translateY }] }}>
        <SummonerSearch setContext={setSummonerContext}></SummonerSearch>
      </Animated.View>
      {summonerContext && <MainStats summoner={summonerContext}></MainStats>}
    </View>
  );
}
