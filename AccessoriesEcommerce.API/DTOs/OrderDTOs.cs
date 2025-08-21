using System.ComponentModel.DataAnnotations;

namespace AccessoriesEcommerce.API.DTOs;

public class CreateOrderRequest
{
    [Required]
    public string ShippingAddress { get; set; } = string.Empty;
    
    [Required]
    public string ShippingCity { get; set; } = string.Empty;
    
    [Required]
    public string ShippingPostalCode { get; set; } = string.Empty;
    
    [Required]
    public string ShippingCountry { get; set; } = string.Empty;
    
    [Required]
    public string CustomerName { get; set; } = string.Empty;
    
    [Required]
    [Phone]
    public string CustomerPhone { get; set; } = string.Empty;
    
    public string? Notes { get; set; }
    
    [Required]
    public List<OrderItemRequest> Items { get; set; } = new();
}

public class OrderItemRequest
{
    [Required]
    public int ProductId { get; set; }
    
    [Required]
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
}

public class UpdateOrderStatusRequest
{
    [Required]
    public string Status { get; set; } = string.Empty; // Pending, Shipped, Delivered
}

public class OrderDto
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public string ShippingCity { get; set; } = string.Empty;
    public string ShippingPostalCode { get; set; } = string.Empty;
    public string ShippingCountry { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public DateTime OrderDate { get; set; }
    public DateTime? ShippedDate { get; set; }
    public DateTime? DeliveredDate { get; set; }
    public List<OrderItemDto> OrderItems { get; set; } = new();
}

public class OrderItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string ProductImage { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
}
