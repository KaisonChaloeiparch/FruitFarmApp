import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { getFruits, updateFruit } from "@/utils/fruit-storage";
import { Fruit } from "@/utils/types";

export default function EditFruit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();

  const [fruit, setFruit] = useState<Fruit | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<string>("https://picsum.photos/400/400");

  useEffect(() => {
    const load = async () => {
      const fruits = await getFruits();
      const f = fruits.find((x) => x.id === id) || null;
      if (f) {
        setFruit(f);
        setName(f.name);
        setColor(f.color);
        setPrice(String(f.price));
        setStock(String(f.stock || 0));
        setImage(f.image || "https://picsum.photos/400/400");

        // set navigation title
        navigation.setOptions({
          title: f?.name || "Edit Fruit",
        });
      }
    };
    load();
  }, [id]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "ต้องการสิทธิ์เข้าถึงรูปภาพ");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!res.canceled) {
      setImage(res.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    if (!fruit) return;
    if (!name.trim()) {
      Alert.alert("Validation", "กรุณากรอกชื่อผลไม้");
      return;
    }
    const updated: Fruit = {
      ...fruit,
      name: name.trim(),
      color: color.trim(),
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      image,
    };
    await updateFruit(updated);
    router.push(`/fruit/${fruit.id}`);
  };

  if (!fruit)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Color</Text>
      <TextInput value={color} onChangeText={setColor} style={styles.input} />

      <Text style={styles.label}>Price (฿)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Stock</Text>
      <TextInput
        value={stock}
        onChangeText={setStock}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Image</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Button title="Choose Image" onPress={pickImage} />

      <View style={{ height: 12 }} />
      <Button title="Update Fruit" onPress={handleUpdate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: "600", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 6,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 6,
    marginVertical: 8,
    backgroundColor: "#eee",
  },
});
