import { SummonerSpellMap } from "@/values/summonerSpells";
import { useVersion } from "@/hooks/useVersion";


export const DDragon = {
  getChampionIcon: (championName: string) => {
    const version = useVersion.getState().version;
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`
  },

  getItem: (itemId: number) => {
    const version = useVersion.getState().version;
    return `http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId.toString()}.png`
  },
  getAbility: (championName: string, ability: string) => {
    return `https://cdn.communitydragon.org/latest/champion/${championName}/ability-icon/${ability}`
  },
  getSummonerSpell: (summonerSpellId: number) => {
    const version = useVersion.getState().version;
    return `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${SummonerSpellMap[summonerSpellId]}.png`
  }

};

useVersion.getState().fetchVersion();
