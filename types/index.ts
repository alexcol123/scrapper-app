export type PriceHistoryItem = {
  price: number;
};

export type User = {
  email: string;
};

export type Product = {
  _id?: string;
  url: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  brand: string,
  isOutOfStock: Boolean;
  category: string;
  image: string;
  currency: string;
  description: string;
  priceHistory: PriceHistoryItem[] | [];
  reviewsCount: number;
  stars: number;
  
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;

  discountRate: number;
  users?: User[];
};

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};