import { Stack } from "expo-router";
import './globals.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { Text } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{
        contentStyle: {
          backgroundColor: '#1a1a1a'
        },
        headerShown: false
      }}>
      </Stack>
    </QueryClientProvider>
  )
}
