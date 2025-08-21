using System.ComponentModel.DataAnnotations;

namespace AccessoriesEcommerce.API.Models;

public class Order
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
    [Required]
    public string OrderNumber { get; set; } = string.Empty;
    
    [Required]
    public string Status { get; set; } = "Pending"; // Pending, Shipped, Delivered
    
    [Required]
    public decimal TotalAmount { get; set; }
    
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
    
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    
    public DateTime? ShippedDate { get; set; }
    
    public DateTime? DeliveredDate { get; set; }
    
    // Navigation properties
    public List<OrderItem> OrderItems { get; set; } = new();
}
