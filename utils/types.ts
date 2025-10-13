// ประกาศ type Fruit และ export
export interface Fruit {
  id: string;
  name: string;
  color: string;
  price: number;
  stock?: number; // optional
  image?: string; // optional URL ของรูปผลไม้
}
