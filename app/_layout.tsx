// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "หน้าแรก 🍎", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="fruits"
          options={{ title: "รายการผลไม้ 🍇", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="OrderScreen"
          options={{ title: "สั่งซื้อผลไม้ 🛒", headerTitleAlign: "center" }}
        />
      </Stack>
    </>
  );
}
