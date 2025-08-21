import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, UserDto } from '../types/auth';
import {
  CreateProductRequest,
  ProductDto,
  ProductFilterRequest,
  OrderDto,
  CreateOrderRequest,
} from '../types/product';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  register: async (firstName: string, lastName: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', { firstName, lastName, email, password });
    return response.data;
  },

  getProfile: async (): Promise<UserDto> => {
    const response = await api.get<UserDto>('/auth/profile');
    return response.data;
  },
};

// Products API
export const productsApi = {
  getAll: async (): Promise<ProductDto[]> => {
    const response = await api.get<ProductDto[]>('/products/all');
    return response.data;
  },

  getFiltered: async (filter: ProductFilterRequest): Promise<ProductDto[]> => {
    const response = await api.get<ProductDto[]>('/products', { params: filter });
    return response.data;
  },

  getById: async (id: number): Promise<ProductDto> => {
    const response = await api.get<ProductDto>(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/products/categories');
    return response.data;
  },

  getBrands: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/products/brands');
    return response.data;
  },

  create: async (product: CreateProductRequest): Promise<ProductDto> => {
    const response = await api.post<ProductDto>('/products', product);
    return response.data;
  },
};

// Orders API
export const ordersApi = {
  create: async (order: CreateOrderRequest): Promise<OrderDto> => {
    const response = await api.post<OrderDto>('/orders', order);
    return response.data;
  },

  getAll: async (): Promise<OrderDto[]> => {
    const response = await api.get<OrderDto[]>('/orders');
    return response.data;
  },

  getMyOrders: async (): Promise<OrderDto[]> => {
    const response = await api.get<OrderDto[]>('/orders/my-orders');
    return response.data;
  },

  getById: async (id: number): Promise<OrderDto> => {
    const response = await api.get<OrderDto>(`/orders/${id}`);
    return response.data;
  },
};

export default api;
