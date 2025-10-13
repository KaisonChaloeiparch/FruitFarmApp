import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { addFruit } from "@/utils/fruit-storage";
import { Fruit } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";

export default function CreateFruit() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("https://picsum.photos/400/400");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "ต้องการสิทธิ์เข้าถึงรูปภาพ");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const handleAdd = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "กรุณากรอกชื่อผลไม้");
      return;
    }
    const newFruit: Fruit = {
      id: Date.now().toString(), // ✅ ใช้ timestamp แทน UUID
      name: name.trim(),
      color: color.trim(),
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      image,
    };
    await addFruit(newFruit);
    router.push("/fruit");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Color</Text>
      <TextInput value={color} onChangeText={setColor} style={styles.input} />

      <Text style={styles.label}>Price (฿)</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Stock</Text>
      <TextInput value={stock} onChangeText={setStock} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Image</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Button title="Choose Image" onPress={pickImage} />

      <View style={{ height: 12 }} />
      <Button title="Add Fruit" onPress={handleAdd} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: "600", marginTop: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginTop: 6 },
  image: { width: "100%", height: 220, borderRadius: 6, marginVertical: 8, backgroundColor: "#eee" },
});
