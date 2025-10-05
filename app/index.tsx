import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍉 Fruit Farm App 🍎</Text>
      <Text style={styles.subtitle}>เลือกหน้าที่คุณต้องการ:</Text>

      <View style={styles.buttonContainer}>
        <Button title="ดูรายการผลไม้" onPress={() => router.push("/fruits")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  buttonContainer: { marginVertical: 10, width: "60%" },
});
