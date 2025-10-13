import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fruit } from "./types"; // import Fruit type

const STORAGE_KEY = "FRUITS_V1"; // key สำหรับเก็บ fruit

// ดึง fruits ทั้งหมด
export const getFruits = async (): Promise<Fruit[]> => {
    try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) as Fruit[] : [];
    } catch (e) {
        console.error("getFruits error", e);
        return [];
    }
};

// เพิ่ม fruit
export const addFruit = async (fruit: Fruit): Promise<void> => {
    try {
        const fruits = await getFruits();
        fruits.push(fruit);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fruits));
    } catch (e) {
        console.error("addFruit error", e);
    }
};

// อัปเดต fruit
export const updateFruit = async (updated: Fruit): Promise<void> => {
    try {
        const fruits = await getFruits();
        const next = fruits.map(f => (f.id === updated.id ? updated : f));
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
        console.error("updateFruit error", e);
    }
};

// ลบ fruit
export const deleteFruit = async (id: string): Promise<void> => {
    try {
        const fruits = await getFruits();
        const next = fruits.filter(f => f.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
        console.error("deleteFruit error", e);
    }
};
