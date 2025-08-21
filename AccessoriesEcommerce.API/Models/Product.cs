using System.ComponentModel.DataAnnotations;

namespace AccessoriesEcommerce.API.Models;

public class Product
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Category { get; set; } = string.Empty;
    
    [StringLength(100)]
    public string Brand { get; set; } = string.Empty;
    
    public string ImageUrl { get; set; } = string.Empty;
    
    public List<string> AdditionalImages { get; set; } = new();
    
    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }
    
    public bool IsAvailable { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public List<CartItem> CartItems { get; set; } = new();
    public List<OrderItem> OrderItems { get; set; } = new();
    public List<WishlistItem> WishlistItems { get; set; } = new();
}
