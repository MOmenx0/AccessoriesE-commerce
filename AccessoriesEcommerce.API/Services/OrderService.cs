using AccessoriesEcommerce.API.Data;
using AccessoriesEcommerce.API.DTOs;
using AccessoriesEcommerce.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AccessoriesEcommerce.API.Services;

public class OrderService : IOrderService
{
    private readonly AppDbContext _context;

    public OrderService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<OrderDto> CreateOrderAsync(int userId, CreateOrderRequest request)
    {
        // Generate unique order number
        var orderNumber = $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";
        
        var order = new Order
        {
            UserId = userId,
            OrderNumber = orderNumber,
            Status = "Pending",
            ShippingAddress = request.ShippingAddress,
            ShippingCity = request.ShippingCity,
            ShippingPostalCode = request.ShippingPostalCode,
            ShippingCountry = request.ShippingCountry,
            CustomerName = request.CustomerName,
            CustomerPhone = request.CustomerPhone,
            Notes = request.Notes,
            OrderDate = DateTime.UtcNow
        };

        decimal totalAmount = 0;
        var orderItems = new List<OrderItem>();

        foreach (var item in request.Items)
        {
            var product = await _context.Products.FindAsync(item.ProductId);
            if (product == null || !product.IsAvailable || product.StockQuantity < item.Quantity)
            {
                throw new InvalidOperationException($"Product {item.ProductId} is not available or insufficient stock");
            }

            var orderItem = new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                UnitPrice = product.Price,
                TotalPrice = product.Price * item.Quantity
            };

            orderItems.Add(orderItem);
            totalAmount += orderItem.TotalPrice;

            // Update stock
            product.StockQuantity -= item.Quantity;
            if (product.StockQuantity == 0)
            {
                product.IsAvailable = false;
            }
        }

        order.TotalAmount = totalAmount;
        order.OrderItems = orderItems;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        // Clear user's cart after successful order
        var cartItems = await _context.CartItems.Where(ci => ci.UserId == userId).ToListAsync();
        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        return await GetOrderByIdAsync(order.Id) ?? throw new InvalidOperationException("Failed to retrieve created order");
    }

    public async Task<List<OrderDto>> GetUserOrdersAsync(int userId)
    {
        var orders = await _context.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return orders.Select(MapToDto).ToList();
    }

    public async Task<List<OrderDto>> GetAllOrdersAsync()
    {
        var orders = await _context.Orders
            .Include(o => o.User)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return orders.Select(MapToDto).ToList();
    }

    public async Task<OrderDto?> GetOrderByIdAsync(int orderId)
    {
        var order = await _context.Orders
            .Include(o => o.User)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        return order != null ? MapToDto(order) : null;
    }

    public async Task<OrderDto?> UpdateOrderStatusAsync(int orderId, UpdateOrderStatusRequest request)
    {
        var order = await _context.Orders.FindAsync(orderId);
        if (order == null)
            return null;

        order.Status = request.Status;
        
        if (request.Status == "Shipped" && order.ShippedDate == null)
        {
            order.ShippedDate = DateTime.UtcNow;
        }
        else if (request.Status == "Delivered" && order.DeliveredDate == null)
        {
            order.DeliveredDate = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();
        return await GetOrderByIdAsync(orderId);
    }

    public async Task<bool> DeleteOrderAsync(int orderId)
    {
        var order = await _context.Orders.FindAsync(orderId);
        if (order == null)
            return false;

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        return true;
    }

    private static OrderDto MapToDto(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            ShippingAddress = order.ShippingAddress,
            ShippingCity = order.ShippingCity,
            ShippingPostalCode = order.ShippingPostalCode,
            ShippingCountry = order.ShippingCountry,
            CustomerName = order.CustomerName,
            CustomerPhone = order.CustomerPhone,
            Notes = order.Notes,
            OrderDate = order.OrderDate,
            ShippedDate = order.ShippedDate,
            DeliveredDate = order.DeliveredDate,
            OrderItems = order.OrderItems.Select(oi => new OrderItemDto
            {
                Id = oi.Id,
                ProductId = oi.ProductId,
                ProductName = oi.Product.Name,
                ProductImage = oi.Product.ImageUrl,
                Quantity = oi.Quantity,
                UnitPrice = oi.UnitPrice,
                TotalPrice = oi.TotalPrice
            }).ToList()
        };
    }
}
