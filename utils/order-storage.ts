import AsyncStorage from "@react-native-async-storage/async-storage";

export type Order = {
  id: string;
  fruitId: string;
  fruitName: string;
  fruitImage?: string;
  pricePerKg: number;
  quantityKg: number;
  totalPrice: number;
  createdAt: string;
};

const ORDER_KEY = "@orders";

export async function getOrders(): Promise<Order[]> {
  const data = await AsyncStorage.getItem(ORDER_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveOrder(order: Order) {
  const orders = await getOrders();
  const updated = [...orders, order];
  await AsyncStorage.setItem(ORDER_KEY, JSON.stringify(updated));
}

export async function deleteOrder(id: string) {
  const orders = await getOrders();
  const updated = orders.filter(o => o.id !== id);
  await AsyncStorage.setItem(ORDER_KEY, JSON.stringify(updated));
}

export async function updateOrder(updatedOrder: Order) {
  const orders = await getOrders();
  const updated = orders.map(o => o.id === updatedOrder.id ? updatedOrder : o);
  await AsyncStorage.setItem(ORDER_KEY, JSON.stringify(updated));
}
