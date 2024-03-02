
export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }


export interface BrandsList {
  value: string;
  label: string;
  checked: boolean;
  id: string;
}

export interface CategoriesList {
  value: string;
  label: string;
  checked: boolean;
  id: string;
}