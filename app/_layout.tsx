import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "หน้าแรก" }} />
      <Stack.Screen name="fruits" options={{ title: "รายการผลไม้" }} />
      <Stack.Screen name="fruit/create" options={{ title: "เพิ่มผลไม้ใหม่" }} />
      <Stack.Screen name="fruit/[id]" options={{ title: "แก้ไขผลไม้" }} />
    </Stack>
  );
}
