using AccessoriesEcommerce.API.DTOs;

namespace AccessoriesEcommerce.API.Services;

public interface IOrderService
{
    Task<OrderDto> CreateOrderAsync(int userId, CreateOrderRequest request);
    Task<List<OrderDto>> GetUserOrdersAsync(int userId);
    Task<List<OrderDto>> GetAllOrdersAsync();
    Task<OrderDto?> GetOrderByIdAsync(int orderId);
    Task<OrderDto?> UpdateOrderStatusAsync(int orderId, UpdateOrderStatusRequest request);
    Task<bool> DeleteOrderAsync(int orderId);
}
