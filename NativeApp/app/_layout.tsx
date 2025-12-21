import { Stack } from "expo-router";
import './globals.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    </QueryClientProvider>
  )
}
