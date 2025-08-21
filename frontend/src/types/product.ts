export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  imageUrl: string;
  additionalImages: string[];
  stockQuantity: number;
  isAvailable: boolean;
  createdAt: string;
}

export interface ProductFilterRequest {
  searchTerm?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  page: number;
  pageSize: number;
}
