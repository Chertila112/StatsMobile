import { create } from 'zustand';
import { Participant } from '@/types/types';

interface PlayerStore {
  currentPlayer: Participant | null;
  setCurrentPlayer: (player: Participant | null) => void;
  clearCurrentPlayer: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentPlayer: null,
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  clearCurrentPlayer: () => set({ currentPlayer: null })
}));
