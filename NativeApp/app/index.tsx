import { View } from "react-native";
import SummonerSearch from "@/components/SummonerSearch";

export default function Index() {
  return (
    <View className="bg-dark-primary flex-1 justify-center items-center">
      <SummonerSearch></SummonerSearch>
    </View>
  );
}