import { Stack } from "expo-router";

export default function RootLayout() {
  return ( 
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
  );
}
