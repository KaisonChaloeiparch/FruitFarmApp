import { RouteProp } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

type Fruit = {
  id: number;
  name: string;
  price: number;
  image: any;
};

type OrderScreenRouteProp = RouteProp<{ Order: { fruit: Fruit } }, "Order">;

type Props = {
  route: OrderScreenRouteProp;
  navigation: any;
};

export default function OrderScreen({  navigation }: Props) {
  // const { fruit } = route.params;
  const {id,price,name} = useLocalSearchParams();
  const [quantity, setQuantity] = useState("1");
  const total = Number(price) * Number(quantity);

  const handleOrder = () => {
    Alert.alert(
      "สั่งซื้อสำเร็จ",
      `คุณสั่งซื้อ ${name} จำนวน ${quantity} รวม ${total} บาท\nโอนเงิน: 123-456-789 ธ.กสิกรไทย`
    );
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
      <Text>ราคา: {price} บาท/ชิ้น</Text>
      <TextInput
        keyboardType="number-pad"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="จำนวน"
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />
      <Text>รวม: {total} บาท</Text>
      <Text style={{ marginVertical: 10 }}>
        โอนเงิน: 123-456-789 ธ.กสิกรไทย
      </Text>
      <Button title="สั่งซื้อ" onPress={handleOrder} />
    </View>
  );
}