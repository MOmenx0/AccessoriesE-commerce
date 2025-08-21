export interface OrderItemDto {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderDto {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  orderDate: string;
  shippedDate?: string;
  deliveredDate?: string;
  orderItems: OrderItemDto[];
}

export interface CreateOrderRequest {
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}
