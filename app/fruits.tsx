import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import FruitCard from "../components/FruitCard";

type Fruit = {
    id: number;
    name: string;
    price: number;
    image: any; // เปลี่ยนเป็น any สำหรับ require()
};

export default function FruitsScreen() {
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // จำลองการโหลดข้อมูล
        setTimeout(() => {
            setFruits([
                { id: 1, name: "มะม่วงน้ำดอกไม้", price: 60, image: require("@/assets/fruits/mango.jpg") },
                { id: 2, name: "เงาะโรงเรียน", price: 50, image: require("@/assets/fruits/rambutan.jpg") },
                { id: 3, name: "ทุเรียนหมอนทอง", price: 150, image: require("@/assets/fruits/durian.jpg") },
                { id: 4, name: "ลำไย", price: 70, image: require("@/assets/fruits/longan.jpg") }
            ]);

            setLoading(false);
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🍒 ผลผลิตจากสวน</Text>
            {loading ? (
                <ActivityIndicator size="large" color="orange" />
            ) : (
                <FlatList
                    data={fruits}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <FruitCard name={item.name} price={item.price} image={item.image} />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#fff"
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20
    }
});
