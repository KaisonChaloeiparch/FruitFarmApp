import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { getFruits, deleteFruit } from "@/utils/fruit-storage";
import { Fruit } from "@/utils/types";

export default function FruitDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [fruit, setFruit] = useState<Fruit | null>(null);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      const fruits = await getFruits();
      const f = fruits.find((x) => x.id === id) || null;
      setFruit(f);

      // set title
      navigation.setOptions({ title: f?.name || "รายละเอียดผลไม้" });
    };
    load();
  }, [id]);

  const handleDelete = () => {
    if (!fruit) return;
    Alert.alert("ลบผลไม้", "ยืนยันการลบรายการนี้?", [
      { text: "ยกเลิก", style: "cancel" },
      {
        text: "ลบ",
        style: "destructive",
        onPress: async () => {
          await deleteFruit(fruit.id);
          router.push("/fruit"); // กลับไปหน้า list
        },
      },
    ]);
  };

  if (!fruit)
    return (
      <View style={styles.center}>
        <Text>ไม่พบผลไม้นี้</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {fruit.image && <Image source={{ uri: fruit.image }} style={styles.image} />}
      <Text style={styles.title}>{fruit.name}</Text>
      <Text style={styles.desc}>สี: {fruit.color}</Text>
      <Text style={styles.price}>ราคา: {fruit.price} ฿</Text>
      <Text style={styles.desc}>คงเหลือ: {fruit.stock || 0}</Text>

      <View style={{ marginTop: 16 }}>
        <Button
          title="แก้ไข"
          onPress={() =>
            router.push({
              pathname: "/fruit/edit/[id]",
              params: { id: fruit.id },
            })
          }
        />
        <View style={{ height: 8 }} />
        <Button title="ลบ" color="#d9534f" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, padding: 16 },
  image: { width: "100%", height: 300, borderRadius: 8, backgroundColor: "#eee" },
  title: { fontSize: 22, fontWeight: "700", marginTop: 12 },
  price: { color: "#1a8917", marginTop: 8, fontSize: 16 },
  desc: { marginTop: 8, fontSize: 14, color: "#333" },
});
