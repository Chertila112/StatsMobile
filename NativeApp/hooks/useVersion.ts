import { create } from 'zustand'


interface versionState {
  version: string,
  fetchVersion: () => Promise<void>;
}

export const useVersion = create<versionState>((set) => ({
  version: "15.24.1",
  fetchVersion: async () => {
    try {
      const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
      const versions = await response.json() as string[];
      set({ version: versions[0] });
    } catch (error) {
      console.error('Failed to fetch DDragon version:', error);
    }
  },
}))
