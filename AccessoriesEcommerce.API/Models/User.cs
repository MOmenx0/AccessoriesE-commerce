using System.ComponentModel.DataAnnotations;

namespace AccessoriesEcommerce.API.Models;

public class User
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string FirstName { get; set; } = string.Empty;
    
    [Required]
    [StringLength(100)]
    public string LastName { get; set; } = string.Empty;
    
    [Required]
    [EmailAddress]
    [StringLength(150)]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string PasswordHash { get; set; } = string.Empty;
    
    [Required]
    public string Role { get; set; } = "Client"; // Admin or Client
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public List<Order> Orders { get; set; } = new();
    public List<CartItem> CartItems { get; set; } = new();
    public List<WishlistItem> WishlistItems { get; set; } = new();
}
