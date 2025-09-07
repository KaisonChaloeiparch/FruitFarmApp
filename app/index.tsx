import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍏 ยินดีต้อนรับสู่ FruitFarmApp</Text>
      <Text style={styles.subtitle}>ผลผลิตสดใหม่จากสวนของเรา</Text>
      <Button title="ดูผลผลิต" onPress={() => router.push("/fruits")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "gray"
  }
});
