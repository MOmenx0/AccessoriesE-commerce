export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand:string;
  imageUrl: string;
  additionalImages: string[];
  stockQuantity: number;
  isAvailable: boolean;
  createdAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  imageUrl: string;
  additionalImages: string[];
  stockQuantity: number;
}

export interface OrderDto {
  id: number;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  orderItems: {
    id: number;
    quantity: number;
    price: number;
    product: ProductDto;
  }[];
}

export interface CreateOrderRequest {
  cartItems: {
    productId: number;
    quantity: number;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
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
