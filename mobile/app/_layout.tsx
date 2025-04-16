import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export default function RootLayout() {
  const queryClient = new QueryClient();

  return ( 
  <QueryClientProvider client={queryClient}>
    <Stack> 
      <Stack.Screen
        name="index"
        options={{
          // Para tirar o Header do app
          headerShown: false
        }}
      />
      <Stack.Screen
        name="step/index"
        options={{
          // Para tirar o Header do app
          headerShown: false
        }}
      />

      <Stack.Screen
        name="create/index"
        options={{
          // Para tirar o Header do app
          headerShown: false
        }}
      />

      <Stack.Screen
        name="nutrition/index"
        options={{
          // Para tirar o Header do app
          headerShown: false
        }}
      />
    </Stack>
  </QueryClientProvider>
  );
}
