// ==========================
// 📦 Collection
// ==========================
export type CollectionType = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  products?: ProductType[]; // relasi: optional untuk efisiensi
};

// ==========================
// 🛍️ Product
// ==========================
export type ProductType = {
  id: string;
  title: string;
  description: string;
  media: string[];
  tags: string[];
  sizes: string[];
  colors: string[];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
  collectionId: string;
  collection?: CollectionType; // optional untuk include() Prisma
  orderItems?: OrderItemType[];
};

// ==========================
// 👤 Customer
// ==========================
export type CustomerType = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  orders?: OrderType[];
};

// ==========================
// 🧾 Order
// ==========================
export type OrderType = {
  id: string;
  customerId: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  customer?: CustomerType;
  items?: OrderItemType[];
};

// ==========================
// 📦 Order Item
// ==========================
export type OrderItemType = {
  id: string;
  orderId: string;
  productId: string;
  title: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  order?: OrderType;
  product?: ProductType;
};


export type UserAuth = {
  name: string;
  email: string;
  token: string;
  role: "ADMIN" | "CUSTOMER";
}

export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "CUSTOMER";
  customerId: string | null;
  customer?: CustomerType;
  createdAt: Date;
  updatedAt: Date;
}