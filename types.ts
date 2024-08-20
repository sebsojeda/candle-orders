export type Fragrance = {
  id: number;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
};

export type OrderOption = {
  label: string;
  value: Fragrance;
};
